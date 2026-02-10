import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Page2CounterProps {
    data: {
        startDate?: string;
        heading?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Counter = ({ data, onNext, isEditing = false, onUpdate }: Page2CounterProps) => {
    const [timeElapsed, setTimeElapsed] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

    const defaultData = {
        startDate: data.startDate || "2023-01-01T00:00:00Z",
        heading: data.heading || "We've been together for..."
    };

    useEffect(() => {
        const updateCounter = () => {
            const now = new Date().getTime();
            const start = new Date(defaultData.startDate).getTime();
            const diff = now - start;

            if (diff > 0) {
                const totalSeconds = Math.floor(diff / 1000);
                const totalMinutes = Math.floor(totalSeconds / 60);
                const totalHours = Math.floor(totalMinutes / 60);
                const totalDays = Math.floor(totalHours / 24);

                setTimeElapsed({
                    years: Math.floor(totalDays / 365),
                    days: totalDays % 365,
                    hours: totalHours % 24,
                    minutes: totalMinutes % 60,
                    seconds: totalSeconds % 60
                });
            }
        };

        const timer = setInterval(updateCounter, 1000);
        updateCounter();
        return () => clearInterval(timer);
    }, [defaultData.startDate]);

    const TimeUnit = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center">
            <motion.div
                key={value}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-7xl font-black text-amber-500 font-lovely tracking-tighter"
            >
                {value}
            </motion.div>
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/30 mt-2">{label}</span>
        </div>
    );

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0805] flex flex-col items-center justify-center p-8">
            {/* Elegant Background Accents */}
            <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-amber-900/10 to-transparent" />

            <div className="relative z-10 w-full max-w-5xl text-center">
                {/* Heading */}
                <div
                    className={`mb-20 relative group inline-block ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-3 rounded-2xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Heading:", defaultData.heading);
                            if (val !== null) onUpdate?.('heading', val);
                        }
                    }}
                >
                    <h2 className="text-xl md:text-3xl font-black text-white/60 uppercase tracking-[0.5em] font-lovely">
                        {defaultData.heading}
                    </h2>
                    {isEditing && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click to Edit Heading</span>
                        </div>
                    )}
                </div>

                {/* Counter Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4 mb-24">
                    <TimeUnit value={timeElapsed.years} label="Years" />
                    <TimeUnit value={timeElapsed.days} label="Days" />
                    <TimeUnit value={timeElapsed.hours} label="Hours" />
                    <TimeUnit value={timeElapsed.minutes} label="Min" />
                    <TimeUnit value={timeElapsed.seconds} label="Sec" />
                </div>

                {/* Edit Date Action (Editor Only) */}
                {isEditing && (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            const date = prompt("Enter Start Date (YYYY-MM-DD):", defaultData.startDate.split('T')[0]);
                            if (date) onUpdate?.('startDate', new Date(date).toISOString());
                        }}
                        className="px-10 py-4 bg-amber-600/10 border border-amber-500/30 text-amber-500 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-amber-600/20 transition-all"
                    >
                        Adjust Start Date
                    </motion.button>
                )}

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onNext}
                    className="mt-24 text-white/20 hover:text-white transition-all uppercase font-black text-[10px] tracking-[0.8em]"
                >
                    Our History →
                </motion.button>
            </div>

            {/* Subtle background particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-amber-500 rounded-full opacity-10"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [-20, -100],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    );
};

export default Page2Counter;
