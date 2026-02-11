import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Sparkles, Star, Heart, ShieldCheck, ChevronRight, Compass, Orbit, Zap, Target } from 'lucide-react';

interface Page2ConstellationsProps {
    data: {
        stars?: Array<{
            label: string;
            x: number;
            y: number;
        }>;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page2Constellations = ({ data, onNext, isEditing = false, onUpdate }: Page2ConstellationsProps) => {

    // Internal state for hover effects
    const [hoveredStar, setHoveredStar] = useState<number | null>(null);

    const defaultData = {
        stars: data.stars && data.stars.length > 0 ? data.stars : [
            { label: "The Initial Collision", x: 20, y: 30 },
            { label: "Atomic Alignment", x: 70, y: 20 },
            { label: "Planetary Resonance", x: 40, y: 60 },
            { label: "Infinite Gravity", x: 80, y: 80 }
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#02040a] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* HYPER-REALISTIC CELESTIAL ENVIRONMENT (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.1),transparent_50%)]"
                />

                {/* Parallax Starfield */}
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full opacity-20"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ opacity: [0.1, 0.5, 0.1] }}
                        transition={{ duration: 3 + Math.random() * 5, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Mapping Sequence */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-blue-900/10 backdrop-blur-3xl px-14 py-4 rounded-full border border-blue-500/20 shadow-2xl mx-auto isolate"
                >
                    <Compass size={18} className="text-blue-500" />
                    <span className="text-blue-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Mapping Protocol 02 // Stellar Synchronization</span>
                    <Zap size={18} className="text-blue-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE NAUTICAL CONSOLE: High-Fidelity Interaction Map */}
                <div className="relative w-full aspect-video md:aspect-[21/9] bg-[#050b1a]/40 backdrop-blur-[80px] rounded-[5rem] border border-blue-500/15 shadow-[0_80px_150px_-30px_rgba(0,0,0,1)] isolate overflow-hidden">

                    {/* Interior Metallurgy & UI Chrome */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[size:80px_80px] bg-[radial-gradient(#fff_1px,transparent_1px)]" />
                    <div className="absolute top-12 left-12 flex items-center gap-8 opacity-20">
                        <div className="flex items-center gap-2">
                            <Target size={12} className="text-blue-400" />
                            <span className="text-[10px] font-black tracking-widest uppercase">GridLock_Active</span>
                        </div>
                        <div className="h-[1px] w-48 bg-blue-500" />
                    </div>

                    {/* CONSTELLATION ENGINE: SVG Gilded Paths */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgba(59,130,246,0)" />
                                <stop offset="50%" stopColor="rgba(59,130,246,0.6)" />
                                <stop offset="100%" stopColor="rgba(59,130,246,0)" />
                            </linearGradient>
                        </defs>

                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 4, ease: "easeInOut" }}
                            d={`M ${defaultData.stars.map(s => `${(s.x / 100) * 100}%,${(s.y / 100) * 100}%`).join(' L ')}`}
                            className="stroke-blue-500/30 stroke-[2] fill-none"
                            style={{ vectorEffect: 'non-scaling-stroke', filter: 'url(#glow)' }}
                        />

                        {/* Animated Travelling Pulses along the line */}
                        <motion.path
                            initial={{ pathLength: 0, pathOffset: 0 }}
                            animate={{ pathLength: 0.1, pathOffset: 1 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            d={`M ${defaultData.stars.map(s => `${(s.x / 100) * 100}%,${(s.y / 100) * 100}%`).join(' L ')}`}
                            className="stroke-blue-400 stroke-[3] fill-none"
                            style={{ vectorEffect: 'non-scaling-stroke' }}
                        />
                    </svg>

                    {/* STELLAR ARTIFACTS: High-Density Node Units */}
                    {defaultData.stars.map((star, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.4, duration: 1, type: 'spring' }}
                            className="absolute z-20"
                            style={{ left: `${star.x}%`, top: `${star.y}%`, transform: 'translate(-50%, -50%)' }}
                            onMouseEnter={() => setHoveredStar(index)}
                            onMouseLeave={() => setHoveredStar(null)}
                        >
                            <div className="relative group/artifact cursor-pointer">
                                {/* Orbital Resonance Ring */}
                                <motion.div
                                    animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5 }}
                                    className="absolute inset-0 bg-blue-500 rounded-full"
                                />

                                <div className="p-5 bg-[#0a0f1e]/80 backdrop-blur-3xl border border-blue-400/30 rounded-full shadow-[0_0_40px_rgba(59,130,246,0.6)] group-hover/artifact:scale-125 group-hover/artifact:border-blue-400 transition-all duration-500 isolate">
                                    <Star size={24} fill={hoveredStar === index ? "#60a5fa" : "transparent"} className="text-blue-400 transition-colors" />

                                    {/* Rotating Micro-Ring */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                        className="absolute -inset-2 border border-blue-400/20 rounded-full"
                                    />
                                </div>

                                {/* MANIFESTO LABEL: Cinematic Card */}
                                <AnimatePresence>
                                    {hoveredStar === index && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                            animate={{ opacity: 1, y: -20, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                            className="absolute bottom-full mb-10 left-1/2 -translate-x-1/2 min-w-[320px] bg-[#1a2536]/80 backdrop-blur-[40px] border border-blue-500/30 p-10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] z-30 pointer-events-none isolate overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
                                            <div className="relative z-10 flex flex-col items-center gap-4">
                                                <div className="px-5 py-1.5 bg-blue-900/40 rounded-full border border-blue-800/40">
                                                    <span className="text-blue-400 font-black uppercase tracking-[0.6em] text-[8px]">Sector Tracking 0{index + 1}</span>
                                                </div>
                                                <span className="text-white font-romantic text-4xl leading-tight text-center italic">"{star.label}"</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}

                    {/* Console Info Bar */}
                    <div className="absolute bottom-12 right-12 flex items-center gap-6 opacity-30">
                        <span className="text-[10px] font-black tracking-[0.8em] uppercase text-white">LRS_Sequence_Confirmed</span>
                        <Zap size={14} className="text-blue-400 animate-pulse" />
                    </div>
                </div>

                {/* THE PROFESSIONAL ACTION: Tactical Core */}
                <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center gap-14 pb-48">
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-28 py-10 bg-white text-[#02040a] font-black text-xs uppercase tracking-[0.8em] rounded-[4rem] shadow-[0_60px_120px_-20px_rgba(59,130,246,0.6)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[380px]"
                    >
                        <div className="absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative z-10 text-blue-950">Enter The Eternal Core</span>
                        <ChevronRight className="relative z-10 w-8 h-8 border-2 border-blue-900 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700" />
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-white" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Registry: Synchronized</span>
                        <div className="h-[1px] w-48 bg-white" />
                    </div>
                </div>

            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 left-12 flex flex-col items-start gap-4 opacity-15">
                <div className="font-romantic text-8xl text-blue-900 italic">Alignment</div>
                <div className="h-[1px] w-72 bg-blue-900/40" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1.5em]">CELESTIAL-MAP // V4.02</span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />

        </div>
    );
};

export default Page2Constellations;
