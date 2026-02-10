import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Page3ConclusionProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Conclusion = ({ data, onNext, isEditing = false, onUpdate }: Page3ConclusionProps) => {
    const defaultData = {
        text: data.text || "And that's why you're my everything. Happy Valentine's Day! ❤️"
    };

    useEffect(() => {
        if (!isEditing) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#f43f5e', '#ec4899', '#ffffff']
            });
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0001] flex flex-col items-center justify-center p-8 text-center">
            {/* Pulsing Aura */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-[800px] h-[800px] bg-rose-600 blur-[150px] rounded-full"
            />

            <div className="relative z-10 max-w-4xl">
                {/* Grand Celebration Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="mb-12 flex justify-center"
                >
                    <div className="relative">
                        <Heart size={160} fill="#f43f5e" className="text-rose-600 drop-shadow-[0_0_80px_rgba(244,63,94,0.8)]" />
                        <motion.div
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-rose-500 rounded-full"
                        />
                    </div>
                </motion.div>

                {/* Final Message */}
                <div
                    className={`relative group ${isEditing ? 'cursor-pointer hover:bg-white/5 px-12 py-8 rounded-[3rem] transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Conclusion Text:", defaultData.text);
                            if (val !== null) onUpdate?.('text', val);
                        }
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight"
                    >
                        {defaultData.text}
                    </motion.h1>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Double Click to Edit Conclusion</span>
                        </div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-24 space-y-8"
                >
                    <button
                        onClick={() => window.location.reload()}
                        className="px-16 py-6 bg-white text-rose-600 font-black text-sm md:text-base uppercase tracking-[0.5em] rounded-full shadow-[0_30px_60px_-15px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-95 transition-all"
                    >
                        Replay Experience
                    </button>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Forever Yours</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Page3Conclusion;
