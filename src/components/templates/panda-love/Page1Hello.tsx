import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const Page1Hello = ({ data, onNext }: any) => {
    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#1a0b3e] to-[#0a0515] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT PURPLE HAZE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-violet-600/10 blur-[120px] rounded-full animate-pulse-slow" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 flex flex-col items-center text-center space-y-12"
            >
                {/* CIRCULAR PANDA WINDOW */}
                <div className="relative">
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-white/5 border-2 border-violet-500/20 p-2 shadow-[0_0_60px_rgba(139,92,246,0.1)] relative overflow-hidden flex items-center justify-center"
                    >
                        <img
                            src={data.characterImage || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkNXhndm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4mZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PXM/IeX1uMpk8XyR906t0D/giphy.gif"}
                            alt="Cute Panda"
                            className="w-full h-full object-contain scale-125"
                        />

                        {/* Shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Floating Heart */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-2 -right-2 text-violet-400 drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                    >
                        <Heart fill="currentColor" size={32} />
                    </motion.div>
                </div>

                <div className="space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-white text-5xl md:text-7xl font-black font-romantic tracking-tight leading-tight"
                    >
                        {data.greeting || "Sending You Love"}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="text-violet-300/80 font-medium text-lg md:text-xl max-w-xs mx-auto"
                    >
                        {data.subtext || "I'm sending you something special... are you ready?"}
                    </motion.p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(139,92,246,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="px-14 py-5 bg-gradient-to-r from-violet-600 to-purple-800 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-full group flex items-center gap-3 shadow-xl"
                >
                    <span>Open It 🐼</span>
                    <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                </motion.button>
            </motion.div>

            {/* TYPOGRAPHY DECOR */}
            <div className="absolute bottom-10 left-10 flex gap-4 opacity-10 text-[8px] font-black uppercase tracking-[0.5em] text-white">
                <span>Panda Love Edition</span>
                <span>•</span>
                <span>2026</span>
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

export default Page1Hello;
