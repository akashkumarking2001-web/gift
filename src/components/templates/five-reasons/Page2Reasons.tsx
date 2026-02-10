import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface Page2ReasonsProps {
    data: {
        r1?: string;
        r2?: string;
        r3?: string;
        r4?: string;
        r5?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Reasons = ({ data, onNext, isEditing = false, onUpdate }: Page2ReasonsProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const defaultData = {
        r1: data.r1 || "The way you smile whenever you see me.",
        r2: data.r2 || "How you always know exactly what to say.",
        r3: data.r3 || "Your passion for the things you love.",
        r4: data.r4 || "The way you make me feel safe and heard.",
        r5: data.r5 || "Simply because you are uniquely you."
    };

    const reasons = [defaultData.r1, defaultData.r2, defaultData.r3, defaultData.r4, defaultData.r5];
    const colors = ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6'];

    const handleNext = () => {
        if (activeIndex < 4) setActiveIndex(prev => prev + 1);
        else onNext();
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050002] flex flex-col items-center justify-center p-6 md:p-12">
            {/* Background reactive to active reason */}
            <motion.div
                animate={{ backgroundColor: colors[activeIndex], opacity: 0.05 }}
                className="absolute inset-0 transition-colors duration-1000"
            />

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
                {/* Progress Indicators */}
                <div className="flex gap-3 mb-16">
                    {reasons.map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            animate={{
                                scale: activeIndex === i ? 1.2 : 1,
                                backgroundColor: activeIndex === i ? colors[i] : 'rgba(255,255,255,0.1)'
                            }}
                            className="w-12 h-2 rounded-full transition-all"
                        />
                    ))}
                </div>

                {/* The "Reason" Card */}
                <div className="relative w-full aspect-[4/3] md:aspect-[2/1] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 100, rotateY: 45 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: -100, rotateY: -45 }}
                            transition={{ type: "spring", damping: 20, stiffness: 100 }}
                            className="w-full h-full bg-[#111111]/60 backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 md:p-20 flex flex-col items-center justify-center text-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group relative overflow-hidden"
                        >
                            {/* Decorative Sparkle */}
                            <Sparkles className="absolute top-10 left-10 text-white/10 w-20 h-20" />
                            <Heart className="absolute bottom-10 right-10 text-white/5 w-40 h-40" />

                            <motion.span
                                animate={{ color: colors[activeIndex] }}
                                className="text-[120px] md:text-[200px] font-black absolute opacity-5 -top-10 md:-top-20 select-none"
                            >
                                0{activeIndex + 1}
                            </motion.span>

                            <div
                                className={`relative z-10 group/item ${isEditing ? 'cursor-pointer hover:bg-white/5 px-6 py-4 rounded-3xl transition-all' : ''}`}
                                onDoubleClick={(e) => {
                                    if (isEditing) {
                                        e.stopPropagation();
                                        const field = `r${activeIndex + 1}`;
                                        const val = prompt(`Edit Reason ${activeIndex + 1}:`, reasons[activeIndex]);
                                        if (val !== null) onUpdate?.(field as any, val);
                                    }
                                }}
                            >
                                <h3 className="text-3xl md:text-5xl font-black text-white font-lovely leading-tight tracking-wide">
                                    {reasons[activeIndex]}
                                </h3>
                                {isEditing && (
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity whitespace-nowrap">
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Double Click to Customize Reason {activeIndex + 1}</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Control Buttons */}
                <div className="mt-16 flex items-center gap-12">
                    <button
                        onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                        disabled={activeIndex === 0}
                        className={`text-white font-black text-[10px] uppercase tracking-[0.5em] transition-all ${activeIndex === 0 ? 'opacity-10 cursor-not-allowed' : 'opacity-40 hover:opacity-100'}`}
                    >
                        ← Prev
                    </button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNext}
                        className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black shadow-2xl hover:bg-rose-500 hover:text-white transition-all duration-500"
                    >
                        {activeIndex === 4 ? <Sparkles size={28} /> : <motion.span key={activeIndex} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="font-black text-xl">0{activeIndex + 2 > 5 ? 5 : activeIndex + 2}</motion.span>}
                    </motion.button>

                    <button
                        onClick={handleNext}
                        className="text-white font-black text-[10px] uppercase tracking-[0.5em] opacity-40 hover:opacity-100 transition-all"
                    >
                        Next →
                    </button>
                </div>

                {!isEditing && (
                    <p className="mt-12 text-white/10 text-[10px] font-black uppercase tracking-[0.3em]">
                        {activeIndex + 1} / 5 Reasons
                    </p>
                )}
            </div>
        </div>
    );
};

export default Page2Reasons;
