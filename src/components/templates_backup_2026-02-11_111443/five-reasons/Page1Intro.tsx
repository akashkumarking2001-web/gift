import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Target, MoveRight, Zap, ShieldCheck } from 'lucide-react';

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
        text: data.text || "There are so many reasons why I love you, but here are the top 5..."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC CINEMATIC ENVIRONMENT (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.25, 0.1],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(245,158,11,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(217,119,6,0.1),transparent_50%)]"
                />

                {/* Cinematic Film Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')]" />

                {/* Parallax Gilded Dust Particles */}
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-amber-400/20 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -400, 0], opacity: [0, 0.8, 0] }}
                        transition={{ duration: 6 + Math.random() * 8, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Registry Sequence */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-amber-900/10 backdrop-blur-3xl px-14 py-4 rounded-full border border-amber-800/20 shadow-2xl mx-auto isolate"
                >
                    <ShieldCheck size={18} className="text-amber-500" />
                    <span className="text-amber-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Inventory Sequence 01 // Manifest Initiation</span>
                    <Zap size={18} className="text-amber-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE SEQUENCE UNIT: High-Density Gilded Artifacts */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative perspective-[3000px]"
                >
                    <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 50, opacity: 0, rotateY: -30 }}
                                animate={{ y: 0, opacity: 1, rotateY: 0 }}
                                transition={{ delay: i * 0.15, type: "spring", damping: 20 }}
                                className="relative group/heart"
                            >
                                <div className="absolute inset-0 bg-amber-600 blur-3xl opacity-0 group-hover/heart:opacity-20 transition-opacity duration-700" />
                                <div className="relative p-10 md:p-14 bg-white/[0.02] backdrop-blur-[40px] rounded-[3.5rem] border border-amber-500/15 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] isolate group-hover:scale-110 group-hover:border-amber-500/30 transition-all duration-700 overflow-hidden">
                                    {/* Internal Gilded Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <Heart size={48} fill={i % 2 === 0 ? "#f59e0b" : "#d97706"} className="text-transparent drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]" />

                                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#0a0a0a] rounded-full flex items-center justify-center text-xs font-black text-amber-500 border-2 border-amber-900 shadow-2xl">
                                        0{i + 1}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* THE NARRATIVE MANIFESTO: Royal Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <div className="flex flex-col items-center gap-8">
                        <Target size={28} className="text-amber-500 opacity-40 animate-pulse" />
                        <h1 className="text-6xl md:text-[11.5rem] font-black text-white leading-tight tracking-[0.01em] px-4 drop-shadow-3xl">
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
                        transition={{ delay: 1.5, duration: 1 }}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="group relative px-28 py-10 bg-white text-[#0a0a0a] font-black text-xs uppercase tracking-[0.8em] rounded-[4rem] shadow-[0_60px_120px_-20px_rgba(245,158,11,0.4)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[380px]"
                    >
                        <div className="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 text-amber-950">Initiate Sequence Reveal</span>
                        <MoveRight className="relative z-10 w-8 h-8 border-2 border-amber-950/20 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700" />
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-white" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Registry: Synchronized</span>
                        <div className="h-[1px] w-48 bg-white" />
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-amber-900 italic">Inventory</div>
                <div className="h-[1px] w-72 bg-amber-900/40" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1.5em]">FIVE-SEQUENCE // V3.01</span>
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
