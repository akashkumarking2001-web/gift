import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

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
        text: data.text || "My heart beats faster every time I think of you. Can you feel its rhythm?"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0505] flex flex-col items-center justify-center p-8 text-center text-red-50">
            {/* Pulsing Red Aura */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ transform: 'translateZ(0)', willChange: 'opacity, transform', backfaceVisibility: 'hidden' }}
                className="absolute w-[600px] h-[600px] bg-red-600 blur-[150px] rounded-full"
            />

            <div className="relative z-10 max-w-4xl">
                {/* Floating Heart Activity Icon */}
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                    className="mb-12 flex justify-center"
                >
                    <div className="p-10 bg-red-600/20 rounded-[3rem] border border-red-500/30 backdrop-blur-3xl shadow-[0_0_80px_rgba(220,38,38,0.4)]">
                        <Activity size={80} className="text-red-500" />
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
                        className="text-4xl md:text-7xl font-black font-lovely leading-tight"
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
                    className="mt-24 group relative px-16 py-6 bg-red-600 hover:bg-red-500 text-white font-black text-xs uppercase tracking-[0.5em] rounded-full shadow-[0_30px_60px_-15px_rgba(220,38,38,0.5)] transition-all"
                >
                    Listen to My Heart →
                </motion.button>
            </div>

            {/* Background grid line (simplified heartbeat) */}
            <div className="absolute inset-x-0 top-1/2 h-[2px] bg-red-500/10 -translate-y-1/2 overflow-hidden">
                <motion.div
                    initial={{ x: '-100%' }}
                    style={{ transform: 'translateZ(0)', willChange: 'transform', backfaceVisibility: 'hidden' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-red-500/40 to-transparent"
                />
            </div>
        </div>
    );
};

export default Page1Intro;
