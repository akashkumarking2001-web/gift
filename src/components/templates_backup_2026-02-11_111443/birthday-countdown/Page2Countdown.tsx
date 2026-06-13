import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Cake, Calendar, Clock, ChevronRight, Gift, Sparkles } from 'lucide-react';

interface Page2CountdownProps {
    data: {
        targetDate?: string;
        heading?: string;
        subheading?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Countdown = ({ data, onNext, isEditing = false, onUpdate }: Page2CountdownProps) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const defaultData = {
        targetDate: data.targetDate || new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7).toISOString(),
        heading: data.heading || "The Grand Countdown",
        subheading: data.subheading || "Every second brings us closer to your magic."
    };

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date().getTime();
            const target = new Date(defaultData.targetDate).getTime();
            const difference = target - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                if (!isEditing) onNext();
            }
        };

        const timer = setInterval(calculateTime, 1000);
        calculateTime();

        return () => clearInterval(timer);
    }, [defaultData.targetDate, onNext, isEditing]);

    const TimeUnit = ({ value, label, delay }: { value: number, label: string, delay: number }) => (
        <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay, duration: 0.8 }}
            className="group relative flex flex-col items-center"
        >
            <div className="w-24 h-32 md:w-44 md:h-56 bg-white/[0.03] backdrop-blur-3xl border-2 border-white/5 rounded-[3rem] flex items-center justify-center mb-6 relative overflow-hidden shadow-2xl transition-all group-hover:bg-white/[0.08] group-hover:border-pink-500/30">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <AnimatePresence mode="wait">
                    <motion.span
                        key={value}
                        initial={{ y: 20, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -20, opacity: 0, filter: 'blur(10px)' }}
                        className="text-5xl md:text-9xl font-black text-white font-romantic leading-none drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
                    >
                        {String(value).padStart(2, '0')}
                    </motion.span>
                </AnimatePresence>

                {/* Internal Decorative Ring */}
                <div className="absolute inset-4 border border-white/5 rounded-[2.5rem] pointer-events-none" />
            </div>

            <div className="flex items-center gap-3">
                <div className="h-[1px] w-4 bg-pink-500/30" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.6em] text-pink-100/40">{label}</span>
                <div className="h-[1px] w-4 bg-pink-500/30" />
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#05050a] flex flex-col items-center justify-center p-8 font-outfit">

            {/* Hyper-Realistic Environment */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-0 right-0 w-full h-[60%] bg-[radial-gradient(circle_at_top_right,rgba(236,72,153,0.1),transparent_60%)]" />
                <div className="absolute inset-0 bg-[#05050a]/60 backdrop-blur-[100px]" />

                {/* Floating Confetti Shapes (Subtle/Dark) */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-500/5 select-none"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -40, 0],
                            rotate: 360
                        }}
                        transition={{ duration: 10 + i, repeat: Infinity }}
                    >
                        <Sparkles size={Math.random() * 100 + 50} />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center space-y-20">

                {/* Visual Anchor */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl px-10 py-3 rounded-full border border-white/10"
                >
                    <Clock size={16} className="text-pink-400" />
                    <span className="text-pink-100/50 font-black uppercase tracking-[0.6em] text-[10px]">Temporal Alignment</span>
                    <Gift size={16} className="text-pink-400 fill-current opacity-30" />
                </motion.div>

                {/* Heading & Subheading */}
                <div className="text-center space-y-8">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-9xl font-black text-white font-romantic leading-[1.1] drop-shadow-2xl"
                    >
                        {defaultData.heading}
                    </motion.h2>
                    <p className="text-pink-100/40 text-xl md:text-2xl font-lovely italic max-w-2xl mx-auto leading-relaxed">
                        "{defaultData.subheading}"
                    </p>
                </div>

                {/* HIGH-PRECISION COUNTDOWN GRID */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 w-full max-w-6xl">
                    <TimeUnit value={timeLeft.days} label="Days" delay={0.2} />
                    <TimeUnit value={timeLeft.hours} label="Hours" delay={0.3} />
                    <TimeUnit value={timeLeft.minutes} label="Min" delay={0.4} />
                    <TimeUnit value={timeLeft.seconds} label="Sec" delay={0.5} />
                </div>

                {/* Pro Navigation Area */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col items-center gap-12 pt-10"
                >
                    {isEditing && (
                        <button
                            onClick={() => {
                                const date = prompt("Enter Target Date (YYYY-MM-DD HH:MM):", defaultData.targetDate);
                                if (date) onUpdate?.('targetDate', new Date(date).toISOString());
                            }}
                            className="px-12 py-5 bg-white/5 border border-white/10 rounded-3xl text-pink-400 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3"
                        >
                            <Calendar size={14} /> Adjust Horizon Point
                        </button>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="group relative px-24 py-8 bg-white text-[#050510] font-black text-xs uppercase tracking-[0.7em] rounded-[3rem] transition-all flex items-center gap-6 shadow-[0_40px_100px_rgba(255,255,255,0.15)] isolate"
                    >
                        <div className="absolute inset-0 bg-pink-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
                        <span className="relative z-10 text-pink-900">Initiate Celebration</span>
                        <ChevronRight className="relative z-10 w-6 h-6 border-2 border-pink-900 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                    </motion.button>
                </motion.div>

            </div>

            {/* Glass Background Shapes */}
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-[30rem] h-[30rem] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none" />

        </div>
    );
};

export default Page2Countdown;
