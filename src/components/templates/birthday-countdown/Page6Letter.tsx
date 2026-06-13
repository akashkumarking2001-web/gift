import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, Share2, RefreshCw, PenTool } from 'lucide-react';
import { useEffect } from 'react';

const Page6Letter = ({ data, onNext }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-center p-8 font-outfit select-none isolate">

            {/* AMBIENT SOFT FLOW */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-1/4 -left-1/4 w-full h-full bg-pink-100 blur-[150px] rounded-full"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-4xl bg-white border-2 border-pink-50 rounded-[4rem] p-12 md:p-24 shadow-[0_50px_120px_-30px_rgba(251,113,133,0.2)] text-center space-y-12"
            >
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-8 bg-rose-50 rounded-full border border-rose-100 relative"
                    >
                        <PenTool size={48} className="text-rose-500" />
                        <Sparkles className="absolute -top-2 -right-2 text-amber-400 animate-pulse" size={24} />
                    </motion.div>
                </div>

                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block px-8 py-3 bg-pink-500/5 rounded-full border border-pink-500/10"
                    >
                        <span className="text-pink-600 font-black uppercase tracking-[0.5em] text-[10px]">A Handwritten Note for You</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-7xl font-black text-[#5e2d63] font-romantic">My Dear...</h2>

                    <div className="h-0.5 w-24 bg-pink-100 mx-auto" />

                    <p className="text-slate-500 text-xl md:text-3xl leading-relaxed italic font-medium whitespace-pre-wrap px-4">
                        "{data.message || "I wanted to take a moment to tell you how much you mean to me. Every day with you is a gift, but today is extra special because it's YOUR day. May this year be just as incredible as you are."}"
                    </p>
                </div>

                <div className="pt-12">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-20 py-8 bg-[#fb7185] hover:bg-[#f43f5e] text-white font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl transition-all"
                    >
                        The Final Reveal
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

export default Page6Letter;
