import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface Page1IntroProps {
    data: {
        greeting?: string;
        subtext?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Intro = ({ data, onNext, isEditing = false, onUpdate }: Page1IntroProps) => {
    const defaultData = {
        greeting: data.greeting || "Hey Beautiful...",
        subtext: data.subtext || "I have a question for you..."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center p-4">
            {/* Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/20 blur-[120px] rounded-full" />

            {/* Particle Hearts */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-red-500/30 text-4xl"
                    style={{
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                    }}
                    initial={{
                        x: Math.random() * 100 + "%",
                        y: "110%",
                        opacity: 0,
                        rotate: 0,
                        scale: 0.5
                    }}
                    animate={{
                        y: ["110%", "-10%"],
                        opacity: [0, 1, 1, 0],
                        rotate: 360,
                        scale: [0.5, 1, 1, 0.5]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                >
                    ❤️
                </motion.div>
            ))}

            <div className="relative z-10 w-full max-w-2xl text-center">
                {/* 3D Heart Mockup */}
                <motion.div
                    initial={{ scale: 0, rotateY: 180 }}
                    animate={{ scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                    className="mb-12 flex justify-center"
                >
                    <motion.div
                        animate={{
                            rotateY: [0, 360],
                            y: [0, -20, 0]
                        }}
                        transition={{
                            rotateY: { duration: 5, repeat: Infinity, ease: "linear" },
                            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative"
                    >
                        <Heart size={160} fill="#dc2626" className="text-red-500 drop-shadow-[0_0_50px_rgba(220,38,38,0.8)]" />
                        <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full scale-150" />
                    </motion.div>
                </motion.div>

                {/* Greeting */}
                <div
                    className={`mb-6 relative group ${isEditing ? 'cursor-pointer' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Greeting:", defaultData.greeting);
                            if (val !== null) onUpdate?.('greeting', val);
                        }
                    }}
                >
                    <h1 className="text-6xl md:text-8xl font-black text-white font-romantic gradient-text px-4 leading-tight">
                        {defaultData.greeting}
                    </h1>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Double Click to Edit</span>
                        </div>
                    )}
                </div>

                {/* Subtext */}
                <div
                    className={`mb-16 relative group ${isEditing ? 'cursor-pointer' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Subtext:", defaultData.subtext);
                            if (val !== null) onUpdate?.('subtext', val);
                        }
                    }}
                >
                    <p className="text-xl md:text-2xl font-medium text-white/60 font-lovely tracking-wide">
                        {defaultData.subtext}
                    </p>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Double Click to Edit</span>
                        </div>
                    )}
                </div>

                {/* Continue Button */}
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-12 py-5 bg-gradient-to-r from-red-600 to-rose-600 rounded-[2.5rem] text-white font-black text-sm uppercase tracking-[0.3em] overflow-hidden shadow-2xl shadow-red-600/30"
                >
                    {/* Pulsing Glow Overlay */}
                    <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white"
                    />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Continue <Heart size={16} fill="currentColor" />
                    </span>
                </motion.button>
            </div>
        </div>
    );
};

export default Page1Intro;
