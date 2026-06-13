import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Stars, Sparkles, ChevronRight, Zap, AlertCircle } from 'lucide-react';

const Page2Game = ({ data, onNext }: any) => {
    const [noClickCount, setNoClickCount] = useState(0);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const defaultData = {
        question: data.question || "Will you be my Valentine?",
        yesText: data.yesText || "Yes, Forever!",
        noText: data.noText || "No"
    };

    const noTexts = [
        defaultData.noText,
        "Are you sure?",
        "Think again...",
        "Really?",
        "Don't do this!",
        "You're making me sad 🥺",
        "Wait, what?",
        "Try the other button!",
        "Invalid Choice",
        "PLEASE"
    ];

    const currentNoText = noClickCount < noTexts.length ? noTexts[noClickCount] : "No (Disabled)";

    const handleYes = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ffccd5', '#ffffff']
        });
        setTimeout(onNext, 1500);
    };

    const handleNoMove = () => {
        const container = containerRef.current;
        if (!container) return;

        const maxOffset = 200;
        const newX = (Math.random() - 0.5) * maxOffset * 2;
        const newY = (Math.random() - 0.5) * maxOffset * 2;

        setNoButtonPosition({ x: newX, y: newY });
        setNoClickCount(prev => prev + 1);
    };

    return (
        <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-[#8b0000] flex flex-col items-center justify-center p-8 text-center font-outfit select-none isolate">

            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#b22222_0%,#8b0000_70%,#4a0000_100%)]" />

            {/* Glowing Orbs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-rose-500/10 blur-[150px] rounded-full animate-pulse" />
            </div>

            <div className="relative z-10 w-full max-w-5xl space-y-24">

                {/* Visual Label */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-4 bg-white/10 px-10 py-4 rounded-full border border-white/20 shadow-lg backdrop-blur-md mx-auto"
                >
                    <Heart size={20} className="text-white fill-current animate-pulse" />
                    <span className="text-white font-black uppercase tracking-[0.6em] text-[10px]">Decision of My Lifetime</span>
                </motion.div>

                {/* THE QUESTION */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-9xl font-black text-white font-romantic leading-tight drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                >
                    {defaultData.question}
                </motion.h2>

                {/* INTERACTIVE ACTIONS */}
                <div className="relative w-full h-[300px] flex items-center justify-center gap-12">

                    {/* YES BUTTON (Masive & Gowing) */}
                    <div className="relative z-20 group">
                        <div className="absolute -inset-10 bg-rose-500 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />

                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleYes}
                            className="relative px-20 py-10 bg-white text-rose-900 rounded-[3rem] shadow-[0_20px_80px_rgba(255,255,255,0.4)] border-4 border-white/50 flex items-center justify-center gap-6 overflow-hidden transition-all group-active:scale-95"
                        >
                            <Heart size={32} fill="currentColor" className="text-rose-600" />
                            <span className="font-black text-2xl md:text-4xl uppercase tracking-[0.2em]">{defaultData.yesText}</span>
                            <Heart size={32} fill="currentColor" className="text-rose-600" />
                        </motion.button>
                    </div>

                    {/* NO BUTTON (Moving & Glitching) */}
                    <motion.div
                        animate={{ x: noButtonPosition.x, y: noButtonPosition.y }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="relative z-10"
                    >
                        <button
                            onMouseEnter={handleNoMove}
                            onClick={handleNoMove}
                            className="px-10 py-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl text-white/40 font-black text-xs uppercase tracking-[0.4em] hover:text-white transition-all shadow-xl flex items-center gap-4 cursor-none"
                        >
                            <AlertCircle size={16} className="opacity-40" />
                            {currentNoText}
                        </button>
                    </motion.div>
                </div>

                <div className="flex flex-col items-center gap-4 opacity-30 pt-20">
                    <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Choose Wisely</span>
                    <div className="h-[2px] w-40 bg-white/20" />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />
        </div>
    );
};

export default Page2Game;
