import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, MoveRight, ShieldCheck, Zap } from 'lucide-react';

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
        <div className="min-h-screen relative overflow-hidden bg-[#0a0515] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* Hyper-Realistic Studio Environment */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(139,92,246,0.15),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(192,38,211,0.15),transparent_50%)]"
                />

                {/* Floating Micro-Particles */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1.5px] h-[1.5px] bg-purple-400/20 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 6 + Math.random() * 8, repeat: Infinity }}
                    />
                ))}

                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')]" />
            </div>

            <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">

                {/* High-Fidelity Visual Anchor (Mascot Unit) */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-20 relative group"
                >
                    <div className="relative p-16 md:p-24 bg-white/[0.03] backdrop-blur-3xl rounded-[6rem] border border-purple-500/20 shadow-[0_50px_150px_-30px_rgba(139,92,246,0.3)] isolate">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-[6rem]" />

                        {/* 3D-Styled Panda Mascot */}
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 1, -1, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-48 h-48 md:w-64 md:h-64"
                        >
                            {/* Panda Body Frame */}
                            <div className="absolute inset-0 bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border-[12px] border-purple-200/50 isolate">
                                {/* Eyes with Depth */}
                                <div className="absolute top-[35%] left-[22%] w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                    <motion.div
                                        animate={{ scaleY: [1, 0.1, 1], y: [0, 2, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, times: [0, 0.95, 1] }}
                                        className="w-3 h-3 bg-white rounded-full absolute top-2 right-2"
                                    />
                                </div>
                                <div className="absolute top-[35%] right-[22%] w-10 h-10 bg-black rounded-full flex items-center justify-center">
                                    <motion.div
                                        animate={{ scaleY: [1, 0.1, 1], y: [0, 2, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, times: [0, 0.95, 1] }}
                                        className="w-3 h-3 bg-white rounded-full absolute top-2 right-2"
                                    />
                                </div>

                                {/* Blush */}
                                <div className="absolute top-[52%] left-[25%] -translate-x-1/2 w-10 h-5 bg-pink-300 opacity-40 blur-md rounded-full" />
                                <div className="absolute top-[52%] right-[25%] translate-x-1/2 w-10 h-5 bg-pink-300 opacity-40 blur-md rounded-full" />

                                {/* Mouth */}
                                <div className="absolute top-[60%] left-1/2 -translate-x-1/2 w-12 h-6 border-b-[3px] border-black/80 rounded-full" />

                                {/* Panda Ears */}
                                <div className="absolute -top-6 -left-6 w-24 h-24 bg-black rounded-full -z-10 shadow-lg" />
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-black rounded-full -z-10 shadow-lg" />
                            </div>

                            {/* Floating Mascot Accent */}
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute -bottom-6 -right-6 p-6 bg-purple-600 backdrop-blur-3xl rounded-[2rem] border-4 border-[#0a0515] text-white shadow-2xl flex items-center justify-center isolate"
                            >
                                <Heart size={32} fill="white" className="drop-shadow-lg" />
                            </motion.div>
                        </motion.div>

                        {/* Spinning Ambient Orbit */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-purple-500/20 rounded-full"
                        />
                    </div>
                </motion.div>

                {/* Narrative Typography Section */}
                <div className="space-y-12 mb-28 text-center max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-purple-900/10 backdrop-blur-xl px-12 py-3.5 rounded-full border border-purple-800/20 mx-auto"
                    >
                        <Star size={14} className="text-purple-400 fill-current animate-pulse" />
                        <span className="text-purple-100/50 font-black uppercase tracking-[0.6em] text-[10px]">Registry Sequence 01</span>
                        <Zap size={14} className="text-purple-400 fill-current opacity-30" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight tracking-[0.02em] px-4 drop-shadow-2xl"
                    >
                        "{defaultData.greeting}"
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
                    className="group relative px-24 py-9 bg-[#0a0515] border-2 border-purple-900/30 rounded-[3.5rem] text-purple-400 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(139,92,246,0.3)] transition-all flex items-center gap-6 isolate overflow-hidden"
                >
                    <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-[3.5rem]" />
                    <span className="relative z-10">Unseal The Secret</span>
                    <MoveRight className="relative z-10 w-6 h-6 border-2 border-purple-900/30 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                </motion.button>
            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-2 opacity-10">
                <div className="font-romantic text-6xl text-purple-700 italic">Mascot</div>
                <div className="h-[1px] w-48 bg-purple-700" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase">System: Panda V4</span>
            </div>

        </div>
    );
};

export default Page1Hello;
