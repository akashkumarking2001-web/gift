import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Star, ShieldCheck, Zap, Lock, Unlock, AlertTriangle, MousePointer2 } from 'lucide-react';

interface Page2GameProps {
    data: {
        question?: string;
        yesText?: string;
        noText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Game = ({ data, onNext, isEditing = false, onUpdate }: Page2GameProps) => {
    const [noClickCount, setNoClickCount] = useState(0);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [isGlitching, setIsGlitching] = useState(false);

    const defaultData = {
        question: data.question || "Will you be my Valentine?",
        yesText: data.yesText || "ACCESS GRANTED",
        noText: data.noText || "DENY ACCESS"
    };

    const noTexts = [
        defaultData.noText,
        "System Error: Cannot Deny",
        "Rerouting...",
        "Access Required",
        "Override Failed",
        "Don't Do This",
        "Security Alert!",
        "Heart Not Found",
        "Try The Other Button",
        "CRITICAL ERROR"
    ];

    const currentNoText = noClickCount < noTexts.length ? noTexts[noClickCount] : "ACCESS DENIED (FALSE)";

    const handleYes = () => {
        if (!isEditing) {
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 50 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) return clearInterval(interval);

                const particleCount = 80 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#dc2626', '#b91c1c', '#ffffff'] });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#991b1b', '#fca5a5', '#ffffff'] });
            }, 200);

            setTimeout(onNext, 1500);
        }
    };

    const handleNoMove = () => {
        if (isEditing) return;

        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 300);

        const container = containerRef.current;
        if (!container) return;

        // Calculate safer bounds - mostly keep it on screen but erratic
        const maxOffset = 250;
        const newX = (Math.random() - 0.5) * maxOffset * 2;
        const newY = (Math.random() - 0.5) * maxOffset * 2;

        setNoButtonPosition({ x: newX, y: newY });
        setNoClickCount(prev => prev + 1);
    };

    return (
        <div
            ref={containerRef}
            className="min-h-screen relative overflow-hidden bg-[#030000] flex flex-col items-center justify-center p-8 text-center font-outfit isolate"
        >

            {/* HYPER-REALISTIC CODE RED ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_60%)]"
                />

                {/* Digital Scanlines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none" />

                {/* Digital Noise */}
                <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Security Access */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-red-950/20 backdrop-blur-3xl px-12 py-3.5 rounded-full border border-red-900/30 shadow-[0_0_20px_rgba(220,38,38,0.2)]"
                >
                    <Lock size={16} className="text-red-500" />
                    <span className="text-red-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Security Clearance Required // Level 5</span>
                    <Zap size={16} className="text-red-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE QUESTION PAYLOAD */}
                <div className="space-y-12 max-w-6xl">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl md:text-[7rem] font-black text-white leading-[1.1] tracking-tight drop-shadow-[0_0_30px_rgba(220,38,38,0.4)] uppercase font-mono"
                    >
                        {/* Glitch Effect on Title */}
                        <span className="relative inline-block">
                            {defaultData.question}
                            <motion.span
                                animate={{ opacity: [0, 0.5, 0], x: [-2, 2, -1, 0] }}
                                transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 3 }}
                                className="absolute top-0 left-0 text-red-500 mix-blend-screen opacity-50"
                            >
                                {defaultData.question}
                            </motion.span>
                        </span>
                    </motion.h2>
                    <div className="h-[2px] w-[30rem] bg-gradient-to-r from-transparent via-red-600/60 to-transparent mx-auto" />
                </div>

                {/* HIGH-STAKES INTERACTION GATEWAY */}
                <div className="relative w-full h-[400px] flex items-center justify-center">

                    {/* THE YES KEY: Massive Unlock Protocol */}
                    <div className="relative z-20 group/yes cursor-pointer" onClick={handleYes}>
                        {/* Massive Glow Interaction */}
                        <div className="absolute -inset-20 bg-red-600 blur-[80px] opacity-20 group-hover/yes:opacity-40 transition-opacity duration-700 animate-pulse" />

                        <button className="relative px-24 py-12 bg-white text-[#030000] rounded-[2rem] shadow-[0_0_80px_-10px_rgba(220,38,38,0.6)] border-4 border-white/80 overflow-hidden isolate transition-transform duration-300 group-active/yes:scale-95 group-hover/yes:scale-105">
                            <div className="absolute inset-0 bg-gradient-to-tr from-red-50 to-white opacity-100 group-hover/yes:opacity-90 transition-opacity" />
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 mix-blend-multiply" />

                            <div className="relative z-10 flex items-center gap-6">
                                <Unlock size={32} className="text-red-600" />
                                <span className="font-black text-3xl md:text-5xl uppercase tracking-[0.2em] font-mono">{defaultData.yesText}</span>
                                <Unlock size={32} className="text-red-600" />
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-red-600" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-red-600" />
                        </button>
                    </div>

                    {/* THE NO GLITCH: Rogue Protocol */}
                    <AnimatePresence>
                        <motion.div
                            animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            className="absolute z-10"
                        >
                            <button
                                onMouseEnter={handleNoMove}
                                onClick={handleNoMove}
                                className={`group px-8 py-4 bg-red-950/20 backdrop-blur-md border border-red-900/40 rounded-lg text-red-500/60 font-black text-xs uppercase tracking-[0.4em] hover:bg-red-900/50 hover:border-red-500/80 hover:text-red-400 transition-all shadow-xl flex items-center gap-4 cursor-none font-mono ${isGlitching ? 'skew-x-12 opacity-80' : ''}`}
                            >
                                <AlertTriangle size={14} className="opacity-60" />
                                {currentNoText}
                            </button>
                        </motion.div>
                    </AnimatePresence>

                </div>

                {/* Status Bar */}
                <div className="flex flex-col items-center gap-4 opacity-20">
                    <span className="text-[10px] font-black tracking-[1.5em] uppercase text-red-500 font-mono">Awaiting Clearance Code</span>
                    <div className="h-[1px] w-60 bg-red-800" />
                </div>

            </div>

            {/* CORNER DECOR */}
            <div className="fixed -bottom-32 -left-32 w-96 h-96 bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="fixed -top-32 -right-32 w-96 h-96 bg-red-900/10 rounded-full blur-[100px] pointer-events-none" />

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

export default Page2Game;
