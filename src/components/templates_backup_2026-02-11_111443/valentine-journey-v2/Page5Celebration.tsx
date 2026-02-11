import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface Page5CelebrationProps {
    data: {
        mainHeading?: string;
        characterImage?: string;
        loveMessage?: string;
        signature?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page5Celebration = ({ data, onNext, isEditing = false, onUpdate }: Page5CelebrationProps) => {
    const [showMessage, setShowMessage] = useState(false);

    const defaultData = {
        mainHeading: data.mainHeading || "Yay! You said Yes!",
        characterImage: data.characterImage || "https://via.placeholder.com/400x400/FFB6C1/FF1493?text=🎉",
        loveMessage: data.loveMessage || "You've made me the happiest person in the world! I promise to always cherish you, make you smile, and love you with all my heart. Thank you for being mine! 💕",
        signature: data.signature || "Forever yours"
    };

    useEffect(() => {
        // Continuous confetti celebration
        const duration = 5000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0, y: 0.6 },
                colors: ['#ec4899', '#f43f5e', '#fb923c', '#fbbf24']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1, y: 0.6 },
                colors: ['#ec4899', '#f43f5e', '#fb923c', '#fbbf24']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
        setTimeout(() => setShowMessage(true), 1000);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-yellow-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
            {/* Animated Background */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        'linear-gradient(to bottom right, #fbbf24, #ec4899, #ef4444)',
                        'linear-gradient(to bottom right, #ec4899, #ef4444, #fbbf24)',
                        'linear-gradient(to bottom right, #ef4444, #fbbf24, #ec4899)',
                        'linear-gradient(to bottom right, #fbbf24, #ec4899, #ef4444)'
                    ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Floating Hearts */}
            {/* Floating Hearts - Optimized */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="absolute text-6xl pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.1
                    }}
                    animate={{
                        y: [0, -50, 0],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 5,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    {['💖', '💕', '💗', '💓', '💝'][i % 5]}
                </motion.div>
            ))}

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl w-full text-center">
                {/* Celebration Heading */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, type: 'spring', bounce: 0.6 }}
                    className="mb-12 relative group/heading"
                >
                    <div
                        className={`relative inline-block px-12 py-6 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-3xl transition-all border-2 border-transparent hover:border-white/20' : ''}`}
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Heading:", defaultData.mainHeading);
                                if (val) onUpdate?.('mainHeading', val);
                            }
                        }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black text-white drop-shadow-2xl font-romantic gradient-text leading-tight">
                            {defaultData.mainHeading}
                        </h1>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    ✏️ Edit Heading
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Celebration Emojis */}
                    <div className="flex justify-center gap-6 mt-8">
                        {['🎉', '💖', '🎊', '💕', '✨'].map((emoji, i) => (
                            <motion.span
                                key={i}
                                className="text-6xl drop-shadow-lg"
                                animate={{
                                    y: [0, -30, 0],
                                    rotate: [0, 360],
                                    scale: [1, 1.4, 1]
                                }}
                                transition={{
                                    duration: 2.5,
                                    delay: i * 0.15,
                                    repeat: Infinity,
                                    ease: 'easeInOut'
                                }}
                            >
                                {emoji}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Character Image */}
                <motion.div
                    initial={{ scale: 0, y: 100 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, type: 'spring', bounce: 0.5 }}
                    className="mb-16 flex justify-center"
                >
                    <div className="relative group/character">
                        <div className="absolute -inset-6 bg-white/20 blur-3xl rounded-full opacity-50 group-hover/character:opacity-100 transition-opacity duration-1000" />
                        <motion.div
                            className="w-80 h-80 rounded-full border-8 border-white shadow-[0_30px_60px_-15px_rgba(255,255,255,0.5)] overflow-hidden bg-white relative z-10"
                            animate={{
                                rotate: [0, 8, -8, 0],
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <img
                                src={defaultData.characterImage}
                                alt="Celebration"
                                className="w-full h-full object-cover"
                                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/400x400/FFB6C1/FF1493?text=🎉';
                                }}
                            />
                            {isEditing && (
                                <div
                                    className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover/character:opacity-100 transition-opacity cursor-pointer z-20"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const url = prompt("Enter Image URL:", defaultData.characterImage);
                                        if (url) onUpdate?.('characterImage', url);
                                    }}
                                >
                                    <p className="text-white text-[10px] font-black uppercase tracking-widest mb-2">Change Image</p>
                                    <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-2 rounded-full font-black text-xs uppercase tracking-tighter shadow-lg">
                                        📷 Replace
                                    </button>
                                </div>
                            )}
                        </motion.div>

                        {/* Orbiting Hearts */}
                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={`orbit-${i}`}
                                className="absolute text-5xl drop-shadow-xl"
                                style={{
                                    left: '50%',
                                    top: '50%'
                                }}
                                animate={{
                                    x: Math.cos((i * Math.PI * 2) / 10) * 240,
                                    y: Math.sin((i * Math.PI * 2) / 10) * 240,
                                    rotate: 360,
                                    scale: [1, 1.2, 1]
                                }}
                                transition={{
                                    duration: 10,
                                    delay: i * 0.2,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }}
                            >
                                💕
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Love Message Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{
                        opacity: showMessage ? 1 : 0,
                        y: showMessage ? 0 : 50,
                        scale: showMessage ? 1 : 0.9
                    }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="bg-[#fffdf8] rounded-[3rem] shadow-2xl p-12 md:p-20 mb-12 max-w-4xl mx-auto border-2 border-white/50 relative overflow-hidden"
                    style={{
                        backgroundImage: `url('https://www.transparenttextures.com/patterns/cardboard.png')`,
                        backgroundBlendMode: 'multiply'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-orange-500/5 pointer-events-none" />

                    <div
                        className={`relative group/msg transition-all ${isEditing ? 'cursor-pointer p-8 hover:bg-pink-50/50 rounded-2xl border-2 border-transparent hover:border-pink-200' : ''}`}
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Love Message:", defaultData.loveMessage);
                                if (val) onUpdate?.('loveMessage', val);
                            }
                        }}
                    >
                        <p className="text-3xl md:text-4xl text-gray-800 font-lovely italic font-bold leading-relaxed mb-12 text-center drop-shadow-sm">
                            "{defaultData.loveMessage}"
                        </p>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-pink-200 shadow-sm">
                                <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                    ✏️ Edit Message
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Signature */}
                    <div className="flex justify-end">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.5 }}
                            className={`relative group/sign transition-all ${isEditing ? 'cursor-pointer px-8 py-4 hover:bg-pink-50/50 rounded-xl border-2 border-transparent hover:border-pink-200' : ''}`}
                            onClick={() => {
                                if (isEditing) {
                                    const val = prompt("Enter Signature:", defaultData.signature);
                                    if (val) onUpdate?.('signature', val);
                                }
                            }}
                        >
                            <p className="text-5xl font-romantic text-pink-600 drop-shadow-sm">
                                {defaultData.signature} 💕
                            </p>
                            {isEditing && (
                                <div className="absolute -top-6 right-0 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-pink-200 shadow-sm">
                                    <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        ✏️ Edit Signature
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Decorative Corner Hearts */}
                    <div className="absolute top-10 left-10 text-7xl opacity-10 grayscale group-hover:grayscale-0 transition-all">💖</div>
                    <div className="absolute bottom-10 right-10 text-7xl opacity-10 grayscale group-hover:grayscale-0 transition-all">💝</div>
                </motion.div>

                {/* Next Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.8 }}
                >
                    <motion.button
                        onClick={onNext}
                        className="group relative overflow-hidden px-12 py-6 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Next Mystery
                            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </motion.button>
                </motion.div>

            </div>

            {/* Firework Sparkles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`firework-${i}`}
                    className="absolute w-2 h-2 rounded-full pointer-events-none"
                    style={{
                        left: '50%',
                        top: '50%',
                        background: ['#fbbf24', '#ec4899', '#ef4444', '#fb923c'][i % 4]
                    }}
                    animate={{
                        x: (Math.random() - 0.5) * 800,
                        y: (Math.random() - 0.5) * 800,
                        opacity: [1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity
                    }}
                />
            ))}
        </div>
    );
};

export default Page5Celebration;
