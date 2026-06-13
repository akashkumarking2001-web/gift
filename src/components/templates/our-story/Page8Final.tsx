import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, Share2, RefreshCw, Star, Bookmark } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const Page8Final = ({ data, isEditing = false, onUpdate }: any) => {
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
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#fda4af', '#ffffff', '#fb7185'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#fda4af', '#ffffff', '#fb7185'] });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#faf7f2] flex flex-col items-center justify-center p-8 font-serif select-none isolate">

            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#fee2e2_0%,transparent_70%)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-4xl bg-white/60 backdrop-blur-3xl rounded-[4rem] border-4 border-white p-12 md:p-24 shadow-[0_40px_100px_rgba(0,0,0,0.03)] text-center space-y-12"
            >
                {/* Final Illustration Ornament */}
                <div className="relative inline-block group">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-[-40px] border-2 border-dashed border-rose-200 rounded-full opacity-40"
                    />

                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="p-16 bg-white rounded-full shadow-xl border-4 border-rose-50 relative z-10"
                    >
                        <Bookmark size={80} className="text-rose-400 opacity-60" />
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-rose-500"
                        >
                            <Heart size={44} fill="currentColor" />
                        </motion.div>
                    </motion.div>
                </div>

                <div className="space-y-8">
                    <h2
                        className="text-5xl md:text-[8rem] font-black text-[#1e293b] leading-tight font-serif tracking-tighter cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Final Heading:", data.finalHeading || "To Be Continued");
                                if (val) onUpdate?.('finalHeading', val);
                            }
                        }}
                    >
                        {data.finalHeading || "To Be Continued"}
                    </h2>
                    <div className="h-[2px] w-24 bg-rose-100 mx-auto" />
                    <p
                        className="text-[#64748b] text-xl md:text-3xl font-medium italic max-w-xl mx-auto cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Final Message:", data.finalText || "Our story doesn't have an end, only thousands of new beginnings.");
                                if (val) onUpdate?.('finalText', val);
                            }
                        }}
                    >
                        "{data.finalText || "Our story doesn't have an end, only thousands of new beginnings."}"
                    </p>
                </div>

                {/* Final Engagement Cluster */}
                <div className="pt-12 flex flex-col gap-10">
                    <div className="flex justify-center gap-10">
                        <motion.button
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="p-6 bg-white rounded-full text-[#64748b] shadow-xl border border-[#f1f5f9] hover:bg-rose-50 transition-colors"
                        >
                            <Share2 size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="p-6 bg-white rounded-full text-[#64748b] shadow-xl border border-[#f1f5f9] hover:bg-rose-50 transition-colors"
                        >
                            <Send size={24} />
                        </motion.button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-4 text-[#94a3b8] hover:text-[#1e293b] transition-colors uppercase font-bold text-[10px] tracking-[0.5em] mx-auto"
                    >
                        <RefreshCw size={14} /> Re-read Our Story
                    </motion.button>
                </div>

                {/* Aesthetic Detail */}
                <div className="absolute bottom-10 left-10 text-rose-100/40"><Star size={60} fill="currentColor" /></div>
            </motion.div>
        </div>
    );
};

export default Page8Final;
