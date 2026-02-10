import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Heart, Image as ImageIcon } from 'lucide-react';

const HBDMemories = ({ data, onNext }: any) => {
    const [idx, setIdx] = useState(0);
    const photos = Array.isArray(data.photos) && data.photos.length > 0 ? data.photos : ["https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif", "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif"];

    const nextPhoto = () => setIdx((prev) => (prev + 1) % photos.length);
    const prevPhoto = () => setIdx((prev) => (prev - 1 + photos.length) % photos.length);

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black opacity-80" />

            <div className="text-center z-10 mb-8">
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-white drop-shadow-lg">
                    Cherished Moments ✨
                </h2>
                <p className="text-blue-300/60 text-sm mt-2">Tap arrows to relive memories</p>
            </div>

            {/* Cinematic 3D Carousel Container */}
            <div className="relative w-full max-w-lg aspect-[3/4] md:aspect-[4/3] perspective-[1500px] flex items-center justify-center">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                        key={idx}
                        className="absolute w-full h-full bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700/50"
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
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            {/* Overlay Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                            {/* Caption/Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="flex items-center gap-2 text-white/90 font-bold tracking-widest text-xs uppercase mb-2">
                                    <ImageIcon className="w-4 h-4 text-blue-400" /> Memory #{idx + 1}
                                </div>
                                <p className="text-white text-lg font-medium leading-snug drop-shadow-md">
                                    "A moment frozen in time..."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Side Controls */}
                <button
                    onClick={prevPhoto}
                    className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110 z-20 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextPhoto}
                    className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:scale-110 z-20 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex gap-2 mt-8 z-10">
                {photos.map((_: string, i: number) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === idx ? 'w-8 bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-slate-600'}`}
                    />
                ))}
            </div>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="mt-12 px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-bold shadow-lg shadow-blue-900/40 relative overflow-hidden group"
            >
                <span className="relative z-10">Read Special Note 💌</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </motion.button>
        </div>
    );
};

export default HBDMemories;
