import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const HBDBalloons = ({ data, onNext }: any) => {
    const [poppedCount, setPoppedCount] = useState(0);
    const [balloons, setBalloons] = useState<any[]>([]);

    const words = [data.w1 || "You", data.w2 || "Are", data.w3 || "A", data.w4 || "Cutie"];
    // Vibrant, romantic colors
    const colors = ['#ec4899', '#f472b6', '#fb7185', '#fcd34d', '#a78bfa'];

    useEffect(() => {
        // Generate initial balloon positions
        const newBalloons = words.map((word, i) => ({
            id: i,
            word,
            color: colors[i % colors.length],
            x: Math.random() * 60 + 20, // 20-80% width
            y: Math.random() * 40 + 30, // 30-70% height
            delay: i * 0.2,
            scale: Math.random() * 0.2 + 0.9,
            // Random sway parameters
            durationX: 3 + Math.random() * 2,
            durationY: 4 + Math.random() * 2
        }));
        setBalloons(newBalloons);
    }, []);

    const handlePop = (id: number) => {
        setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));

        // Explosion Effect
        const balloon = balloons.find(b => b.id === id);
        if (balloon) {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { x: balloon.x / 100, y: balloon.y / 100 },
                colors: [balloon.color, '#fff'],
                zIndex: 100
            });
        }

        setPoppedCount(c => {
            const newCount = c + 1;
            if (newCount === words.length) {
                setTimeout(onNext, 2500);
            }
            return newCount;
        });
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-rose-400 via-pink-400 to-fuchsia-500 overflow-hidden cursor-crosshair">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="balloon-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                            <circle cx="40" cy="40" r="2" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#balloon-pattern)" />
                </svg>
            </div>

            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <h2 className="text-5xl md:text-7xl font-black text-white drop-shadow-xl font-romantic opacity-20 animate-pulse">
                    {poppedCount < words.length ? "Pop 'em!" : (data.finalMessage || "Woohoo! ⭐")}
                </h2>
            </div>

            {/* Balloons Container */}
            <div className="relative w-full h-full z-10">
                <AnimatePresence>
                    {balloons.map((b) => (
                        !b.popped ? (
                            <Balloon
                                key={b.id}
                                {...b}
                                onClick={() => handlePop(b.id)}
                            />
                        ) : (
                            <motion.div
                                key={`pop-${b.id}`}
                                initial={{ scale: 1.5, opacity: 1, x: b.x + '%', y: b.y + '%' }}
                                animate={{ scale: 2, opacity: 0 }}
                                className="absolute text-center z-30 pointer-events-none"
                                style={{ left: b.x + '%', top: b.y + '%' }}
                            >
                                <motion.div
                                    className="font-black text-white text-4xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] bg-rose-500/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/50"
                                    animate={{ y: -50 }}
                                >
                                    {b.word}
                                </motion.div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

const Balloon = ({ id, color, x, y, delay, scale, durationX, durationY, onClick }: any) => {
    return (
        <motion.div
            className="absolute cursor-pointer flex flex-col items-center justify-center group touch-manipulation"
            style={{
                left: `${x}%`,
                top: `${y}%`,
            }}
            initial={{ y: '110vh' }}
            animate={{
                y: [0, -30, 0],
                x: [-15, 15, -15],
                rotate: [-5, 5, -5]
            }}
            transition={{
                y: { duration: durationY, repeat: Infinity, ease: "easeInOut" },
                x: { duration: durationX, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                delay: delay
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
        >
            {/* Balloon Body - Realistic 3D Look */}
            <div className="relative w-32 h-40 md:w-36 md:h-44">
                <div
                    className="absolute inset-0 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.2),_10px_10px_30px_rgba(255,255,255,0.4),_0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-300 border-t border-white/30"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    {/* Strong Reflection Highlight */}
                    <div className="absolute top-6 left-6 w-8 h-12 bg-gradient-to-br from-white to-transparent opacity-80 rounded-full rotate-[-20deg] blur-[2px]" />
                    <div className="absolute top-6 left-6 w-4 h-6 bg-white rounded-full blur-[1px]" />
                </div>

                {/* String */}
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[2px] h-24 bg-white/80 origin-top animate-[wave_2s_ease-in-out_infinite] shadow-sm" />

                {/* Knot */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-3 rounded-sm shadow-sm" style={{ backgroundColor: color }} />
            </div>

            <div className="mt-28 opacity-0 group-hover:opacity-100 transition-opacity text-white font-black uppercase tracking-widest text-[10px] bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">
                Pop Me!
            </div>
        </motion.div>
    );
};

export default HBDBalloons;
