import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, ShieldCheck, RefreshCw, Star, Trophy } from 'lucide-react';

interface Page4VowProps {
    data: {
        message?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4Vow = ({ data, onNext, isEditing = false, onUpdate }: Page4VowProps) => {
    const defaultData = {
        message: data.message || "My love for you grows with every tick of the clock. This anniversary is just another beautiful chapter in our eternal story. I promise to cherish every second we have together, now and forever."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#080706] flex items-center justify-center p-6 md:p-12 font-outfit">

            {/* Professional Cinematic Environment */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(180,130,50,0.12),transparent_60%)]" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(180,130,50,0.12),transparent_60%)]" />

                {/* Floating Gilded Dust */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1.5px] h-[1.5px] bg-amber-400/20 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -120, 0], opacity: [0, 0.4, 0] }}
                        transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-4xl">

                {/* The Royal Anniversary Legacy Document */}
                <motion.div
                    initial={{ opacity: 0, y: 50, rotateX: 10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="relative w-full bg-[#0c0b0a] border border-white/5 rounded-[4rem] p-12 md:p-24 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] overflow-hidden isolate"
                >
                    {/* Interior Lighting */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

                    {/* Wax Seal / Header Ornament */}
                    <div className="flex justify-center mb-24 scale-125">
                        <div className="relative w-24 h-24 bg-gradient-to-br from-amber-600 to-amber-900 rounded-full flex items-center justify-center shadow-2xl border-4 border-[#080706]">
                            <div className="absolute inset-2 border-2 border-white/10 rounded-full" />
                            <Trophy size={32} className="text-amber-100/80 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]" />

                            <motion.div
                                animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-amber-500 rounded-full"
                            />
                        </div>
                    </div>

                    <div className="relative z-20 space-y-20">
                        {/* Header Badge */}
                        <div className="flex items-center gap-4 border-b border-white/5 pb-10">
                            <Mail size={14} className="text-amber-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/40">Memorandum of Eternal Devotion</span>
                            <div className="flex-1" />
                            <Star size={14} className="text-amber-500/30" />
                        </div>

                        {/* Vow Body */}
                        <div className="relative group/vow">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 2 }}
                                className="text-3xl md:text-5xl font-romantic text-white/90 leading-[1.8] italic text-justify drop-shadow-sm"
                            >
                                "{defaultData.message}"
                            </motion.p>
                        </div>

                        {/* Signature Area */}
                        <div className="flex flex-col items-end pt-12">
                            <div className="w-72 h-[1px] bg-gradient-to-r from-transparent via-amber-900/40 to-amber-900/40 mb-10" />
                            <h4 className="text-5xl md:text-7xl font-romantic text-amber-500 drop-shadow-[0_0_20px_rgba(180,130,50,0.2)]">
                                Yours Eternally
                            </h4>

                            <div className="mt-8 flex items-center gap-3">
                                <ShieldCheck size={14} className="text-amber-500/40" />
                                <p className="text-[9px] font-black uppercase tracking-[0.5em] text-white/20">A Lifetime Verified</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Final Professional Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                    className="mt-20 flex flex-col items-center gap-10"
                >
                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group flex items-center gap-6 px-16 py-8 rounded-[3rem] bg-white text-[#0a0805] font-black text-xs uppercase tracking-[0.6em] shadow-[0_30px_80px_rgba(255,255,255,0.15)]"
                    >
                        Replay Chronology <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
                    </motion.button>

                    <div className="flex items-center gap-4 opacity-10">
                        <div className="h-[1px] w-12 bg-white" />
                        <span className="text-[8px] font-black tracking-[1em] uppercase">Infinity Found</span>
                        <div className="h-[1px] w-12 bg-white" />
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Page4Vow;
