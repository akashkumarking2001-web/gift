import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Heart, Image as ImageIcon, Sparkles, Star } from 'lucide-react';

const HBDMemories = ({ data, onNext }: any) => {
    const [idx, setIdx] = useState(0);
    const photos = Array.isArray(data.photos) && data.photos.length > 0
        ? data.photos
        : ["https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif", "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif"];

    const nextPhoto = () => setIdx((prev) => (prev + 1) % photos.length);
    const prevPhoto = () => setIdx((prev) => (prev - 1 + photos.length) % photos.length);

    return (
        <div className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* HYPER-REALISTIC GALLERY ATMOSPHERE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.1),transparent_50%)]"
                />

                {/* Floating Film Dust */}
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -50, 0],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
                    />
                ))}
            </div>

            {/* Header */}
            <div className="relative z-10 text-center mb-12 space-y-8 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-8 py-2.5 rounded-full border border-white/10 shadow-xl"
                >
                    <Star size={12} className="text-amber-400 fill-current" />
                    <span className="text-amber-100/60 font-black uppercase tracking-[0.4em] text-[10px]">Gallery Exhibition</span>
                </motion.div>

                <h2 className="text-5xl md:text-8xl font-black text-white font-romantic leading-tight drop-shadow-2xl tracking-tighter">
                    Timeless Moments ✨
                </h2>
            </div>

            {/* Photo Stack Container - High Fidelity Frames */}
            <div className="relative w-full max-w-lg aspect-[3/4] md:aspect-[4/3] flex items-center justify-center z-10 perspective-[2000px]">
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={idx}
                        className="absolute w-full h-full p-4 md:p-6 cursor-pointer group"
                        initial={{ opacity: 0, scale: 0.8, x: 100, rotateY: 45 }}
                        animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: -100, rotateY: -45 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                    >
                        {/* The Frame */}
                        <div className="relative w-full h-full bg-[#0f172a] rounded-[2rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden transform-style-3d group-hover:scale-[1.02] transition-transform duration-700">

                            {/* Gold Inner Border */}
                            <div className="absolute inset-3 border border-amber-500/30 rounded-[1.5rem] z-20 pointer-events-none" />

                            {/* Image */}
                            <div className="relative w-full h-full overflow-hidden rounded-[1.8rem]">
                                <img
                                    src={photos[idx]}
                                    alt="Memory"
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                />
                                {/* Cinematic Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/90 via-transparent to-[#020617]/10 opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

                                {/* Spotlight Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />
                            </div>

                            {/* Caption Overlay */}
                            <div className="absolute bottom-8 left-8 right-8 z-30">
                                <div className="flex items-center gap-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                    <div className="h-[1px] w-8 bg-amber-500" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200">Date: Immortal</span>
                                </div>
                                <p className="text-white text-3xl font-romantic italic translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                    "A memory etched in gold..."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Minimalist Controls - Floating */}
                <div className="absolute inset-x-[-10px] md:inset-x-[-60px] top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-30">
                    <motion.button
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevPhoto}
                        className="pointer-events-auto p-4 md:p-5 rounded-full bg-[#0f172a]/90 backdrop-blur-md border border-white/10 text-white shadow-2xl hover:border-amber-500/50 transition-colors group"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:text-amber-400 transition-colors" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextPhoto}
                        className="pointer-events-auto p-4 md:p-5 rounded-full bg-[#0f172a]/90 backdrop-blur-md border border-white/10 text-white shadow-2xl hover:border-amber-500/50 transition-colors group"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:text-amber-400 transition-colors" />
                    </motion.button>
                </div>
            </div>

            {/* Pagination Indicators - Gold Bars */}
            <div className="flex gap-2 mt-16 z-10">
                {photos.map((_: string, i: number) => (
                    <motion.div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${i === idx ? 'w-12 bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'w-2 bg-white/20'}`}
                    />
                ))}
            </div>

            {/* Professional Action Button */}
            <motion.button
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="mt-16 group relative px-14 py-6 rounded-3xl bg-[#0f172a] border border-amber-500/30 text-amber-500 font-black text-[10px] tracking-[0.4em] uppercase shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden flex items-center gap-4 hover:border-amber-500 transition-colors"
            >
                <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">Unseal The Letter</span>
                <Sparkles className="relative z-10 w-4 h-4 group-hover:rotate-12 transition-transform" />
            </motion.button>

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

export default HBDMemories;
