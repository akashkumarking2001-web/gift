import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw, Send, Sparkles } from 'lucide-react';

const Page4Letter = ({ data }: any) => {
    const [displayText, setDisplayText] = useState("");
    const fullText = data.message || "My dearest, from the moment we first crossed paths, my life has been transformed by your love. Today, as you unsealed this digital corner of my heart, I want you to know that my promise to you is eternal. Every heartbeat of mine belongs to you, and I am honored to walk this journey of life by your side. I love you, now and forever.";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setDisplayText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 30);
        return () => clearInterval(interval);
    }, [fullText]);

    const handleReplay = () => {
        window.location.reload();
    };

    return (
        <div className="relative min-h-screen bg-[#fffafa] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT SOFT LIGHT */}
            <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-rose-100/20 to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-2xl"
            >
                {/* PREMIUM LETTER BOX */}
                <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_50px_100px_rgba(225,29,72,0.06)] border border-rose-50 relative overflow-hidden">

                    {/* Decorative Seal Background */}
                    <div className="absolute top-10 right-10 opacity-5 -rotate-12">
                        <Heart className="w-48 h-48 text-rose-500" fill="currentColor" />
                    </div>

                    <div className="space-y-12 relative z-10">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="inline-flex items-center gap-2 text-rose-300 uppercase tracking-[0.4em] text-[10px] font-black"
                            >
                                <Sparkles size={12} />
                                <span>Eternal Vow</span>
                            </motion.div>
                            <h1 className="text-4xl md:text-6xl font-black text-rose-950 font-romantic tracking-tighter">
                                {data.letterHeading || "My Love, Always"}
                            </h1>
                        </div>

                        {/* TYPEWRITER AREA */}
                        <div className="min-h-[200px] border-l-2 border-rose-100 pl-8 md:pl-12">
                            <p className="text-slate-600 text-lg md:text-2xl leading-relaxed font-medium font-serif italic">
                                {displayText}
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                    className="inline-block w-1.5 h-6 bg-rose-400 ml-1 translate-y-1"
                                />
                            </p>
                        </div>

                        <div className="pt-8 flex flex-col md:flex-row gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleReplay}
                                className="flex-1 py-5 bg-rose-50 text-rose-600 font-black rounded-2xl text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3"
                            >
                                <RotateCcw size={16} /> Relive the moment
                            </motion.button>
                            <button className="flex-1 py-5 bg-rose-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-lg shadow-rose-200">
                                <Send size={16} /> Send My Own
                            </button>
                        </div>

                        <div className="text-[9px] text-rose-200 uppercase font-black tracking-[0.8em] text-center mt-8">
                            Unsealed // Permanent
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

export default Page4Letter;
