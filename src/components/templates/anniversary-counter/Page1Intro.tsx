import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles, ChevronRight, Bookmark } from 'lucide-react';

const Page1Intro = ({ data, onNext }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-center p-8 font-outfit select-none isolate text-center">

            {/* GILDED AMBIANCE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#fefce8_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#fef3c7_1px,transparent_1px),linear-gradient(to_bottom,#fef3c7_1px,transparent_1px)] bg-[size:60px_60px] opacity-[0.2]" />

                {/* Floating Gold Dust */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-400 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 1, 0],
                            scale: [1, 2, 0.5]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 4
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-2xl bg-white border-[1px] border-amber-200/50 rounded-[4rem] p-12 md:p-24 shadow-[0_60px_120px_-30px_rgba(251,191,36,0.15)] overflow-hidden"
            >
                {/* Luxury Ornament */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent" />

                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12 relative inline-block"
                >
                    <div className="p-10 bg-[#fffdfa] rounded-full border border-amber-100 shadow-inner">
                        <Bookmark size={50} className="text-amber-500 fill-current opacity-20" />
                        <Heart size={44} fill="#f59e0b" className="text-amber-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]" />
                    </div>
                </motion.div>

                <div className="space-y-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block px-8 py-3 bg-amber-50 rounded-full border border-amber-200/50"
                    >
                        <span className="text-amber-700 font-black uppercase tracking-[0.6em] text-[10px]">A Milestone of Infinity</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-8xl font-black text-[#451a03] font-romantic leading-tight">
                        {data.heading || "The Golden Chapter"}
                    </h1>

                    <p className="text-amber-900/60 text-xl md:text-2xl font-medium leading-relaxed italic max-w-md mx-auto">
                        "{data.text || "Celebrating every second, minute, and day we've spent building our beautiful infinity."}"
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, y: -5, boxShadow: "0 40px 100px -15px rgba(245,158,11,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-20 py-8 bg-[#451a03] text-amber-50 font-black text-xs uppercase tracking-[0.6em] rounded-full transition-all flex items-center gap-6 mx-auto overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-transparent" />
                    <span className="relative z-10">Ascend Together</span>
                    <ChevronRight size={18} className="relative z-10 p-0.5 border border-amber-50 rounded-full transition-transform group-hover:translate-x-2" />
                </motion.button>
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

export default Page1Intro;
