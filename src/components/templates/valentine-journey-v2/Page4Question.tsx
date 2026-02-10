import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';

interface Page4QuestionProps {
    data: {
        question?: string;
        characterImage?: string;
        yesText?: string;
        noText?: string;
        pleaseText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4Question = ({ data, onNext, isEditing = false, onUpdate }: Page4QuestionProps) => {
    const [noButtonSize, setNoButtonSize] = useState(1);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [noClickCount, setNoClickCount] = useState(0);
    const [showPleaseText, setShowPleaseText] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const defaultData = {
        question: data.question || "Will you be my Valentine?",
        characterImage: data.characterImage || "https://via.placeholder.com/300x300/FFB6C1/FF1493?text=💖",
        yesText: data.yesText || "Yes! 💕",
        noText: data.noText || "No",
        pleaseText: data.pleaseText || "Please? 🥺"
    };

    const handleYesClick = () => {
        // Trigger confetti
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ec4899', '#f43f5e', '#fb923c']
        });

        setTimeout(() => {
            confetti({
                particleCount: 100,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            confetti({
                particleCount: 100,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 250);

        setTimeout(onNext, 1500);
    };

    const handleNoHover = () => {
        if (isEditing) return;

        const container = containerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const maxX = containerRect.width - 150;
        const maxY = containerRect.height - 60;

        const newX = Math.random() * maxX - maxX / 2;
        const newY = Math.random() * maxY - maxY / 2;

        setNoButtonPosition({ x: newX, y: newY });
        setNoClickCount(prev => prev + 1);
        setShowPleaseText(true);

        // Shrink the No button
        setNoButtonSize(prev => Math.max(0.3, prev - 0.15));

        setTimeout(() => setShowPleaseText(false), 2000);
    };

    return (
        <div
            ref={containerRef}
            className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-red-600 flex items-center justify-center p-4"
        >
            {/* Animated Hearts Background */}
            {[...Array(25)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="absolute text-5xl opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -40, 0],
                        rotate: [0, 360],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{
                        duration: 6 + Math.random() * 4,
                        delay: Math.random() * 5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    {i % 3 === 0 ? '💖' : i % 3 === 1 ? '💕' : '💗'}
                </motion.div>
            ))}

            {/* Main Content */}
            <div className="relative z-10 max-w-2xl w-full text-center">
                {/* Character Image */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
                    className="mb-12 flex justify-center"
                >
                    <div className="relative group/character">
                        <div className="absolute -inset-4 bg-white/20 blur-3xl rounded-full opacity-0 group-hover/character:opacity-100 transition-opacity duration-1000" />
                        <motion.img
                            src={defaultData.characterImage}
                            alt="Character"
                            className="w-72 h-72 rounded-full border-8 border-white shadow-[0_20px_50px_-10px_rgba(255,255,255,0.4)] object-cover relative z-10"
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.02, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                e.currentTarget.src = 'https://via.placeholder.com/300x300/FFB6C1/FF1493?text=💖';
                            }}
                        />
                        {isEditing && (
                            <div
                                className="absolute inset-0 bg-black/60 rounded-full flex flex-col items-center justify-center opacity-0 group-hover/character:opacity-100 transition-opacity z-20 cursor-pointer"
                                onDoubleClick={() => {
                                    const url = prompt("Enter Image URL:", defaultData.characterImage);
                                    if (url) onUpdate?.('characterImage', url);
                                }}
                            >
                                <p className="text-white text-[10px] font-black uppercase tracking-widest mb-2">Double Click to Change</p>
                                <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-2 rounded-full font-black text-xs uppercase tracking-tighter">
                                    📷 Replace
                                </button>
                            </div>
                        )}
                        {/* Floating elements around character */}
                        <motion.div
                            className="absolute -top-6 -right-6 text-6xl drop-shadow-xl"
                            animate={{ rotate: 360, scale: [1, 1.3, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            💕
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-6 -left-6 text-6xl drop-shadow-xl"
                            animate={{ rotate: -360, scale: [1, 1.4, 1] }}
                            transition={{ duration: 3.5, repeat: Infinity }}
                        >
                            💖
                        </motion.div>
                    </div>
                </motion.div>

                {/* Question */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-16 relative group/question"
                >
                    <div
                        className={`relative inline-block px-12 py-6 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-3xl transition-all' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Question:", defaultData.question);
                                if (val) onUpdate?.('question', val);
                            }
                        }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl font-romantic gradient-text leading-tight px-4">
                            {defaultData.question}
                        </h1>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/question:opacity-100 transition-opacity">
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] bg-black/20 backdrop-blur-md px-3 py-1 rounded-full whitespace-nowrap">Double Click to Edit Question</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Please Text (shows after No button moves) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: showPleaseText ? 1 : 0,
                        scale: showPleaseText ? 1 : 0
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl font-black text-white drop-shadow-2xl pointer-events-none z-30 font-lovely italic"
                >
                    {defaultData.pleaseText}
                </motion.div>

                {/* Buttons Container */}
                <div className="relative h-40 flex items-center justify-center gap-12">
                    {/* Yes Button */}
                    <div className="relative group/yes">
                        <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full opacity-0 group-hover/yes:opacity-100 transition-opacity duration-500" />
                        <motion.button
                            initial={{ opacity: 0, x: -100 }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                scale: 1 + (noClickCount * 0.15)
                            }}
                            transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
                            onClick={handleYesClick}
                            className="bg-white text-pink-600 font-black py-8 px-16 rounded-[2rem] shadow-[0_20px_60px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_30px_80px_-10px_rgba(255,255,255,0.6)] transition-all duration-300 text-3xl relative overflow-hidden z-20"
                            whileHover={{ scale: 1.1 + (noClickCount * 0.1), rotate: [0, -3, 3, 0] }}
                            whileTap={{ scale: 0.95 }}
                            onDoubleClick={(e: React.MouseEvent) => {
                                if (isEditing) {
                                    e.stopPropagation();
                                    const val = prompt("Enter Yes Button Text:", defaultData.yesText);
                                    if (val) onUpdate?.('yesText', val);
                                }
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-red-500/10"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            />
                            <span className="relative z-10 flex items-center gap-3">
                                {defaultData.yesText}
                                <span className="text-4xl drop-shadow-md">💕</span>
                            </span>
                        </motion.button>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/yes:opacity-100 transition-opacity z-30">
                                <span className="text-[8px] font-black text-pink-300 uppercase tracking-[0.2em] bg-black/40 px-2 py-1 rounded-full">Double Click Title</span>
                            </div>
                        )}
                    </div>

                    {/* No Button (Moving) */}
                    <motion.button
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                            opacity: noButtonSize > 0.3 ? 1 : 0.4,
                            x: noButtonPosition.x,
                            y: noButtonPosition.y,
                            scale: noButtonSize
                        }}
                        transition={{
                            opacity: { duration: 0.3 },
                            x: { type: 'spring', stiffness: 350, damping: 25 },
                            y: { type: 'spring', stiffness: 350, damping: 25 },
                            scale: { duration: 0.3 }
                        }}
                        onMouseEnter={handleNoHover}
                        onClick={handleNoHover}
                        onDoubleClick={(e: React.MouseEvent) => {
                            if (isEditing) {
                                e.stopPropagation();
                                const val = prompt("Enter No Button Text:", defaultData.noText);
                                if (val) onUpdate?.('noText', val);
                            }
                        }}
                        className="bg-white/20 backdrop-blur-md text-white/70 border-2 border-white/30 font-black py-8 px-16 rounded-[2rem] shadow-xl transition-all duration-300 text-3xl cursor-pointer hover:bg-white/30 hover:text-white"
                        whileHover={{ rotate: [0, -10, 10, -10, 10, 0] }}
                    >
                        {defaultData.noText}
                    </motion.button>
                </div>

                {/* Hint Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="mt-16 group/hint relative inline-block"
                >
                    <div
                        className={`relative group/please p-6 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-2xl transition-all' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Please Text (for when they say no):", defaultData.pleaseText);
                                if (val) onUpdate?.('pleaseText', val);
                            }
                        }}
                    >
                        <p className="text-white/80 text-2xl font-black tracking-[0.3em] uppercase italic drop-shadow-lg">
                            {noClickCount > 0 ? (
                                <span className="flex items-center gap-4">
                                    STOP! TRIED <span className="text-white text-5xl underline decoration-pink-300 decoration-8 underline-offset-8">{noClickCount}</span> TIMES... 🥺
                                </span>
                            ) : (
                                <span className="flex items-center gap-4">
                                    CHOOSE WISELY <span className="text-white text-5xl">∞</span>
                                </span>
                            )}
                        </p>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/please:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] bg-black/20 px-3 py-1 rounded-full">Double Click Please Text</span>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Corner Decorations */}
            <motion.div
                className="absolute top-10 left-10 text-9xl opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                💕
            </motion.div>
            <motion.div
                className="absolute top-10 right-10 text-9xl opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
                💗
            </motion.div>
            <motion.div
                className="absolute bottom-10 left-10 text-9xl opacity-20"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity }}
            >
                💖
            </motion.div>
            <motion.div
                className="absolute bottom-10 right-10 text-9xl opacity-20"
                animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                transition={{ duration: 18, repeat: Infinity }}
            >
                💕
            </motion.div>

            {/* Sparkles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-3 h-3 bg-white rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        delay: Math.random() * 5,
                        repeat: Infinity
                    }}
                />
            ))}
        </div>
    );
};

export default Page4Question;
