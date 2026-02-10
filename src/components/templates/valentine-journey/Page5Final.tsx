import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Share2, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Page5FinalProps {
    data: {
        mainHeading?: string;
        characterImage?: string;
        loveMessage?: string;
        signature?: string;
        shareButtonText?: string;
        backButtonText?: string;
    };
    onBack?: () => void;
    onShare?: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page5Final = ({ data, onBack, onShare, isEditing = false, onUpdate }: Page5FinalProps) => {
    const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

    const defaultData = {
        mainHeading: data.mainHeading || "Happy Valentine's Day!",
        characterImage: data.characterImage || "https://via.placeholder.com/400x400/FFC0CB/DC143C?text=💝",
        loveMessage: data.loveMessage || "Every moment with you feels like a beautiful dream. You make my heart skip a beat and my world a lot brighter. Thank you for being the most incredible person in my life. I love you more than words can say!",
        signature: data.signature || "Yours Forever",
        shareButtonText: data.shareButtonText || "Share My Love",
        backButtonText: data.backButtonText || "Back to Start"
    };

    useEffect(() => {
        // Initial confetti burst
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Generate floating hearts
        const heartArray = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 10 + Math.random() * 5
        }));
        setHearts(heartArray);
    }, []);

    const handleShare = () => {
        if (onShare) {
            onShare();
        } else {
            // Fallback share functionality
            if (navigator.share) {
                navigator.share({
                    title: 'Happy Valentine\'s Day!',
                    text: 'I made something special for you! 💖',
                    url: window.location.href
                });
            }
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex flex-col items-center justify-center p-4">
            {/* Floating Hearts Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute text-2xl opacity-20"
                        style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, 20, -20, 0],
                            rotate: [0, 360],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: heart.duration,
                            delay: heart.delay,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        💕
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-3xl w-full space-y-8">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="text-center"
                >
                    {isEditing ? (
                        <input
                            type="text"
                            value={defaultData.mainHeading}
                            onChange={(e) => onUpdate?.('mainHeading', e.target.value)}
                            className="w-full text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 text-center border-b-2 border-pink-300 focus:outline-none focus:border-pink-500 transition-colors"
                            maxLength={50}
                        />
                    ) : (
                        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-red-600">
                            {defaultData.mainHeading}
                        </h1>
                    )}
                </motion.div>

                {/* Character with Heart */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="relative mx-auto w-48 h-48 md:w-64 md:h-64"
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="relative w-full h-full"
                    >
                        <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
                            <img
                                src={defaultData.characterImage}
                                alt="Character"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/400x400/FFC0CB/DC143C?text=💝';
                                }}
                            />
                            {isEditing && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                    <button className="bg-white text-pink-600 px-4 py-2 rounded-full font-bold text-sm">
                                        📷 Change Image
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Floating Heart */}
                        <motion.div
                            className="absolute -top-8 -right-8 text-7xl"
                            animate={{
                                scale: [1, 1.3, 1],
                                rotate: [0, 15, -15, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity
                            }}
                        >
                            ❤️
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Love Letter */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-pink-200 relative"
                >
                    {/* Paper Texture Overlay */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjYSkiLz48L3N2Zz4=')] opacity-30 rounded-3xl pointer-events-none"></div>

                    <div className="relative space-y-6">
                        {/* Message */}
                        {isEditing ? (
                            <textarea
                                value={defaultData.loveMessage}
                                onChange={(e) => onUpdate?.('loveMessage', e.target.value)}
                                className="w-full text-lg md:text-xl text-gray-700 leading-relaxed font-serif bg-transparent border-2 border-pink-200 rounded-xl p-4 focus:outline-none focus:border-pink-400 transition-colors resize-none"
                                maxLength={500}
                                rows={8}
                                style={{ fontFamily: "'Merriweather', serif" }}
                            />
                        ) : (
                            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-serif" style={{ fontFamily: "'Merriweather', serif" }}>
                                {defaultData.loveMessage}
                            </p>
                        )}

                        {/* Signature */}
                        <div className="text-right pt-4 border-t-2 border-pink-200">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={defaultData.signature}
                                    onChange={(e) => onUpdate?.('signature', e.target.value)}
                                    className="text-right w-full text-2xl font-handwriting text-pink-600 border-b-2 border-pink-300 focus:outline-none focus:border-pink-500 transition-colors"
                                    maxLength={30}
                                    style={{ fontFamily: "'Caveat', cursive" }}
                                />
                            ) : (
                                <p className="text-2xl font-handwriting text-pink-600" style={{ fontFamily: "'Caveat', cursive" }}>
                                    {defaultData.signature} 💖
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Decorative Hearts */}
                    <div className="absolute -top-4 -left-4 text-4xl">💕</div>
                    <div className="absolute -bottom-4 -right-4 text-4xl">💝</div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    {/* Share Button */}
                    <button
                        onClick={handleShare}
                        className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 text-lg group"
                    >
                        <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        {defaultData.shareButtonText}
                    </button>

                    {/* Back Button */}
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="bg-white text-pink-600 font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 text-lg border-2 border-pink-300 group"
                        >
                            <RotateCcw className="w-5 h-5 group-hover:-rotate-180 transition-transform duration-500" />
                            {defaultData.backButtonText}
                        </button>
                    )}
                </motion.div>

                {/* Final Heart */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.2, type: 'spring' }}
                    className="text-center"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}
                        className="inline-block text-6xl"
                    >
                        <Heart className="w-16 h-16 text-pink-500 fill-pink-500" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Continuous Confetti */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 pointer-events-none"
            />
        </div>
    );
};

export default Page5Final;
