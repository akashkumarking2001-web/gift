import { motion } from 'framer-motion';
import { Star, Sparkles, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const C1Loading = ({ data, onNext }: any) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(timer);
                    setTimeout(onNext, 1500);
                    return 100;
                }
                return p + Math.random() * 8;
            });
        }, 200);
        return () => clearInterval(timer);
    }, [onNext]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-center p-8 font-mono select-none isolate">

            {/* Deep Space Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e1b4b_0%,transparent_70%)] opacity-40" />

                {/* Random Twinkling Stars */}
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-white rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1 + Math.random() * 3, repeat: Infinity }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg text-center space-y-16"
            >
                {/* Visual Label */}
                <div className="relative inline-block">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-12 bg-blue-950/20 rounded-full shadow-[0_0_80px_rgba(59,130,246,0.3)] border-4 border-blue-500/20"
                    >
                        <Star size={80} fill="#60a5fa" className="text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.5)]" />
                    </motion.div>
                    <motion.div
                        animate={{ opacity: [0, 1, 0], y: [-10, 10] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -top-4 -right-4 text-cyan-400"
                    >
                        <Sparkles size={44} />
                    </motion.div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter italic">
                        Aligning the Stars...
                    </h2>
                    <p className="text-blue-400/40 text-sm md:text-base font-black uppercase tracking-[0.5em]">
                        {data.subtext || "Mapping our coordinates in the infinite cosmos."}
                    </p>
                </div>

                {/* Celestial Progress Bar */}
                <div className="relative h-4 w-full bg-blue-950/30 rounded-full overflow-hidden border border-blue-500/10 p-1 shadow-inner">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                    />
                </div>

                <div className="text-[10px] uppercase tracking-[0.8em] text-blue-500/40 font-black">
                    Cosmic Sync: {Math.round(progress)}%
                </div>
            </motion.div>
        </div>
    );
};

export default C1Loading;
