import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, Share2, RefreshCw, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const Page7Celebration = ({ data }: any) => {
    useEffect(() => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#fb7185', '#fb923c', '#ffffff'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#fb7185', '#fb923c', '#ffffff'] });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-center p-8 font-outfit select-none isolate">

            {/* AMBIENT CELEBRATION */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#fff1f2,transparent_70%)] opacity-60" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-2xl bg-white border-2 border-pink-50 rounded-[4rem] p-12 md:p-20 shadow-[0_60px_150px_-30px_rgba(251,113,133,0.3)] text-center space-y-12"
            >
                {/* Final Icon Cluster */}
                <div className="relative inline-block">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-10 bg-rose-50 rounded-[3rem] shadow-inner relative z-10"
                    >
                        <Heart size={80} fill="#f43f5e" className="text-rose-500 drop-shadow-[0_10px_30px_rgba(244,63,94,0.4)]" />
                    </motion.div>
                    <div className="absolute -top-4 -right-4 bg-amber-400 p-4 rounded-full shadow-lg text-white">
                        <Star size={24} fill="white" />
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-5xl md:text-[8rem] font-black text-[#5e2d63] font-romantic leading-tight">
                        {data.finalText || "Happy Birthday!"}
                    </h2>
                    <p className="text-slate-500 text-xl md:text-2xl font-medium tracking-tight border-t border-pink-50 pt-8 italic">
                        "Another year of making the world a better place just by being in it."
                    </p>
                </div>

                {/* Engagement Cluster */}
                <div className="pt-12 flex flex-col gap-10">
                    <div className="flex justify-center gap-8">
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="p-6 bg-rose-50 rounded-full text-rose-500 shadow-xl border border-rose-100 hover:bg-rose-100 transition-colors"
                        >
                            <Share2 size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            className="p-6 bg-rose-50 rounded-full text-rose-500 shadow-xl border border-rose-100 hover:bg-rose-100 transition-colors"
                        >
                            <Send size={24} />
                        </motion.button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-4 text-slate-300 hover:text-rose-400 transition-colors uppercase font-black text-[10px] tracking-[0.6em] mx-auto"
                    >
                        <RefreshCw size={14} /> Relive the Party
                    </motion.button>
                </div>
            </motion.div>

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

export default Page7Celebration;
