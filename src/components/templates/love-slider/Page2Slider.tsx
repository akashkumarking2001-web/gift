import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Heart, Sparkles } from 'lucide-react';

const Page2Slider = ({ data, onNext }: any) => {
    const [sliderPos, setSliderPos] = useState(50);
    const [isFinished, setIsFinished] = useState(false);

    const imgBefore = data.imageBefore || "https://images.unsplash.com/photo-1516589174184-c68526614486?auto=format&fit=crop&q=80&w=1200";
    const imgAfter = data.imageAfter || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200";

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderPos(Number(e.target.value));
        if (Number(e.target.value) > 95) setIsFinished(true);
    };

    return (
        <div className="relative min-h-screen bg-[#fdfaff] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            <div className="relative z-20 text-center mb-8">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl md:text-4xl font-black text-pink-900 font-romantic"
                >
                    {data.heading || "The Magic Between Us"}
                </motion.h2>
                <div className="flex items-center justify-center gap-2 text-pink-400 mt-2 font-bold text-[10px] uppercase tracking-widest">
                    <span>Swipe to reveal the magic</span>
                </div>
            </div>

            {/* SLIDER CONTAINER */}
            <div className="relative w-full max-w-4xl aspect-[16/10] bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(236,72,153,0.15)] overflow-hidden border-8 border-white group">

                {/* Image After (The Result) */}
                <div className="absolute inset-0">
                    <img
                        src={imgAfter}
                        alt="After"
                        className="w-full h-full object-cover grayscale-[0.2]"
                    />
                </div>

                {/* Image Before (The Reality) with Clip Path */}
                <div
                    className="absolute inset-0 z-10"
                    style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
                >
                    <img
                        src={imgBefore}
                        alt="Before"
                        className="w-full h-full object-cover brightness-90 shadow-2xl"
                    />
                </div>

                {/* Drag Handle Overlay */}
                <div
                    className="absolute inset-y-0 z-20 w-1 bg-white cursor-ew-resize pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Heart className="text-pink-500" fill="currentColor" size={20} />
                        </motion.div>
                    </div>
                </div>

                {/* Invisible Range Input for Interaction */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={handleSliderChange}
                    className="absolute inset-0 z-30 opacity-0 cursor-ew-resize w-full h-full"
                />

                {/* Labels */}
                <div className="absolute bottom-6 left-6 z-40 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/30 text-[10px] uppercase font-black text-white tracking-widest">
                    Reality
                </div>
                <div className="absolute bottom-6 right-6 z-40 bg-pink-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-pink-500/30 text-[10px] uppercase font-black text-pink-500 tracking-widest">
                    Fantasy
                </div>
            </div>

            {/* CONTINUE BUTTON */}
            <AnimatePresence>
                {isFinished && (
                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={onNext}
                        className="mt-12 px-14 py-5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] shadow-xl flex items-center gap-3"
                    >
                        <span>Final Surprise</span>
                        <ChevronRight size={16} />
                    </motion.button>
                )}
            </AnimatePresence>

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

export default Page2Slider;
