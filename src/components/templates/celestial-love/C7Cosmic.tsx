import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, PenTool } from 'lucide-react';

const C7Cosmic = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-center p-8 font-mono select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#1e1b4b_0%,#050510_70%)] opacity-60" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-4xl bg-white/5 backdrop-blur-3xl rounded-[4.5rem] border-2 border-white/10 p-12 md:p-24 shadow-[0_50px_150px_rgba(0,0,0,0.6)] text-center space-y-12"
            >
                {/* Visual Ornament */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="p-10 bg-blue-600/10 rounded-full border border-blue-500/20 relative shadow-2xl"
                    >
                        <PenTool size={60} className="text-blue-400" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-2 -right-2"
                        >
                            <Sparkles size={44} className="text-cyan-400" />
                        </motion.div>
                    </motion.div>
                </div>

                <div className="space-y-10 group">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block px-8 py-3 bg-white/5 rounded-full border border-white/10"
                    >
                        <span className="text-blue-400 font-black uppercase tracking-[0.5em] text-[10px]">Transmission Decrypted</span>
                    </motion.div>

                    <h2
                        className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-tight cursor-pointer italic"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Heading:", "Cosmic Devotion");
                                if (val) onUpdate?.('letterHeading', val);
                            }
                        }}
                    >
                        My North Star
                    </h2>

                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mx-auto" />

                    <p
                        className="text-white text-xl md:text-3xl font-black uppercase tracking-[0.1em] leading-relaxed max-w-3xl mx-auto border-t border-white/5 pt-12 cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Message:", data.message || "I'll navigate through any void and cross every black hole to stay by your side. You are the gravity that holds my world together.");
                                if (val) onUpdate?.('message', val);
                            }
                        }}
                    >
                        "{data.message || "I'll navigate through any void and cross every black hole to stay by your side. You are the gravity that holds my world together."}"
                    </p>
                </div>

                <div className="pt-12">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-24 py-8 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.8em] rounded-full shadow-2xl transition-all"
                    >
                        Initiate Eternal Orbit
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default C7Cosmic;
