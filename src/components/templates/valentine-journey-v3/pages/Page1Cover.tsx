import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, Heart } from 'lucide-react';
import V3Background from '../V3Background';
import RealisticHeart from '../RealisticHeart';
import V3EditableField from '../V3EditableField';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page1Cover: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [holdProgress, setHoldProgress] = useState(0);
    const [isExploding, setIsExploding] = useState(false);
    const [showPoem, setShowPoem] = useState(false);

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const handleHold = () => {
        if (isEditing) return;
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            setHoldProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setIsExploding(true);
                setTimeout(onNext, 1000);
            }
        }, 50);

        const clear = () => {
            clearInterval(interval);
            if (progress < 100) setHoldProgress(0);
        };

        window.addEventListener('mouseup', clear, { once: true });
        window.addEventListener('touchend', clear, { once: true });
    };

    return (
        <div className="min-h-screen relative overflow-hidden v3-theme-pink flex items-center justify-center p-4 md:p-8">
            <V3Background />

            {/* Explosion Effect */}
            <AnimatePresence>
                {isExploding && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] bg-white flex items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 50, opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="w-20 h-20 bg-pink-500 rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`relative z-10 text-center w-full max-w-4xl mx-auto transition-all duration-1000 ${isExploding ? 'scale-150 opacity-0 blur-2xl' : 'scale-100 opacity-100'}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-8 md:mb-16 relative flex justify-center"
                >
                    {/* Realistic Beating Heart */}
                    <div className="relative cursor-pointer scale-75 md:scale-100" onMouseDown={handleHold} onTouchStart={handleHold}>
                        <div className="absolute inset-0 bg-pink-400/20 blur-[60px] md:blur-[80px] rounded-full animate-pulse" />
                        <RealisticHeart size="180px" className="relative z-20 hover:scale-105 transition-transform md:w-[220px] md:h-[220px]" />

                        {/* Progress Ring */}
                        <svg className="absolute inset-[-15px] md:inset-[-20px] w-[210px] h-[210px] md:w-[260px] md:h-[260px] -rotate-90 z-10">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                stroke="rgba(255, 77, 148, 0.1)"
                                strokeWidth="3"
                                fill="transparent"
                            />
                            <motion.circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                stroke="#ff4d94"
                                strokeWidth="5"
                                fill="transparent"
                                strokeDasharray="600"
                                animate={{ strokeDashoffset: 600 - (600 * holdProgress) / 100 }}
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                    className="v3-glass-card p-8 md:p-20 border-white/60 shadow-[0_40px_80px_-20px_rgba(255,77,148,0.15)] rounded-[3rem] md:rounded-[4rem]"
                >
                    <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#ff4d94] animate-spin-slow" />
                        <V3EditableField
                            value={data.badgeText || "Flagship 8k experience"}
                            onUpdate={(v) => safeUpdate('badgeText', v)}
                            isEditing={!!isEditing}
                            label="Badge"
                        >
                            <span className="text-pink-600 tracking-[0.4em] text-[10px] md:text-[12px] font-black italic">
                                {data.badgeText || "Flagship 8k experience"}
                            </span>
                        </V3EditableField>
                        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#ff4d94] animate-spin-slow" />
                    </div>

                    <h1 className="text-4xl md:text-7xl lg:text-8xl font-black text-[#4a041a] mb-6 md:mb-8 tracking-tighter leading-[0.9] italic font-romantic">
                        <V3EditableField
                            value={data.titleLine1 || "Pure"}
                            onUpdate={(v) => safeUpdate('titleLine1', v)}
                            isEditing={!!isEditing}
                        >
                            {data.titleLine1 || "Pure"}
                        </V3EditableField>
                        <br />
                        <V3EditableField
                            value={data.titleLine2 || "Elegance"}
                            onUpdate={(v) => safeUpdate('titleLine2', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="v3-gradient-text block mt-2">{data.titleLine2 || "Elegance"}</span>
                        </V3EditableField>
                    </h1>

                    <div className="text-[#4a041a]/60 text-base md:text-xl lg:text-2xl mb-10 md:mb-14 max-w-lg mx-auto font-medium leading-relaxed italic font-romantic px-4">
                        <V3EditableField
                            value={data.description || `"A digital sanctuary crafted for the most beautiful soul."`}
                            onUpdate={(v) => safeUpdate('description', v)}
                            isEditing={!!isEditing}
                            type="textarea"
                            label="Description"
                        >
                            "{data.description || `A digital sanctuary crafted for the most beautiful soul.`}"
                        </V3EditableField>
                    </div>

                    <div className="space-y-6">
                        <motion.p
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-pink-400 text-[11px] font-black tracking-widest"
                        >
                            {isEditing ? "Editing mode" : "Gently pressure the heart to enter"}
                        </motion.p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onNext}
                            className="group relative px-10 py-5 md:px-14 md:py-6 bg-gradient-to-r from-[#ff4d94] to-[#ff1a75] text-white font-black text-[13px] tracking-widest overflow-hidden rounded-[2rem] shadow-xl border-2 md:border-4 border-white/20"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                            <span className="relative z-10 flex items-center justify-center gap-3 italic font-romantic">
                                <V3EditableField
                                    value={data.buttonText || "Open my heart"}
                                    onUpdate={(v) => safeUpdate('buttonText', v)}
                                    isEditing={!!isEditing}
                                    label="Button"
                                >
                                    {data.buttonText || "Open my heart"}
                                </V3EditableField>
                                <Heart className="w-4 h-4 md:w-5 md:h-5 fill-white" />
                            </span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Whispering Footer - Hidden Poem Surprise */}
            <div
                onClick={() => setShowPoem(!showPoem)}
                className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-pink-400/40 text-[10px] md:text-[11px] font-black tracking-[0.3em] whitespace-nowrap italic cursor-pointer group flex flex-col items-center"
            >
                <div className="group-hover:text-pink-500 transition-colors">
                    {data.footerText || "v3 flagship edition • immersive romance"}
                </div>
                <AnimatePresence>
                    {showPoem && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="mt-3 text-pink-600/60 font-romantic text-[12px] md:text-sm text-center max-w-[200px] md:max-w-xs px-4"
                        >
                            "Where there is love, there is life... and where you are, there is my heart."
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Page1Cover;
