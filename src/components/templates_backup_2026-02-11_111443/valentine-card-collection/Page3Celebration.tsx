import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, ShieldCheck, Zap, RefreshCw, Crown, Gem } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Page3CelebrationProps {
    data: {
        revealMsg?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Celebration = ({ data, onNext, isEditing = false, onUpdate }: Page3CelebrationProps) => {

    const defaultData = {
        revealMsg: data.revealMsg || "I hope these cards remind you how much you are loved. Happy Valentine's Day! ❤️"
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

                // Royal Jubilee Confetti
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#e11d48', '#f59e0b', '#ffffff', '#fcd34d']
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#e11d48', '#f59e0b', '#ffffff', '#fcd34d']
                });
            }, 200);

            return () => clearInterval(interval);
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#1f0505] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC ROYAL JUBILEE ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(180,83,9,0.2),transparent_70%)] blur-[80px]"
                />

                {/* Floating Gold Dust */}
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-amber-200/40 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -200, 0],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ duration: 4 + Math.random() * 6, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Jubilee Sequence */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-red-950/20 backdrop-blur-3xl px-14 py-4 rounded-full border border-red-900/30 shadow-2xl mx-auto isolate"
                >
                    <Crown size={18} className="text-amber-400" />
                    <span className="text-amber-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Registry Sequence 03 // Jubilee</span>
                    <Zap size={18} className="text-amber-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE GEM ARTIFACT: High-Fidelity Heart Diamond */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring', bounce: 0.5, duration: 2 }}
                    className="relative perspective-[3000px]"
                >
                    <div className="absolute inset-0 bg-red-600/30 blur-[120px] rounded-full opacity-60 animate-pulse" />

                    <div className="relative p-24 md:p-36 bg-[#2a0a0a]/60 backdrop-blur-[80px] rounded-[8rem] border border-amber-800/20 shadow-[0_80px_150px_-30px_rgba(180,83,9,0.4)] isolate overflow-hidden group">

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* Royal Wreath Effect */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-amber-500/30 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-red-900/10 rounded-full"
                        />

                        {/* Core Celebration Iconology */}
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1],
                                filter: ['drop-shadow(0 0 30px rgba(180,83,9,0.4))', 'drop-shadow(0 0 70px rgba(180,83,9,0.8))', 'drop-shadow(0 0 30px rgba(180,83,9,0.4))']
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Gem size={160} className="text-amber-400 drop-shadow-3xl" strokeWidth={1} />
                        </motion.div>

                        {/* Interactive Heart Accent */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2"
                        >
                            <Heart size={32} fill="#ef4444" className="text-red-500" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE FINAL NARRATIVE: Regal Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <h1 className="text-5xl md:text-[8rem] font-black text-amber-50 leading-tight tracking-[0.02em] px-4 drop-shadow-3xl italic">
                        "{defaultData.revealMsg}"
                    </h1>
                    <div className="h-[2px] w-[30rem] bg-gradient-to-r from-transparent via-amber-700/60 to-transparent mx-auto" />
                </div>

                {/* THE PROFESSIONAL ACTION: Rewind Protocol */}
                <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-14 pb-32">
                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-28 py-10 bg-[#fefce8] text-[#1f0505] font-black text-xs uppercase tracking-[0.8em] rounded-[4rem] shadow-[0_60px_120px_-20px_rgba(180,83,9,0.4)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[420px]"
                    >
                        <div className="absolute inset-0 bg-amber-200 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10 text-amber-950">Seal Another Decree</span>
                        <RefreshCw className="relative z-10 w-8 h-8 group-hover:rotate-180 transition-transform duration-700 text-amber-950" />
                    </motion.button>

                    <div className="flex flex-col items-center gap-6 opacity-15">
                        <div className="h-[1px] w-[40rem] bg-gradient-to-r from-transparent via-amber-200 to-transparent" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-amber-100">Registry: Royal Archives Sealed</span>
                    </div>
                </div>

            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-red-900 italic">Jubilee</div>
                <div className="h-[1px] w-72 bg-red-900/40" />
                <span className="text-[10px] font-black tracking-widest text-amber-200 uppercase tracking-[1.5em]">TRIBUTE-END // V4.03</span>
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
