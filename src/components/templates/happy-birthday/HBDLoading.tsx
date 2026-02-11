import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cake, Star, Heart } from 'lucide-react';

const HBDLoading = ({ data, onNext }: any) => {
    useEffect(() => {
        const timer = setTimeout(onNext, 4000);
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <div className="relative min-h-screen bg-[#fdfaff] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* SOFT LAVENDER ATMOSPHERE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-purple-200/30 blur-[120px] rounded-full mix-blend-multiply animate-pulse-slow" />
                <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-pink-100/40 blur-[100px] rounded-full mix-blend-multiply" />
            </div>

            {/* FLOATING DECORATIONS */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            scale: Math.random() * 0.5 + 0.5,
                            opacity: 0
                        }}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 20, 0],
                            rotate: [0, 15, -15, 0],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    >
                        {i % 2 === 0 ? (
                            <Star className="text-purple-300 w-6 h-6 fill-current" />
                        ) : (
                            <div className="w-4 h-6 border-2 border-pink-200 rounded-t-full relative">
                                <div className="absolute -top-1 left-1.5 w-0.5 h-2 bg-pink-200" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="z-10 flex flex-col items-center max-w-lg w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                {/* Minimalist 3D-styled Cake Icon */}
                <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
                    <motion.div
                        animate={{
                            rotate: [0, 5, -5, 0],
                            y: [0, -5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative z-10 p-5 bg-white rounded-full shadow-[0_15px_40px_rgba(168,85,247,0.15)] border border-purple-50"
                    >
                        <Cake className="w-12 h-12 text-purple-400 stroke-[1.5]" />

                        {/* Soft Glow */}
                        <div className="absolute inset-0 bg-purple-400/10 blur-xl rounded-full -z-10" />
                    </motion.div>

                    {/* Orbiting particles */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 pointer-events-none"
                    >
                        <Heart className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 text-pink-300 fill-current" />
                    </motion.div>
                </div>

                <div className="text-center space-y-8 flex flex-col items-center w-full">
                    <div className="space-y-4">
                        <motion.h2
                            className="text-2xl md:text-3xl font-medium text-purple-900/80 tracking-tight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {data.subtext || "Loading your birthday surprise..."}
                        </motion.h2>
                    </div>

                    {/* Minimalist Purple Progress Bar */}
                    <div className="w-64 h-2 bg-purple-100 rounded-full overflow-hidden relative shadow-inner">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3.5, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-purple-300 via-purple-400 to-pink-300 relative"
                        >
                            {/* Animated Shine Effect */}
                            <motion.div
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 w-1/2 bg-white/30 skew-x-[45deg]"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Typography Decoration */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 text-[10px] uppercase font-bold tracking-[0.5em] text-purple-400"
            >
                Birthday Experience V4.0
            </motion.div>
        </div>
    );
};

export default HBDLoading;
