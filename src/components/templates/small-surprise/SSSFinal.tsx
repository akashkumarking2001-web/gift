import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, Share2, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const SSSFinal = ({ data }: any) => {
    const handleReplay = () => {
        window.location.reload();
    };

    React.useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#EC4899', '#ffffff', '#FFD700']
        });
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0b2e] flex flex-col items-center justify-start pt-24 p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT PARTICLES */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-500/10"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -40, 0],
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 4 + Math.random() * 4, repeat: Infinity }}
                    >
                        <Heart size={20 + Math.random() * 20} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center gap-12">
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-pink-500/10 px-6 py-2 rounded-full border border-pink-500/20"
                    >
                        <Sparkles size={14} className="text-pink-400" />
                        <span className="text-pink-200 font-black uppercase tracking-[0.4em] text-[10px]">Finale Revealed</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white text-5xl md:text-8xl font-black font-romantic leading-tight tracking-tighter"
                    >
                        {data.finalHeading || "Special To Me"}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-pink-100/60 text-lg md:text-2xl max-w-lg mx-auto leading-relaxed"
                    >
                        {data.finalMessage || "I really appreciate having you in my life. You'll always be special to me."}
                    </motion.p>
                </div>

                {/* POP-OUT CHARACTER WINDOW */}
                <div className="relative w-full h-80 flex items-center justify-center">
                    {/* Circle Window */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-64 h-64 rounded-full bg-[#111] border-4 border-white/5 relative overflow-hidden"
                    >
                        {/* Glow from inside */}
                        <div className="absolute inset-0 bg-pink-500/10 blur-3xl rounded-full" />

                        {/* Character Pop-out */}
                        <motion.img
                            src={data.finalCharacter || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkNXhndm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4mZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PXM/MeIucAjPKoA1j0zZX/giphy.gif"}
                            initial={{ y: 200, opacity: 0 }}
                            animate={{ y: 20, opacity: 1 }}
                            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                            className="w-full h-full object-contain scale-110"
                        />

                        {/* Sparkle badge */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            className="absolute top-4 right-4 text-yellow-400"
                        >
                            <Star size={32} fill="currentColor" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col md:flex-row gap-4 w-full max-w-md pt-8">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleReplay}
                        className="flex-1 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-all hover:bg-white/10"
                    >
                        <RotateCcw size={16} /> Replay
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 py-5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-xl"
                    >
                        <Share2 size={16} /> Share Moment
                    </motion.button>
                </div>
            </div>

            {/* FINAL SIGNATURE */}
            <div className="fixed bottom-10 opacity-30">
                <p className="font-romantic text-3xl text-white italic tracking-widest">~ Forever ❤️</p>
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

export default SSSFinal;
