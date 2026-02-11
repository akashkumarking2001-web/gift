import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Sparkles, Star, MoveRight, ShieldCheck, Zap } from 'lucide-react';

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
        { id: 1, text: defaultData.reason1, color: '#e11d48' },
        { id: 2, text: defaultData.reason2, color: '#f43f5e' },
        { id: 3, text: defaultData.reason3, color: '#be123c' },
        { id: 4, text: defaultData.reason4, color: '#9d174d' }
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
        <div className="min-h-screen relative overflow-hidden bg-[#0d0508] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* Hyper-Realistic Gilded Atmosphere */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(225,29,72,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(244,63,94,0.1),transparent_50%)]"
                />

                {/* Floating Micro-Particles */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1.5px] h-[1.5px] bg-rose-400/20 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 6 + Math.random() * 8, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-20">

                {/* Visual Header Anchor */}
                <div className="text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-rose-900/10 backdrop-blur-3xl px-12 py-3.5 rounded-full border border-rose-800/20 shadow-2xl mx-auto"
                    >
                        <ShieldCheck size={16} className="text-rose-500" />
                        <span className="text-rose-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Transmission Parameter 02</span>
                        <Zap size={16} className="text-rose-500 fill-current animate-pulse" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight tracking-[0.02em] drop-shadow-2xl"
                    >
                        {defaultData.heading}
                    </motion.h2>
                </div>

                {/* HIGH-FIDELITY GRID INTERFACE */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-40">
                    {reasons.map((reason, index) => (
                        <div
                            key={reason.id}
                            className="perspective-[2000px] aspect-square relative group/container"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ delay: index * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full h-full relative preserve-3d cursor-pointer"
                                onClick={() => toggleFlip(reason.id)}
                            >
                                <motion.div
                                    className="relative w-full h-full preserve-3d"
                                    animate={{ rotateY: flippedCards.has(reason.id) ? 180 : 0 }}
                                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    {/* FRONT FACE: Royal Gilded Heart */}
                                    <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-rose-600 to-rose-950 rounded-[4rem] flex items-center justify-center p-8 shadow-[0_40px_100px_-30px_rgba(225,29,72,0.6)] border border-white/10 overflow-hidden isolate group/card">
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')] opacity-10 mix-blend-overlay" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:card:opacity-100 transition-opacity duration-700" />

                                        <div className="relative z-10 space-y-8 flex flex-col items-center">
                                            <div className="w-24 h-24 bg-white/[0.05] backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/10 shadow-2xl group-hover:card:scale-110 transition-transform duration-700">
                                                <Heart size={48} fill="white" className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]" />
                                            </div>

                                            <div className="flex items-center gap-4 opacity-30">
                                                <div className="h-[1px] w-8 bg-white" />
                                                <span className="text-[8px] font-black uppercase tracking-[0.4em]">Unseal Fragment</span>
                                                <div className="h-[1px] w-8 bg-white" />
                                            </div>
                                        </div>

                                        {/* Hover Frame */}
                                        <div className="absolute inset-6 border border-white/5 rounded-[3rem] opacity-0 group-hover:card:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                    </div>

                                    {/* BACK FACE: High-Density Text Letter */}
                                    <div className="absolute inset-0 backface-hidden rotateY-180 bg-[#fafafa] rounded-[4rem] p-12 flex flex-col items-center justify-center text-center shadow-2xl border border-rose-100 overflow-hidden isolate group/back">
                                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle_at_1px_1px, #e11d48 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                                        <div className="relative z-10 flex flex-col items-center justify-center h-full">
                                            <Sparkles size={24} className="text-rose-300 mb-8" />
                                            <p className="text-rose-950 text-2xl md:text-3xl font-romantic leading-[1.6] italic opacity-90 drop-shadow-sm">
                                                "{reason.text}"
                                            </p>

                                            <div className="mt-12 flex items-center gap-4">
                                                <Heart size={14} fill="#e11d48" className="text-rose-600 animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Professional Action Footer */}
                <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center gap-12 pb-40">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="group relative px-24 py-9 bg-[#0d0508] border-2 border-rose-900/30 rounded-[3.5rem] text-rose-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(225,29,72,0.3)] transition-all flex items-center gap-6 isolate overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-rose-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-[3.5rem]" />
                        <span className="relative z-10">Proceed To Memories</span>
                        <MoveRight className="relative z-10 w-6 h-6 border-2 border-rose-900/30 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                    </motion.button>

                    <div className="flex items-center gap-4 opacity-10">
                        <Star size={14} className="text-rose-500 fill-current" />
                        <span className="text-[8px] font-black tracking-[1em] uppercase text-white">Registry Status: In-Progress</span>
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotateY-180 { transform: rotateY(180deg); }
            `}} />

        </div>
    );
};

export default Page2WhyYou;
