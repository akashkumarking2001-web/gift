import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, LucideShieldAlert, Sparkles } from 'lucide-react';

const SSSMeter = ({ data, onNext }: any) => {
    const [count, setCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let start = 0;
        const end = 120;
        const duration = 3500;
        const startTime = performance.now();

        const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutCirc = (x: number): number => Math.sqrt(1 - Math.pow(x - 1, 2));
            const current = Math.floor(start + (end - start) * easeOutCirc(progress));

            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                setIsFinished(true);
                setTimeout(onNext, 4000);
            }
        };

        requestAnimationFrame(update);
    }, [onNext]);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0b2e] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-sm"
            >
                {/* DARK METER CARD */}
                <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-10 md:p-12 text-center shadow-[0_50px_100px_rgba(0,0,0,0.8)] min-h-[400px] flex flex-col justify-center gap-12 isolate overflow-hidden">

                    {/* Background Noise/Grid */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay -z-10" />

                    <div className="space-y-4">
                        <motion.h3
                            className="text-white/60 font-bold uppercase tracking-[0.3em] text-[10px]"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            Algorithm Scanning...
                        </motion.h3>
                        <h2 className="text-white text-3xl font-romantic tracking-tight">
                            {data.heading || "Measuring your cuteness..."}
                        </h2>
                    </div>

                    {/* DYNAMIC PROGRESS DISPLAY */}
                    <div className="space-y-8">
                        <div className="relative">
                            <motion.div
                                className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-400 to-rose-600 transition-all filter drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                                animate={isFinished ? { scale: [1, 1.1, 1], filter: 'drop-shadow(0 0 40px rgba(236,72,153,0.6))' } : {}}
                            >
                                {count}%
                            </motion.div>

                            {/* Orbital Particles */}
                            {isFinished && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                        className="w-full h-full border border-pink-500/20 rounded-full border-dashed"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Progress Bar Container */}
                        <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden relative border border-white/10">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${(count / 120) * 100}%` }}
                                transition={{ type: "tween", ease: "circOut" }}
                                className={`h-full bg-gradient-to-r from-pink-500 to-rose-500 relative ${isFinished ? 'shadow-[0_0_20px_#ec4899]' : ''}`}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-shimmer" style={{ backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
                            </motion.div>
                        </div>
                    </div>

                    {/* ALERT BOX */}
                    <AnimatePresence>
                        {isFinished && (
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-6 flex flex-col items-center gap-3 shadow-[0_10px_30px_rgba(225,29,72,0.2)] animate-pulse"
                            >
                                <div className="flex items-center gap-3 text-rose-500">
                                    <AlertTriangle size={20} fill="currentColor" className="text-rose-100" />
                                    <span className="font-black uppercase tracking-[0.2em] text-[10px]">Critical Overload</span>
                                </div>
                                <p className="text-white font-bold text-sm">
                                    ⚠️ WARNING: TOO CUTE TO HANDLE
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* DECORATIVE LABELS */}
            <div className="absolute top-10 right-10 flex flex-col items-end opacity-20">
                <LucideShieldAlert className="text-pink-500 w-12 h-12 mb-2" />
                <span className="text-[10px] font-black text-pink-200">System Capacity Overflow</span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
                @keyframes shimmer {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 1.5s infinite linear;
                }
            `}} />
        </div>
    );
};

export default SSSMeter;
