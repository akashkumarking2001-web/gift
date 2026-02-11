import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, Share2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Page4ConclusionProps {
    data: {
        message?: string;
        signature?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4Conclusion = ({ data, onNext, isEditing = false, onUpdate }: Page4ConclusionProps) => {
    const defaultData = {
        message: data.message || "To my favorite human, thank you for being the highlight of my life. This journey with you is more than I ever dreamed of. Let's keep making every second count, building our dreams, and loving each other more every single day.",
        signature: data.signature || "Forever Yours ❤️"
    };

    useEffect(() => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

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

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#fff5f8] to-white flex flex-col items-center justify-center p-6 font-outfit select-none isolate">

            {/* AMBIENT CELEBRATION ELEMENTS */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-4xl opacity-10"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -200], opacity: [0, 0.2, 0] }}
                        transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 10 }}
                    >
                        {['🥂', '💐', '💍', '✨'][i % 4]}
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-2xl bg-white rounded-[3.5rem] p-12 md:p-20 shadow-[0_60px_150px_-30px_rgba(244,63,94,0.15)] border-2 border-pink-50 text-center"
            >
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-12 inline-block"
                >
                    <Heart size={60} fill="#f43f5e" className="text-rose-500 drop-shadow-[0_0_20px_rgba(244,63,94,0.4)]" />
                </motion.div>

                <div className="space-y-10">
                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-[#5e2d63] font-romantic leading-tight"
                    >
                        Our Love is Infinite
                    </motion.h2>

                    <div className="h-1 w-20 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium italic"
                    >
                        "{defaultData.message}"
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="pt-8"
                    >
                        <p className="text-pink-600 font-romantic text-3xl font-black italic">
                            {defaultData.signature}
                        </p>
                    </motion.div>
                </div>

                {/* Final Interactive Action */}
                <div className="mt-16 flex flex-col gap-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="mx-auto flex items-center gap-3 text-slate-300 hover:text-pink-400 transition-colors uppercase font-black text-[10px] tracking-widest"
                    >
                        <RefreshCw size={14} /> Relive The Magic
                    </motion.button>

                    <div className="flex items-center justify-center gap-8 mt-4 pt-10 border-t border-slate-50">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-4 bg-rose-50 rounded-full text-rose-500 hover:bg-rose-100 transition-all"
                        >
                            <Share2 size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="p-4 bg-rose-50 rounded-full text-rose-500 hover:bg-rose-100 transition-all"
                        >
                            <Send size={24} />
                        </motion.button>
                    </div>
                </div>

                {/* Aesthetic Detail */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-pink-100/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-100/20 blur-[60px] rounded-full translate-y-1/2 -translate-x-1/2" />
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

export default Page4Conclusion;
