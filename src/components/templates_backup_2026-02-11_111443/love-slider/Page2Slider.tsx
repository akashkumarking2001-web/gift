import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Heart, ShieldCheck, Zap, Sparkles, Star, Target, ArrowRight, Gauge, Activity } from 'lucide-react';

interface Page2SliderProps {
    data: {
        m1?: string;
        m2?: string;
        m3?: string;
        m4?: string;
        m5?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Slider = ({ data, onNext, isEditing = false, onUpdate }: Page2SliderProps) => {
    const [sliderValue, setSliderValue] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const defaultData = {
        m1: data.m1 || "A little bit...",
        m2: data.m2 || "Quite a lot actually.",
        m3: data.m3 || "More than pizza (huge deal).",
        m4: data.m4 || "To the moon and back!",
        m5: data.m5 || "Till the end of infinity. ❤️"
    };

    const messages = [defaultData.m1, defaultData.m2, defaultData.m3, defaultData.m4, defaultData.m5];
    const currentIndex = Math.min(Math.floor(sliderValue / 20), 4);
    const currentMessage = messages[currentIndex];

    useEffect(() => {
        if (sliderValue >= 98 && !hasCompleted) {
            setHasCompleted(true);
            if (!isEditing) {
                setTimeout(onNext, 2500);
            }
        }
    }, [sliderValue, hasCompleted, onNext, isEditing]);

    const handleInteraction = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate raw new value
        let newValue = ((clientX - rect.left) / rect.width) * 100;

        // Clamp value between 0 and 100
        newValue = Math.max(0, Math.min(100, newValue));

        setSliderValue(newValue);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#07020d] flex flex-col items-center justify-center p-8 text-center font-outfit isolate select-none">

            {/* HYPER-REALISTIC AMPLITUDE CORE ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.25),transparent_70%)]"
                />

                {/* Digital Soundwave Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 mix-blend-screen" />

                {/* Reactive Voltage Lines */}
                <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-purple-500/30 overflow-hidden">
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-purple-400 to-transparent blur-[2px]"
                    />
                </div>
                <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-purple-500/30 overflow-hidden">
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: '-100%' }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-purple-400 to-transparent blur-[2px]"
                    />
                </div>
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-20">

                {/* LIVE AMPLITUDE DISPLAY */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-8 w-full"
                >
                    <div className="inline-flex items-center gap-4 bg-purple-950/40 backdrop-blur-3xl px-12 py-3 rounded-full border border-purple-900/30 shadow-2xl">
                        <Activity size={16} className="text-purple-500 animate-pulse" />
                        <span className="text-purple-100/50 font-black uppercase tracking-[0.6em] text-[10px]">Amplitude Lock // Calibrating</span>
                        <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                    </div>

                    <div className="h-40 md:h-60 flex flex-col items-center justify-center relative w-full overflow-hidden px-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-4xl md:text-[6rem] font-black text-white font-romantic leading-tight drop-shadow-[0_0_60px_rgba(168,85,247,0.6)] tracking-tight max-w-5xl italic"
                            >
                                "{currentMessage}"
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* HIGH-FIDELITY SLIDER UNIT */}
                <div className="w-full max-w-4xl space-y-16 pt-10 px-6">
                    <div
                        ref={containerRef}
                        className="relative h-24 group cursor-crosshair select-none touch-none"
                        onPointerDown={(e) => {
                            e.currentTarget.setPointerCapture(e.pointerId);
                            handleInteraction(e.clientX);
                        }}
                        onPointerMove={(e) => {
                            if (e.buttons === 1) handleInteraction(e.clientX);
                        }}
                        onPointerUp={(e) => {
                            e.currentTarget.releasePointerCapture(e.pointerId);
                        }}
                    >
                        {/* Track Background */}
                        <div className="absolute top-1/2 left-0 right-0 h-4 bg-purple-900/20 rounded-full -translate-y-1/2 overflow-hidden border border-purple-800/30 backdrop-blur-sm">
                            {/* Track Fill */}
                            <motion.div
                                className="h-full bg-gradient-to-r from-purple-900 via-purple-600 to-purple-400"
                                style={{ width: `${sliderValue}%` }}
                            />
                            {/* Track Scanlines */}
                            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_2px,rgba(0,0,0,0.8)_2px)] bg-[size:10px_100%]" />
                        </div>

                        {/* Interactive Handle */}
                        <motion.div
                            style={{ left: `${sliderValue}%` }}
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-20 h-20 bg-[#1a0515] rounded-full border-4 border-purple-500 shadow-[0_0_50px_rgba(168,85,247,0.8)] z-20 flex items-center justify-center group-active:scale-110 transition-transform duration-200"
                        >
                            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping" />
                            <Gauge size={32} className={`text-purple-400 ${sliderValue > 95 ? 'text-white animate-pulse' : ''}`} />

                            {/* Orbital Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-2 border border-dashed border-purple-500/40 rounded-full"
                            />
                        </motion.div>

                        {/* Measurement Ticks */}
                        <div className="absolute top-1/2 left-0 right-0 h-12 -translate-y-1/2 pointer-events-none flex justify-between px-[10px]">
                            {[...Array(11)].map((_, i) => (
                                <div key={i} className={`w-[2px] h-full ${i % 5 === 0 ? 'bg-purple-500/50 h-8' : 'bg-purple-500/20 h-4'} rounded-full self-center`} />
                            ))}
                        </div>
                    </div>

                    {/* STATUS FEEDBACK SYSTEM */}
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex justify-between items-end w-full px-4 border-b border-purple-800/30 pb-4">
                            <div className="flex items-center gap-3 opacity-60">
                                <Activity size={14} className="text-purple-500" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-200">Current Output</span>
                            </div>
                            <span className="text-6xl font-black text-white font-mono">{Math.round(sliderValue)}<span className="text-2xl text-purple-500">%</span></span>
                        </div>

                        <AnimatePresence>
                            {sliderValue >= 98 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    className="flex items-center gap-4 text-purple-300 font-black text-xs uppercase tracking-[0.5em] animate-pulse bg-purple-500/10 px-8 py-4 rounded-full border border-purple-500/30"
                                >
                                    <Zap size={14} className="fill-current text-purple-400" /> Maximum Amplitude Reached <Zap size={14} className="fill-current text-purple-400" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!hasCompleted && (
                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-white/30 text-[10px] uppercase tracking-[0.8em] flex items-center gap-3 pt-4"
                            >
                                <span className="animate-pulse">Increase Gain</span> <ArrowRight size={14} />
                            </motion.div>
                        )}
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 left-12 flex flex-col items-start gap-4 opacity-15">
                <div className="font-romantic text-8xl text-purple-900 italic">Gain</div>
                <div className="h-[1px] w-72 bg-purple-900/40" />
                <span className="text-[10px] font-black tracking-widest text-purple-200 uppercase tracking-[1.5em]">AMPLITUDE-MONITOR // V5.02</span>
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

export default Page2Slider;
