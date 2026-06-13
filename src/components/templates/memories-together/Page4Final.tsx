import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles, Share2, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';

const Page4Final = ({ data }: any) => {
    React.useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#3b82f6', '#ffffff', '#1e3a8a']
        });
    }, []);

    const handleReplay = () => {
        window.location.reload();
    };

    return (
        <div className="relative min-h-screen bg-black flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT GLOW */}
            <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-blue-900/20 via-transparent to-transparent z-0" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 w-full max-w-xl"
            >
                {/* CINEMATIC FINAL CARD */}
                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] p-12 md:p-16 text-center shadow-[0_50px_150px_rgba(0,0,0,0.8)] relative overflow-hidden">

                    {/* Corner Decoration */}
                    <div className="absolute top-8 right-8 text-white/5">
                        <Rocket size={120} strokeWidth={1} />
                    </div>

                    <div className="space-y-12">
                        <div className="space-y-4">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-20 h-20 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto border border-blue-500/20"
                            >
                                <Heart className="text-blue-400" fill="currentColor" size={32} />
                            </motion.div>

                            <h1 className="text-white text-4xl md:text-6xl font-black font-romantic tracking-tighter leading-tight drop-shadow-2xl">
                                {data.finalHeading || "To Infinity & Beyond"}
                            </h1>
                        </div>

                        <p className="text-white/60 text-lg md:text-2xl leading-relaxed font-medium italic">
                            "{data.finalMessage || "Thank you for being my favorite scene in this beautiful movie called life. I can't wait for our next chapter together."}"
                        </p>

                        <div className="pt-8 flex flex-col md:flex-row gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleReplay}
                                className="flex-1 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                            >
                                <RotateCcw size={16} /> Replay
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                            >
                                <Share2 size={16} /> Share Moment
                            </motion.button>
                        </div>

                        <div className="text-[9px] text-white/10 uppercase font-black tracking-[0.6em]">
                            End of Scene // Directed with Love
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

export default Page4Final;
