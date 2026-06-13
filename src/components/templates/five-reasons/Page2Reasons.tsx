import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ChevronRight, Lock } from 'lucide-react';

const Page2Reasons = ({ data, onNext }: any) => {
    const reasons = [
        data.r1 || "The way you always know how to make me laugh even on my worst days.",
        data.r2 || "How you're so passionate about the things you love—it’s inspiring to watch.",
        data.r3 || "The kindness you show to everyone around you, without even realizing it.",
        data.r4 || "How safe and at home I feel whenever I’m with you.",
        data.r5 || "Simply because being with you makes everything in life feel a little more beautiful."
    ];

    const [revealedIndex, setRevealedIndex] = useState(-1);

    const handleNextReveal = () => {
        if (revealedIndex < reasons.length - 1) {
            setRevealedIndex(prev => prev + 1);
        }
    };

    const isAllRevealed = revealedIndex === reasons.length - 1;

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#09050f] flex flex-col items-center justify-start py-20 px-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT STARS */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ opacity: [0.1, 0.5, 0.1], scale: [1, 1.5, 1] }}
                        transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-lg space-y-12">
                <div className="text-center space-y-2">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-white text-3xl font-black font-romantic tracking-tight"
                    >
                        Reasons I Love You
                    </motion.h2>
                    <p className="text-pink-400 font-bold text-[10px] uppercase tracking-[0.4em]">
                        {isAllRevealed ? "All reasons unsealed" : `Unsealing reason ${revealedIndex + 2} of 5`}
                    </p>
                </div>

                {/* REASONS LIST */}
                <div className="space-y-6">
                    {reasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{
                                opacity: i <= revealedIndex ? 1 : 0.3,
                                x: 0,
                                scale: i === revealedIndex ? 1.02 : 1
                            }}
                            className={`relative p-8 rounded-[2rem] border transition-all duration-500 ${i <= revealedIndex ? 'bg-white/10 border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.3)]' : 'bg-[#111] border-white/5 opacity-40'}`}
                        >
                            <div className="flex items-start gap-6">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${i <= revealedIndex ? 'bg-pink-500 text-white' : 'bg-white/5 text-white/20'}`}>
                                    {i <= revealedIndex ? <Heart size={20} fill="currentColor" /> : <Lock size={20} />}
                                </div>
                                <div className="space-y-2 pt-1.5 cursor-default">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${i <= revealedIndex ? 'text-pink-400' : 'text-white/20'}`}>
                                        Reason 0{i + 1}
                                    </span>
                                    <AnimatePresence mode="wait">
                                        {i <= revealedIndex ? (
                                            <motion.p
                                                key="text"
                                                initial={{ opacity: 0, filter: 'blur(10px)' }}
                                                animate={{ opacity: 1, filter: 'blur(0px)' }}
                                                className="text-white text-lg font-medium leading-snug"
                                            >
                                                {reason}
                                            </motion.p>
                                        ) : (
                                            <div className="w-full h-4 bg-white/5 rounded-full mt-2" />
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Interactive Sparkle on current index */}
                            {i === revealedIndex && (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-2 -right-2 text-pink-400"
                                >
                                    <Sparkles size={24} />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* FOOTER ACTIONS */}
                <div className="pt-8 flex flex-col items-center gap-6">
                    <AnimatePresence mode="wait">
                        {!isAllRevealed ? (
                            <motion.button
                                key="next-reason"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={handleNextReveal}
                                className="px-12 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl shadow-xl flex items-center gap-3 active:scale-95 transition-transform"
                            >
                                <span>See the next reason</span>
                                <ChevronRight size={14} strokeWidth={3} />
                            </motion.button>
                        ) : (
                            <motion.button
                                key="conclusion"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                onClick={onNext}
                                className="px-12 py-5 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl shadow-[0_20px_40px_rgba(236,72,153,0.3)] flex items-center gap-3 active:scale-95 transition-transform"
                            >
                                <span>A Final Word</span>
                                <Heart size={14} fill="white" />
                            </motion.button>
                        )}
                    </AnimatePresence>
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

export default Page2Reasons;
