import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const HBDBalloons = ({ data, onNext }: any) => {
    const words = ["You", "are", "a", "Cutie"];
    const [poppedIndices, setPoppedIndices] = useState<number[]>([]);

    const handlePop = (index: number) => {
        if (poppedIndices.includes(index)) return;

        const newPopped = [...poppedIndices, index];
        setPoppedIndices(newPopped);

        // Individual pop confetti
        confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.5 },
            colors: ['#A855F7', '#EC4899', '#ffffff']
        });

        if (newPopped.length === words.length) {
            setTimeout(() => {
                confetti({
                    particleCount: 200,
                    spread: 120,
                    origin: { y: 0.5 },
                    colors: ['#A855F7', '#EC4899', '#FFD700']
                });
                setTimeout(onNext, 4000);
            }, 1000);
        }
    };

    const balloonColors = ['#E9D5FF', '#FBCFE8', '#DDD6FE', '#FCE7F3'];

    return (
        <div className="relative min-h-screen bg-[#fdfaff] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* PASTEL BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none text-purple-100/30">
                <Star className="absolute top-20 left-10 w-32 h-32 rotate-12" />
                <Heart className="absolute bottom-20 right-10 w-40 h-40 -rotate-12" />
            </div>

            {/* Instruction Header */}
            <div className="relative z-20 text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-3xl font-black text-purple-900 font-romantic mb-4"
                >
                    {poppedIndices.length < words.length ? "Pop the balloons!" : "You are a Cutie! ✨"}
                </motion.h2>
                {poppedIndices.length < words.length && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        className="text-purple-400 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2"
                    >
                        <Sparkles size={12} fill="currentColor" />
                        Something is hidden behind them
                    </motion.div>
                )}
            </div>

            {/* Balloon Grid */}
            <div className="relative w-full max-w-2xl grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center justify-items-center h-64 z-10">
                {words.map((word, i) => (
                    <div key={i} className="relative w-32 h-48 md:w-40 md:h-56 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {!poppedIndices.includes(i) ? (
                                <motion.div
                                    key={`balloon-${i}`}
                                    initial={{ y: 200, opacity: 0 }}
                                    animate={{
                                        y: [0, -20, 0],
                                        rotate: [Math.sin(i) * 5, Math.sin(i) * -5, Math.sin(i) * 5]
                                    }}
                                    exit={{ scale: 2, opacity: 0, transition: { duration: 0.2 } }}
                                    transition={{
                                        y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 },
                                        rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    onClick={() => handlePop(i)}
                                    className="cursor-pointer group flex flex-col items-center pointer-events-auto"
                                >
                                    {/* Balloon Shape */}
                                    <div
                                        className="w-24 h-32 md:w-32 md:h-40 rounded-[50%_50%_50%_50%_/60%_60%_40%_40%] relative shadow-lg transform transition-transform group-hover:scale-110"
                                        style={{ backgroundColor: balloonColors[i % 4], border: '2px solid rgba(255,255,255,0.4)' }}
                                    >
                                        <div className="absolute top-4 left-4 w-4 h-8 bg-white/40 blur-sm rounded-full -rotate-12" />
                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-inherit clip-triangle rotate-180" />
                                    </div>
                                    {/* String */}
                                    <div className="w-0.5 h-20 bg-gradient-to-b from-purple-200 to-transparent" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={`word-${i}`}
                                    initial={{ scale: 0, rotate: -20, opacity: 0 }}
                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                    className="text-4xl md:text-5xl font-black text-purple-600 font-romantic tracking-tighter"
                                >
                                    {word}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
                <style>{`.clip-triangle { clip-path: polygon(0 0, 100% 0, 50% 100%); }`}</style>
            </div>

            {/* Total Reveal Message (Appears when all popped) */}
            <AnimatePresence>
                {poppedIndices.length === words.length && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-md z-50 pointer-events-none"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-6xl md:text-8xl font-black text-purple-900 font-romantic text-center drop-shadow-xl"
                        >
                            You are a Cutie!
                            <div className="text-2xl mt-4 text-purple-400 font-sans tracking-[0.5em] font-bold">REVEALED</div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer decoration */}
            <div className="absolute bottom-10 flex gap-2">
                {[...Array(poppedIndices.length)].map((_, i) => (
                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 bg-pink-400 rounded-full" />
                ))}
                {[...Array(words.length - poppedIndices.length)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-purple-100 rounded-full" />
                ))}
            </div>
        </div>
    );
};

export default HBDBalloons;
