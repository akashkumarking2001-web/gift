import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Star, ShieldCheck, Zap, MoveRight, RefreshCw, FileText, Fingerprint } from 'lucide-react';

interface Page4LetterProps {
    data: {
        message?: string;
        senderName?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4Letter = ({ data, onNext, isEditing = false, onUpdate }: Page4LetterProps) => {

    const defaultData = {
        message: data.message || "My dearest, every day with you is a blessing. I'm so grateful to have you in my life. You make everything better just by being you.",
        senderName: data.senderName || "Love, Your Forever"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0202] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* HYPER-REALISTIC CLASSIFIED ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_60%)]"
                />

                {/* Digital Noise Texture */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />

                {/* Parallax Embers */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-red-400/20 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.5)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -200, 0], opacity: [0, 0.6, 0] }}
                        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-20">

                {/* VISUAL STATUS ANCHOR: Final Report */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-red-950/20 backdrop-blur-3xl px-14 py-4 rounded-full border border-red-900/30 shadow-2xl mx-auto isolate"
                >
                    <FileText size={18} className="text-red-500" />
                    <span className="text-red-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Mission Report // Final Declassification</span>
                    <Zap size={18} className="text-red-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE MANIFESTO SLATE: High-Fidelity Glass Unit */}
                <div className="w-full max-w-5xl pb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="group relative bg-[#0f0505]/80 backdrop-blur-[60px] border border-red-900/40 rounded-[2rem] p-12 md:p-24 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] overflow-hidden isolate"
                    >
                        {/* Cinematic Internal Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-transparent to-transparent opacity-50" />

                        {/* Stamped "TOP SECRET" Seal */}
                        <div className="absolute top-12 right-12 opacity-20 rotate-12 border-4 border-red-500 rounded-lg px-8 py-4 mix-blend-screen pointer-events-none select-none">
                            <span className="text-4xl font-black text-red-500 tracking-widest uppercase font-mono">TOP SECRET</span>
                        </div>

                        <div className="relative z-10 space-y-16">
                            {/* Header Metadata */}
                            <div className="flex items-center gap-6 opacity-60">
                                <Fingerprint size={24} className="text-red-500" />
                                <div className="h-[20px] w-[1px] bg-red-800" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-red-200 font-mono">Biometric Auth: Verified</span>
                            </div>

                            {/* The Report Body */}
                            <p className="text-red-50 text-2xl md:text-4xl font-mono leading-[1.8] drop-shadow-xl text-left tracking-wide opacity-90 border-l border-red-900/60 pl-8 md:pl-12 py-4">
                                <span className="text-red-500 opacity-50">&gt;&gt; BEGIN TRANSMISSION</span>
                                <br /><br />
                                "{defaultData.message}"
                                <br /><br />
                                <span className="text-red-500 opacity-50">&gt;&gt; END TRANSMISSION</span>
                            </p>

                            {/* Digital Signature Block */}
                            <div className="flex flex-col items-end gap-6 pt-12 opacity-80 border-t border-red-900/20">
                                <div className="font-romantic text-5xl md:text-7xl text-red-500 mix-blend-screen">
                                    {defaultData.senderName}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-[1px] w-32 bg-red-800" />
                                    <span className="text-[8px] font-black uppercase tracking-[1em] text-red-800 font-mono">Officer In Charge</span>
                                </div>
                            </div>
                        </div>

                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(20,0,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />
                    </motion.div>
                </div>

                {/* VISUAL & FUNCTIONAL STATUS FOOTER */}
                <div className="relative z-10 w-full max-w-4xl mx-auto pt-10 pb-32 flex flex-col items-center gap-14">
                    <motion.button
                        onClick={() => window.location.reload()}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-28 py-10 bg-[#0a0202] border border-red-900/40 rounded-[4rem] text-red-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_50px_120px_-30px_rgba(220,38,38,0.2)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[420px]"
                    >
                        <div className="absolute inset-0 bg-red-900 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                        <RefreshCw className="relative z-10 w-8 h-8 text-red-700 group-hover:rotate-180 group-hover:text-red-500 transition-all duration-1000" />
                        <span className="relative z-10 text-red-700 group-hover:text-red-500 transition-colors font-mono">Re-Initialize Mission</span>
                    </motion.button>

                    <div className="flex flex-col items-center gap-6 opacity-15">
                        <div className="h-[1px] w-[40rem] bg-gradient-to-r from-transparent via-white to-transparent" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white font-mono">Log: 00:00:00 // Connection Terminated</span>
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-mono text-8xl text-red-900 italic opacity-40">CLASSIFIED</div>
                <div className="h-[1px] w-72 bg-red-900/40" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1.5em] font-mono">VALENTINES-END // V9.03</span>
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
