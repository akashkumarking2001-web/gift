import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Page4MessageCardsProps {
    data: {
        card1Heading?: string;
        card1Body?: string;
        card2MainText?: string;
        card2Subtext?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4MessageCards = ({ data, onNext, isEditing = false, onUpdate }: Page4MessageCardsProps) => {
    const [step, setStep] = useState(0);

    const defaultData = {
        card1Heading: data.card1Heading || "Special day!",
        card1Body: data.card1Body || "Every moment spent with you is a moment I treasure forever. You bring so much joy into my life.",
        card2MainText: data.card2MainText || "I remember everything",
        card2Subtext: data.card2Subtext || "The laughs, the talks, the moments..."
    };

    const handleNext = () => {
        if (step === 0) setStep(1);
        else onNext();
    };

    return (
        <div
            onClick={!isEditing ? handleNext : undefined}
            className="min-h-screen relative overflow-hidden bg-[#0a0a12] flex flex-col items-center justify-center p-6 md:p-12 cursor-pointer"
        >
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-pink-600/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full" />

            <div className="relative z-10 w-full max-w-2xl h-[500px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {step === 0 ? (
                        <motion.div
                            key="card1"
                            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 1.2, rotate: 5, y: -50 }}
                            className="w-full bg-gradient-to-br from-orange-400 to-pink-600 p-10 md:p-16 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(236,72,153,0.4)] border border-white/20 relative group"
                        >
                            <div
                                className={`mb-8 relative group/h ${isEditing ? 'cursor-pointer hover:bg-black/10 px-4 py-2 rounded-xl transition-all' : ''}`}
                                onDoubleClick={(e) => {
                                    if (isEditing) {
                                        e.stopPropagation();
                                        const val = prompt("Edit Card 1 Heading:", defaultData.card1Heading);
                                        if (val !== null) onUpdate?.('card1Heading', val);
                                    }
                                }}
                            >
                                <h3 className="text-4xl md:text-6xl font-black text-white italic font-romantic tracking-tight drop-shadow-lg">
                                    {defaultData.card1Heading}
                                </h3>
                                {isEditing && (
                                    <div className="absolute -top-6 left-0 opacity-0 group-hover/h:opacity-100 transition-opacity whitespace-nowrap">
                                        <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click Title</span>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`relative group/b ${isEditing ? 'cursor-pointer hover:bg-black/10 px-4 py-2 rounded-xl transition-all' : ''}`}
                                onDoubleClick={(e) => {
                                    if (isEditing) {
                                        e.stopPropagation();
                                        const val = prompt("Edit Card 1 Body:", defaultData.card1Body);
                                        if (val !== null) onUpdate?.('card1Body', val);
                                    }
                                }}
                            >
                                <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed font-lovely opacity-90">
                                    {defaultData.card1Body}
                                </p>
                                {isEditing && (
                                    <div className="absolute -top-6 left-0 opacity-0 group-hover/b:opacity-100 transition-opacity whitespace-nowrap">
                                        <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click Body</span>
                                    </div>
                                )}
                            </div>

                            {/* Decorative Dots */}
                            <div className="absolute bottom-10 right-10 flex gap-2">
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }} className="w-3 h-3 bg-white rounded-full" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="w-3 h-3 bg-white rounded-full" />
                                <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }} className="w-3 h-3 bg-white rounded-full" />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="card2"
                            initial={{ opacity: 0, scale: 0.8, rotate: 5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotate: -5 }}
                            className="w-full bg-[#1a1a1a]/80 backdrop-blur-2xl p-10 md:p-16 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/5 relative group"
                        >
                            <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mb-10 shadow-lg shadow-pink-600/30">
                                <span className="text-white text-3xl">❤️</span>
                            </div>

                            <div
                                className={`mb-6 relative group/h2 ${isEditing ? 'cursor-pointer hover:bg-white/5 px-4 py-2 rounded-xl transition-all' : ''}`}
                                onDoubleClick={(e) => {
                                    if (isEditing) {
                                        e.stopPropagation();
                                        const val = prompt("Edit Card 2 Heading:", defaultData.card2MainText);
                                        if (val !== null) onUpdate?.('card2MainText', val);
                                    }
                                }}
                            >
                                <h3 className="text-4xl md:text-5xl font-black text-white font-lovely tracking-tight">
                                    {defaultData.card2MainText}
                                </h3>
                                {isEditing && (
                                    <div className="absolute -top-6 left-0 opacity-0 group-hover/h2:opacity-100 transition-opacity whitespace-nowrap">
                                        <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click Title</span>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`relative group/b2 ${isEditing ? 'cursor-pointer hover:bg-white/5 px-4 py-2 rounded-xl transition-all' : ''}`}
                                onDoubleClick={(e) => {
                                    if (isEditing) {
                                        e.stopPropagation();
                                        const val = prompt("Edit Card 2 Subtext:", defaultData.card2Subtext);
                                        if (val !== null) onUpdate?.('card2Subtext', val);
                                    }
                                }}
                            >
                                <p className="text-xl md:text-2xl text-pink-500/80 font-medium italic font-romantic">
                                    {defaultData.card2Subtext}
                                </p>
                                {isEditing && (
                                    <div className="absolute -top-6 left-0 opacity-0 group-hover/b2:opacity-100 transition-opacity whitespace-nowrap">
                                        <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click Subtext</span>
                                    </div>
                                )}
                            </div>

                            {/* Typing Indicator Animation */}
                            <div className="mt-12 flex gap-1.5 items-center">
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Thought loading</span>
                                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} className="w-1 h-1 bg-pink-500 rounded-full" />
                                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 bg-pink-500 rounded-full" />
                                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 bg-pink-500 rounded-full" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Instruction Footer */}
            {!isEditing && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12 text-white/30 text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-4"
                >
                    Tap Anywhere to {step === 0 ? "Read More" : "Continue"}
                    <span className="inline-block animate-bounce">↓</span>
                </motion.p>
            )}

            {/* Editing Toggle for Editor */}
            {isEditing && (
                <div className="mt-12 flex gap-4">
                    <button
                        onClick={() => setStep(0)}
                        className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${step === 0 ? 'bg-pink-600 text-white' : 'bg-white/5 text-white/40 border border-white/10'}`}
                    >
                        Card 1
                    </button>
                    <button
                        onClick={() => setStep(1)}
                        className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${step === 1 ? 'bg-pink-600 text-white' : 'bg-white/5 text-white/40 border border-white/10'}`}
                    >
                        Card 2
                    </button>
                </div>
            )}
        </div>
    );
};

export default Page4MessageCards;
