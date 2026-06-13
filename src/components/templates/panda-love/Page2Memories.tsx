import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Camera, Sparkles } from 'lucide-react';

const Page2Memories = ({ data, onNext }: any) => {
    const defaultPhotos = [
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1516589174184-c68526614486?auto=format&fit=crop&q=80&w=800",
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
        <div className="relative min-h-screen bg-gradient-to-b from-[#1a0b3e] to-[#0a0515] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            <div className="relative z-20 text-center mb-16 space-y-4">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-white text-3xl md:text-5xl font-black font-romantic tracking-tight"
                >
                    {data.heading || "Memories of Us"}
                </motion.h2>
                <div className="flex justify-center items-center gap-2 text-violet-400 uppercase tracking-[0.4em] text-[10px] font-bold">
                    <Camera size={12} />
                    <span>Tap to slide through</span>
                </div>
            </div>

            {/* PHOTO STACK */}
            <div className="relative w-full max-w-sm h-96 flex items-center justify-center pt-10">
                <AnimatePresence>
                    {stack.map((photo: string, i: number) => (
                        <motion.div
                            key={photo}
                            initial={{ scale: 0, rotate: (Math.random() - 0.5) * 20 }}
                            animate={{
                                scale: 1,
                                rotate: (i - stack.length / 2) * 5,
                                y: -i * 2
                            }}
                            exit={{
                                x: -600,
                                rotate: -20,
                                opacity: 0,
                                transition: { duration: 0.6, ease: "circIn" }
                            }}
                            onClick={handlePop}
                            className="absolute cursor-pointer group"
                            style={{ zIndex: i }}
                        >
                            <div className="w-64 h-80 bg-white p-3 pb-12 shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-105">
                                <div className="w-full h-full bg-slate-50 overflow-hidden relative">
                                    <img
                                        src={photo}
                                        alt="Memory"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-violet-900/10 mix-blend-overlay" />
                                </div>
                                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center opacity-40">
                                    <div className="text-[10px] font-mono text-black font-bold uppercase tracking-widest">
                                        Frame #{i + 1}
                                    </div>
                                    <Heart size={14} className="text-violet-500" fill="currentColor" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
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

export default Page2Memories;
