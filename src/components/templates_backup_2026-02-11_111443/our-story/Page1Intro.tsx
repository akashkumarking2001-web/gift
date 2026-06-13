import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Star, MoveRight, ShieldCheck, BookOpen, Clock, Infinity } from 'lucide-react';

interface Page1IntroProps {
    data: {
        heading?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Intro = ({ data, onNext, isEditing = false, onUpdate }: Page1IntroProps) => {

    const defaultData = {
        heading: data.heading || "Every great story has a beginning... this is ours."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#02020a] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC STARLIGHT CHRONICLES ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.25, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(79,70,229,0.15),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.1),transparent_50%)]"
                />

                {/* Nebula Clouds */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-screen animate-pulse" />

                {/* Parallax Stars */}
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-indigo-200/40 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
                        transition={{ duration: 5 + Math.random() * 8, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Chronicle Sequence */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-indigo-950/20 backdrop-blur-3xl px-14 py-4 rounded-full border border-indigo-900/30 shadow-2xl mx-auto isolate"
                >
                    <Clock size={16} className="text-indigo-400" />
                    <span className="text-indigo-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Chronicle Sequence 01 // Timeline Verified</span>
                    <Zap size={16} className="text-indigo-400 fill-current animate-pulse" />
                </motion.div>

                {/* THE STORYBOOK ARTIFACT: High-Fidelity Crystal Tome */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative perspective-[3000px] mb-8"
                >
                    <div className="relative p-20 md:p-32 bg-[#050510]/80 backdrop-blur-[60px] rounded-[5rem] border border-indigo-800/20 shadow-[0_60px_120px_-20px_rgba(79,70,229,0.25)] isolate overflow-hidden group">

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-1000" />

                        {/* Spinning Magic Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-indigo-700/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-indigo-900/10 rounded-full"
                        />

                        {/* Core Iconology */}
                        <div className="relative z-10">
                            <BookOpen size={100} strokeWidth={1} className="text-indigo-400 drop-shadow-[0_0_40px_rgba(99,102,241,0.6)]" />
                        </div>

                        {/* Floating Infinite Accent */}
                        <motion.div
                            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute -top-6 -right-6 p-6 bg-[#0f0f20] backdrop-blur-xl rounded-[2rem] border border-indigo-600/30 shadow-2xl flex items-center justify-center"
                        >
                            <Infinity size={28} className="text-indigo-300" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE NARRATIVE TITLE: Starlight Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <div className="flex flex-col items-center gap-6">
                        <Sparkles size={24} className="text-indigo-500 opacity-60 animate-pulse" />
                        <h1 className="text-5xl md:text-[8rem] font-black text-white leading-tight tracking-[0.02em] px-4 drop-shadow-3xl italic">
                            "{defaultData.heading}"
                        </h1>
                    </div>

                    <div className="h-[2px] w-96 bg-gradient-to-r from-transparent via-indigo-900/40 to-transparent mx-auto" />
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
                        className="group relative px-28 py-10 bg-[#02020a] border border-indigo-900/40 rounded-[4rem] text-indigo-400 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(79,70,229,0.2)] transition-all flex items-center gap-8 isolate overflow-hidden hover:border-indigo-500/50 hover:shadow-[0_0_60px_-10px_rgba(99,102,241,0.4)]"
                    >
                        <div className="absolute inset-0 bg-indigo-900 opacity-0 group-hover:opacity-20 transition-opacity" />
                        <span className="relative z-10">Open The Chronicle</span>
                        <MoveRight className="relative z-10 w-8 h-8 border border-indigo-800/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700 group-hover:border-indigo-500" />
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-indigo-500" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-indigo-300">Registry: Validated</span>
                        <div className="h-[1px] w-48 bg-indigo-500" />
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-indigo-900 italic">Timeline</div>
                <div className="h-[1px] w-72 bg-indigo-900/40" />
                <span className="text-[10px] font-black tracking-widest text-indigo-200 uppercase tracking-[1.5em]">OUR-STORY // V5.01</span>
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
