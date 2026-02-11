import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles, ChevronRight } from 'lucide-react';

interface Page1IntroProps {
    data: {
        greeting?: string;
        subtext?: string;
        buttonText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Intro = ({ data, onNext, isEditing = false, onUpdate }: Page1IntroProps) => {
    const defaultData = {
        greeting: data.greeting || "Our Anniversary is Coming!",
        subtext: data.subtext || "The countdown to our special day has begun...",
        buttonText: data.buttonText || "See the Countdown"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#fff5f8] via-[#fdf2f9] to-[#f5f3ff] flex flex-col items-center justify-center p-6 md:p-12 font-outfit select-none">

            {/* AMBIENT FLOATING ELEMENTS */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Soft Bokeh Orbs */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white/40 rounded-full blur-3xl shadow-[0_0_50px_rgba(255,255,255,0.5)]"
                        style={{
                            width: `${Math.random() * 300 + 100}px`,
                            height: `${Math.random() * 300 + 100}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            x: [0, 50, 0],
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                        }}
                    />
                ))}

                {/* Floating Flower Petals / Hearts */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`heart-${i}`}
                        className="absolute text-pink-300/40 text-2xl"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -120, 0],
                            rotate: [0, 360],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 8 + Math.random() * 8,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    >
                        {['🌸', '🤍', '✨', '💝'][i % 4]}
                    </motion.div>
                ))}
            </div>

            {/* MAIN CONTENT CARD */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-4xl bg-white/40 backdrop-blur-2xl rounded-[4rem] border border-white/60 p-12 md:p-24 shadow-[0_50px_100px_-20px_rgba(255,182,193,0.3)] text-center overflow-hidden isolate"
            >
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />

                {/* Visual Anchor: Animated Character or Icon */}
                <motion.div
                    className="mb-12 relative inline-block"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="relative p-10 bg-white/80 rounded-[3rem] shadow-xl border border-pink-100 flex items-center justify-center group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Heart size={80} fill="#f43f5e" className="text-rose-500 drop-shadow-[0_10px_20px_rgba(244,63,94,0.3)]" />
                        </motion.div>

                        {/* Orbiting Sparkles */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 pointer-events-none"
                        >
                            <Stars size={20} className="absolute top-2 right-4 text-amber-400 fill-current animate-pulse opacity-50" />
                        </motion.div>
                    </div>

                    {/* Ground Shadow */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-rose-900/5 blur-xl rounded-full" />
                </motion.div>

                {/* Typography */}
                <div className="space-y-8 mb-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-rose-500/10 rounded-full border border-rose-500/20"
                    >
                        <Sparkles size={12} className="text-rose-500 animate-pulse" />
                        <span className="text-rose-600 font-black uppercase tracking-[0.4em] text-[10px]">A Love Like No Other</span>
                    </motion.div>

                    <div className="space-y-4">
                        <motion.h1
                            className="text-5xl md:text-8xl font-black text-[#5e2d63] leading-[1.1] font-romantic"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {defaultData.greeting}
                        </motion.h1>
                        <motion.p
                            className="text-slate-500 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            {defaultData.subtext}
                        </motion.p>
                    </div>
                </div>

                {/* Button */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -5, boxShadow: "0 30px 60px -15px rgba(244,63,94,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-16 py-8 bg-[#fb7185] hover:bg-[#f43f5e] text-white font-black text-xs uppercase tracking-[0.5em] rounded-[2.5rem] transition-all flex items-center gap-6 mx-auto shadow-2xl overflow-hidden"
                >
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/10 to-transparent" />
                    <span className="relative z-10">{defaultData.buttonText}</span>
                    <ChevronRight size={20} className="relative z-10 p-0.5 border-2 border-white rounded-full transition-transform group-hover:translate-x-2" />
                </motion.button>
            </motion.div>

            {/* CORNER DETAILS */}
            <div className="fixed top-0 left-0 p-8 flex gap-4 text-pink-300 opacity-30 select-none">
                <Heart size={40} className="animate-pulse" />
            </div>
            <div className="fixed bottom-0 right-0 p-8 flex gap-4 text-pink-300 opacity-30 select-none">
                <Heart size={40} className="animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

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
