import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const HBDBalloons = ({ data, onNext }: any) => {
    const [poppedCount, setPoppedCount] = useState(0);
    const [balloons, setBalloons] = useState<any[]>([]);

    const words = [data.w1 || "You", data.w2 || "Are", data.w3 || "A", data.w4 || "Cutie"];
    const colors = ['#f472b6', '#c084fc', '#818cf8', '#60a5fa', '#34d399'];

    useEffect(() => {
        // Generate initial balloon positions
        const newBalloons = words.map((word, i) => ({
            id: i,
            word,
            color: colors[i % colors.length],
            x: Math.random() * 60 + 20, // 20-80% width
            y: Math.random() * 40 + 30, // 30-70% height
            delay: i * 0.2,
            scale: Math.random() * 0.2 + 0.9
        }));
        setBalloons(newBalloons);
    }, []);

    const handlePop = (id: number) => {
        setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));
        setPoppedCount(c => {
            const newCount = c + 1;
            if (newCount === words.length) {
                setTimeout(onNext, 2500);
            }
            return newCount;
        });
    };

    return (
        <div className="relative min-h-screen bg-sky-100 overflow-hidden cursor-crosshair">
            {/* Cinematic Sky BG */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-100 to-white" />

            {/* Moving Clouds */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white/60 rounded-full blur-xl"
                    initial={{ x: -200 }}
                    animate={{ x: window.innerWidth + 200 }}
                    transition={{
                        duration: 20 + Math.random() * 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 5
                    }}
                    style={{
                        top: `${Math.random() * 60}%`,
                        width: Math.random() * 200 + 100,
                        height: Math.random() * 100 + 50,
                    }}
                />
            ))}

            <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                <h2 className="text-4xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
                    {poppedCount < words.length ? "Pop 'em All! 🎈" : (data.finalMessage || "Woohoo! Amazing! ⭐")}
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
                                className="absolute text-center font-black text-rose-500 text-3xl z-30 pointer-events-none"
                                style={{ left: b.x + '%', top: b.y + '%' }}
                            >
                                <span className="block drop-shadow-md">{b.word}</span>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Star className="w-12 h-12 text-yellow-400 fill-current animate-spin" />
                                </div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

const Balloon = ({ id, color, x, y, delay, scale, onClick }: any) => {
    return (
        <motion.div
            className="absolute cursor-pointer flex flex-col items-center justify-center group"
            style={{
                left: `${x}%`,
                top: `${y}%`,
            }}
            initial={{ y: '100vh' }}
            animate={{
                y: [0, -20, 0],
                x: [-10, 10, -10],
                rotate: [-5, 5, -5]
            }}
            transition={{
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                delay: delay
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
        >
            {/* Balloon Body - CSS Shape for Realistic Look */}
            <div className="relative w-24 h-32 md:w-32 md:h-40">
                <div
                    className="absolute inset-0 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.1),_5px_5px_15px_rgba(255,255,255,0.4)] transition-all duration-300"
                    style={{
                        backgroundColor: color,
                        boxShadow: `inset -10px -10px 30px rgba(0,0,0,0.1), inset 10px 10px 30px rgba(255,255,255,0.4), 5px 10px 20px rgba(0,0,0,0.1)`
                    }}
                >
                    {/* Reflection Highlight */}
                    <div className="absolute top-4 left-4 w-6 h-10 bg-white/40 rounded-full rotate-[15deg] blur-[2px]" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black/10 blur-sm rounded-full" />
                </div>
                {/* String */}
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[2px] h-16 bg-white/60 origin-top animate-[wave_3s_ease-in-out_infinite]" />
                {/* Knot */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-2" style={{ backgroundColor: color, borderRadius: '2px' }} />
            </div>

            <div className="mt-20 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold bg-black/30 px-2 rounded backdrop-blur-sm text-xs">
                POP ME!
            </div>
        </motion.div>
    );
};

export default HBDBalloons;
