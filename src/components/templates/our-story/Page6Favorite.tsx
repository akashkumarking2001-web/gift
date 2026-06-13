import { motion } from 'framer-motion';
import { Star, Heart, ChevronRight, PenTool } from 'lucide-react';

const Page6Favorite = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#faf7f2] flex flex-col items-center justify-center p-8 font-serif select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#f0f9ff_0%,#faf7f2_70%)] opacity-60" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-4xl bg-white/40 backdrop-blur-3xl rounded-[4rem] border-4 border-white p-12 md:p-24 shadow-[0_40px_100px_rgba(0,0,0,0.03)] text-center space-y-12"
            >
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="p-10 bg-white rounded-full border border-[#f1f5f9] relative shadow-xl"
                    >
                        <PenTool size={60} className="text-[#94a3b8]" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-2 -right-2 text-rose-400"
                        >
                            <Heart size={32} fill="currentColor" />
                        </motion.div>
                    </motion.div>
                </div>

                <div className="space-y-10 group">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block px-8 py-3 bg-blue-50 rounded-full border border-blue-100 text-blue-600 font-bold uppercase tracking-[0.4em] text-[10px]"
                    >
                        <span>Volume One: Chapter Three</span>
                    </motion.div>

                    <h2
                        className="text-4xl md:text-8xl font-black text-[#1e293b] leading-tight font-serif tracking-tight cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Heading:", data.favoriteHeading || "My Favorite Chapter");
                                if (val) onUpdate?.('favoriteHeading', val);
                            }
                        }}
                    >
                        {data.favoriteHeading || "My Favorite Chapter"}
                    </h2>

                    <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-blue-200 to-transparent mx-auto" />

                    <p
                        className="text-[#64748b] text-xl md:text-3xl leading-relaxed italic max-w-2xl mx-auto border-t border-[#f1f5f9] pt-12 cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Message:", data.favoriteText || "If our life was a book, this would be the part where I underline every single word twice. It's not the climax, it's the comfort.");
                                if (val) onUpdate?.('favoriteText', val);
                            }
                        }}
                    >
                        "{data.favoriteText || "If our life was a book, this would be the part where I underline every single word twice. It's not the climax, it's the comfort."}"
                    </p>
                </div>

                <div className="pt-12">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-20 py-8 bg-[#1e293b] text-white font-bold text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl transition-all"
                    >
                        My Eternal Promise
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default Page6Favorite;
