import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const Page1BuildUp = ({ data, onNext }: any) => {
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
                setHoldProgress(prev => Math.min(prev + 1.5, 100));
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
        <div className="relative min-h-screen bg-[#fdfaff] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT SOFT FLOW */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-pink-100/50 blur-[130px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isExiting ? { opacity: 0, scale: 1.2, filter: 'blur(20px)' } : { opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-sm"
            >
                {/* INTERACTIVE INTRO CARD */}
                <div className="bg-white rounded-[3rem] p-12 text-center shadow-[0_40px_100px_rgba(236,72,153,0.1)] border border-pink-50">
                    <div className="space-y-4 mb-12">
                        <motion.h2
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-pink-900 text-3xl font-romantic font-black tracking-tight"
                        >
                            {data.heading || "Ready to see something?"}
                        </motion.h2>
                        <p className="text-pink-400 font-bold text-[10px] uppercase tracking-[0.4em]">
                            Hold the heart to begin
                        </p>
                    </div>

                    {/* HEART INTERACTION */}
                    <div className="flex justify-center">
                        <div
                            className="relative w-36 h-36 flex items-center justify-center cursor-pointer touch-none"
                            onMouseDown={handleHoldStart}
                            onMouseUp={handleHoldEnd}
                            onMouseLeave={handleHoldEnd}
                            onTouchStart={handleHoldStart}
                            onTouchEnd={handleHoldEnd}
                        >
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle cx="72" cy="72" r="68" className="stroke-pink-50 fill-none" strokeWidth="4" />
                                <motion.circle
                                    cx="72"
                                    cy="72"
                                    r="68"
                                    className="stroke-pink-500 fill-none"
                                    strokeWidth="4"
                                    strokeDasharray="427"
                                    animate={{ strokeDashoffset: 427 - (427 * holdProgress) / 100 }}
                                />
                            </svg>

                            <motion.div
                                animate={isHolding ? { scale: 0.9 } : { scale: 1 }}
                                className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500 ${holdProgress === 100 ? 'bg-pink-500' : 'bg-pink-100'}`}
                            >
                                <Heart
                                    className={`w-12 h-12 transition-colors duration-500 ${holdProgress === 100 ? 'text-white' : 'text-pink-500'}`}
                                    fill={holdProgress > 0 ? "currentColor" : "none"}
                                />
                            </motion.div>
                        </div>
                    </div>

                    <div className="mt-12">
                        <Sparkles className="mx-auto text-pink-200 animate-pulse" />
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

export default Page1BuildUp;
