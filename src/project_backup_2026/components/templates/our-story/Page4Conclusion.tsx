import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, ShieldCheck, Zap, RefreshCw, Infinity, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Page4ConclusionProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4Conclusion = ({ data, onNext, isEditing = false, onUpdate }: Page4ConclusionProps) => {

    const defaultData = {
        text: data.text || "Our story is my favorite story, and the best chapters are yet to come. I love you! ❤️"
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

                // Deep Cosmos Confetti
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#4f46e5', '#818cf8', '#ffffff', '#c7d2fe']
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#4f46e5', '#818cf8', '#ffffff', '#c7d2fe']
                });
            }, 200);

            return () => clearInterval(interval);
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#02020a] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC COSMIC UNION ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.2),transparent_60%)] blur-[100px]"
                />

                {/* Nebula Clouds */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-screen" />

                {/* Converging Star Streams */}
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-indigo-300/40 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            scale: [0, 1.5, 0],
                            opacity: [0, 0.8, 0]
                        }}
                        transition={{ duration: 3 + Math.random() * 4, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Completion Sequence */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-indigo-950/20 backdrop-blur-3xl px-14 py-4 rounded-full border border-indigo-900/30 shadow-2xl mx-auto isolate"
                >
                    <Crown size={18} className="text-indigo-400" />
                    <span className="text-indigo-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Registry Sequence 04 // Union Verified</span>
                    <Zap size={18} className="text-indigo-400 fill-current animate-pulse" />
                </motion.div>

                {/* THE UNION ARTIFACT: High-Fidelity Heart Hub */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: 'spring', bounce: 0.5, duration: 2 }}
                    className="relative perspective-[3000px]"
                >
                    <div className="absolute inset-0 bg-indigo-600/30 blur-[120px] rounded-full opacity-60 animate-pulse" />

                    <div className="relative p-24 md:p-36 bg-[#050510]/60 backdrop-blur-[80px] rounded-[8rem] border border-indigo-800/20 shadow-[0_80px_150px_-30px_rgba(79,70,229,0.5)] isolate overflow-hidden group">

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* Orbital Cosmic Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-indigo-500/30 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-indigo-900/10 rounded-full"
                        />

                        {/* Core Celebration Iconology */}
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1],
                                filter: ['drop-shadow(0 0 30px rgba(79,70,229,0.4))', 'drop-shadow(0 0 70px rgba(79,70,229,0.8))', 'drop-shadow(0 0 30px rgba(79,70,229,0.4))']
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Heart size={160} fill="#4f46e5" className="text-indigo-500 drop-shadow-3xl" />
                        </motion.div>

                        {/* Interactive Infinity Accent */}
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        >
                            <Infinity size={32} className="text-indigo-300" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE FINAL NARRATIVE: Timeless Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <h1 className="text-5xl md:text-[8rem] font-black text-white leading-tight tracking-[0.02em] px-4 drop-shadow-3xl italic">
                        "{defaultData.text}"
                    </h1>
                    <div className="h-[2px] w-[30rem] bg-gradient-to-r from-transparent via-indigo-900/40 to-transparent mx-auto" />
                </div>

                {/* THE PROFESSIONAL ACTION: Re-Entry Protocol */}
                <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-14 pb-32">
                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-28 py-10 bg-white text-[#02020a] font-black text-xs uppercase tracking-[0.8em] rounded-[4rem] shadow-[0_60px_120px_-20px_rgba(79,70,229,0.4)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[420px]"
                    >
                        <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10 text-indigo-950">Recalibrate Narrative</span>
                        <RefreshCw className="relative z-10 w-8 h-8 group-hover:rotate-180 transition-transform duration-700 text-indigo-950" />
                    </motion.button>

                    <div className="flex flex-col items-center gap-6 opacity-15">
                        <div className="h-[1px] w-[40rem] bg-gradient-to-r from-transparent via-white to-transparent" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Registry: Sequence Complete // Eternal Bond Active</span>
                    </div>
                </div>

            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 left-12 flex flex-col items-start gap-4 opacity-15">
                <div className="font-romantic text-8xl text-indigo-900 italic">Union</div>
                <div className="h-[1px] w-72 bg-indigo-900/40" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1.5em]">OUR-STORY-END // V5.04</span>
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

export default Page4Conclusion;
