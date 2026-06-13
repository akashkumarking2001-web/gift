import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShieldAlert, Sparkles, Cpu, Fingerprint } from 'lucide-react';

const Page1Intro = ({ data, onNext }: any) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onNext, 1000);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);
        return () => clearInterval(interval);
    }, [onNext]);

    return (
        <div className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* CYBERNETIC GRID */}
            <div className="absolute inset-0 z-0 opacity-20" style={{
                backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
            }} />

            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-cyan-500/10 to-transparent" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg"
            >
                {/* Holographic Header */}
                <div className="bg-black/40 backdrop-blur-3xl border border-cyan-500/20 rounded-[3rem] p-10 text-center shadow-[0_0_100px_rgba(6,182,212,0.15)] overflow-hidden relative group">

                    {/* Scanning Line */}
                    <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-x-0 h-[2px] bg-cyan-400 opacity-20 z-0 blur-sm"
                    />

                    <div className="space-y-10 relative z-10">
                        <div className="flex justify-center flex-col items-center gap-4">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 rounded-full border border-cyan-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                            >
                                <Cpu className="text-cyan-400" size={40} strokeWidth={1} />
                                <div className="absolute -inset-2 border-2 border-cyan-500/5 rounded-full" />
                            </motion.div>
                            <div className="flex items-center gap-3">
                                <Fingerprint className="text-cyan-500/50" size={16} />
                                <span className="text-cyan-400 font-black uppercase tracking-[0.5em] text-[10px]">Biometric Auth</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-white text-3xl md:text-5xl font-black tracking-tight leading-tight">
                                {data.text || "Initializing Cuteness Core..."}
                            </h1>
                            <p className="text-cyan-100/40 text-xs font-bold uppercase tracking-[0.3em]">
                                Level 4 Security Cleared
                            </p>
                        </div>

                        {/* HIGH TECH PROGRESS */}
                        <div className="space-y-4">
                            <div className="flex justify-between text-[10px] font-black tracking-widest uppercase text-cyan-500/40">
                                <span>Core Systems</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-cyan-950 rounded-full overflow-hidden border border-cyan-900/40 relative">
                                <motion.div
                                    className="h-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                                    style={{ width: `${progress}%` }}
                                />
                                <motion.div
                                    animate={{ left: ['-100%', '200%'] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                    className="absolute inset-y-0 w-1/2 bg-white/20 skew-x-[-20deg]"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-6 justify-center">
                            <ShieldAlert className="text-cyan-500/20" size={14} />
                            <div className="h-[1px] w-20 bg-cyan-900/40" />
                            <Sparkles className="text-cyan-500/20" size={14} />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* FLOATING TEXT DECO */}
            <div className="absolute bottom-10 left-10 opacity-5 text-cyan-400 text-[10px] font-black uppercase tracking-[2em] rotate-90 origin-left">
                Scan Protocol // X-90
            </div>
        </div>
    );
};

export default Page1Intro;
