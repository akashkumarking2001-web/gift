import { motion } from 'framer-motion';
import { useState } from 'react';

interface Page11EndingProps {
    data: {
        thankYouText?: string;
        finalMessage?: string;
        shareText?: string;
    };
    onNext?: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page11Ending = ({ data, isEditing = false, onUpdate }: Page11EndingProps) => {
    const [copied, setCopied] = useState(false);

    const defaultData = {
        thankYouText: data.thankYouText || "Thank You For Being Mine",
        finalMessage: data.finalMessage || "This is just the beginning of our forever story. Here's to many more beautiful moments together! 💕",
        shareText: data.shareText || "Share this love story"
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Our Love Story',
                text: 'Check out this beautiful Valentine message!',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleReplay = () => {
        window.location.reload();
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-600 via-rose-600 to-red-700 flex items-center justify-center p-4">
            {/* Animated Background */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        'linear-gradient(to bottom right, #db2777, #e11d48, #dc2626)',
                        'linear-gradient(to bottom right, #e11d48, #dc2626, #db2777)',
                        'linear-gradient(to bottom right, #dc2626, #db2777, #e11d48)',
                        'linear-gradient(to bottom right, #db2777, #e11d48, #dc2626)'
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            {/* Floating Hearts Celebration */}
            {[...Array(40)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="absolute text-6xl"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.3
                    }}
                    animate={{
                        y: [0, -200, 0],
                        rotate: [0, 360],
                        scale: [0.5, 1.5, 0.5],
                        x: [0, (Math.random() - 0.5) * 100, 0]
                    }}
                    transition={{
                        duration: 6 + Math.random() * 6,
                        delay: Math.random() * 5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    {['💖', '💕', '💗', '💝', '💓', '❤️'][i % 6]}
                </motion.div>
            ))}

            <div className="relative z-10 max-w-4xl w-full text-center">
                {/* Main Thank You */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
                    className="mb-12 relative group/heading"
                >
                    <div
                        className={`relative inline-block px-12 py-6 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-3xl transition-all' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Thank You Heading:", defaultData.thankYouText);
                                if (val) onUpdate?.('thankYouText', val);
                            }
                        }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black text-white drop-shadow-2xl font-romantic gradient-text leading-tight">
                            {defaultData.thankYouText}
                        </h1>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/heading:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] bg-black/20 backdrop-blur-md px-4 py-1 rounded-full">Double Click Heading</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Giant Heart Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, type: 'spring', bounce: 0.6 }}
                    className="mb-16"
                >
                    <motion.div
                        className="text-[10rem] md:text-[14rem] inline-block filter drop-shadow-[0_20px_50px_rgba(255,255,255,0.4)]"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                            filter: [
                                'drop-shadow(0 20px 50px rgba(255,255,255,0.4))',
                                'drop-shadow(0 30px 60px rgba(255,255,255,0.6))',
                                'drop-shadow(0 20px 50px rgba(255,255,255,0.4))'
                            ]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        💖
                    </motion.div>
                </motion.div>

                {/* Final Message Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="bg-white/95 backdrop-blur-xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] p-12 md:p-16 mb-16 max-w-3xl mx-auto border-2 border-white/50 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-white/50 to-rose-50/50" />

                    <div
                        className={`relative group/msg transition-all ${isEditing ? 'cursor-pointer p-8 hover:bg-pink-50/50 rounded-2xl border-2 border-dashed border-pink-200' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Final Message:", defaultData.finalMessage);
                                if (val) onUpdate?.('finalMessage', val);
                            }
                        }}
                    >
                        <p className="text-2xl md:text-4xl text-gray-800 font-lovely italic font-bold leading-relaxed text-center">
                            "{defaultData.finalMessage}"
                        </p>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/msg:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-[8px] font-black text-pink-400 uppercase tracking-[0.2em] bg-white px-3 py-1 rounded-full shadow-sm">Double Click Message</span>
                            </div>
                        )}
                    </div>

                    {/* Decorative Corner Hearts */}
                    <div className="absolute top-8 left-8 text-5xl opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700">💕</div>
                    <div className="absolute top-8 right-8 text-5xl opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700">💖</div>
                    <div className="absolute bottom-8 left-8 text-5xl opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700">💗</div>
                    <div className="absolute bottom-8 right-8 text-5xl opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700">💝</div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-8 justify-center items-center"
                >
                    {/* Replay Button */}
                    <motion.button
                        onClick={handleReplay}
                        className="group relative overflow-hidden px-14 py-8 rounded-[2.5rem] bg-white text-rose-600 font-black text-xs uppercase tracking-[0.4em] shadow-[0_25px_60px_-15px_rgba(255,255,255,0.4)] hover:shadow-[0_35px_80px_-15px_rgba(255,255,255,0.5)] transition-all min-w-[280px]"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-red-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                        />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            🔄 REPLAY STORY
                        </span>
                    </motion.button>

                    {/* Share Button */}
                    <motion.button
                        onClick={handleShare}
                        className="group relative overflow-hidden px-14 py-8 rounded-[2.5rem] bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white font-black text-xs uppercase tracking-[0.4em] shadow-[0_25px_60px_-15px_rgba(244,63,94,0.4)] hover:shadow-[0_35px_80px_-15px_rgba(244,63,94,0.5)] transition-all min-w-[280px]"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                        />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {copied ? '✓ COPIED LINK' : '📤 SHARE THE LOVE'}
                        </span>
                    </motion.button>
                </motion.div>

                {/* Made with Love */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-12"
                >
                    <p className="text-white/80 text-lg font-medium">
                        Made with 💕 by Gift Magic
                    </p>
                </motion.div>
            </div>

            {/* Firework Effect */}
            {[...Array(60)].map((_, i) => (
                <motion.div
                    key={`firework-${i}`}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                        left: '50%',
                        top: '50%',
                        background: ['#fbbf24', '#ec4899', '#ef4444', '#fb923c', '#fff'][i % 5]
                    }}
                    animate={{
                        x: (Math.random() - 0.5) * 1200,
                        y: (Math.random() - 0.5) * 1200,
                        scale: [1, 0],
                        opacity: [1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        delay: Math.random() * 4,
                        repeat: Infinity
                    }}
                />
            ))}

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
                💖
            </motion.div>
            <motion.div
                className="absolute bottom-10 left-10 text-9xl opacity-20"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity }}
            >
                💗
            </motion.div>
            <motion.div
                className="absolute bottom-10 right-10 text-9xl opacity-20"
                animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                transition={{ duration: 18, repeat: Infinity }}
            >
                💝
            </motion.div>
        </div>
    );
};

export default Page11Ending;
