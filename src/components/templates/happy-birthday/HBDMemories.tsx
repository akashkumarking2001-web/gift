import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Heart, Image as ImageIcon } from 'lucide-react';

const HBDMemories = ({ data, onNext }: any) => {
    const [idx, setIdx] = useState(0);
    const photos = Array.isArray(data.photos) && data.photos.length > 0 ? data.photos : ["https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif", "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif"];

    const nextPhoto = () => setIdx((prev) => (prev + 1) % photos.length);
    const prevPhoto = () => setIdx((prev) => (prev - 1 + photos.length) % photos.length);

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="heart-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                            <text x="15" y="35" fontSize="20" fill="white">💝</text>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#heart-grid)" />
                </svg>
            </div>

            <motion.div
                className="text-center z-10 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-md font-romantic tracking-tight">
                    Cherished Moments ✨
                </h2>
                <p className="text-white/80 font-bold bg-white/20 px-4 py-1 rounded-full inline-block mt-3 text-sm backdrop-blur-sm">
                    Tap arrows to relive memories
                </p>
            </motion.div>

            {/* Cinematic 3D Carousel Container */}
            <div className="relative w-full max-w-lg aspect-[3/4] md:aspect-[4/3] perspective-[1500px] flex items-center justify-center">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={idx}
                        className="absolute w-full h-full bg-white rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[8px] border-white"
                        initial={{ opacity: 0, rotateY: 90, x: 300, scale: 0.8 }}
                        animate={{ opacity: 1, rotateY: 0, x: 0, scale: 1 }}
                        exit={{ opacity: 0, rotateY: -90, x: -300, scale: 0.8 }}
                        transition={{ duration: 0.8, type: "spring", stiffness: 100, damping: 20 }}
                    >
                        {/* Photo */}
                        <div className="w-full h-full relative group">
                            <img
                                src={photos[idx]}
                                alt={`Memory ${idx}`}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay Gradient for Text */}
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                            {/* Caption/Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="flex items-center gap-2 text-white/90 font-black tracking-widest text-[10px] uppercase mb-1 bg-rose-500/80 w-fit px-2 py-1 rounded-md">
                                    <ImageIcon className="w-3 h-3" /> Memory #{idx + 1}
                                </div>
                                <p className="text-white text-lg font-bold leading-snug drop-shadow-md font-romantic">
                                    "A moment frozen in time..."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Side Controls */}
                <button
                    onClick={prevPhoto}
                    className="absolute -left-4 md:-left-16 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white text-rose-500 hover:scale-110 hover:shadow-xl transition-all z-20 shadow-lg border-4 border-rose-50"
                >
                    <ChevronLeft className="w-6 h-6 stroke-[3]" />
                </button>
                <button
                    onClick={nextPhoto}
                    className="absolute -right-4 md:-right-16 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white text-rose-500 hover:scale-110 hover:shadow-xl transition-all z-20 shadow-lg border-4 border-rose-50"
                >
                    <ChevronRight className="w-6 h-6 stroke-[3]" />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2 mt-8 z-10 glass-card-static px-4 py-2 rounded-full">
                {photos.map((_: string, i: number) => (
                    <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i === idx ? 'w-8 bg-rose-500 shadow-md' : 'bg-white/50'}`}
                    />
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="mt-10 px-12 py-5 bg-white text-rose-600 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group"
            >
                <span className="relative z-10 flex items-center gap-2">Read Special Note 💌</span>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-pink-100 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
        </div>
    );
};

export default HBDMemories;
