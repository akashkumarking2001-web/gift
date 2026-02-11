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

const Page12InteractiveProposal: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isProceeding, setIsProceeding] = useState(false);
    const [showKiss, setShowKiss] = useState(false);

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const recipientName = data.recipientName || "My Love";
    const question = data.question || `${recipientName}, do you like me?`;

    const handleSelect = (option: string) => {
        if (isEditing) return;
        setSelectedOption(option);

        if (option === 'yes') {
            setShowKiss(true);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff4d94', '#ff1a75', '#ff99cc']
            });
            setTimeout(() => setShowKiss(false), 2000);
        }
    };

    const handleProceed = () => {
        setIsProceeding(true);
        setTimeout(onNext, 1000);
    };

    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
    const dodge = () => {
        if (isEditing) return;
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        setNoBtnPos({ x, y });
    };

    return (
        <div className="min-h-screen v3-theme-pink flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-romantic px-4">
            <V3Background />

            {/* Kiss Animation Overlay */}
            <AnimatePresence>
                {showKiss && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 2, y: -100 }}
                        exit={{ opacity: 0, scale: 3, y: -200 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none text-8xl"
                    >
                        💋
                    </motion.div>
                )}
            </AnimatePresence>

            <div className={`relative z-10 w-full max-w-4xl transition-all duration-1000 ${isProceeding ? 'scale-110 opacity-0 blur-2xl' : 'scale-100 opacity-100'}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="v3-glass-card p-8 md:p-20 relative border-white/60 shadow-[0_50px_100px_-20px_rgba(255,77,148,0.2)] bg-white/80 rounded-[3rem] md:rounded-[4rem] text-center"
                >
                    <div className="flex items-center justify-center gap-4 mb-10">
                        <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
                        <V3EditableField
                            value={data.chapterLabel || "a digital confession • chapter xii"}
                            onUpdate={(v) => safeUpdate('chapterLabel', v)}
                            isEditing={!!isEditing}
                            label="Chapter"
                        >
                            <span className="text-[12px] text-pink-600/60 font-black italic tracking-[0.4em]">
                                {data.chapterLabel || "a digital confession • chapter xii"}
                            </span>
                        </V3EditableField>
                        <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#4a041a] leading-[1.1] tracking-tight mb-12 italic">
                        <V3EditableField
                            value={data.recipientName || "My Love"}
                            onUpdate={(v) => safeUpdate('recipientName', v)}
                            isEditing={!!isEditing}
                            label="Recipient Name"
                        >
                            <span className="v3-gradient-text">{data.recipientName || "My Love"}</span>
                        </V3EditableField>
                        , <br />
                        <V3EditableField
                            value={data.question || "do you like me?"}
                            onUpdate={(v) => safeUpdate('question', v)}
                            isEditing={!!isEditing}
                            label="The Question"
                        >
                            {data.question || "do you like me?"}
                        </V3EditableField>
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative min-h-[100px]">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleSelect('yes')}
                            className="px-12 py-5 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-black rounded-full shadow-2xl border-4 border-white/20 tracking-widest italic"
                        >
                            {data.yesText || "I LOVE YOU!"}
                        </motion.button>

                        <motion.button
                            animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                            onHoverStart={dodge}
                            onClick={dodge}
                            className="px-12 py-5 bg-white/50 text-[#4a041a] font-black rounded-full shadow-lg border-2 border-white/80 tracking-widest italic backdrop-blur-md"
                        >
                            {data.noText || "Wait..."}
                        </motion.button>
                    </div>

                    <AnimatePresence>
                        {selectedOption === 'yes' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-16 space-y-8"
                            >
                                <div className="text-2xl md:text-3xl font-black text-pink-600 italic tracking-tight">
                                    <V3EditableField
                                        value={data.successText || "Great choice! Now proceed to the next page"}
                                        onUpdate={(v) => safeUpdate('successText', v)}
                                        isEditing={!!isEditing}
                                        label="Success Message"
                                    >
                                        "Great choice! Now proceed to the next page"
                                    </V3EditableField>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleProceed}
                                    className="group relative px-10 py-5 bg-[#4a041a] text-white font-black text-[12px] tracking-widest rounded-full shadow-xl overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                    <span className="relative z-10 flex items-center gap-3">
                                        STEP DEEPER <ChevronRight className="w-4 h-4" />
                                    </span>
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Page12InteractiveProposal;
