import { motion } from 'framer-motion';
import { Sparkles, Gift, Star, MoveRight, ShieldCheck, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Page2RevealProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Reveal = ({ data, onNext, isEditing = false, onUpdate }: Page2RevealProps) => {
    const defaultData = {
        text: data.text || "Surprise! I love you more than all the bamboo in the world! 🐼💕"
    };

    useEffect(() => {
        if (!isEditing) {
            const duration = 10 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#a855f7', '#d946ef', '#ffffff'] });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#a855f7', '#d946ef', '#ffffff'] });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0515] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* Hyper-Realistic Atmospheric Reveal */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2),transparent_70%)]"
                />
            </div>

            <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">

                {/* Visual Reveal Anchor */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-20 relative group"
                >
                    <div className="relative p-16 bg-white/[0.03] backdrop-blur-3xl rounded-[5rem] border border-purple-500/20 shadow-[0_50px_100px_-20px_rgba(139,92,246,0.25)] isolate">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-[5rem]" />

                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Gift size={90} strokeWidth={1} className="text-purple-400 drop-shadow-[0_0_30px_rgba(139,92,246,0.6)]" />
                        </motion.div>

                        {/* Orbiting Sparkles */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 pointer-events-none"
                        >
                            <Sparkles size={24} className="absolute top-0 right-0 text-yellow-400 animate-pulse" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Secret Typography Section */}
                <div className="space-y-12 mb-28 text-center max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-purple-900/10 backdrop-blur-xl px-12 py-3.5 rounded-full border border-purple-800/20 mx-auto"
                    >
                        <ShieldCheck size={14} className="text-purple-400" />
                        <span className="text-purple-100/50 font-black uppercase tracking-[0.6em] text-[10px]">Registry Reveal 02</span>
                        <Zap size={14} className="text-purple-400 fill-current opacity-30" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight tracking-[0.02em] px-4 drop-shadow-2xl"
                    >
                        "{defaultData.text}"
                    </motion.h1>
                </div>

                {/* Professional Navigation Area */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-24 py-9 bg-[#0a0515] border-2 border-purple-900/30 rounded-[3.5rem] text-purple-400 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(139,92,246,0.3)] transition-all flex items-center gap-6 isolate overflow-hidden"
                >
                    <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-[3.5rem]" />
                    <span className="relative z-10 text-purple-400">Proceed To Finale</span>
                    <MoveRight className="relative z-10 w-6 h-6 border-2 border-purple-900/30 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                </motion.button>
            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-2 opacity-10">
                <div className="font-romantic text-6xl text-purple-700 italic">Discovery</div>
                <div className="h-[1px] w-48 bg-purple-700" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase">System: Reveal V4</span>
            </div>

        </div>
    );
};

export default Page2Reveal;
