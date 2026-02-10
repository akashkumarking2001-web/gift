import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const HBDIntro = ({ data, onNext }: any) => {
    // Cinematic Reveal State
    const [isRevealing, setIsRevealing] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        // Fire confetti on load for celebration effect
        const timer = setTimeout(() => {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#FFC0CB', '#FF69B4', '#DA70D6'],
                startVelocity: 45,
            });
            setShowContent(true);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleStart = () => {
        setIsRevealing(true);
        setTimeout(onNext, 1200); // Wait for exit animation
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden flex flex-col items-center justify-center p-6 perspective-[1000px]">
            {/* Background Texture & Floating Elements */}
            <div className="absolute inset-x-0 bottom-0 top-[20%] bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />

            {/* 3D Floating Clouds/Shapes */}
            <motion.div
                className="absolute top-10 -left-20 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px]"
                animate={{ x: [0, 50, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[120px]"
                animate={{ x: [0, -50, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity }}
            />

            <AnimatePresence>
                {!isRevealing && showContent && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 max-w-lg w-full"
                    >
                        {/* 3D Glassmorphism Card */}
                        <div className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-[40px] p-8 md:p-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden transform-style-3d hover:rotate-x-2 transition-transform duration-500">

                            {/* Inner Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            {/* Character/Image Avatar with Pop Effect */}
                            <div className="flex justify-center mb-8 relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: [0, -5, 5, 0] }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                    className="relative z-10"
                                >
                                    <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white/30 p-1 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-gradient-to-br from-pink-400 to-purple-500">
                                        <img
                                            src={data.mainImage || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif"}
                                            className="w-full h-full object-cover rounded-full"
                                            alt="Birthday Star"
                                        />
                                    </div>
                                    <motion.div
                                        className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 p-3 rounded-full shadow-lg"
                                        animate={{ rotate: [0, 20, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                        <Sparkles className="w-6 h-6" />
                                    </motion.div>
                                </motion.div>

                                {/* Background Halo */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/30 rounded-full blur-3xl -z-10 animate-pulse" />
                            </div>

                            {/* Typography */}
                            <div className="text-center space-y-4 mb-4">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-4xl md:text-5xl font-black text-white drop-shadow-lg tracking-tight leading-none"
                                >
                                    {data.heading?.split(' ').map((word: string, i: number) => (
                                        <span key={i} className="inline-block hover:text-pink-300 transition-colors cursor-default mr-2">
                                            {word}
                                        </span>
                                    )) || "Happy Birthday!"}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-lg md:text-xl text-pink-100/90 font-medium leading-relaxed"
                                >
                                    {data.subtext || "Someone special deserves a special surprise..."}
                                </motion.p>
                            </div>

                            {/* CTA Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236,72,153,0.6)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleStart}
                                className="w-full mt-6 py-5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-lg md:text-xl shadow-lg border border-white/20 relative overflow-hidden group/btn"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {data.buttonText || "Let's Party!"} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HBDIntro;
