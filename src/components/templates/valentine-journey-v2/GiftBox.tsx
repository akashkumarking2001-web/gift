import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Maximize, Gift, Upload, Loader2, CheckCircle2, Heart, HeartOff } from 'lucide-react';
import { useAudioContext } from '../../../context/AudioContext';
import { GiftService } from '../../../lib/gifts';
import confetti from 'canvas-confetti';

interface GiftBoxProps {
    videoUrl?: string;
    onUpdate?: (url: string) => void;
    isEditing?: boolean;
    onUnlocked?: () => void;
    postVideoType?: 'none' | 'text' | 'interaction';
    postVideoText?: string;
    postVideoQuestion?: string;
}

const GiftBox: React.FC<GiftBoxProps> = ({
    videoUrl,
    onUpdate,
    isEditing = false,
    onUnlocked,
    postVideoType = 'interaction',
    postVideoText = "Do you remember this?",
    postVideoQuestion = "Are you impressed? Do you like this?"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPostVideo, setShowPostVideo] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLandscape, setIsLandscape] = useState(false);
    const [interactionStep, setInteractionStep] = useState<'question' | 'celebration' | 'finished'>('question');
    const [showText, setShowText] = useState(false);
    const [interactionResult, setInteractionResult] = useState<'yes' | 'no' | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { pauseBGM, playBGM } = useAudioContext();

    useEffect(() => {
        // Initial orientation check
        setIsLandscape(window.innerWidth > window.innerHeight);
    }, []);

    const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
        const video = e.currentTarget;
        if (video.videoWidth > video.videoHeight) {
            setIsLandscape(true);
        }
    };

    const handleOpen = () => {
        if (!videoUrl && !isEditing) return;
        if (isEditing && !videoUrl) {
            fileInputRef.current?.click();
            return;
        }

        setIsOpen(true);
        pauseBGM();
        setTimeout(() => {
            if (videoRef.current) {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }, 500);
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setShowPostVideo(true);
        if (postVideoType === 'text') {
            setShowText(true);
            setTimeout(() => {
                setInteractionStep('finished');
            }, 3000); // Show text for 3 seconds before revealing button
        }
    };

    const triggerCelebration = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // double the confetti!
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        // Heart Burst
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ff69b4', '#db2777'],
            shapes: ['circle'], // We can't easily do hearts with standard confetti lib without custom shapes, but colors help
        });
    };

    const handleInteraction = (result: 'yes' | 'no') => {
        setInteractionResult(result);
        if (result === 'yes') {
            setInteractionStep('celebration');
            triggerCelebration();
            setTimeout(() => {
                setInteractionStep('finished');
            }, 3000);
        } else {
            setInteractionStep('finished');
        }
    };

    const handleBack = () => {
        setIsOpen(false);
        setShowPostVideo(false);
        setInteractionStep('question');
        setShowText(false);
        setInteractionResult(null);
        playBGM();
        onUnlocked?.();
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            alert('Please upload a video file.');
            return;
        }

        setIsUploading(true);
        try {
            const url = await GiftService.uploadMedia(file);
            if (url) {
                onUpdate?.(url);
            }
        } catch (error) {
            console.error('Upload failed', error);
            alert('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const toggleFullscreen = () => {
        if (!videoRef.current) return;
        if (!document.fullscreenElement) {
            videoRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    if (!isOpen) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileUpload}
                />

                <p className="text-white font-black text-2xl mb-8 uppercase tracking-[0.3em] drop-shadow-lg text-center">
                    {videoUrl ? "Open the Gift Box" : (isEditing ? "Upload Video for Gift Box" : "A Surprise Awaits...")}
                </p>

                <motion.div
                    className="relative cursor-pointer group"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleOpen}
                >
                    {/* Glowing effect */}
                    <div className="absolute -inset-8 bg-pink-500/30 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="w-48 h-48 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden border-4 border-white/20">
                        {isUploading ? (
                            <Loader2 className="w-16 h-16 text-white animate-spin" />
                        ) : videoUrl ? (
                            <Gift className="w-24 h-24 text-white drop-shadow-lg" />
                        ) : (
                            <Upload className="w-24 h-24 text-white opacity-50" />
                        )}

                        {/* Ribbon */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-yellow-400/80 shadow-md" />
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-8 bg-yellow-400/80 shadow-md" />

                        {/* Bow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-16 h-12 bg-yellow-500 rounded-full blur-[1px]" />
                    </div>

                    {isEditing && (
                        <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30 text-white hover:bg-white/40 transition-all"
                            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                            <Upload size={16} />
                        </div>
                    )}
                </motion.div>
            </div>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center"
            >
                {!showPostVideo ? (
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            onLoadedMetadata={handleLoadedMetadata}
                            className="w-full max-w-4xl max-h-[70vh] rounded-2xl shadow-2xl"
                            onEnded={handleVideoEnd}
                            playsInline
                        />

                        {/* Video Controls Overlay */}
                        <div className="mt-8 flex items-center gap-6 bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20">
                            <button
                                onClick={() => {
                                    if (videoRef.current?.paused) {
                                        videoRef.current.play();
                                        setIsPlaying(true);
                                    } else {
                                        videoRef.current?.pause();
                                        setIsPlaying(false);
                                    }
                                }}
                                className="text-white hover:text-pink-400 transition-colors"
                            >
                                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                            </button>

                            <button
                                onClick={() => {
                                    if (videoRef.current) {
                                        videoRef.current.currentTime = 0;
                                        videoRef.current.play();
                                        setIsPlaying(true);
                                    }
                                }}
                                className="text-white hover:text-pink-400 transition-colors"
                            >
                                <RotateCcw size={28} />
                            </button>

                            {isLandscape && (
                                <button
                                    onClick={toggleFullscreen}
                                    className="text-white hover:text-pink-400 transition-colors"
                                >
                                    <Maximize size={28} />
                                </button>
                            )}
                        </div>

                        {/* Mobile Help Text if in portrait */}
                        {!isLandscape && (
                            <p className="mt-4 text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
                                Rotate for better experience 📱
                            </p>
                        )}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center p-8 md:p-12 bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 max-w-lg w-full relative overflow-hidden"
                    >
                        <AnimatePresence mode="wait">
                            {postVideoType === 'text' && showText && (
                                <motion.div
                                    key="text-anim"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.5 }}
                                    className="py-12"
                                >
                                    <h2 className="text-5xl md:text-7xl font-black text-white font-romantic leading-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                                        {postVideoText}
                                    </h2>
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="text-6xl mt-8"
                                    >
                                        ❤️
                                    </motion.div>
                                </motion.div>
                            )}

                            {postVideoType === 'interaction' && interactionStep === 'question' && (
                                <motion.div
                                    key="question-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="w-24 h-24 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Heart className="w-12 h-12 text-pink-500 animate-pulse" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-black text-white font-romantic tracking-wide px-4">
                                        {postVideoQuestion}
                                    </h2>
                                    <div className="flex gap-4 px-4">
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleInteraction('yes')}
                                            className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-emerald-500/20"
                                        >
                                            YES! 😍
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleInteraction('no')}
                                            className="flex-1 py-4 rounded-2xl bg-white/10 text-white/60 font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all"
                                        >
                                            NO 😢
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {postVideoType === 'interaction' && interactionStep === 'celebration' && (
                                <motion.div
                                    key="celebration-step"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-12"
                                >
                                    <motion.div
                                        animate={{
                                            rotate: [0, 10, -10, 10, 0],
                                            scale: [1, 1.2, 1]
                                        }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                        className="text-8xl mb-8"
                                    >
                                        🎉
                                    </motion.div>
                                    <h2 className="text-5xl font-black text-white font-romantic">YAYYY! ❤️</h2>
                                </motion.div>
                            )}

                            {((postVideoType === 'interaction' && interactionStep === 'finished') ||
                                (postVideoType === 'text' && interactionStep === 'finished') ||
                                (postVideoType === 'none')) && (
                                    <motion.div
                                        key="finished-step"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        {interactionResult === 'no' && (
                                            <div className="mb-4 text-white/40 text-sm font-medium italic">
                                                "Oh no... maybe next time? 💔"
                                            </div>
                                        )}
                                        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                        </div>
                                        <h2 className="text-3xl font-black text-white font-romantic tracking-wider">
                                            Mystery Unlocked!
                                        </h2>
                                        <p className="text-white/60 mb-8 font-medium px-4">
                                            {interactionResult === 'yes'
                                                ? "So glad you loved it! Ready to see what's next?"
                                                : "I hope this small surprise brought a smile to your face anyway!"}
                                        </p>
                                        <motion.button
                                            onClick={handleBack}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-full py-5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-pink-600/20"
                                        >
                                            Continue Journey
                                        </motion.button>
                                    </motion.div>
                                )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default GiftBox;
