import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Cake } from 'lucide-react';

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
        heading: data.heading || "Birthday Countdown",
        subheading: data.subheading || "The magical moment approaches..."
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

    const TimeUnit = ({ value, label }: { value: number, label: string }) => (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center"
        >
            <div className="w-20 h-24 md:w-32 md:h-40 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <AnimatePresence mode="wait">
                    <motion.span
                        key={value}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="text-4xl md:text-7xl font-black text-white font-lovely"
                    >
                        {String(value).padStart(2, '0')}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-pink-500/60">{label}</span>
        </motion.div>
    );

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0a0f] flex flex-col items-center justify-center p-8">
            {/* Background Accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/5 blur-[120px] rounded-full" />

            <div className="relative z-10 w-full max-w-4xl text-center">
                {/* Heading */}
                <div
                    className={`mb-4 relative group inline-flex items-center gap-4 ${isEditing ? 'cursor-pointer hover:bg-white/5 px-6 py-2 rounded-2xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Heading:", defaultData.heading);
                            if (val !== null) onUpdate?.('heading', val);
                        }
                    }}
                >
                    <Cake className="text-pink-500 w-8 h-8 md:w-12 md:h-12" />
                    <h2 className="text-4xl md:text-7xl font-black text-white font-lovely tracking-tight">
                        {defaultData.heading}
                    </h2>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click to Edit Heading</span>
                        </div>
                    )}
                </div>

                {/* Subheading */}
                <div
                    className={`mb-20 relative group ${isEditing ? 'cursor-pointer hover:bg-white/5 px-6 py-2 rounded-2xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Subheading:", defaultData.subheading);
                            if (val !== null) onUpdate?.('subheading', val);
                        }
                    }}
                >
                    <p className="text-lg md:text-2xl text-white/40 font-medium tracking-wide italic">
                        {defaultData.subheading}
                    </p>
                    {isEditing && (
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click to Edit Subheading</span>
                        </div>
                    )}
                </div>

                {/* Countdown Grid */}
                <div className="flex justify-center gap-4 md:gap-8">
                    <TimeUnit value={timeLeft.days} label="Days" />
                    <TimeUnit value={timeLeft.hours} label="Hours" />
                    <TimeUnit value={timeLeft.minutes} label="Min" />
                    <TimeUnit value={timeLeft.seconds} label="Sec" />
                </div>

                {/* Edit Date Button (Only in Editing Mode) */}
                {isEditing && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            const date = prompt("Enter Target Date (YYYY-MM-DD HH:MM):", defaultData.targetDate);
                            if (date) onUpdate?.('targetDate', new Date(date).toISOString());
                        }}
                        className="mt-16 px-8 py-3 bg-pink-600/20 border border-pink-500/30 text-pink-500 rounded-full font-black text-[10px] uppercase tracking-widest"
                    >
                        Adjust Target Date
                    </motion.button>
                )}

                {/* Next Button (Visible only if editing or countdown done) */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onNext}
                    className="mt-20 text-white/20 hover:text-white transition-all uppercase font-black text-[10px] tracking-[0.5em]"
                >
                    View Celebration →
                </motion.button>
            </div>
        </div>
    );
};

export default Page2Countdown;
