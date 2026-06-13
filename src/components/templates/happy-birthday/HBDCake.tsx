import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Star, Cake as CakeIcon, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const HBDCake = ({ data, onNext }: any) => {
    const [phase, setPhase] = useState<'plain' | 'decorated' | 'lighting' | 'lit' | 'celebration'>('plain');

    const handleDecorate = () => {
        setPhase('decorated');
    };

    const handleLight = () => {
        setPhase('lighting');
        setTimeout(() => {
            setPhase('lit');
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#A855F7', '#EC4899', '#ffffff', '#FFD700']
            });
            setPhase('celebration');
            setTimeout(onNext, 4500);
        }, 1500);
    };

    return (
        <div className="relative min-h-screen bg-[#fdfaff] flex flex-col items-center justify-start pt-20 overflow-hidden font-outfit select-none isolate">

            {/* PASTEL ATMOSPHERE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-purple-100/40 blur-[130px] rounded-full" />
            </div>

            {/* Bunting Flags (Drops after lighting) */}
            <AnimatePresence>
                {(phase === 'lit' || phase === 'celebration') && (
                    <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        className="absolute top-0 inset-x-0 h-32 flex justify-around items-start z-50 px-4"
                    >
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ rotate: -10 }}
                                animate={{ rotate: 10 }}
                                transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
                                className={`w-8 h-10 clip-triangle shadow-sm ${i % 2 === 0 ? 'bg-purple-300' : 'bg-pink-300'}`}
                            />
                        ))}
                        <style>{`.clip-triangle { clip-path: polygon(0 0, 100% 0, 50% 100%); }`}</style>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Text Header */}
            <div className="relative z-20 text-center mb-12">
                <motion.h2
                    key={phase}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-4xl font-black text-purple-900 font-romantic"
                >
                    {phase === 'celebration' ? (data.congratsText || "Happy Birthday, Cutiepie!") : "Ready for the cake?"}
                </motion.h2>
                {phase === 'plain' && (
                    <p className="text-slate-500 mt-2">Let's make it look special!</p>
                )}
            </div>

            {/* 3D Cake Design */}
            <div className="relative w-full max-w-sm aspect-square flex flex-col items-center justify-center -mt-10">

                {/* Plate */}
                <div className="absolute bottom-10 w-72 h-12 bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-purple-50" />

                {/* Cake Tiers */}
                <div className="relative flex flex-col items-center">

                    {/* Top Tier */}
                    <motion.div
                        layout
                        className="w-32 h-20 bg-[#fff5f8] border-2 border-pink-100 rounded-2xl relative shadow-md z-10 -mb-4"
                    >
                        <div className="w-full h-8 bg-pink-100/50 rounded-b-full shadow-inner" />

                        {/* Sprinkles (Appear after decorate) */}
                        <AnimatePresence>
                            {(phase !== 'plain') && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 overflow-hidden rounded-2xl">
                                    {[...Array(15)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-1 h-3 rounded-full opacity-60"
                                            style={{
                                                backgroundColor: ['#A855F7', '#EC4899', '#3B82F6', '#10B981'][i % 4],
                                                left: `${Math.random() * 80 + 10}%`,
                                                top: `${Math.random() * 80 + 10}%`,
                                                transform: `rotate(${Math.random() * 360}deg)`
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Bottom Tier */}
                    <motion.div
                        layout
                        className="w-48 h-28 bg-[#fff5f8] border-2 border-pink-100 rounded-2xl relative shadow-lg z-0"
                    >
                        <div className="w-full h-10 bg-pink-100/50 rounded-b-full shadow-inner" />

                        {/* More sprinkles */}
                        <AnimatePresence>
                            {(phase !== 'plain') && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 overflow-hidden rounded-2xl">
                                    {[...Array(25)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute w-1.5 h-4 rounded-full opacity-60"
                                            style={{
                                                backgroundColor: ['#A855F7', '#EC4899', '#3B82F6', '#10B981'][i % 4],
                                                left: `${Math.random() * 80 + 10}%`,
                                                top: `${Math.random() * 80 + 10}%`,
                                                transform: `rotate(${Math.random() * 360}deg)`
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Candle (Appears after decorate) */}
                    <AnimatePresence>
                        {(phase !== 'plain') && (
                            <motion.div
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: -10, opacity: 1 }}
                                className="absolute -top-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
                            >
                                <div className="w-3 h-16 bg-gradient-to-r from-purple-200 to-purple-300 rounded-sm" />

                                {/* Flame */}
                                <AnimatePresence>
                                    {(phase === 'lit' || phase === 'celebration') && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-12"
                                        >
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.2, 1],
                                                    opacity: [0.8, 1, 0.8]
                                                }}
                                                transition={{ duration: 0.3, repeat: Infinity }}
                                                className="relative w-8 h-12"
                                            >
                                                <div className="absolute inset-0 bg-orange-400 blur-xl rounded-full opacity-50" />
                                                <div className="w-full h-full bg-orange-500 rounded-[50%_50%_50%_50%_/60%_60%_40%_40%] relative" />
                                                <div className="absolute top-2 left-2 right-2 bottom-4 bg-yellow-200 rounded-full blur-[2px]" />
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Controls */}
            <div className="relative mt-8 z-30 flex flex-col items-center gap-4">
                {phase === 'plain' && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleDecorate}
                        className="px-10 py-5 bg-white border border-purple-100 text-purple-600 font-black rounded-2xl shadow-lg flex items-center gap-3 uppercase tracking-[0.2em] text-[10px]"
                    >
                        <Sparkles className="w-4 h-4" /> Decorate The Cake
                    </motion.button>
                )}

                {(phase === 'decorated' || phase === 'lighting') && (
                    <motion.button
                        disabled={phase === 'lighting'}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLight}
                        className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black rounded-2xl shadow-xl flex items-center gap-3 uppercase tracking-[0.2em] text-[10px] animate-bounce"
                    >
                        <Flame className="w-4 h-4 fill-current" /> Light The Candle
                    </motion.button>
                )}

                {phase === 'celebration' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-purple-400 font-bold tracking-[0.3em] uppercase text-[10px]"
                    >
                        Next Surprise In A Moment...
                    </motion.div>
                )}
            </div>

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

export default HBDCake;
