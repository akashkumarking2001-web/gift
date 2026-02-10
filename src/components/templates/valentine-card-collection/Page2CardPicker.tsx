import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Sparkles, Mail } from 'lucide-react';

interface Page2CardPickerProps {
    data: {
        cards?: Array<{
            front: string;
            back: string;
        }>;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page2CardPicker = ({ data, onNext, isEditing = false, onUpdate }: Page2CardPickerProps) => {
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

    const defaultData = {
        cards: data.cards && data.cards.length > 0 ? data.cards : [
            { front: "To My Soulmate", back: "You're the missing piece I never knew I was looking for. I love you more than words can say." },
            { front: "My Best Friend", back: "Life is so much better with you by my side. Thank you for always being there." },
            { front: "Eternal Love", back: "Every moment with you feels like a dream I never want to wake up from." }
        ]
    };

    const handleFlip = (index: number) => {
        if (!isEditing) {
            setFlippedIndex(flippedIndex === index ? null : index);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0406] flex flex-col items-center justify-center p-8 overflow-y-auto scrollbar-hide">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.05)_0%,transparent_70%)]" />

            <div className="relative z-10 w-full max-w-4xl text-center mb-16">
                <h2 className="text-3xl font-black text-rose-100 uppercase tracking-[0.4em] opacity-40">Pick Your Heart</h2>
            </div>

            {/* Cards Interface */}
            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                {defaultData.cards.map((card, index) => (
                    <div
                        key={index}
                        className="perspective-1000 h-[450px] group/cardContainer"
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
                            className={`w-full h-full relative preserve-3d cursor-pointer ${isEditing ? 'cursor-default' : ''}`}
                            onClick={() => handleFlip(index)}
                        >
                            {/* Front of Card */}
                            <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-rose-600 to-rose-950 rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center shadow-[0_30px_60px_-15px_rgba(225,29,72,0.4)] border border-rose-500/30 overflow-hidden group/front">
                                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-10" />
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-8 border border-white/20">
                                        <Heart size={32} fill="white" className="text-white" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white font-lovely tracking-tight leading-tight uppercase group-hover/front:scale-110 transition-transform">
                                        {card.front}
                                    </h3>
                                    <div className="mt-8 flex items-center gap-2">
                                        <Sparkles size={14} className="text-rose-300 opacity-40" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Click to Open</span>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/front:opacity-100 transition-opacity z-20"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const val = prompt("Edit Front Text:", card.front);
                                            if (val !== null) {
                                                const newCards = [...defaultData.cards];
                                                newCards[index] = { ...card, front: val };
                                                onUpdate?.('cards', newCards);
                                            }
                                        }}
                                    >
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest bg-rose-600/20 px-4 py-2 rounded-full border border-rose-500/30">Edit Front</span>
                                    </div>
                                )}
                            </div>

                            {/* Back of Card */}
                            <div
                                className="absolute inset-0 backface-hidden bg-[#fafafa] rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center shadow-2xl border border-rose-100 transform rotateY-180 overflow-hidden group/back"
                            >
                                <motion.div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ backgroundImage: 'radial-gradient(circle_at_1px_1px, #e11d48 1px, transparent 0)', backgroundSize: '40px 40px', opacity: 0.03 }}
                                />
                                <div className="relative z-10 flex flex-col items-center h-full pt-8">
                                    <Mail size={24} className="text-rose-200 mb-8" />
                                    <p className="text-rose-950 text-xl font-romantic leading-relaxed italic text-justify">
                                        "{card.back}"
                                    </p>
                                    <div className="mt-auto flex items-center gap-2 pb-4">
                                        <Heart size={14} fill="#e11d48" className="text-rose-600" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-900/40">Forever Yours</span>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div
                                        className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover/back:opacity-100 transition-opacity z-20"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const val = prompt("Edit Back Message:", card.back);
                                            if (val !== null) {
                                                const newCards = [...defaultData.cards];
                                                newCards[index] = { ...card, back: val };
                                                onUpdate?.('cards', newCards);
                                            }
                                        }}
                                    >
                                        <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-rose-200">Edit Back</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Termination Footer */}
            <div className="relative z-10 w-full max-w-xs mx-auto mt-auto pb-20">
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="w-full py-5 bg-[#fafafa] text-rose-600 border border-rose-200 rounded-full font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl transition-all"
                >
                    Final Reveal →
                </motion.button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotateY-180 { transform: rotateY(180deg); }
            `}} />
        </div>
    );
};

export default Page2CardPicker;
