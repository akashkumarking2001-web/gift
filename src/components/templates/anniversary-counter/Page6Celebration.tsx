import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, Share2, RefreshCw, Star, Trophy, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const Page6Celebration = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    const finalMessage = data.finalMessage || "This is just the first chapter of our infinity. I can't wait to see what the next pages bring.";

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
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#f59e0b', '#fbbf24', '#ffffff'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#f59e0b', '#fbbf24', '#ffffff'] });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-center p-8 font-outfit select-none isolate">

            <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-[#fefce8] to-transparent pointer-events-none -z-10 opacity-60" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-2xl bg-white border-2 border-amber-50 rounded-[4rem] p-12 md:p-20 shadow-[0_60px_150px_-30px_rgba(251,191,36,0.25)] text-center space-y-12"
            >
                {/* Final Interactive Reveal */}
                <div className="relative inline-block">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-12 bg-amber-50 rounded-[3rem] shadow-inner relative z-10"
                    >
                        <Trophy size={80} className="text-amber-500 drop-shadow-[0_10px_30px_rgba(245,158,11,0.3)]" />
                    </motion.div>
                    <div className="absolute -top-4 -right-4 bg-[#451a03] p-4 rounded-full shadow-lg text-amber-50">
                        <Star size={24} fill="currentColor" />
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-4xl md:text-[6rem] font-black text-[#451a03] font-romantic leading-tight">
                        Infinity & Beyond
                    </h2>
                    <div className="h-[2px] w-24 bg-amber-200 mx-auto" />
                    <p
                        className="text-amber-900/60 text-xl md:text-2xl font-medium tracking-tight italic cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Final Message:", finalMessage);
                                if (val) onUpdate?.('finalMessage', val);
                            }
                        }}
                    >
                        "{finalMessage}"
                    </p>
                </div>

                {/* Final Engagement Cluster */}
                <div className="pt-12 flex flex-col gap-10">
                    <div className="flex justify-center gap-8">
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="p-6 bg-amber-50 rounded-full text-amber-600 shadow-xl border border-amber-100 hover:bg-amber-100 transition-colors"
                        >
                            <Share2 size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            className="p-6 bg-amber-50 rounded-full text-amber-600 shadow-xl border border-amber-100 hover:bg-amber-100 transition-colors"
                        >
                            <Send size={24} />
                        </motion.button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="flex items-center gap-4 text-amber-300 hover:text-amber-600 transition-colors uppercase font-black text-[10px] tracking-[0.6em] mx-auto"
                    >
                        Proceed To Final Seal <ChevronRight size={14} />
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

export default Page6Celebration;
