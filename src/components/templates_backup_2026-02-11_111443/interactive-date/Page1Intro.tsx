import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Utensils, Star, Sparkles, MoveRight, Zap, ShieldCheck, ChefHat } from 'lucide-react';

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
        text: data.text || "I can't take you out tonight, so let's have a virtual date instead. Ready?"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#020606] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC CHEF'S TABLE ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.25, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.2),transparent_60%),radial-gradient(circle_at_bottom_left,rgba(15,118,110,0.15),transparent_50%)]"
                />

                {/* Damask Tablecloth Texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-30 mix-blend-overlay" />

                {/* Candlelight Ambience */}
                <motion.div
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] mix-blend-screen"
                />

                {/* Floating Essence Particles */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-teal-200/40 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.6)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.6, 0] }}
                        transition={{ duration: 8 + Math.random() * 10, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Reservation */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-teal-950/40 backdrop-blur-3xl px-14 py-4 rounded-full border border-teal-900/30 shadow-2xl mx-auto isolate"
                >
                    <ChefHat size={18} className="text-teal-400" />
                    <span className="text-teal-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Reservation Confirmed // Table 01</span>
                    <Zap size={18} className="text-teal-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE DINING ARTIFACT: High-Fidelity Place Setting */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative perspective-[3000px] mb-8"
                >
                    <div className="relative p-20 md:p-32 bg-[#0a1818]/60 backdrop-blur-[60px] rounded-[5rem] border border-teal-800/20 shadow-[0_60px_120px_-20px_rgba(20,184,166,0.4)] isolate overflow-hidden group">

                        {/* Shimmer Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-1000" />

                        {/* Orbiting Plating Rings */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-teal-500/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-teal-800/10 rounded-full"
                        />

                        {/* Core Iconology */}
                        <div className="relative z-10">
                            <Utensils size={100} strokeWidth={1} className="text-teal-400 drop-shadow-[0_0_40px_rgba(45,212,191,0.6)] group-hover:text-teal-300 transition-colors duration-700" />
                        </div>

                        {/* Floating Micro-Service Accent */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-6 -right-6 p-6 bg-teal-900/20 backdrop-blur-xl rounded-full border border-teal-500/40 shadow-2xl flex items-center justify-center"
                        >
                            <Sparkles size={28} className="text-teal-200" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE NARRATIVE TITLE: Gourmet Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <div className="flex flex-col items-center gap-6">
                        <Coffee size={24} className="text-teal-500 opacity-60" />
                        <h1 className="text-5xl md:text-[8rem] font-black text-teal-50 leading-tight tracking-[0.02em] px-4 drop-shadow-3xl italic">
                            "{defaultData.text}"
                        </h1>
                    </div>

                    <div className="h-[2px] w-96 bg-gradient-to-r from-transparent via-teal-700/60 to-transparent mx-auto" />
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
                        className="group relative px-28 py-10 bg-[#020606] border border-teal-900/40 rounded-[4rem] text-teal-400 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(20,184,166,0.2)] transition-all flex items-center gap-8 isolate overflow-hidden hover:border-teal-500/50 hover:shadow-[0_0_60px_-10px_rgba(45,212,191,0.4)]"
                    >
                        <div className="absolute inset-0 bg-teal-900 opacity-0 group-hover:opacity-20 transition-opacity" />
                        <span className="relative z-10">Review The Menu</span>
                        <MoveRight className="relative z-10 w-8 h-8 border border-teal-800/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700 group-hover:border-teal-500" />
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-teal-500" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-teal-300">Service: Imminent</span>
                        <div className="h-[1px] w-48 bg-teal-500" />
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-teal-900 italic">Chef's</div>
                <div className="h-[1px] w-72 bg-teal-900/40" />
                <span className="text-[10px] font-black tracking-widest text-teal-200 uppercase tracking-[1.5em]">DINING-VIEW // V6.01</span>
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
