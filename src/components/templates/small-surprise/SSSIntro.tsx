import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, Gift } from 'lucide-react';

const SSSIntro = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0d0d] flex flex-col items-center justify-center p-8 font-mono select-none isolate">

            {/* AMBIENT GLOW */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-rose-500/10 blur-[150px] rounded-full animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-4xl bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-12 md:p-24 shadow-[0_50px_100px_rgba(0,0,0,0.5)] text-center overflow-hidden"
            >
                {/* Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-600 via-white/20 to-rose-600" />

                <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="mb-12 relative inline-block"
                >
                    <div className="p-12 bg-rose-500/10 rounded-[3rem] border border-rose-500/20 shadow-2xl relative">
                        <Gift size={80} className="text-rose-500" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-4 -right-4"
                        >
                            <Sparkles size={40} className="text-amber-400" />
                        </motion.div>
                    </div>
                </motion.div>

                <div className="space-y-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-3 px-8 py-3 bg-rose-500/10 rounded-full border border-rose-500/20"
                    >
                        <Heart size={14} className="text-rose-500 animate-pulse" />
                        <span className="text-rose-400 font-black uppercase tracking-[0.5em] text-[10px]">Secure Packet Received</span>
                    </motion.div>

                    <div className="space-y-4">
                        <h1
                            className="text-4xl md:text-8xl font-black text-white leading-tight uppercase tracking-tighter"
                            onClick={() => {
                                if (isEditing) {
                                    const val = prompt("Edit Heading:", data.heading || "Hello Beautiful");
                                    if (val) onUpdate?.('heading', val);
                                }
                            }}
                        >
                            {data.heading || "Hello Beautiful"}
                        </h1>
                        <p
                            className="text-rose-100/40 text-lg md:text-2xl font-black uppercase tracking-[0.2em] max-w-xl mx-auto border-t border-white/5 pt-8"
                            onClick={() => {
                                if (isEditing) {
                                    const val = prompt("Edit Subtext:", data.subtext || "A personalized surprise is ready for decryption.");
                                    if (val) onUpdate?.('subtext', val);
                                }
                            }}
                        >
                            {data.subtext || "A personalized surprise is ready for decryption."}
                        </p>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(225,29,72,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-20 py-8 bg-rose-600 text-white font-black text-xs uppercase tracking-[0.6em] rounded-full transition-all flex items-center gap-6 mx-auto overflow-hidden shadow-2xl"
                >
                    <span className="relative z-10">Decrypt Message</span>
                    <ChevronRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                </motion.button>
            </motion.div>
        </div>
    );
};

export default SSSIntro;
