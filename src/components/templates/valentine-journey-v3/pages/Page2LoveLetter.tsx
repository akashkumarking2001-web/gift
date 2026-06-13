import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';
import { Heart, Sparkles, MessageCircleHeart } from 'lucide-react';
import RealisticHeart from '../RealisticHeart';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page2LoveLetter: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [isSealed, setIsSealed] = useState(false);
    const [showWhisper, setShowWhisper] = useState(false);

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const handleSealClick = () => {
        if (isEditing) return;
        setIsSealed(true);
        setTimeout(onNext, 1200);
    };

    return (
        <div className="min-h-screen v3-theme-pink flex items-center justify-center p-4 md:p-12 lg:p-16 overflow-hidden relative font-romantic">
            <V3Background />

            {/* Letter Transition Overlay */}
            <AnimatePresence>
                {isSealed && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="fixed inset-0 z-50 bg-pink-500/10 backdrop-blur-2xl flex items-center justify-center pointer-events-none"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 40 }}
                            transition={{ duration: 1.5, ease: "easeIn" }}
                            className="w-12 h-12 bg-white rounded-full blur-[3px]"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                initial={{ y: 60, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative w-full max-w-5xl"
            >
                {/* The Glass Manuscript */}
                <div className="v3-glass-card min-h-[80vh] md:min-h-[85vh] p-8 md:p-20 relative overflow-hidden flex flex-col justify-between border-white/60 shadow-[0_60px_120px_-30px_rgba(255,182,193,0.35)] bg-white/75 rounded-[3.5rem] md:rounded-[5rem]">
                    {/* Inner Aesthetics */}
                    <div className="absolute -top-32 -left-32 w-80 h-80 bg-pink-500/10 blur-[90px] rounded-full pointer-events-none animate-pulse" />
                    <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-rose-500/10 blur-[90px] rounded-full pointer-events-none animate-pulse" />

                    {/* Hidden Whisper Trigger */}
                    <motion.div
                        onClick={() => setShowWhisper(!showWhisper)}
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="absolute top-8 right-8 cursor-pointer z-30"
                    >
                        <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-pink-300 opacity-40 animate-spin-slow" />
                        <AnimatePresence>
                            {showWhisper && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="absolute top-0 right-12 w-48 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-pink-50"
                                >
                                    <p className="text-pink-900 font-romantic italic text-sm">
                                        "A secret whisper for you: my love for you grows with every breath I take."
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mb-12 md:mb-16"
                        >
                            <V3EditableField
                                value={data.chapterTitle || "a private manuscript"}
                                onUpdate={(v) => safeUpdate('chapterTitle', v)}
                                isEditing={!!isEditing}
                                label="Chapter"
                            >
                                <span className="text-pink-600 text-[13px] md:text-[14px] tracking-[0.4em] font-bold block mb-4 italic uppercase">
                                    {data.chapterTitle || "a private manuscript"}
                                </span>
                            </V3EditableField>
                            <div className="h-[3px] w-24 bg-gradient-to-r from-pink-500/50 to-transparent rounded-full" />
                        </motion.div>

                        <div className="space-y-10 md:space-y-14 text-[#4a041a] leading-tight px-2">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="font-romantic text-5xl md:text-7xl lg:text-8xl font-bold italic text-[#4a041a] tracking-tight"
                            >
                                Dear <V3EditableField
                                    value={data.coupleName || 'love'}
                                    onUpdate={(v) => safeUpdate('coupleName', v)}
                                    isEditing={!!isEditing}
                                    label="Name"
                                />,
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5, duration: 1.5 }}
                                className="font-handwriting text-3xl md:text-4xl lg:text-5xl leading-[1.3] text-[#4a041a] max-w-4xl"
                            >
                                <V3EditableField
                                    value={data.description || "Every moment spent with you feels like a page from a storybook I never want to close. Your smile is the light that guides me through the darkest nights, and your laughter is the melody my heart beats to."}
                                    onUpdate={(v) => safeUpdate('description', v)}
                                    isEditing={!!isEditing}
                                    type="textarea"
                                    label="Letter"
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 3, duration: 1.5 }}
                                className="text-xl md:text-3xl text-pink-900 font-romantic italic leading-relaxed max-w-3xl font-bold tracking-tight"
                            >
                                <V3EditableField
                                    value={data.subText || "This isn't just a collection of pixels on a screen. It's a journey through the universe we've built together—one heartbeat at a time."}
                                    onUpdate={(v) => safeUpdate('subText', v)}
                                    isEditing={!!isEditing}
                                    type="textarea"
                                    label="Subtext"
                                />
                            </motion.div>
                        </div>
                    </div>

                    <div className="mt-16 md:mt-20 flex flex-col md:flex-row items-center justify-between gap-10">
                        {/* Immersive Wax Seal */}
                        <div className="relative group">
                            <motion.div
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", delay: 4.5, stiffness: 80, damping: 12 }}
                                onClick={handleSealClick}
                                className={`w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#ff4d94] to-[#ff1a75] shadow-[0_30px_60px_rgba(255,77,148,0.4)] flex items-center justify-center cursor-pointer relative overflow-hidden transition-all duration-1000 border-4 border-white ${isSealed ? 'scale-[30] rotate-[720deg] opacity-0 blur-3xl' : 'hover:scale-105 hover:rotate-3'}`}
                            >
                                <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                                <div className={`transition-all duration-700 ${isSealed ? 'scale-0' : 'scale-90 group-hover:scale-110'}`}>
                                    <RealisticHeart size="70px" />
                                </div>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 5.5 }}
                                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-max text-[13px] text-pink-600 font-bold tracking-[0.3em] italic uppercase"
                            >
                                {isEditing ? "editing" : "tap the pulse"}
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 4 }}
                            className="text-center md:text-right"
                        >
                            <p className="text-[#ff4d94] font-handwriting text-5xl md:text-6xl lg:text-7xl mb-4 drop-shadow-sm -rotate-2">
                                <V3EditableField
                                    value={data.closingText || "forever yours,"}
                                    onUpdate={(v) => safeUpdate('closingText', v)}
                                    isEditing={!!isEditing}
                                    label="Closing"
                                />
                            </p>
                            <p className="text-[#4a041a] font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight italic font-romantic v3-gradient-text">
                                <V3EditableField
                                    value={data.signature || "your love"}
                                    onUpdate={(v) => safeUpdate('signature', v)}
                                    isEditing={!!isEditing}
                                    label="Signature"
                                />
                            </p>
                        </motion.div>
                    </div>

                    {isEditing && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onNext}
                            className="absolute top-6 left-1/2 -translate-x-1/2 md:top-10 md:right-10 md:left-auto md:translate-x-0 px-8 py-3 bg-pink-500 text-white rounded-xl text-[11px] font-black tracking-wider z-50 border-2 border-white/20 shadow-xl"
                        >
                            Preview journey
                        </motion.button>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Page2LoveLetter;
