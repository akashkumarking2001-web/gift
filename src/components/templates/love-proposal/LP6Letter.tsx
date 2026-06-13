import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, PenTool, Star } from 'lucide-react';

const LP6Letter = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    const heading = data.letterHeading || "My Eternal Vow";
    const message = data.message || "I promise to be your strength in moments of weakness, your companion in times of joy, and your eternal lover until the stars themselves fade. This is not just a proposal, it's a lifelong commitment to the masterpiece we're building together.";

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#2b0303] flex flex-col items-center justify-center p-8 font-serif select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#450a0a_0%,transparent_70%)] opacity-40" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-4xl bg-[#450a0a]/60 backdrop-blur-3xl rounded-[4rem] p-12 md:p-24 border-4 border-amber-600/30 text-center space-y-12 shadow-[0_60px_150px_rgba(0,0,0,0.8)]"
            >
                {/* Visual Ornament */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="p-10 bg-[#1a0101] rounded-full border border-amber-600/20 relative shadow-2xl"
                    >
                        <PenTool size={60} className="text-amber-600" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-2 -right-2 text-amber-400"
                        >
                            <Sparkles size={32} />
                        </motion.div>
                    </motion.div>
                </div>

                <div className="space-y-10 group">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block px-8 py-3 bg-[#1a0101] rounded-full border border-amber-600/20 text-amber-500 font-black uppercase tracking-[0.5em] text-[10px]"
                    >
                        <span>The Eternal Vow</span>
                    </motion.div>

                    <h2
                        className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight uppercase tracking-tighter cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Heading:", heading);
                                if (val) onUpdate?.('letterHeading', val);
                            }
                        }}
                    >
                        {heading}
                    </h2>

                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mx-auto" />

                    <p
                        className="text-amber-100/60 text-xl md:text-3xl font-black uppercase tracking-[0.1em] italic leading-relaxed max-w-3xl mx-auto border-t border-white/5 pt-12 cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Message:", message);
                                if (val) onUpdate?.('message', val);
                            }
                        }}
                    >
                        "{message}"
                    </p>
                </div>

                <div className="pt-12">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-24 py-8 bg-amber-600 text-black font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl transition-all"
                    >
                        Seal Our Forever
                    </motion.button>
                </div>
            </motion.div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />
        </div>
    );
};

export default LP6Letter;
