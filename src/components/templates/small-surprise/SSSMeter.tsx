import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, Zap, ShieldAlert, Sparkles, Activity, Search } from 'lucide-react';

const SSSMeter = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    const [level, setLevel] = useState(0);
    const [status, setStatus] = useState("Initializing Scanner...");

    useEffect(() => {
        const phases = [
            { threshold: 20, msg: "Identifying Target..." },
            { threshold: 45, msg: "Analyzing Visual Cuteness..." },
            { threshold: 70, msg: "Measuring Heart Influence..." },
            { threshold: 90, msg: "CRITICAL: Level Overflow!" },
            { threshold: 100, msg: "Limit Exceeded. Success." }
        ];

        let currentPhase = 0;
        const timer = setInterval(() => {
            setLevel(l => {
                const next = l + (Math.random() * 5);
                if (currentPhase < phases.length && next >= phases[currentPhase].threshold) {
                    setStatus(phases[currentPhase].msg);
                    currentPhase++;
                }
                if (next >= 100) {
                    clearInterval(timer);
                    setTimeout(onNext, 2000);
                    return 100;
                }
                return next;
            });
        }, 150);
        return () => clearInterval(timer);
    }, [onNext]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0d0d] flex flex-col items-center justify-center p-8 font-mono select-none isolate">

            {/* Visual Scanner Lines */}
            <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-rose-500/10 to-transparent h-[10vh] border-y border-rose-500/20 z-0"
            />

            <div className="relative z-10 w-full max-w-5xl flex flex-col items-center gap-16">

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex items-center gap-4 bg-white/5 px-10 py-4 rounded-full border border-white/10 shadow-xl backdrop-blur-md"
                    onClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Heading:", data.heading || "Cuteness Scanner");
                            if (val) onUpdate?.('heading', val);
                        }
                    }}
                >
                    <Search size={20} className="text-rose-500 animate-pulse" />
                    <span className="text-rose-400 font-black uppercase tracking-[0.6em] text-[10px]">{data.heading || "Cuteness Scanner"}</span>
                </motion.div>

                <div className="relative p-12 md:p-24 bg-white/5 border border-white/10 rounded-[4rem] backdrop-blur-2xl shadow-2xl w-full max-w-4xl text-center overflow-hidden">

                    {/* Background Heart Glow */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 flex items-center justify-center -z-10"
                    >
                        <Heart size={400} className="text-rose-500" fill="currentColor" />
                    </motion.div>

                    <div className="space-y-12">
                        <div className="relative inline-block">
                            <motion.h2
                                className="text-8xl md:text-[14rem] font-black text-rose-500 leading-none drop-shadow-[0_0_50px_rgba(244,63,94,0.4)]"
                            >
                                {Math.round(level)}%
                            </motion.h2>
                            {level > 90 && (
                                <motion.div
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ duration: 0.1, repeat: Infinity }}
                                    className="absolute inset-0 bg-white mix-blend-overlay rounded-full blur-3xl"
                                />
                            )}
                        </div>

                        <div className="space-y-4">
                            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-rose-600 via-pink-400 to-rose-400 rounded-full"
                                    animate={{ width: `${level}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.3em] text-rose-500/40 px-2">
                                <span>Zero</span>
                                <span>Infinity Limit</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <div className="flex items-center gap-4 text-emerald-400/80 bg-emerald-950/20 px-8 py-3 rounded-full border border-emerald-500/20 font-black text-[10px] uppercase tracking-widest">
                                <ShieldAlert size={16} className="animate-pulse" />
                                <span>{status}</span>
                            </div>

                            <div className="flex gap-4 opacity-30">
                                <Activity size={16} className="text-white" />
                                <Zap size={16} className="text-white" />
                                <Sparkles size={16} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center space-y-2 opacity-20">
                    <p className="text-[8px] font-black uppercase tracking-[1em] text-white">System Overloaded by Extreme Cuteness</p>
                    <div className="h-[1px] w-40 bg-white/20 mx-auto" />
                </div>
            </div>
        </div>
    );
};

export default SSSMeter;
