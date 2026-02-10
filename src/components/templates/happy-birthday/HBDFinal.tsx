import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, RotateCcw, Share2, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const HBDFinal = ({ data }: any) => {
    const [phase, setPhase] = useState<'closed' | 'shaking' | 'open'>('closed');

    const handleOpen = () => {
        if (phase === 'closed') {
            setPhase('shaking');
            setTimeout(() => {
                setPhase('open');
                fireConfetti();
            }, 1000);
        }
    };

    const fireConfetti = () => {
        const duration = 5000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <div className="relative min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Spotlight Background */}
            <div className={`absolute inset-0 bg-gradient-radial from-pink-800/30 via-transparent to-black transition-opacity duration-1000 ${phase === 'open' ? 'opacity-100' : 'opacity-0'}`} />

            <div className="z-10 text-center relative max-w-2xl px-4">
                <AnimatePresence mode="wait">
                    {phase === 'closed' || phase === 'shaking' ? (
                        <motion.div
                            key="gift-box"
                            className="cursor-pointer group perspective-[1000px]"
                            onClick={handleOpen}
                            animate={phase === 'shaking' ? {
                                x: [-5, 5, -5, 5, 0],
                                rotate: [-2, 2, -1, 1, 0]
                            } : {
                                y: [0, -10, 0]
                            }}
                            transition={phase === 'shaking' ? { duration: 0.4, repeat: 2 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="relative w-64 h-64 mx-auto">
                                {/* Gift Box - CSS 3D Cube-ish */}
                                <div className="absolute inset-x-8 bottom-0 h-48 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg shadow-[0_20px_50px_rgba(236,72,153,0.3)]">
                                    <div className="absolute inset-x-0 top-0 h-12 bg-pink-400 rounded-t-lg" /> {/* Lid */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-full bg-yellow-400/80 shadow-sm" /> {/* Ribbon Vertical */}
                                    <div className="absolute top-1/2 left-0 right-0 h-10 bg-yellow-400/80 -translate-y-1/2 shadow-sm" /> {/* Ribbon Horizontal */}

                                    {/* Bow */}
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-12">
                                        <div className="absolute left-0 w-10 h-10 bg-yellow-400 rounded-full border-4 border-yellow-500 transform -rotate-12" />
                                        <div className="absolute right-0 w-10 h-10 bg-yellow-400 rounded-full border-4 border-yellow-500 transform rotate-12" />
                                    </div>
                                </div>
                            </div>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.8 }}
                                className="mt-8 text-pink-200 text-xl font-bold uppercase tracking-widest animate-pulse"
                            >
                                Tap to Open Your Gift
                            </motion.p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="reveal"
                            initial={{ scale: 0, opacity: 0, rotateY: 180 }}
                            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                            transition={{ type: "spring", stiffness: 120, damping: 15 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl"
                        >
                            {/* Final Reveal Content */}
                            <div className="relative mb-8 inline-block">
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="relative z-10"
                                >
                                    <img
                                        src={data.characterImage || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif"}
                                        className="w-48 h-48 object-cover rounded-full border-4 border-pink-400 shadow-[0_0_30px_#ec4899]"
                                        alt="Character"
                                    />
                                </motion.div>
                                <div className="absolute inset-0 bg-pink-500/50 blur-[50px] -z-10" />
                            </div>

                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-6 drop-shadow-md"
                            >
                                {data.finalText || "Happy Birthday!!"}
                            </motion.h1>

                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="flex gap-4 justify-center"
                            >
                                <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-all text-white font-bold border border-white/10">
                                    <RotateCcw className="w-5 h-5" /> Replay
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all text-white font-bold shadow-lg">
                                    <Share2 className="w-5 h-5" /> Share
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HBDFinal;
