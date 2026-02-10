import { motion } from 'framer-motion';
import { Book } from 'lucide-react';

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
        text: data.text || "I've started keeping a journal about us. Here are some of my favorite entries."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0905] flex flex-col items-center justify-center p-8 text-center text-orange-200/80">
            {/* Sepia Background Glows */}
            <div className="absolute inset-0 bg-[#3d2b1f]/10" />
            <div
                style={{ transform: 'translateZ(0)', willChange: 'opacity', backfaceVisibility: 'hidden' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-900/10 blur-[150px] rounded-full"
            />

            <div className="relative z-10 max-w-3xl">
                {/* Floating Journal Icon */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12 flex justify-center"
                >
                    <div className="p-10 bg-[#1a130e] rounded-[2.5rem] border border-orange-900/40 shadow-2xl relative group">
                        <Book size={70} className="text-orange-900/60" />
                        <motion.div
                            className="absolute inset-0 bg-orange-500/5 blur-xl rounded-full"
                            animate={{ opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity }}
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-3xl md:text-6xl font-black font-romantic italic leading-tight"
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
                    className="mt-24 group relative px-16 py-5 border border-orange-900/30 bg-[#1a130e] text-orange-800 font-black text-xs uppercase tracking-[0.5em] rounded-full transition-all"
                >
                    Read the Journal →
                </motion.button>
            </div>

            {/* Subtle paper texture overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
        </div>
    );
};

export default Page1Intro;
