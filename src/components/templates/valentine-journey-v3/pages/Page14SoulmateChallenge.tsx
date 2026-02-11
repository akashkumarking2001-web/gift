import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, Star } from 'lucide-react';
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

const Page14SoulmateChallenge: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [selectedHeart, setSelectedHeart] = useState<number | null>(null);
    const [isProceeding, setIsProceeding] = useState(false);
    const [showLovePopup, setShowLovePopup] = useState(false);

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const recipientName = data.recipientName || "Soulmate";
    const question = data.question || `${recipientName}, will you be mine?`;

    const handleHeartClick = (index: number) => {
        if (isEditing) return;
        setSelectedHeart(index);

        // Let's say heart at index 1 is the "right" one or they all are "right" but heart 1 is special
        setShowLovePopup(true);
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff0000', '#ff4d94', '#ffffff']
        });
        setTimeout(() => setShowLovePopup(false), 2500);
    };

    const handleProceed = () => {
        setIsProceeding(true);
        setTimeout(onNext, 1000);
    };

    return (
        <div className="min-h-screen v3-theme-pink flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-romantic px-4 text-center">
            <V3Background />

            {/* Love Pop-up Overlay */}
            <AnimatePresence>
                {showLovePopup && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        exit={{ opacity: 0, scale: 2, y: -50 }}
                        className="fixed inset-0 z-[100] flex flex-col items-center justify-center pointer-events-none"
                    >
                        <div className="bg-white/90 backdrop-blur-2xl p-8 rounded-[3rem] shadow-[0_0_100px_rgba(255,77,148,0.5)] border-4 border-pink-500 text-pink-600 font-romantic font-black text-4xl md:text-6xl italic">
                            I Love You! ❤️
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`relative z-10 w-full max-w-5xl transition-all duration-1000 ${isProceeding ? 'opacity-0 blur-3xl' : 'opacity-100'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2 }}
                    className="v3-glass-card p-10 md:p-24 border-white shadow-2xl bg-white/70 rounded-[4rem] relative overflow-hidden"
                >
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-pink-500/10 blur-[100px] rounded-full animate-pulse" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-rose-500/10 blur-[100px] rounded-full animate-pulse" />

                    <div className="inline-flex items-center gap-3 mb-10 text-pink-500/60 font-black tracking-[0.5em] text-[11px] uppercase italic">
                        <Star className="w-4 h-4 fill-pink-500" />
                        the soulmate challenge • chapter xiv
                        <Star className="w-4 h-4 fill-pink-500" />
                    </div>

                    <h2 className="text-4xl md:text-7xl font-black text-[#4a041a] leading-tight mb-16 italic tracking-tighter">
                        <V3EditableField
                            value={data.recipientName || "Soulmate"}
                            onUpdate={(v) => safeUpdate('recipientName', v)}
                            isEditing={!!isEditing}
                            label="Name"
                        >
                            <span className="v3-gradient-text underline decoration-pink-200 decoration-dotted">{data.recipientName || "Soulmate"}</span>
                        </V3EditableField>
                        , <br />
                        <V3EditableField
                            value={data.question || "will you be mine?"}
                            onUpdate={(v) => safeUpdate('question', v)}
                            isEditing={!!isEditing}
                            label="Question"
                        >
                            {data.question || "will you be mine?"}
                        </V3EditableField>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.1, y: -10 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleHeartClick(i)}
                                className={`flex flex-col items-center gap-6 cursor-pointer p-8 rounded-[2.5rem] transition-all duration-500 ${selectedHeart === i ? 'bg-pink-500/10 ring-4 ring-pink-500 shadow-2xl scale-110' : 'bg-white/40 border border-white/60 hover:bg-white/90'}`}
                            >
                                <RealisticHeart size="100px" />
                                <span className="text-[#4a041a] font-black italic tracking-widest text-sm uppercase">Pick Me</span>
                            </motion.div>
                        ))}
                    </div>

                    <AnimatePresence>
                        {selectedHeart !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-20 flex flex-col items-center gap-8"
                            >
                                <p className="text-3xl font-black text-pink-600 italic">"Correct! Forever in sync."</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleProceed}
                                    className="px-14 py-6 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black rounded-full shadow-2xl border-4 border-white/30 tracking-[0.2em] italic"
                                >
                                    CONTINUE THE MAGIC
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Page14SoulmateChallenge;
