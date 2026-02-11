import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, Star } from 'lucide-react';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';
import RealisticHeart from '../RealisticHeart';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page5Reasons: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [revealedIndices, setRevealedIndices] = useState<number[]>([]);
    const [isProceeding, setIsProceeding] = useState(false);
    const [showWhisper, setShowWhisper] = useState(false);

    const reasons = data.reasons || [
        "Your kindness makes the world brighter",
        "The way you look at me in the morning",
        "Your unwavering support in everything",
        "How you make every day feel like an adventure",
        "Simply because you are YOU"
    ];

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const toggleReveal = (index: number) => {
        if (!revealedIndices.includes(index)) {
            setRevealedIndices([...revealedIndices, index]);
        }
    };

    const handleReasonUpdate = (index: number, newValue: string) => {
        const newReasons = [...reasons];
        newReasons[index] = newValue;
        safeUpdate('reasons', newReasons);
    };

    const handleProceed = () => {
        setIsProceeding(true);
        setTimeout(onNext, 1000);
    };

    return (
        <div className="min-h-screen v3-theme-pink flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden font-romantic px-4">
            <V3Background />

            <div className={`relative z-10 w-full max-w-7xl transition-all duration-1000 ${isProceeding ? 'opacity-0 scale-125 blur-3xl rotate-1' : 'opacity-100 scale-100 blur-0 rotate-0'}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center gap-4 bg-pink-500/5 border border-pink-500/10 px-6 py-2 md:px-10 md:py-3 rounded-full mb-8 md:mb-10 shadow-inner backdrop-blur-sm">
                        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-pink-500 animate-pulse" />
                        <V3EditableField
                            value={data.chapterLabel || "chapter iv • the essentials"}
                            onUpdate={(v) => safeUpdate('chapterLabel', v)}
                            isEditing={!!isEditing}
                            label="Chapter"
                        >
                            <span className="text-[11px] md:text-[12px] text-pink-600/60 font-black italic tracking-[0.4em]">
                                {data.chapterLabel || "chapter iv • the essentials"}
                            </span>
                        </V3EditableField>
                    </div>
                    <h2 className="text-4xl md:text-7xl lg:text-[9rem] font-black text-[#4a041a] tracking-tight leading-[0.9] mb-4 md:mb-8 italic">
                        <V3EditableField
                            value={data.titleLine1 || "Reasons I"}
                            onUpdate={(v) => safeUpdate('titleLine1', v)}
                            isEditing={!!isEditing}
                        >
                            {data.titleLine1 || "Reasons I"}
                        </V3EditableField>
                        <br />
                        <V3EditableField
                            value={data.titleLine2 || "Adore You"}
                            onUpdate={(v) => safeUpdate('titleLine2', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="v3-gradient-text block mt-2 md:mt-4">{data.titleLine2 || "Adore You"}</span>
                        </V3EditableField>
                    </h2>
                    <div className="text-pink-900/40 text-[10px] md:text-[11px] font-black tracking-[0.6em] italic animate-pulse mt-10 md:mt-16 group">
                        <V3EditableField
                            value={data.instruction || "pressure each heartbeat to remember"}
                            onUpdate={(v) => safeUpdate('instruction', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="group-hover:text-pink-600 transition-colors duration-500">
                                {data.instruction || "pressure each heartbeat to remember"}
                            </span>
                        </V3EditableField>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 auto-rows-fr max-w-7xl mx-auto mb-20">
                    {reasons.map((reason: string, i: number) => {
                        const isRevealed = revealedIndices.includes(i) || isEditing;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer relative"
                                onClick={() => toggleReveal(i)}
                            >
                                <div className={`h-full p-8 md:p-12 rounded-[3.5rem] border-2 backdrop-blur-3xl transition-all duration-700 flex flex-col items-center justify-center text-center gap-8 overflow-hidden min-h-[300px] md:min-h-[360px] shadow-lg ${isRevealed
                                    ? 'bg-white/85 border-white ring-8 ring-pink-500/5 rotate-0 scale-100'
                                    : 'bg-white/55 border-white/60 hover:bg-white/90 hover:border-pink-200 hover:-translate-y-4 hover:rotate-2 shadow-sm'
                                    }`}>

                                    <motion.div
                                        animate={isRevealed ? { scale: [1, 1.05, 1] } : {}}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                        className="relative z-10"
                                    >
                                        <div className={`transition-all duration-700 ${isRevealed ? 'opacity-100' : 'opacity-30 grayscale-[0.4]'}`}>
                                            <RealisticHeart size={typeof window !== 'undefined' && window.innerWidth < 768 ? "60px" : "80px"} />
                                        </div>
                                    </motion.div>

                                    <div className="flex-1 flex items-center justify-center w-full z-10">
                                        <AnimatePresence mode="wait">
                                            {isRevealed ? (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    transition={{ duration: 0.8 }}
                                                    className="w-full"
                                                >
                                                    <V3EditableField
                                                        value={reason}
                                                        onUpdate={(v) => handleReasonUpdate(i, v)}
                                                        isEditing={!!isEditing}
                                                        type="textarea"
                                                        label={`Reason ${i + 1}`}
                                                    >
                                                        <p className="text-[#4a041a] text-xl md:text-2xl font-romantic font-black italic tracking-tight leading-relaxed">
                                                            "{reason}"
                                                        </p>
                                                    </V3EditableField>
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="w-16 h-[4px] bg-gradient-to-r from-transparent via-pink-400/20 to-transparent rounded-full"
                                                />
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className={`absolute -bottom-8 -right-8 text-8xl md:text-9xl font-black text-[#4a041a]/[0.02] italic transition-all duration-700 select-none ${isRevealed ? 'opacity-5 translate-y-0 scale-110' : 'opacity-0 translate-y-12'}`}>
                                        {i + 1}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <AnimatePresence>
                    {(revealedIndices.length >= reasons.length || isEditing) && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="mt-12 md:mt-24 text-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleProceed}
                                className="group relative inline-flex items-center gap-6 px-12 py-6 md:px-16 md:py-8 bg-gradient-to-r from-[#ff4d94] to-[#ff1a75] text-white font-black text-[12px] md:text-[13px] tracking-widest rounded-[2rem] shadow-xl overflow-hidden border-2 border-white/20"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                <span className="relative z-10 flex items-center gap-4 italic font-black">
                                    <V3EditableField
                                        value={data.nextButtonText || "continue journey"}
                                        onUpdate={(v) => safeUpdate('nextButtonText', v)}
                                        isEditing={!!isEditing}
                                        label="Btn Name"
                                    >
                                        {data.nextButtonText || "continue journey"}
                                    </V3EditableField>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Hidden Whisper Surprise */}
            <div
                onClick={() => setShowWhisper(!showWhisper)}
                className="absolute bottom-4 left-4 md:bottom-10 md:left-10 text-[20vh] md:text-[30vh] font-black text-[#4a041a]/[0.02] hover:text-[#4a041a]/[0.05] transition-colors cursor-help select-none italic tracking-tighter leading-none"
            >
                {data.bgNumber || "05"}
                <AnimatePresence>
                    {showWhisper && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="absolute bottom-[20%] left-[80%] w-48 md:w-64 text-sm md:text-base text-pink-700/60 font-romantic italic normal-case tracking-tight bg-white/40 p-4 md:p-6 rounded-2xl md:rounded-3xl backdrop-blur-xl border border-white/20 shadow-2xl z-50 overflow-visible"
                        >
                            "You are the beautiful reason behind every smile that escapes my lips today."
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute top-[8%] right-[8%] opacity-[0.03] pointer-events-none select-none">
                <Star className="w-40 h-40 md:w-64 md:h-64 text-[#4a041a]" />
            </div>
        </div>
    );
};

export default Page5Reasons;
