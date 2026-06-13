import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Sparkles, Star, Quote, ChevronRight, MessageCircle, MoveRight } from 'lucide-react';

interface Page4MessageCardsProps {
    data: {
        card1Heading?: string;
        card1Body?: string;
        card2MainText?: string;
        card2Subtext?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4MessageCards = ({ data, onNext, isEditing = false, onUpdate }: Page4MessageCardsProps) => {
    const [step, setStep] = useState(0);

    const defaultData = {
        card1Heading: data.card1Heading || "The Architecture of Joy",
        card1Body: data.card1Body || "Every moment spent with you is a moment I treasure forever. You bring so much joy into my life, turning the ordinary into the extraordinary.",
        card2MainText: data.card2MainText || "Echoes of Eternity",
        card2Subtext: data.card2Subtext || "The laughs, the talks, the moments... they reside forever in the gallery of my heart."
    };

    const handleNext = () => {
        if (step === 0) setStep(1);
        else onNext();
    };

    return (
        <div
            onClick={!isEditing ? handleNext : undefined}
            className="min-h-screen relative overflow-hidden bg-[#05050a] flex flex-col items-center justify-center p-6 md:p-12 font-outfit cursor-pointer isolate"
        >
            {/* Cinematic Background Environment */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(236,72,153,0.1),transparent_60%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.1),transparent_60%)]" />

                {/* Floating Gilded Particles */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1px] h-[1px] bg-pink-400/20 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -150, 0], opacity: [0, 0.4, 0] }}
                        transition={{ duration: 6 + Math.random() * 6, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-4xl h-[600px] flex flex-col items-center justify-center">

                <AnimatePresence mode="wait">
                    {step === 0 ? (
                        <motion.div
                            key="card1"
                            initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                            exit={{ opacity: 0, scale: 1.1, y: -50, rotateX: -15, filter: 'blur(20px)' }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative w-full aspect-[4/3] max-h-[500px] bg-gradient-to-br from-pink-600/90 to-fuchsia-800/90 backdrop-blur-3xl rounded-[4rem] p-12 md:p-20 shadow-[0_60px_100px_-20px_rgba(236,72,153,0.4)] border border-white/20 overflow-hidden group"
                        >
                            {/* Card Decoration */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 blur-[50px] rounded-full pointer-events-none" />
                            <Quote className="absolute top-12 left-12 w-24 h-24 text-white/10" />

                            <div className="relative z-10 h-full flex flex-col justify-center space-y-12">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full w-fit"
                                >
                                    <Star size={12} className="text-yellow-200 fill-current" />
                                    <span className="text-white/60 font-black uppercase tracking-[0.4em] text-[8px]">Legacy Chapter 01</span>
                                </motion.div>

                                <div className="space-y-6">
                                    <h3 className="text-4xl md:text-7xl font-black text-white font-romantic leading-tight drop-shadow-2xl">
                                        {defaultData.card1Heading}
                                    </h3>
                                    <p className="text-xl md:text-3xl text-white/90 font-lovely italic leading-relaxed">
                                        "{defaultData.card1Body}"
                                    </p>
                                </div>
                            </div>

                            {/* Kinetic Signal */}
                            <div className="absolute bottom-12 right-12 flex items-center gap-3 text-white/40">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Observe</span>
                                <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-white rounded-full" />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="card2"
                            initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: -15, filter: 'blur(20px)' }}
                            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.1, y: -30, rotateX: 15 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative w-full aspect-[4/3] max-h-[500px] bg-white/[0.03] backdrop-blur-3xl rounded-[4rem] p-12 md:p-20 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)] border border-white/5 overflow-hidden group isolate"
                        >
                            {/* High-Gloss Ambient Light */}
                            <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-500/10 blur-[100px] pointer-events-none" />

                            <div className="relative z-10 h-full flex flex-col justify-center space-y-12">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-20 h-20 bg-pink-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-pink-500/40 rotate-12"
                                >
                                    <Heart size={32} fill="white" className="text-white" />
                                </motion.div>

                                <div className="space-y-6">
                                    <h3 className="text-4xl md:text-7xl font-black text-white font-romantic leading-tight drop-shadow-2xl">
                                        {defaultData.card2MainText}
                                    </h3>
                                    <p className="text-xl md:text-3xl text-pink-400 font-lovely italic leading-relaxed">
                                        "{defaultData.card2Subtext}"
                                    </p>
                                </div>

                                {/* Professional Signature Indicator */}
                                <div className="pt-8 flex items-center gap-6 border-t border-white/5">
                                    <MessageCircle size={16} className="text-pink-500/40" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 italic">Validated by Memory</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Instruction Navigation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-20 flex flex-col items-center gap-8"
            >
                <div className="flex gap-4">
                    <div className={`w-3 h-3 rounded-full transition-all duration-500 ${step === 0 ? 'bg-pink-500 w-12' : 'bg-white/10'}`} />
                    <div className={`w-3 h-3 rounded-full transition-all duration-500 ${step === 1 ? 'bg-pink-500 w-12' : 'bg-white/10'}`} />
                </div>

                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 flex items-center gap-4 group">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">Interaction Required:</span>
                    Tap Anywhere To Advance
                    <MoveRight className="w-4 h-4 text-pink-500 animate-pulse" />
                </p>
            </motion.div>

            {/* Status Metadata */}
            <div className="fixed bottom-12 right-12 opacity-10 flex flex-col items-end gap-2">
                <div className="h-[1px] w-24 bg-white" />
                <span className="text-[8px] font-black tracking-widest uppercase text-white">Transmission: Verified</span>
            </div>

        </div>
    );
};

export default Page4MessageCards;
