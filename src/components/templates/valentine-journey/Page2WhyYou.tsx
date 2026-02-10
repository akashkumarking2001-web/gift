import { motion } from 'framer-motion';
import { useState } from 'react';

interface Page2WhyYouProps {
    data: {
        heading?: string;
        reason1?: string;
        reason2?: string;
        reason3?: string;
        reason4?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2WhyYou = ({ data, onNext, isEditing = false, onUpdate }: Page2WhyYouProps) => {
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

    const defaultData = {
        heading: data.heading || "Why you?",
        reason1: data.reason1 || "Because of your smile",
        reason2: data.reason2 || "You make me laugh",
        reason3: data.reason3 || "You are my best friend",
        reason4: data.reason4 || "Your kind heart"
    };

    const reasons = [
        { id: 1, text: defaultData.reason1, color: '#f04299' },
        { id: 2, text: defaultData.reason2, color: '#fb923c' },
        { id: 3, text: defaultData.reason3, color: '#f04299' },
        { id: 4, text: defaultData.reason4, color: '#a855f7' }
    ];

    const toggleFlip = (id: number) => {
        if (isEditing) return;
        setFlippedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 flex flex-col items-center justify-center p-4">
            {/* Wavy Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 320">
                    <path fill="#f04299" fillOpacity="0.3" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320">
                    <path fill="#a855f7" fillOpacity="0.3" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,181.3C960,160,1056,128,1152,128C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mb-12 text-center"
            >
                {isEditing ? (
                    <input
                        type="text"
                        value={defaultData.heading}
                        onChange={(e) => onUpdate?.('heading', e.target.value)}
                        className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 text-center border-b-2 border-pink-300 focus:outline-none focus:border-pink-500 transition-colors"
                        maxLength={30}
                    />
                ) : (
                    <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600">
                        {defaultData.heading}
                    </h1>
                )}
            </motion.div>

            {/* Heart Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-8 max-w-3xl w-full mb-12">
                {reasons.map((reason, index) => (
                    <motion.div
                        key={reason.id}
                        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6, type: 'spring' }}
                        className="relative aspect-square cursor-pointer"
                        style={{ perspective: '1000px' }}
                        onClick={() => toggleFlip(reason.id)}
                    >
                        <motion.div
                            className="relative w-full h-full"
                            animate={{ rotateY: flippedCards.has(reason.id) ? 180 : 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {/* Front - Heart Shape */}
                            <div
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ backfaceVisibility: 'hidden' }}
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
                                    <defs>
                                        <filter id={`glow-${reason.id}`}>
                                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                                            <feMerge>
                                                <feMergeNode in="coloredBlur" />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>
                                    <path
                                        d="M50,85 C50,85 20,60 20,40 C20,25 30,20 40,25 C45,27.5 50,35 50,35 C50,35 55,27.5 60,25 C70,20 80,25 80,40 C80,60 50,85 50,85 Z"
                                        fill={reason.color}
                                        filter={`url(#glow-${reason.id})`}
                                        className="hover:opacity-90 transition-opacity"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-white text-4xl md:text-5xl">💖</span>
                                </div>
                            </div>

                            {/* Back - Reason Text */}
                            <div
                                className="absolute inset-0 flex items-center justify-center p-6"
                                style={{
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}
                            >
                                <div
                                    className="w-full h-full rounded-3xl shadow-2xl flex items-center justify-center p-6"
                                    style={{ backgroundColor: reason.color }}
                                >
                                    {isEditing ? (
                                        <textarea
                                            value={reason.text}
                                            onChange={(e) => onUpdate?.(`reason${reason.id}`, e.target.value)}
                                            className="w-full h-full bg-white/20 text-white text-center font-bold text-lg md:text-xl rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                                            maxLength={100}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    ) : (
                                        <p className="text-white text-center font-bold text-lg md:text-xl leading-relaxed">
                                            {reason.text}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Tap Hint (only show on first card if not flipped) */}
                        {index === 0 && !flippedCards.has(reason.id) && !isEditing && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 whitespace-nowrap"
                            >
                                👆 Tap to reveal
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Next Button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                onClick={onNext}
                className="relative z-10 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Continue →
            </motion.button>

            {/* Floating Hearts */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-3xl opacity-20 pointer-events-none"
                    style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        delay: i * 0.5
                    }}
                >
                    💕
                </motion.div>
            ))}
        </div>
    );
};

export default Page2WhyYou;
