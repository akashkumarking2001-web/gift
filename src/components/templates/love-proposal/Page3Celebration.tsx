import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const Page3Celebration = ({ data, onNext }: any) => {
    React.useEffect(() => {
        const duration = 10 * 1000;
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

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#fff0f3] to-[#fffafa] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* FLOATING HEARTS */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-rose-500/10"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -200, 0],
                            rotate: 360,
                            scale: [1, 1.5, 1]
                        }}
                        transition={{ duration: 10 + Math.random() * 8, repeat: Infinity, ease: "linear" }}
                    >
                        <Heart size={40 + Math.random() * 60} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative z-10 text-center flex flex-col items-center"
            >
                {/* CELEBRATION BADGE */}
                <div className="mb-12">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-64 h-64 -m-8 opacity-20"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-rose-500">
                            <path d="M50 0 L61 35 L97 35 L68 57 L79 92 L50 70 L21 92 L32 57 L3 35 L39 35 Z" />
                        </svg>
                    </motion.div>

                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-48 h-48 rounded-full bg-rose-500 flex items-center justify-center shadow-[0_0_80px_rgba(225,29,72,0.4)] border-8 border-white relative z-20"
                    >
                        <Heart className="text-white w-24 h-24" fill="currentColor" />
                    </motion.div>
                </div>

                <div className="space-y-6 mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-rose-950 text-6xl md:text-8xl font-black font-romantic tracking-tighter"
                    >
                        {data.celebrationHeading || "It's A Yes!"}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        className="text-rose-900 text-xl font-medium italic"
                    >
                        {data.celebrationSubtext || "My heart is overflowing with joy."}
                    </motion.p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="px-14 py-6 bg-white text-rose-500 rounded-[2.5rem] font-black text-[12px] uppercase tracking-[0.4em] shadow-xl flex items-center gap-4 border border-rose-100"
                >
                    <span>Read my final unsealed letter</span>
                    <Sparkles size={16} />
                </motion.button>
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

export default Page3Celebration;
