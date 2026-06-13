
import { useEffect, useState, useRef } from "react";
// @ts-ignore
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import ARScanner from "../components/ar/ARScanner";
import { Loader2, AlertCircle, Camera, ScanLine, ArrowRight } from "lucide-react";
import { BusinessService } from "../lib/businessService";
import WhatsAppSupport from "../components/WhatsAppSupport";

interface ARTarget {
    target_index: number;
    video_url: string;
}

const Scanner = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const urlAlbumId = new URLSearchParams(search).get("albumId");

    const [inputAlbumId, setInputAlbumId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [albumData, setAlbumData] = useState<{
        mindFileUrl: string;
        videoMappings: { targetIndex: number; videoUrl: string; playerType: string }[];
    } | null>(null);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const [clientWhatsApp, setClientWhatsApp] = useState<string | null>(null);

    useEffect(() => {
        const detectClient = async () => {
            const hostname = window.location.hostname;
            const parts = hostname.split('.');
            const mainDomains = ['giftmagic.beauty', 'localhost', '127.0.0.1'];
            const isMainDomain = mainDomains.some(d => hostname === d || hostname.endsWith('.' + d));

            let subdomain = '';
            let customDomain = '';

            if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
                if (parts.length > 1 && parts[parts.length - 1] === 'localhost') {
                    subdomain = parts.slice(0, -1).join('.');
                }
            } else if (hostname.endsWith('giftmagic.beauty')) {
                if (parts.length > 2) {
                    subdomain = parts.slice(0, -2).join('.');
                }
            } else {
                customDomain = hostname.startsWith('www.') ? hostname.slice(4) : hostname;
            }

            const slug = customDomain || (subdomain && subdomain !== 'www' && subdomain !== 'admin' ? subdomain : '');
            
            if (slug) {
                try {
                    const biz = await BusinessService.getBusinessByIdentifier(slug);
                    if (biz && biz.whatsapp_number) {
                        setClientWhatsApp(biz.whatsapp_number);
                    }
                } catch (e) {
                    console.error("[Scanner] Error fetching client WhatsApp:", e);
                }
            }
        };
        detectClient();
    }, []);

    useEffect(() => {
        const init = async () => {
            if (urlAlbumId) {
                await fetchAlbum(urlAlbumId);
                requestCamera();
            } else {
                await fetchMasterAlbum();
                requestCamera();
            }
        };
        init();
    }, [urlAlbumId, navigate]);

    const fetchAlbum = async (idOrUsername: string) => {
        setError(null);
        try {
            const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(idOrUsername);

            let query = supabase
                .from("ar_albums")
                .select("id, mind_file_url, title");

            if (isUuid) {
                query = query.eq("id", idOrUsername);
            } else {
                query = query.eq("username", idOrUsername);
            }

            const { data: album, error: albumError } = await query.single();

            if (albumError || !album) {
                console.error("Album fetch error:", albumError);
                if (albumError?.code === '22P02') {
                    setError("Invalid Album Link.");
                } else {
                    setError("Album not found with that code.");
                }
                setLoading(false);
                return;
            }

            // Always use the LATEST master .mind file from ar_master_config
            // (Repair Scanner updates this, individual album URLs may be stale)
            const { data: masterConfig } = await supabase
                .from("ar_master_config")
                .select("master_mind_file_url")
                .eq("id", 1)
                .maybeSingle();

            const mindUrl = masterConfig?.master_mind_file_url || album.mind_file_url;
            console.log("[Scanner] Using mind file:", mindUrl?.slice(-60));

            const { data: targets, error: targetsError } = await supabase
                .from("ar_targets")
                .select("target_index, video_url, player_type")
                .eq("album_id", album.id);

            if (targetsError) {
                setError("Failed to load album content.");
                setLoading(false);
                return;
            }

            setAlbumData({
                mindFileUrl: mindUrl,
                videoMappings: targets
                    .sort((a: any, b: any) => (a.target_index || 0) - (b.target_index || 0))
                    .map((t: any) => ({
                        targetIndex: t.target_index,
                        videoUrl: t.video_url,
                        playerType: t.player_type || 'normal'
                    })),
            });
            setLoading(false);

        } catch (err: any) {
            console.error(err);
            setError("An unexpected error occurred.");
            setLoading(false);
        }
    };

    const fetchMasterAlbum = async () => {
        setError(null);
        try {
            // ── Step 1: Get the master .mind file URL from ar_master_config ──
            // This URL is updated every time a new album is compiled (contains ALL images).
            const { data: masterConfig, error: configError } = await supabase
                .from("ar_master_config")
                .select("master_mind_file_url")
                .eq("id", 1)
                .maybeSingle();

            if (configError) {
                console.error("Master config fetch error:", configError);
            }

            const masterMindUrl = masterConfig?.master_mind_file_url;

            if (!masterMindUrl) {
                setError("No master dataset compiled yet. Please upload an album from the admin panel.");
                setLoading(false);
                return;
            }

            // ── Step 2: Load ALL target mappings ordered by global target_index ──
            // target_index in ar_targets now represents the GLOBAL position in the
            // master .mind file, not the album-local position.
            const { data: allTargets, error: targetsError } = await supabase
                .from("ar_targets")
                .select("target_index, video_url, player_type")
                .order("target_index", { ascending: true });

            if (targetsError) {
                setError("Failed to load global targets.");
                setLoading(false);
                return;
            }

            if (!allTargets || allTargets.length === 0) {
                setError("No AR targets found. Please upload images and videos first.");
                setLoading(false);
                return;
            }

            console.log("[Master Scanner] Loaded", allTargets.length, "targets from master config.");
            console.log("[Master Scanner] Mind URL:", masterMindUrl);
            console.log("[Master Scanner] Target indices:", allTargets.map((t: any) => t.target_index));

            setAlbumData({
                mindFileUrl: masterMindUrl,
                videoMappings: allTargets.map((t: any) => ({
                    targetIndex: t.target_index,
                    videoUrl: t.video_url,
                    playerType: t.player_type || 'normal'
                })),
            });
            setLoading(false);

        } catch (err: any) {
            console.error(err);
            setError("An unexpected error occurred.");
            setLoading(false);
        }
    };


    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputAlbumId.trim()) {
            navigate(`/scan?albumId=${inputAlbumId.trim()}`);
        }
    };

    const requestCamera = async () => {
        try {
            // Check permission only – do NOT stop() the tracks immediately;
            // on some Android/iOS devices stopping then re-opening causes
            // "camera already in use" errors when MindAR tries to access it.
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            // Release for MindAR to pick up cleanly
            stream.getTracks().forEach(track => track.stop());
            setPermissionGranted(true);
        } catch (err) {
            console.error('Camera permission denied:', err);
            setError('Camera access is required to use AR.');
        }
    };

    // 1. Loading State
    if (loading) {
        return (
            <>
                <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
                {clientWhatsApp && <WhatsAppSupport phoneNumber={clientWhatsApp} message="Hi, I need help with the AR scanner!" />}
            </>
        );
    }

    // 2. Data Loaded & Permission Granted -> Show Scanner
    if (albumData && permissionGranted) {
        return (
            <>
                <div className="fixed inset-0 w-screen h-screen m-0 p-0 overflow-hidden bg-black z-[100]">
                    <ARScanner
                        mindFileUrl={albumData.mindFileUrl}
                        videoMappings={albumData.videoMappings}
                        onError={(err) => setError(err)}
                    />
                    {/* Close Button */}
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-4 left-4 z-[500] bg-black/40 backdrop-blur-md p-2 rounded-full text-white/80 border border-white/10 hover:bg-black/60 transition-colors"
                    >
                        <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                </div>
                {clientWhatsApp && <WhatsAppSupport phoneNumber={clientWhatsApp} message="Hi, I need help with the AR scanner!" />}
            </>
        );
    }

    // 3. Data Loaded & Permission Needed
    if (albumData && !permissionGranted) {
        return (
            <>
                <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white p-6 text-center space-y-8">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                        <Camera className="w-12 h-12 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-3xl font-black tracking-tight">Enable Camera</h1>
                        <p className="text-white/60 max-w-xs mx-auto">
                            Tap button below to start the AR magic.
                        </p>
                    </div>
                    <button
                        onClick={requestCamera}
                        className="gradient-primary px-8 py-4 rounded-full font-black text-lg shadow-lg hover:scale-105 transition-transform"
                    >
                        Start Camera
                    </button>
                </div>
                {clientWhatsApp && <WhatsAppSupport phoneNumber={clientWhatsApp} message="Hi, I need help with the AR scanner!" />}
            </>
        );
    }

    // 4. No ID Provided or Error -> Show Input Form
    return (
        <>
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white p-6 text-center">
                {/* ... existing content ... */}
                {error && !albumData && (
                    <div className="mb-6 mx-auto max-w-sm w-full p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-500">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm font-medium">{error}</p>
                    </div>
                )}

                <div className="w-full max-w-sm space-y-8">
                    <div className="space-y-2">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mx-auto flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 rotate-3 hover:rotate-6 transition-transform">
                            <ScanLine className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight">Gift Magic AR</h1>
                        <p className="text-white/60 text-sm">
                            Enter your Username or Album Code below.
                        </p>
                    </div>

                    <div className="glass-card p-6 rounded-2xl border border-white/10">
                        <form onSubmit={handleManualSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    value={inputAlbumId}
                                    onChange={(e) => setInputAlbumId(e.target.value.trim())}
                                    placeholder="Username or ID here..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white placeholder:text-white/20 focus:border-primary/50 outline-none transition-colors text-center font-mono text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={!inputAlbumId.trim()}
                                className="w-full gradient-primary py-4 rounded-xl text-white font-black uppercase tracking-widest text-sm shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                Scan Now <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    <div className="pt-8">
                        <button onClick={() => navigate('/')} className="text-xs text-white/40 hover:text-white transition-colors">Back to Home</button>
                    </div>
                </div>
            </div>
            {clientWhatsApp && <WhatsAppSupport phoneNumber={clientWhatsApp} message="Hi, I need help with the AR scanner!" />}
        </>
    );
};

export default Scanner;
