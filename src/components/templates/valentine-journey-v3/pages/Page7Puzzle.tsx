import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, AlertCircle, ChevronRight, Lock } from 'lucide-react';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';
import RealisticHeart from '../RealisticHeart';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page7Puzzle: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [completedPieces, setCompletedPieces] = useState<number[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [isProceeding, setIsProceeding] = useState(false);
    const [showUnityWhisper, setShowUnityWhisper] = useState(false);

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const puzzleData = data.puzzle || {
        pieces: [
            { id: 1, label: 'L' },
            { id: 2, label: 'O' },
            { id: 3, label: 'V' },
            { id: 4, label: 'E' }
        ]
    };

    const handlePieceClick = (id: number) => {
        if (completedPieces.includes(id) || isFinished || isEditing) return;

        const nextPieces = [...completedPieces, id];
        setCompletedPieces(nextPieces);

        if (nextPieces.length === 4) {
            setTimeout(() => setIsFinished(true), 800);
        }
    };

    const handlePieceLabelUpdate = (index: number, newLabel: string) => {
        const newPieces = [...puzzleData.pieces];
        newPieces[index] = { ...newPieces[index], label: newLabel };
        safeUpdate('puzzle', { ...puzzleData, pieces: newPieces });
    };

    const handleProceed = () => {
        setIsProceeding(true);
        setTimeout(onNext, 1000);
    };

    return (
        <div className="min-h-screen v3-theme-pink flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden font-romantic px-4">
            <V3Background />

            <div className={`relative z-10 w-full max-w-4xl text-center transition-all duration-1000 ${isProceeding ? 'opacity-0 scale-150 blur-3xl' : 'opacity-100 scale-100 blur-0 rotate-0'}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 md:mb-20"
                >
                    <div
                        onClick={() => setShowUnityWhisper(!showUnityWhisper)}
                        className="inline-flex items-center gap-4 bg-pink-500/5 border border-pink-500/10 px-6 py-2 md:px-8 md:py-3 rounded-full mb-8 md:mb-10 shadow-inner backdrop-blur-sm cursor-help relative"
                    >
                        <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-pink-600/60 animate-pulse" />
                        <V3EditableField
                            value={data.chapterLabel || "chapter vi • the challenge"}
                            onUpdate={(v) => safeUpdate('chapterLabel', v)}
                            isEditing={!!isEditing}
                            label="Chapter"
                        >
                            <span className="text-[11px] md:text-[12px] text-pink-600/60 font-black italic tracking-[0.4em]">
                                {data.chapterLabel || "chapter vi • the challenge"}
                            </span>
                        </V3EditableField>

                        <AnimatePresence>
                            {showUnityWhisper && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 bg-white/90 backdrop-blur-xl p-3 rounded-xl shadow-lg border border-pink-50 z-50 pointer-events-none"
                                >
                                    <p className="text-pink-800 font-romantic italic text-[11px] text-center">
                                        "Every fragment of us belongs together."
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <h2 className="text-4xl md:text-7xl lg:text-9xl font-black text-[#4a041a] tracking-tight leading-[0.9] mb-4 md:mb-8 italic">
                        <V3EditableField
                            value={data.titleLine1 || "Heal My"}
                            onUpdate={(v) => safeUpdate('titleLine1', v)}
                            isEditing={!!isEditing}
                        >
                            {data.titleLine1 || "Heal My"}
                        </V3EditableField>
                        <br />
                        <V3EditableField
                            value={data.titleLine2 || "Heart"}
                            onUpdate={(v) => safeUpdate('titleLine2', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="v3-gradient-text block mt-2 md:mt-4">{data.titleLine2 || "Heart"}</span>
                        </V3EditableField>
                    </h2>
                    <div className="text-pink-900/40 text-[10px] md:text-[11px] font-black tracking-[0.6em] italic animate-pulse mt-8 md:mt-12">
                        <V3EditableField
                            value={data.instruction || "pressure the pieces to mend the connection"}
                            onUpdate={(v) => safeUpdate('instruction', v)}
                            isEditing={!!isEditing}
                        >
                            {data.instruction || "pressure the pieces to mend the connection"}
                        </V3EditableField>
                    </div>
                </motion.div>

                {/* The Puzzle Area */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
                    <AnimatePresence mode="wait">
                        {(!isFinished || isEditing) && (
                            <motion.div
                                initial={{ opacity: 0, rotate: -5 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
                                className="grid grid-cols-2 gap-4 md:gap-6 w-full h-full p-2 md:p-4"
                            >
                                {puzzleData.pieces.map((piece: any, index: number) => {
                                    const isActive = completedPieces.includes(piece.id) || isEditing;
                                    return (
                                        <motion.div
                                            key={piece.id}
                                            layoutId={`piece-${piece.id}`}
                                            onClick={() => handlePieceClick(piece.id)}
                                            whileHover={{ scale: isActive ? 1 : 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`relative aspect-square backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] border-2 transition-all duration-700 flex items-center justify-center group cursor-pointer shadow-lg ${isActive
                                                ? 'bg-gradient-to-br from-pink-500 to-rose-600 border-white/40 shadow-2xl z-20'
                                                : 'bg-white/40 border-white/60 hover:border-pink-200 hover:bg-white/60 shadow-sm'
                                                }`}
                                        >
                                            <V3EditableField
                                                value={piece.label}
                                                onUpdate={(v) => handlePieceLabelUpdate(index, v)}
                                                isEditing={!!isEditing}
                                                label={`P${index + 1}`}
                                            >
                                                <span className={`text-4xl md:text-6xl font-black italic transition-all duration-700 ${isActive ? 'text-white' : 'text-pink-600/10 group-hover:text-pink-600/20'}`}>
                                                    {piece.label}
                                                </span>
                                            </V3EditableField>

                                            <AnimatePresence>
                                                {!isActive && (
                                                    <motion.div
                                                        exit={{ opacity: 0, scale: 1.5 }}
                                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Lock className="w-5 h-5 md:w-6 md:h-6 text-pink-500/10" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Healed Heart Result */}
                    <AnimatePresence>
                        {isFinished && !isEditing && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", bounce: 0.4, duration: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-pink-500 blur-[80px] md:blur-[100px] rounded-full animate-pulse opacity-40" />
                                    <div className="relative z-10 flex items-center justify-center filter drop-shadow-2xl">
                                        <RealisticHeart size={typeof window !== 'undefined' && window.innerWidth < 768 ? "200px" : "300px"} />
                                    </div>

                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-black text-xl md:text-3xl tracking-[0.4em] flex items-center gap-4 z-20 italic">
                                        <V3EditableField
                                            value={data.completedLabel || "healed"}
                                            onUpdate={(v) => safeUpdate('completedLabel', v)}
                                            isEditing={!!isEditing}
                                            label="Seal"
                                        >
                                            <span className="drop-shadow-lg">{data.completedLabel || "healed"}</span>
                                        </V3EditableField>
                                    </div>
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="mt-12 md:mt-20 w-full"
                                >
                                    <V3EditableField
                                        value={data.successMessage || "connection restored • 100% signal"}
                                        onUpdate={(v) => safeUpdate('successMessage', v)}
                                        isEditing={!!isEditing}
                                        label="Success Msg"
                                    >
                                        <p className="text-[#4a041a] font-black text-xl md:text-3xl mb-8 md:mb-12 tracking-tight italic">
                                            {data.successMessage || "connection restored • 100% signal"}
                                        </p>
                                    </V3EditableField>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleProceed}
                                        className="group relative inline-flex items-center gap-4 px-10 py-5 md:px-14 md:py-7 bg-gradient-to-r from-[#ff4d94] to-[#ff1a75] text-white font-black text-[12px] md:text-[13px] tracking-widest rounded-[2rem] shadow-xl overflow-hidden border-2 border-white/20"
                                    >
                                        <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                        <span className="relative z-10 flex items-center gap-3 italic">
                                            <V3EditableField
                                                value={data.unlockButtonText || "unlock secrets"}
                                                onUpdate={(v) => safeUpdate('unlockButtonText', v)}
                                                isEditing={!!isEditing}
                                                label="Btn Name"
                                            >
                                                {data.unlockButtonText || "unlock secrets"}
                                            </V3EditableField>
                                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Page7Puzzle;
