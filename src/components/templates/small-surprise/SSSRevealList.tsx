import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronRight, Bookmark } from 'lucide-react';

const SSSRevealList = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    const reasons = [
        data.r1 || "Your contagious laughter that brightens the darkest room.",
        data.r2 || "The way your eyes sparkle when you're truly happy.",
        data.r3 || "Your infinite kindness that inspires everyone around you.",
        data.r4 || "The perfect way you handle every challenge with grace.",
        data.r5 || "Simply being the most incredible person I've ever known."
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0d0d] flex flex-col items-center justify-start py-24 px-8 font-mono select-none isolate">

            <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#4c0519] to-transparent pointer-events-none opacity-40" />

            <div className="relative z-10 w-full max-w-6xl">

                {/* Header Section */}
                <div className="text-center mb-32 space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border border-white/10 shadow-lg text-rose-500 font-black uppercase tracking-[0.5em] text-[10px]"
                    >
                        <Bookmark size={16} />
                        <span>Core Smiles Database</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-9xl font-black text-white uppercase tracking-tighter leading-tight"
                    >
                        Reasons to Smile
                    </motion.h2>
                </div>

                {/* INTERACTIVE CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {reasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="group perspective"
                            onClick={() => {
                                if (isEditing) {
                                    const val = prompt("Edit Reason " + (i + 1) + ":", reason);
                                    if (val) onUpdate?.('r' + (i + 1), val);
                                }
                            }}
                        >
                            <div className="relative h-64 w-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                                {/* FRONT */}
                                <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-6 backface-hidden shadow-2xl backdrop-blur-xl group-hover:bg-rose-600/10 transition-colors">
                                    <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg">0{i + 1}</div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-rose-500/60">Unlock Reason</span>
                                </div>

                                {/* BACK */}
                                <div className="absolute inset-0 bg-white p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center rotate-y-180 backface-hidden shadow-2xl border-4 border-rose-600">
                                    <Heart size={24} className="text-rose-600 mb-6 fill-current" />
                                    <p className="text-black text-lg md:text-xl font-black uppercase tracking-tight leading-relaxed">
                                        "{reason}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final Button */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-32 flex justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-24 py-8 bg-rose-600 text-white font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl flex items-center gap-6 group transition-all"
                    >
                        <span>Unlock Secret Gate</span>
                        <ChevronRight size={18} className="group-hover:translate-x-3 transition-transform" />
                    </motion.button>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .perspective { perspective: 2000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}} />
        </div>
    );
};

export default SSSRevealList;
