import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Share2, RotateCcw, Heart, Sparkles, Star, ShieldCheck, Zap, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Page5FinalProps {
    data: {
        mainHeading?: string;
        characterImage?: string;
        loveMessage?: string;
        signature?: string;
        shareButtonText?: string;
        backButtonText?: string;
    };
    onBack?: () => void;
    onShare?: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page5Final = ({ data, onBack, onShare, isEditing = false, onUpdate }: Page5FinalProps) => {

    const defaultData = {
        mainHeading: data.mainHeading || "Happy Valentine's Day!",
        characterImage: data.characterImage || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=60",
        loveMessage: data.loveMessage || "Every moment with you feels like a beautiful dream. You make my heart skip a beat and my world a lot brighter. Thank you for being the most incredible person in my life. I love you more than words can say!",
        signature: data.signature || "Yours Forever",
        shareButtonText: data.shareButtonText || "Share My Love",
        backButtonText: data.backButtonText || "Back to Start"
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
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#e11d48', '#fb7185', '#ffffff'] });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#e11d48', '#fb7185', '#ffffff'] });
            }, 250);

            return () => clearInterval(interval);
        }
    }, [isEditing]);

    const handleShare = () => {
        if (onShare) {
            onShare();
        } else {
            if (navigator.share) {
                navigator.share({
                    title: 'Happy Valentine\'s Day!',
                    text: 'I made something special for you! 💖',
                    url: window.location.href
                });
            }
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0202] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* Final Cinematic Gilded Aura */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.15),transparent_70%)]"
                />

                {/* Floating Gilded Dust */}
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -200, 0],
                            opacity: [0, 0.6, 0],
                            scale: [0.5, 1.5, 0.5]
                        }}
                        transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
                    />
                ))}

                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-20">

                {/* Visual Conclusion Anchor */}
                <div className="text-center space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-rose-900/10 backdrop-blur-3xl px-12 py-3.5 rounded-full border border-rose-800/20 shadow-2xl mx-auto"
                    >
                        <ShieldCheck size={16} className="text-rose-500" />
                        <span className="text-rose-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Registry Terminated // Final Statement</span>
                        <Zap size={16} className="text-rose-500 fill-current animate-pulse" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, type: 'spring' }}
                        className="text-5xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-rose-500 to-rose-100 drop-shadow-2xl font-romantic leading-tight"
                    >
                        {defaultData.mainHeading}
                    </motion.h1>
                </div>

                {/* THE ULTIMATE MANIFESTO: High-Fidelity Glass Unit */}
                <div className="w-full max-w-5xl flex flex-col items-center gap-16 relative">

                    {/* Character Asset Unit (Small Inset Polaroid) */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative z-20 -mb-28 group"
                    >
                        <div className="relative w-48 h-48 md:w-64 md:h-64 bg-white rounded-3xl p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/20 rotate-6 group-hover:rotate-0 transition-transform duration-700 isolate overflow-hidden">
                            <img
                                src={defaultData.characterImage}
                                alt="Final Character"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-6 -right-6 text-6xl drop-shadow-2xl"
                        >
                            ❤️
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full bg-[#1a0505]/60 backdrop-blur-3xl rounded-[4rem] p-16 md:p-32 border border-rose-500/20 shadow-[0_50px_150px_-30px_rgba(0,0,0,0.9)] isolate overflow-hidden"
                    >
                        {/* Decorative Wax Seal Component */}
                        <div className="absolute top-12 right-12 w-28 h-28 rounded-full bg-gradient-to-br from-rose-600 to-rose-700 p-1 shadow-2xl shadow-rose-600/40 rotate-12 flex items-center justify-center isolate">
                            <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                                <Heart size={40} fill="white" className="text-white opacity-80" />
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="relative z-10 flex flex-col items-start gap-16">

                            <div className="flex items-center gap-6 w-full">
                                <div className="flex items-center gap-3 bg-rose-900/20 backdrop-blur-xl px-8 py-2 rounded-full border border-rose-800/30">
                                    <Mail size={14} className="text-rose-400" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-rose-100/60 font-outfit">Absolute Submission</span>
                                </div>
                                <div className="flex-1 h-[1px] bg-gradient-to-r from-rose-900/40 to-transparent" />
                            </div>

                            <div className="space-y-12">
                                <p className="text-white text-2xl md:text-5xl font-romantic leading-[1.6] italic opacity-90 tracking-wide drop-shadow-sm">
                                    "{defaultData.loveMessage}"
                                </p>
                            </div>

                            <div className="w-full flex flex-col items-end gap-6 pt-16 border-t border-rose-900/20">
                                <div className="flex items-center gap-4 text-rose-500">
                                    <Zap size={14} className="fill-current animate-pulse" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.8em] opacity-40 font-outfit">Authorized Signature</span>
                                </div>
                                <h4 className="text-5xl md:text-7xl text-white font-romantic drop-shadow-[0_0_20px_rgba(225,29,72,0.4)]">
                                    {defaultData.signature}
                                </h4>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Professional Tactical Actions */}
                <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center gap-12 pb-40">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <motion.button
                            onClick={handleShare}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-20 py-8 bg-[#0d0508] border-2 border-rose-900/30 rounded-[3rem] text-rose-500 font-black text-[10px] uppercase tracking-[0.8em] shadow-2xl flex items-center gap-6 isolate overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-rose-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                            <span className="relative z-10">{defaultData.shareButtonText}</span>
                            <Share2 size={16} className="relative z-10 group-hover:rotate-12 transition-transform" />
                        </motion.button>

                        <motion.button
                            onClick={onBack}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-16 py-8 bg-white text-[#0a0202] font-black text-[10px] uppercase tracking-[0.8em] rounded-[3rem] shadow-2xl flex items-center gap-6"
                        >
                            {defaultData.backButtonText}
                            <RotateCcw size={16} className="group-hover:-rotate-180 transition-transform duration-700" />
                        </motion.button>
                    </div>

                    <div className="flex items-center gap-4 opacity-10">
                        <div className="h-[1px] w-40 bg-white" />
                        <span className="text-[8px] font-black tracking-[1em] uppercase text-white">Registry: Closed</span>
                        <div className="h-[1px] w-40 bg-white" />
                    </div>
                </div>

            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-2 opacity-10 font-outfit">
                <div className="h-[1px] w-48 bg-rose-700" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1em]">ID: FINAL-EXPEDITION</span>
            </div>

        </div>
    );
};

export default Page5Final;
