import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

interface Page2GameProps {
    data: {
        question?: string;
        yesText?: string;
        noText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Game = ({ data, onNext, isEditing = false, onUpdate }: Page2GameProps) => {
    const [noClickCount, setNoClickCount] = useState(0);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [noButtonScale, setNoButtonScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const defaultData = {
        question: data.question || "Will you be my Valentine?",
        yesText: data.yesText || "Yes! ❤️",
        noText: data.noText || "No 💔"
    };

    const noTexts = [
        defaultData.noText,
        "Are you sure? 🥺",
        "Pretty please? 🙏",
        "Think again... 💭",
        "Last chance! ⏰",
        "Wait, really? 😭",
        "I'm gonna cry... 😢",
        "Don't do this! 💔",
        "But why? 🧐",
        "Fine... be like that! 😂"
    ];

    const currentNoText = noClickCount < noTexts.length ? noTexts[noClickCount] : "No";

    const handleYes = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#dc2626', '#f43f5e', '#ffffff']
        });
        setTimeout(onNext, 1000);
    };

    const handleNoMove = () => {
        if (isEditing) return;

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const maxX = rect.width - 200;
        const maxY = rect.height - 100;

        const newX = (Math.random() - 0.5) * maxX;
        const newY = (Math.random() - 0.5) * maxY;

        setNoButtonPosition({ x: newX, y: newY });
        setNoClickCount(prev => prev + 1);
        setNoButtonScale(prev => Math.max(0.2, prev - 0.1));
    };

    return (
        <div
            ref={containerRef}
            className="min-h-screen relative overflow-hidden bg-[#0d0d0d] flex flex-col items-center justify-center p-4"
        >
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 blur-[150px] rounded-full animate-pulse" />
            </div>

            <div className="relative z-10 text-center max-w-2xl w-full">
                {/* Question */}
                <div
                    className={`mb-20 relative group ${isEditing ? 'cursor-pointer' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Question:", defaultData.question);
                            if (val !== null) onUpdate?.('question', val);
                        }
                    }}
                >
                    <h2 className="text-5xl md:text-7xl font-black text-white font-romantic leading-tight drop-shadow-2xl">
                        {defaultData.question}
                    </h2>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Double Click to Edit</span>
                        </div>
                    )}
                </div>

                {/* Buttons Container */}
                <div className="relative h-64 flex items-center justify-center gap-8">
                    {/* Yes Button */}
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleYes}
                        className={`px-10 py-5 bg-white text-red-600 font-black text-xl md:text-2xl rounded-[2rem] shadow-[0_0_40px_rgba(255,255,255,0.3)] z-20 group transition-all relative ${isEditing ? 'cursor-pointer' : ''}`}
                        onDoubleClick={(e: React.MouseEvent) => {
                            if (isEditing) {
                                e.stopPropagation();
                                const val = prompt("Edit Yes Text:", defaultData.yesText);
                                if (val !== null) onUpdate?.('yesText', val);
                            }
                        }}
                    >
                        {defaultData.yesText}
                        {isEditing && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-[8px] font-black text-white bg-black/40 px-2 py-1 rounded-full">Double Click to Edit</span>
                            </div>
                        )}
                    </motion.button>

                    {/* No Button (Moving/Shrinking) */}
                    {noClickCount < 10 && (
                        <motion.button
                            animate={{
                                x: noButtonPosition.x,
                                y: noButtonPosition.y,
                                scale: noButtonScale
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            onMouseEnter={handleNoMove}
                            onClick={handleNoMove}
                            className={`px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-xl md:text-2xl rounded-[2rem] z-10 transition-colors hover:bg-white/20 relative group ${isEditing ? 'cursor-pointer' : ''}`}
                            onDoubleClick={(e: React.MouseEvent) => {
                                if (isEditing) {
                                    e.stopPropagation();
                                    const val = prompt("Edit No Text:", defaultData.noText);
                                    if (val !== null) onUpdate?.('noText', val);
                                }
                            }}
                        >
                            {currentNoText}
                            {isEditing && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    <span className="text-[8px] font-black text-white bg-black/40 px-2 py-1 rounded-full">Double Click to Edit</span>
                                </div>
                            )}
                        </motion.button>
                    )}
                </div>

                {/* Secret Link for Editing Mode */}
                {isEditing && (
                    <p className="mt-8 text-white/20 text-[10px] uppercase font-black tracking-widest">
                        Tip: In preview mode, the No button will run away!
                    </p>
                )}
            </div>

            {/* Floating background icons */}
            <motion.div
                animate={{ rotate: 360, y: [0, -20, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-20 right-[10%] opacity-20 text-6xl"
            >
                💝
            </motion.div>
            <motion.div
                animate={{ rotate: -360, x: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
                className="absolute bottom-20 left-[10%] opacity-20 text-6xl"
            >
                💘
            </motion.div>
        </div>
    );
};

export default Page2Game;
