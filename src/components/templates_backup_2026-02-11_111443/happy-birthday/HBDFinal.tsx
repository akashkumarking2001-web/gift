import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, RotateCcw, Share2, Heart, Sparkles, Crown, Diamond, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

const HBDFinal = ({ data }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        confetti({
            particleCount: 200,
            spread: 90,
            origin: { y: 0.7 },
            colors: ['#FFD700', '#FBBF24', '#ffffff'],
            shapes: ['star'],
        });
    };

    return (
        <div className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center font-outfit overflow-hidden p-6 isolate select-none">

            {/* HYPER-REALISTIC TREASURY ATMOSPHERE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.15),transparent_70%)]"
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-mosaic.png')] opacity-10 mix-blend-overlay" />

                {/* Floating Gold Dust */}
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-amber-400/60 rounded-full blur-[1px]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{ duration: 3 + Math.random() * 7, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="z-10 text-center relative max-w-4xl w-full perspective-[2000px]">
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.div
                            key="gift-closed"
                            className="space-y-16 flex flex-col items-center"
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)', rotateX: 20 }}
                        >
                            <div className="space-y-6">
                                <motion.div
                                    className="inline-flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ repeat: Infinity, duration: 4 }}
                                >
                                    <Sparkles size={12} className="text-amber-400" />
                                    <span className="text-amber-100/60 font-black uppercase tracking-[0.4em] text-[10px]">The Grand Finale</span>
                                    <Sparkles size={12} className="text-amber-400" />
                                </motion.div>

                                <h1 className="text-5xl md:text-8xl font-black text-white font-romantic leading-tight drop-shadow-2xl tracking-tighter">
                                    Your Crown Jewel 💎
                                </h1>
                            </div>

                            <motion.div
                                className="cursor-pointer group relative"
                                onClick={handleOpen}
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                {/* The Treasure Chest - High Fidelity Obsidian & Gold */}
                                <div className="w-72 h-72 md:w-96 md:h-96 bg-[#0f172a] rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/5 flex items-center justify-center isolate relative overflow-hidden transform-style-3d group-hover:scale-105 transition-transform duration-500">

                                    {/* Gold Trim */}
                                    <div className="absolute inset-4 rounded-[2.5rem] border-2 border-amber-500/20 pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent mix-blend-overlay opacity-30 group-hover:opacity-50 transition-opacity" />

                                    {/* Central Emblem */}
                                    <motion.div
                                        className="relative w-32 h-32 md:w-40 md:h-40"
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <Gift className="w-full h-full text-amber-500 stroke-[1] drop-shadow-[0_0_30px_rgba(245,158,11,0.6)]" />
                                        <div className="absolute inset-0 bg-amber-400/20 blur-[40px] rounded-full animate-pulse" />
                                    </motion.div>

                                    {/* Label */}
                                    <div className="absolute bottom-10 font-black text-amber-500 uppercase tracking-[0.4em] text-[10px] bg-[#020617]/80 px-6 py-2 rounded-full border border-amber-500/20 backdrop-blur-xl group-hover:bg-amber-500 group-hover:text-[#020617] transition-all">
                                        Unveil Treasury
                                    </div>
                                </div>

                                {/* Ground Reflection */}
                                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-40 h-10 bg-amber-500/20 blur-[50px] rounded-full" />
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="final-reveal"
                            className="relative flex flex-col items-center"
                            initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
                            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            {/* The Reward Card - High Fidelity */}
                            <div className="bg-[#0f172a]/80 backdrop-blur-3xl border border-amber-500/20 p-10 md:p-20 rounded-[4rem] shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] flex flex-col items-center max-w-2xl w-full relative overflow-hidden group">

                                {/* Background Shimmer */}
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 mix-blend-overlay pointer-events-none" />
                                <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

                                {/* Character Portrait */}
                                <div className="relative mb-16">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                                        className="relative z-10 p-2 bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 rounded-[3rem] shadow-2xl"
                                    >
                                        <div className="w-56 h-56 md:w-72 md:h-72 bg-[#020617] rounded-[2.8rem] overflow-hidden border-4 border-[#020617] relative">
                                            <img
                                                src={data.characterImage || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif"}
                                                className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                                alt="Hero"
                                            />
                                            {/* Gloss */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-[#020617]/40 to-transparent pointer-events-none" />
                                        </div>
                                    </motion.div>

                                    {/* Floating Crown Badge */}
                                    <motion.div
                                        className="absolute -top-8 -right-8 bg-[#0f172a] p-5 rounded-[2rem] shadow-xl border border-amber-500/30 z-20 flex items-center justify-center transform rotate-12"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                    >
                                        <Crown className="w-8 h-8 text-amber-500 fill-amber-500/20" />
                                    </motion.div>
                                </div>

                                <div className="space-y-10 text-center relative z-10 w-full">
                                    <div className="space-y-6">
                                        <h1 className="text-5xl md:text-7xl font-black text-white font-romantic leading-tight drop-shadow-xl tracking-tight">
                                            {data.finalText || "Happy Birthday!!"}
                                        </h1>
                                        <div className="h-[1px] w-32 bg-amber-500/30 mx-auto" />
                                        <p className="text-amber-200/60 font-black uppercase tracking-[0.3em] text-[10px]">
                                            Curated With Eternal Love
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-col md:flex-row gap-4 pt-8 w-full">
                                        <button
                                            onClick={() => window.location.reload()}
                                            className="flex-1 px-8 py-5 bg-[#020617] text-amber-100 rounded-2xl hover:bg-[#1e293b] border border-white/10 hover:border-amber-500/30 transition-all font-black text-[10px] uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3 group/btn"
                                        >
                                            <RotateCcw className="w-4 h-4 group-hover/btn:-rotate-180 transition-transform duration-500" /> Replay Gala
                                        </button>
                                        <button className="flex-1 px-8 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 text-[#020617] rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 group/btn">
                                            <Share2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" /> Share Moment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer Signature */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 opacity-20 pointer-events-none">
                    <span className="font-romantic text-4xl text-white italic">Fin.</span>
                </div>
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

export default HBDFinal;
