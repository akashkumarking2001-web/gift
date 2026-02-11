import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, Activity, ShieldCheck, Zap, Sparkles, Radio, Database } from 'lucide-react';

interface Page2HeartbeatProps {
    data: {
        bpm?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Heartbeat = ({ data, onNext, isEditing = false, onUpdate }: Page2HeartbeatProps) => {
    const [progress, setProgress] = useState(0);

    const defaultData = {
        bpm: data.bpm || "120"
    };

    const beatDuration = 60 / parseInt(defaultData.bpm);

    useEffect(() => {
        if (!isEditing) {
            let startTimestamp: number | null = null;
            let animationFrameId: number;
            const totalDuration = 4500; // Professional sync duration

            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const lapsed = timestamp - startTimestamp;
                const p = Math.min((lapsed / totalDuration) * 100, 100);

                setProgress(Math.floor(p));

                if (p < 100) {
                    animationFrameId = requestAnimationFrame(step);
                } else {
                    setTimeout(onNext, 800);
                }
            };

            animationFrameId = requestAnimationFrame(step);
            return () => cancelAnimationFrame(animationFrameId);
        }
    }, [isEditing, onNext]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#080202] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC SYNC PHASE ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: beatDuration, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.2),transparent_70%)]"
                />

                {/* EKG Monitoring Grid */}
                <div className="absolute inset-x-0 top-[20%] h-[1px] bg-red-900/30" />
                <div className="absolute inset-x-0 bottom-[20%] h-[1px] bg-red-900/30" />
                <div className="absolute inset-y-0 left-[20%] w-[1px] bg-red-900/30" />
                <div className="absolute inset-y-0 right-[20%] w-[1px] bg-red-900/30" />

                {/* Digital Noise */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 mix-blend-overlay" />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-16">

                {/* LIVE TELEMETRY DISPLAY */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-8"
                >
                    <div className="inline-flex items-center gap-4 bg-red-950/40 backdrop-blur-3xl px-12 py-3 rounded-full border border-red-900/30 shadow-2xl">
                        <Activity size={16} className="text-red-500 animate-pulse" />
                        <span className="text-red-100/50 font-black uppercase tracking-[0.6em] text-[10px]">Biometric Lock // Active</span>
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    </div>

                    <div className="relative">
                        <h2 className="text-8xl md:text-[12rem] font-black text-white font-mono leading-none tracking-tighter drop-shadow-[0_0_60px_rgba(239,68,68,0.5)] flex items-baseline gap-4">
                            {defaultData.bpm}
                            <span className="text-2xl md:text-4xl text-red-600 font-bold uppercase tracking-widest opacity-60">BPM</span>
                        </h2>
                        {/* Glitch Overlay */}
                        <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay opacity-0 animate-[pulse_0.2s_ease-in-out_infinite]" />
                    </div>
                </motion.div>

                {/* THE CORE PULSATING ORGAN */}
                <div className="relative w-80 h-80 md:w-[32rem] md:h-[32rem]">
                    {/* Atmospheric Orbitals */}
                    {[...Array(4)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                            transition={{ duration: beatDuration * 1.5, repeat: Infinity, delay: i * (beatDuration / 2) }}
                            className="absolute inset-0 border border-red-500/30 rounded-full"
                        />
                    ))}

                    <motion.div
                        animate={{ scale: [1, 1.1, 1], filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'] }}
                        transition={{ duration: beatDuration, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-8 bg-gradient-to-br from-[#7f1d1d] to-[#450a0a] rounded-full shadow-[0_0_100px_rgba(220,38,38,0.5)] border-4 border-red-500/20 flex items-center justify-center overflow-hidden isolate"
                    >
                        {/* Internal Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                        <Heart size={160} fill="#ef4444" className="text-red-500 drop-shadow-[0_0_60px_rgba(239,68,68,0.8)] relative z-10" />

                        {/* Synchronization Watermark */}
                        <motion.div
                            initial={{ height: "0%" }}
                            animate={{ height: `${progress}%` }}
                            className="absolute bottom-0 left-0 w-full bg-red-500/20 backdrop-blur-sm transition-all duration-100 ease-linear z-0"
                        />
                    </motion.div>
                </div>

                {/* SYNC STATUS BAR */}
                <div className="w-full max-w-xl space-y-6 pt-8">
                    <div className="flex justify-between items-end px-2">
                        <div className="flex items-center gap-3 opacity-60">
                            <Database size={14} className="text-red-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-200">Syncing Data Streams...</span>
                        </div>
                        <span className="text-4xl font-black text-white font-mono">{progress}<span className="text-lg text-red-500">%</span></span>
                    </div>

                    <div className="relative w-full h-3 bg-[#1a0505] rounded-full overflow-hidden border border-red-900/30">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            className="h-full bg-gradient-to-r from-red-800 via-red-600 to-red-400 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)] relative"
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[size:10px_10px]" />
                        </motion.div>
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 left-12 flex flex-col items-start gap-4 opacity-15">
                <div className="font-romantic text-8xl text-red-900 italic">Phase</div>
                <div className="h-[1px] w-72 bg-red-900/40" />
                <span className="text-[10px] font-black tracking-widest text-red-200 uppercase tracking-[1.5em]">SYNC-MONITOR // V5.02</span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />

        </div>
    );
};

export default Page2Heartbeat;
