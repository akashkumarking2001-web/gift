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
            {/* Floating Hearts - Optimized */}
            {/* Floating Hearts & Icons - Dense Animation */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="absolute text-4xl md:text-6xl opacity-20 pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -100, 0],
                        rotate: [0, 360],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: Math.random() * 5
                    }}
                >
                    {['💕', '💗', '💖', '🥰', '😍', '✨', '💝'][i % 7]}
                </motion.div>
            ))}

            {/* Extra Floating Particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className="absolute w-2 h-2 md:w-3 md:h-3 bg-white/30 rounded-full pointer-events-none blur-[1px]"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -50, 0],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: Math.random() * 5
                    }}
                />
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
                        className={`relative inline-block px-12 py-4 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-2xl transition-all border-2 border-transparent hover:border-white/20' : ''}`}
                        onClick={() => {
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
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    ✏️ Edit Heading
                                </span>
                            </div>
                        )}
                    </div>
                    <motion.div
                        className="mt-6 text-7xl inline-block drop-shadow-lg filter"
                        animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                            filter: ['drop-shadow(0 0 0px #fff)', 'drop-shadow(0 0 10px #ff69b4)', 'drop-shadow(0 0 0px #fff)']
                        }}
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
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                                            {/* Corner Decoration */}
                                            <div className="absolute top-4 right-4 text-4xl opacity-20 rotate-12">✨</div>
                                            <div className="absolute bottom-4 left-4 text-4xl opacity-20 -rotate-12">🌟</div>

                                            <motion.div
                                                className="text-8xl mb-6 drop-shadow-lg transform transition-transform duration-500 hover:scale-110"
                                                animate={{
                                                    y: [0, -10, 0],
                                                    rotate: [0, 5, -5, 0]
                                                }}
                                                transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                                            >
                                                {reason.emoji}
                                            </motion.div>
                                            <div className="text-white text-3xl font-black uppercase tracking-widest drop-shadow-md relative z-10">
                                                Reason <span className="text-white/80">#0{reason.id}</span>
                                            </div>
                                            <div className="mt-6 flex items-center gap-3 opacity-60">
                                                <div className="w-8 h-[2px] bg-white rounded-full" />
                                                <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Tap to Flip</span>
                                                <div className="w-8 h-[2px] bg-white rounded-full" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back of Card */}
                                    <div
                                        className="absolute inset-0 w-full h-full rounded-[2.5rem] shadow-2xl overflow-hidden glass-card-static border-2 border-primary/20 bg-[#fffdf8]"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)',
                                            backgroundImage: `url('https://www.transparenttextures.com/patterns/cardboard.png')`,
                                            backgroundBlendMode: 'multiply'
                                        }}
                                    >
                                        {/* Aesthetic Corner Element */}
                                        <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                                            <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-rose-500">
                                                <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100 C80 100 100 80 100 50 C100 20 80 0 50 0 Z M50 90 C30 90 10 70 10 50 C10 30 30 10 50 10 C70 10 90 30 90 50 C90 70 70 90 50 90 Z" />
                                                <path d="M50 20 Q65 5 80 20 Q95 35 80 50 Q65 65 50 80 Q35 65 20 50 Q5 35 20 20 Q35 5 50 20 Z" fill="currentColor" opacity="0.5" />
                                            </svg>
                                        </div>

                                        <div className="w-full h-full p-10 flex flex-col items-center justify-center relative">
                                            <p className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-pink-600 to-rose-700 text-center leading-relaxed font-lovely italic relative z-10">
                                                "{reason.text}"
                                            </p>

                                            {/* Edit Button */}
                                            {isEditing && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const val = prompt(`Edit Reason #${reason.id}:`, reason.text);
                                                        if (val) onUpdate?.(`reason${reason.id}`, val);
                                                    }}
                                                    className="absolute bottom-6 bg-white/80 backdrop-blur-sm border border-rose-200 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-rose-50 transition-colors z-20 group/btn"
                                                >
                                                    <span className="text-lg">✏️</span>
                                                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest group-hover/btn:text-rose-600">Edit Reason</span>
                                                </button>
                                            )}

                                            <div className="absolute bottom-6 right-8 text-4xl opacity-10 grayscale rotate-180">
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
                        className="group relative overflow-hidden px-12 py-6 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Keep Exploring
                            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
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
            {/* Minimal Sparkle Effects */}
            {[...Array(8)].map((_, i) => (
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
                        delay: Math.random() * 5,
                        repeat: Infinity
                    }}
                />
            ))}
        </div>
    );
};

export default Page2WhyYou;
