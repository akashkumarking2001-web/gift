import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RotateCcw, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const Page3FinalWord = ({ data }: any) => {
    React.useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#EC4899', '#ffffff', '#FBCFE8']
        });
    }, []);

    const handleReplay = () => {
        window.location.reload();
    };

    return (
        <div className="relative min-h-screen bg-[#fdfaff] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT DECOR */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <Heart className="absolute top-10 left-10 w-48 h-48 text-pink-100 rotate-[-15deg]" fill="currentColor" />
                <Star className="absolute bottom-20 right-10 w-32 h-32 text-pink-100 rotate-[15deg]" fill="currentColor" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-lg"
            >
                {/* FINAL MESSAGE CARD */}
                <div className="bg-white rounded-[3rem] p-12 md:p-16 text-center shadow-[0_50px_100px_rgba(236,72,153,0.1)] border border-pink-50 relative overflow-hidden">

                    {/* Inner Decorative Shine */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />

                    <div className="space-y-8">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-inner"
                        >
                            <Heart className="text-pink-500" fill="currentColor" size={32} />
                        </motion.div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-black text-pink-900 font-romantic tracking-tighter">
                                {data.finalTitle || "Always Yours"}
                            </h1>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                {data.finalMessage || "I hope this little journey brought a smile to your face. You're the most beautiful reality I've ever known."}
                            </p>
                        </div>

                        <div className="pt-8 flex flex-col gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleReplay}
                                className="w-full py-5 bg-pink-50 text-pink-600 font-black rounded-2xl text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 transition-colors hover:bg-pink-100"
                            >
                                <RotateCcw size={16} /> Replay Experience
                            </motion.button>
                            <div className="text-[9px] text-pink-200 uppercase font-black tracking-widest mt-4">
                                Handcrafted with love
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

export default Page3FinalWord;
