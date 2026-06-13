import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Sparkles, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const Page3Gift = ({ data, onNext }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        if (!isOpen) {
            setIsOpen(true);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#8B5CF6', '#EC4899', '#ffffff']
            });
        } else {
            onNext();
        }
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#1a0b3e] to-[#0a0515] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-sm flex flex-col items-center"
            >
                <div className="text-center mb-16 space-y-4">
                    <motion.h2
                        animate={isOpen ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
                        className="text-white text-3xl font-romantic font-black tracking-tight"
                    >
                        {data.giftHeading || "A Surprise From Panda"}
                    </motion.h2>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-violet-400 text-3xl font-romantic font-black tracking-tight absolute inset-x-0 top-0"
                            >
                                {data.revealedHeading || "I Have A Secret!"}
                            </motion.h2>
                        )}
                    </AnimatePresence>
                </div>

                {/* INTERACTIVE GIFT BOX */}
                <div
                    onClick={handleOpen}
                    className="relative w-64 h-64 flex items-center justify-center cursor-pointer group"
                >
                    <AnimatePresence>
                        {!isOpen ? (
                            <motion.div
                                key="gift"
                                exit={{ scale: 0, opacity: 0, rotate: 20 }}
                                whileHover={{ scale: 1.05 }}
                                className="relative"
                            >
                                {/* Gift Base */}
                                <div className="w-48 h-48 bg-gradient-to-br from-violet-500 to-purple-800 rounded-3xl shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] border-4 border-white/10 flex items-center justify-center relative">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-full h-8 bg-white/20" />
                                        <div className="h-full w-8 bg-white/20 absolute" />
                                    </div>
                                    <Gift className="text-white w-16 h-16 drop-shadow-lg" />
                                </div>
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white">
                                    <Sparkles size={48} className="animate-pulse" />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="popout"
                                initial={{ scale: 0, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                className="relative flex flex-col items-center"
                            >
                                {/* Character Window */}
                                <div className="w-56 h-56 rounded-full bg-white/5 border-2 border-violet-500/30 p-2 overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.2)]">
                                    <img
                                        src={data.giftCharacter || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkNXhndm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4mZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PXM/IeX1uMpk8XyR906t0D/giphy.gif"}
                                        alt="Panda"
                                        className="w-full h-full object-contain scale-110"
                                    />
                                </div>

                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-4 -right-4 text-yellow-400"
                                >
                                    <Star size={32} fill="currentColor" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <span className="text-violet-400 font-bold uppercase tracking-[0.4em] text-[10px] animate-pulse">
                        {isOpen ? "Tap to see my message" : "Tap the gift to open"}
                    </span>
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

export default Page3Gift;
