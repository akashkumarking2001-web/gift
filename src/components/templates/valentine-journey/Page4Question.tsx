import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface Page4QuestionProps {
    data: {
        question?: string;
        characterImage?: string;
        yesText?: string;
        notSureText?: string;
        pleaseText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4Question = ({ data, onNext, isEditing = false, onUpdate }: Page4QuestionProps) => {
    const [notSureClicks, setNotSureClicks] = useState(0);
    const [notSureScale, setNotSureScale] = useState(1);
    const [showPlease, setShowPlease] = useState(false);
    const [answered, setAnswered] = useState(false);

    const defaultData = {
        question: data.question || "Will you be my Valentine?",
        characterImage: data.characterImage || "https://via.placeholder.com/400x400/FFE4E1/FF69B4?text=💕",
        yesText: data.yesText || "YES!",
        notSureText: data.notSureText || "Not Sure",
        pleaseText: data.pleaseText || "Please say yes! 💖"
    };

    const handleNotSureClick = () => {
        if (isEditing || answered) return;

        setNotSureClicks(prev => prev + 1);
        setNotSureScale(prev => Math.max(0.1, prev - 0.25));
        setShowPlease(true);

        // Hide "please" text after 2 seconds
        setTimeout(() => setShowPlease(false), 2000);
    };

    const handleYesClick = () => {
        if (isEditing || answered) return;

        setAnswered(true);

        // Confetti explosion!
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(interval);
                setTimeout(onNext, 500);
                return;
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    useEffect(() => {
        // Floating hearts animation
        const hearts = document.querySelectorAll('.floating-heart');
        hearts.forEach((heart, i) => {
            (heart as HTMLElement).style.animationDelay = `${i * 0.5}s`;
        });
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-100 to-red-100 flex flex-col items-center justify-center p-4">
            {/* Scalloped Top Border */}
            <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,50 Q60,0 120,50 T240,50 T360,50 T480,50 T600,50 T720,50 T840,50 T960,50 T1080,50 T1200,50 T1320,50 T1440,50 L1440,0 L0,0 Z" fill="#f472b6" fillOpacity="0.4" />
                </svg>
            </div>

            {/* Scalloped Bottom Border */}
            <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,50 Q60,100 120,50 T240,50 T360,50 T480,50 T600,50 T720,50 T840,50 T960,50 T1080,50 T1200,50 T1320,50 T1440,50 L1440,100 L0,100 Z" fill="#f472b6" fillOpacity="0.4" />
                </svg>
            </div>

            {/* Floating Hearts */}
            {[...Array(10)].map((_, i) => (
                <div
                    key={i}
                    className="floating-heart absolute text-3xl opacity-20 pointer-events-none"
                    style={{
                        left: `${10 + i * 10}%`,
                        top: `${20 + (i % 3) * 20}%`,
                        animation: `float ${4 + i}s ease-in-out infinite`
                    }}
                >
                    💕
                </div>
            ))}

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(10deg); }
        }
      `}</style>

            {/* Main Content */}
            <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
                {/* Question */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {isEditing ? (
                        <input
                            type="text"
                            value={defaultData.question}
                            onChange={(e) => onUpdate?.('question', e.target.value)}
                            className="w-full text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 text-center border-b-2 border-pink-300 focus:outline-none focus:border-pink-500 transition-colors"
                            maxLength={60}
                        />
                    ) : (
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
                            {defaultData.question}
                        </h1>
                    )}
                </motion.div>

                {/* Character Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    className="relative mx-auto w-64 h-64 md:w-80 md:h-80"
                >
                    <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl">
                        <img
                            src={defaultData.characterImage}
                            alt="Character"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/400x400/FFE4E1/FF69B4?text=💕';
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
                        className="absolute -top-4 -right-4 text-6xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity
                        }}
                    >
                        💖
                    </motion.div>
                </motion.div>

                {/* Please Text (appears after clicking Not Sure) */}
                <AnimatePresence>
                    {showPlease && !isEditing && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: -20 }}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                        >
                            <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-2xl border-4 border-pink-400">
                                <p className="text-2xl font-bold text-pink-600">{defaultData.pleaseText}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    {/* YES Button */}
                    <motion.button
                        onClick={handleYesClick}
                        disabled={answered}
                        className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-black py-6 px-16 rounded-full shadow-2xl text-2xl relative overflow-hidden group disabled:opacity-50"
                        whileHover={{ scale: isEditing || answered ? 1 : 1.1 }}
                        whileTap={{ scale: isEditing || answered ? 1 : 0.95 }}
                    >
                        <span className="relative z-10">{defaultData.yesText} ❤️</span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.button>

                    {/* NOT SURE Button (shrinks on click) */}
                    <AnimatePresence>
                        {notSureScale > 0.1 && (
                            <motion.button
                                onClick={handleNotSureClick}
                                disabled={answered}
                                className="bg-gradient-to-r from-gray-400 to-gray-500 text-white font-bold py-4 px-12 rounded-full shadow-lg text-lg disabled:opacity-50"
                                animate={{ scale: notSureScale }}
                                exit={{ scale: 0, opacity: 0 }}
                                whileHover={{ scale: isEditing || answered ? notSureScale : notSureScale * 1.05 }}
                                whileTap={{ scale: isEditing || answered ? notSureScale : notSureScale * 0.95 }}
                            >
                                {defaultData.notSureText}
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Hint Text */}
                {notSureClicks === 0 && !answered && !isEditing && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="text-sm text-gray-500 italic"
                    >
                        (Psst... there's only one right answer 😉)
                    </motion.p>
                )}

                {/* Success Message */}
                {answered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-pink-500/20 backdrop-blur-sm z-30"
                    >
                        <div className="text-center space-y-4">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="text-9xl"
                            >
                                🎉
                            </motion.div>
                            <h2 className="text-5xl font-black text-white drop-shadow-lg">Yayyy!</h2>
                            <p className="text-2xl text-white font-bold">I knew you'd say yes! 💖</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Page4Question;
