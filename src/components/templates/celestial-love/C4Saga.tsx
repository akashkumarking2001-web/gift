import { motion } from 'framer-motion';
import { Star, Sparkles, ChevronRight, Globe, Zap } from 'lucide-react';

const C4Saga = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-center p-8 font-mono select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e1b4b_0%,transparent_70%)] opacity-40" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-4xl bg-white/5 backdrop-blur-3xl rounded-[4rem] border-2 border-white/10 p-12 md:p-24 shadow-[0_50px_150px_rgba(0,0,0,0.5)] text-center space-y-12"
            >
                {/* Visual Ornament */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                        className="p-10 bg-blue-600/10 rounded-full border border-blue-500/20 relative shadow-2xl"
                    >
                        <Globe size={60} className="text-blue-400" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-2 -right-2 text-cyan-400"
                        >
                            <Sparkles size={32} />
                        </motion.div>
                    </motion.div>
                </div>

                <div className="space-y-10 group">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block px-8 py-3 bg-blue-600/10 rounded-full border border-blue-500/20"
                    >
                        <span className="text-blue-400 font-black uppercase tracking-[0.5em] text-[10px]">Episode One: The Encounter</span>
                    </motion.div>

                    <h2
                        className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-tight cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Heading:", data.sagaTitle || "The Galactic Saga");
                                if (val) onUpdate?.('sagaTitle', val);
                            }
                        }}
                    >
                        {data.sagaTitle || "The Galactic Saga"}
                    </h2>

                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto" />

                    <p
                        className="text-blue-200/40 text-xl md:text-3xl font-black uppercase tracking-[0.1em] leading-relaxed max-w-3xl mx-auto border-t border-white/5 pt-12 cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Message:", data.sagaText || "In the grand theater of the universe, our story is my favorite symphony. A collision of souls that created a brand new galaxy.");
                                if (val) onUpdate?.('sagaText', val);
                            }
                        }}
                    >
                        "{data.sagaText || "In the grand theater of the universe, our story is my favorite symphony. A collision of souls that created a brand new galaxy."}"
                    </p>
                </div>

                <div className="pt-12">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-24 py-8 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.8em] rounded-full shadow-2xl transition-all"
                    >
                        View Nebula Memories
                    </motion.button>
                </div>

                {/* Aesthetic Detail */}
                <div className="absolute bottom-10 right-10 text-white/5"><Zap size={100} /></div>
            </motion.div>
        </div>
    );
};

export default C4Saga;
