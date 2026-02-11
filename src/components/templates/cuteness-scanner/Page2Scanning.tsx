import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Search, Heart, ShieldAlert, Cpu } from 'lucide-react';

const Page2Scanning = ({ data, onNext }: any) => {
    const [scanProgress, setScanProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState("Accessing Visual Feed...");

    const steps = [
        "Accessing Visual Feed...",
        "Identifying Face Structure...",
        "Measuring Pupil Dilation...",
        "Calculating Glow Proximity...",
        "Analyzing Smile Radius...",
        "Cuteness Overload Detected!"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onNext, 1200);
                    return 100;
                }

                const nextVal = prev + 1;
                const stepIdx = Math.floor((nextVal / 100) * steps.length);
                if (steps[stepIdx]) setCurrentStep(steps[stepIdx]);

                return nextVal;
            });
        }, 60);
        return () => clearInterval(interval);
    }, [onNext]);

    return (
        <div className="relative min-h-screen bg-[#020617] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* Viewfinder Overlay */}
            <div className="absolute inset-0 z-0 border-[40px] border-black/40 pointer-events-none" />

            {/* Viewfinder Corners */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-cyan-400 opacity-60 z-10" />
            <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-cyan-400 opacity-60 z-10" />
            <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-cyan-400 opacity-60 z-10" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-cyan-400 opacity-60 z-10" />

            {/* SCANNING GRID */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05),transparent_70%)] z-0" />

            <div className="relative z-10 flex flex-col items-center w-full max-w-xl">

                {/* SCANNER WINDOW */}
                <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-[4rem] border border-cyan-500/30 overflow-hidden bg-black/40 backdrop-blur-3xl shadow-[0_0_80px_rgba(6,182,212,0.1)] mb-12 flex items-center justify-center isolate">

                    {/* Character Placeholder / Analysis */}
                    <div className="relative w-64 h-64 opacity-40">
                        <img
                            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZkNXhndm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4zdm4mZXA9djFfaW50ZXJuYWxfZ2lmX2J5X2lkJmN0PXM/MeIucAjPKoA1j0zZX/giphy.gif"
                            className="w-full h-full object-contain grayscale"
                            alt="Scan target"
                        />
                    </div>

                    {/* Laser Line */}
                    <motion.div
                        animate={{ top: ['0%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute inset-x-0 h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)] z-20"
                    />

                    {/* Point Accents */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.2 }}
                            className="absolute w-2 h-2 bg-cyan-400 rounded-full z-20"
                            style={{
                                left: `${20 + Math.random() * 60}%`,
                                top: `${20 + Math.random() * 60}%`
                            }}
                        />
                    ))}

                    {/* Data Overlay */}
                    <div className="absolute top-8 left-8 text-[8px] font-black text-cyan-400/60 uppercase tracking-widest space-y-1">
                        <div>REF_ID: CT-409</div>
                        <div>SIGNAL: STABLE</div>
                    </div>
                </div>

                {/* STATUS PANEL */}
                <div className="bg-black/40 backdrop-blur-2xl border border-cyan-500/10 rounded-3xl p-8 w-full space-y-6 text-center shadow-2xl">
                    <div className="space-y-2">
                        <AnimatePresence mode="wait">
                            <motion.h3
                                key={currentStep}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="text-cyan-400 text-lg md:text-xl font-black uppercase tracking-[0.3em]"
                            >
                                {currentStep}
                            </motion.h3>
                        </AnimatePresence>
                        <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em]">{data.text || "Scanning..."}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <div className="text-[10px] font-black uppercase tracking-widest text-cyan-500/40 mb-1">Cuteness Rate</div>
                            <div className="text-white font-black text-xl italic">{Math.min(scanProgress * 15, 999)} bps</div>
                        </div>
                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                            <div className="text-[10px] font-black uppercase tracking-widest text-pink-500/40 mb-1">Heart Intensity</div>
                            <div className="text-white font-black text-xl italic">{scanProgress}%</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corner Info */}
            <div className="fixed top-12 left-12 flex items-center gap-4 opacity-40">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-white font-black tracking-widest uppercase text-[9px]">Live Data Stream</span>
            </div>
        </div>
    );
};

export default Page2Scanning;
