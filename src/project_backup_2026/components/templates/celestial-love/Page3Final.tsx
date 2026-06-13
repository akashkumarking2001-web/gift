import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, ShieldCheck, RefreshCw, MoveRight, Zap } from 'lucide-react';
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
        text: data.text || "Our love is written in the stars, and the universe is our playground. I love you! ❤️"
    };

    useEffect(() => {
        if (!isEditing) {
            const duration = 10 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(() => {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // Celestial Blue & Purple Confetti
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                    colors: ['#3b82f6', '#1d4ed8', '#ffffff']
                });
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                    colors: ['#8b5cf6', '#6d28d9', '#ffffff']
                });
            }, 250);
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#02040a] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC CELESTIAL ENVIRONMENT (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.4, 0.1],
                        scale: [1, 1.4, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_70%),radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.15),transparent_50%)] blur-[100px]"
                />
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                {/* Parallax Gilded Dust Storm */}
                {[...Array(80)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
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
                    className="inline-flex items-center gap-4 bg-blue-900/10 backdrop-blur-3xl px-14 py-4 rounded-full border border-blue-500/20 shadow-2xl mx-auto isolate"
                >
                    <ShieldCheck size={18} className="text-blue-500" />
                    <span className="text-blue-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Transmission Sequence 03 // Eternal Culmination</span>
                    <Zap size={18} className="text-blue-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE ETERNAL ARTIFACT: High-Fidelity 3D Heart Hub */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: 'spring', bounce: 0.5, duration: 1.5 }}
                    className="relative perspective-[3000px]"
                >
                    <div className="absolute inset-0 bg-blue-500/30 blur-[120px] rounded-full opacity-60 animate-pulse" />

                    <div className="relative p-24 md:p-36 bg-white/[0.02] backdrop-blur-[60px] rounded-[8rem] border border-blue-500/15 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.8)] isolate overflow-hidden group">

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* Orbital Gilded Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-blue-500/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-white/5 rounded-full"
                        />

                        {/* Core Master Icon */}
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1],
                                filter: ['drop-shadow(0 0 30px rgba(59,130,246,0.4))', 'drop-shadow(0 0 70px rgba(59,130,246,0.8))', 'drop-shadow(0 0 30px rgba(59,130,246,0.4))']
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <Heart size={160} fill="#3b82f6" className="text-blue-500 drop-shadow-3xl" />
                        </motion.div>
                    </div>

                    {/* Floating Accents */}
                    <motion.div
                        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                        className="absolute -top-12 -right-12 text-9xl drop-shadow-2xl grayscale opacity-40"
                    >
                        ✨
                    </motion.div>
                </motion.div>

                {/* THE FINAL MANIFESTO: Royal Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <h1 className="text-6xl md:text-[11rem] font-black text-white leading-tight tracking-[0.02em] px-4 drop-shadow-3xl">
                        "{defaultData.text}"
                    </h1>
                    <div className="h-1 w-96 bg-gradient-to-r from-transparent via-blue-900/40 to-transparent mx-auto" />
                </div>

                {/* THE PROFESSIONAL ACTION: Tactical Core */}
                <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-12 pb-32">
                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-28 py-10 bg-white text-[#02040a] font-black text-xs uppercase tracking-[0.8em] rounded-[4rem] shadow-[0_60px_120px_-20px_rgba(59,130,246,0.6)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[420px]"
                    >
                        <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <RefreshCw className="relative z-10 w-6 h-6 text-blue-950 group-hover:rotate-180 transition-transform duration-1000" />
                        <span className="relative z-10 text-blue-950">Broadcast Eternal Loop</span>
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-white" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Registry: Eternal Horizon Found</span>
                        <div className="h-[1px] w-48 bg-white" />
                    </div>
                </div>

            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 left-12 flex flex-col items-start gap-4 opacity-15">
                <div className="font-romantic text-8xl text-blue-900 italic">Culmination</div>
                <div className="h-[1px] w-72 bg-blue-900/40" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1.5em]">CELESTIAL-END // V4.03</span>
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
