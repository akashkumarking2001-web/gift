import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, ChevronRight } from 'lucide-react';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';
import RealisticHeart from '../RealisticHeart';
import confetti from 'canvas-confetti';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page16UniversalConnection: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [isThinking, setIsThinking] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isProceeding, setIsProceeding] = useState(false);

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const recipientName = data.recipientName || "Love";
    const question = data.question || `${recipientName}, are we meant to be?`;

    const handleConfirm = () => {
        if (isEditing) return;
        setIsThinking(true);
        setTimeout(() => {
            setIsThinking(false);
            setIsConfirmed(true);
            confetti({
                particleCount: 200,
                spread: 120,
                origin: { y: 0.6 },
                colors: ['#ff4d94', '#ff1a75', '#ff99cc', '#4a041a']
            });
        }, 2000);
    };

    return (
        <div className="min-h-screen v3-theme-pink flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-romantic px-4 text-center">
            <V3Background />

            {/* Kiss Animation Overlay */}
            <AnimatePresence>
                {isConfirmed && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 2.5 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none text-9xl"
                    >
                        💋✨
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`relative z-10 w-full max-w-4xl transition-all duration-1000 ${isProceeding ? 'opacity-0 scale-125 blur-3xl' : 'opacity-100'}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="v3-glass-card p-12 md:p-24 border-white shadow-2xl bg-white/70 rounded-[4rem] relative overflow-hidden"
                >
                    <div className="mb-12">
                        <Star className="w-12 h-12 text-pink-500 mx-auto animate-spin-slow mb-6" />
                        <V3EditableField
                            value={data.chapterLabel || "universal connection • chapter xvi"}
                            onUpdate={(v) => safeUpdate('chapterLabel', v)}
                            isEditing={!!isEditing}
                            label="Chapter"
                        >
                            <span className="text-[12px] text-pink-600/60 font-black tracking-[0.6em] italic uppercase">universal connection • chapter xvi</span>
                        </V3EditableField>
                    </div>

                    <h2 className="text-4xl md:text-7xl font-black text-[#4a041a] leading-tight mb-16 italic tracking-tighter">
                        <V3EditableField
                            value={data.recipientName || "Love"}
                            onUpdate={(v) => safeUpdate('recipientName', v)}
                            isEditing={!!isEditing}
                            label="Name"
                        >
                            <span className="v3-gradient-text">{data.recipientName || "Love"}</span>
                        </V3EditableField>
                        , <br />
                        <V3EditableField
                            value={data.question || "are we meant to be?"}
                            onUpdate={(v) => safeUpdate('question', v)}
                            isEditing={!!isEditing}
                            label="Final Question"
                        >
                            {data.question || "are we meant to be?"}
                        </V3EditableField>
                    </h2>

                    <div className="relative h-32 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            {!isConfirmed ? (
                                <motion.button
                                    key="confirm-btn"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    onClick={handleConfirm}
                                    disabled={isThinking}
                                    className="px-16 py-7 bg-[#4a041a] text-white font-black rounded-full shadow-2xl tracking-[0.4em] italic text-sm hover:scale-105 transition-transform relative overflow-hidden"
                                >
                                    {isThinking ? (
                                        <motion.span
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                        >
                                            CALCULATING DESTINY...
                                        </motion.span>
                                    ) : (
                                        "REVEAL OUR FATE"
                                    )}
                                </motion.button>
                            ) : (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-8"
                                >
                                    <p className="text-4xl font-black text-pink-600 italic">"YES! INFINITELY."</p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setIsProceeding(true);
                                            setTimeout(onNext, 1000);
                                        }}
                                        className="px-12 py-5 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black rounded-full shadow-2xl border-4 border-white/20 tracking-widest italic"
                                    >
                                        SEAL THE JOURNEY <ChevronRight className="w-5 h-5 inline ml-2" />
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="mt-16 flex justify-center gap-6 opacity-20">
                        <Heart className="w-8 h-8 fill-[#4a041a]" />
                        <Star className="w-8 h-8 fill-[#4a041a]" />
                        <Heart className="w-8 h-8 fill-[#4a041a]" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Page16UniversalConnection;
