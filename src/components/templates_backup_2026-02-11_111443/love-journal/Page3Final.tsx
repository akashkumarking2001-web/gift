import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, ShieldCheck, RefreshCw, Zap, Bookmark } from 'lucide-react';
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
        text: data.text || "Thank you for being the most beautiful part of my journal. I love you! ❤️"
    };

    useEffect(() => {
        if (!isEditing) {
            const duration = 12 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // Gilded Amber & Coffee Confetti
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#d97706', '#78350f', '#fffbeb']
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#b45309', '#92400e', '#fef3c7']
                });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0a08] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC VINTAGE ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.4, 0.1],
                        scale: [1, 1.4, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,83,9,0.15),transparent_70%),radial-gradient(circle_at_20%_80%,rgba(120,53,15,0.1),transparent_50%)] blur-[100px]"
                />

                {/* Vintage Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

                {/* Parallax Gilded Dust Storm */}
                {[...Array(80)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-amber-400/20 rounded-full shadow-[0_0_10px_rgba(217,119,6,0.5)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -600, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 2, 0.5]
                        }}
                        transition={{ duration: 5 + Math.random() * 8, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Completion Sequence */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-amber-950/10 backdrop-blur-3xl px-14 py-4 rounded-full border border-amber-900/20 shadow-2xl mx-auto isolate"
                >
                    <Bookmark size={18} className="text-amber-500" />
                    <span className="text-amber-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Archival Sequence 03 // Journal Sealed</span>
                    <Zap size={18} className="text-amber-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE ETERNAL ARTIFACT: High-Fidelity Heart Seal */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: 'spring', bounce: 0.5, duration: 2 }}
                    className="relative perspective-[3000px]"
                >
                    <div className="absolute inset-0 bg-amber-600/20 blur-[120px] rounded-full opacity-60 animate-pulse" />

                    <div className="relative p-24 md:p-36 bg-[#1a1410]/60 backdrop-blur-[80px] rounded-[8rem] border border-amber-800/15 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.8)] isolate overflow-hidden group">

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-amber-700/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* Orbital Gilded Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-amber-700/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-amber-900/10 rounded-full"
                        />

                        {/* Core Seal Iconology */}
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1],
                                filter: ['drop-shadow(0 0 30px rgba(217,119,6,0.4))', 'drop-shadow(0 0 70px rgba(217,119,6,0.8))', 'drop-shadow(0 0 30px rgba(217,119,6,0.4))']
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Heart size={160} fill="#d97706" className="text-amber-600 drop-shadow-3xl" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE FINAL MANIFESTO: Royal Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <h1 className="text-6xl md:text-[10rem] font-black text-amber-50 leading-tight tracking-[0.02em] px-4 drop-shadow-3xl italic">
                        "{defaultData.text}"
                    </h1>
                    <div className="h-[2px] w-[30rem] bg-gradient-to-r from-transparent via-amber-900/40 to-transparent mx-auto" />
                </div>

                {/* THE PROFESSIONAL ACTION: Tactical Core Navigation */}
                <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-14 pb-32">
                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-28 py-10 bg-[#0d0a08] border-2 border-amber-900/40 rounded-[4rem] text-amber-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_60px_120px_-20px_rgba(180,83,9,0.3)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[420px]"
                    >
                        <div className="absolute inset-0 bg-amber-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <RefreshCw className="relative z-10 w-8 h-8 text-amber-500 group-hover:rotate-180 group-hover:text-amber-100 transition-all duration-1000" />
                        <span className="relative z-10 text-amber-500 group-hover:text-amber-100 transition-colors">Re-Open The Memoirs</span>
                    </motion.button>

                    <div className="flex flex-col items-center gap-6 opacity-15">
                        <div className="h-[1px] w-[40rem] bg-gradient-to-r from-transparent via-white to-transparent" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Registry: Sequence Terminated // Archive Immortalized</span>
                    </div>
                </div>

            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 left-12 flex flex-col items-start gap-4 opacity-15">
                <div className="font-romantic text-8xl text-amber-900 italic">Sealed</div>
                <div className="h-[1px] w-72 bg-amber-900/40" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1.5em]">LOVE-JOURNAL-END // V2.03</span>
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

export default Page3Final;
