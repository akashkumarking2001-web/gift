import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Trophy, RefreshCw, ChevronRight, Heart, Star, Zap, Puzzle } from 'lucide-react';

const Page2Game = ({ data, onNext }: any) => {
    const emojis = ['🎂', '🎁', '💖', '⭐', '🎈', '🍕', '📷', '🎬'];
    const [cards, setCards] = useState<{ id: number, emoji: string, flipped: boolean, matched: boolean }[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const doubleEmojis = [...emojis, ...emojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
        setCards(doubleEmojis);
    }, []);

    const handleFlip = (id: number) => {
        if (flipped.length === 2 || cards[id].flipped || cards[id].matched) return;

        const newCards = [...cards];
        newCards[id].flipped = true;
        setCards(newCards);

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            if (cards[newFlipped[0]].emoji === cards[newFlipped[1]].emoji) {
                setTimeout(() => {
                    const matchedCards = cards.map(c =>
                        (c.id === newFlipped[0] || c.id === newFlipped[1]) ? { ...c, matched: true } : c
                    );
                    setCards(matchedCards);
                    setFlipped([]);
                    if (matchedCards.every(c => c.matched)) setIsComplete(true);
                }, 600);
            } else {
                setTimeout(() => {
                    setCards(cards => cards.map(c =>
                        (c.id === newFlipped[0] || c.id === newFlipped[1]) ? { ...c, flipped: false } : c
                    ));
                    setFlipped([]);
                }, 1000);
            }
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050508] flex flex-col items-center justify-start py-20 px-6 font-outfit select-none isolate">

            {/* Stats Header */}
            <div className="relative z-20 flex items-center justify-between w-full max-w-2xl mb-12">
                <div className="flex flex-col items-start gap-1">
                    <span className="text-cyan-400 font-black uppercase tracking-[0.3em] text-[10px]">Moves Count</span>
                    <span className="text-white text-3xl font-black">{moves}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group">
                        <Puzzle size={24} className="text-pink-500 animate-pulse" />
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="text-pink-400 font-black uppercase tracking-[0.3em] text-[10px]">Matched</span>
                    <span className="text-white text-3xl font-black">{cards.filter(c => c.matched).length / 2} / 8</span>
                </div>
            </div>

            {/* GAME GRID */}
            <div className="relative z-10 grid grid-cols-4 gap-4 md:gap-6 w-full max-w-2xl">
                {cards.map((card) => (
                    <motion.div
                        key={card.id}
                        className="aspect-square perspective-1000"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFlip(card.id)}
                    >
                        <motion.div
                            className="relative w-full h-full transform-style-3d cursor-pointer"
                            initial={false}
                            animate={{ rotateY: (card.flipped || card.matched) ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            {/* Front of Card */}
                            <div className="absolute inset-0 backface-hidden bg-white/5 border-2 border-white/10 rounded-2xl flex items-center justify-center shadow-lg isolate overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-pink-500/10 group-hover:opacity-100 opacity-0 transition-opacity" />
                                <div className="text-white/20 font-black text-2xl group-hover:text-cyan-500 transition-colors">?</div>
                            </div>

                            {/* Back of Card */}
                            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                                <span className="text-4xl md:text-5xl drop-shadow-lg">{card.emoji}</span>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* COMPLETION OVERLAY */}
            <AnimatePresence>
                {isComplete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-50 bg-[#050508]/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-8"
                        >
                            <div className="flex justify-center mb-4">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="p-8 bg-cyan-500/20 rounded-full border border-cyan-500/40 relative"
                                >
                                    <Trophy size={80} className="text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
                                </motion.div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-5xl font-black text-white font-romantic tracking-tight">Challenge Complete!</h2>
                                <p className="text-cyan-400 font-bold uppercase tracking-[0.4em] text-sm">
                                    You finished in {moves} moves
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onNext}
                                className="px-16 py-6 bg-white text-black font-black text-xs uppercase tracking-[0.5em] rounded-2xl flex items-center gap-3 mx-auto shadow-2xl"
                            >
                                <span>Unlock Memories</span>
                                <ChevronRight size={18} />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 1; }
                }
            `}} />
        </div>
    );
};

export default Page2Game;
