import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { GiftService } from '../../../lib/gifts';
import { Loader2, Upload } from 'lucide-react';

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
    const [isUploading, setIsUploading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsUploading(true);
            const file = e.target.files[0];
            try {
                const url = await GiftService.uploadMedia(file);
                if (url) {
                    onUpdate?.('characterImage', url);
                }
            } catch (error) {
                console.error("Upload failed", error);
                alert("Upload failed. Please try again.");
            } finally {
                setIsUploading(false);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        }
    };

    return (
        <div
            ref={containerRef}
            className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-red-600 flex items-center justify-center p-4"
        >
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
            />
            {/* Animated Hearts Background */}
            {/* Animated Hearts Background - Optimized */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="absolute text-5xl opacity-10 pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -40, 0],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 6 + Math.random() * 4,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    {i % 3 === 0 ? '💖' : i % 3 === 1 ? '💕' : '💗'}
                </motion.div>
            ))}

            {/* Extra Sparkle Animation */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`sparkle-extra-${i}`}
                    className="absolute w-1 h-1 bg-white/60 rounded-full pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 0.8, 0],
                        scale: [0, 1.5, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: 'easeInOut'
                    }}
                />
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
                                onClick={() => {
                                    fileInputRef.current?.click();
                                }}
                            >
                                {isUploading ? (
                                    <div className="flex flex-col items-center text-white gap-2">
                                        <Loader2 className="w-8 h-8 animate-spin" />
                                        <span className="text-[10px] uppercase tracking-widest">Uploading...</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <p className="text-white text-[10px] font-black uppercase tracking-widest mb-2">Change Image</p>
                                        <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-2 rounded-full font-black text-xs uppercase tracking-tighter flex items-center gap-2">
                                            <Upload size={14} /> Replace
                                        </button>
                                    </div>
                                )}
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
                        className={`relative inline-block px-12 py-6 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-3xl transition-all border-2 border-transparent hover:border-white/20' : ''}`}
                        onClick={() => {
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
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    ✏️ Edit Question
                                </span>
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
                            onClick={(e: React.MouseEvent) => {
                                if (isEditing) {
                                    e.stopPropagation();
                                    const val = prompt("Enter Yes Button Text:", defaultData.yesText);
                                    if (val) onUpdate?.('yesText', val);
                                } else {
                                    handleYesClick();
                                }
                            }}
                            className="bg-white text-rose-600 font-black py-6 px-16 rounded-full shadow-2xl hover:scale-110 hover:shadow-white/50 transition-all duration-300 transform text-2xl relative overflow-hidden group"
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
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/40 px-3 py-1 rounded-full backdrop-blur z-30 pointer-events-none">
                                <span className="text-[8px] font-black text-pink-300 uppercase tracking-[0.2em]">Click to Edit Text</span>
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
                        onClick={(e: React.MouseEvent) => {
                            if (isEditing) {
                                e.stopPropagation();
                                const val = prompt("Enter No Button Text:", defaultData.noText);
                                if (val) onUpdate?.('noText', val);
                            } else {
                                handleNoHover();
                            }
                        }}
                        className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 font-black py-6 px-12 rounded-full shadow-xl transition-all duration-300 text-xl cursor-pointer hover:bg-white/20 hover:border-white/40"
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                    >
                        {defaultData.noText}
                        {isEditing && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/40 px-3 py-1 rounded-full backdrop-blur z-30 whitespace-nowrap pointer-events-none">
                                <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">Click to Edit</span>
                            </div>
                        )}
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
                        className={`relative group/please p-6 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-2xl transition-all border-2 border-transparent hover:border-white/20' : ''}`}
                        onClick={() => {
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
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                <span className="text-[8px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    ✏️ Edit Text
                                </span>
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
            {/* Sparkles - Optimized */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-2 h-2 bg-white/40 rounded-full pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity
                    }}
                />
            ))}
        </div>
    );
};

export default Page4Question;
