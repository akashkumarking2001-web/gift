import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Send } from 'lucide-react';

const SSSNote = ({ data, onNext }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const [typedText, setTypedText] = useState("");
    const fullText = data.message || "I really like how you carry yourself. You have this natural charm that’s so rare and beautiful. Just wanted you to know you're appreciated more than you realize.";

    useEffect(() => {
        if (isOpen) {
            let i = 0;
            const timer = setInterval(() => {
                setTypedText(fullText.slice(0, i));
                i++;
                if (i > fullText.length) clearInterval(timer);
            }, 30);
            return () => clearInterval(timer);
        }
    }, [isOpen, fullText]);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0b2e] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="envelope"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 1.1 }}
                        onClick={() => setIsOpen(true)}
                        className="relative cursor-pointer group flex flex-col items-center gap-12"
                    >
                        <div className="text-center space-y-4">
                            <motion.h2 className="text-white text-3xl md:text-5xl font-romantic">An unsealed note</motion.h2>
                            <span className="text-pink-400 font-bold uppercase tracking-[0.4em] text-[10px]">Tap the heart to read</span>
                        </div>

                        <div className="relative w-80 h-56 md:w-96 md:h-64 bg-pink-100 rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] flex items-center justify-center border-4 border-white isolate">
                            {/* Envelope Top Flap Shadow Visual */}
                            <div className="absolute inset-0 bg-pink-200/50 clip-envelope-flap z-10" />
                            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl z-20 group-hover:scale-110 transition-transform duration-500">
                                <Heart size={40} className="text-pink-500" fill="currentColor" />
                            </div>

                            {/* Particles around envelope */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-2 border-dashed border-white/30 rounded-[2rem] -m-4 pointer-events-none"
                            />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="note"
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="relative z-10 w-full max-w-2xl"
                    >
                        {/* THE PINK NOTE */}
                        <div className="bg-[#fff5f8] rounded-[3rem] shadow-[0_50px_150px_rgba(0,0,0,0.6)] border-4 border-white overflow-hidden min-h-[500px] flex flex-col">

                            {/* Note Header */}
                            <div className="px-10 py-8 border-b border-pink-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Send size={16} className="text-pink-400" />
                                    <span className="text-pink-900 font-black uppercase tracking-[0.3em] text-[10px]">Direct Heart Stream</span>
                                </div>
                                <Sparkles size={20} className="text-pink-300 animate-pulse" />
                            </div>

                            {/* Typewriter Body */}
                            <div className="p-10 md:p-16 flex-1 font-romantic text-pink-950 text-2xl md:text-4xl leading-relaxed italic relative">
                                {typedText}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                    className="inline-block w-4 h-10 bg-pink-500 align-middle ml-2"
                                />

                                {/* Background Decorative Watermark */}
                                <Heart size={200} className="absolute bottom-10 right-10 text-pink-200/10 rotate-12 -z-10" fill="currentColor" />
                            </div>

                            {/* Footer Action */}
                            <div className="p-10 flex justify-center bg-pink-50/50">
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={typedText.length >= fullText.length ? { opacity: 1 } : { opacity: 0 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onNext}
                                    className="px-12 py-5 bg-pink-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] shadow-lg flex items-center gap-3"
                                >
                                    <span>One Final Surprise</span>
                                    <Send size={14} />
                                </motion.button>
                            </div>
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
                .clip-envelope-flap {
                    clip-path: polygon(0 0, 100% 0, 50% 50%);
                }
            `}} />
        </div>
    );
};

export default SSSNote;
