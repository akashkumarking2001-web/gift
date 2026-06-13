import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

const Page2Question = ({ data, onNext }: any) => {
    const [noCount, setNoCount] = useState(0);
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [showFinalPlease, setShowFinalPlease] = useState(false);

    const handleNoHover = () => {
        if (noCount < 5) {
            const newX = (Math.random() - 0.5) * 300;
            const newY = (Math.random() - 0.5) * 300;
            setNoButtonPos({ x: newX, y: newY });
            setNoCount(prev => prev + 1);
        } else {
            setShowFinalPlease(true);
        }
    };

    const handleYes = () => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#e11d48', '#ffffff', '#fb7185']
        });
        setTimeout(onNext, 1000);
    };

    const getNoText = () => {
        const phrases = [
            data.noText || "No",
            "Are you sure?",
            "Really sure?",
            "Think again!",
            "Last chance!",
            "Please? 🥺"
        ];
        return phrases[Math.min(noCount, phrases.length - 1)];
    };

    return (
        <div className="relative min-h-screen bg-[#fffafa] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT SOFT FLOW */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-rose-100/30 blur-[150px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg flex flex-col items-center"
            >
                {/* CHARACTER WINDOW */}
                <div className="relative mb-12">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="w-56 h-56 rounded-full bg-white border-4 border-rose-100 p-2 shadow-2xl overflow-hidden flex items-center justify-center"
                    >
                        <img
                            src={data.characterImage || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkNXhndm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4mZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PXM/IeX1uMpk8XyR906t0D/giphy.gif"}
                            alt="Proposal Character"
                            className="w-full h-full object-contain scale-110"
                        />
                    </motion.div>

                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-2 -right-2 text-rose-500"
                    >
                        <Heart fill="currentColor" size={32} />
                    </motion.div>
                </div>

                {/* THE QUESTION */}
                <div className="text-center space-y-8 mb-16">
                    <motion.h2
                        key={noCount}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-rose-950 text-4xl md:text-5xl font-romantic font-black tracking-tight leading-tight"
                    >
                        {showFinalPlease ? "Okay, final answer?" : (data.question || "Will you be mine forever?")}
                    </motion.h2>
                </div>

                {/* ACTIONS */}
                <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleYes}
                        style={{ scale: 1 + noCount * 0.1 }}
                        className="px-16 py-6 bg-rose-500 text-white rounded-[2rem] font-black text-[12px] uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(225,29,72,0.3)] z-20"
                    >
                        {data.yesText || "Yes"}
                    </motion.button>

                    <motion.button
                        animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                        onMouseEnter={handleNoHover}
                        onClick={handleNoHover}
                        className={`px-12 py-6 bg-white text-rose-900 border-2 border-rose-100 rounded-[2rem] font-black text-[10px] uppercase tracking-[0.4em] transition-all hover:bg-rose-50 ${showFinalPlease ? 'hidden' : 'block'}`}
                    >
                        {getNoText()}
                    </motion.button>
                </div>

                <AnimatePresence>
                    {noCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            className="mt-12 text-rose-300 font-bold text-[9px] uppercase tracking-widest"
                        >
                            Hint: There is only one right answer
                        </motion.div>
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

export default Page2Question;
