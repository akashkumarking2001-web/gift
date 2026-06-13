import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Telescope, Moon, MoveRight, ShieldCheck, Zap, Orbit } from 'lucide-react';

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
        text: data.text || "Even in a galaxy of a billion stars, my eyes would still only look for you."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#02040a] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* HYPER-REALISTIC CELESTIAL ENVIRONMENT (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Dynamic Nebula Clouds */}
                <motion.div
                    animate={{
                        opacity: [0.2, 0.4, 0.2],
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-[20%] bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_70%,rgba(139,92,246,0.15),transparent_50%),radial-gradient(circle_at_50%_50%,rgba(30,58,138,0.1),transparent_70%)] blur-[80px]"
                />

                {/* Cinematic Film Grain Overlay */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

                {/* Multi-Layered Parallax Starfield */}
                {[...Array(80)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            opacity: [0.1, 0.8, 0.1],
                            scale: [1, 1.8, 1],
                            y: [0, -30, 0]
                        }}
                        transition={{ duration: 4 + Math.random() * 6, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Registry Sequence */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-blue-900/10 backdrop-blur-3xl px-14 py-4 rounded-full border border-blue-500/20 shadow-2xl mx-auto isolate"
                >
                    <ShieldCheck size={18} className="text-blue-500" />
                    <span className="text-blue-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Celestial Sequence 01 // Initiation</span>
                    <Zap size={18} className="text-blue-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE CELESTIAL ARTIFACT: High-Fidelity Glass Unit */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative perspective-[3000px] mb-8"
                >
                    <div className="relative p-20 md:p-28 bg-white/[0.02] backdrop-blur-[60px] rounded-[6rem] border border-blue-500/15 shadow-[0_60px_120px_-20px_rgba(59,130,246,0.3)] isolate overflow-hidden group">

                        {/* Internal Dynamic Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        {/* Spinning Orbit Systems (V2 Multi-Ring) */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-dashed border-blue-500/20 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-white/5 rounded-full"
                        />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-5 border-2 border-blue-500/5 rounded-full opacity-30"
                        />

                        {/* Core Iconology */}
                        <div className="relative z-10">
                            <Sparkles size={110} strokeWidth={1} className="text-blue-400 drop-shadow-[0_0_40px_rgba(59,130,246,0.8)] animate-pulse" />
                        </div>

                        {/* Satellite Status Unit */}
                        <motion.div
                            animate={{ x: [0, 15, -15, 0], y: [0, -20, 20, 0] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute -top-8 -right-8 p-6 bg-blue-900/20 backdrop-blur-3xl rounded-[2rem] border border-blue-400/30 shadow-2xl flex flex-col items-center gap-2"
                        >
                            <Orbit size={24} className="text-blue-200" />
                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-200/50">LRS.01</span>
                        </motion.div>
                    </div>
                </motion.div>

                {/* THE NARRATIVE MANIFESTO: Royal Gilded Typography */}
                <div className="space-y-16 text-center max-w-6xl font-romantic">
                    <div className="flex flex-col items-center gap-8">
                        <Telescope size={24} className="text-blue-500 opacity-40" />
                        <h1 className="text-6xl md:text-[11rem] font-black text-white leading-tight tracking-[0.02em] px-4 drop-shadow-3xl">
                            "{defaultData.text}"
                        </h1>
                    </div>

                    <div className="h-1 w-96 bg-gradient-to-r from-transparent via-blue-900/40 to-transparent mx-auto" />
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
                        className="group relative px-28 py-10 bg-[#02040a] border-2 border-blue-900/50 rounded-[4rem] text-blue-400 font-black text-xs uppercase tracking-[0.8em] shadow-[0_50px_120px_-30px_rgba(59,130,246,0.5)] transition-all flex items-center gap-8 isolate overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                        <span className="relative z-10">Chart Eternal Orbit</span>
                        <MoveRight className="relative z-10 w-8 h-8 border-2 border-blue-500/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700" />
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-white" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Registry: Synchronized</span>
                        <div className="h-[1px] w-48 bg-white" />
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA (V2) */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-7xl text-blue-900 italic">Ethereal</div>
                <div className="h-[1px] w-72 bg-blue-900/40" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1.5em]">CELESTIAL-LVM // V4.5.2</span>
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
