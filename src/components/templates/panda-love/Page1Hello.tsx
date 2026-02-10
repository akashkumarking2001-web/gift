import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface Page1HelloProps {
    data: {
        greeting?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Hello = ({ data, onNext, isEditing = false, onUpdate }: Page1HelloProps) => {
    const defaultData = {
        greeting: data.greeting || "Hello there! I have a secret for you..."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0515] flex flex-col items-center justify-center p-8 text-center">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-violet-900/10 blur-[150px] rounded-full" />

            <div className="relative z-10 max-w-2xl">
                {/* Cute Animated Panda Mascot (SVG + Motion) */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 2, -2, 0]
                    }}
                    style={{ transform: 'translateZ(0)', willChange: 'transform', backfaceVisibility: 'hidden' }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12 flex justify-center relative"
                >
                    <div className="relative w-48 h-48 md:w-64 md:h-64">
                        {/* Simple Cute Character Shape */}
                        <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-violet-500/20">
                            {/* Eyes */}
                            <motion.div
                                animate={{ scaleY: [1, 0.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity, times: [0, 0.95, 1] }}
                                className="absolute top-1/3 left-1/4 w-4 h-4 bg-[#1a1a1a] rounded-full"
                            />
                            <motion.div
                                animate={{ scaleY: [1, 0.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity, times: [0, 0.95, 1] }}
                                className="absolute top-1/3 right-1/4 w-4 h-4 bg-[#1a1a1a] rounded-full"
                            />
                            {/* Blush */}
                            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-6 h-3 bg-pink-200 blur-sm rounded-full" />
                            <div className="absolute top-1/2 right-1/4 translate-x-1/2 w-6 h-3 bg-pink-200 blur-sm rounded-full" />
                            {/* Mouth */}
                            <div className="absolute top-[55%] left-1/2 -translate-x-1/2 w-8 h-4 border-b-4 border-[#1a1a1a] rounded-full" />
                            {/* Panda Ears */}
                            <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#1a1a1a] rounded-full -z-10" />
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#1a1a1a] rounded-full -z-10" />
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -bottom-4 -right-4 bg-purple-600 p-4 rounded-2xl text-white shadow-xl"
                        >
                            <Heart size={24} fill="white" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Greeting Bubble */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                >
                    {/* Speech Bubble Tail */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white/5 border-l border-t border-white/10 rotate-45" />

                    <div
                        className={`bg-white/5 backdrop-blur-3xl border border-white/10 p-10 md:p-12 rounded-[3rem] relative group ${isEditing ? 'cursor-pointer' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Greeting:", defaultData.greeting);
                                if (val !== null) onUpdate?.('greeting', val);
                            }
                        }}
                    >
                        <h1 className="text-3xl md:text-5xl font-black text-white font-lovely leading-tight">
                            {defaultData.greeting}
                        </h1>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Double Click to Edit Hello</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="mt-16 group relative px-10 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full text-white font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-violet-600/30"
                >
                    What's the secret? ✨
                </motion.button>
            </div>
        </div>
    );
};

export default Page1Hello;
