import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Lock, Unlock, ShieldAlert, Sparkles, Key, Zap } from 'lucide-react';

const SSSGate = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleUnlock = () => {
        if (isUnlocking) return;
        setIsUnlocking(true);

        let p = 0;
        const interval = setInterval(() => {
            p += Math.random() * 8;
            setProgress(Math.min(p, 100));
            if (p >= 100) {
                clearInterval(interval);
                setTimeout(onNext, 1000);
            }
        }, 120);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0d0d] flex flex-col items-center justify-center p-8 font-mono select-none isolate">

            {/* AMBIENT SECURITY OVERLAY */}
            <div className={`absolute inset-0 transition-colors duration-1000 ${isUnlocking ? 'bg-emerald-950/20' : 'bg-rose-950/10'}`} />

            <div className="relative z-10 w-full max-w-4xl text-center space-y-16">

                {/* Header Section */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border border-white/10 shadow-lg text-rose-500 font-black uppercase tracking-[0.5em] text-[10px]"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Heading:", data.gateHeading || "The Secret Archive");
                                if (val) onUpdate?.('gateHeading', val);
                            }
                        }}
                    >
                        <ShieldAlert size={16} className={isUnlocking ? 'text-emerald-500' : 'animate-pulse'} />
                        <span>{data.gateHeading || "The Secret Archive"}</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-8xl font-black text-white uppercase tracking-tighter leading-tight">
                        Access Restricted
                    </h2>
                </div>

                {/* INTERACTIVE LOCK */}
                <div className="relative flex flex-col items-center gap-12">
                    <motion.div
                        whileHover={!isUnlocking ? { scale: 1.1 } : {}}
                        whileTap={!isUnlocking ? { scale: 0.9 } : {}}
                        onClick={handleUnlock}
                        className={`relative w-64 h-64 rounded-full border-4 flex items-center justify-center transition-all duration-700 shadow-[0_0_80px_rgba(225,29,72,0.3)] cursor-pointer overflow-hidden ${isUnlocking ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_80px_rgba(16,185,129,0.3)]' : 'border-rose-600 bg-rose-600/5 hover:bg-rose-600/10'}`}
                    >
                        <AnimatePresence mode='wait'>
                            {isUnlocking ? (
                                <motion.div
                                    key="unlocking"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex flex-col items-center gap-4"
                                >
                                    <Unlock size={80} className="text-emerald-500" />
                                    <span className="text-emerald-500 font-black text-2xl">{Math.round(progress)}%</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="locked"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="flex flex-col items-center gap-4 group"
                                >
                                    <Lock size={80} className="text-rose-600 group-hover:text-rose-400 transition-colors" />
                                    <span className="text-rose-600/40 text-[10px] font-black uppercase tracking-[0.4em]">Hold To Decrypt</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Particle Ring */}
                        <div className="absolute inset-0 z-0">
                            {[...Array(12)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`absolute w-1 h-4 rounded-full ${isUnlocking ? 'bg-emerald-500' : 'bg-rose-600'}`}
                                    style={{
                                        left: '50%',
                                        top: '50%',
                                        transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-80px)`
                                    }}
                                    animate={isUnlocking ? { rotate: [i * 30, i * 30 + 360] } : {}}
                                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                                />
                            ))}
                        </div>
                    </motion.div>

                    {/* Hint */}
                    <p className={`text-white/20 text-[10px] uppercase font-black tracking-[0.8em] transition-opacity ${isUnlocking ? 'opacity-0' : 'opacity-100'}`}>
                        Requires High Intensity Affection Clearance
                    </p>
                </div>

                <div className="flex justify-center gap-12 opacity-10">
                    <Key size={32} className="text-white" />
                    <Zap size={32} className="text-white" />
                </div>
            </div>
        </div>
    );
};

export default SSSGate;
