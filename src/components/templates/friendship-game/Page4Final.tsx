import { motion } from 'framer-motion';
import { Send, Share2, RefreshCw, Heart, Stars, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const Page4Final = ({ data, onNext }: any) => {
    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#06b6d4', '#ec4899', '#ffffff']
        });
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050508] flex flex-col items-center justify-center p-6 font-outfit select-none isolate">

            {/* BACKGROUND VFX */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-pink-500/10 blur-[150px] rounded-full animate-pulse" />
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-2xl bg-white/5 border border-white/10 rounded-[4rem] p-12 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl text-center flex flex-col items-center gap-12"
            >
                <div className="p-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-[2.5rem] shadow-[0_0_40px_rgba(236,72,153,0.4)]">
                    <Heart size={44} fill="white" className="text-white animate-bounce" />
                </div>

                <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black text-white font-romantic tracking-tight">
                        Thanks for being you!
                    </h2>
                    <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto rounded-full" />
                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed italic max-w-md mx-auto">
                        "{data.text || "Life is infinitely better with a friend like you. Here's to many more memories, challenges, and laughs together! You're one in a billion."}"
                    </p>
                </div>

                {/* Final Interactive Cluster */}
                <div className="flex flex-col gap-8 w-full">
                    <div className="flex items-center justify-center gap-6">
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            className="p-5 bg-white/5 rounded-full text-cyan-400 border border-white/10 hover:bg-cyan-500/10 transition-all shadow-xl"
                        >
                            <Share2 size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: -10 }}
                            className="p-5 bg-white/5 rounded-full text-pink-400 border border-white/10 hover:bg-pink-500/10 transition-all shadow-xl"
                        >
                            <Send size={24} />
                        </motion.button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-3 text-white/30 hover:text-white transition-colors uppercase font-black text-[10px] tracking-[0.6em] mx-auto"
                    >
                        <RefreshCw size={14} /> Replay Mission
                    </motion.button>
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

export default Page4Final;
