import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Heart, Sparkles, Star } from 'lucide-react';

const HBDMemories = ({ data, onNext }: any) => {
    const defaultPhotos = [
        "https://images.unsplash.com/photo-1516589174184-c68526614486?auto=format&fit=crop&q=80&w=800", // Soft couple illustration-ish
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800"
    ];

    const photos = Array.isArray(data.photos) && data.photos.length > 0 ? data.photos : defaultPhotos;
    const [idx, setIdx] = useState(0);

    const nextPhoto = () => setIdx((prev) => (prev + 1) % photos.length);
    const prevPhoto = () => setIdx((prev) => (prev - 1 + photos.length) % photos.length);

    return (
        <div className="relative min-h-screen bg-[#fdfaff] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* SOFT PASTEL BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none text-purple-100/30">
                <Heart className="absolute top-10 right-10 w-32 h-32 rotate-12" />
                <Heart className="absolute bottom-10 left-10 w-24 h-24 -rotate-12" />
            </div>

            {/* Header */}
            <div className="relative z-10 text-center mb-8">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-3xl md:text-5xl font-black text-purple-900 font-romantic leading-tight"
                >
                    Some Sweet Moments
                </motion.h2>
                <div className="flex items-center justify-center gap-2 text-purple-400 mt-2 font-bold text-[10px] tracking-widest uppercase">
                    <Sparkles size={12} />
                    <span>Swipe for more</span>
                    <Sparkles size={12} />
                </div>
            </div>

            {/* Memory Card */}
            <div className="relative w-full max-w-sm aspect-[4/5] z-10">

                {/* Decoration Hearts */}
                <div className="absolute -top-4 -left-4 z-20 text-pink-400 drop-shadow-md">
                    <Heart fill="currentColor" size={32} />
                </div>
                <div className="absolute -top-4 -right-4 z-20 text-pink-400 drop-shadow-md">
                    <Heart fill="currentColor" size={32} />
                </div>

                <div className="w-full h-full bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(168,85,247,0.15)] p-4 border border-purple-50 group overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full h-full rounded-[1.5rem] overflow-hidden relative"
                        >
                            <img
                                src={photos[idx]}
                                alt="Memory"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Soft Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls inside card container */}
                    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                        <motion.button
                            whileHover={{ scale: 1.1, x: -2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevPhoto}
                            className="pointer-events-auto p-3 rounded-full bg-white/80 backdrop-blur-md text-purple-400 shadow-lg border border-purple-50"
                        >
                            <ChevronLeft size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, x: 2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextPhoto}
                            className="pointer-events-auto p-3 rounded-full bg-white/80 backdrop-blur-md text-purple-400 shadow-lg border border-purple-50"
                        >
                            <ChevronRight size={24} />
                        </motion.button>
                    </div>
                </div>

                {/* Counter */}
                <div className="flex justify-center gap-2 mt-8">
                    {photos.map((_: string, i: number) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? 'w-8 bg-purple-400' : 'w-2 bg-purple-100'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Action Button */}
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 30px -10px rgba(168,85,247,0.2)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="mt-12 px-12 py-5 rounded-2xl bg-white border border-purple-100 text-purple-500 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 shadow-md"
            >
                <Heart className="w-4 h-4 text-pink-400" fill="currentColor" />
                Read My Message
            </motion.button>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,800&display=swap');
                }
            `}} />
        </div>
    );
};

export default HBDMemories;
