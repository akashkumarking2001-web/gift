import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Move } from 'lucide-react';
import confetti from 'canvas-confetti';

const HBDCake = ({ data, onNext }: any) => {
    // States: 'base', 'decorating', 'decorated', 'lighting', 'lit', 'celebration'
    const [phase, setPhase] = useState<'base' | 'decorating' | 'decorated' | 'lighting' | 'lit' | 'celebration'>('base');
    const [decorations, setDecorations] = useState<{ x: number, y: number, color: string }[]>([]);

    // Mouse dragging for decorations
    const cakeRef = useRef<HTMLDivElement>(null);

    const handleDecorateClick = (e: React.MouseEvent) => {
        if (phase !== 'base' && phase !== 'decorating') return;

        // Add random decoration
        const rect = cakeRef.current?.getBoundingClientRect();
        if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setDecorations(prev => [...prev, { x, y, color: ['#FF69B4', '#FFD700', '#00BFFF', '#32CD32'][Math.floor(Math.random() * 4)] }]);
            setPhase('decorating');
        }
    };

    const finishDecorating = () => {
        setPhase('decorated');
    };

    const lightCandle = () => {
        setPhase('lit');
        setTimeout(() => {
            // Blowout/Celebration logic
            setPhase('celebration');
            confetti({
                particleCount: 200,
                spread: 120,
                origin: { y: 0.7 },
                colors: ['#FFD700', '#FFA500', '#FF4500'],
                scalar: 1.2
            });
            setTimeout(onNext, 5000);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-100 to-amber-50 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Cinematic Lighting Overhead */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-white/40 to-transparent pointer-events-none blur-3xl" />

            <div className="text-center mb-12 relative z-10 w-full max-w-2xl px-4">
                <AnimatePresence mode="wait">
                    <motion.h2
                        key={phase}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-3xl md:text-5xl font-black text-rose-600 drop-shadow-sm"
                    >
                        {phase === 'base' && "Let's Design Your Cake! 🎂"}
                        {phase === 'decorating' && "Add More Sprinkles! ✨"}
                        {phase === 'decorated' && "Perfect! Now Time to Light It 🔥"}
                        {phase === 'lit' && "Make a Wish... 🕯️"}
                        {phase === 'celebration' && (data.congratsText || "HAPPY BIRTHDAY!!! 🎉")}
                    </motion.h2>
                </AnimatePresence>
                <p className="mt-4 text-rose-400 font-medium text-lg">
                    {phase === 'base' || phase === 'decorating' ? "Tap anywhere on the cake to add decorations" : ""}
                </p>
            </div>

            {/* 3D Realistic Cake Container */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 perspective-[1000px] group cursor-pointer" ref={cakeRef} onClick={handleDecorateClick}>
                <motion.div
                    layoutId="cake-structure"
                    className="relative w-full h-full preserve-3d transition-transform duration-500 ease-out hover:rotate-x-6 hover:rotate-y-6"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    {/* Cake Plate Shadow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-20 bg-black/20 blur-[30px] rounded-[100%]" />

                    {/* Cake Base Layer */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-[20px] shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.1),_0_10px_20px_rgba(0,0,0,0.1)] border-b-4 border-amber-300 transform-style-3d">
                        {/* Icing Drips */}
                        <div className="absolute top-0 left-0 right-0 h-12 bg-pink-300 rounded-t-[20px] rounded-b-[30px] shadow-sm transform translate-y-[-5px]">
                            <svg className="w-full h-full fill-pink-300 drop-shadow-md" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <path d="M0,0 L100,0 L100,10 C90,15 80,5 70,12 C60,18 50,8 40,15 C30,22 20,8 10,12 L0,10 Z" />
                            </svg>
                        </div>
                    </div>

                    {/* Cake Top Layer */}
                    <div className="absolute bottom-40 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 rounded-[15px] shadow-[inset_-5px_-5px_20px_rgba(0,0,0,0.1),_0_10px_15px_rgba(0,0,0,0.1)] border-b-4 border-amber-300 z-10">
                        <div className="absolute top-0 left-0 right-0 h-8 bg-pink-400 rounded-t-[15px] rounded-b-[20px] shadow-md transform translate-y-[-5px]">
                            <svg className="w-full h-full fill-pink-400 drop-shadow-md" viewBox="0 0 100 20" preserveAspectRatio="none">
                                <path d="M0,0 L100,0 L100,8 C90,12 80,4 70,10 C60,16 50,6 40,12 C30,18 20,6 10,10 L0,8 Z" />
                            </svg>
                        </div>
                    </div>

                    {/* Decorative Toppers (User Added) */}
                    <AnimatePresence>
                        {decorations.map((d, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, y: -20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="absolute w-4 h-4 rounded-full shadow-sm z-20"
                                style={{
                                    backgroundColor: d.color,
                                    left: d.x,
                                    top: d.y,
                                    boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.2)'
                                }}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Candle (Condition: phase >= decorated) */}
                    <AnimatePresence>
                        {phase !== 'base' && phase !== 'decorating' && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="absolute bottom-[260px] left-1/2 -translate-x-1/2 w-4 h-32 flex flex-col items-center z-0 origin-bottom"
                            >
                                {/* Candle Body with Stripes */}
                                <div className="w-6 h-24 bg-gradient-to-r from-blue-100 via-white to-blue-100 rounded-sm shadow-inner border border-blue-200 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#3b82f6_10px,#3b82f6_20px)] opacity-20" />
                                </div>
                                <div className="w-1 h-3 bg-gray-400 mt-[-2px]" />

                                {/* Flame (Condition: phase >= lit) */}
                                {phase === 'lit' || phase === 'celebration' ? (
                                    <motion.div
                                        className="absolute -top-10 w-8 h-12 bg-gradient-to-t from-orange-500 via-yellow-400 to-white rounded-[50%] blur-[2px] shadow-[0_0_20px_#f59e0b]"
                                        animate={{
                                            scale: [1, 1.1, 0.9, 1.05, 1],
                                            rotate: [-2, 2, -1, 1, 0],
                                            opacity: phase === 'celebration' ? 0 : [0.8, 1, 0.9]
                                        }}
                                        transition={{ duration: 0.1, repeat: Infinity }} // Flicker
                                    >
                                        <div className="absolute inset-2 bg-blue-500 rounded-full blur-md opacity-50 bottom-0" />
                                    </motion.div>
                                ) : (
                                    <div className="absolute -top-1 opacity-0 group-hover:opacity-50 transition-opacity">
                                        <div className="text-xs bg-black text-white px-2 py-1 rounded">Click button below</div>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex gap-4 z-20">
                {(phase === 'base' || phase === 'decorating') && (
                    <motion.button
                        layout
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={finishDecorating}
                        disabled={decorations.length < 3}
                        className={`px-8 py-4 rounded-full font-bold text-lg shadow-xl outline-none transition-all ${decorations.length < 3 ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:shadow-pink-500/40'}`}
                    >
                        {decorations.length < 3 ? "Add more toppings!" : "Done Decorating! ✅"}
                    </motion.button>
                )}

                {phase === 'decorated' && (
                    <motion.button
                        layout
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.1, boxShadow: "0 0 25px #f59e0b" }}
                        onClick={lightCandle}
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-xl shadow-lg flex items-center gap-3"
                    >
                        <Flame className="w-6 h-6 animate-pulse" /> Light the Candle
                    </motion.button>
                )}
            </div>
        </div>
    );
};

export default HBDCake;
