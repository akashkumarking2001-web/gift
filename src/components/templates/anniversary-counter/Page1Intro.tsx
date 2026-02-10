import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

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
        text: data.text || "Every second spent with you is a second I'll cherish forever."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0805] flex flex-col items-center justify-center p-8 text-center">
            {/* Elegant Background Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 blur-[150px] rounded-full" />

            <div className="relative z-10 max-w-2xl">
                {/* Spinning Golden Gear/Clock Aesthetic */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="mb-12 flex justify-center opacity-30"
                >
                    <div className="relative w-40 h-40 border-2 border-amber-600/30 rounded-full flex items-center justify-center">
                        <div className="w-1 h-20 bg-amber-600/50 rounded-full origin-bottom" />
                        <div className="absolute top-0 w-32 h-32 border-2 border-dashed border-amber-600/20 rounded-full" />
                    </div>
                </motion.div>

                {/* Clock Icon Floating */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-8 flex justify-center"
                >
                    <Clock size={64} className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" />
                </motion.div>

                {/* Intro Text */}
                <div
                    className={`relative group ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-6 rounded-3xl transition-all' : ''}`}
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
                        className="text-4xl md:text-6xl font-black text-white font-lovely leading-tight tracking-tight italic"
                    >
                        "{defaultData.text}"
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
                    className="mt-20 group relative px-12 py-5 border border-amber-600/30 bg-amber-600/10 hover:bg-amber-600/20 rounded-full text-amber-500 font-black text-xs uppercase tracking-[0.6em] transition-all"
                >
                    Witness Our Time →
                </motion.button>
            </div>

            {/* Floating background numbers (Clock style) */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-amber-600/10 text-9xl font-black select-none pointer-events-none"
                    style={{
                        left: `${Math.random() * 80 + 10}%`,
                        top: `${Math.random() * 80 + 10}%`
                    }}
                    animate={{
                        opacity: [0.05, 0.15, 0.05],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity
                    }}
                >
                    {i + 1}
                </motion.div>
            ))}
        </div>
    );
};

export default Page1Intro;
