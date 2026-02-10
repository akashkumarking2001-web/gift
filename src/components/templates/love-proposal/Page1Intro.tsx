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
        text: data.text || "I've been waiting for the perfect moment to tell you something..."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0202] flex flex-col items-center justify-center p-8 text-center">
            {/* Royal Red Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.15),transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(153,27,27,0.15),transparent_50%)]" />

            <div className="relative z-10 max-w-4xl">
                {/* Floating Elegant Heart */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 100 }}
                    className="mb-16 flex justify-center"
                >
                    <div className="p-10 bg-gradient-to-br from-red-600 to-red-900 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(220,38,38,0.5)] border border-red-500/30">
                        <Heart size={80} fill="white" className="text-white drop-shadow-lg" />
                    </div>
                </motion.div>

                {/* Intro Text */}
                <div
                    className={`relative group ${isEditing ? 'cursor-pointer hover:bg-white/5 px-10 py-6 rounded-[2.5rem] transition-all' : ''}`}
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
                        className="text-4xl md:text-7xl font-black text-white font-romantic leading-tight tracking-tight shadow-red-900/20 drop-shadow-xl"
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
                    className="mt-24 group relative px-16 py-6 bg-white text-red-600 font-black text-sm uppercase tracking-[0.5em] rounded-full shadow-[0_30px_60px_-15px_rgba(255,255,255,0.4)]"
                >
                    Continue →
                </motion.button>
            </div>

            {/* Subtle background particles (Red) */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-red-600 rounded-full opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                    }}
                    animate={{
                        opacity: [0.1, 0.4, 0.1],
                        scale: [1, 2, 1]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    );
};

export default Page1Intro;
