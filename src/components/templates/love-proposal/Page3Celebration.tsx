import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface Page3CelebrationProps {
    data: {
        celebrationMsg?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Celebration = ({ data, onNext, isEditing = false, onUpdate }: Page3CelebrationProps) => {
    const defaultData = {
        celebrationMsg: data.celebrationMsg || "YAY! You've made me the happiest person ever! ❤️"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0202] flex flex-col items-center justify-center p-8 text-center text-white">
            {/* Grand Celebration Aura */}
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute w-[800px] h-[800px] bg-red-600 blur-[150px] rounded-full"
            />

            <div className="relative z-10 max-w-4xl">
                {/* 3D Pulsing Heart */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.1 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="mb-16 flex justify-center"
                >
                    <div className="relative">
                        <Heart size={180} fill="#dc2626" className="text-red-600 drop-shadow-[0_0_80px_rgba(220,38,38,0.8)]" />
                        <motion.div
                            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 bg-red-500 rounded-full"
                        />
                        <Sparkles className="absolute -top-10 -right-10 text-yellow-400 w-20 h-20 animate-pulse" />
                    </div>
                </motion.div>

                {/* Celebration Message */}
                <div
                    className={`relative group mb-12 ${isEditing ? 'cursor-pointer hover:bg-white/5 px-12 py-8 rounded-[3rem] transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Celebration Message:", defaultData.celebrationMsg);
                            if (val !== null) onUpdate?.('celebrationMsg', val);
                        }
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-8xl font-black font-lovely leading-tight"
                    >
                        {defaultData.celebrationMsg}
                    </motion.h1>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Double Click to Edit Message</span>
                        </div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-20"
                >
                    <button
                        onClick={onNext}
                        className="px-16 py-6 bg-white text-red-600 font-black text-sm md:text-base uppercase tracking-[0.5em] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
                    >
                        The Final Vow →
                    </button>
                    <p className="mt-8 text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Forever starts now</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Page3Celebration;
