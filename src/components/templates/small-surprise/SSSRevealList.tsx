import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

const SSSRevealList = ({ data, onNext }: any) => {
    const list = [
        "You look adorable",
        "You have the sweetest vibe",
        "Your smile is contagious",
        "You're genuinely special",
        "I'm so lucky to know you"
    ];

    const [revealed, setRevealed] = useState<number[]>([]);

    const handleReveal = (index: number) => {
        if (!revealed.includes(index)) {
            setRevealed(prev => [...prev, index]);
        }
    };

    const allRevealed = revealed.length === list.length;

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0b2e] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            <div className="relative z-20 text-center mb-16 space-y-4">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-white text-3xl md:text-5xl font-black font-romantic tracking-tight"
                >
                    {data.heading || "Just for you"}
                </motion.h2>
                <div className="flex justify-center items-center gap-2 text-pink-400 uppercase tracking-[0.4em] text-[10px] font-bold">
                    <Sparkles size={12} fill="currentColor" />
                    <span>Tap each one to reveal</span>
                    <Sparkles size={12} fill="currentColor" />
                </div>
            </div>

            {/* INTERACTIVE LIST */}
            <div className="relative z-10 w-full max-w-sm space-y-4">
                {list.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => handleReveal(i)}
                        className={`relative group cursor-pointer h-20 rounded-2xl overflow-hidden border transition-all duration-500 ${revealed.includes(i) ? 'bg-white/10 border-white/20' : 'bg-[#111] border-white/5 hover:border-pink-500/30'}`}
                    >
                        <AnimatePresence mode="wait">
                            {!revealed.includes(i) ? (
                                <motion.div
                                    key="hidden"
                                    exit={{ y: -20, opacity: 0 }}
                                    className="absolute inset-0 flex items-center justify-between px-8"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                                            <Heart size={16} fill={i % 2 === 0 ? "currentColor" : "none"} />
                                        </div>
                                        <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div className="w-1/2 h-full bg-white/10" />
                                        </div>
                                    </div>
                                    <Sparkles size={16} className="text-white/10 group-hover:text-pink-500/40 transition-colors" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="revealed"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="absolute inset-0 flex items-center gap-6 px-8"
                                >
                                    <CheckCircle2 size={24} className="text-pink-500 flex-shrink-0" />
                                    <span className="text-white font-medium text-lg tracking-tight">
                                        {item}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* CONTINUE BUTTON */}
            <AnimatePresence>
                {allRevealed && (
                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="mt-16 px-12 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl shadow-xl flex items-center gap-3"
                    >
                        <span>Unseal My Note</span>
                        <Heart size={14} fill="currentColor" className="text-pink-500" />
                    </motion.button>
                )}
            </AnimatePresence>

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

export default SSSRevealList;
