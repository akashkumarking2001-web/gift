import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X as CloseIcon, Pen, ArrowRight } from 'lucide-react';

const HBDLetter = ({ data, onNext }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-rose-100 flex flex-col items-center justify-center p-6 relative">
            {/* Soft Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-200 to-pink-50 opacity-60 backdrop-blur-[100px]" />

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
                        <div className="w-80 h-52 bg-rose-500 rounded-lg shadow-2xl relative flex items-center justify-center overflow-hidden border-t border-white/20">
                            {/* Flap Shadow */}
                            <div className="absolute top-0 left-0 w-0 h-0 border-l-[160px] border-l-transparent border-t-[110px] border-t-rose-600 border-r-[160px] border-r-transparent drop-shadow-md origin-top transform group-hover:rotate-x-180 transition-transform duration-500 ease-in-out z-20" />

                            {/* Envelope Fold */}
                            <div className="absolute bottom-0 left-0 w-0 h-0 border-l-[160px] border-l-rose-400 border-b-[100px] border-b-rose-300 border-r-[160px] border-r-rose-400 z-10" />

                            {/* Seal */}
                            <div className="w-16 h-16 bg-red-700 rounded-full shadow-lg border-4 border-red-800 flex items-center justify-center z-30 group-hover:scale-110 transition-transform">
                                <Heart className="w-8 h-8 text-red-200 fill-current" />
                            </div>

                            <div className="absolute bottom-4 text-rose-100 font-bold text-sm opacity-80 z-30 animate-pulse">
                                Tap to Open
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        layoutId="envelope-container"
                        className="relative w-full max-w-2xl bg-[#fffdf5] rounded shadow-2xl z-20 overflow-hidden" // Paper color
                        initial={{ opacity: 0, y: 100, rotateX: -20 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                    >
                        {/* Paper Texture Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-30 pointer-events-none" />

                        {/* Header */}
                        <div className="bg-rose-500/10 border-b border-rose-500/20 p-6 flex justify-between items-center">
                            <h3 className="text-2xl font-serif font-bold text-rose-800 italic flex items-center gap-2">
                                <Pen className="w-5 h-5 text-rose-600" /> A Message For You
                            </h3>
                            <button onClick={onNext} className="text-rose-400 hover:text-rose-600 transition-colors">
                                <span className="text-xs uppercase font-bold tracking-wider mr-1">Continue</span>
                                <ArrowRight className="w-4 h-4 inline" />
                            </button>
                        </div>

                        {/* Letter Content */}
                        <div className="p-8 md:p-12 min-h-[400px] relative">
                            {/* Lined Paper Effect */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_27px,#e5e7eb_27px)] bg-[length:100%_28px] pointer-events-none opacity-40 top-[90px]" />
                            <div className="absolute left-12 top-0 bottom-0 w-[2px] bg-red-300/30" /> {/* Margin line */}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="prose prose-lg prose-rose max-w-none font-handwriting text-gray-700 leading-[28px] pl-8 relative z-10"
                            >
                                <p className="whitespace-pre-wrap text-xl md:text-2xl">
                                    {data.message || "My Dearest,\n\nOn this special day, I just wanted to remind you how incredibly loved you are. May your day be filled with laughter, joy, and all the cake you can eat!\n\nUse this space to write your heartfelt message..."}
                                </p>
                            </motion.div>
                        </div>

                        {/* Footer / Signature */}
                        <div className="p-6 bg-rose-50 border-t border-rose-100 flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "#f43f5e" }} // rose-500
                                whileTap={{ scale: 0.95 }}
                                onClick={onNext}
                                className="px-6 py-3 bg-rose-400 text-white rounded-lg shadow-md font-bold text-sm tracking-wide uppercase transition-colors"
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
