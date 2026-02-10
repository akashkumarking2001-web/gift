import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cake, Gift, Sparkles } from 'lucide-react';

const HBDLoading = ({ data, onNext }: any) => {
    useEffect(() => {
        const timer = setTimeout(onNext, 4500);
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500 overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="party-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <text x="10" y="30" fontSize="40" fill="white">🧁</text>
                            <text x="60" y="80" fontSize="30" fill="white">🎈</text>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#party-pattern)" />
                </svg>
            </div>

            {/* Floating Elements */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-4xl opacity-30 pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -40, 0],
                        rotate: [0, 360],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 4 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2
                    }}
                >
                    {['🎁', '✨', '🎂', '🥳'][i % 4]}
                </motion.div>
            ))}

            <motion.div
                className="z-10 flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                {/* 3D-ish Glowing Gift Box */}
                <div className="relative w-40 h-40 mb-12">
                    <motion.div
                        animate={{
                            rotateY: [0, 360],
                            y: [0, -15, 0]
                        }}
                        transition={{
                            rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
                            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative z-10 drop-shadow-2xl"
                    >
                        {/* Using Lucide Gift as base but adding glow */}
                        <Gift className="w-40 h-40 text-white fill-white/20 stroke-[1.5]" />
                    </motion.div>

                    {/* Floor Glow */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/40 blur-xl rounded-full animate-pulse" />
                </div>

                <div className="text-center space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-3xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight font-romantic"
                    >
                        {data.subtext || "Preparing Your Surprise..."}
                    </motion.h2>

                    {/* Premium Progress Bar */}
                    <div className="w-64 h-3 bg-black/10 rounded-full overflow-hidden backdrop-blur-sm border border-white/20 mx-auto shadow-inner">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 4, ease: "easeInOut" }}
                            className="h-full bg-white relative"
                        >
                            <div className="absolute inset-0 bg-white/50 animate-[shimmer_1s_infinite]" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default HBDLoading;
