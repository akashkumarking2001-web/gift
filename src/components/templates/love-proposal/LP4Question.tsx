import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Stars, Gift, Star, Sparkles } from 'lucide-react';

const LP4Question = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
    const [noCount, setNoCount] = useState(0);
    const [isAccepted, setIsAccepted] = useState(false);

    const handleNo = () => {
        setNoCount(prev => prev + 1);
        setNoPosition({
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400
        });
    };

    const handleYes = () => {
        setIsAccepted(true);
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#f59e0b', '#dc2626', '#ffffff']
        });
        setTimeout(onNext, 2500);
    };

    const question = data.question || "Will you be mine forever?";
    const yesText = data.yesText || "Yes, A Thousand Times!";
    const noText = data.noText || "No";

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#2b0303] flex flex-col items-center justify-center p-8 font-serif select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#450a0a_0%,transparent_70%)] opacity-40" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-4xl bg-[#450a0a]/40 backdrop-blur-3xl rounded-[4rem] p-12 md:p-24 border-4 border-amber-600/30 text-center space-y-16 shadow-[0_60px_150px_rgba(0,0,0,0.8)]"
            >
                {/* Visual Anchor */}
                <div className="flex justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative"
                    >
                        <Heart size={100} fill="#dc2626" className="text-[#dc2626] drop-shadow-[0_0_30px_rgba(220,38,38,0.4)]" />
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-[-20px] border-2 border-dashed border-amber-500/20 rounded-full"
                        />
                    </motion.div>
                </div>

                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-block px-10 py-3 bg-[#1a0101] rounded-full border border-amber-600/20 text-amber-500 font-black uppercase tracking-[0.5em] text-[10px]"
                    >
                        <span>The Ultimate Destination</span>
                    </motion.div>

                    <h2
                        className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight uppercase tracking-tighter cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Question:", question);
                                if (val) onUpdate?.('question', val);
                            }
                        }}
                    >
                        {question}
                    </h2>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-8">
                    <motion.button
                        whileHover={{ scale: 1.1, boxShadow: "0 0 50px rgba(245,158,11,0.5)" }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleYes}
                        className="px-16 py-8 bg-amber-500 text-black font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl z-20"
                    >
                        {data.yesText || "Yes, A Thousand Times!"}
                    </motion.button>

                    <motion.button
                        style={{ x: noPosition.x, y: noPosition.y }}
                        animate={{
                            scale: Math.max(0.4, 1 - noCount * 0.1),
                            opacity: Math.max(0.1, 1 - noCount * 0.05)
                        }}
                        onMouseEnter={handleNo}
                        onClick={handleNo}
                        className="px-12 py-6 bg-white/5 border border-white/10 text-white/40 font-black text-xs uppercase tracking-[0.6em] rounded-full backdrop-blur-md"
                    >
                        {data.noText || "No"}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {noCount > 3 && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-amber-500/60 font-black uppercase tracking-[0.4em] text-[10px]"
                        >
                            "Resistance is futile, my love."
                        </motion.p>
                    )}
                </AnimatePresence>
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

export default LP4Question;
