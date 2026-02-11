import { motion } from 'framer-motion';
import { Heart, Stars, ChevronRight, BookOpen } from 'lucide-react';

const Page1Intro = ({ data, onNext }: any) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-center p-8 font-outfit select-none isolate text-center">

            {/* GRID BACKGROUND (from reference) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.4]">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#fee2e2_1px,transparent_1px),linear-gradient(to_bottom,#fee2e2_1px,transparent_1px)] bg-[size:30px_30px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#fdf2f8,transparent_50%),radial-gradient(circle_at_80%_80%,#fff7ed,transparent_50%)]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-2xl bg-white border-4 border-[#fee2e2] rounded-[3rem] p-12 md:p-20 shadow-[0_40px_100px_-20px_rgba(251,113,133,0.15)] overflow-hidden"
            >
                {/* Character/Icon (Cats) */}
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12 relative flex justify-center"
                >
                    <div className="p-8 bg-rose-50 rounded-full border border-rose-100 relative">
                        <img
                            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkNXhndm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4mZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PXM/Xv578nXC8S6mYp1f6r/giphy.gif"
                            alt="Cats hugging"
                            className="w-40 h-40 object-contain relative z-10"
                        />
                        <Heart className="absolute -top-2 -right-2 text-rose-500 fill-current animate-pulse" size={32} />
                    </div>
                </motion.div>

                {/* Typography */}
                <div className="space-y-8 mb-16 px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block px-6 py-2 bg-pink-500/10 rounded-full border border-pink-500/20"
                    >
                        <span className="text-pink-600 font-black uppercase tracking-[0.4em] text-[10px]">A Story of Us</span>
                    </motion.div>

                    <h1 className="text-4xl md:text-6xl font-black text-[#5e2d63] font-romantic leading-tight">
                        {data.heading || "Our Journey Together"}
                    </h1>

                    <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed italic">
                        {data.subtext || "Flip through the pages of our beautiful bond—the highs, the lows, and everything in between."}
                    </p>
                </div>

                {/* Button */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="w-full py-6 bg-[#fb7185] hover:bg-[#f43f5e] text-white font-black text-xs uppercase tracking-[0.6em] rounded-2xl shadow-xl flex items-center justify-center gap-4 transition-all"
                >
                    <span>Begin Our Prologue</span>
                    <BookOpen size={18} />
                </motion.button>
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

export default Page1Intro;
