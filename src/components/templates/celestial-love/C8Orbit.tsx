import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, Share2, RefreshCw, Star, Globe, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const C8Orbit = ({ data, isEditing = false, onUpdate }: any) => {
    useEffect(() => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#3b82f6', '#06b6d4', '#ffffff'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#3b82f6', '#06b6d4', '#ffffff'] });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const heading = data.finalHeading || "Eternal Orbit";
    const subtext = data.finalText || "Our story travels faster than light, through the silence of space, forever vibrating in the heart of the multiverse.";

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-center p-8 font-mono select-none isolate">

            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#1e1b4b_0%,#050510_80%)]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-4xl bg-white/5 backdrop-blur-3xl rounded-[4rem] border-2 border-white/10 p-12 md:p-24 shadow-[0_60px_150px_rgba(0,0,0,0.7)] text-center space-y-12"
            >
                {/* Final Interactive Reveal */}
                <div className="relative inline-block group">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-[-60px] border-2 border-dashed border-blue-500/20 rounded-full"
                    />

                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-16 bg-blue-600 rounded-[3.5rem] shadow-[0_0_80px_rgba(37,99,235,0.4)] border-4 border-blue-400 relative z-10"
                    >
                        <Globe size={100} className="text-white drop-shadow-2xl" />
                    </motion.div>
                    <div className="absolute -top-6 -right-6 bg-white p-6 rounded-full shadow-2xl text-rose-600">
                        <Heart size={32} fill="currentColor" />
                    </div>
                </div>

                <div className="space-y-8">
                    <h2
                        className="text-5xl md:text-[8rem] font-black text-white uppercase tracking-tighter leading-tight cursor-pointer italic"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Final Heading:", heading);
                                if (val) onUpdate?.('finalHeading', val);
                            }
                        }}
                    >
                        {heading}
                    </h2>
                    <div className="h-[2px] w-24 bg-blue-500/20 mx-auto" />
                    <p
                        className="text-blue-200/40 text-xl md:text-3xl font-black uppercase tracking-[0.1em] leading-relaxed max-w-3xl mx-auto cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Final Message:", subtext);
                                if (val) onUpdate?.('finalText', val);
                            }
                        }}
                    >
                        "{subtext}"
                    </p>
                </div>

                {/* Final Engagement Cluster */}
                <div className="pt-12 flex flex-col gap-10">
                    <div className="flex justify-center gap-10">
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="p-6 bg-white/5 rounded-full text-white shadow-xl border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <Share2 size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            className="p-6 bg-white/5 rounded-full text-white shadow-xl border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <Send size={24} />
                        </motion.button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-4 text-white/20 hover:text-white transition-colors uppercase font-black text-[10px] tracking-[0.6em] mx-auto"
                    >
                        <RefreshCw size={14} /> Re-Sync Orbit
                    </motion.button>
                </div>

                {/* Corner detail */}
                <div className="absolute top-10 right-10 text-white/5"><Zap size={100} /></div>
            </motion.div>
        </div>
    );
};

export default C8Orbit;
