import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, Bookmark } from 'lucide-react';

const Page7Letter = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#faf7f2] flex flex-col items-center justify-center p-8 font-serif select-none isolate">

            <div className="absolute inset-0 bg-[#faf7f2] opacity-80" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-30 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-4xl bg-white border-2 border-rose-100 rounded-[4rem] p-12 md:p-24 shadow-[0_50px_100px_rgba(0,0,0,0.02)] text-center space-y-12"
            >
                {/* Visual Label */}
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="p-10 bg-rose-50 rounded-full border border-rose-100 relative shadow-inner"
                    >
                        <Heart size={60} className="text-rose-400 fill-current" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
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
                        className="inline-block px-8 py-3 bg-rose-50 rounded-full border border-rose-100 text-rose-500 font-bold uppercase tracking-[0.5em] text-[10px]"
                    >
                        <span>The Eternal Promise</span>
                    </motion.div>

                    <h2
                        className="text-4xl md:text-8xl font-black text-[#1e293b] leading-tight font-serif tracking-tight cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Heading:", "My Eternal Promise");
                                if (val) onUpdate?.('letterHeading', val);
                            }
                        }}
                    >
                        My Love...
                    </h2>

                    <div className="h-[2px] w-24 bg-rose-100 mx-auto" />

                    <p
                        className="text-[#64748b] text-xl md:text-4xl leading-relaxed italic font-black tracking-tight px-4 cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Message:", data.message || "I promise to be the keeper of your smiles, the listener of your dreams, and the partner in all your adventures. Our story is my most cherished possession, and I'll protect it with every heartbeat.");
                                if (val) onUpdate?.('message', val);
                            }
                        }}
                    >
                        "{data.message || "I promise to be the keeper of your smiles, the listener of your dreams, and the partner in all your adventures. Our story is my most cherished possession, and I'll protect it with every heartbeat."}"
                    </p>
                </div>

                <div className="pt-12">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-24 py-8 bg-[#1e293b] text-white font-bold text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl transition-all"
                    >
                        To Be Continued
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Page7Letter;
