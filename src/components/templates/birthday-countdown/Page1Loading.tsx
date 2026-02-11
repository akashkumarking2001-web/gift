import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Gift, Sparkles, Heart, Star, Zap } from 'lucide-react';

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
        subtext: data.subtext || "Preparing the perfect surprise..."
    };

    useEffect(() => {
        if (!isEditing) {
            const timer = setTimeout(onNext, 4500);
            return () => clearTimeout(timer);
        }
    }, [onNext, isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-center p-8 text-center font-outfit select-none">

            {/* FESTIVE PASTEL ATMOSPHERE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,241,200,0.4),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(255,192,203,0.4),transparent_50%)]"
                />

                {/* Floating Confetti Shapes */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute blur-[1px]"
                        style={{
                            width: `${Math.random() * 20 + 10}px`,
                            height: `${Math.random() * 20 + 10}px`,
                            backgroundColor: ['#fb7185', '#fbbf24', '#818cf8', '#34d399'][i % 4],
                            borderRadius: i % 2 === 0 ? '50%' : '2px',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -300],
                            rotate: [0, 360],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">

                {/* Visual Reveal Anchor */}
                <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 15, stiffness: 100 }}
                    className="mb-16 relative"
                >
                    <div className="relative p-14 bg-white rounded-[4rem] border-4 border-pink-50 shadow-[0_30px_70px_rgba(251,113,133,0.2)] isolate overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-amber-50" />
                        <Gift size={100} className="text-pink-400 drop-shadow-[0_10px_20px_rgba(251,113,133,0.3)] relative z-10" />

                        <motion.div
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-4 -right-4 text-4xl"
                        >
                            🎉
                        </motion.div>
                    </div>
                </motion.div>

                {/* Loading Typography Section */}
                <div className="space-y-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-white px-10 py-3 rounded-full border border-pink-100 shadow-sm"
                    >
                        <Sparkles size={16} className="text-amber-400 animate-pulse fill-current" />
                        <span className="text-[#5e2d63] font-black uppercase tracking-[0.6em] text-[10px]">Unwrapping Your Special Day</span>
                    </motion.div>

                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-8xl font-black text-[#5e2d63] font-romantic leading-tight drop-shadow-sm"
                        >
                            A Magical Journey Begins
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-pink-400/80 text-xl md:text-2xl font-black uppercase tracking-[0.4em]"
                        >
                            {defaultData.subtext}
                        </motion.p>
                    </div>
                </div>

                {/* Hyper-Realistic Progress Indicator */}
                <div className="relative w-80 h-4 bg-white rounded-full overflow-hidden border-2 border-pink-50 p-1 shadow-inner">
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className="h-full bg-gradient-to-r from-pink-400 via-amber-300 to-rose-400 rounded-full shadow-[0_0_15px_rgba(251,113,133,0.4)]"
                    />
                </div>

                <div className="mt-16 flex gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
                    <div className="flex items-center gap-2 flex-col">
                        <span className="text-pink-400 opacity-40">Mood</span>
                        <span>Celebratory</span>
                    </div>
                    <div className="flex items-center gap-2 flex-col">
                        <span className="text-amber-400 opacity-40">Aura</span>
                        <span>Pure Happiness</span>
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />
        </div>
    );
};

export default Page1Loading;
