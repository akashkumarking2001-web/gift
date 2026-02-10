import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

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
        text: data.text || "Every photo tells a story, and my favorite stories are the ones with you."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0508] flex flex-col items-center justify-center p-8 text-center">
            {/* Soft Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,rgba(244,114,182,0.1),transparent_50%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.1),transparent_50%)]" />

            <div className="relative z-10 max-w-3xl">
                {/* Floating Filmstrip Aesthetic */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="mb-12 flex justify-center gap-4 opacity-20"
                >
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-24 h-32 bg-white/10 border-y-8 border-dashed border-white/20 rounded-sm" />
                    ))}
                </motion.div>

                {/* Camera Icon */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="mb-8 flex justify-center"
                >
                    <div className="p-6 bg-pink-500/20 rounded-full border border-pink-500/30">
                        <Camera size={48} className="text-pink-400" />
                    </div>
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-white font-romantic leading-tight"
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
                    className="mt-20 group relative px-12 py-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full text-white font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-pink-500/30"
                >
                    Open the Album <span className="inline-block transition-transform group-hover:translate-x-2">→</span>
                </motion.button>
            </div>

            {/* Floating background bokeh balls */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-pink-500/10 blur-xl"
                    style={{
                        width: `${Math.random() * 100 + 50}px`,
                        height: `${Math.random() * 100 + 50}px`,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                    }}
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity
                    }}
                />
            ))}
        </div>
    );
};

export default Page1Intro;
