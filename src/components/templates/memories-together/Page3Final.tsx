import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface Page3FinalProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Final = ({ data, onNext, isEditing = false, onUpdate }: Page3FinalProps) => {
    const defaultData = {
        text: data.text || "Thank you for building these memories with me. I love you! ❤️"
    };

    useEffect(() => {
        if (!isEditing) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#ec4899', '#f43f5e', '#ffffff']
            });
        }
    }, [isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0508] flex flex-col items-center justify-center p-8 text-center text-white">
            {/* Background Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.15)_0%,transparent_70%)]" />

            <div className="relative z-10 max-w-4xl">
                {/* Floating Heart Icon */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-16 flex justify-center"
                >
                    <div className="relative">
                        <Heart size={140} fill="#ec4899" className="text-pink-600 drop-shadow-[0_0_60px_rgba(236,72,153,0.7)]" />
                        <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full scale-150" />
                    </div>
                </motion.div>

                {/* Final Narrative Text */}
                <div
                    className={`relative group ${isEditing ? 'cursor-pointer hover:bg-white/5 px-12 py-8 rounded-[3rem] transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Final Message:", defaultData.text);
                            if (val !== null) onUpdate?.('text', val);
                        }
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-8xl font-black font-lovely leading-tight"
                    >
                        {defaultData.text}
                    </motion.h1>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Double Click to Edit Conclusion</span>
                        </div>
                    )}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-24 space-y-8"
                >
                    <button
                        onClick={() => window.location.reload()}
                        className="px-16 py-6 bg-white text-pink-600 font-black text-xs md:text-sm uppercase tracking-[0.6em] rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
                    >
                        Replay Journey
                    </button>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] italic">
                        Made with love uniquely for you
                    </p>
                </motion.div>
            </div>

            {/* Subtle background particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-10"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        opacity: [0.1, 0.4, 0.1],
                        scale: [1, 2, 1]
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

export default Page3Final;
