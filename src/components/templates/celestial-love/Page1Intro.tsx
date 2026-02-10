import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

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
        text: data.text || "Even in a galaxy of a billion stars, my eyes would still only look for you."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-center p-8 text-center text-blue-50">
            {/* Celestial Nebula Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />

            <div className="relative z-10 max-w-4xl">
                {/* Floating Galactic Icon */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="mb-12 flex justify-center"
                >
                    <div className="p-10 bg-blue-600/10 rounded-full border border-blue-500/20 backdrop-blur-3xl shadow-[0_0_100px_rgba(59,130,246,0.2)] relative">
                        <Sparkles size={80} className="text-blue-400" />
                        <motion.div
                            className="absolute inset-0 border-2 border-dashed border-blue-500/30 rounded-full scale-125"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        />
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
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-8xl font-black font-lovely leading-tight tracking-tight drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
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
                    className="mt-24 group relative px-16 py-6 bg-transparent border border-blue-500/30 hover:bg-blue-600/10 text-blue-400 font-black text-xs uppercase tracking-[0.5em] rounded-full transition-all"
                >
                    Travel the Stars →
                </motion.button>
            </div>

            {/* Twinkling background stars */}
            {[...Array(40)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-[2px] h-[2px] bg-white rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: 'translateZ(0)',
                        willChange: 'opacity, transform',
                        backfaceVisibility: 'hidden'
                    }}
                    animate={{
                        opacity: [0.1, 0.8, 0.1],
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
