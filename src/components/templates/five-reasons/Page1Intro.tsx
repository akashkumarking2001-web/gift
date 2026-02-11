import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const Page1Intro = ({ data, onNext }: any) => {
    const [holdProgress, setHoldProgress] = useState(0);
    const [isHolding, setIsHolding] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const requestRef = useRef<number>();

    const handleHoldStart = () => setIsHolding(true);
    const handleHoldEnd = () => {
        setIsHolding(false);
        if (holdProgress < 100) setHoldProgress(0);
    };

    useEffect(() => {
        const update = () => {
            if (isHolding && holdProgress < 100) {
                setHoldProgress(prev => Math.min(prev + 1.2, 100));
            } else if (!isHolding && holdProgress > 0) {
                setHoldProgress(prev => Math.max(prev - 2, 0));
            }
            requestRef.current = requestAnimationFrame(update);
        };
        requestRef.current = requestAnimationFrame(update);
        return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
    }, [isHolding, holdProgress]);

    useEffect(() => {
        if (holdProgress === 100 && !isExiting) {
            setIsExiting(true);
            setTimeout(onNext, 800);
        }
    }, [holdProgress, isExiting, onNext]);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0b2e] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT GLOW */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-pink-500/5 blur-[150px] rounded-full animate-pulse-slow" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isExiting ? { opacity: 0, scale: 1.2, filter: 'blur(20px)' } : { opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-sm"
            >
                {/* DARK INTRO CARD */}
                <div className="bg-[#111] rounded-[3rem] p-12 text-center shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/5">
                    <div className="space-y-6 mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-white text-4xl md:text-5xl font-black font-romantic tracking-tight leading-tight"
                        >
                            {data.heading || "5 Reasons I Love You"}
                        </motion.h1>
                        <p className="text-pink-400 font-bold text-[10px] uppercase tracking-[0.4em] opacity-60">
                            Hold the heart to unseal
                        </p>
                    </div>

                    {/* HEART INTERACTION */}
                    <div className="flex justify-center">
                        <div
                            className="relative w-40 h-40 flex items-center justify-center cursor-pointer touch-none"
                            onMouseDown={handleHoldStart}
                            onMouseUp={handleHoldEnd}
                            onMouseLeave={handleHoldEnd}
                            onTouchStart={handleHoldStart}
                            onTouchEnd={handleHoldEnd}
                        >
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="80" cy="80" r="76" className="stroke-white/5 fill-none" strokeWidth="2" />
                                <motion.circle
                                    cx="80"
                                    cy="80"
                                    r="76"
                                    className="stroke-pink-500 fill-none"
                                    strokeWidth="2"
                                    strokeDasharray="477"
                                    animate={{ strokeDashoffset: 477 - (477 * holdProgress) / 100 }}
                                />
                            </svg>

                            <motion.div
                                animate={isHolding ? { scale: 0.85 } : { scale: 1 }}
                                className={`w-28 h-28 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500 ${holdProgress === 100 ? 'bg-pink-500 shadow-[0_0_40px_rgba(236,72,153,0.4)]' : 'bg-pink-500/20'}`}
                            >
                                <Heart
                                    className={`w-14 h-14 transition-colors duration-500 ${holdProgress === 100 ? 'text-white' : 'text-pink-500'}`}
                                    fill={holdProgress > 0 ? "currentColor" : "none"}
                                />
                            </motion.div>
                        </div>
                    </div>

                    <div className="mt-16 text-white/10 uppercase font-black tracking-[0.5em] text-[8px]">
                        Protocol Layer 01
                    </div>
                </div>
            </motion.div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />
        </div>
    );
};

export default Page1Intro;
