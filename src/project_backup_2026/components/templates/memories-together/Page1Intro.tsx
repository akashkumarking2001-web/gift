import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Zap, Sparkles, Star, MoveRight, ShieldCheck, Aperture, Film } from 'lucide-react';

interface Page1IntroProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Intro = ({ data, onNext, isEditing = false, onUpdate }: Page1IntroProps) => {

    const defaultData = {
        text: data.text || "Every photo tells a story, and my favorite stories are the ones with you."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#1a0f0f] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC ROSE-TINTED CINEMA ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.25, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(225,29,72,0.15),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(244,63,94,0.1),transparent_50%)]"
                />

                {/* Heavy Film Grain */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')] opacity-10 mix-blend-overlay" />

                {/* Vintage Light Leaks */}
                <motion.div
                    animate={{ opacity: [0, 0.3, 0], x: ['-20%', '0%', '-20%'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-rose-500/20 to-transparent blur-3xl blend-screen"
                />
                <motion.div
                    animate={{ opacity: [0, 0.2, 0], x: ['20%', '0%', '20%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 to-transparent blur-3xl blend-screen"
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Cinema Sequence */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-rose-950/30 backdrop-blur-3xl px-14 py-4 rounded-full border border-rose-900/30 shadow-2xl mx-auto isolate"
                >
                    <Film size={16} className="text-rose-400" />
                    <span className="text-rose-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Cinema Sequence 01 // Reel Loaded</span>
                    <Zap size={16} className="text-rose-400 fill-current animate-pulse" />
                </motion.div>

                {/* THE LENS ARTIFACT: High-Fidelity Camera Optics */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative perspective-[3000px] mb-8"
                >
                    <div className="relative p-20 md:p-32 bg-[#2a1515]/80 backdrop-blur-[60px] rounded-[50%] border border-rose-800/20 shadow-[0_60px_120px_-20px_rgba(225,29,72,0.3)] isolate overflow-hidden group">

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-1000 rounded-full" />

                        {/* Focusing Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border border-dashed border-rose-700/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-12 border border-rose-900/40 rounded-full"
                        />

                        {/* Core Aperture */}
                        <div className="relative z-10">
                            <Aperture size={100} strokeWidth={1} className="text-rose-400 drop-shadow-[0_0_40px_rgba(244,63,94,0.6)]" />
                        </div>

                        {/* Flash Element */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-4 -right-4 p-5 bg-rose-950/60 backdrop-blur-xl rounded-full border border-rose-500/30 shadow-2xl flex items-center justify-center"
                        >
                            <Sparkles size={24} className="text-rose-200" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE NARRATIVE TITLE: Hollywood Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <div className="flex flex-col items-center gap-6">
                        <Camera size={24} className="text-rose-500 opacity-60" />
                        <h1 className="text-5xl md:text-[8rem] font-black text-rose-50 leading-tight tracking-[0.02em] px-4 drop-shadow-3xl italic">
                            "{defaultData.text}"
                        </h1>
                    </div>

                    <div className="h-[2px] w-96 bg-gradient-to-r from-transparent via-rose-900/60 to-transparent mx-auto" />
                </div>

                {/* PROFESSIONAL TACTICAL ACTION */}
                <div className="relative z-10 flex flex-col items-center gap-12 pb-32">
                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        whileHover={{ scale: 1.05, y: -8 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="group relative px-28 py-10 bg-[#1a0f0f] border border-rose-900/40 rounded-[4rem] text-rose-400 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(225,29,72,0.2)] transition-all flex items-center gap-8 isolate overflow-hidden hover:border-rose-500/50 hover:shadow-[0_0_60px_-10px_rgba(244,63,94,0.4)]"
                    >
                        <div className="absolute inset-0 bg-rose-900 opacity-0 group-hover:opacity-20 transition-opacity" />
                        <span className="relative z-10">Start The Reel</span>
                        <MoveRight className="relative z-10 w-8 h-8 border border-rose-800/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700 group-hover:border-rose-500" />
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-rose-500" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-rose-300">Focus: Sharp</span>
                        <div className="h-[1px] w-48 bg-rose-500" />
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-rose-900 italic">Cinema</div>
                <div className="h-[1px] w-72 bg-rose-900/40" />
                <span className="text-[10px] font-black tracking-widest text-rose-200 uppercase tracking-[1.5em]">MEMORIES-VIEW // V6.01</span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />

        </div>
    );
};

export default Page1Intro;
