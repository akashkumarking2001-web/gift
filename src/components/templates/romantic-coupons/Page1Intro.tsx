import { motion } from 'framer-motion';
import { Ticket } from 'lucide-react';

interface Page1IntroProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Intro = ({ data, onNext, isEditing = false, onUpdate }: Page1IntroProps) => {
    const defaultData = {
        text: data.text || "Use these coupons whenever you want a little extra love. Valid forever!"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0a05] flex flex-col items-center justify-center p-8 text-center">
            {/* Golden Background Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1)_0%,transparent_70%)]" />

            <div className="relative z-10 max-w-3xl">
                {/* Floating Ticket Icon */}
                <motion.div
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12 flex justify-center"
                >
                    <div className="p-8 bg-amber-600/20 rounded-[2.5rem] border border-amber-500/30 backdrop-blur-3xl shadow-[0_0_50px_rgba(245,158,11,0.2)]">
                        <Ticket size={80} className="text-amber-500 rotate-45" />
                    </div>
                </motion.div>

                {/* Intro Text */}
                <div
                    className={`relative group ${isEditing ? 'cursor-pointer hover:bg-white/5 px-10 py-6 rounded-3xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Intro Text:", defaultData.text);
                            if (val !== null) onUpdate?.('text', val);
                        }
                    }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-white font-lovely leading-tight"
                    >
                        {defaultData.text}
                    </motion.h1>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full">Double Click to Edit Intro</span>
                        </div>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="mt-24 group relative px-16 py-6 border border-amber-500/30 bg-amber-600/10 hover:bg-amber-600/20 text-amber-500 font-black text-xs uppercase tracking-[0.5em] rounded-full transition-all"
                >
                    Open Coupon Book →
                </motion.button>
            </div>

            {/* Glowing background dots */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-500 rounded-full opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
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

export default Page1Intro;
