import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Gift, Sparkles, Heart, Star, Zap } from 'lucide-react';

interface Page1LoadingProps {
    data: {
        subtext?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Loading = ({ data, onNext, isEditing = false, onUpdate }: Page1LoadingProps) => {
    const defaultData = {
        subtext: data.subtext || "Calculating The Years of Perfection..."
    };

    useEffect(() => {
        if (!isEditing) {
            const timer = setTimeout(onNext, 4500);
            return () => clearTimeout(timer);
        }
    }, [onNext, isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#05050a] flex flex-col items-center justify-center p-8 text-center font-outfit">

            {/* Hyper-Realistic Neon Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(236,72,153,0.2),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.2),transparent_50%)]"
                />

                {/* Floating Bokeh Orbs */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/5 rounded-full blur-3xl"
                        style={{
                            width: `${Math.random() * 200 + 100}px`,
                            height: `${Math.random() * 200 + 100}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -200, 0],
                            x: [0, 100, 0],
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">

                {/* Visual Reveal Anchor */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 100 }}
                    className="mb-16 relative"
                >
                    <div className="relative p-12 bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 shadow-[0_50px_100px_rgba(236,72,153,0.3)] isolate overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20" />
                        <Gift size={90} className="text-pink-400 drop-shadow-[0_0_30px_rgba(236,72,153,0.6)]" />

                        {/* Kinetic Accents */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-4 pointer-events-none"
                        >
                            <Sparkles className="absolute top-0 right-1/4 w-8 h-8 text-yellow-200 fill-current opacity-40 blur-[1px]" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Loading Typography Section */}
                <div className="space-y-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-pink-500/10 backdrop-blur-xl px-10 py-3 rounded-full border border-pink-500/20"
                    >
                        <Zap size={14} className="text-pink-400 fill-current animate-pulse" />
                        <span className="text-pink-100 font-black uppercase tracking-[0.6em] text-[10px]">Initializing Celebration</span>
                    </motion.div>

                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-8xl font-black text-white font-romantic leading-tight tracking-[0.02em] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                        >
                            Unveiling The Magic
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-pink-400/50 text-xl md:text-2xl font-black uppercase tracking-[0.4em]"
                        >
                            {defaultData.subtext}
                        </motion.p>
                    </div>
                </div>

                {/* Hyper-Realistic Progress Indicator */}
                <div className="relative w-72 h-3 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-pink-600 via-fuchsia-500 to-purple-600 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)]"
                    />
                </div>

                {/* Metadata Stats */}
                <div className="mt-16 flex gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-white/10">
                    <div className="flex items-center gap-2 flex-col">
                        <span className="text-pink-500/30">Status</span>
                        <span>Optimized</span>
                    </div>
                    <div className="flex items-center gap-2 flex-col">
                        <span className="text-purple-500/30">Protocol</span>
                        <span>Birthday V4</span>
                    </div>
                </div>

            </div>

            {/* Background Texture Detail */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
    );
};

export default Page1Loading;
