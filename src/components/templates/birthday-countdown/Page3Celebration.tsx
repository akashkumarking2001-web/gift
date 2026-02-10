import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift } from 'lucide-react';

interface Page3CelebrationProps {
    data: {
        mainText?: string;
        subtext?: string;
        buttonText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Celebration = ({ data, onNext, isEditing = false, onUpdate }: Page3CelebrationProps) => {
    const defaultData = {
        mainText: data.mainText || "Time to Celebrate!",
        subtext: data.subtext || "The countdown is over...",
        buttonText: data.buttonText || "🎁 Let's Celebrate! ✨"
    };

    useEffect(() => {
        const end = Date.now() + 5000;
        const colors = ['#ec4899', '#f43f5e', '#fb923c'];

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0a0f] flex flex-col items-center justify-center p-8">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-pink-600/10 blur-[150px] rounded-full" />

            <div className="relative z-10 text-center">
                {/* 3D Animated Gift Box */}
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 1 }}
                    className="mb-12 flex justify-center"
                >
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-pink-500/30 blur-3xl rounded-full scale-125" />
                        <div className="w-48 h-48 bg-gradient-to-br from-pink-500 to-rose-600 rounded-[2.5rem] flex items-center justify-center shadow-[0_30px_60px_-15px_rgba(236,72,153,0.5)] border border-white/20 relative z-10">
                            <Gift size={80} className="text-white drop-shadow-lg" />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Main Heading */}
                <div
                    className={`mb-6 relative group ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-3 rounded-2xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Main Text:", defaultData.mainText);
                            if (val !== null) onUpdate?.('mainText', val);
                        }
                    }}
                >
                    <h1 className="text-5xl md:text-8xl font-black text-white font-lovely tracking-tight leading-tight">
                        {defaultData.mainText}
                    </h1>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click to Edit Heading</span>
                        </div>
                    )}
                </div>

                {/* Subtext */}
                <div
                    className={`mb-16 relative group ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-3 rounded-2xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Subtext:", defaultData.subtext);
                            if (val !== null) onUpdate?.('subtext', val);
                        }
                    }}
                >
                    <p className="text-xl md:text-3xl font-medium text-pink-500/80 italic font-lovely">
                        {defaultData.subtext}
                    </p>
                    {isEditing && (
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click to Edit Subtext</span>
                        </div>
                    )}
                </div>

                {/* Celebration Button */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-12 py-6 bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 rounded-[2.5rem] text-white font-black text-lg md:text-xl uppercase tracking-[0.2em] shadow-[0_25px_50px_-15px_rgba(236,72,153,0.5)] transition-all overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span
                        className={`relative z-10 flex items-center justify-center gap-3 ${isEditing ? 'cursor-pointer' : ''}`}
                        onDoubleClick={(e) => {
                            if (isEditing) {
                                e.stopPropagation();
                                const val = prompt("Edit Button Text:", defaultData.buttonText);
                                if (val !== null) onUpdate?.('buttonText', val);
                            }
                        }}
                    >
                        {defaultData.buttonText}
                    </span>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click to Edit Button</span>
                        </div>
                    )}
                </motion.button>
            </div>

            {/* Floating Confetti Shapes */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-sm"
                    style={{
                        backgroundColor: ['#ec4899', '#f43f5e', '#fb923c', '#ffffff'][i % 4],
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        rotate: 360,
                        y: [0, -100],
                        opacity: [0.3, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    );
};

export default Page3Celebration;
