import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const HNYEntrance = ({ data, onNext }: any) => {
    const [holdProgress, setHoldProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const requestRef = useRef<number>();

    const handleHoldStart = () => {
        setIsHolding(true);
    };

    const handleHoldEnd = () => {
        setIsHolding(false);
        if (holdProgress < 100) {
            setHoldProgress(0);
        }
    };

    useEffect(() => {
        const update = () => {
            if (isHolding && holdProgress < 100) {
                setHoldProgress(prev => Math.min(prev + 1.5, 100));
            } else if (!isHolding && holdProgress > 0) {
                setHoldProgress(prev => Math.max(prev - 2, 0));
            }
            requestRef.current = requestAnimationFrame(update);
        };

        requestRef.current = requestAnimationFrame(update);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isHolding, holdProgress]);

    useEffect(() => {
        if (holdProgress === 100 && !isExiting) {
            setIsExiting(true);
            setTimeout(onNext, 800);
        }
    }, [holdProgress, isExiting, onNext]);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#09050f] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* ANIMATED STARS/DUST */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.2
                        }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isExiting ? { opacity: 0, scale: 1.2, filter: 'blur(20px)' } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-sm"
            >
                {/* DARK SURPRISE CARD */}
                <div className="bg-[#110c1d]/80 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-12 text-center shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
                    <div className="space-y-4 mb-12">
                        <motion.h2
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-white text-2xl font-light tracking-wide"
                        >
                            {data.heading || "A little surprise for you"}
                        </motion.h2>
                        <motion.p
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 0.6 }}
                            transition={{ delay: 0.2 }}
                            className="text-white font-medium text-sm tracking-widest uppercase"
                        >
                            {data.subtext || "Before this year begins."}
                        </motion.p>
                    </div>

                    {/* INTERACTIVE HEART HOLD */}
                    <div className="flex justify-center">
                        <div
                            className="relative w-32 h-32 flex items-center justify-center cursor-pointer touch-none"
                            onMouseDown={handleHoldStart}
                            onMouseUp={handleHoldEnd}
                            onMouseLeave={handleHoldEnd}
                            onTouchStart={handleHoldStart}
                            onTouchEnd={handleHoldEnd}
                        >
                            {/* Circular Progress Border */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="60"
                                    className="stroke-white/5 fill-none"
                                    strokeWidth="2"
                                />
                                <motion.circle
                                    cx="64"
                                    cy="64"
                                    r="60"
                                    className="stroke-white fill-none"
                                    strokeWidth="2"
                                    strokeDasharray="377" // 2 * pi * 60 approx
                                    animate={{ strokeDashoffset: 377 - (377 * holdProgress) / 100 }}
                                    transition={{ type: "tween", ease: "linear" }}
                                />
                            </svg>

                            {/* Heart Icon */}
                            <motion.div
                                animate={isHolding ? { scale: 0.85 } : { scale: 1 }}
                                className={`w-20 h-20 rounded-full flex items-center justify-center transition-colors duration-500 ${holdProgress === 100 ? 'bg-pink-500 shadow-[0_0_30px_#ec4899]' : 'bg-pink-500/20'}`}
                            >
                                <Heart
                                    className={`w-10 h-10 transition-colors duration-500 ${holdProgress === 100 ? 'text-white' : 'text-pink-500'}`}
                                    fill={holdProgress > 0 ? "currentColor" : "none"}
                                />
                            </motion.div>

                            {/* Glow Effect */}
                            <AnimatePresence>
                                {isHolding && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1.2 }}
                                        exit={{ opacity: 0, scale: 1.5 }}
                                        className="absolute inset-0 bg-pink-500/10 blur-2xl rounded-full -z-10"
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="mt-12 text-white/30 text-[10px] uppercase font-bold tracking-[0.4em] transition-opacity duration-300" style={{ opacity: isHolding ? 0.3 : 1 }}>
                        Tap and hold
                    </div>
                </div>
            </motion.div>

            {/* DECORATIVE TEXT */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/5 text-[10px] uppercase font-black tracking-[0.8em]">
                New Year Protocol // 2026
            </div>
        </div>
    );
};

export default HNYEntrance;
