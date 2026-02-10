import { motion } from 'framer-motion';
import { MailOpen } from 'lucide-react';

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
        text: data.text || "I've prepared a special collection of cards for you. Pick the one that speaks to your heart."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0508] flex flex-col items-center justify-center p-8 text-center">
            {/* Elegant Rose Background Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,29,72,0.1),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.1),transparent_60%)]" />

            <div className="relative z-10 max-w-4xl">
                {/* Floating Envelope Icon */}
                <motion.div
                    animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12 flex justify-center"
                >
                    <div className="p-10 bg-rose-600/20 rounded-[3rem] border border-rose-500/30 backdrop-blur-3xl shadow-[0_0_80px_rgba(225,29,72,0.3)]">
                        <MailOpen size={80} className="text-rose-400" />
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-4xl md:text-7xl font-black text-rose-50 font-romantic leading-tight"
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
                    className="mt-24 group relative px-16 py-6 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-[0.5em] rounded-full shadow-[0_30px_60px_-15px_rgba(225,29,72,0.5)] transition-all"
                >
                    See My Collection →
                </motion.button>
            </div>

            {/* Floating background rose petals (simplified as circles) */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-4 h-6 bg-rose-500/10 rounded-full blur-[2px]"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: 'translateZ(0)',
                        willChange: 'transform, opacity',
                        backfaceVisibility: 'hidden'
                    }}
                    animate={{
                        y: [0, 400],
                        x: [0, 50, -50, 0],
                        rotate: 360,
                        opacity: [0, 0.4, 0]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 10,
                        repeat: Infinity,
                        delay: Math.random() * 10
                    }}
                />
            ))}
        </div>
    );
};

export default Page1Intro;
