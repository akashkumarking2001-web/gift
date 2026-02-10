import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift } from 'lucide-react';

const HBDLoading = ({ data, onNext }: any) => {
    useEffect(() => {
        const timer = setTimeout(onNext, 4500);
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <div className="relative min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-black opacity-80" />

            {/* Animated Particles (Stars) */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: 0,
                        opacity: 0
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                    style={{
                        width: Math.random() * 3 + 1,
                        height: Math.random() * 3 + 1,
                    }}
                />
            ))}

            <motion.div
                className="z-10 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                {/* 3D-ish Glowing Gift Box */}
                <div className="relative w-32 h-32 mb-12">
                    <motion.div
                        animate={{
                            rotateY: [0, 360],
                            y: [0, -10, 0]
                        }}
                        transition={{
                            rotateY: { duration: 5, repeat: Infinity, ease: "linear" },
                            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative z-10"
                    >
                        {/* Using Lucide Gift as base but adding glow */}
                        <Gift className="w-32 h-32 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.6)]" strokeWidth={1} />
                    </motion.div>

                    {/* Floor Glow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-pink-500/30 blur-xl rounded-full animate-pulse" />
                </div>

                <div className="text-center space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 tracking-tight"
                    >
                        {data.subtext || "Preparing Your Surprise..."}
                    </motion.h2>

                    {/* Premium Progress Bar */}
                    <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/5 mx-auto">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 4, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 relative"
                        >
                            <div className="absolute inset-0 bg-white/30 animate-[shimmer_1s_infinite]" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HBDLoading;
