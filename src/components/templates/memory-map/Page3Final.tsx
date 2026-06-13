import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, ShieldCheck, RefreshCw, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Page3FinalProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Final = ({ data, onNext, isEditing = false, onUpdate }: Page3FinalProps) => {
    const defaultData = {
        text: data.text || "Every mile with you is my favorite mile. Looking forward to our next adventure! ❤️"
    };

    useEffect(() => {
        if (!isEditing) {
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
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#10b981', '#34d399', '#ffffff'] });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#10b981', '#34d399', '#ffffff'] });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050805] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* Final Cinematic Atmospheric Aura */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2),transparent_70%)]"
                />

                {/* Floating Gilded Dust */}
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -150, 0],
                            opacity: [0, 0.6, 0],
                            scale: [0.5, 1.5, 0.5]
                        }}
                        transition={{ duration: 4 + Math.random() * 4, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-5xl w-full flex flex-col items-center space-y-20">

                {/* Visual Conclusion Anchor */}
                <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 80 }}
                    className="relative"
                >
                    {/* Multi-layered Pulsing Glow */}
                    <div className="absolute inset-0 bg-emerald-600 blur-[100px] opacity-40 animate-pulse" />

                    <div className="relative p-16 md:p-24 bg-white/[0.03] backdrop-blur-3xl rounded-[6rem] border border-emerald-800/20 shadow-[0_50px_150px_-30px_rgba(16,185,129,0.6)] isolate">
                        <Heart size={140} fill="#10b981" className="text-emerald-500 drop-shadow-[0_0_60px_rgba(16,185,129,0.8)]" />

                        {/* Orbiting Celestial Accents */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-12 pointer-events-none"
                        >
                            <Sparkles className="absolute top-0 right-0 w-12 h-12 text-emerald-200 opacity-50" />
                            <Star className="absolute bottom-0 left-0 w-10 h-10 text-white opacity-20" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Final Narrative Section */}
                <div className="space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-emerald-900/10 backdrop-blur-xl px-12 py-3.5 rounded-full border border-emerald-600/20 shadow-2xl mx-auto"
                    >
                        <ShieldCheck size={16} className="text-emerald-500" />
                        <span className="text-emerald-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Destination Reached</span>
                        <Zap size={16} className="text-emerald-500 fill-current" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl md:text-9xl font-black text-white font-romantic leading-tight drop-shadow-2xl px-6 tracking-tight"
                    >
                        {defaultData.text}
                    </motion.h1>
                </div>

                {/* Professional Action Area */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col items-center gap-10"
                >
                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-24 py-9 bg-white text-[#050805] font-black text-xs uppercase tracking-[0.8em] rounded-[3.5rem] shadow-[0_50px_100px_rgba(255,255,255,0.15)] flex items-center gap-6"
                    >
                        Recalibrate Journey <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700 text-emerald-600" />
                    </motion.button>

                    <div className="flex items-center gap-4 opacity-10">
                        <div className="h-[1px] w-20 bg-white" />
                        <span className="text-[8px] font-black tracking-[1em] uppercase">Status: Infinite Navigation</span>
                        <div className="h-[1px] w-20 bg-white" />
                    </div>
                </motion.div>

            </div>

            {/* Corner Metadata Decor */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-2 opacity-10 font-outfit">
                <div className="h-[1px] w-40 bg-emerald-600" />
                <span className="text-[10px] font-black tracking-[1em] uppercase text-white">Guest Satisfication: Absolute</span>
            </div>

        </div>
    );
};

export default Page3Final;
