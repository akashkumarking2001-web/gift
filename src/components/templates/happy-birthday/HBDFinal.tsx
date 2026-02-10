import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, RotateCcw, Share2, Heart, Sparkles } from 'lucide-react';
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
        <div className="relative min-h-screen bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500 flex flex-col items-center justify-center overflow-hidden">
            {/* Background Floating Elements */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-5xl opacity-10 pointer-events-none"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: 'linear' }}
                >
                    ✨
                </motion.div>
            ))}

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
                                y: [0, -20, 0]
                            }}
                            transition={phase === 'shaking' ? { duration: 0.4, repeat: 2 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="relative w-72 h-72 mx-auto">
                                {/* Gift Box - White and Gold Style */}
                                <div className="absolute inset-x-4 bottom-0 h-56 bg-white rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border-4 border-rose-100/50">
                                    <div className="absolute inset-x-0 top-0 h-16 bg-white rounded-t-3xl shadow-sm border-b border-rose-100" /> {/* Lid */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-full bg-gradient-to-b from-yellow-300 to-yellow-500 shadow-sm" /> {/* Ribbon Vertical */}
                                    <div className="absolute top-1/2 left-0 right-0 h-12 bg-gradient-to-r from-yellow-300 to-yellow-500 -translate-y-1/2 shadow-sm" /> {/* Ribbon Horizontal */}

                                    {/* Bow */}
                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-16">
                                        <div className="absolute left-0 w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full border-4 border-yellow-200 transform -rotate-12 shadow-md" />
                                        <div className="absolute right-0 w-16 h-16 bg-gradient-to-bl from-yellow-300 to-yellow-500 rounded-full border-4 border-yellow-200 transform rotate-12 shadow-md" />
                                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-yellow-400 rounded-full shadow-inner border-2 border-yellow-200" />
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-12 inline-block bg-white text-rose-600 font-black text-xl uppercase tracking-[0.3em] px-8 py-3 rounded-full shadow-lg animate-bounce"
                            >
                                Tap to Open
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="reveal"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 120, damping: 15 }}
                            className="relative"
                        >
                            {/* Card Background for Final Message */}
                            <div className="bg-white/90 backdrop-blur-xl border-4 border-white p-10 md:p-14 rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] relative overflow-hidden">
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl opacity-50" />
                                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-gradient-to-tr from-yellow-200 to-orange-200 rounded-full blur-3xl opacity-50" />

                                {/* Avatar */}
                                <div className="relative mb-8 inline-block shadow-2xl rounded-full">
                                    <motion.div
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="relative z-10 p-1 bg-white rounded-full"
                                    >
                                        <img
                                            src={data.characterImage || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif"}
                                            className="w-48 h-48 object-cover rounded-full border-4 border-rose-200"
                                            alt="Character"
                                        />
                                    </motion.div>
                                    <div className="absolute top-0 right-0 bg-yellow-400 text-white p-3 rounded-full shadow-lg border-2 border-white transform translate-x-1/4 -translate-y-1/4 z-20">
                                        <Sparkles className="w-6 h-6 fill-current animate-pulse" />
                                    </div>
                                </div>

                                <motion.h1
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-5xl md:text-7xl font-black text-rose-600 mb-6 drop-shadow-sm font-romantic leading-tight"
                                >
                                    {data.finalText || "Happy Birthday!!"}
                                </motion.h1>

                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex gap-4 justify-center"
                                >
                                    <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-8 py-4 bg-rose-100 text-rose-600 rounded-[2rem] hover:bg-rose-200 transition-all font-black text-xs uppercase tracking-widest">
                                        <RotateCcw className="w-4 h-4" /> Replay
                                    </button>
                                    <button className="flex items-center gap-2 px-8 py-4 bg-rose-600 text-white rounded-[2rem] hover:bg-rose-700 transition-all font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-200">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HBDFinal;
