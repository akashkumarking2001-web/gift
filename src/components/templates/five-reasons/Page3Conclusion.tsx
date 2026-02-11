import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const Page3Conclusion = ({ data }: any) => {
    React.useEffect(() => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#EC4899', '#8B5CF6', '#ffffff']
        };

        function fire(particleRatio: number, opts: any) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    }, []);

    const handleReplay = () => {
        window.location.reload();
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a0b2e] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT FLOATING HEARTS */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-500/10"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -100, 0],
                            rotate: 360,
                            scale: [1, 1.5, 1]
                        }}
                        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                    >
                        <Heart size={40 + Math.random() * 40} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-sm"
            >
                {/* FINAL MESSAGE CARD */}
                <div className="bg-[#111] rounded-[3rem] p-12 md:p-14 text-center shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5 relative overflow-hidden">

                    {/* Top Decorative Sparkle */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent" />

                    <div className="space-y-10">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-white/5 w-24 h-24 rounded-full flex items-center justify-center mx-auto border border-white/10"
                        >
                            <Sparkles className="text-pink-400" size={40} />
                        </motion.div>

                        <div className="space-y-4">
                            <h1 className="text-white text-4xl md:text-5xl font-black font-romantic tracking-tighter">
                                {data.finalHeading || "Forever Yours"}
                            </h1>
                            <p className="text-white/60 font-medium text-lg leading-relaxed italic">
                                "{data.finalMessage || "Because out of everything I’ve ever unsealed, you are my favorite secret to keep and my favorite story to tell."}"
                            </p>
                        </div>

                        <div className="pt-8 space-y-4">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236,72,153,0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleReplay}
                                className="w-full py-5 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 active:bg-pink-100 transition-all"
                            >
                                <RotateCcw size={16} /> Relive the reasons
                            </motion.button>
                            <div className="text-[9px] text-white/10 uppercase font-black tracking-[0.6em]">
                                Ended // With Love
                            </div>
                        </div>
                    </div>
                </div>
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

export default Page3Conclusion;
