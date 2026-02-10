import { motion } from 'framer-motion';
import { Sparkles, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Page2RevealProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Reveal = ({ data, onNext, isEditing = false, onUpdate }: Page2RevealProps) => {
    const defaultData = {
        text: data.text || "Surprise! I love you more than all the bamboo in the world! 🐼💕"
    };

    useEffect(() => {
        if (!isEditing) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#a855f7', '#d946ef', '#ffffff']
            });
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0515] flex flex-col items-center justify-center p-8 text-center">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)]" />

            <div className="relative z-10 max-w-3xl">
                {/* Floating Gift Box Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="mb-12 flex justify-center"
                >
                    <div className="relative w-40 h-40 bg-white/5 backdrop-blur-3xl border border-white/20 rounded-[2.5rem] flex items-center justify-center shadow-2xl">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        >
                            <Gift size={64} className="text-violet-500" />
                        </motion.div>
                        <Sparkles className="absolute -top-4 -right-4 text-yellow-400 w-12 h-12 animate-pulse" />
                    </div>
                </motion.div>

                {/* Secret Text Reveal */}
                <div
                    className={`relative group mb-16 ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-6 rounded-3xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Secret Text:", defaultData.text);
                            if (val !== null) onUpdate?.('text', val);
                        }
                    }}
                >
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-7xl font-black text-white font-lovely leading-tight tracking-tight drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                    >
                        {defaultData.text}
                    </motion.h2>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Double Click to Edit Reveal Message</span>
                        </div>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-12 py-5 bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-all font-black text-[10px] uppercase tracking-[0.5em]"
                >
                    One more thing... →
                </motion.button>
            </div>

            {/* Floating background bamboo sticks (Abstract) */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-32 bg-violet-600/5 rounded-full"
                    style={{
                        left: `${15 + i * 15}%`,
                        top: `${Math.random() * 50}%`
                    }}
                    animate={{
                        y: [-20, 20, -20],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    );
};

export default Page2Reveal;
