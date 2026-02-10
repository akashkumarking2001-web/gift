import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

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
        text: data.text || "There are so many reasons why I love you, but here are the top 5..."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0505] flex flex-col items-center justify-center p-8 text-center">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(251,113,133,0.1),transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(225,29,72,0.1),transparent_50%)]" />

            <div className="relative z-10 max-w-3xl">
                {/* 3D Icons Reveal */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", duration: 1.5 }}
                    className="mb-12 flex justify-center gap-4"
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        >
                            <Heart size={32} fill={i % 2 === 0 ? "#f43f5e" : "#fb7185"} className="text-transparent drop-shadow-lg" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Text */}
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
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-white font-romantic leading-tight"
                    >
                        {defaultData.text}
                    </motion.h1>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Double Click to Edit</span>
                        </div>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="mt-20 group relative px-12 py-5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-[2rem] text-white font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-rose-500/30"
                >
                    Start the List <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                </motion.button>
            </div>

            {/* Floating background petals/hearts */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-rose-500/10 text-4xl"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                    }}
                    animate={{
                        y: [-20, -150],
                        rotate: 360,
                        opacity: [0, 0.2, 0]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 10
                    }}
                >
                    🌸
                </motion.div>
            ))}
        </div>
    );
};

export default Page1Intro;
