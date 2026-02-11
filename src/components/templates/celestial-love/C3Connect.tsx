import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Star, Sparkles, Heart, Zap, Infinity } from 'lucide-react';

const C3Connect = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    const [connectedCount, setConnectedCount] = useState(0);
    const totalStars = 5;

    const handleConnect = () => {
        if (connectedCount < totalStars) {
            setConnectedCount(prev => prev + 1);
        } else {
            onNext();
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-center p-8 font-mono select-none isolate">

            <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-blue-950/40 to-transparent pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl text-center space-y-16">

                {/* Header */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border border-white/10 shadow-lg text-blue-400 font-black uppercase tracking-[0.5em] text-[10px]"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Label:", data.gameHeading || "Universal Alignment");
                                if (val) onUpdate?.('gameHeading', val);
                            }
                        }}
                    >
                        <Zap size={16} className="animate-pulse" />
                        <span>{data.gameHeading || "Universal Alignment"}</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-tight italic">
                        Align our Constellation
                    </h2>
                    <p className="text-blue-400/40 text-[10px] font-black uppercase tracking-[0.8em]">Capture Each Radiant Core to Synchronize</p>
                </div>

                {/* INTERACTIVE STAR FIELD */}
                <div className="relative h-[400px] w-full flex items-center justify-center">
                    {/* Background Progress */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-5">
                        <div className="w-96 h-96 border-8 border-dashed border-white rounded-full animate-spin-slow" />
                    </div>

                    <AnimatePresence mode='wait'>
                        {connectedCount < totalStars ? (
                            <motion.div
                                key="game"
                                className="relative w-full h-full"
                            >
                                {[...Array(totalStars)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0 }}
                                        animate={{
                                            scale: i < connectedCount ? 1.5 : 1,
                                            opacity: i < connectedCount ? 1 : 0.6,
                                            x: (Math.sin(i * 1.2) * 150) + (i < connectedCount ? 0 : Math.random() * 20),
                                            y: (Math.cos(i * 1.2) * 150) + (i < connectedCount ? 0 : Math.random() * 20)
                                        }}
                                        onClick={() => i === connectedCount && handleConnect()}
                                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-full cursor-pointer transition-all ${i === connectedCount ? 'bg-cyan-500 shadow-[0_0_40px_rgba(6,182,212,0.6)] animate-pulse' : i < connectedCount ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] opacity-30 pointer-events-none' : 'bg-white/10 border border-white/20'}`}
                                    >
                                        <Star size={24} className={i === connectedCount ? 'text-black' : 'text-white'} fill={i <= connectedCount ? 'currentColor' : 'none'} />
                                    </motion.div>
                                ))}

                                {/* Connection Lines (simplified visual) */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                    <motion.path
                                        d={`M 200 200 ${[...Array(connectedCount)].map((_, i) => `L ${200 + Math.sin(i * 1.2) * 150} ${200 + Math.cos(i * 1.2) * 150}`).join(' ')}`}
                                        stroke="rgba(6,182,212,0.3)"
                                        strokeWidth="2"
                                        fill="none"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: connectedCount / totalStars }}
                                    />
                                </svg>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                className="flex flex-col items-center gap-12"
                            >
                                <div className="p-16 bg-blue-600 rounded-full shadow-[0_0_100px_rgba(37,99,235,0.6)] relative">
                                    <Heart size={100} fill="white" className="text-white drop-shadow-2xl" />
                                    <motion.div
                                        animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute inset-0 bg-blue-400 rounded-full"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    onClick={onNext}
                                    className="px-16 py-6 bg-white text-black font-black text-xs uppercase tracking-[0.8em] rounded-full shadow-2xl"
                                >
                                    Proceed To Saga
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="pt-12">
                    <div className="flex justify-center gap-12 text-blue-500/20">
                        <Infinity size={40} />
                        <Star size={40} />
                        <Sparkles size={40} />
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
            `}} />
        </div>
    );
};

export default C3Connect;
