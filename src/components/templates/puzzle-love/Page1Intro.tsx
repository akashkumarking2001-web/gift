import { motion } from 'framer-motion';
import { Puzzle } from 'lucide-react';

interface Page1IntroProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Intro = ({ data, onNext, isEditing = false, onUpdate }: Page1IntroProps) => {
    const defaultData = {
        text: data.text || "Our love is like a puzzle, but there's one piece still missing. Can you find it?"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-center p-8 text-center text-blue-100">
            {/* Deep Blue Mystery Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(29,78,216,0.15)_0%,transparent_70%)]" />

            <div className="relative z-10 max-w-4xl">
                {/* Floating Puzzle Icon */}
                <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12 flex justify-center"
                >
                    <div className="p-10 bg-blue-600/20 rounded-[3rem] border border-blue-500/30 backdrop-blur-3xl shadow-[0_0_80px_rgba(37,99,235,0.3)]">
                        <Puzzle size={80} className="text-blue-400" />
                    </div>
                </motion.div>

                {/* Intro Text */}
                <div
                    className={`relative group ${isEditing ? 'cursor-pointer hover:bg-white/5 px-10 py-6 rounded-3xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Intro Text:", defaultData.text);
                            if (val !== null) onUpdate?.('text', val);
                        }
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-7xl font-black font-lovely leading-tight tracking-tight shadow-blue-900/40 drop-shadow-2xl"
                    >
                        {defaultData.text}
                    </motion.h1>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Double Click to Edit Intro</span>
                        </div>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="mt-24 group relative px-16 py-6 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.5em] rounded-full shadow-[0_30px_60px_-15px_rgba(37,99,235,0.5)] transition-all"
                >
                    Solve the Mystery →
                </motion.button>
            </div>

            {/* Glowing background shapes */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-32 h-32 border border-blue-500/10 rounded-2xl"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                    }}
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity
                    }}
                />
            ))}
        </div>
    );
};

export default Page1Intro;
