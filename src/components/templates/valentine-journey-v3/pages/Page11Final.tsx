import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Share2, RefreshCw, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';
import RealisticHeart from '../RealisticHeart';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page11Final: React.FC<PageProps> = ({ data, isEditing, onUpdate }) => {
    const [hasExploded, setHasExploded] = useState(false);
    const [showFinalWhisper, setShowFinalWhisper] = useState(false);

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const handleFinalClick = () => {
        if (hasExploded || isEditing) return;
        setHasExploded(true);

        const duration = 10 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 0, gravity: 0.5, colors: ['#ff4d94', '#ff1a75', '#ff99cc', '#ffffff'] };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 100 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 300);
    };

    return (
        <div className="min-h-screen v3-theme-pink flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden font-romantic px-4">
            <V3Background />

            <div className="relative z-10 w-full max-w-6xl text-center">
                {(!hasExploded || isEditing) ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="flex flex-col items-center cursor-pointer group"
                        onClick={handleFinalClick}
                    >
                        <div className="mb-12 md:mb-16">
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFinalWhisper(!showFinalWhisper);
                                }}
                                className="inline-flex items-center gap-4 bg-pink-500/5 border border-pink-500/10 px-6 py-2 md:px-8 md:py-3 rounded-full mb-8 md:mb-10 shadow-inner backdrop-blur-sm cursor-help relative"
                            >
                                <V3EditableField
                                    value={data.chapterLabel || "the grand revelation"}
                                    onUpdate={(v) => safeUpdate('chapterLabel', v)}
                                    isEditing={!!isEditing}
                                    label="Chapter"
                                >
                                    <span className="text-pink-600/60 text-[11px] md:text-[12px] uppercase tracking-[0.4em] font-black block italic animate-pulse lowercase">
                                        {data.chapterLabel || "the grand revelation"}
                                    </span>
                                </V3EditableField>

                                <AnimatePresence>
                                    {showFinalWhisper && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-56 bg-white/90 backdrop-blur-xl p-3 rounded-xl shadow-lg border border-pink-50 z-50 pointer-events-none"
                                        >
                                            <p className="text-pink-800 font-romantic italic text-[11px] text-center normal-case">
                                                "Our story is my favorite masterpiece."
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <h2 className="text-4xl md:text-7xl lg:text-9xl font-black text-[#4a041a] tracking-tight leading-[0.9] mb-8 md:mb-16 italic lowercase">
                                <V3EditableField
                                    value={data.titleLine || "touch my"}
                                    onUpdate={(v) => safeUpdate('titleLine', v)}
                                    isEditing={!!isEditing}
                                >
                                    {data.titleLine || "touch my"}
                                </V3EditableField>
                                <br />
                                <span className="v3-gradient-text block mt-2 md:mt-6">core</span>
                            </h2>
                        </div>

                        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                            <RealisticHeart size={typeof window !== 'undefined' && window.innerWidth < 768 ? "200px" : "300px"} className="group-hover:scale-105 transition-transform duration-1000" />

                            {[1.2, 1.6].map((s, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ scale: [1, s], opacity: [0.3, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, delay: i * 1.5 }}
                                    className="absolute inset-0 border border-pink-300 rounded-full blur-[2px]"
                                />
                            ))}
                        </div>

                        <div className="mt-16 md:mt-24">
                            <V3EditableField
                                value={data.instruction || "one final beat"}
                                onUpdate={(v) => safeUpdate('instruction', v)}
                                isEditing={!!isEditing}
                            >
                                <p className="text-pink-900/30 text-[10px] md:text-[11px] font-black italic lowercase tracking-[0.6em] group-hover:text-pink-600 transition-all duration-700">
                                    {data.instruction || "one final beat"}
                                </p>
                            </V3EditableField>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="mb-12 md:mb-16 relative w-full px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="relative z-10"
                            >
                                <V3EditableField
                                    value={data.finalTitle || "i love you"}
                                    onUpdate={(v) => safeUpdate('finalTitle', v)}
                                    isEditing={!!isEditing}
                                    label="Title"
                                >
                                    <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-black text-[#4a041a] tracking-tight leading-[0.8] mb-8 md:mb-12 v3-gradient-text lowercase italic">
                                        {data.finalTitle || "i love you"}
                                    </h1>
                                </V3EditableField>
                            </motion.div>
                        </div>

                        <V3EditableField
                            value={data.finalMessage || "And just like that, the universe makes sense. You are the destination of every journey I've ever taken."}
                            onUpdate={(v) => safeUpdate('finalMessage', v)}
                            isEditing={!!isEditing}
                            type="textarea"
                            label="Msg"
                        >
                            <p className="text-[#4a041a] text-xl md:text-4xl max-w-4xl mx-auto font-romantic italic mb-12 md:mb-20 leading-relaxed font-black tracking-tight drop-shadow-sm normal-case">
                                "{data.finalMessage || "And just like that, the universe makes sense. You are the destination of every journey I've ever taken."}"
                            </p>
                        </V3EditableField>

                        <V3EditableField
                            value={data.signature || "Forever Yours"}
                            onUpdate={(v) => safeUpdate('signature', v)}
                            isEditing={!!isEditing}
                            label="Sign"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mb-16 md:mb-32 relative"
                            >
                                <div className="inline-flex flex-col items-center">
                                    <span className="text-pink-500/30 text-[10px] md:text-[11px] font-black block mb-4 italic lowercase tracking-widest">authenticated by</span>
                                    <div className="text-[#4a041a] font-handwriting text-5xl md:text-7xl -rotate-3 filter drop-shadow-sm normal-case">
                                        {data.signature || "Forever Yours"}
                                    </div>
                                    <div className="w-24 h-1 bg-pink-500/5 rounded-full mt-4 blur-sm" />
                                </div>
                            </motion.div>
                        </V3EditableField>

                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.reload()}
                                className="group relative px-10 py-5 md:px-14 md:py-7 v3-glass-card border-white/40 shadow-lg rounded-[2rem] text-[#4a041a] font-black text-[12px] lowercase tracking-widest transition-all flex items-center gap-4"
                            >
                                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-1000 text-pink-500/60" />
                                <span className="italic">replay story</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative px-12 py-6 md:px-16 md:py-8 bg-gradient-to-r from-[#ff4d94] to-[#ff1a75] text-white rounded-[2rem] font-black text-[12px] lowercase tracking-widest shadow-xl transition-all flex items-center gap-4 border-2 border-white/20"
                            >
                                <Share2 className="w-5 h-5" />
                                <span className="italic">share our joy</span>
                                <div className="absolute inset-0 bg-white/10 translate-x-full hover:translate-x-0 transition-transform duration-500" />
                            </motion.button>
                        </div>

                        <div className="mt-12 md:mt-20 opacity-10">
                            <Star className="w-8 h-8 text-pink-500 animate-spin-slow" />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Page11Final;
