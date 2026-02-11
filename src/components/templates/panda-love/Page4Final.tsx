import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const Page4Final = ({ data }: any) => {
    React.useEffect(() => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const handleReplay = () => {
        window.location.reload();
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#1a0b3e] to-[#0a0515] flex flex-col items-center justify-start pt-24 p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT PARTICLES */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-violet-500"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -100, 0],
                            rotate: 360,
                            scale: [1, 1.5, 1]
                        }}
                        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                    >
                        <Heart size={20 + Math.random() * 20} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center gap-12">
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 bg-violet-500/10 px-6 py-2 rounded-full border border-violet-500/20"
                    >
                        <Sparkles size={14} className="text-violet-400" />
                        <span className="text-violet-200 font-black uppercase tracking-[0.4em] text-[10px]">Special Delivery</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-white text-5xl md:text-8xl font-black font-romantic leading-tight tracking-tighter"
                    >
                        {data.finalHeading || "Forever & Always"}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-violet-200/60 text-lg md:text-2xl max-w-lg mx-auto leading-relaxed italic"
                    >
                        {data.finalMessage || "No matter where life takes us, remember that you have a little panda in your corner, cheering you on and loving you always."}
                    </motion.p>
                </div>

                {/* BOTTOM CIRCULAR WINDOW */}
                <div className="relative w-full h-80 flex items-end justify-center">
                    <motion.div
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", damping: 15 }}
                        className="w-80 h-80 rounded-t-[10rem] bg-[#111] border-t-2 border-x-2 border-white/5 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-violet-500/5 blur-3xl opacity-50" />
                        <img
                            src={data.finalCharacter || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkNXhndm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4mZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PXM/IeX1uMpk8XyR906t0D/giphy.gif"}
                            alt="Panda"
                            className="w-full h-full object-contain translate-y-12"
                        />
                    </motion.div>
                </div>

                {/* ACTIONS */}
                <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
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
                        className="flex-1 py-5 bg-gradient-to-r from-violet-600 to-purple-800 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-xl"
                    >
                        <Share2 size={16} /> Share Moment
                    </motion.button>
                </div>
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

export default Page4Final;
