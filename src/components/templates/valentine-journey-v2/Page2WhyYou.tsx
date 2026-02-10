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
        heading: data.heading || "Why I Love You",
        reason1: data.reason1 || "Your smile lights up my world",
        reason2: data.reason2 || "You make every day special",
        reason3: data.reason3 || "Your kindness inspires me",
        reason4: data.reason4 || "You're my best friend"
    };

    const reasons = [
        { id: 1, text: defaultData.reason1, color: 'from-pink-500 to-rose-500', emoji: '😊' },
        { id: 2, text: defaultData.reason2, color: 'from-rose-500 to-orange-500', emoji: '✨' },
        { id: 3, text: defaultData.reason3, color: 'from-orange-500 to-pink-500', emoji: '💫' },
        { id: 4, text: defaultData.reason4, color: 'from-pink-600 to-rose-600', emoji: '🌟' }
    ];

    const toggleCard = (id: number) => {
        const newFlipped = new Set(flippedCards);
        if (newFlipped.has(id)) {
            newFlipped.delete(id);
        } else {
            newFlipped.add(id);
        }
        setFlippedCards(newFlipped);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500 flex items-center justify-center p-4">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hearts-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <text x="10" y="30" fontSize="40" fill="white">💕</text>
                            <text x="60" y="80" fontSize="30" fill="white">💖</text>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hearts-pattern)" />
                </svg>
            </div>

            {/* Floating Hearts */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="absolute text-5xl opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 3,
                        delay: Math.random() * 5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    {i % 2 === 0 ? '💕' : '💗'}
                </motion.div>
            ))}

            {/* Main Content */}
            <div className="relative z-10 max-w-6xl w-full">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="text-center mb-16 relative group"
                >
                    <div
                        className={`relative inline-block px-12 py-4 ${isEditing ? 'cursor-pointer hover:bg-white/5 rounded-2xl transition-all' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Heading:", defaultData.heading);
                                if (val) onUpdate?.('heading', val);
                            }
                        }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl font-romantic gradient-text leading-tight">
                            {defaultData.heading}
                        </h1>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">Double Click to Edit Heading</span>
                            </div>
                        )}
                    </div>
                    <motion.div
                        className="mt-6 text-7xl inline-block"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                    >
                        💖
                    </motion.div>
                </motion.div>

                {/* Reason Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto px-4">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={reason.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.2 * index,
                                duration: 0.8,
                                type: 'spring'
                            }}
                            className="perspective-1000 group/card"
                        >
                            <motion.div
                                className="relative h-72 cursor-pointer"
                                onClick={() => toggleCard(reason.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    className="absolute inset-0 w-full h-full preserve-3d"
                                    animate={{ rotateY: flippedCards.has(reason.id) ? 180 : 0 }}
                                    transition={{ duration: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {/* Front of Card */}
                                    <div
                                        className="absolute inset-0 w-full h-full rounded-[2.5rem] shadow-2xl overflow-hidden glass-card-static border-2 border-white/20"
                                        style={{ backfaceVisibility: 'hidden' }}
                                    >
                                        <div className={`w-full h-full bg-gradient-to-br ${reason.color} p-8 flex flex-col items-center justify-center relative overflow-hidden`}>
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                                            <motion.div
                                                className="text-8xl mb-6 drop-shadow-lg"
                                                animate={{
                                                    y: [0, -10, 0],
                                                    scale: [1, 1.05, 1]
                                                }}
                                                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                                            >
                                                {reason.emoji}
                                            </motion.div>
                                            <div className="text-white text-3xl font-black uppercase tracking-widest drop-shadow-md">
                                                Reason <span className="text-white/60">#0{reason.id}</span>
                                            </div>
                                            <div className="mt-4 flex items-center gap-2">
                                                <div className="w-8 h-[2px] bg-white/30 rounded-full" />
                                                <span className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">Click to Flip</span>
                                                <div className="w-8 h-[2px] bg-white/30 rounded-full" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back of Card */}
                                    <div
                                        className="absolute inset-0 w-full h-full rounded-[2.5rem] shadow-2xl overflow-hidden glass-card-static border-2 border-primary/20 bg-white"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)'
                                        }}
                                    >
                                        <div
                                            className="w-full h-full p-10 flex flex-col items-center justify-center relative group/edit"
                                            onDoubleClick={(e) => {
                                                if (isEditing) {
                                                    e.stopPropagation();
                                                    const val = prompt(`Edit Reason #${reason.id}:`, reason.text);
                                                    if (val) onUpdate?.(`reason${reason.id}`, val);
                                                }
                                            }}
                                        >
                                            <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-rose-700 text-center leading-relaxed font-lovely italic">
                                                "{reason.text}"
                                            </p>

                                            {isEditing && (
                                                <div className="absolute bottom-6 opacity-0 group-hover/edit:opacity-100 transition-opacity">
                                                    <span className="text-[8px] font-black text-pink-600/40 uppercase tracking-[0.4em]">Double Click to Edit Content</span>
                                                </div>
                                            )}

                                            <div className="absolute top-6 right-8 text-4xl opacity-10 grayscale">
                                                {reason.emoji}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Next Button */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex justify-center mt-20"
                >
                    <motion.button
                        onClick={onNext}
                        className="group relative overflow-hidden px-16 py-8 rounded-[2.5rem] bg-white text-rose-600 font-black text-sm uppercase tracking-[0.4em] shadow-[0_25px_60px_-15px_rgba(255,255,255,0.4)] hover:shadow-[0_35px_80px_-15px_rgba(255,255,255,0.5)] transition-all"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-orange-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                        />
                        <span className="relative z-10 flex items-center gap-4">
                            Keep Exploring
                            <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Decorative Corner Elements */}
            <motion.div
                className="absolute top-10 left-10 text-9xl opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                💕
            </motion.div>
            <motion.div
                className="absolute bottom-10 right-10 text-9xl opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
                💗
            </motion.div>

            {/* Sparkle Effects */}
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

export default Page2WhyYou;
