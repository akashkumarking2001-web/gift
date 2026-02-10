import { motion } from 'framer-motion';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Page2QuestionProps {
    data: {
        question?: string;
        yesText?: string;
        noText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Question = ({ data, onNext, isEditing = false, onUpdate }: Page2QuestionProps) => {
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
    const [noCount, setNoCount] = useState(0);

    const defaultData = {
        question: data.question || "Will you be my Valentine forever?",
        yesText: data.yesText || "Yes!",
        noText: data.noText || "No"
    };

    const handleNoHover = () => {
        if (!isEditing) {
            const newX = (Math.random() - 0.5) * 300;
            const newY = (Math.random() - 0.5) * 300;
            setNoPosition({ x: newX, y: newY });
            setNoCount(prev => prev + 1);
        }
    };

    const handleYes = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#dc2626', '#ffffff', '#991b1b']
        });
        setTimeout(onNext, 1500);
    };

    const noTexts = [
        defaultData.noText,
        "Are you sure?",
        "Think again!",
        "Really?",
        "Don't do this!",
        "You're making a mistake!",
        "Click the other one!",
        "Pleaseee",
        "Fine, try and catch me!"
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0202] flex flex-col items-center justify-center p-8 text-center">
            {/* Background reactive glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.1)_0%,transparent_70%)]" />

            <div className="relative z-10 w-full max-w-4xl">
                {/* Question */}
                <div
                    className={`mb-24 relative group ${isEditing ? 'cursor-pointer hover:bg-white/5 px-10 py-6 rounded-[3rem] transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Question:", defaultData.question);
                            if (val !== null) onUpdate?.('question', val);
                        }
                    }}
                >
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-8xl font-black text-white font-lovely leading-tight"
                    >
                        {defaultData.question}
                    </motion.h2>
                    {isEditing && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Double Click to Edit Question</span>
                        </div>
                    )}
                </div>

                {/* Buttons Container */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    {/* YES Button */}
                    <div className="relative group/yes">
                        <div className="absolute -inset-4 bg-red-600 rounded-full blur-xl opacity-0 group-hover/yes:opacity-30 transition-opacity" />
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleYes}
                            className={`relative px-16 py-6 bg-red-600 text-white font-black text-xl uppercase tracking-[0.4em] rounded-full shadow-2xl ${isEditing ? 'cursor-default' : ''}`}
                            onDoubleClick={() => {
                                if (isEditing) {
                                    const val = prompt("Edit Yes Text:", defaultData.yesText);
                                    if (val !== null) onUpdate?.('yesText', val);
                                }
                            }}
                        >
                            {defaultData.yesText}
                            {isEditing && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/yes:opacity-100 transition-opacity whitespace-nowrap">
                                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/20 px-2 py-1 rounded-full">Double Click to Edit Yes</span>
                                </div>
                            )}
                        </motion.button>
                    </div>

                    {/* NO Button (Evasive) */}
                    <motion.div
                        animate={{ x: noPosition.x, y: noPosition.y }}
                        transition={{ type: "spring", damping: 15, stiffness: 150 }}
                        className="relative group/no"
                    >
                        <motion.button
                            onMouseEnter={handleNoHover}
                            onClick={handleNoHover}
                            className={`px-12 py-5 bg-white/5 border border-white/10 text-white/40 hover:text-white font-black text-sm uppercase tracking-[0.3em] rounded-full transition-all ${isEditing ? 'cursor-default' : ''}`}
                            onDoubleClick={() => {
                                if (isEditing) {
                                    const val = prompt("Edit No Text:", defaultData.noText);
                                    if (val !== null) onUpdate?.('noText', val);
                                }
                            }}
                        >
                            {noTexts[Math.min(noCount, noTexts.length - 1)]}
                            {isEditing && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/no:opacity-100 transition-opacity whitespace-nowrap">
                                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/20 px-2 py-1 rounded-full">Double Click to Edit No</span>
                                </div>
                            )}
                        </motion.button>
                    </motion.div>
                </div>
            </div>

            {/* Pulsing Red Heart in background */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-20 -right-20 pointer-events-none"
            >
                <Heart size={400} fill="red" className="text-red-900" />
            </motion.div>
        </div>
    );
};

export default Page2Question;
