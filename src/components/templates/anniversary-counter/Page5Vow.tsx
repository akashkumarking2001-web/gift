import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, BookOpen, PenTool } from 'lucide-react';

interface Page5VowProps {
    data: {
        message?: string;
        heading?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page5Vow = ({ data, onNext, isEditing = false, onUpdate }: Page5VowProps) => {
    const heading = data.heading || "My Eternal Vow";
    const message = data.message || "In the silence of the soul and the noise of the world, I choose you. I choose the path that leads us to new horizons, the laughter that fills our home, and the love that grows deeper with every sunrise. This is my promise to you, today and forever.";

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-center p-8 font-outfit select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#fef3c7_0%,#fffdfa_70%)] opacity-40" />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-4xl bg-white/40 backdrop-blur-3xl rounded-[4rem] border border-amber-100 p-12 md:p-24 shadow-[0_60px_150px_-30px_rgba(251,191,36,0.2)] text-center space-y-12"
            >
                <div className="flex justify-center mb-8">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="p-10 bg-white/60 rounded-full border border-amber-100 relative shadow-xl"
                    >
                        <PenTool size={60} className="text-amber-600 opacity-80" />
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute -top-2 -right-2 text-amber-500"
                        >
                            <Sparkles size={32} />
                        </motion.div>
                    </motion.div>
                </div>

                <div className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block px-8 py-3 bg-amber-50 rounded-full border border-amber-200/50"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Label:", "My Eternal Vow");
                                if (val) onUpdate?.('heading', val);
                            }
                        }}
                    >
                        <span className="text-amber-700 font-black uppercase tracking-[0.5em] text-[10px]">{heading}</span>
                    </motion.div>

                    <h2
                        className="text-4xl md:text-8xl font-black text-[#451a03] font-romantic leading-tight cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Dear Name/Heading:", "My Love...");
                                if (val) onUpdate?.('heading', val);
                            }
                        }}
                    >
                        {heading}
                    </h2>

                    <div className="h-[2px] w-32 bg-gradient-to-r from-transparent via-amber-200 to-transparent mx-auto" />

                    <p
                        className="text-amber-900/70 text-xl md:text-3xl leading-relaxed italic font-medium whitespace-pre-wrap px-4 cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Vow Message:", message);
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
                        className="px-20 py-8 bg-[#451a03] text-amber-50 font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl transition-all"
                    >
                        The Infinite Horizon
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

export default Page5Vow;
