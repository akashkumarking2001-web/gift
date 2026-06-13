import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, ShieldCheck, Zap, Flag, Award, MoveRight, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';

interface Page3CelebrationProps {
    data: {
        mainText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Celebration = ({ data, onNext, isEditing = false, onUpdate }: Page3CelebrationProps) => {
    const [showButton, setShowButton] = useState(false);

    const defaultData = {
        mainText: data.mainText || "MISSION ACCOMPLISHED"
    };

    useEffect(() => {
        if (!isEditing) {
            const duration = 15 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 80 * (timeLeft / duration);

                // Victory Gold & Crimson Confetti
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#dc2626', '#f59e0b', '#ffffff', '#fbbf24']
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#dc2626', '#f59e0b', '#ffffff', '#fbbf24']
                });
            }, 200);

            setTimeout(() => setShowButton(true), 3000);

            // Auto advance after 8 seconds if not editing
            const timer = setTimeout(onNext, 8000);
            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#030000] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC VICTORY ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15),transparent_60%)]"
                />

                {/* Digital Fireworks (Simulated via Gradients) */}
                <motion.div
                    animate={{ opacity: [0, 0.4, 0], scale: [0.5, 1.5, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-radial-gradient(circle, rgba(220,38,38,0.4) 0%, transparent 70%)"
                />
                <motion.div
                    animate={{ opacity: [0, 0.4, 0], scale: [0.5, 1.5, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 1 }}
                    className="absolute top-1/3 right-1/4 w-96 h-96 bg-radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)"
                />

                {/* Digital Noise */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Victory Log */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-amber-950/20 backdrop-blur-3xl px-14 py-4 rounded-full border border-amber-900/30 shadow-[0_0_30px_rgba(245,158,11,0.2)] mx-auto isolate"
                >
                    <Award size={18} className="text-amber-500" />
                    <span className="text-amber-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Operation Successful // Target Acquired</span>
                    <Zap size={18} className="text-amber-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE VICTORY ARTIFACT: Golden Heart Trophy */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', bounce: 0.5, duration: 2 }}
                    className="relative perspective-[3000px]"
                >
                    <div className="absolute inset-0 bg-amber-600/30 blur-[120px] rounded-full opacity-60 animate-pulse" />

                    <div className="relative p-24 md:p-36 bg-[#0a0500]/60 backdrop-blur-[80px] rounded-[8rem] border border-amber-800/20 shadow-[0_80px_150px_-30px_rgba(245,158,11,0.3)] isolate overflow-hidden group">

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-700/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* Orbital Victory Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-amber-600/30 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-amber-900/20 rounded-full"
                        />

                        {/* Core Trophy Iconology */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                filter: ['drop-shadow(0 0 30px rgba(245,158,11,0.4))', 'drop-shadow(0 0 70px rgba(245,158,11,0.8))', 'drop-shadow(0 0 30px rgba(245,158,11,0.4))']
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Crown size={140} className="text-amber-500 drop-shadow-3xl" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE VICTORY SPEECH */}
                <div className="space-y-12 text-center max-w-6xl font-romantic">
                    <h1 className="text-5xl md:text-[8rem] font-black text-white leading-tight tracking-[0.02em] px-4 drop-shadow-3xl italic">
                        "{defaultData.mainText}"
                    </h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="inline-block bg-amber-950/30 border border-amber-900/30 px-8 py-3 rounded-full"
                    >
                        <p className="text-amber-200/80 font-mono tracking-[0.2em] text-lg uppercase">
                            Objective Complete: Partner Secured ❤️
                        </p>
                    </motion.div>
                </div>

                {/* THE PROFESSIONAL ACTION: Next Directive */}
                <AnimatePresence>
                    {showButton && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-14 pb-32"
                        >
                            <motion.button
                                onClick={onNext}
                                whileHover={{ scale: 1.05, y: -10 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-28 py-10 bg-white text-[#0a0202] font-black text-xs uppercase tracking-[0.8em] rounded-[4rem] shadow-[0_60px_120px_-20px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[420px]"
                            >
                                <div className="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10 text-amber-950">Proceed To Debrief</span>
                                <MoveRight className="relative z-10 w-8 h-8 border-2 border-amber-950/20 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700" />
                            </motion.button>

                            <div className="flex flex-col items-center gap-6 opacity-15">
                                <div className="h-[1px] w-[40rem] bg-gradient-to-r from-transparent via-white to-transparent" />
                                <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white font-mono">Log Sequence: Finalizing...</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 left-12 flex flex-col items-start gap-4 opacity-15">
                <div className="font-mono text-8xl text-amber-900/50">VICTORY</div>
                <div className="h-[1px] w-72 bg-amber-900/40" />
                <span className="text-[10px] font-black tracking-widest text-amber-600 uppercase tracking-[1.5em] font-mono">MISSION-SUCCESS // V9.02</span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />

        </div>
    );
};

export default Page3Celebration;
