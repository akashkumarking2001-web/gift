import { useEffect, useRef, useState, useCallback } from 'react';
import { AlertCircle, Volume2, VolumeX, Loader2 } from 'lucide-react';

interface VideoMapping {
    targetIndex: number;
    videoUrl: string;
    playerType: string;
}

interface ARScannerProps {
    mindFileUrl: string;
    videoMappings: VideoMapping[];
    onError?: (error: string) => void;
}

// ── URL resolution ────────────────────────────────────────────────────────────
// On localhost  → proxy through /api/r2proxy (localhost has no R2 CORS allowlist)
// On production → use direct Cloudflare CDN URL (R2 CORS allows all origins)
//                 This avoids routing large files through Vercel bandwidth limits.
function resolveUrl(url: string): string {
    if (!url) return '';
    const clean = url.replace(/ /g, '%20');
    const isExternal = clean.startsWith('http') && !clean.includes(window.location.host);
    if (!isExternal) return clean;
    const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    return isLocalhost ? `/api/r2proxy?url=${encodeURIComponent(clean)}` : clean;
}

type Status = 'loading' | 'ready' | 'matched' | 'error';

const ARScanner = ({ mindFileUrl, videoMappings, onError }: ARScannerProps) => {
    const containerRef    = useRef<HTMLDivElement>(null);
    const activeVideoRef  = useRef<HTMLVideoElement | null>(null);
    const attachedRef     = useRef(false);

    const [status,         setStatus]         = useState<Status>('loading');
    const [debugMessage,   setDebugMessage]   = useState('Loading AR engine…');
    const [isMuted,        setIsMuted]        = useState(true);
    const [needsTap,       setNeedsTap]       = useState(false);
    const [mismatchError,  setMismatchError]  = useState(false);
    const [hasActiveVideo, setHasActiveVideo] = useState(false);

    // ── Play a video: lazy-load then play ────────────────────────────────────
    // Using preload="none" means the video file has NOT been downloaded yet
    // when the scene initializes. We only download it when the target is found.
    const playVideo = useCallback((videoEl: HTMLVideoElement) => {
        // Pause + reset all other active videos (skip any with invalid indices)
        videoMappings.filter(m => m.targetIndex >= 0).forEach(({ targetIndex }) => {
            const el = document.getElementById(`vid-${targetIndex}`) as HTMLVideoElement | null;
            if (el && el !== videoEl) { el.pause(); el.currentTime = 0; }
        });

        activeVideoRef.current = videoEl;
        setHasActiveVideo(true);
        videoEl.muted = true;

        const doPlay = () => {
            videoEl.currentTime = 0;
            videoEl.play()
                .then(() => {
                    setNeedsTap(false);
                    setIsMuted(true);
                    setStatus('matched');
                    setDebugMessage('🎯 Matched! Tap 🔊 to unmute');
                })
                .catch(() => {
                    setNeedsTap(true);
                    setDebugMessage('▶️ Tap screen to play video');
                });
        };

        // If video already has enough data (e.g. cached), play immediately
        if (videoEl.readyState >= 2) {
            doPlay();
            return;
        }

        // Otherwise, trigger load now and wait for canplay
        setDebugMessage('🎯 Photo matched! Loading video…');
        videoEl.preload = 'auto';
        videoEl.load();

        const onCanPlay = () => {
            videoEl.removeEventListener('canplay', onCanPlay);
            videoEl.removeEventListener('error',    onVideoError);
            doPlay();
        };
        const onVideoError = () => {
            videoEl.removeEventListener('canplay', onCanPlay);
            videoEl.removeEventListener('error',    onVideoError);
            // Try playing anyway — sometimes error fires but video still works
            doPlay();
        };
        videoEl.addEventListener('canplay', onCanPlay);
        videoEl.addEventListener('error',   onVideoError);

        // Hard fallback: try to play after 4s regardless of canplay
        setTimeout(() => {
            videoEl.removeEventListener('canplay', onCanPlay);
            videoEl.removeEventListener('error',   onVideoError);
            doPlay();
        }, 4000);
    }, [videoMappings]);

    // ── Tap / unmute ─────────────────────────────────────────────────────────
    const handleTap = useCallback(() => {
        const vid = activeVideoRef.current;
        if (!vid) return;
        if (vid.paused) {
            vid.muted = false;
            vid.play()
                .then(() => { setNeedsTap(false); setIsMuted(false); setDebugMessage('🔊 Now Playing'); })
                .catch(() => {});
        } else {
            vid.muted = !vid.muted;
            setIsMuted(vid.muted);
            setDebugMessage(vid.muted ? '🎯 Tap to unmute 🔊' : '🔊 Playing with sound');
        }
    }, []);

    // ── Main AR setup effect ─────────────────────────────────────────────────
    useEffect(() => {
        const container = containerRef.current;
        if (!container || videoMappings.length === 0) return;

        attachedRef.current = false;
        setStatus('loading');
        setDebugMessage('Loading AR engine…');

        // ── Guard: filter out any targets with invalid indices ────────────────
        // A target_index of -1 (or any negative value) in the database causes
        // MindAR to crash internally with "undefined is not iterable" because it
        // tries to read its tracking array at a negative offset.
        // Fix the database by running "Repair Universal Scanner" in admin panel.
        const validMappings = videoMappings.filter(m => {
            if (m.targetIndex < 0) {
                console.warn(`[AR] ⚠️ Skipping target with invalid index ${m.targetIndex}. Fix via Admin → Repair Universal Scanner.`);
                return false;
            }
            return true;
        });

        if (validMappings.length === 0) {
            setStatus('error');
            setDebugMessage('❌ No valid AR targets found. Run Repair in Admin.');
            return;
        }

        const resolvedMindUrl = resolveUrl(mindFileUrl);

        // ── KEY FIX: preload="none" ──────────────────────────────────────────
        // The universal scanner may have 20-50+ targets. With preload="auto",
        // the browser tries to fetch all those videos simultaneously at startup.
        // This saturates mobile bandwidth, blocks the .mind file download,
        // and causes the cyan loading screen to hang indefinitely.
        //
        // With preload="none": zero network requests at init time.
        // Videos only load when their target is actually found (see playVideo).
        const videoAssetsHtml = validMappings.map(m => {
            const src = resolveUrl(m.videoUrl);
            return `<video
                id="vid-${m.targetIndex}"
                src="${src}"
                preload="none"
                loop
                muted
                playsinline
                webkit-playsinline
                crossorigin="anonymous"
                style="position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0.001;pointer-events:none;"
            ></video>`;
        }).join('\n');

        const entitiesHtml = validMappings.map(m => `
            <a-entity
                id="ar-target-${m.targetIndex}"
                mindar-image-target="targetIndex: ${m.targetIndex}"
            >
                <a-video
                    src="#vid-${m.targetIndex}"
                    position="0 0 0.05"
                    height="1"
                    width="1"
                    rotation="0 0 0"
                ></a-video>
            </a-entity>
        `).join('\n');

        // timeout="3000": A-Frame won't block >3s waiting for assets to load.
        // Since preload="none", assets don't load automatically anyway.
        const sceneHtml = `
            <a-scene
                id="ar-scene"
                mindar-image="imageTargetSrc: ${resolvedMindUrl}; autoStart: true; uiLoading: yes; uiScanning: yes; filterMinCF: 0.001; filterBeta: 1000"
                color-space="sRGB"
                renderer="colorManagement: true, physicallyCorrectLights: false"
                vr-mode-ui="enabled: false"
                device-orientation-permission-ui="enabled: false"
                style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;"
            >
                <a-assets timeout="3000">
                    ${videoAssetsHtml}
                </a-assets>
                <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>
                ${entitiesHtml}
            </a-scene>
        `;

        const sceneWrapper = document.createElement('div');
        sceneWrapper.id = 'ar-scene-wrapper';
        sceneWrapper.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
        sceneWrapper.innerHTML = sceneHtml;
        container.appendChild(sceneWrapper);

        const sceneEl = document.getElementById('ar-scene') as any;
        if (!sceneEl) {
            setStatus('error');
            setDebugMessage('❌ Failed to mount AR scene');
            return;
        }

        // ── Wire all listeners once arReady fires ─────────────────────────────
        const wireListeners = () => {
            if (attachedRef.current) return;
            attachedRef.current = true;
            console.log('[AR] arReady — wiring', validMappings.length, 'targets');
            setStatus('ready');
            setDebugMessage('📷 Ready! Point camera at your photo');

            validMappings.forEach((mapping) => {
                const entity  = document.getElementById(`ar-target-${mapping.targetIndex}`);
                const videoEl = document.getElementById(`vid-${mapping.targetIndex}`) as HTMLVideoElement | null;

                if (!entity || !videoEl) {
                    console.warn(`[AR] Missing element for target ${mapping.targetIndex}`);
                    return;
                }

                // Aspect ratio correction when metadata is available
                const fixAspect = () => {
                    if (!videoEl.videoWidth || !videoEl.videoHeight) return;
                    const aVideo = entity.querySelector('a-video');
                    if (!aVideo) return;
                    const aspect = videoEl.videoWidth / videoEl.videoHeight;
                    const s = 1.15;
                    aVideo.setAttribute('width',  (aspect >= 1 ? s : aspect * s).toFixed(4));
                    aVideo.setAttribute('height', (aspect >= 1 ? s / aspect : s).toFixed(4));
                };
                videoEl.addEventListener('loadedmetadata', fixAspect);

                entity.addEventListener('targetFound', () => {
                    console.log(`[AR] 🎯 targetFound → index ${mapping.targetIndex}`);
                    setMismatchError(false);
                    fixAspect();
                    playVideo(videoEl);
                });

                entity.addEventListener('targetLost', () => {
                    console.log(`[AR] targetLost → index ${mapping.targetIndex}`);
                    setStatus('ready');
                    setDebugMessage('📷 Ready! Point camera at your photo');
                    setNeedsTap(false);
                    videoEl.pause();
                    videoEl.currentTime = 0;
                    if (activeVideoRef.current === videoEl) {
                        activeVideoRef.current = null;
                        setHasActiveVideo(false);
                    }
                });

                console.log(`[AR] ✅ Wired target index ${mapping.targetIndex}`);
            });
        };

        sceneEl.addEventListener('arReady', wireListeners);

        const onArError = (e: any) => {
            const msg = e?.detail?.error || 'Unknown AR error';
            console.error('[AR] arError:', msg);
            setStatus('error');
            setDebugMessage(`❌ ${msg}`);
            if (onError) onError(msg);
        };
        sceneEl.addEventListener('arError', onArError);

        // Progressive loading messages so user knows it's still working
        const msgs: [number, string][] = [
            [4000,  '⏳ Downloading AR data… (large master file)'],
            [12000, '⏳ Almost there, please wait…'],
            [25000, '⏳ Loading — stay still, nearly done…'],
        ];
        const msgTimers = msgs.map(([ms, msg]) =>
            setTimeout(() => { if (!attachedRef.current) setDebugMessage(msg); }, ms)
        );

        // Poll safety net for arReady race condition
        const readyPoll = setInterval(() => {
            const sys = sceneEl.systems?.['mindar-image-system'];
            if (sys?.controller) {
                wireListeners();
                clearInterval(readyPoll);
            }
        }, 500);

        return () => {
            clearInterval(readyPoll);
            msgTimers.forEach(clearTimeout);
            sceneEl.removeEventListener('arReady', wireListeners);
            sceneEl.removeEventListener('arError', onArError);
            try { sceneEl.systems?.['mindar-image-system']?.stop(); } catch (_) {}
            document.querySelectorAll('video').forEach(v => {
                if (v.srcObject) (v.srcObject as MediaStream).getTracks().forEach(t => t.stop());
            });
            const wrapper = document.getElementById('ar-scene-wrapper');
            if (wrapper) wrapper.remove();
        };
    }, [mindFileUrl, videoMappings, playVideo, onError]);

    const statusDot =
        status === 'ready'   ? 'bg-emerald-500' :
        status === 'matched' ? 'bg-yellow-400' :
        status === 'error'   ? 'bg-red-500'    : 'bg-blue-400 animate-pulse';

    return (
        <div
            ref={containerRef}
            className="absolute top-0 left-0 w-full h-full overflow-hidden m-0 p-0"
            onClick={handleTap}
        >
            <style>{`
                #ar-scene-wrapper video:not([id^="vid-"]) {
                    position: absolute !important;
                    inset: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    object-fit: cover !important;
                    z-index: -2 !important;
                }
                #ar-scene-wrapper canvas.a-canvas {
                    position: absolute !important;
                    inset: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    z-index: 1 !important;
                }
                .a-enter-vr, .a-orientation-modal { display: none !important; }
            `}</style>

            {/* Status bar */}
            <div className="absolute top-4 left-4 right-4 bg-black/80 backdrop-blur-md px-4 py-3 text-white text-xs font-mono rounded-xl z-[400] border border-white/10 flex items-center gap-2 pointer-events-none">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${statusDot}`} />
                {status === 'loading' && <Loader2 className="w-3 h-3 animate-spin flex-shrink-0 text-blue-400" />}
                <span className="truncate flex-1">{debugMessage}</span>
                {hasActiveVideo && (
                    <button
                        onClick={(e) => { e.stopPropagation(); handleTap(); }}
                        className="flex-shrink-0 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors pointer-events-auto"
                    >
                        {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                    </button>
                )}
            </div>

            {/* "AR Ready" badge */}
            {status === 'ready' && (
                <div className="absolute bottom-24 left-0 right-0 flex justify-center z-[400] pointer-events-none">
                    <div className="bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md text-emerald-300 text-xs font-bold px-5 py-2 rounded-full flex items-center gap-2 animate-pulse">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        AR Ready — Point at photo
                    </div>
                </div>
            )}

            {/* Tap-to-play overlay */}
            {needsTap && (
                <div className="absolute inset-0 z-[350] flex items-end justify-center pb-28 pointer-events-none">
                    <div className="bg-black/70 backdrop-blur-md rounded-2xl px-6 py-4 text-white text-center space-y-1 border border-white/10">
                        <div className="text-3xl">▶️</div>
                        <p className="text-sm font-bold">Tap anywhere to play</p>
                    </div>
                </div>
            )}

            {/* Image-not-recognized error */}
            {mismatchError && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-[300] flex flex-col items-center justify-center p-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center animate-bounce">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-black text-white">Image Not Recognized</h3>
                        <p className="text-white/60 text-xs max-w-xs">
                            This photo is not in the AR database. Run "Repair Universal Scanner" in admin panel.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 w-full max-w-xs">
                        <button
                            onClick={() => { setMismatchError(false); window.history.back(); }}
                            className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={() => setMismatchError(false)}
                            className="text-white/40 hover:text-white text-xs py-2"
                        >
                            Try scanning again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ARScanner;
