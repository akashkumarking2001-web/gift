import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, Sparkles } from 'lucide-react';

const HNYPhotoStack = ({ data, onNext }: any) => {
    const defaultPhotos = [
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1516589174184-c68526614486?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1513271922711-58b22e4dfd13?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800"
    ];

    const photos = Array.isArray(data.photos) && data.photos.length > 0 ? data.photos : defaultPhotos;
    const [stack, setStack] = useState(photos);

    const handlePop = () => {
        if (stack.length > 1) {
            setStack((prev: string[]) => prev.slice(0, -1));
        } else {
            onNext();
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#09050f] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            <div className="relative z-20 text-center mb-16 space-y-4">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-white text-3xl md:text-5xl font-black font-romantic tracking-tight"
                >
                    Some moments from this year
                </motion.h2>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    className="flex justify-center items-center gap-2 text-white uppercase tracking-[0.4em] text-[10px] font-bold"
                >
                    <Camera size={12} />
                    <span>Tap to reveal the next memory</span>
                </motion.div>
            </div>

            {/* PHOTO STACK */}
            <div className="relative w-full max-w-sm h-96 flex items-center justify-center pt-10">
                <AnimatePresence>
                    {stack.map((photo: string, i: number) => (
                        <motion.div
                            key={photo} // Use photo URL as key for stack persistence
                            initial={{ scale: 0, rotate: (Math.random() - 0.5) * 20 }}
                            animate={{
                                scale: 1,
                                rotate: (i - stack.length / 2) * 5,
                                y: -i * 2,
                                x: 0
                            }}
                            exit={{
                                x: 600,
                                rotate: 20,
                                opacity: 0,
                                transition: { duration: 0.6, ease: "circIn" }
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            onClick={handlePop}
                            className="absolute cursor-pointer perspective-[1000px] group"
                            style={{ zIndex: i }}
                        >
                            {/* Polaroid Frame */}
                            <div className="w-64 h-80 bg-white p-3 pb-12 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] border border-white/10 group-hover:scale-105 transition-transform duration-500">
                                <div className="w-full h-full bg-slate-100 overflow-hidden relative">
                                    <img
                                        src={photo}
                                        alt="Memory"
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Soft Grain / Ghibli feel overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-40 mix-blend-overlay" />
                                </div>

                                {/* Photo Deco */}
                                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center opacity-40">
                                    <div className="text-[10px] font-mono text-black font-bold uppercase tracking-widest">
                                        Jan // 2026
                                    </div>
                                    <Heart size={14} className="text-pink-400" fill="currentColor" />
                                </div>
                            </div>

                            {/* Hover Sparkle Effect */}
                            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* PROGRESS INDICATOR */}
            <div className="mt-16 flex gap-2">
                {[...Array(photos.length)].map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${i < (photos.length - stack.length + 1) ? 'w-10 bg-pink-500' : 'w-2 bg-white/10'}`}
                    />
                ))}
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

export default HNYPhotoStack;
