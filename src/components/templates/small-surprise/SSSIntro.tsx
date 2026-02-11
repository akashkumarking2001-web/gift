import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const SSSIntro = ({ data, onNext }: any) => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0b2e] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT GLOW */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-pink-500/5 blur-[150px] rounded-full animate-pulse-slow" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 flex flex-col items-center text-center space-y-12"
            >
                {/* CIRCULAR WINDOW WITH CHARACTER */}
                <div className="relative">
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-[#111] border-4 border-pink-500/20 p-2 shadow-[0_0_50px_rgba(236,72,153,0.1)] relative overflow-hidden flex items-center justify-center"
                    >
                        <img
                            src={data.characterImage || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkNXhndm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4mZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PXM/MeIucAjPKoA1j0zZX/giphy.gif"}
                            alt="Blushing character"
                            className="w-full h-full object-contain scale-125 translate-y-4"
                        />

                        {/* Circular Border Ring */}
                        <div className="absolute inset-0 border-[12px] border-[#0a0a0a] rounded-full z-20" />
                    </motion.div>

                    {/* Floating Hearts around window */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -top-4 -right-4 text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                    >
                        <Heart fill="currentColor" size={40} />
                    </motion.div>
                </div>

                <div className="space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-white text-5xl md:text-7xl font-black font-romantic tracking-tight"
                    >
                        {data.heading || "Hey Beautiful"}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-pink-400/80 font-medium text-lg md:text-xl"
                    >
                        {data.subtext || "Do you even know how cute you are?"}
                    </motion.p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(236,72,153,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="px-12 py-5 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black text-xs uppercase tracking-[0.4em] rounded-full group flex items-center gap-3 shadow-[0_15px_30px_-5px_rgba(236,72,153,0.3)]"
                >
                    <Heart size={16} fill="white" className="group-hover:animate-ping" />
                    <span>{data.buttonText || "Open My Heart 🤍"}</span>
                </motion.button>
            </motion.div>

            {/* TYPOGRAPHY DECOR */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/5 text-[10px] uppercase font-black tracking-[1em] whitespace-nowrap">
                Surprise Mode // Activated
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

export default SSSIntro;
