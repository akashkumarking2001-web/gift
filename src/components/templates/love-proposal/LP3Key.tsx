import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Lock, Unlock, Key, Sparkles, Heart } from 'lucide-react';

const LP3Key = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [isKeyFound, setIsKeyFound] = useState(false);

    const handleUnlock = () => {
        setIsUnlocking(true);
        setTimeout(onNext, 2000);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#2b0303] flex flex-col items-center justify-center p-8 font-serif select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#450a0a_0%,transparent_70%)] opacity-40" />

            <div className="relative z-10 w-full max-w-4xl text-center space-y-24">

                {/* Header */}
                <div className="space-y-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-4 bg-[#1a0101] px-10 py-3 rounded-full border border-amber-600/20 text-amber-500 font-black uppercase tracking-[0.5em] text-[10px]"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Label:", data.gameHeading || "The Chamber of Secrets");
                                if (val) onUpdate?.('gameHeading', val);
                            }
                        }}
                    >
                        <Lock size={16} className={isUnlocking ? 'text-emerald-500' : 'animate-pulse'} />
                        <span>{data.gameHeading || "The Chamber of Secrets"}</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight uppercase tracking-tighter">
                        Find the Eternal Key
                    </h2>
                </div>

                {/* INTERACTIVE AREA */}
                <div className="relative h-96 w-full flex items-center justify-center">
                    {!isKeyFound ? (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{
                                scale: 1,
                                x: [0, 100, -100, 0],
                                y: [0, -50, 50, 0]
                            }}
                            transition={{
                                scale: { duration: 0.5 },
                                x: { duration: 5, repeat: Infinity, ease: "linear" },
                                y: { duration: 3, repeat: Infinity, ease: "linear" }
                            }}
                            onClick={() => setIsKeyFound(true)}
                            className="bg-amber-500 p-8 rounded-full shadow-[0_0_50px_rgba(245,158,11,0.5)] cursor-pointer hover:scale-125 transition-transform"
                        >
                            <Key size={44} className="text-black transform rotate-45" />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center gap-12"
                        >
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                onClick={handleUnlock}
                                className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-700 shadow-[0_0_80px_rgba(245,158,11,0.3)] cursor-pointer ${isUnlocking ? 'border-emerald-500 bg-emerald-500/10' : 'border-amber-600 bg-amber-600/10'}`}
                            >
                                <AnimatePresence mode='wait'>
                                    {isUnlocking ? (
                                        <motion.div key="unlocked" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                            <Unlock size={60} className="text-emerald-500" />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="locked" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center gap-2">
                                            <Heart size={60} fill="#dc2626" className="text-[#dc2626]" />
                                            <span className="text-amber-500 font-black text-[8px] uppercase tracking-[0.4em]">Use Key</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                            <p className="text-amber-100/40 text-[10px] font-black uppercase tracking-[0.8em]">Key Discovered. Accessing Heart Hub.</p>
                        </motion.div>
                    )}

                    {/* Background Distractions (Small Hearts) */}
                    {[...Array(10)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-rose-900/10 pointer-events-none"
                            style={{
                                left: `${10 + Math.random() * 80}%`,
                                top: `${10 + Math.random() * 80}%`
                            }}
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                        >
                            <Heart size={32} fill="currentColor" />
                        </motion.div>
                    ))}
                </div>

                <div className="pt-12">
                    <p className="text-amber-600/30 text-[9px] font-black uppercase tracking-[1em]">The door to my soul is always open for you.</p>
                </div>
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

export default LP3Key;
