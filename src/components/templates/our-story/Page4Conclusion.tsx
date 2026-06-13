import { motion } from 'framer-motion';
import { Heart, Sparkles, RefreshCw, Share2, Send, Star, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const Page4Conclusion = ({ data, onNext }: any) => {
    useEffect(() => {
        const end = Date.now() + 5 * 1000;
        const colors = ['#fb7185', '#f43f5e', '#ffffff', '#fdba74'];

        (function frame() {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 3,
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
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-center p-8 font-outfit select-none isolate">

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#fee2e2_1px,transparent_1px),linear-gradient(to_bottom,#fee2e2_1px,transparent_1px)] bg-[size:50px_50px] opacity-[0.1]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-2xl bg-white border-2 border-pink-50 rounded-[4rem] p-12 md:p-20 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.1)] text-center space-y-12"
            >
                {/* Visual Reveal */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="relative inline-block"
                >
                    <div className="p-10 bg-rose-50 rounded-[3rem] shadow-inner relative z-10 transition-transform hover:scale-110">
                        <Heart size={60} fill="#f43f5e" className="text-rose-500 drop-shadow-[0_10px_20px_rgba(244,63,94,0.3)]" />
                    </div>
                    <Star className="absolute -top-4 -right-4 text-amber-400 fill-current animate-pulse shadow-2xl" size={40} />
                </motion.div>

                <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black text-[#5e2d63] font-romantic tracking-tight">
                        To Be Continued...
                    </h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
                    <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed italic">
                        "{data.message || "This is just the first chapter of our infinity. I can't wait to see what the next pages bring. No matter where we go, I'm glad it's with you."}"
                    </p>
                </div>

                {/* Final Interactive Cluster */}
                <div className="pt-8 flex flex-col gap-8 items-center">
                    <div className="flex gap-8">
                        <motion.button whileHover={{ scale: 1.1 }} className="p-5 bg-rose-50 rounded-full text-rose-500 shadow-lg"><Share2 size={24} /></motion.button>
                        <motion.button whileHover={{ scale: 1.1 }} className="p-5 bg-rose-50 rounded-full text-rose-500 shadow-lg"><Send size={24} /></motion.button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-3 text-slate-300 hover:text-rose-400 transition-colors uppercase font-black text-[10px] tracking-[0.6em]"
                    >
                        <RefreshCw size={14} /> Read Our Story Again
                    </motion.button>
                </div>

                {/* Corner detail */}
                <div className="absolute top-0 right-0 p-8 text-rose-100"><Zap size={40} strokeWidth={3} /></div>
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

export default Page4Conclusion;
