import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronRight, Binary } from 'lucide-react';

const SSSPrediction = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0d0d] flex flex-col items-center justify-center p-8 font-mono select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#4c0519_0%,#0d0d0d_70%)] opacity-60" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-4xl bg-white/5 backdrop-blur-3xl rounded-[4rem] border border-white/10 p-12 md:p-24 shadow-[0_50px_100px_rgba(0,0,0,0.5)] text-center space-y-12"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-1/4 -right-1/4 w-full h-full border-[1px] border-dashed border-rose-500/20 rounded-full pointer-events-none"
                />

                <div className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-3 px-8 py-3 bg-rose-500/10 rounded-full border border-rose-500/20"
                    >
                        <Binary size={14} className="text-rose-500" />
                        <span className="text-rose-400 font-black uppercase tracking-[0.5em] text-[10px]">Data Analysis Conclusion</span>
                    </motion.div>

                    <h2
                        className="text-4xl md:text-8xl font-black text-white leading-tight uppercase tracking-tighter cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Heading:", data.pHeading || "The Result");
                                if (val) onUpdate?.('pHeading', val);
                            }
                        }}
                    >
                        {data.pHeading || "The Result"}
                    </h2>

                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-rose-500/40 to-transparent mx-auto" />

                    <p
                        className="text-rose-100/60 text-xl md:text-3xl font-black uppercase tracking-[0.2em] leading-relaxed max-w-2xl mx-auto border-t border-white/5 pt-12 cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Message:", data.pText || "System calculations indicate that your level of perfection is beyond human understanding.");
                                if (val) onUpdate?.('pText', val);
                            }
                        }}
                    >
                        "{data.pText || "System calculations indicate that your level of perfection is beyond human understanding."}"
                    </p>
                </div>

                <div className="pt-12">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-20 py-8 bg-white text-black font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl transition-all"
                    >
                        Access Captured Bliss
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default SSSPrediction;
