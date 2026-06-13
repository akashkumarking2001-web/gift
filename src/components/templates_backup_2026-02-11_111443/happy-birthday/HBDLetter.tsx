import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Pen, ArrowRight, Sparkles, Feather, Crown, Stamp } from 'lucide-react';

const HBDLetter = ({ data, onNext }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 relative font-outfit overflow-hidden isolate select-none">

            {/* HYPER-REALISTIC LETTER ATMOSPHERE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-amber-900/10 blur-[200px] rounded-full mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20 mix-blend-overlay" />

                {/* Parallax Dust */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-amber-200/20 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -40, 0],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{ duration: 6 + Math.random() * 6, repeat: Infinity }}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="closed-envelope"
                        className="relative z-10 flex flex-col items-center max-w-2xl"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    >
                        <div className="text-center mb-16 space-y-4">
                            <motion.div
                                className="inline-flex items-center gap-2 bg-amber-950/30 px-6 py-2 rounded-full border border-amber-500/20"
                                animate={{ opacity: [0.6, 1, 0.6] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                            >
                                <Feather className="w-4 h-4 text-amber-500/60" />
                                <span className="text-amber-100/60 font-black uppercase tracking-[0.3em] text-[10px]">Royal Deliverance</span>
                            </motion.div>

                            <h2 className="text-5xl md:text-8xl font-black text-white font-romantic leading-tight drop-shadow-2xl">
                                An Edict For You 📜
                            </h2>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02, rotate: 1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsOpen(true)}
                            className="relative cursor-pointer group perspective-[2000px]"
                        >
                            {/* The Envelope - High Fidelity Obsidian */}
                            <div className="w-80 h-56 md:w-[500px] md:h-72 bg-[#0f172a] rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] relative overflow-hidden border border-white/5 flex items-center justify-center isolate transform-style-3d transition-transform duration-700">

                                {/* Texture Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50 pointer-events-none" />
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-30 mix-blend-overlay" />

                                {/* The Seal */}
                                <div className="w-24 h-24 bg-gradient-to-br from-amber-600 via-yellow-700 to-amber-900 rounded-full shadow-[0_20px_40px_-5px_rgba(180,83,9,0.5)] flex items-center justify-center border-4 border-amber-900/50 group-hover:scale-110 transition-transform duration-500">
                                    <Crown className="w-10 h-10 text-amber-100 fill-amber-100/20" />
                                </div>

                                {/* Label */}
                                <div className="absolute bottom-8 font-black text-amber-500/40 uppercase tracking-[0.4em] text-[10px] bg-black/40 px-4 py-1 rounded-full backdrop-blur-md border border-white/5 group-hover:text-amber-400 transition-colors">
                                    Break The Seal
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="open-letter"
                        className="relative w-full max-w-3xl bg-[#fffcf5] rounded-[3rem] shadow-[0_50px_150px_rgba(0,0,0,1)] z-20 overflow-hidden isolate"
                        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    >
                        {/* Letter Header */}
                        <div className="px-12 py-8 border-b border-amber-900/10 flex justify-between items-center bg-[#f7f2e6]">
                            <div className="flex items-center gap-3">
                                <Stamp className="w-5 h-5 text-amber-700" />
                                <span className="text-amber-900/60 font-black uppercase tracking-[0.3em] text-[10px]">Official Decree</span>
                            </div>
                            <div className="h-2 w-2 bg-amber-900/20 rounded-full animate-pulse" />
                        </div>

                        {/* Letter Body - Parchment Texture */}
                        <div className="p-12 md:p-20 min-h-[400px] relative bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
                            {/* Decorative Margin */}
                            <div className="absolute left-10 md:left-16 top-0 bottom-0 w-[1px] bg-amber-900/10" />

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="relative z-10 font-romantic text-amber-950 leading-[2] pl-8 md:pl-12 tracking-wide"
                            >
                                <p className="whitespace-pre-wrap text-2xl md:text-4xl font-medium drop-shadow-sm">
                                    {data.message || "My Dearest,\n\nOn this momentous occasion, I decree a year of boundless joy and prosperity for you. \n\nYou are the crown jewel of my life, shining brighter than all the stars combined."}
                                </p>
                            </motion.div>

                            {/* Watermark */}
                            <Crown className="absolute bottom-10 right-10 w-40 h-40 text-amber-900/5 rotate-[-20deg] pointer-events-none" />
                        </div>

                        {/* Footer Actions */}
                        <div className="px-12 py-10 bg-[#f7f2e6] flex justify-center border-t border-amber-900/5">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onNext}
                                className="px-14 py-6 rounded-3xl bg-[#0f172a] text-amber-100 font-black text-[10px] tracking-[0.4em] uppercase shadow-2xl hover:bg-[#1e293b] transition-colors flex items-center gap-4 border border-amber-500/20"
                            >
                                Grand Reveal <ArrowRight className="w-4 h-4" />
                            </motion.button>
                        </div>
                    </motion.div>
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

export default HBDLetter;
