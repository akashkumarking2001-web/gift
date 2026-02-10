import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Page3CelebrationProps {
    data: {
        msg?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Celebration = ({ data, onNext, isEditing = false, onUpdate }: Page3CelebrationProps) => {
    const defaultData = {
        msg: data.msg || "Every beat of my heart is a proof of my love for you. Forever and always! ❤️"
    };

    useEffect(() => {
        if (!isEditing) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#dc2626', '#f43f5e', '#ffffff']
            });
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0505] flex flex-col items-center justify-center p-8 text-center text-red-50">
            {/* Celebration Aura */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-[800px] h-[800px] bg-red-600 blur-[150px] rounded-full"
            />

            <div className="relative z-10 max-w-4xl">
                {/* Floating Celebration heart */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.1 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="mb-16 flex justify-center"
                >
                    <div className="relative">
                        <Heart size={160} fill="#dc2626" className="text-red-600 drop-shadow-[0_0_80px_rgba(220,38,38,0.7)]" />
                        <motion.div
                            animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-red-500 rounded-full"
                        />
                        <Sparkles className="absolute -top-10 -right-10 text-red-300 w-20 h-20 animate-pulse" />
                    </div>
                </motion.div>

                {/* Final Narrative Text */}
                <div
                    className={`relative group mb-12 ${isEditing ? 'cursor-pointer hover:bg-white/5 px-12 py-8 rounded-[3rem] transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Final Message:", defaultData.msg);
                            if (val !== null) onUpdate?.('msg', val);
                        }
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-8xl font-black font-lovely leading-tight"
                    >
                        {defaultData.msg}
                    </motion.h1>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[10px] font-black text-rose-100/40 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Double Click to Edit Message</span>
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
                        className="px-16 py-6 bg-white text-red-600 font-black text-xs md:text-sm uppercase tracking-[0.6em] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
                    >
                        Listen Again
                    </button>
                    <p className="text-[10px] font-black text-red-100/20 uppercase tracking-[0.5em] italic">
                        In perfect rhythm with you
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Page3Celebration;
