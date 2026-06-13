import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Heart, Hexagon, Key, Loader2 } from 'lucide-react';

const HBDLoading = ({ data, onNext }: any) => {
    useEffect(() => {
        const timer = setTimeout(onNext, 4000);
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <div className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* HYPER-REALISTIC LOADING ATMOSPHERE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-amber-600/5 blur-[150px] rounded-full mix-blend-screen animate-pulse-slow" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
            </div>

            <motion.div
                className="z-10 flex flex-col items-center max-w-lg w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
            >
                {/* 3D-styled Artifact: The Golden Vault */}
                <div className="relative w-48 h-48 mb-16 flex items-center justify-center perspective-[1000px]">

                    {/* Orbiting Halo */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border border-amber-500/20 border-t-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                    />

                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 rounded-full border border-white/5 border-b-white/20"
                    />

                    {/* Central Icon */}
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            scale: [1, 1.05, 1],
                            filter: ['drop-shadow(0 0 10px rgba(245,158,11,0.4))', 'drop-shadow(0 0 30px rgba(245,158,11,0.8))', 'drop-shadow(0 0 10px rgba(245,158,11,0.4))']
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative z-10 p-6 bg-[#0f172a] rounded-3xl border border-amber-500/30 shadow-2xl"
                    >
                        <Key className="w-16 h-16 text-amber-500 stroke-[1.5]" />
                    </motion.div>
                </div>

                <div className="text-center space-y-10 flex flex-col items-center w-full">
                    <div className="space-y-4">
                        <motion.div
                            className="inline-flex items-center gap-3"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500" />
                            <span className="text-amber-200/60 font-black uppercase tracking-[0.4em] text-[10px]">System Initializing</span>
                            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500" />
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-black text-white font-romantic leading-tight">
                            {data.subtext || "Curating Excellence..."}
                        </h2>
                    </div>

                    {/* Minimalist Progress Bar */}
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden relative">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "0%" }}
                            transition={{ duration: 3.5, ease: "circInOut" }}
                            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent blur-[2px]"
                        />
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3.5, ease: "circInOut" }}
                            className="h-full bg-amber-500"
                        />
                    </div>
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

export default HBDLoading;
