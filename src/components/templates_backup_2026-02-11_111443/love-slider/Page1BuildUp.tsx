import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Sparkles, Star, MoveRight, ShieldCheck, Scale, Ruler } from 'lucide-react';

interface Page1BuildUpProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1BuildUp = ({ data, onNext, isEditing = false, onUpdate }: Page1BuildUpProps) => {

    const defaultData = {
        text: data.text || "Do you know how much I love you?"
    };

    const words = defaultData.text.split(" ");

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#07020d] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC SCALE OF AFFECTION ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(147,51,234,0.2),transparent_60%),radial-gradient(circle_at_bottom_right,rgba(126,34,206,0.15),transparent_50%)]"
                />

                {/* Aurora Borealis Effect */}
                <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-purple-500/10 to-transparent blur-3xl opacity-30 mix-blend-screen animate-pulse" />

                {/* Floating Ethereal Dust */}
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-purple-200/40 rounded-full shadow-[0_0_8px_rgba(216,180,254,0.6)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.8, 0] }}
                        transition={{ duration: 6 + Math.random() * 8, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Measurement */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-purple-950/40 backdrop-blur-3xl px-14 py-4 rounded-full border border-purple-900/30 shadow-2xl mx-auto isolate"
                >
                    <Ruler size={18} className="text-purple-400" />
                    <span className="text-purple-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Measurement Init // Infinite</span>
                    <Zap size={18} className="text-purple-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE SCALE ARTIFACT: High-Fidelity Ethereal Balance */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative perspective-[3000px] mb-8"
                >
                    <div className="relative p-20 md:p-32 bg-[#1a0515]/60 backdrop-blur-[60px] rounded-[5rem] border border-purple-800/20 shadow-[0_60px_120px_-20px_rgba(147,51,234,0.4)] isolate overflow-hidden group">

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-1000" />

                        {/* Balancing Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-purple-600/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-purple-500/10 rounded-full"
                        />

                        {/* Core Iconology */}
                        <div className="relative z-10">
                            <Scale size={100} strokeWidth={1} className="text-purple-400 drop-shadow-[0_0_40px_rgba(168,85,247,0.6)] group-hover:text-purple-300 transition-colors duration-700" />
                        </div>

                        {/* Floating Micro-Star Accent */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-6 -right-6 p-6 bg-purple-900/20 backdrop-blur-xl rounded-full border border-purple-500/40 shadow-2xl flex items-center justify-center"
                        >
                            <Sparkles size={28} className="text-purple-200" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE NARRATIVE TITLE: Ethereal Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic relative z-20">
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 px-4">
                        {words.map((word, wordIndex) => (
                            <motion.span
                                key={wordIndex}
                                initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ delay: wordIndex * 0.15, duration: 1.2, ease: "easeOut" }}
                                className="text-5xl md:text-[8rem] font-black text-purple-50 leading-tight tracking-[0.02em] drop-shadow-[0_0_40px_rgba(168,85,247,0.4)] italic"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>

                    <div className="h-[2px] w-96 bg-gradient-to-r from-transparent via-purple-700/60 to-transparent mx-auto" />
                </div>

                {/* PROFESSIONAL TACTICAL ACTION */}
                <div className="relative z-10 flex flex-col items-center gap-12 pb-32">
                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: words.length * 0.15 + 0.5, duration: 1 }}
                        whileHover={{ scale: 1.05, y: -8 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="group relative px-28 py-10 bg-[#07020d] border border-purple-900/40 rounded-[4rem] text-purple-400 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(147,51,234,0.2)] transition-all flex items-center gap-8 isolate overflow-hidden hover:border-purple-500/50 hover:shadow-[0_0_60px_-10px_rgba(168,85,247,0.4)]"
                    >
                        <div className="absolute inset-0 bg-purple-900 opacity-0 group-hover:opacity-20 transition-opacity" />
                        <span className="relative z-10">Weigh The Love</span>
                        <MoveRight className="relative z-10 w-8 h-8 border border-purple-800/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700 group-hover:border-purple-500" />
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-purple-500" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-purple-300">Calibration: Ready</span>
                        <div className="h-[1px] w-48 bg-purple-500" />
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-purple-900 italic">Ethereal</div>
                <div className="h-[1px] w-72 bg-purple-900/40" />
                <span className="text-[10px] font-black tracking-widest text-purple-200 uppercase tracking-[1.5em]">MEASURE-VIEW // V5.01</span>
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

export default Page1BuildUp;
