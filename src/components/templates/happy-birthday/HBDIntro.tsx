import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Star, Cake } from 'lucide-react';
import confetti from 'canvas-confetti';

const HBDIntro = ({ data, onNext }: any) => {
    const [showContent, setShowContent] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#A855F7', '#EC4899', '#ffffff']
            });
            setShowContent(true);
        }, 600);
        return () => clearTimeout(timer);
    }, []);

    const handleNext = () => {
        setIsExiting(true);
        setTimeout(onNext, 800);
    };

    return (
        <div className="relative min-h-screen bg-[#fdfaff] overflow-hidden flex flex-col items-center justify-center p-6 font-outfit isolate">

            {/* SOFT PASTEL BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.3, 0.4, 0.3],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.1),transparent_50%)]"
                />

                {/* Floating Bubbles/Sparkles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full border border-purple-200"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
                    />
                ))}
            </div>

            <AnimatePresence>
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={isExiting ? { opacity: 0, scale: 0.8, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 w-full max-w-lg"
                    >
                        {/* CLEAN WHITE SURPRISE CARD */}
                        <div className="relative bg-white border border-purple-50 rounded-[2.5rem] p-10 md:p-14 shadow-[0_25px_80px_-15px_rgba(168,85,247,0.15)] text-center overflow-hidden">

                            {/* Visual Anchor: Animated Character */}
                            <div className="flex justify-center mb-10 pt-4">
                                <motion.div
                                    animate={{
                                        y: [0, -12, 0],
                                        rotate: [0, 2, -2, 0]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="relative"
                                >
                                    <div className="w-56 h-56 rounded-[2rem] bg-purple-50/50 flex items-center justify-center p-2 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-rose-100/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <img
                                            src={data.mainImage || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkNXhndm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4mZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PXM/MeIucAjPKoA1j0zZX/giphy.gif"} // Using a cute gif placeholder
                                            className="w-full h-full object-contain relative z-10 scale-125"
                                            alt="Cutiepie Bear"
                                        />

                                        {/* Floatings Hearts around char */}
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute top-4 right-4"
                                        >
                                            <Heart className="text-pink-300 fill-current w-6 h-6" />
                                        </motion.div>
                                    </div>

                                    {/* Shadow under char */}
                                    <div className="w-40 h-4 bg-purple-900/5 blur-lg rounded-full mx-auto mt-4" />
                                </motion.div>
                            </div>

                            {/* Typography Section */}
                            <div className="space-y-6 mb-10">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="inline-flex items-center gap-2 text-purple-400 font-bold uppercase tracking-[0.2em] text-[10px]"
                                >
                                    <Star size={12} className="fill-current animate-pulse" />
                                    <span>Special Surprise</span>
                                    <Star size={12} className="fill-current animate-pulse" />
                                </motion.div>

                                <motion.h1
                                    className="text-3xl md:text-4xl font-black text-purple-900 leading-tight font-romantic"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {data.heading || "A Cutiepie was born today!"}
                                </motion.h1>
                                <motion.p
                                    className="text-slate-500 font-outfit text-lg max-w-xs mx-auto text-balance leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    {data.subtext || "Yes, it’s YOU! A little surprise awaits..."}
                                </motion.p>
                            </div>

                            {/* Romantic Action Button */}
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(168,85,247,0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleNext}
                                className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-all duration-300"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>{data.buttonText || "Start the surprise"}</span>
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,800&display=swap');
                }
            `}} />
        </div>
    );
};

export default HBDIntro;
