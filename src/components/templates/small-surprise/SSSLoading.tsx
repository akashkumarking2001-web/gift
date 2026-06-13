import { motion } from 'framer-motion';
import { Terminal, Cpu, Zap, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

const SSSLoading = ({ data, onNext }: any) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(interval);
                    setTimeout(onNext, 1000);
                    return 100;
                }
                return p + Math.random() * 15;
            });
        }, 300);
        return () => clearInterval(interval);
    }, [onNext]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0d0d] flex flex-col items-center justify-center p-8 font-mono select-none isolate">

            {/* Cyber Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />

            <div className="relative z-10 w-full max-w-2xl space-y-12">

                {/* Visual Status */}
                <div className="flex justify-between items-center text-rose-500/60 text-[10px] uppercase tracking-[0.4em] font-black">
                    <div className="flex items-center gap-2">
                        <Terminal size={14} />
                        <span>Initializing Surprise Protocol</span>
                    </div>
                    <span>v2.0.4-L0V3</span>
                </div>

                {/* Main Visual */}
                <div className="relative group">
                    <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 bg-rose-500/20 blur-[80px] rounded-full"
                    />

                    <div className="relative bg-black/40 border border-white/5 rounded-3xl p-12 backdrop-blur-xl shadow-2xl overflow-hidden">
                        <div className="space-y-8">
                            <div className="flex justify-between items-end">
                                <div className="space-y-2">
                                    <h2 className="text-white text-3xl font-black uppercase tracking-widest leading-none">
                                        Loading Bliss
                                    </h2>
                                    <p className="text-rose-400 text-[10px] font-black uppercase tracking-[0.2em]">{data.subtext || "Analyzing heart rhythms..."}</p>
                                </div>
                                <span className="text-rose-500 text-6xl font-black leading-none">{Math.round(progress)}%</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-1">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-rose-600 to-pink-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>

                            {/* System Messages */}
                            <div className="space-y-2 max-h-24 overflow-hidden border-t border-white/5 pt-6 font-black text-[8px] uppercase tracking-widest">
                                {[
                                    "Checking emotional bandwidth...",
                                    "Allocating memory for smiles...",
                                    "Injecting dopamine sequence...",
                                    "Finalizing surprise payload...",
                                    "Protocol established. Ready."
                                ].slice(0, Math.floor(progress / 20)).map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-4 text-emerald-400/60"
                                    >
                                        <Zap size={8} />
                                        <span>[SUCCESS] {msg}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-8 opacity-20">
                    <Cpu size={24} className="text-white animate-pulse" />
                    <Activity size={24} className="text-white animate-bounce" />
                </div>
            </div>
        </div>
    );
};

export default SSSLoading;
