import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X as CloseIcon, Pen, ArrowRight } from 'lucide-react';

const HBDLetter = ({ data, onNext }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500 flex flex-col items-center justify-center p-6 relative">
            {/* Soft Ambient Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="letter-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                            <text x="10" y="30" fontSize="20" fill="white">💌</text>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#letter-pattern)" />
                </svg>
            </div>

            <AnimatePresence>
                {!isOpen ? (
                    <motion.div
                        layoutId="envelope-container"
                        className="relative cursor-pointer z-10 group"
                        onClick={() => setIsOpen(true)}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, rotate: [-1, 1, -1] }}
                        transition={{
                            scale: { duration: 0.5 },
                            rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        {/* 3D Realistic Envelope CSS */}
                        <div className="w-80 h-52 bg-white rounded-xl shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] relative flex items-center justify-center overflow-hidden border-2 border-white/50">
                            {/* Flap Shadow */}
                            <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-t-[110px] border-t-rose-100 border-r-[160px] border-r-transparent drop-shadow-md origin-top transform group-hover:rotate-x-180 transition-transform duration-500 ease-in-out z-20" />

                            {/* Envelope Fold */}
                            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-l-rose-50 border-b-[100px] border-b-rose-100 border-r-[160px] border-r-rose-50 z-10" />

                            {/* Seal */}
                            <div className="w-16 h-16 bg-rose-500 rounded-full shadow-lg border-4 border-white flex items-center justify-center z-30 group-hover:scale-110 transition-transform">
                                <Heart className="w-8 h-8 text-white fill-current" />
                            </div>

                            <div className="absolute bottom-4 text-rose-400 font-bold text-xs uppercase tracking-widest z-30 animate-pulse bg-white/80 px-2 rounded">
                                Tap to Open
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        layoutId="envelope-container"
                        className="relative w-full max-w-2xl bg-[#fffdf5] rounded-[2rem] shadow-2xl z-20 overflow-hidden" // Paper color
                        initial={{ opacity: 0, y: 100, rotateX: -20 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                    >
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-30 pointer-events-none" />

                        {/* Header */}
                        <div className="bg-rose-50 border-b border-rose-100 p-8 flex justify-between items-center">
                            <h3 className="text-3xl font-romantic font-black text-rose-600 flex items-center gap-3">
                                <Pen className="w-6 h-6 stroke-[3]" /> A Message For You
                            </h3>
                            <button onClick={onNext} className="text-rose-400 hover:text-rose-600 transition-colors flex items-center gap-1 group">
                                <span className="text-[10px] uppercase font-black tracking-widest group-hover:underline">Continue</span>
                                <ArrowRight className="w-4 h-4 inline group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* Letter Content */}
                        <div className="p-8 md:p-12 min-h-[400px] relative">
                            {/* Lined Paper Effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_29px,#fecdd3_1px)] bg-[length:100%_30px] pointer-events-none opacity-40 top-[100px]" />
                            <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-rose-300/30" /> {/* Margin line */}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="prose prose-lg prose-rose max-w-none font-handwriting text-gray-700 leading-[30px] pl-6 relative z-10"
                            >
                                <p className="whitespace-pre-wrap text-xl md:text-2xl font-medium">
                                    {data.message || "My Dearest,\n\nOn this special day, I just wanted to remind you how incredibly loved you are. May your day be filled with laughter, joy, and all the cake you can eat!\n\nUse this space to write your heartfelt message..."}
                                </p>
                            </motion.div>
                        </div>

                        {/* Footer / Signature */}
                        <div className="p-6 bg-rose-50/50 border-t border-rose-100 flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onNext}
                                className="px-8 py-4 bg-rose-500 text-white rounded-2xl shadow-lg border-2 border-rose-400 font-black text-xs tracking-[0.2em] uppercase transition-all hover:bg-rose-600"
                            >
                                Reveal Final Gift 🎁
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HBDLetter;
