import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Sparkles, Star, Trophy, ArrowRight, Zap } from 'lucide-react';

interface Page3CelebrationProps {
    data: {
        mainText?: string;
        subtext?: string;
        buttonText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Celebration = ({ data, onNext, isEditing = false, onUpdate }: Page3CelebrationProps) => {
    const defaultData = {
        mainText: data.mainText || "Moment of Transcendence",
        subtext: data.subtext || "The countdown ends... the magic begins.",
        buttonText: data.buttonText || "Unveil Your Gifts"
    };

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
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#05050a] flex flex-col items-center justify-center p-8 text-center font-outfit">

            {/* Hyper-Realistic Gilded Atmospehre */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.2),transparent_70%)]"
                />

                {/* Floating Confetti Particles */}
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-sm"
                        style={{
                            backgroundColor: ['#ec4899', '#f43f5e', '#fb923c', '#ffffff', '#eab308'][i % 5],
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -200, 0],
                            rotate: 360,
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-5xl w-full flex flex-col items-center space-y-16">

                {/* Visual Reveal Area */}
                <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 80 }}
                    className="relative"
                >
                    {/* Multi-layered Glow */}
                    <div className="absolute inset-0 bg-pink-600 blur-[80px] opacity-40 animate-pulse" />

                    <div className="relative p-12 md:p-16 bg-white/5 backdrop-blur-3xl rounded-[5rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(236,72,153,0.5)] isolate">
                        <Gift size={120} className="text-pink-400 drop-shadow-[0_0_50px_rgba(236,72,153,0.8)]" />

                        {/* Orbiting Elements */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 pointer-events-none"
                        >
                            <Star className="absolute top-0 right-0 w-10 h-10 text-yellow-200 fill-current opacity-40" />
                            <Sparkles className="absolute bottom-0 left-0 w-8 h-8 text-white opacity-30" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Narrative Typography */}
                <div className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl px-10 py-3 rounded-full border border-white/10"
                    >
                        <Trophy size={16} className="text-pink-400" />
                        <span className="text-pink-100/50 font-black uppercase tracking-[0.6em] text-[10px]">The Achievement of Life</span>
                        <Star size={16} className="text-yellow-400 fill-current" />
                    </motion.div>

                    <div className="space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-9xl font-black text-white font-romantic leading-[1.1] drop-shadow-2xl"
                        >
                            {defaultData.mainText}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-pink-100/40 text-xl md:text-3xl font-lovely italic leading-relaxed max-w-4xl mx-auto"
                        >
                            "{defaultData.subtext}"
                        </motion.p>
                    </div>
                </div>

                {/* Professional CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                >
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-24 py-9 bg-white text-[#050510] font-black text-xs uppercase tracking-[0.7em] rounded-[3rem] shadow-[0_40px_100px_rgba(255,255,255,0.15)] flex items-center gap-6 isolate"
                    >
                        <div className="absolute inset-0 bg-pink-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
                        <span className="relative z-10 text-pink-900">{defaultData.buttonText}</span>
                        <ArrowRight className="relative z-10 w-6 h-6 border-2 border-pink-900 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Corner Metadata */}
            <div className="fixed bottom-12 left-12 flex flex-col items-start gap-2 opacity-10">
                <div className="h-[1px] w-40 bg-pink-500" />
                <div className="font-romantic text-5xl text-pink-500 italic">Euphoria</div>
            </div>

        </div>
    );
};

export default Page3Celebration;
