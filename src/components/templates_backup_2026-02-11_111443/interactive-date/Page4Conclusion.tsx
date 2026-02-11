import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, ShieldCheck, Zap, RefreshCw, Verified, Wine } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Page4ConclusionProps {
    data: {
        msg?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4Conclusion = ({ data, onNext, isEditing = false, onUpdate }: Page4ConclusionProps) => {

    const defaultData = {
        msg: data.msg || "The virtual date was perfect, but I can't wait to see you in person! ❤️"
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

                // Banquet Jubilee Confetti
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#0d9488', '#5eead4', '#ffffff', '#ccfbf1']
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#0d9488', '#5eead4', '#ffffff', '#ccfbf1']
                });
            }, 200);

            return () => clearInterval(interval);
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#020606] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC BANQUET JUBILEE ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.25),transparent_70%)] blur-[80px]"
                />

                {/* Floating Champagne Bubbles */}
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-teal-200/40 rounded-full shadow-[0_0_10px_rgba(45,212,191,0.6)]"
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
                    className="inline-flex items-center gap-4 bg-teal-950/20 backdrop-blur-3xl px-14 py-4 rounded-full border border-teal-900/30 shadow-2xl mx-auto isolate"
                >
                    <Verified size={18} className="text-teal-400" />
                    <span className="text-teal-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Reservation Completed // 100%</span>
                    <Zap size={18} className="text-teal-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE TOAST ARTIFACT: High-Fidelity Celebration Node */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring', bounce: 0.5, duration: 2 }}
                    className="relative perspective-[3000px]"
                >
                    <div className="absolute inset-0 bg-teal-600/30 blur-[120px] rounded-full opacity-60 animate-pulse" />

                    <div className="relative p-24 md:p-36 bg-[#0a1818]/60 backdrop-blur-[80px] rounded-full border border-teal-800/20 shadow-[0_80px_150px_-30px_rgba(20,184,166,0.4)] isolate overflow-hidden group">

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* Biometric Network Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-teal-500/30 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-teal-900/10 rounded-full"
                        />

                        {/* Core Celebration Iconology */}
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1],
                                filter: ['drop-shadow(0 0 30px rgba(45,212,191,0.4))', 'drop-shadow(0 0 70px rgba(45,212,191,0.8))', 'drop-shadow(0 0 30px rgba(45,212,191,0.4))']
                            }}
                            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Wine size={160} className="text-teal-400 drop-shadow-3xl" strokeWidth={1} />
                        </motion.div>

                        {/* Interactive Heart Accent */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute bottom-20 left-1/2 -translate-x-1/2"
                        >
                            <Heart size={40} fill="#2dd4bf" className="text-teal-500" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE FINAL NARRATIVE: Triumphant Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <h1 className="text-5xl md:text-[8rem] font-black text-teal-50 leading-tight tracking-[0.02em] px-4 drop-shadow-[0_0_50px_rgba(20,184,166,0.5)] italic">
                        "{defaultData.msg}"
                    </h1>
                    <div className="h-[2px] w-[30rem] bg-gradient-to-r from-transparent via-teal-700/60 to-transparent mx-auto" />
                </div>

                {/* THE PROFESSIONAL ACTION: Resuscitate Protocol */}
                <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-14 pb-32">
                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-28 py-10 bg-white text-[#020606] font-black text-xs uppercase tracking-[0.8em] rounded-[4rem] shadow-[0_60px_120px_-20px_rgba(20,184,166,0.4)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[420px]"
                    >
                        <div className="absolute inset-0 bg-teal-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <span className="relative z-10 text-teal-950">New Reservation</span>
                        <RefreshCw className="relative z-10 w-8 h-8 group-hover:rotate-180 transition-transform duration-700 text-teal-950" />
                    </motion.button>

                    <div className="flex flex-col items-center gap-6 opacity-15">
                        <div className="h-[1px] w-[40rem] bg-gradient-to-r from-transparent via-white to-transparent" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Registry: Date Eternal</span>
                    </div>
                </div>

            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-teal-900 italic">Toast</div>
                <div className="h-[1px] w-72 bg-teal-900/40" />
                <span className="text-[10px] font-black tracking-widest text-teal-200 uppercase tracking-[1.5em]">TRIBUTE-END // V6.03</span>
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
