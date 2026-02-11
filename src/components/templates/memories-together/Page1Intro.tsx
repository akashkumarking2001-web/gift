import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Star } from 'lucide-react';

const Page1Intro = ({ data, onNext }: any) => {
    return (
        <div className="relative min-h-screen bg-black flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* CINEMATIC SPACE BACKGROUND */}
            <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center brightness-[0.3]" />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-transparent to-black" />

            {/* FLOATING STARS */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-white/20"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.2, 1] }}
                        transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
                    >
                        <Star size={Math.random() * 8 + 4} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="relative z-20 flex flex-col items-center text-center space-y-12"
            >
                {/* GLASS CARD */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3.5rem] p-12 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.5)] max-w-lg w-full relative group overflow-hidden">

                    {/* Inner Shine */}
                    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 pointer-events-none" />

                    <div className="space-y-6 mb-12">
                        <motion.div
                            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mx-auto border border-white/20"
                        >
                            <Rocket className="text-blue-400" size={40} />
                        </motion.div>

                        <h1 className="text-white text-5xl md:text-7xl font-black font-romantic tracking-tighter leading-tight drop-shadow-2xl">
                            {data.heading || "To the moon and back"}
                        </h1>
                        <p className="text-white/40 font-bold text-[10px] uppercase tracking-[0.4em]">
                            Prepare for a cinematic journey
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59,130,246,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="w-full py-6 bg-white text-black font-black text-[11px] uppercase tracking-[0.4em] rounded-2xl flex items-center justify-center gap-4 group transition-all"
                    >
                        <span>Let's Go 🚀</span>
                        <Sparkles size={16} className="text-blue-600 group-hover:rotate-12 transition-transform" />
                    </motion.button>
                </div>

                {/* Progress Visual */}
                <div className="flex gap-3">
                    <div className="w-12 h-1 bg-white/40 rounded-full" />
                    <div className="w-4 h-1 bg-white/10 rounded-full" />
                    <div className="w-4 h-1 bg-white/10 rounded-full" />
                    <div className="w-4 h-1 bg-white/10 rounded-full" />
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

export default Page1Intro;
