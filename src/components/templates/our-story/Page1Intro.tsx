import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Page1IntroProps {
    data: {
        heading?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Intro = ({ data, onNext, isEditing = false, onUpdate }: Page1IntroProps) => {
    const defaultData = {
        heading: data.heading || "Every great story has a beginning... this is ours."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-center p-8 text-center">
            {/* Indigo/Stellar Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.15)_0%,transparent_70%)]" />

            <div className="relative z-10 max-w-4xl">
                {/* Magical Sparkle Effect */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-indigo-500/20 rounded-full border-dashed"
                />

                {/* Icon Reveal */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="mb-12 flex justify-center"
                >
                    <div className="p-8 bg-indigo-600/20 rounded-[2.5rem] border border-indigo-500/30 backdrop-blur-xl">
                        <Sparkles size={64} className="text-indigo-400 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]" />
                    </div>
                </motion.div>

                {/* Main Heading Text */}
                <div
                    className={`relative group ${isEditing ? 'cursor-pointer hover:bg-white/5 px-10 py-6 rounded-[3rem] transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Heading:", defaultData.heading);
                            if (val !== null) onUpdate?.('heading', val);
                        }
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-8xl font-black text-white font-lovely leading-tight tracking-tight drop-shadow-2xl"
                    >
                        {defaultData.heading}
                    </motion.h1>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Double Click to Edit Heading</span>
                        </div>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="mt-24 group relative px-16 py-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black text-xs uppercase tracking-[0.5em] rounded-full shadow-[0_30px_60px_-15px_rgba(79,70,229,0.5)]"
                >
                    Flip the Page →
                </motion.button>
            </div>

            {/* Floating background stars */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                    }}
                    animate={{
                        opacity: [0.1, 0.5, 0.1],
                        scale: [1, 2, 1]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    );
};

export default Page1Intro;
