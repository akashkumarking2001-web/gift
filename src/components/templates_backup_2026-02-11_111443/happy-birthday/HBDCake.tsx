import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Check, Star, Heart, Diamond, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';

const HBDCake = ({ data, onNext }: any) => {
    const [phase, setPhase] = useState<'base' | 'decorating' | 'decorated' | 'lighting' | 'lit' | 'celebration'>('base');
    const [decorations, setDecorations] = useState<{ x: number, y: number, color: string }[]>([]);
    const cakeRef = useRef<HTMLDivElement>(null);

    const handleDecorateClick = (e: React.MouseEvent) => {
        if (phase !== 'base' && phase !== 'decorating') return;

        const rect = cakeRef.current?.getBoundingClientRect();
        if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Interaction Bounds - simplified
            setDecorations(prev => [...prev, {
                x: x + (Math.random() - 0.5) * 5,
                y: y + (Math.random() - 0.5) * 5,
                color: ['#FBBF24', '#ffffff', '#A855F7', '#EC4899'][Math.floor(Math.random() * 4)] // Gold, White, Purple, Pink
            }]);
            setPhase('decorating');
        }
    };

    const lightCandle = () => {
        setPhase('lit');
        setTimeout(() => {
            setPhase('celebration');
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FFA500', '#ffffff']
            });
            setTimeout(onNext, 4500);
        }, 2000);
    };

    return (
        <div className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-start pt-16 overflow-hidden font-outfit select-none">

            {/* HYPER-REALISTIC PATISSERIE ATMOSPHERE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vw] bg-amber-600/10 filter blur-[150px] rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 mix-blend-overlay" />

                {/* Floating Embers */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-amber-400/60 rounded-full blur-[1px]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
                    />
                ))}
            </div>

            {/* Header Area */}
            <div className="relative z-20 text-center mb-0 px-6 max-w-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={phase}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-6"
                    >
                        <motion.div
                            className="inline-flex items-center gap-2 bg-amber-950/40 backdrop-blur-md px-6 py-2 rounded-full border border-amber-500/20 shadow-lg"
                            animate={{ opacity: [0.6, 1, 0.6], boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 0 20px rgba(245,158,11,0.2)', '0 0 0 rgba(0,0,0,0)'] }}
                            transition={{ repeat: Infinity, duration: 4 }}
                        >
                            <Sparkles className="w-4 h-4 text-amber-400" />
                            <span className="text-amber-100 font-black uppercase tracking-[0.3em] text-[10px]">Artisan Patisserie</span>
                        </motion.div>

                        <h2 className="text-4xl md:text-7xl font-black text-white font-romantic leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] max-w-[90vw] mx-auto overflow-hidden tracking-tight">
                            {phase === 'base' && "Craft The Masterpiece 🎂"}
                            {phase === 'decorating' && "Adorn With Gold ✨"}
                            {phase === 'decorated' && "Ignite The Spirit 🔥"}
                            {phase === 'lit' && "A Wish Ascending... 🕯️"}
                            {phase === 'celebration' && (data.congratsText || "JUBILATION!!! 🎉")}
                        </h2>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 3D Cake Structure - High Fidelity */}
            <div className="relative w-full max-w-[340px] md:max-w-[500px] aspect-square z-10 flex flex-col items-center justify-center -mt-8 perspective-[1000px]" ref={cakeRef} onClick={handleDecorateClick}>

                {/* Cake Stand / Plate - Marble & Gold */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-[#1e293b] rounded-[50%] shadow-[0_50px_100px_rgba(0,0,0,0.8)] border-b-4 border-amber-500/30 flex items-center justify-center -z-10 overflow-hidden transform rotate-x-60">
                    <div className="absolute inset-x-0 top-0 h-[2px] bg-white/20 blur-[1px]" />
                </div>

                {/* Cake Bottom Layer - Dark Chocolate Velvet */}
                <motion.div
                    className="relative w-64 h-40 md:w-80 md:h-52 bg-[#3f2020] rounded-b-[2rem] rounded-t-[50%/20px] shadow-[inset_0_-20px_60px_rgba(0,0,0,0.6)] border-t border-white/5 overflow-hidden flex flex-col justify-start z-0 transform-style-3d group"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    {/* Texture Specular */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 mix-blend-multiply" />
                    <div className="h-14 w-full bg-[#5d3030] rounded-b-[40%] shadow-[0_10px_20px_rgba(0,0,0,0.3)] opacity-90 border-b border-white/5" />

                    <div className="mt-12 px-4 flex flex-wrap gap-4 justify-center opacity-20 mix-blend-overlay">
                        <Crown className="w-12 h-12 text-amber-200" />
                        <Diamond className="w-12 h-12 text-amber-200" />
                    </div>
                </motion.div>

                {/* Cake Top Layer - Dark Chocolate Ganache */}
                <motion.div
                    className="absolute bottom-[200px] md:bottom-[240px] left-1/2 -translate-x-1/2 w-48 h-32 md:w-56 md:h-40 bg-[#4a2525] rounded-b-[2rem] rounded-t-[50%/20px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t border-white/5 overflow-hidden flex flex-col justify-start z-10"
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 mix-blend-multiply" />
                    <div className="h-12 w-full bg-[#6b3838] rounded-b-[40%] shadow-[0_8px_15px_rgba(0,0,0,0.3)] opacity-90 border-b border-white/5" />
                </motion.div>

                {/* Interactive Precious Gems */}
                {decorations.map((d: any, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute w-4 h-4 rounded-full z-20 shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                        style={{
                            background: `radial-gradient(circle at 30% 30%, #fff, ${d.color})`,
                            left: d.x,
                            top: d.y,
                            border: '1px solid rgba(255,255,255,0.8)'
                        }}
                    >
                        <Sparkles size={8} className="absolute inset-0 m-auto text-white animate-spin-slow" />
                    </motion.div>
                ))}

                {/* Candle System - Gold Taper */}
                <AnimatePresence>
                    {(phase === 'decorated' || phase === 'lit' || phase === 'celebration') && (
                        <motion.div
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute bottom-[330px] md:bottom-[390px] left-1/2 -translate-x-1/2 flex flex-col items-center z-30"
                        >
                            <div className="w-4 h-28 md:w-6 md:h-32 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 rounded-sm shadow-[0_0_20px_rgba(251,191,36,0.2)] border-x border-amber-100/50" />
                            <div className="w-[2px] h-4 bg-black/80 -mt-1" />

                            {/* Unified Flame Group - Hyper Realistic */}
                            <AnimatePresence>
                                {(phase === 'lit' || phase === 'celebration') && (
                                    <motion.div
                                        key="flame"
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        className="absolute -top-[60px] w-20 h-28 flex items-center justify-center transform origin-bottom"
                                    >
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.05, 0.95, 1],
                                                rotate: [-1, 2, -1],
                                                filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
                                            }}
                                            transition={{ duration: 0.2, repeat: Infinity, ease: "easeInOut" }}
                                            className="relative w-full h-full flex items-center justify-center"
                                        >
                                            {/* Outer Glow */}
                                            <div className="absolute inset-0 bg-orange-500 rounded-full blur-[40px] opacity-40 mix-blend-screen animate-pulse" />
                                            {/* Core Flame */}
                                            <div className="absolute inset-x-6 bottom-0 h-16 bg-gradient-to-t from-blue-600 via-orange-500 to-yellow-200 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] shadow-[0_0_30px_rgba(255,165,0,0.8)] filter blur-[1px]" />
                                            {/* Inner White Hot */}
                                            <div className="absolute inset-x-8 bottom-2 h-8 bg-white rounded-full blur-[4px] mix-blend-screen opacity-90" />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 flex flex-col items-center gap-6 z-20 pb-20">
                {(phase === 'base' || phase === 'decorating') && (
                    <motion.button
                        layout
                        onClick={() => setPhase('decorated')}
                        disabled={decorations.length < 5}
                        className={`px-10 py-4 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all border border-white/10 ${decorations.length < 5 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-amber-500 to-yellow-600 text-[#020617] hover:scale-105 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]'}`}
                    >
                        {decorations.length < 5 ? `Place ${5 - decorations.length} More Gems` : "Complete Artistry"}
                    </motion.button>
                )}

                {phase === 'decorated' && (
                    <motion.button
                        layout
                        onClick={lightCandle}
                        whileHover={{ scale: 1.05 }}
                        className="px-14 py-5 rounded-3xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(234,88,12,0.5)] flex items-center gap-4 border border-orange-400/50 animate-pulse"
                    >
                        <Flame className="w-5 h-5 fill-current" /> Ignite The Moment
                    </motion.button>
                )}
            </div>

            {/* Footer */}
            <div className="fixed bottom-6 text-amber-500/30 text-[9px] font-black uppercase tracking-[0.5em] pointer-events-none">
                Gala Patisserie // Masterpiece
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

export default HBDCake;
