import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

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
        text: data.text || "I can't take you out tonight, so let's have a virtual date instead. Ready?"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#051010] flex flex-col items-center justify-center p-8 text-center">
            {/* Teal Background Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.15)_0%,transparent_70%)]" />

            <div className="relative z-10 max-w-3xl">
                {/* Floating Coffee Icon (Date Vibe) */}
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12 flex justify-center"
                >
                    <div className="p-8 bg-teal-600/20 rounded-[2.5rem] border border-teal-500/30 backdrop-blur-3xl shadow-[0_0_50px_rgba(20,184,166,0.3)]">
                        <Coffee size={80} className="text-teal-400" />
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
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-7xl font-black text-white font-lovely leading-tight"
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
                    className="mt-24 group relative px-16 py-6 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs uppercase tracking-[0.5em] rounded-full shadow-[0_30px_60px_-15px_rgba(20,184,166,0.5)] transition-all"
                >
                    Start the Date →
                </motion.button>
            </div>

            {/* Subtle background bubbles */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-teal-500 rounded-full opacity-10"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                    }}
                    animate={{
                        y: [-20, -150],
                        opacity: [0, 0.2, 0]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 8
                    }}
                />
            ))}
        </div>
    );
};

export default Page1Intro;
