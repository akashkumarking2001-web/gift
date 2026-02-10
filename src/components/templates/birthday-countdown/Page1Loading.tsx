import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Heart } from 'lucide-react';

interface Page1LoadingProps {
    data: {
        subtext?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Loading = ({ data, onNext, isEditing = false, onUpdate }: Page1LoadingProps) => {
    const defaultData = {
        subtext: data.subtext || "For someone very special..."
    };

    useEffect(() => {
        if (!isEditing) {
            const timer = setTimeout(onNext, 4000);
            return () => clearTimeout(timer);
        }
    }, [onNext, isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#020205] flex flex-col items-center justify-center p-8">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-purple-900/20 blur-[150px] rounded-full" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-pink-900/20 blur-[150px] rounded-full" />

            <div className="relative z-10 text-center">
                {/* Pulsing Heart Icon */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="mb-12 flex justify-center"
                >
                    <div className="relative">
                        <Heart size={80} fill="#ec4899" className="text-pink-500 drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]" />
                        <motion.div
                            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="absolute inset-0 bg-pink-500 rounded-full"
                        />
                    </div>
                </motion.div>

                {/* Main Text */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-black text-white uppercase tracking-[0.3em] mb-4 font-lovely"
                >
                    Preparing Something Special
                </motion.h1>

                {/* Subtext */}
                <div
                    className={`relative group inline-block ${isEditing ? 'cursor-pointer hover:bg-white/5 px-4 py-2 rounded-xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Subtext:", defaultData.subtext);
                            if (val !== null) onUpdate?.('subtext', val);
                        }
                    }}
                >
                    <p className="text-lg md:text-xl text-pink-500/60 font-medium tracking-[0.2em] uppercase">
                        {defaultData.subtext}
                    </p>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black text-white/30 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click to Edit</span>
                        </div>
                    )}
                </div>

                {/* Progress Bar (Mock) */}
                <div className="mt-16 w-64 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-pink-500 to-transparent"
                    />
                </div>
            </div>

            {/* Floating particles */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [-20, -100],
                        opacity: [0, 1, 0]
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

export default Page1Loading;
