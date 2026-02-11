import { motion, AnimatePresence } from 'framer-motion';
import { Book, PenTool, Star, Sparkles, MoveRight, Zap, ShieldCheck, ScrollText } from 'lucide-react';

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
        text: data.text || "I've started keeping a journal about us. Here are some of my favorite entries."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0a08] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC VINTAGE ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.25, 0.1],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(180,83,9,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(120,53,15,0.1),transparent_50%)]"
                />

                {/* Vintage Ink Stain & Texture */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-amber-900/10 to-transparent blur-[120px]" />

                {/* Floating Gilded Dust Particles */}
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-amber-200/20 rounded-full shadow-[0_0_8px_rgba(217,119,6,0.5)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -150, 0], opacity: [0, 0.6, 0] }}
                        transition={{ duration: 8 + Math.random() * 10, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Archive Sequence */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-amber-950/10 backdrop-blur-3xl px-14 py-4 rounded-full border border-amber-900/20 shadow-2xl mx-auto isolate"
                >
                    <ShieldCheck size={18} className="text-amber-600" />
                    <span className="text-amber-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Archival Sequence 01 // Memoir Initiation</span>
                    <Zap size={18} className="text-amber-600 fill-current animate-pulse" />
                </motion.div>

                {/* THE ARCHIVE ARTIFACT: High-Density Leather & Glass Unit */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative perspective-[3000px] mb-8"
                >
                    <div className="relative p-20 md:p-28 bg-[#1a1410]/60 backdrop-blur-[60px] rounded-[5rem] border border-amber-800/20 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] isolate overflow-hidden group">

                        {/* Internal Gilded Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-700/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* Spinning Decorative Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-amber-700/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-amber-900/10 rounded-full"
                        />

                        {/* Core Iconology */}
                        <div className="relative z-10">
                            <Book size={100} strokeWidth={1} className="text-amber-500/80 drop-shadow-[0_0_40px_rgba(217,119,6,0.6)]" />
                        </div>

                        {/* Floating Pen Accent */}
                        <motion.div
                            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute -top-6 -right-6 p-6 bg-[#2a1d15] backdrop-blur-xl rounded-[2rem] border border-amber-600/30 shadow-2xl flex items-center justify-center"
                        >
                            <PenTool size={28} className="text-amber-400" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE NARRATIVE MANIFESTO: Royal Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <div className="flex flex-col items-center gap-8">
                        <ScrollText size={24} className="text-amber-700 opacity-40" />
                        <h1 className="text-5xl md:text-[10rem] font-black text-amber-50 leading-tight tracking-[0.02em] px-4 drop-shadow-3xl italic">
                            "{defaultData.text}"
                        </h1>
                    </div>

                    <div className="h-[2px] w-96 bg-gradient-to-r from-transparent via-amber-900/40 to-transparent mx-auto" />
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
                        className="group relative px-28 py-10 bg-[#0d0a08] border-2 border-amber-900/40 rounded-[4rem] text-amber-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_50px_120px_-30px_rgba(180,83,9,0.3)] transition-all flex items-center gap-8 isolate overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-amber-800 opacity-0 group-hover:opacity-10 transition-opacity" />
                        <span className="relative z-10">Unseal The Memoirs</span>
                        <MoveRight className="relative z-10 w-8 h-8 border-2 border-amber-800/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700" />
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-white" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Registry: Verified</span>
                        <div className="h-[1px] w-48 bg-white" />
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-amber-900 italic">Chronicle</div>
                <div className="h-[1px] w-72 bg-amber-900/40" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1.5em]">LOVE-JOURNAL // V2.01</span>
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
