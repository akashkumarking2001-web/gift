import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Sparkles, Star, MoveRight, ShieldCheck, Zap, Mail, Crown } from 'lucide-react';

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
        text: data.text || "I've prepared a special collection of cards for you. Pick the one that speaks to your heart."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#1f0505] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC ROYAL ENVELOPE ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.2),transparent_60%),radial-gradient(circle_at_bottom_left,rgba(185,28,28,0.15),transparent_50%)]"
                />

                {/* Velvet Texture Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-20 mix-blend-overlay" />

                {/* Floating Gold Particles */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-amber-200/40 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.8, 0] }}
                        transition={{ duration: 6 + Math.random() * 8, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Royal Delivery */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-red-950/40 backdrop-blur-3xl px-14 py-4 rounded-full border border-red-900/30 shadow-2xl mx-auto isolate"
                >
                    <Crown size={18} className="text-amber-400" />
                    <span className="text-amber-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Royal Delivery // Priority One</span>
                    <Zap size={18} className="text-amber-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE MAIL ARTIFACT: High-Fidelity Sealed Envelope */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative perspective-[3000px] mb-8"
                >
                    <div className="relative p-20 md:p-32 bg-[#2a0a0a]/80 backdrop-blur-[60px] rounded-[4rem] border border-red-800/20 shadow-[0_60px_120px_-20px_rgba(185,28,28,0.4)] isolate overflow-hidden group">

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-1000" />

                        {/* Orbiting Seal Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-red-600/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-amber-500/10 rounded-full"
                        />

                        {/* Core Iconology */}
                        <div className="relative z-10">
                            <MailOpen size={100} strokeWidth={1} className="text-red-400 drop-shadow-[0_0_40px_rgba(220,38,38,0.6)] group-hover:text-amber-400 transition-colors duration-700" />
                        </div>

                        {/* Floating Gold Wax Seal Accent */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-6 -right-6 p-6 bg-amber-900/20 backdrop-blur-xl rounded-full border border-amber-500/40 shadow-2xl flex items-center justify-center"
                        >
                            <Sparkles size={28} className="text-amber-200" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE NARRATIVE TITLE: Regal Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <div className="flex flex-col items-center gap-6">
                        <Mail size={24} className="text-amber-500 opacity-60" />
                        <h1 className="text-5xl md:text-[7rem] font-black text-amber-50 leading-tight tracking-[0.02em] px-4 drop-shadow-3xl italic">
                            "{defaultData.text}"
                        </h1>
                    </div>

                    <div className="h-[2px] w-96 bg-gradient-to-r from-transparent via-amber-700/60 to-transparent mx-auto" />
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
                        className="group relative px-28 py-10 bg-[#1f0505] border border-amber-900/40 rounded-[4rem] text-amber-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(180,83,9,0.2)] transition-all flex items-center gap-8 isolate overflow-hidden hover:border-amber-500/50 hover:shadow-[0_0_60px_-10px_rgba(251,191,36,0.4)]"
                    >
                        <div className="absolute inset-0 bg-amber-900 opacity-0 group-hover:opacity-20 transition-opacity" />
                        <span className="relative z-10">Break The Seal</span>
                        <MoveRight className="relative z-10 w-8 h-8 border border-amber-800/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700 group-hover:border-amber-500" />
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-amber-500" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-amber-300">Courier: Arrived</span>
                        <div className="h-[1px] w-48 bg-amber-500" />
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-red-900 italic">Royal</div>
                <div className="h-[1px] w-72 bg-red-900/40" />
                <span className="text-[10px] font-black tracking-widest text-amber-200 uppercase tracking-[1.5em]">TRIBUTE-COLLECTION // V4.01</span>
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
