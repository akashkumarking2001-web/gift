import { motion } from 'framer-motion';
import { Puzzle, Sparkles, Star, MoveRight, ShieldCheck, Zap } from 'lucide-react';

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
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* Hyper-Realistic Stellar Environment */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(37,99,235,0.15),transparent_50%)]"
                />

                {/* Floating Stellar Dust */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1.5px] h-[1.5px] bg-blue-400/20 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 6 + Math.random() * 8, repeat: Infinity }}
                    />
                ))}

                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')]" />
            </div>

            <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">

                {/* High-Fidelity Visual Anchor */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-20 relative group"
                >
                    <div className="relative p-16 bg-white/[0.03] backdrop-blur-3xl rounded-[5rem] border border-blue-500/20 shadow-[0_50px_100px_-20px_rgba(59,130,246,0.25)] isolate">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-[5rem]" />

                        {/* Spinning Decorative Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-blue-500/20 rounded-full"
                        />

                        <Puzzle size={90} strokeWidth={1} className="text-blue-400 drop-shadow-[0_0_30px_rgba(59,130,246,0.6)]" />

                        {/* Floating Micro-Element */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-6 -right-6 p-5 bg-blue-900/20 backdrop-blur-xl rounded-2xl border border-blue-500/30"
                        >
                            <Sparkles size={24} className="text-blue-200" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Narrative Typography Section */}
                <div className="space-y-12 mb-28 text-center max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-blue-900/10 backdrop-blur-xl px-12 py-3.5 rounded-full border border-blue-800/20 mx-auto"
                    >
                        <Star size={14} className="text-blue-400 fill-current animate-pulse" />
                        <span className="text-blue-100/50 font-black uppercase tracking-[0.6em] text-[10px]">Registry Sequence 01</span>
                        <Zap size={14} className="text-blue-400 fill-current opacity-30" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight tracking-[0.02em] px-4 drop-shadow-2xl"
                    >
                        "{defaultData.text}"
                    </motion.h1>
                </div>

                {/* Professional Navigation Area */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-24 py-9 bg-[#050510] border-2 border-blue-900/30 rounded-[3.5rem] text-blue-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(59,130,246,0.3)] transition-all flex items-center gap-6 isolate overflow-hidden"
                >
                    <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-[3.5rem]" />
                    <span className="relative z-10 text-blue-400">Assemble The Archive</span>
                    <MoveRight className="relative z-10 w-6 h-6 border-2 border-blue-900/30 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                </motion.button>
            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-2 opacity-10">
                <div className="font-romantic text-6xl text-blue-700 italic">Interlocking</div>
                <div className="h-[1px] w-48 bg-blue-700" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase">System: Puzzle V4</span>
            </div>

        </div>
    );
};

export default Page1Intro;
