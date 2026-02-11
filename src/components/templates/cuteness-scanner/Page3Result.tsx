import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Trophy, RotateCcw, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const Page3Result = ({ data }: any) => {
    const [percentage, setPercentage] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            let start = 0;
            const target = data.resultPercentage || 99.9;
            const interval = setInterval(() => {
                start += 1.1;
                if (start >= target) {
                    setPercentage(target);
                    clearInterval(interval);
                    triggerConfetti();
                } else {
                    setPercentage(start);
                }
            }, 20);
        }, 800);
        return () => clearTimeout(timer);
    }, [data.resultPercentage]);

    const triggerConfetti = () => {
        setShowConfetti(true);
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };

    return (
        <div className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT GLOW */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-pink-500/10 blur-[150px] rounded-full animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-2xl text-center"
            >
                {/* Result Card */}
                <div className="bg-white/[0.03] backdrop-blur-[100px] border border-white/10 rounded-[4rem] p-12 md:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.5)] isolate relative overflow-hidden">

                    {/* Decorative Elements */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 border-[2px] border-dashed border-pink-500/10 rounded-full scale-[1.5]"
                    />

                    <div className="space-y-12 relative z-10">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', delay: 0.5 }}
                                className="inline-flex items-center gap-3 bg-pink-500/10 px-6 py-2 rounded-full border border-pink-500/30"
                            >
                                <Trophy size={14} className="text-pink-400" />
                                <span className="text-pink-400 font-black uppercase tracking-[0.4em] text-[10px]">Analysis Complete</span>
                            </motion.div>
                            <h2 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter drop-shadow-2xl">
                                {data.resultHeading || "Verdict: Extraterrestrial Cuteness!"}
                            </h2>
                        </div>

                        {/* PERCENTAGE READOUT */}
                        <div className="relative">
                            <motion.div
                                className="text-[10rem] md:text-[15rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-300 to-pink-500 leading-none tracking-tighter"
                            >
                                {percentage.toFixed(1)}%
                            </motion.div>
                            <motion.div
                                className="absolute top-0 right-10 md:right-20"
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <Heart className="text-pink-500 fill-current w-12 h-12 shadow-[0_0_30px_rgba(236,72,153,1)]" />
                            </motion.div>
                        </div>

                        <p className="text-pink-100/60 text-lg md:text-xl font-medium max-w-sm mx-auto leading-relaxed">
                            {data.resultText || "Our sensors are melting! This level of cuteness is scientifically impossible to handle."}
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 mt-12">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => window.location.reload()}
                                className="flex-1 py-5 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl flex items-center justify-center gap-3 shadow-xl"
                            >
                                <RotateCcw size={14} /> Scan Again
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex-1 py-5 bg-pink-600/20 border border-pink-500/30 text-pink-400 font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl flex items-center justify-center gap-3"
                            >
                                <Share2 size={14} /> Share Report
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* HIGH-TECH FOOTER */}
            <div className="fixed bottom-12 inset-x-0 flex justify-center gap-12 opacity-10">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <div className="h-2 w-[1px] bg-white mb-2" />
                        <span className="text-[8px] font-black tracking-widest text-white uppercase">SENS_MOD_{i + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page3Result;
