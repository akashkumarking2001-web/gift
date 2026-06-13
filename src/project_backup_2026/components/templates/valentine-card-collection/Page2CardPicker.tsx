import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Sparkles, Mail, Star, MoveRight, ShieldCheck, Zap, Crown, Scroll } from 'lucide-react';

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
        <div className="min-h-screen relative overflow-hidden bg-[#1f0505] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* HYPER-REALISTIC ROYAL DECREE ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,83,9,0.15),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(220,38,38,0.1),transparent_50%)]"
                />

                {/* Damask Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 mix-blend-overlay" />

                {/* Floating Embers */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-amber-500/30 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -150, 0], opacity: [0, 0.6, 0] }}
                        transition={{ duration: 8 + Math.random() * 8, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Selection */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-red-950/40 backdrop-blur-3xl px-14 py-4 rounded-full border border-red-900/30 shadow-2xl mx-auto isolate"
                >
                    <Scroll size={16} className="text-amber-400" />
                    <span className="text-amber-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Royal Selection // Pending</span>
                    <Zap size={16} className="text-amber-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE SELECTION HEADER */}
                <div className="space-y-12 text-center max-w-6xl font-romantic">
                    <h2 className="text-5xl md:text-[8rem] font-black text-amber-50 leading-tight tracking-[0.02em] px-4 drop-shadow-[0_0_40px_rgba(180,83,9,0.4)] italic">
                        The Decrees
                    </h2>
                    <div className="h-[2px] w-[30rem] bg-gradient-to-r from-transparent via-amber-700/60 to-transparent mx-auto" />
                </div>

                {/* HIGH-FIDELITY FLIP CARDS */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 pb-40 px-4">
                    {defaultData.cards.map((card, index) => (
                        <div
                            key={index}
                            className="perspective-[2000px] h-[600px] relative group/container"
                        >
                            <motion.div
                                initial={false}
                                animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className={`w-full h-full relative preserve-3d cursor-pointer ${isEditing ? 'cursor-default' : ''}`}
                                onClick={() => handleFlip(index)}
                            >
                                {/* FRONT FACE: Royal Seal */}
                                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[#2a0a0a] to-[#1a0505] rounded-[3rem] p-10 flex flex-col items-center justify-center text-center shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-amber-900/30 overflow-hidden isolate group/card hover:border-amber-500/50 transition-colors duration-500">
                                    {/* Gold Foil Texture */}
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/gold-scale.png')] opacity-5 mix-blend-overlay" />

                                    <div className="relative z-10 space-y-12 w-full">
                                        <div className="w-32 h-32 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center mx-auto shadow-[0_20px_40px_rgba(180,83,9,0.4)] border-4 border-amber-900/50 group-hover/card:scale-110 transition-transform duration-700">
                                            <Crown size={48} className="text-amber-100 drop-shadow-md" />
                                        </div>

                                        <div className="space-y-6">
                                            <h3 className="text-3xl font-black text-amber-50 font-romantic leading-tight uppercase tracking-widest drop-shadow-lg">
                                                {card.front}
                                            </h3>
                                            <div className="flex items-center justify-center gap-4 opacity-40">
                                                <div className="h-[1px] w-12 bg-amber-500" />
                                                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-amber-200">Tap To Unseal</span>
                                                <div className="h-[1px] w-12 bg-amber-500" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative Corners */}
                                    <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-amber-500/30 rounded-tl-2xl" />
                                    <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-amber-500/30 rounded-br-2xl" />
                                </div>

                                {/* BACK FACE: Parchment Scroll */}
                                <div className="absolute inset-0 backface-hidden rotateY-180 bg-[#fefce8] rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border-[12px] border-[#2a0a0a] overflow-hidden isolate group/back">
                                    {/* Paper Texture */}
                                    <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

                                    <div className="relative z-10 flex flex-col items-center h-full pt-8 w-full">
                                        <div className="mb-8 opacity-40">
                                            <Scroll size={32} className="text-amber-900" />
                                        </div>

                                        <p className="text-amber-950/90 text-2xl md:text-3xl font-romantic leading-[1.6] italic drop-shadow-sm font-bold">
                                            "{card.back}"
                                        </p>

                                        <div className="mt-auto flex flex-col items-center gap-4 pb-4 w-full">
                                            <div className="h-[2px] w-1/2 bg-amber-900/20" />
                                            <div className="flex items-center gap-3 opacity-60">
                                                <Heart size={12} fill="#78350f" className="text-amber-900" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-900">Royal Decree Signed</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* PROFESSIONAL TACTICAL ACTION */}
                <div className="relative z-10 w-full max-w-4xl mx-auto pb-32 flex flex-col items-center gap-14">
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-28 py-10 bg-[#1f0505] border border-amber-900/40 rounded-[4rem] text-amber-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_50px_100px_-20px_rgba(180,83,9,0.3)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[420px]"
                    >
                        <div className="absolute inset-0 bg-amber-900 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                        <span className="relative z-10">Proceed To Finale</span>
                        <MoveRight className="relative z-10 w-8 h-8 border border-amber-800/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700" />
                    </motion.button>

                    <div className="flex flex-col items-center gap-6 opacity-20">
                        <div className="h-[1px] w-[40rem] bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-amber-300">Registry: Decrees Acknowledged</span>
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-red-900 italic">Decree</div>
                <div className="h-[1px] w-72 bg-red-900/40" />
                <span className="text-[10px] font-black tracking-widest text-amber-200 uppercase tracking-[1.5em]">SELECTION-VIEW // V4.02</span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotateY-180 { transform: rotateY(180deg); }
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />

        </div>
    );
};

export default Page2CardPicker;
