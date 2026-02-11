import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, Sparkles, ChevronRight, Heart, Star, Info } from 'lucide-react';
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

const Page4LoveQuiz: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [isProceeding, setIsProceeding] = useState(false);
    const [showSecret, setShowSecret] = useState(false);

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const quiz = data.quiz || {
        question: "Where did we first realize it was more than just friendship?",
        options: [
            "That rainy evening at the cafe",
            "During the long drive to the beach",
            "While watching the stars at the park",
            "The first time we cooked together"
        ],
        correctAnswer: "While watching the stars at the park"
    };

    const handleSelect = (index: number) => {
        if (showResult || isEditing) return;
        setSelectedOption(index);
        setShowResult(true);

        if (quiz.options[index] === quiz.correctAnswer) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff4d94', '#ff1a75', '#ff99cc']
            });
        }
    };

    const handleOptionUpdate = (index: number, newValue: string) => {
        const newOptions = [...quiz.options];
        newOptions[index] = newValue;
        safeUpdate('quiz', { ...quiz, options: newOptions });
    };

    const handleProceed = () => {
        setIsProceeding(true);
        setTimeout(onNext, 1000);
    };

    return (
        <div className="min-h-screen v3-theme-pink flex items-center justify-center p-4 md:p-8 relative overflow-hidden font-romantic px-4">
            <V3Background />

            {/* Emotional Bloom Overlay */}
            <AnimatePresence>
                {showResult && selectedOption !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`fixed inset-0 pointer-events-none z-0 transition-colors duration-1000 ${quiz.options[selectedOption] === quiz.correctAnswer ? 'bg-green-500/5 backdrop-blur-[1px]' : 'bg-rose-500/5 backdrop-blur-[1px]'}`}
                    />
                )}
            </AnimatePresence>

            <div className={`relative z-10 w-full max-w-4xl transition-all duration-1000 ${isProceeding ? 'scale-110 opacity-0 blur-2xl rotate-1' : 'scale-100 opacity-100 blur-0'}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="v3-glass-card p-6 md:p-16 lg:p-20 relative border-white/60 shadow-[0_50px_100px_-20px_rgba(255,77,148,0.2)] bg-white/80 rounded-[3rem] md:rounded-[4rem]"
                >
                    {/* Floating Heart - Secret Trigger */}
                    <motion.div
                        id="heart-surprise-trigger"
                        onClick={() => setShowSecret(!showSecret)}
                        animate={{
                            y: [0, -10, 0],
                            rotate: [5, -5, 5]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#ff4d94] to-[#ff1a75] rounded-[2rem] md:rounded-[2.5rem] flex items-center justify-center shadow-xl z-30 border-2 md:border-4 border-white cursor-pointer group"
                    >
                        <RealisticHeart size="45px" />
                    </motion.div>

                    {/* Hidden Message */}
                    <AnimatePresence>
                        {showSecret && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                className="absolute top-16 md:top-20 right-0 z-40 w-56 md:w-64 bg-white/95 backdrop-blur-xl border border-pink-50 p-6 rounded-[2rem] shadow-2xl"
                            >
                                <p className="text-pink-900 font-romantic italic text-base leading-relaxed">
                                    "I hid this here just for you. Every beat of my heart whispers your name..."
                                </p>
                                <div className="mt-4 flex justify-end">
                                    <Heart className="text-pink-500 fill-pink-500 w-4 h-4 animate-pulse" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="mb-10 md:mb-14">
                        <div className="flex items-center gap-4 mb-6 md:mb-8">
                            <Sparkles className="w-5 h-5 text-pink-500 animate-spin-slow" />
                            <V3EditableField
                                value={data.chapterLabel || "interactive trivia • chapter three"}
                                onUpdate={(v) => safeUpdate('chapterLabel', v)}
                                isEditing={!!isEditing}
                                label="Chapter"
                            >
                                <span className="text-[11px] md:text-[12px] text-pink-600/60 font-black italic tracking-[0.3em]">
                                    {data.chapterLabel || "interactive trivia • chapter three"}
                                </span>
                            </V3EditableField>
                        </div>
                        <h2 className="text-3xl md:text-6xl lg:text-7xl font-black text-[#4a041a] leading-[1] tracking-tight mb-4 md:mb-6 italic">
                            <V3EditableField
                                value={data.titleLine1 || "Our secret"}
                                onUpdate={(v) => safeUpdate('titleLine1', v)}
                                isEditing={!!isEditing}
                            >
                                {data.titleLine1 || "Our secret"}
                            </V3EditableField>
                            <br />
                            <V3EditableField
                                value={data.titleLine2 || "Synchronicity"}
                                onUpdate={(v) => safeUpdate('titleLine2', v)}
                                isEditing={!!isEditing}
                            >
                                <span className="v3-gradient-text block mt-1 md:mt-2">{data.titleLine2 || "Synchronicity"}</span>
                            </V3EditableField>
                        </h2>
                    </div>

                    <div className="text-xl md:text-3xl lg:text-4xl text-[#4a041a]/90 font-black mb-10 md:mb-14 leading-tight italic font-romantic tracking-tight px-2">
                        <V3EditableField
                            value={quiz.question}
                            onUpdate={(v) => safeUpdate('quiz', { ...quiz, question: v })}
                            isEditing={!!isEditing}
                            type="textarea"
                            label="Question"
                        >
                            "{quiz.question}"
                        </V3EditableField>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {quiz.options.map((option: string, index: number) => {
                            const isCorrect = option === quiz.correctAnswer;
                            const isSelected = selectedOption === index;

                            let bgColor = "bg-white/45 border-white/60 hover:bg-white/80 hover:border-pink-200";
                            let textColor = "text-[#4a041a]";

                            if (showResult && !isEditing) {
                                if (isCorrect) {
                                    bgColor = "bg-green-50/50 backdrop-blur-xl border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.15)] scale-[1.02] z-10";
                                    textColor = "text-green-900";
                                } else if (isSelected && !isCorrect) {
                                    bgColor = "bg-rose-50/50 border-rose-300 opacity-80";
                                    textColor = "text-rose-900";
                                } else {
                                    bgColor = "opacity-25 blur-[1px]";
                                }
                            }

                            return (
                                <motion.div
                                    key={index}
                                    onClick={() => handleSelect(index)}
                                    whileHover={(!showResult && !isEditing) ? { y: -5, scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.9)" } : {}}
                                    className={`w-full p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] border transition-all duration-500 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden ${bgColor}`}
                                >
                                    <V3EditableField
                                        value={option}
                                        onUpdate={(v) => handleOptionUpdate(index, v)}
                                        isEditing={!!isEditing}
                                        label={`Option ${index + 1}`}
                                        className="w-full"
                                    >
                                        <span className={`text-base md:text-lg lg:text-xl font-black tracking-tight italic ${textColor}`}>
                                            {option}
                                        </span>
                                    </V3EditableField>

                                    {isEditing && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                safeUpdate('quiz', { ...quiz, correctAnswer: option });
                                            }}
                                            className={`mt-4 p-2 md:p-3 rounded-xl transition-all ${quiz.correctAnswer === option ? 'bg-green-500 text-white' : 'bg-pink-50 text-pink-300'}`}
                                        >
                                            <CheckCircle2 className="w-5 h-5" />
                                        </button>
                                    )}

                                    {showResult && !isEditing && isSelected && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="mt-4"
                                        >
                                            {isCorrect ? (
                                                <div className="flex items-center gap-2 text-green-600 font-black text-sm italic">
                                                    <CheckCircle2 className="w-6 h-6" />
                                                    <span>yes!</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2 text-rose-600 font-black text-sm italic">
                                                    <XCircle className="w-6 h-6" />
                                                    <span>oh no...</span>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>

                    <AnimatePresence>
                        {(showResult || isEditing) && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-pink-100/50 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10"
                            >
                                <div className="text-center md:text-left flex-1 space-y-3">
                                    <div className={`font-black text-xl md:text-3xl italic leading-tight tracking-tight ${selectedOption !== null && quiz.options[selectedOption] === quiz.correctAnswer ? 'text-green-800' : 'text-rose-800'}`}>
                                        <V3EditableField
                                            value={data.successMessage || "your heart is truly in sync!"}
                                            onUpdate={(v) => safeUpdate('successMessage', v)}
                                            isEditing={!!isEditing}
                                            label="Success Msg"
                                        >
                                            {selectedOption !== null && quiz.options[selectedOption] === quiz.correctAnswer
                                                ? (<span>"Yes! You remembered!" <Sparkles className="inline w-6 h-6 ml-2" /></span>)
                                                : (<span>"Oh no, that's not it... but I still love you!" <Heart className="inline w-6 h-6 ml-2 text-rose-300" /></span>)
                                            }
                                        </V3EditableField>
                                    </div>
                                    <p className="text-pink-600/30 text-[10px] md:text-[11px] font-black italic tracking-widest">
                                        <V3EditableField
                                            value={data.footerText || "the journey continues"}
                                            onUpdate={(v) => safeUpdate('footerText', v)}
                                            isEditing={!!isEditing}
                                            label="Footer"
                                        >
                                            {data.footerText || "the journey continues"}
                                        </V3EditableField>
                                    </p>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleProceed}
                                    className="group relative px-10 py-5 md:px-14 md:py-6 bg-gradient-to-r from-[#ff4d94] to-[#ff1a75] text-white font-black text-[12px] md:text-[13px] tracking-widest rounded-[2rem] shadow-xl overflow-hidden border-2 border-white/20"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                    <span className="relative z-10 italic flex items-center gap-3">
                                        <V3EditableField
                                            value={data.nextButtonText || "take my hand"}
                                            onUpdate={(v) => safeUpdate('nextButtonText', v)}
                                            isEditing={!!isEditing}
                                            label="Btn"
                                        >
                                            {data.nextButtonText || "take my hand"}
                                        </V3EditableField>
                                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-10 md:mt-14 text-center opacity-5">
                    <Star className="w-16 h-16 md:w-20 md:h-20 text-pink-500 fill-pink-500 rotate-12" />
                </div>
            </div>
        </div>
    );
};

export default Page4LoveQuiz;
