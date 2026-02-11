import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, ChevronRight, Heart } from 'lucide-react';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';
import RealisticHeart from '../RealisticHeart';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page8SecretMessage: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isScratching, setIsScratching] = useState(false);
    const [isProceeding, setIsProceeding] = useState(false);
    const [showReflection, setShowReflection] = useState(false);

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const secretMessage = data.secretMessage || "No matter where life takes us, my heart will always find its way back to you. You are my home.";

    const handleProceed = () => {
        setIsProceeding(true);
        setTimeout(onNext, 1000);
    };

    return (
        <div className="min-h-screen v3-theme-pink flex items-center justify-center p-4 md:p-12 relative overflow-hidden font-romantic px-4">
            <V3Background />

            <div className={`relative z-10 w-full max-w-4xl text-center transition-all duration-1000 ${isProceeding ? 'opacity-0 scale-75 blur-3xl' : 'opacity-100 scale-100 blur-0 rotate-0'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-16"
                >
                    <div className="inline-flex items-center gap-4 bg-pink-500/5 border border-pink-500/10 px-6 py-2 md:px-8 md:py-3 rounded-full mb-8 md:mb-10 shadow-inner backdrop-blur-sm">
                        <Lock className="w-5 h-5 md:w-6 md:h-6 text-pink-600/60 animate-pulse" />
                        <V3EditableField
                            value={data.chapterLabel || "chapter vii • the confidential"}
                            onUpdate={(v) => safeUpdate('chapterLabel', v)}
                            isEditing={!!isEditing}
                            label="Chapter"
                        >
                            <span className="text-[11px] md:text-[12px] text-pink-600/60 font-black italic tracking-[0.4em]">
                                {data.chapterLabel || "chapter vii • the confidential"}
                            </span>
                        </V3EditableField>
                    </div>
                    <h2 className="text-4xl md:text-7xl lg:text-9xl font-black text-[#4a041a] tracking-tight leading-[0.9] mb-4 md:mb-8 italic">
                        <V3EditableField
                            value={data.titleLine1 || "A Secret"}
                            onUpdate={(v) => safeUpdate('titleLine1', v)}
                            isEditing={!!isEditing}
                        >
                            {data.titleLine1 || "A Secret"}
                        </V3EditableField>
                        <br />
                        <V3EditableField
                            value={data.titleLine2 || "For You"}
                            onUpdate={(v) => safeUpdate('titleLine2', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="v3-gradient-text block mt-2 md:mt-4">{data.titleLine2 || "For You"}</span>
                        </V3EditableField>
                    </h2>
                    <div className="text-pink-900/40 text-[10px] md:text-[11px] font-black tracking-[0.6em] italic animate-pulse mt-8 md:mt-12">
                        <V3EditableField
                            value={data.instruction || "pressure the card to find the truth"}
                            onUpdate={(v) => safeUpdate('instruction', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="group-hover:text-pink-600 transition-colors duration-500 lowercase">
                                {data.instruction || "pressure the card to find the truth"}
                            </span>
                        </V3EditableField>
                    </div>
                </motion.div>

                {/* The Scratch-off Card */}
                <div className="relative aspect-video w-full max-w-3xl mx-auto group">
                    <AnimatePresence mode="wait">
                        {(!isRevealed || isEditing) ? (
                            <motion.div
                                key="locked"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                                onClick={() => {
                                    if (isEditing) return;
                                    setIsScratching(true);
                                    setTimeout(() => setIsRevealed(true), 1500);
                                }}
                                className="w-full h-full v3-glass-card bg-white/60 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem] border-white/60 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden shadow-xl hover:bg-white/70 transition-all duration-700"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-rose-500/5 pointer-events-none" />

                                <motion.div
                                    animate={isScratching ? {
                                        scale: [1, 1.02, 0.98, 1],
                                        rotate: [0, 1, -1, 0]
                                    } : {}}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="relative z-10 flex flex-col items-center"
                                >
                                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] md:rounded-[3.5rem] bg-white/40 border-2 border-pink-100 flex items-center justify-center mb-6 md:mb-8 shadow-sm group-hover:border-pink-300 transition-all duration-700">
                                        <RealisticHeart size={typeof window !== 'undefined' && window.innerWidth < 768 ? "120px" : "180px"} />
                                    </div>
                                    <V3EditableField
                                        value={data.cardLabel || "encrypted connection"}
                                        onUpdate={(v) => safeUpdate('cardLabel', v)}
                                        isEditing={!!isEditing}
                                        label="Label"
                                    >
                                        <span className="text-pink-600/30 text-[10px] md:text-[11px] font-black lowercase tracking-[0.4em] italic">{data.cardLabel || "encrypted connection"}</span>
                                    </V3EditableField>
                                </motion.div>

                                {isScratching && (
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5, ease: "easeInOut" }}
                                        className="absolute bottom-0 left-0 h-2 bg-gradient-to-r from-pink-300/40 via-pink-400/40 to-rose-400/40"
                                    />
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="revealed"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", bounce: 0.3 }}
                                className="w-full h-full v3-glass-card bg-white/90 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem] border-white/80 p-8 md:p-20 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl"
                            >
                                <motion.div
                                    onContextMenu={(e: React.MouseEvent) => {
                                        e.preventDefault();
                                        setShowReflection(!showReflection);
                                    }}
                                    onClick={() => setShowReflection(!showReflection)}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="mb-8 p-4 bg-pink-50/50 rounded-full cursor-help relative"
                                >
                                    <Unlock className="w-10 h-10 md:w-12 md:h-12 text-pink-400" />
                                    <AnimatePresence>
                                        {showReflection && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-xl p-3 rounded-xl shadow-lg border border-pink-50 z-50 pointer-events-none"
                                            >
                                                <p className="text-pink-800 font-romantic italic text-[11px] text-center normal-case">
                                                    "This truth has always lived within me."
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>

                                <V3EditableField
                                    value={secretMessage}
                                    onUpdate={(v) => safeUpdate('secretMessage', v)}
                                    isEditing={!!isEditing}
                                    type="textarea"
                                    label="Msg"
                                >
                                    <p className="text-[#4a041a] text-xl md:text-3xl font-romantic leading-relaxed text-center italic font-black tracking-tight drop-shadow-sm">
                                        "{secretMessage}"
                                    </p>
                                </V3EditableField>

                                <div className="absolute bottom-8 right-8 opacity-10">
                                    <Sparkles className="w-8 h-8 text-pink-400 animate-spin-slow" />
                                </div>

                                <div className="absolute top-8 left-8 opacity-5">
                                    <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {(isRevealed || isEditing) && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="mt-16 md:mt-24"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleProceed}
                                className="group relative inline-flex items-center gap-4 px-12 py-6 md:px-14 md:py-7 bg-gradient-to-r from-[#ff4d94] to-[#ff1a75] text-white font-black text-[12px] md:text-[13px] tracking-widest rounded-[2rem] shadow-xl overflow-hidden border-2 border-white/20"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                <span className="relative z-10 flex items-center gap-3 italic font-romantic">
                                    <V3EditableField
                                        value={data.nextButtonText || "view the gallery"}
                                        onUpdate={(v) => safeUpdate('nextButtonText', v)}
                                        isEditing={!!isEditing}
                                        label="Btn Name"
                                    >
                                        {data.nextButtonText || "view the gallery"}
                                    </V3EditableField>
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Page8SecretMessage;
