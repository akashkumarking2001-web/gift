import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Heart, ShieldCheck, Zap, Sparkles, Star, Gem, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Page2QuestionProps {
    data: {
        question?: string;
        yesText?: string;
        noText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Question = ({ data, onNext, isEditing = false, onUpdate }: Page2QuestionProps) => {
    const [noCount, setNoCount] = useState(0);
    const [yesScale, setYesScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    // State for the "No" button position
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

    const defaultData = {
        question: data.question || "Will you be my Valentine forever?",
        yesText: data.yesText || "YES, FOREVER!",
        noText: data.noText || "No"
    };

    const handleNoHover = () => {
        if (!isEditing) {
            setNoCount(prev => prev + 1);
            setYesScale(prev => Math.min(prev + 0.2, 2.5)); // Grow YES button

            // Calculate random position within roughly 300px radius
            const angle = Math.random() * Math.PI * 2;
            const radius = 100 + Math.random() * 200;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            setNoPosition({ x, y });
        }
    };

    const handleYes = () => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 40, spread: 360, ticks: 100, zIndex: 50 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 80 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#dc2626', '#b91c1c', '#ffffff'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#991b1b', '#fca5a5', '#ffffff'] });
        }, 200);

        setTimeout(onNext, 1500);
    };

    const getNoText = () => {
        const phrases = [
            defaultData.noText,
            "Are you sure?",
            "Think again!",
            "Really?",
            "Look at the other button!",
            "Please?",
            "You're breaking my heart!",
            "I'll give you cookies!",
            "Don't do this!",
            "Last chance!",
            "Okay, I'm hiding now."
        ];
        return phrases[Math.min(noCount, phrases.length - 1)];
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0202] flex flex-col items-center justify-center p-8 text-center font-outfit isolate" ref={containerRef}>

            {/* HYPER-REALISTIC ROYAL ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15),transparent_70%)]"
                />
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')]" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#0a0202]/50 to-[#0a0202]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-20">

                {/* VISUAL STATUS ANCHOR: Royal Decree */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-red-950/20 backdrop-blur-3xl px-12 py-3.5 rounded-full border border-red-900/30 shadow-2xl"
                >
                    <Gem size={18} className="text-red-500" />
                    <span className="text-red-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Royal Decree 02 // The Ultimatum</span>
                    <Zap size={18} className="text-red-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE QUESTION MANIFESTO */}
                <div className="space-y-12 max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl md:text-[8rem] font-black text-white font-romantic leading-[1.1] tracking-tight drop-shadow-3xl px-4 italic"
                    >
                        "{defaultData.question}"
                    </motion.h2>
                    <div className="h-[2px] w-[30rem] bg-gradient-to-r from-transparent via-red-800/60 to-transparent mx-auto" />
                </div>

                {/* HIGH-STAKES INTERACTION ORBIT */}
                <div className="relative w-full h-[400px] flex items-center justify-center">

                    {/* THE YES AUTHORITY: Pulsing Core */}
                    <div className="absolute z-20 transition-all duration-500 ease-in-out" style={{ transform: `scale(${yesScale})` }}>
                        <div className="relative group/yes cursor-pointer" onClick={handleYes}>
                            {/* Massive Glow Interaction */}
                            <div className="absolute -inset-20 bg-red-600 blur-[80px] opacity-20 group-hover/yes:opacity-50 transition-opacity duration-700 animate-pulse" />

                            <button className="relative px-20 py-12 bg-white text-[#0a0202] rounded-[4rem] shadow-[0_50px_120px_-20px_rgba(220,38,38,0.5)] border-4 border-white/50 overflow-hidden isolate transition-transform duration-300 group-active/yes:scale-95">
                                <div className="absolute inset-0 bg-gradient-to-tr from-red-50 to-white opacity-100 group-hover/yes:opacity-90 transition-opacity" />
                                <div className="relative z-10 flex items-center gap-6">
                                    <Heart size={32} fill="#dc2626" className="text-red-600 animate-heartbeat" />
                                    <span className="font-black text-3xl md:text-5xl uppercase tracking-[0.2em]">{defaultData.yesText}</span>
                                    <Heart size={32} fill="#dc2626" className="text-red-600 animate-heartbeat" />
                                </div>

                                {/* Diamond Sparkles */}
                                <Sparkles className="absolute top-4 right-8 text-red-500/30 w-8 h-8 rotate-12" />
                                <Sparkles className="absolute bottom-4 left-8 text-red-500/30 w-6 h-6 -rotate-12" />
                            </button>
                        </div>
                    </div>

                    {/* THE NO EVASION: Physics-Based Drift */}
                    <motion.div
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        transition={{ type: "spring", damping: 15, stiffness: 300 }}
                        className="absolute z-10"
                    >
                        <button
                            onMouseEnter={handleNoHover}
                            onClick={handleNoHover}
                            className="group px-10 py-5 bg-red-950/30 backdrop-blur-md border border-red-900/40 rounded-full text-red-200/40 font-black text-xs uppercase tracking-[0.4em] hover:bg-red-900/50 hover:border-red-600/60 hover:text-red-100 transition-all shadow-xl flex items-center gap-4 cursor-none"
                        >
                            <Lock size={14} className="opacity-40" />
                            {getNoText()}
                        </button>
                    </motion.div>

                </div>

                {/* Status Bar */}
                <div className="flex flex-col items-center gap-4 opacity-20">
                    <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Awaiting Royal Consent</span>
                    <div className="h-[1px] w-60 bg-white" />
                </div>

            </div>

            {/* CORNER DECOR */}
            <div className="fixed -bottom-32 -left-32 w-96 h-96 bg-red-900/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="fixed -top-32 -right-32 w-96 h-96 bg-red-900/20 rounded-full blur-[100px] pointer-events-none" />

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes heartbeat {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.15); }
                }
                .animate-heartbeat {
                    animation: heartbeat 1.5s ease-in-out infinite;
                }
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />

        </div>
    );
};

export default Page2Question;
