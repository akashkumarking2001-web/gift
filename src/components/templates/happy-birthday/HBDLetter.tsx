import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Sparkles, ArrowRight, Star } from 'lucide-react';

const HBDLetter = ({ data, onNext }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#fdfaff] flex flex-col items-center justify-center p-6 relative font-outfit overflow-hidden isolate select-none">

            {/* SOFT PASTEL BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -right-20 w-96 h-96 border-4 border-dashed border-purple-200 rounded-full"
                />
            </div>

            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div
                        key="closed"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
                        transition={{ duration: 0.6 }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <div className="text-center mb-12">
                            <motion.h2
                                className="text-3xl md:text-5xl font-black text-purple-900 font-romantic"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                Special Message 💌
                            </motion.h2>
                            <p className="text-purple-400 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">Just for you</p>
                        </div>

                        <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsOpen(true)}
                            className="relative cursor-pointer group"
                        >
                            <div className="w-80 h-56 md:w-[480px] md:h-64 bg-white rounded-[2.5rem] shadow-[0_30px_70px_-10px_rgba(168,85,247,0.2)] border border-purple-50 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="relative flex flex-col items-center gap-4">
                                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 shadow-inner group-hover:scale-110 transition-transform">
                                        <Mail size={40} />
                                    </div>
                                    <span className="text-purple-400 font-black uppercase tracking-[0.3em] text-[10px]">Tap to open</span>
                                </div>

                                {/* Floating decorations */}
                                <Heart className="absolute top-6 left-6 text-pink-200" size={20} fill="currentColor" />
                                <Star className="absolute bottom-6 right-6 text-purple-200 fill-current" size={20} />
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="open"
                        initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
                        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="relative z-20 w-full max-w-2xl bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(168,85,247,0.1)] border border-purple-50 flex flex-col overflow-hidden max-h-[85vh]"
                    >
                        {/* Letter Header */}
                        <div className="px-10 py-6 border-b border-purple-50 flex items-center justify-between bg-purple-50/20">
                            <div className="flex items-center gap-3">
                                <Heart className="text-pink-400" fill="currentColor" size={16} />
                                <span className="text-purple-900 font-bold uppercase tracking-widest text-[10px]">Heartfelt Message</span>
                            </div>
                            <Sparkles className="text-purple-300" size={16} />
                        </div>

                        {/* Scrollable Letter Content */}
                        <div className="p-10 md:p-16 overflow-y-auto font-romantic text-purple-900 custom-scrollbar">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-6"
                            >
                                <p className="text-2xl md:text-3xl leading-relaxed whitespace-pre-wrap italic">
                                    {data.message || "My Dearest Cutiepie,\n\nI just wanted to take a moment to tell you how incredibly special you are to me. Your presence makes everything feel a little bit more magical, and your smile is the most beautiful thing I've ever seen.\n\nHappy Birthday! May this year be as wonderful and charming as you are."}
                                </p>
                                <div className="pt-8 flex flex-col items-end">
                                    <span className="text-xl opacity-60">With all my love,</span>
                                    <span className="text-3xl mt-2 font-black">Forever Yours ❤️</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Footer Action */}
                        <div className="p-8 border-t border-purple-50 flex justify-center bg-purple-50/10">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(168,85,247,0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onNext}
                                className="px-14 py-5 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-black text-[10px] tracking-[0.4em] uppercase flex items-center gap-3"
                            >
                                One Last Thing <ArrowRight size={16} />
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
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #f3e8ff;
                    border-radius: 10px;
                }
            `}} />
        </div>
    );
};

export default HBDLetter;
