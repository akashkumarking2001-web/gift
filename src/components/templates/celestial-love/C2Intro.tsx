import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, Star, Globe } from 'lucide-react';

const C2Intro = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-center p-8 font-mono select-none isolate text-center">

            {/* Pulsing Nebula Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-blue-600/30 blur-[150px] rounded-full"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-0 left-0 w-[70vw] h-[70vw] bg-purple-600/20 blur-[130px] rounded-full"
                />
            </div>

            {/* Floating Stars */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-4xl bg-white/5 backdrop-blur-3xl border-2 border-white/10 rounded-[4rem] p-12 md:p-24 shadow-[0_80px_150px_rgba(0,0,0,0.6)] overflow-hidden"
            >
                {/* Visual Ornament */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: 360 }}
                    transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, rotate: { duration: 60, repeat: Infinity, ease: "linear" } }}
                    className="mb-12 relative inline-block"
                >
                    <div className="p-12 bg-blue-600/5 rounded-full border border-blue-500/20 relative group">
                        <Globe size={80} className="text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                        <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute inset-0 border-2 border-cyan-500/20 rounded-full"
                        />
                        <div className="absolute -top-4 -right-4 bg-rose-500 p-6 rounded-full shadow-[0_0_30px_rgba(244,63,94,0.4)]">
                            <Heart size={32} fill="currentColor" className="text-white" />
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-4 px-10 py-3 bg-white/5 rounded-full border border-white/10"
                    >
                        <span className="text-blue-400 font-bold uppercase tracking-[0.8em] text-[10px]">Coordinate: Soul_Eternal</span>
                    </motion.div>

                    <h1
                        className="text-5xl md:text-9xl font-black text-white leading-tight uppercase tracking-tighter cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Heading:", data.heading || "The Celestial Beginning");
                                if (val) onUpdate?.('heading', val);
                            }
                        }}
                    >
                        {data.heading || "Across The Cosmic Ocean"}
                    </h1>

                    <p
                        className="text-blue-200/40 text-xl md:text-3xl leading-relaxed italic max-w-xl mx-auto border-t border-white/5 pt-12 cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Subtext:", data.subtext || "Before the first star was born, our story was already written in the fabric of the multiverse.");
                                if (val) onUpdate?.('subtext', val);
                            }
                        }}
                    >
                        "{data.subtext || "Before the first star was born, our story was already written in the fabric of the multiverse."}"
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(59,130,246,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-20 py-8 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.8em] rounded-full transition-all flex items-center gap-6 mx-auto overflow-hidden shadow-2xl"
                >
                    <span className="relative z-10">Sync Orbit</span>
                    <ChevronRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                </motion.button>
            </motion.div>
        </div>
    );
};

export default C2Intro;
