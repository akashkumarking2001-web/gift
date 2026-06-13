import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, Share2, RefreshCw, Star, Gift, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const SSSFinal = ({ data, isEditing = false, onUpdate }: any) => {
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
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#f43f5e', '#ffffff', '#fb7185'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#f43f5e', '#ffffff', '#fb7185'] });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0d0d] flex flex-col items-center justify-center p-8 font-mono select-none isolate">

            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#4c0519_0%,#0d0d0d_80%)]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-4xl bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-12 md:p-20 shadow-[0_60px_150px_rgba(0,0,0,0.6)] text-center space-y-12"
            >
                {/* Final Interactive Reveal */}
                <div className="relative inline-block group">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-[-60px] border border-dashed border-rose-500/20 rounded-full"
                    />

                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-16 bg-rose-600 rounded-[3rem] shadow-[0_0_80px_rgba(225,29,72,0.5)] border-4 border-rose-400 relative z-10"
                    >
                        <Gift size={100} className="text-white drop-shadow-2xl" />
                    </motion.div>
                    <div className="absolute -top-6 -right-6 bg-white p-6 rounded-full shadow-2xl text-rose-600">
                        <Heart size={32} fill="currentColor" />
                    </div>
                </div>

                <div className="space-y-8">
                    <h2
                        className="text-5xl md:text-[8rem] font-black text-white uppercase tracking-tighter leading-tight cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Final Heading:", data.finalHeading || "Mission Complete");
                                if (val) onUpdate?.('finalHeading', val);
                            }
                        }}
                    >
                        {data.finalHeading || "Mission Complete"}
                    </h2>
                    <div className="h-[2px] w-24 bg-rose-500/20 mx-auto" />
                    <p className="text-rose-100/40 text-[10px] font-black uppercase tracking-[1em] italic">
                        The ultimate surprise payload has been delivered successfully.
                    </p>
                </div>

                {/* Final Engagement Cluster */}
                <div className="pt-12 flex flex-col gap-10">
                    <div className="flex justify-center gap-8">
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
                        <RefreshCw size={14} /> Restart Protocol
                    </motion.button>
                </div>

                {/* Corner detail */}
                <div className="absolute bottom-10 right-10 text-white/5"><Zap size={100} /></div>
            </motion.div>
        </div>
    );
};

export default SSSFinal;
