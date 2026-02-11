import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, BookOpen } from 'lucide-react';

const Page6Letter = ({ data, onNext }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#8b0000] flex flex-col items-center justify-center p-8 font-outfit select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#b22222_0%,#8b0000_80%)]" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-4xl bg-black/20 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-12 md:p-24 shadow-[0_50px_150px_rgba(0,0,0,0.5)] text-center space-y-12"
            >
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-10 bg-white/5 rounded-full border border-white/10 relative"
                    >
                        <BookOpen size={60} className="text-white" />
                        <Heart className="absolute -top-2 -right-2 text-rose-500 fill-current animate-pulse" size={32} />
                    </motion.div>
                </div>

                <div className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block px-8 py-3 bg-white/10 rounded-full border border-white/20"
                    >
                        <span className="text-white font-black uppercase tracking-[0.5em] text-[10px]">A Letter To My Forever</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight">My Love...</h2>

                    <div className="h-[1px] w-24 bg-white/20 mx-auto" />

                    <p className="text-rose-100 text-xl md:text-3xl leading-relaxed italic font-medium whitespace-pre-wrap px-4">
                        "{data.message || "You are my greatest adventure and my favorite story. Every moment spent with you is a memory I'll cherish forever. I love you more than words can express."}"
                    </p>
                </div>

                <div className="pt-12">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-20 py-8 bg-white text-rose-900 font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl transition-all"
                    >
                        Our Promise
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
