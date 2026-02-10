import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

interface Page3CelebrationProps {
    data: {
        mainText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Celebration = ({ data, onNext, isEditing = false, onUpdate }: Page3CelebrationProps) => {
    const [showButton, setShowButton] = useState(false);

    const defaultData = {
        mainText: data.mainText || "Yayyy! 🎉"
    };

    useEffect(() => {
        // Initial explosion
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#dc2626', '#f43f5e', '#ffffff', '#fb923c']
        });

        // Loop continuous small confetti
        const end = Date.now() + 3000;
        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#dc2626', '#f43f5e']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#dc2626', '#f43f5e']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();

        // Show continue button after a delay
        setTimeout(() => setShowButton(true), 2500);

        // Auto advance after 5 seconds if not editing
        if (!isEditing) {
            setTimeout(onNext, 6000);
        }
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050505] flex flex-col items-center justify-center p-4">
            {/* Pulsing Gradient Background */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                style={{ transform: 'translateZ(0)', willChange: 'opacity, transform', backfaceVisibility: 'hidden' }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-rose-600/20 to-orange-600/20"
            />

            <div className="relative z-10 text-center">
                {/* 3D Growing Heart */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 1.5, times: [0, 0.7, 1], ease: "easeOut" }}
                    className="mb-12 flex justify-center"
                >
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                        className="relative"
                    >
                        <Heart size={200} fill="#dc2626" className="text-red-600 drop-shadow-[0_0_80px_rgba(220,38,38,0.8)]" />
                        <div className="absolute inset-0 bg-white/20 blur-[100px] rounded-full scale-150" />
                    </motion.div>
                </motion.div>

                {/* Big Yayyy Text */}
                <div
                    className={`relative group ${isEditing ? 'cursor-pointer px-12 py-6 hover:bg-white/5 rounded-3xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Celebration Text:", defaultData.mainText);
                            if (val !== null) onUpdate?.('mainText', val);
                        }
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="text-7xl md:text-9xl font-black text-white font-romantic tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] leading-tight"
                    >
                        {defaultData.mainText}
                    </motion.h1>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full">Double Click to Edit</span>
                        </div>
                    )}
                </div>

                {/* Subheading */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-6 text-2xl text-white/60 font-lovely italic"
                >
                    I knew you'd say yes! ❤️
                </motion.p>

                {/* Continue Button */}
                <AnimatePresence>
                    {showButton && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            onClick={onNext}
                            className="mt-16 group relative px-10 py-4 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all rounded-full text-white font-black text-[10px] uppercase tracking-[0.4em]"
                        >
                            Next Module →
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Sparks */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full blur-[1px]"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: 'translateZ(0)',
                        willChange: 'opacity, transform',
                        backfaceVisibility: 'hidden'
                    }}
                    animate={{
                        y: [-20, -100],
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 3
                    }}
                />
            ))}
        </div>
    );
};

export default Page3Celebration;
