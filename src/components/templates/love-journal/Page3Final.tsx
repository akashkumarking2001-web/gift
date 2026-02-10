import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Page3FinalProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Final = ({ data, onNext, isEditing = false, onUpdate }: Page3FinalProps) => {
    const defaultData = {
        text: data.text || "Thank you for being the most beautiful part of my journal. I love you! ❤️"
    };

    useEffect(() => {
        if (!isEditing) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#7c2d12', '#9a3412', '#ffffff']
            });
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0905] flex flex-col items-center justify-center p-8 text-center text-orange-200/80">
            {/* Final Journal Aura */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-[800px] h-[800px] bg-orange-900/10 blur-[150px] rounded-full"
            />

            <div className="relative z-10 max-w-4xl">
                {/* Floating Journal Success Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.1 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="mb-16 flex justify-center"
                >
                    <div className="relative">
                        <Heart size={160} fill="#7c2d12" className="text-orange-950 opacity-40 drop-shadow-[0_0_80px_rgba(124,45,18,0.4)]" />
                        <motion.div
                            animate={{ scale: [1, 1.6], opacity: [0.2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-orange-900 rounded-full"
                        />
                        <Sparkles className="absolute -top-10 -right-10 text-orange-900/40 w-20 h-20 animate-pulse" />
                    </div>
                </motion.div>

                {/* Final Narrative Text */}
                <div
                    className={`relative group mb-12 ${isEditing ? 'cursor-pointer hover:bg-white/5 px-12 py-8 rounded-[3rem] transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Conclusion Text:", defaultData.text);
                            if (val !== null) onUpdate?.('text', val);
                        }
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-8xl font-black font-romantic italic leading-tight"
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
                    transition={{ delay: 1 }}
                    className="mt-24 space-y-8"
                >
                    <button
                        onClick={() => window.location.reload()}
                        className="px-16 py-6 bg-[#fdfaf3] text-orange-950 font-black text-xs md:text-sm uppercase tracking-[0.6em] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all border border-orange-200"
                    >
                        Review the Journal
                    </button>
                    <p className="text-[10px] font-black text-orange-950/40 uppercase tracking-[0.5em] italic">
                        Every word written for you
                    </p>
                </motion.div>
            </div>

            {/* Subtle paper texture overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]" />
        </div>
    );
};

export default Page3Final;
