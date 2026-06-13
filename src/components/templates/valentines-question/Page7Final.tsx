import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, Share2, RefreshCw, Star, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect, useState } from 'react';
import ShareModal from '../../ShareModal';

const Page7Final = ({ data }: any) => {
    const [showShareModal, setShowShareModal] = useState(false);
    const giftUrl = typeof window !== 'undefined' ? window.location.href : '';

    useEffect(() => {
        const end = Date.now() + 10 * 1000;
        const colors = ['#ffffff', '#ff0000', '#ffd700'];

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#8b0000] flex flex-col items-center justify-center p-8 font-outfit select-none isolate">
            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                giftUrl={giftUrl}
                giftTitle={data.finalHeading || "Our Valentine Story"}
            />

            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#b22222_0%,#8b0000_80%)]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-2xl bg-black/30 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-12 md:p-20 shadow-[0_60px_150px_rgba(0,0,0,0.6)] text-center space-y-12"
            >
                {/* Final Interactive Reveal */}
                <div className="relative inline-block">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-12 bg-white rounded-[3rem] shadow-2xl relative z-10"
                    >
                        <Heart size={80} fill="#ff0000" className="text-rose-600 drop-shadow-[0_10px_30px_rgba(255,0,0,0.4)]" />
                    </motion.div>
                    <div className="absolute -top-4 -right-4 bg-amber-400 p-4 rounded-full shadow-lg text-white animate-pulse">
                        <Star size={24} fill="white" />
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-5xl md:text-[8rem] font-black text-white font-romantic leading-tight">
                        {data.finalHeading || "Forever Yours"}
                    </h2>
                    <div className="h-[2px] w-24 bg-white/20 mx-auto" />
                    <p className="text-rose-100 text-xl md:text-2xl font-medium tracking-tight italic opacity-80">
                        "Distance means so little when someone means so much."
                    </p>
                </div>

                {/* Final Engagement Cluster */}
                <div className="pt-12 flex flex-col gap-10">
                    <div className="flex justify-center gap-8">
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            onClick={() => setShowShareModal(true)}
                            className="p-6 bg-white/10 rounded-full text-white shadow-xl border border-white/20 hover:bg-white/20 transition-colors"
                        >
                            <Share2 size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            onClick={() => setShowShareModal(true)}
                            className="p-6 bg-white/10 rounded-full text-white shadow-xl border border-white/20 hover:bg-white/20 transition-colors"
                        >
                            <Send size={24} />
                        </motion.button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-4 text-white/30 hover:text-white transition-colors uppercase font-black text-[10px] tracking-[0.6em] mx-auto"
                    >
                        <RefreshCw size={14} /> Revisit Our Story
                    </motion.button>
                </div>

                {/* Corner detail */}
                <div className="absolute bottom-10 left-10 text-white/5"><Zap size={100} /></div>
            </motion.div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />
        </div>
    );
};

export default Page7Final;
