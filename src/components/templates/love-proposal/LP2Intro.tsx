import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, Star } from 'lucide-react';

const LP2Intro = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#2b0303] flex flex-col items-center justify-center p-8 font-serif select-none isolate text-center">

            {/* Cinematic Mood Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#450a0a_0%,transparent_70%)] opacity-40" />
                <div className="absolute inset-0 bg-[#000]/10" />

                {/* Floating Gold Particles */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-amber-500 rounded-full"
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
                className="relative z-10 w-full max-w-4xl bg-[#450a0a]/40 backdrop-blur-3xl border-4 border-amber-600/30 rounded-[4rem] p-12 md:p-24 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)] overflow-hidden"
            >
                {/* Royal Ornament */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent" />

                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12 relative inline-block text-amber-500"
                >
                    <div className="p-12 bg-[#2b0303] rounded-full border border-amber-600/20 shadow-inner">
                        <Star size={60} fill="currentColor" className="opacity-80" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-4 -right-4"
                        >
                            <Heart size={44} fill="#dc2626" className="text-[#dc2626]" />
                        </motion.div>
                    </div>
                </motion.div>

                <div className="space-y-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-4 px-10 py-3 bg-[#1a0101] rounded-full border border-amber-600/20"
                    >
                        <span className="text-amber-500 font-black uppercase tracking-[0.6em] text-[10px]">A Cinematic Prophecy</span>
                    </motion.div>

                    <h1
                        className="text-5xl md:text-9xl font-black text-white leading-tight font-romantic tracking-tighter cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Heading:", data.heading || "To The Moon & Back");
                                if (val) onUpdate?.('heading', val);
                            }
                        }}
                    >
                        {data.heading || "To The Moon & Back"}
                    </h1>

                    <p
                        className="text-amber-100/40 text-xl md:text-3xl leading-relaxed italic max-w-xl mx-auto border-t border-amber-600/20 pt-12"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Subtext:", data.subtext || "Some stories are written in the stars, but ours is written in my heart.");
                                if (val) onUpdate?.('subtext', val);
                            }
                        }}
                    >
                        "{data.subtext || "Some stories are written in the stars, but ours is written in my heart."}"
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(245,158,11,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-20 py-8 bg-amber-600 text-black font-black text-xs uppercase tracking-[0.6em] rounded-full transition-all flex items-center gap-6 mx-auto overflow-hidden shadow-2xl"
                >
                    <span className="relative z-10">Step Into Our Story</span>
                    <ChevronRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
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

export default LP2Intro;
