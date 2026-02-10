import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
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
                colors: ['#FFC0CB', '#FF69B4', '#DA70D6', '#fff'],
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
        <div className="relative min-h-screen bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500 overflow-hidden flex flex-col items-center justify-center p-6 perspective-[1000px]">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="heart-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <text x="10" y="30" fontSize="40" fill="white">💖</text>
                            <text x="60" y="80" fontSize="30" fill="white">✨</text>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#heart-pattern)" />
                </svg>
            </div>

            {/* 3D Floating Shapes (Background) */}
            <motion.div
                className="absolute top-10 -left-20 w-64 h-64 bg-white/20 rounded-full blur-[80px]"
                animate={{ x: [0, 50, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 -right-20 w-80 h-80 bg-rose-300/30 rounded-full blur-[100px]"
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
                        className="relative z-10 max-w-lg w-full transform-style-3d"
                    >
                        {/* 3D Glassmorphism Card */}
                        {/* Matching the style of Page2WhyYou: rounded-[2.5rem], glass-card-static effect via backdrop-blur and border */}
                        <div className="group relative bg-white/20 backdrop-blur-xl border-2 border-white/40 rounded-[2.5rem] p-10 md:p-14 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden transition-transform duration-500 hover:scale-[1.02]">

                            {/* Shiny Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-50 pointer-events-none" />

                            {/* Character/Image Avatar with Pop Effect */}
                            <div className="flex justify-center mb-10 relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1, rotate: [0, -5, 5, 0] }}
                                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                                    className="relative z-10"
                                >
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-[2rem] border-[6px] border-white p-1 shadow-[0_20px_40px_rgba(0,0,0,0.2)] bg-gradient-to-br from-pink-200 to-rose-300 rotate-3 transition-transform group-hover:rotate-0 duration-500">
                                        <img
                                            src={data.mainImage || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif"}
                                            className="w-full h-full object-cover rounded-[1.5rem]"
                                            alt="Birthday Star"
                                        />
                                    </div>
                                    <motion.div
                                        className="absolute -bottom-4 -right-4 bg-white text-rose-500 p-4 rounded-full shadow-lg border-4 border-rose-100"
                                        animate={{ rotate: [0, 20, 0], scale: [1, 1.1, 1] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                        <Sparkles className="w-8 h-8 fill-rose-500" />
                                    </motion.div>
                                </motion.div>
                            </div>

                            {/* Typography */}
                            <div className="text-center space-y-4 mb-8">
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-5xl md:text-6xl font-black text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)] tracking-tighter leading-[0.9] font-romantic"
                                >
                                    {data.heading || "Happy Birthday!"}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="text-xl md:text-2xl text-white/90 font-bold tracking-wide drop-shadow-sm uppercase"
                                >
                                    {data.subtext || "Someone special deserves a special surprise..."}
                                </motion.p>
                            </div>

                            {/* CTA Button */}
                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleStart}
                                className="w-full py-5 rounded-[2rem] bg-white text-rose-600 font-black text-xl tracking-[0.2em] uppercase shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all relative overflow-hidden group/btn"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {data.buttonText || "Let's Party!"} <ArrowRight className="w-6 h-6 stroke-[3]" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-pink-100 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HBDIntro;
