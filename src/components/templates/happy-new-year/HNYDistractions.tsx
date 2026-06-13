import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, X, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const HNYDistractions = ({ data, onNext }: any) => {
    const initialCards = [
        { id: 4, text: "Distance", color: "bg-green-400" },
        { id: 3, text: "Work", color: "bg-pink-400" },
        { id: 2, text: "Bad Days", color: "bg-blue-400" },
        { id: 1, text: "Stress", color: "bg-yellow-400" },
    ];

    const [cards, setCards] = useState(initialCards);
    const [isRevealed, setIsRevealed] = useState(false);

    const handleRemove = (id: number) => {
        setCards(prev => {
            const next = prev.filter(c => c.id !== id);
            if (next.length === 0) {
                setTimeout(() => {
                    setIsRevealed(true);
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#FBBF24', '#3B82F6', '#EC4899', '#10B981']
                    });
                }, 500);
            }
            return next;
        });
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#09050f] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            <div className="relative z-20 text-center mb-16 space-y-4">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white text-2xl md:text-3xl font-light"
                >
                    Something is waiting for you
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="text-white uppercase tracking-[0.2em] text-[10px] font-bold"
                >
                    Move the little distractions aside
                </motion.p>
            </div>

            {/* CARD STACK AREA */}
            <div className="relative w-full max-w-sm h-80 flex items-center justify-center">
                <AnimatePresence>
                    {!isRevealed ? (
                        cards.map((card, index) => (
                            <motion.div
                                key={card.id}
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                onDragEnd={(_, info) => {
                                    if (Math.abs(info.offset.x) > 100 || Math.abs(info.offset.y) > 100) {
                                        handleRemove(card.id);
                                    }
                                }}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                    rotate: (cards.length - 1 - index) * 2 - 1,
                                    z: index * 10
                                }}
                                exit={{
                                    x: (Math.random() - 0.5) * 1000,
                                    y: (Math.random() - 0.5) * 1000,
                                    rotate: (Math.random() - 0.5) * 90,
                                    opacity: 0
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={`absolute w-64 h-80 ${card.color} rounded-[2rem] shadow-2xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing border-4 border-black/5 p-8 text-center overflow-hidden`}
                                style={{ zIndex: card.id }}
                            >
                                <div className="absolute top-4 right-4 text-black/20">
                                    <X size={24} />
                                </div>

                                <span className="text-black/80 text-3xl font-black tracking-tighter">
                                    {card.text}
                                </span>

                                {/* Inner Decorative Mesh */}
                                <div className="absolute inset-0 bg-white/10 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

                                <div className="mt-8 text-black/40 font-bold uppercase tracking-[0.2em] text-[10px]">
                                    Flick me away
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ scale: 0, rotate: -20 }}
                            animate={{ scale: 1, rotate: 0 }}
                            onClick={onNext}
                            className="relative cursor-pointer group"
                        >
                            <div className="w-48 h-48 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(251,191,36,0.5)] border-4 border-white/20">
                                <Gift className="w-24 h-24 text-white drop-shadow-lg" />
                            </div>

                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute -top-4 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-yellow-100"
                            >
                                <Sparkles className="text-yellow-500" size={24} />
                            </motion.div>

                            <div className="mt-12 text-center">
                                <span className="text-yellow-400 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">
                                    Tap the gift to open
                                </span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* DECORATIVE BACKGROUND TEXT */}
            <div className="absolute bottom-10 flex gap-4 opacity-5 pointer-events-none text-white font-black uppercase tracking-[0.5em] text-[10px]">
                <span>Filter Stress</span>
                <span>•</span>
                <span>Filter Distance</span>
                <span>•</span>
                <span>Find Joy</span>
            </div>
        </div>
    );
};

export default HNYDistractions;
