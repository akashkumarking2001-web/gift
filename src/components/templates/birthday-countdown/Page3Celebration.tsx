import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Gift, PartyPopper } from 'lucide-react';

const Page3Celebration = ({ data, onNext }: any) => {
    const [poppedCount, setPoppedCount] = useState(0);
    const totalBalloons = 8;
    const [balloons, setBalloons] = useState([...Array(totalBalloons)].map((_, i) => ({
        id: i,
        color: ['#fb7185', '#fbbf24', '#818cf8', '#34d399', '#f472b6', '#a78bfa'][i % 6],
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        popped: false
    })));

    const handlePop = (id: number) => {
        setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
        setPoppedCount(prev => prev + 1);

        confetti({
            particleCount: 40,
            spread: 60,
            origin: { x: balloons.find(b => b.id === id)!.x / 100, y: balloons.find(b => b.id === id)!.y / 100 },
            colors: [balloons.find(b => b.id === id)!.color, '#ffffff']
        });
    };

    const isDone = poppedCount >= totalBalloons;

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-start pt-20 px-8 font-outfit select-none isolate">

            <div className="relative z-10 text-center mb-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-4 mb-4"
                >
                    <PartyPopper size={32} className="text-pink-500" />
                    <h1 className="text-4xl md:text-7xl font-black text-[#5e2d63] font-romantic">
                        Pop for a Surprise!
                    </h1>
                </motion.div>
                <p className="text-pink-400 font-black uppercase tracking-[0.4em] text-[10px]">
                    {isDone ? "Surprise Unlocked!" : `Pop all balloons (${poppedCount}/${totalBalloons})`}
                </p>
            </div>

            {/* BALLOON FIELD */}
            <div className="relative w-full max-w-5xl h-[50vh]">
                {balloons.map((balloon) => (
                    <AnimatePresence key={balloon.id}>
                        {!balloon.popped && (
                            <motion.div
                                initial={{ scale: 0, y: 100 }}
                                animate={{
                                    scale: 1,
                                    y: 0,
                                    x: [0, 10, -10, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                exit={{ scale: 2, opacity: 0 }}
                                transition={{
                                    delay: balloon.id * 0.1,
                                    x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                    rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                                }}
                                onClick={() => handlePop(balloon.id)}
                                className="absolute cursor-pointer group"
                                style={{ left: `${balloon.x}%`, top: `${balloon.y}%` }}
                            >
                                <div
                                    className="w-20 h-24 md:w-32 md:h-40 rounded-[50%_50%_50%_50%_/60%_60%_40%_40%] relative shadow-xl transform transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: balloon.color }}
                                >
                                    <div className="absolute top-4 left-6 w-4 h-8 bg-white/20 rounded-full blur-[2px]" />
                                    {/* String */}
                                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-0.5 h-10 bg-slate-200" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                ))}
            </div>

            {/* FINAL REVEAL CARD */}
            <AnimatePresence>
                {isDone && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-2xl"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 z-0 pointer-events-none opacity-5"
                        >
                            <Sparkles size={800} className="text-pink-500 mx-auto" strokeWidth={0.1} />
                        </motion.div>

                        <div className="relative bg-white border-4 border-pink-100 rounded-[4rem] p-12 md:p-24 text-center shadow-[0_60px_150px_rgba(251,113,133,0.3)] max-w-4xl w-full isolate overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-amber-50" />

                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="mb-12 inline-block relative z-10"
                            >
                                <Gift size={100} fill="#f43f5e" className="text-rose-500 drop-shadow-[0_10px_30px_rgba(244,63,94,0.4)]" />
                            </motion.div>

                            <h2 className="text-5xl md:text-8xl font-black text-[#5e2d63] font-romantic mb-10 leading-tight relative z-10">
                                {data.mainText || "Happy Birthday!"}
                            </h2>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onNext}
                                className="px-20 py-8 bg-[#fb7185] hover:bg-[#f43f5e] text-white font-black text-sm uppercase tracking-[0.5em] rounded-full shadow-2xl relative z-10 overflow-hidden group"
                            >
                                <span className="relative z-10">Discover More</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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

export default Page3Celebration;
