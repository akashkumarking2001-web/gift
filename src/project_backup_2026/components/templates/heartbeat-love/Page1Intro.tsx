import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Heart, Sparkles, ShieldCheck, MoveRight, Zap, Fingerprint } from 'lucide-react';

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
        text: data.text || "My heart beats faster every time I think of you. Can you feel its rhythm?"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#080202] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC VITALITY & PULSE ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.25, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.15),transparent_60%)]"
                />

                {/* EKG Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 mix-blend-screen" />

                {/* Automated EKG Pulse Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-red-900/40 -translate-y-1/2 overflow-hidden">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-1/3 h-full bg-gradient-to-r from-transparent via-red-500 to-transparent blur-[2px]"
                    />
                </div>
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Vital Signs */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-red-950/30 backdrop-blur-3xl px-14 py-4 rounded-full border border-red-900/30 shadow-2xl mx-auto isolate"
                >
                    <Activity size={18} className="text-red-500" />
                    <span className="text-red-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Vital Signs // Elevated</span>
                    <Zap size={18} className="text-red-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE HEART ARTIFACT: Biometric Core */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative perspective-[3000px] mb-8"
                >
                    <div className="relative p-20 md:p-32 bg-[#1a0505]/80 backdrop-blur-[60px] rounded-full border border-red-800/20 shadow-[0_60px_120px_-20px_rgba(220,38,38,0.4)] isolate overflow-hidden group">

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-1000 rounded-full" />

                        {/* Pulsing Ring */}
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-4 border-2 border-red-500/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-red-900/40 rounded-full"
                        />

                        {/* Core Iconology */}
                        <div className="relative z-10">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Heart size={100} fill="#ef4444" className="text-red-500 drop-shadow-[0_0_50px_rgba(239,68,68,0.8)]" />
                            </motion.div>
                        </div>

                        {/* Data Readout */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-60">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-red-200">BPM: 128</span>
                        </div>
                    </div>
                </motion.div>

                {/* THE NARRATIVE TITLE: Scientific Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <div className="flex flex-col items-center gap-6">
                        <Fingerprint size={24} className="text-red-500 opacity-60" />
                        <h1 className="text-5xl md:text-[8rem] font-black text-red-50 leading-tight tracking-[0.02em] px-4 drop-shadow-3xl italic">
                            "{defaultData.text}"
                        </h1>
                    </div>

                    <div className="h-[2px] w-96 bg-gradient-to-r from-transparent via-red-900/60 to-transparent mx-auto" />
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
                        className="group relative px-28 py-10 bg-[#080202] border border-red-900/40 rounded-[4rem] text-red-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(220,38,38,0.3)] transition-all flex items-center gap-8 isolate overflow-hidden hover:border-red-500/50 hover:shadow-[0_0_60px_-10px_rgba(239,68,68,0.5)]"
                    >
                        <div className="absolute inset-0 bg-red-900 opacity-0 group-hover:opacity-20 transition-opacity" />
                        <span className="relative z-10">Sync Heartbeat</span>
                        <MoveRight className="relative z-10 w-8 h-8 border border-red-800/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700 group-hover:border-red-500" />
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-red-500" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-red-300">Rhythm: Detected</span>
                        <div className="h-[1px] w-48 bg-red-500" />
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-red-900 italic">Pulse</div>
                <div className="h-[1px] w-72 bg-red-900/40" />
                <span className="text-[10px] font-black tracking-widest text-red-200 uppercase tracking-[1.5em]">CARDIAC-VIEW // V5.01</span>
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
