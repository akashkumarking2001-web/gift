import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Zap, Heart, Disc, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

const HBDBalloons = ({ data, onNext }: any) => {
    const [poppedCount, setPoppedCount] = useState(0);
    const [balloons, setBalloons] = useState<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const words = [
        data?.w1 || "Radiant",
        data?.w2 || "Golden",
        data?.w3 || "Jubilee",
        data?.w4 || "Years!"
    ];

    const colors = [
        '#FBBF24', // Amber 400
        '#F59E0B', // Amber 500
        '#A855F7', // Purple 500
        '#EC4899', // Pink 500
        '#2DD4BF'  // Teal 400
    ];

    useEffect(() => {
        // Initialize balloons immediately
        const b = words.map((word, i) => ({
            id: i,
            word,
            color: colors[i % colors.length],
            x: 20 + (i * 25),
            y: 40 + (Math.random() * 20),
            scale: 1,
            rotation: (Math.random() - 0.5) * 15,
            delay: i * 0.2,
            popped: false
        }));
        setBalloons(b);
    }, [data]);

    const handlePop = (id: number) => {
        setBalloons(prev => prev.map(b => b.id === id ? { ...b, popped: true } : b));

        const b = balloons.find(x => x.id === id);
        if (!b) return;

        // Luxe Confetti burst
        confetti({
            particleCount: 80,
            spread: 90,
            origin: {
                x: b.x / 100,
                y: b.y / 100
            },
            colors: [b.color, '#FFD700', '#ffffff'],
            shapes: ['circle', 'square'],
            disableForReducedMotion: true
        });

        setPoppedCount(prev => {
            const next = prev + 1;
            if (next === words.length) {
                setTimeout(() => {
                    confetti({
                        particleCount: 250,
                        spread: 180,
                        origin: { y: 0.6 },
                        colors: ['#FFD700', '#A855F7', '#EC4899']
                    });
                    setTimeout(onNext, 2500);
                }, 800);
            }
            return next;
        });
    };

    return (
        <div ref={containerRef} className="relative w-full min-h-screen bg-[#020617] overflow-hidden flex flex-col items-center justify-start pt-16 font-outfit select-none">

            {/* HYPER-REALISTIC GALA ATMOSPHERE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-amber-500/10 blur-[180px] rounded-full animate-pulse-slow mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />

                {/* Floating Metallic Particles */}
                {[...Array(30)].map((_: any, i: number) => (
                    <motion.div
                        key={i}
                        className="absolute text-amber-200/30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -150, 0],
                            opacity: [0.1, 0.4, 0.1],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: 8 + Math.random() * 8,
                            repeat: Infinity,
                        }}
                    >
                        <Disc className="w-4 h-4" />
                    </motion.div>
                ))}
            </div>

            {/* Header Content */}
            <div className="relative z-20 text-center mb-12 px-6 max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: "easeOut", duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-3 bg-amber-950/40 backdrop-blur-md px-8 py-2.5 rounded-full border border-amber-500/20 shadow-xl">
                        <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                        <span className="text-amber-100/60 font-black uppercase tracking-[0.4em] text-[10px]">Ceremony Phase 01</span>
                    </div>

                    <h2 className="text-5xl md:text-8xl font-black text-white font-romantic leading-tight drop-shadow-[0_10px_30px_rgba(245,158,11,0.3)] tracking-tight">
                        {poppedCount < words.length ? "Reveal The Wishes" : (data?.finalMessage || "Magnificent!")}
                    </h2>

                    {/* Progress Indicator */}
                    <div className="flex gap-2 justify-center pt-4">
                        {words.map((_, i) => (
                            <motion.div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-500 ${i < poppedCount ? 'w-8 bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'w-2 bg-slate-800'}`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Interaction Field: High-Fidelity Floating Orbs */}
            <div className="relative w-full h-[60vh] z-10 flex items-center justify-center pointer-events-none">
                <div className="absolute inset-0 pointer-events-auto">
                    <AnimatePresence>
                        {balloons.map((b: any) => (
                            <motion.div
                                key={b.id}
                                style={{
                                    left: `${b.x}%`,
                                    top: `${b.y}%`
                                }}
                                className="absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 z-10"
                                initial={{ y: '120vh', opacity: 0, scale: 0.8 }}
                                animate={{
                                    y: 0,
                                    opacity: 1,
                                    scale: 1,
                                    x: [0, Math.sin(b.id * 10) * 40, 0],
                                }}
                                transition={{
                                    y: { type: 'spring', damping: 15, stiffness: 35, delay: b.delay * 0.5 },
                                    x: { duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }
                                }}
                            >
                                {!b.popped ? (
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handlePop(b.id)}
                                        className="relative cursor-pointer group perspective-[1000px]"
                                    >
                                        {/* Realistic Metallic Sphere Visual */}
                                        <div
                                            className="relative w-32 h-32 md:w-48 md:h-48 rounded-full shadow-2xl backdrop-blur-sm transition-transform duration-500"
                                            style={{
                                                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, ${b.color} 40%, #000 100%)`,
                                                boxShadow: `0 20px 50px -10px ${b.color}60, inset 0 0 20px rgba(0,0,0,0.5)`
                                            }}
                                        >
                                            {/* Specular Highlight */}
                                            <div className="absolute top-[15%] left-[20%] w-[20%] h-[15%] bg-white/40 blur-[4px] rounded-[50%] rotate-[-45deg]" />

                                            {/* Inner Glow Pulse */}
                                            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                                        </div>

                                        {/* Golden Thread */}
                                        <div className="absolute top-[95%] left-1/2 -translate-x-1/2 w-[1px] h-40 bg-gradient-to-b from-amber-200/50 to-transparent" />

                                        {/* Hover Label */}
                                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">Touch to Reveal</span>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0, rotateX: 90 }}
                                        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                                        transition={{ type: "spring", bounce: 0.5 }}
                                        className="bg-[#0f172a]/90 px-10 py-6 rounded-[2rem] shadow-[0_0_40px_rgba(245,158,11,0.3)] border border-amber-500/30 flex items-center justify-center min-w-[180px] backdrop-blur-xl"
                                    >
                                        <span className="text-white text-3xl md:text-5xl font-black font-romantic tracking-tight whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 drop-shadow-sm">
                                            {b.word}
                                        </span>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Hint */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-2 opacity-15 pointer-events-none">
                <div className="h-[1px] w-48 bg-amber-600" />
                <span className="text-[10px] font-black tracking-widest text-amber-100 uppercase">Interaction: Pop Sequence</span>
            </div>

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

export default HBDBalloons;
