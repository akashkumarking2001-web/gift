import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, RotateCcw, Heart, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const HBDFinal = ({ data }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#A855F7', '#EC4899', '#ffffff', '#FFD700']
        });
    };

    return (
        <div className="relative min-h-screen bg-[#fdfaff] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* SOFT PASTEL BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-purple-100 blur-[130px] rounded-full"
                />

                {/* Floating Hearts */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-200"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -60, 0],
                            scale: [1, 1.2, 1],
                            rotate: [0, 20, -20, 0]
                        }}
                        transition={{ duration: 4 + Math.random() * 4, repeat: Infinity }}
                    >
                        <Heart size={Math.random() * 20 + 20} fill="currentColor" opacity={0.3} />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 w-full max-w-lg text-center">
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.div
                            key="closed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <div className="space-y-4">
                                <motion.div
                                    className="bg-white px-6 py-2 rounded-full border border-purple-100 shadow-sm text-purple-400 font-bold uppercase tracking-[0.3em] text-[10px] inline-flex items-center gap-2"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Sparkles size={12} />
                                    One Last Thing...
                                </motion.div>
                                <h1 className="text-4xl md:text-6xl font-black text-purple-900 font-romantic">
                                    Ready for your gift?
                                </h1>
                            </div>

                            {/* 3D Gift Box */}
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleOpen}
                                className="relative cursor-pointer py-10"
                            >
                                <div className="w-64 h-64 md:w-80 md:h-80 bg-rose-500 rounded-[2rem] shadow-[0_25px_60px_-10px_rgba(244,63,94,0.4)] relative flex items-center justify-center border-b-8 border-rose-700">
                                    {/* Ribbons */}
                                    <div className="absolute top-0 bottom-0 w-8 bg-white/20 shadow-inner" />
                                    <div className="absolute left-0 right-0 h-8 bg-white/20 shadow-inner" />

                                    {/* Central Lid Detail */}
                                    <div className="absolute -top-4 w-full h-10 bg-rose-400 rounded-t-3xl border-b-4 border-rose-600 shadow-lg" />

                                    <Gift size={80} className="text-white drop-shadow-md animate-bounce" />

                                    <div className="absolute -bottom-12 font-bold text-rose-400 uppercase tracking-widest text-[10px] animate-pulse">
                                        Tap to open the box
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="opened"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center gap-10"
                        >
                            {/* The Reward Card */}
                            <div className="w-full bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_40px_100px_rgba(168,85,247,0.15)] border border-purple-50 flex flex-col items-center">

                                {/* Character Circle */}
                                <div className="relative mb-10">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                                        className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-purple-50 p-2 border-4 border-white shadow-xl overflow-hidden relative"
                                    >
                                        <img
                                            src={data.finalImage || "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkNXhndm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4mZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PXM/MeIucAjPKoA1j0zZX/giphy.gif"}
                                            alt="Happy Cat"
                                            className="w-full h-full object-cover rounded-full scale-125 translate-y-2"
                                        />
                                    </motion.div>

                                    {/* Decorative Sparkles */}
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute -top-4 -right-4 p-4 bg-white rounded-2xl shadow-lg border border-purple-50"
                                    >
                                        <Heart className="text-pink-500" fill="currentColor" />
                                    </motion.div>
                                </div>

                                <div className="space-y-6">
                                    <h2 className="text-3xl md:text-5xl font-black text-purple-900 font-romantic leading-tight">
                                        Happy Birthday! ❤️
                                    </h2>
                                    <p className="text-slate-500 font-medium leading-relaxed max-w-sm">
                                        {data.finalText || "Lots of love for you. Once again, Happy Birthday! Hope you loved your surprise."}
                                    </p>
                                </div>

                                {/* Controls */}
                                <div className="flex flex-col w-full gap-4 mt-12">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => window.location.reload()}
                                        className="w-full py-5 bg-purple-50 text-purple-600 font-black rounded-2xl text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-colors hover:bg-purple-100"
                                    >
                                        <RotateCcw size={16} /> Replay Surprise
                                    </motion.button>
                                    <div className="text-[9px] text-purple-200 uppercase font-black tracking-widest mt-4">
                                        Made with love for you
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

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

export default HBDFinal;
