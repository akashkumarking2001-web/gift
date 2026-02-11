import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, BookOpen } from 'lucide-react';

const Page2Intro = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#faf7f2] flex flex-col items-center justify-center p-8 font-serif select-none isolate">

            {/* Soft Ambient Background */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
                <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-rose-200/50 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-100/50 blur-[100px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-4xl bg-white/60 backdrop-blur-xl border-4 border-white rounded-[4rem] p-12 md:p-24 shadow-[0_40px_100px_rgba(0,0,0,0.05)] text-center overflow-hidden"
            >
                {/* Book Edge Detail */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-rose-50 to-transparent flex flex-col items-center justify-center gap-8 py-10 opacity-40">
                    {[...Array(10)].map((_, i) => <div key={i} className="w-1 h-1 bg-rose-200 rounded-full" />)}
                </div>

                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12 relative inline-block"
                >
                    <div className="p-12 bg-white rounded-[3rem] border-2 border-[#f1f5f9] shadow-inner">
                        <BookOpen size={60} className="text-[#64748b]" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute -top-4 -right-4"
                        >
                            <Heart size={40} className="text-rose-400 fill-current" />
                        </motion.div>
                    </div>
                </motion.div>

                <div className="space-y-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-3 px-8 py-3 bg-rose-50 rounded-full border border-rose-100 text-rose-400 font-bold uppercase tracking-[0.4em] text-[10px]"
                    >
                        <span>Volume One: Our Beginning</span>
                    </motion.div>

                    <h1
                        className="text-5xl md:text-9xl font-black text-[#1e293b] leading-tight font-serif tracking-tighter cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Greeting:", data.greeting || "Hello Us");
                                if (val) onUpdate?.('greeting', val);
                            }
                        }}
                    >
                        {data.greeting || "Hello Us"}
                    </h1>

                    <p
                        className="text-[#64748b] text-xl md:text-3xl leading-relaxed italic max-w-xl mx-auto border-t-2 border-[#f1f5f9] pt-12"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Subtext:", data.subtext || "Where every word is a memory and every page is a legacy.");
                                if (val) onUpdate?.('subtext', val);
                            }
                        }}
                    >
                        "{data.subtext || "Where every word is a memory and every page is a legacy."}"
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-20 py-8 bg-[#1e293b] text-white font-bold text-xs uppercase tracking-[0.6em] rounded-full transition-all flex items-center gap-6 mx-auto overflow-hidden shadow-2xl"
                >
                    <span className="relative z-10">Turn The Page</span>
                    <ChevronRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                </motion.button>
            </motion.div>
        </div>
    );
};

export default Page2Intro;
