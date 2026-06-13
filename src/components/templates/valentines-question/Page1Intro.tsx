import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles, ChevronRight } from 'lucide-react';

const Page1Intro = ({ data, onNext }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#8b0000] flex flex-col items-center justify-center p-8 font-outfit select-none isolate">

            {/* LUXURY RED GRADIENT BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#b22222_0%,#8b0000_60%,#4a0000_100%)]" />

                {/* Animated Particles */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-300 opacity-20"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -100],
                            opacity: [0, 0.4, 0],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    >
                        {['❤️', '✨', '💖', '⭐'][i % 4]}
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-4xl bg-black/20 backdrop-blur-2xl rounded-[4rem] border border-white/10 p-12 md:p-24 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] text-center overflow-hidden"
            >
                {/* Visual Anchor: Glowing Heart */}
                <motion.div
                    className="mb-12 relative inline-block"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="relative p-12 bg-white/5 rounded-[4rem] border border-white/10 shadow-2xl flex items-center justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.15, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                        >
                            <Heart size={100} fill="#ff4d4d" className="text-rose-500 drop-shadow-[0_0_40px_rgba(255,77,77,0.8)]" />
                        </motion.div>

                        <Sparkles className="absolute top-4 right-4 text-amber-300 animate-pulse fill-current" size={32} />
                    </div>

                    {/* Shadow underneath */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-6 bg-black/40 blur-2xl rounded-full" />
                </motion.div>

                {/* Typography */}
                <div className="space-y-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-3 px-8 py-3 bg-white/10 rounded-full border border-white/20"
                    >
                        <Heart size={14} className="text-white fill-current animate-pulse" />
                        <span className="text-white font-black uppercase tracking-[0.6em] text-[10px]">A Question From My Heart</span>
                    </motion.div>

                    <div className="space-y-4">
                        <motion.h1
                            className="text-5xl md:text-8xl font-black text-white leading-[1.1] font-romantic"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {data.greeting || "Hello Beautiful"}
                        </motion.h1>
                        <motion.p
                            className="text-rose-100 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            {data.subtext || "I have something very important I need to ask you..."}
                        </motion.p>
                    </div>
                </div>

                {/* Button */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -5, boxShadow: "0 40px 100px -15px rgba(255,77,77,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-20 py-8 bg-white text-rose-900 font-black text-xs uppercase tracking-[0.5em] rounded-[2.5rem] transition-all flex items-center gap-6 mx-auto shadow-2xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-rose-50 to-white" />
                    <span className="relative z-10">{data.buttonText || "Open the Question"}</span>
                    <ChevronRight size={20} className="relative z-10 p-0.5 border-2 border-rose-900 rounded-full transition-transform group-hover:translate-x-2" />
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
