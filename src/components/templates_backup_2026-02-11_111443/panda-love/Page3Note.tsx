import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Star, Sparkles, RefreshCw, Zap, ShieldCheck } from 'lucide-react';

interface Page3NoteProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Note = ({ data, onNext, isEditing = false, onUpdate }: Page3NoteProps) => {
    const defaultData = {
        text: data.text || "You are the most amazing person I've ever met. I'm so lucky to have you. 🐼❤️"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#05020a] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* Hyper-Realistic Gilded Atmosphere */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent_70%)]" />
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">

                {/* Visual Anchor Header */}
                <div className="text-center space-y-8 mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-purple-900/10 backdrop-blur-3xl px-12 py-3.5 rounded-full border border-purple-800/20 shadow-2xl mx-auto"
                    >
                        <ShieldCheck size={16} className="text-purple-500" />
                        <span className="text-purple-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Transmission Parameter 03</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <Mail size={40} className="text-purple-700/40" />
                        <h2 className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight tracking-[0.02em] drop-shadow-2xl">
                            The Manifesto
                        </h2>
                    </motion.div>
                </div>

                {/* HIGH-FIDELITY MANIFESTO CARD */}
                <div className="w-full max-w-4xl pb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="group/card relative bg-white/[0.02] backdrop-blur-3xl border border-white/[0.05] rounded-[4rem] p-12 md:p-24 shadow-[0_50px_200px_-50px_rgba(139,92,246,0.3)] overflow-hidden isolate"
                    >
                        {/* Cinematic Internal Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent" />

                        {/* 3D Wax Seal Decor (with Panda Twist) */}
                        <div className="absolute top-12 right-12 w-32 h-32 bg-purple-600/10 backdrop-blur-[40px] rounded-full border border-purple-500/20 flex items-center justify-center isolate group/seal">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/seal:opacity-100 transition-opacity" />
                            <div className="text-purple-400 drop-shadow-[0_0_20px_rgba(139,92,246,0.8)] flex flex-col items-center">
                                <div className="w-8 h-6 bg-current rounded-[100%] mb-1" />
                                <div className="flex gap-1">
                                    <div className="w-2.5 h-2.5 bg-current rounded-full" />
                                    <div className="w-2.5 h-2.5 bg-current rounded-full" />
                                    <div className="w-2.5 h-2.5 bg-current rounded-full" />
                                    <div className="w-2.5 h-2.5 bg-current rounded-full" />
                                </div>
                            </div>

                            {/* Orbiting Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 border border-dashed border-purple-500/10 rounded-full"
                            />
                        </div>

                        <div className="relative z-10 space-y-20">
                            {/* Manifesto Content */}
                            <div className="space-y-12">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center gap-4 text-purple-500/40"
                                >
                                    <Sparkles size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-[1em]">Absolute Commitment</span>
                                </motion.div>

                                <p className="text-white text-3xl md:text-5xl font-romantic leading-[1.8] italic drop-shadow-2xl text-justify tracking-wide opacity-90">
                                    "{defaultData.text}"
                                </p>
                            </div>

                            {/* Professional Signature */}
                            <div className="flex flex-col items-end gap-10">
                                <div className="h-[2px] w-48 bg-gradient-to-l from-purple-600/40 to-transparent" />
                                <div className="text-right">
                                    <div className="text-4xl md:text-7xl font-black text-purple-500 font-romantic tracking-widest px-4 drop-shadow-xl">
                                        Your Panda
                                    </div>
                                    <div className="mt-4 flex items-center justify-end gap-4 opacity-20">
                                        <Zap size={14} className="text-purple-500 fill-current" />
                                        <span className="text-[10px] uppercase font-black tracking-[0.6em]">Registry ID: #PANDA-77</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Massive Decorative Background Label */}
                        <div className="absolute top-12 left-12 text-[10rem] md:text-[18rem] font-black text-white/[0.01] select-none pointer-events-none font-outfit -translate-x-12 -translate-y-12">
                            PANDA
                        </div>
                    </motion.div>
                </div>

                {/* Professional Action Footer */}
                <div className="relative z-10 w-full max-w-2xl mx-auto pt-20 pb-40 flex flex-col items-center gap-12">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="group relative px-24 py-9 bg-[#05020a] border-2 border-purple-900/30 rounded-[3.5rem] text-purple-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(139,92,246,0.3)] transition-all flex items-center gap-6 isolate overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-[3.5rem]" />
                        <span className="relative z-10 text-purple-400">Recalibrate All Chapters</span>
                        <RefreshCw className="relative z-10 w-6 h-6 border-2 border-purple-900/30 rounded-full p-0.5 group-hover:rotate-180 transition-transform duration-700" />
                    </motion.button>

                    <div className="flex items-center gap-4 opacity-10">
                        <Star size={14} className="text-purple-500 fill-current" />
                        <span className="text-[8px] font-black tracking-[1em] uppercase text-white">Registry Sealed For Eternity</span>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Page3Note;
