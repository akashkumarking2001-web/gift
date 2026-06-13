import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, MoveRight, ShieldCheck, Zap, Lock, Fingerprint } from 'lucide-react';

interface Page1IntroProps {
    data: {
        greeting?: string;
        subtext?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Intro = ({ data, onNext, isEditing = false, onUpdate }: Page1IntroProps) => {

    const defaultData = {
        greeting: data.greeting || "Hey Beautiful...",
        subtext: data.subtext || "I have a question for you..."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#030000] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC CODE RED ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.08),transparent_60%)]"
                />

                {/* Digital Noise Texture */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />

                {/* Laser Grid Background (Subtle) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(20,0,0,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(20,0,0,0.3)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] opacity-30" />

                {/* Floating Embers */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-red-500/40 rounded-full shadow-[0_0_8px_rgba(220,38,38,0.6)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.8, 0] }}
                        transition={{ duration: 4 + Math.random() * 6, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Classified Sequence */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="inline-flex items-center gap-4 bg-red-950/10 backdrop-blur-3xl px-14 py-4 rounded-full border border-red-900/30 shadow-[0_0_30px_rgba(220,38,38,0.1)] mx-auto isolate"
                >
                    <ShieldCheck size={18} className="text-red-600" />
                    <span className="text-red-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Classified Sequence 01 // Identity Verified</span>
                    <Zap size={18} className="text-red-600 fill-current animate-pulse" />
                </motion.div>

                {/* THE VAULT ARTIFACT: Locked Heart */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative perspective-[3000px] mb-8"
                >
                    <div className="relative p-24 md:p-32 bg-[#0a0000]/80 backdrop-blur-[60px] rounded-[5rem] border border-red-900/40 shadow-[0_60px_120px_-20px_rgba(0,0,0,1)] isolate overflow-hidden group">

                        {/* Scanning Laser Effect */}
                        <motion.div
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[2px] bg-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.8)] z-20"
                        />

                        {/* Spinning Lock Mechanism */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-dashed border-red-900/30 rounded-full opacity-50"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-32 border border-red-950/50 rounded-full opacity-30"
                        />

                        {/* Core Iconology */}
                        <div className="relative z-10 flex flex-col items-center gap-6">
                            <Lock size={80} className="text-red-600/80 drop-shadow-[0_0_40px_rgba(220,38,38,0.8)]" />
                            <Heart size={40} strokeWidth={2.5} className="text-red-500/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
                        </div>

                        {/* Floating Fingerprint Accent */}
                        <motion.div
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute bottom-8 right-8"
                        >
                            <Fingerprint size={32} className="text-red-700/50" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE BRIEFING: Cinematic Typography */}
                <div className="space-y-12 text-center max-w-6xl font-romantic">
                    <div className="flex flex-col items-center gap-6">
                        <h1 className="text-5xl md:text-[8rem] font-black text-white leading-tight tracking-[0.02em] px-4 drop-shadow-3xl italic">
                            "{defaultData.greeting}"
                        </h1>
                        <p className="text-red-200/60 font-mono uppercase tracking-[0.4em] text-sm md:text-lg bg-red-950/30 px-6 py-2 rounded-full border border-red-900/20">
                            Incoming Transmission: {defaultData.subtext}
                        </p>
                    </div>
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
                        className="group relative px-28 py-10 bg-[#050000] border border-red-800/50 rounded-[4rem] text-red-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_0_50px_-10px_rgba(220,38,38,0.2)] transition-all flex items-center gap-8 isolate overflow-hidden hover:shadow-[0_0_80px_-10px_rgba(220,38,38,0.4)] hover:border-red-500/80"
                    >
                        <div className="absolute inset-0 bg-red-900 opacity-0 group-hover:opacity-20 transition-opacity" />
                        <span className="relative z-10">Decrypt The Question</span>
                        <MoveRight className="relative z-10 w-8 h-8 border border-red-800/50 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700 group-hover:border-red-500" />
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-red-500" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-red-500">Security: Maximum</span>
                        <div className="h-[1px] w-48 bg-red-500" />
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-20 text-right font-outfit">
                <div className="font-mono text-6xl text-red-900/50">TOP SECRET</div>
                <div className="h-[1px] w-72 bg-red-900/40" />
                <span className="text-[10px] font-black tracking-widest text-red-700 uppercase tracking-[1.5em] font-mono">CODE-RED // V9.01</span>
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
