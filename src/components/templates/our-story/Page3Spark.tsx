import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronRight, Zap } from 'lucide-react';

const Page3Spark = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#faf7f2] flex flex-col items-center justify-center p-8 font-serif select-none isolate">

            {/* Soft Ambient Radiance */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-amber-100/40 blur-[130px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-4xl bg-white/40 backdrop-blur-3xl rounded-[4rem] border border-white/60 p-12 md:p-24 shadow-[0_40px_100px_rgba(0,0,0,0.03)] text-center space-y-12"
            >
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-10 bg-white rounded-full border border-amber-100 relative shadow-xl"
                    >
                        <Zap size={60} className="text-amber-500 opacity-60" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-2 -right-2 text-amber-600"
                        >
                            <Sparkles size={40} />
                        </motion.div>
                    </motion.div>
                </div>

                <div className="space-y-10 group">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block px-8 py-3 bg-amber-50 rounded-full border border-amber-100 text-amber-700 font-bold uppercase tracking-[0.4em] text-[10px]"
                    >
                        <span>Chapter Two: The Spark</span>
                    </motion.div>

                    <h2
                        className="text-4xl md:text-8xl font-black text-[#1e293b] leading-tight font-serif tracking-tight cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Heading:", data.sparkHeading || "The First Spark");
                                if (val) onUpdate?.('sparkHeading', val);
                            }
                        }}
                    >
                        {data.sparkHeading || "The First Spark"}
                    </h2>

                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-200 to-transparent mx-auto" />

                    <p
                        className="text-[#64748b] text-xl md:text-3xl leading-relaxed italic max-w-2xl mx-auto border-t border-[#f1f5f9] pt-12"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Message:", data.sparkText || "It wasn't a fire, it was a quiet lantern that illuminated a path I never knew existed. One look was all it took.");
                                if (val) onUpdate?.('sparkText', val);
                            }
                        }}
                    >
                        "{data.sparkText || "It wasn't a fire, it was a quiet lantern that illuminated a path I never knew existed. One look was all it took."}"
                    </p>
                </div>

                <div className="pt-12">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-20 py-8 bg-[#1e293b] text-white font-bold text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl transition-all"
                    >
                        See Our Journey
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Page3Spark;
