import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Heart, Crown, Star, Ticket } from 'lucide-react';
import confetti from 'canvas-confetti';

const HBDIntro = ({ data, onNext }: any) => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            confetti({
                particleCount: 150,
                spread: 120,
                origin: { y: 0.7 },
                colors: ['#FFD700', '#FFA500', '#ffffff', '#B8860B']
            });
            setShowContent(true);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative min-h-screen bg-[#020617] overflow-hidden flex flex-col items-center justify-center p-6 font-outfit isolate">

            {/* HYPER-REALISTIC MIDNIGHT GALA ATMOSPHERE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.15),transparent_70%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.1),transparent_70%)]"
                />

                {/* Floating Gold Dust */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-amber-200/40 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1.5, 0.5]
                        }}
                        transition={{ duration: 4 + Math.random() * 6, repeat: Infinity }}
                    />
                ))}

                {/* Spotlight Beams */}
                <div className="absolute top-0 left-1/4 w-[2px] h-[100vh] bg-gradient-to-b from-white/10 to-transparent rotate-[15deg] blur-[2px]" />
                <div className="absolute top-0 right-1/4 w-[2px] h-[100vh] bg-gradient-to-b from-white/10 to-transparent rotate-[-15deg] blur-[2px]" />
            </div>

            <AnimatePresence>
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 w-full max-w-xl"
                    >
                        {/* HIGH-FIDELITY GALA INVITATION CARD */}
                        <div className="relative bg-[#0f172a]/80 backdrop-blur-3xl border border-amber-500/20 rounded-[4rem] p-10 md:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] text-center overflow-hidden group">

                            {/* Inner Gold Border & Texture */}
                            <div className="absolute inset-2 rounded-[3.5rem] border border-amber-500/10 pointer-events-none" />
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />

                            {/* Visual Anchor: The Crown Status */}
                            <div className="flex justify-center mb-10">
                                <motion.div
                                    initial={{ scale: 0, rotate: -15 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", damping: 15, delay: 0.2 }}
                                    className="relative"
                                >
                                    <div className="relative w-48 h-48 md:w-60 md:h-60 rounded-[3rem] p-2 bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 shadow-2xl skew-y-0 group-hover:skew-y-1 transition-transform duration-700">
                                        <div className="w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-[#0f172a] relative">
                                            <img
                                                src={data.mainImage || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif"}
                                                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 scale-110"
                                                alt="Celebrant"
                                            />
                                            {/* Shine Effect */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-[#020617]/40 to-transparent" />
                                        </div>

                                        {/* Floating Badge */}
                                        <motion.div
                                            className="absolute -top-6 -right-6 w-16 h-16 bg-[#0f172a] rounded-full border-2 border-amber-500 flex items-center justify-center shadow-lg z-20"
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ repeat: Infinity, duration: 3 }}
                                        >
                                            <Crown size={28} className="text-amber-400 fill-amber-400/20" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Typography Section */}
                            <div className="space-y-8 mb-12 relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="inline-flex items-center gap-3 bg-amber-950/30 px-6 py-2 rounded-full border border-amber-500/20"
                                >
                                    <Star size={12} className="text-amber-400 fill-current" />
                                    <span className="text-amber-100/60 font-bold uppercase tracking-[0.2em] text-[10px]">Royal Invitation</span>
                                    <Star size={12} className="text-amber-400 fill-current" />
                                </motion.div>

                                <motion.h1
                                    className="text-4xl md:text-6xl font-black text-white font-romantic leading-tight drop-shadow-2xl"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    {data.heading || "The Golden Jubilee"}
                                </motion.h1>
                                <motion.p
                                    className="text-amber-200/60 font-outfit text-lg tracking-wide max-w-xs mx-auto"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    {data.subtext || "A curated experience of celebration awaiting your presence."}
                                </motion.p>
                            </div>

                            {/* Professional Action Button */}
                            <motion.button
                                whileHover={{ scale: 1.02, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onNext}
                                className="w-full py-6 rounded-3xl bg-gradient-to-r from-amber-400 to-yellow-600 text-[#020617] font-black text-xs uppercase tracking-[0.4em] shadow-[0_20px_40px_-10px_rgba(245,158,11,0.4)] flex items-center justify-center gap-4 group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Ticket className="w-5 h-5" />
                                <span className="relative z-10">{data.buttonText || "Enter The Gala"}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Corner Metadata Decor */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-2 opacity-15">
                <div className="h-[1px] w-32 bg-amber-500" />
                <span className="text-[10px] font-black tracking-[0.5em] text-amber-200 uppercase">Gala Status: Open</span>
            </div>

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

export default HBDIntro;
