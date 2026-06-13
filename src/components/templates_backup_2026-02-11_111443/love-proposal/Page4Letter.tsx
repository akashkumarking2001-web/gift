import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, ShieldCheck, Star, Sparkles, RefreshCw, Zap, Feather, Crown } from 'lucide-react';

interface Page4LetterProps {
    data: {
        message?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4Letter = ({ data, onNext, isEditing = false, onUpdate }: Page4LetterProps) => {

    const defaultData = {
        message: data.message || "I promise to love you, cherish you, and stand by your side through every adventure that life brings our way. You are my greatest discovery and my most precious treasure. Forever yours."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0202] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* HYPER-REALISTIC ROYAL ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.25, 0.1],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(220,38,38,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(127,29,29,0.15),transparent_50%)]"
                />

                {/* Velvet Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')]" />

                {/* Parallax Ruby Dust */}
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-red-400/20 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -150, 0], opacity: [0, 0.6, 0] }}
                        transition={{ duration: 8 + Math.random() * 10, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-20">

                {/* VISUAL STATUS ANCHOR: Royal Seal */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-red-950/20 backdrop-blur-3xl px-14 py-4 rounded-full border border-red-900/30 shadow-2xl mx-auto isolate"
                >
                    <Crown size={18} className="text-red-500" />
                    <span className="text-red-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Royal Decree 04 // The Covenant</span>
                    <Zap size={18} className="text-red-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE ROYAL MANIFESTO: High-Fidelity Glass/Parchment Hybrid */}
                <div className="w-full max-w-5xl pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="group relative bg-[#1a0505]/80 backdrop-blur-[60px] border border-red-800/20 rounded-[4rem] p-12 md:p-24 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] overflow-hidden isolate"
                    >
                        {/* Cinematic Internal Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-700/5 via-transparent to-transparent opacity-50" />

                        {/* 3D Wax Seal Artifact */}
                        <div className="absolute top-10 right-10 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-red-800 to-red-950 rounded-full border border-red-500/30 shadow-2xl flex items-center justify-center isolate z-20">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-20 mix-blend-overlay" />
                            <Heart size={40} fill="#7f1d1d" className="text-red-900 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
                            <div className="absolute inset-2 border border-dashed border-red-500/20 rounded-full opacity-50" />
                        </div>

                        <div className="relative z-10 space-y-16">
                            {/* Header Metadata */}
                            <div className="flex items-center gap-6 opacity-40">
                                <Feather size={20} className="text-red-500" />
                                <div className="h-[1px] w-24 bg-red-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-red-200">Official Vow</span>
                            </div>

                            {/* The Vow Content */}
                            <p className="text-red-50 text-3xl md:text-5xl font-romantic leading-[1.6] italic drop-shadow-xl text-left tracking-wide opacity-90 border-l-2 border-red-900/40 pl-8 md:pl-12 py-4">
                                "{defaultData.message}"
                            </p>

                            {/* Suggestive Signature Block */}
                            <div className="flex flex-col items-end gap-6 pt-12 opacity-80">
                                <div className="font-romantic text-6xl md:text-8xl text-red-600 opacity-60 mix-blend-screen rotate-[-2deg]">
                                    Forever Yours
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-[1px] w-32 bg-red-800" />
                                    <span className="text-[8px] font-black uppercase tracking-[1em] text-red-800">Signed & Sealed</span>
                                </div>
                            </div>
                        </div>

                        {/* Massive Watermark */}
                        <div className="absolute bottom-[-5rem] left-[-5rem] text-[15rem] font-black text-red-950/[0.03] select-none pointer-events-none font-outfit rotate-[-10deg]">
                            VOW
                        </div>
                    </motion.div>
                </div>

                {/* VISUAL & FUNCTIONAL STATUS FOOTER */}
                <div className="relative z-10 w-full max-w-4xl mx-auto pt-10 pb-32 flex flex-col items-center gap-14">
                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-28 py-10 bg-[#0a0202] border-2 border-red-900/40 rounded-[4rem] text-red-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_50px_120px_-30px_rgba(220,38,38,0.3)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[420px]"
                    >
                        <div className="absolute inset-0 bg-red-800 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                        <RefreshCw className="relative z-10 w-8 h-8 text-red-500 group-hover:rotate-180 group-hover:text-red-100 transition-all duration-1000" />
                        <span className="relative z-10 text-red-500 group-hover:text-red-100 transition-colors">Re-Issue Proposal</span>
                    </motion.button>

                    <div className="flex flex-col items-center gap-6 opacity-15">
                        <div className="h-[1px] w-[40rem] bg-gradient-to-r from-transparent via-white to-transparent" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Registry: Sequence Terminated // Eternal Bond Active</span>
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-red-900 italic">Covenant</div>
                <div className="h-[1px] w-72 bg-red-900/40" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1.5em]">LOVE-PROPOSAL-VOW // V4.03</span>
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

export default Page4Letter;
