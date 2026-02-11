import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, Heart, ShieldCheck, ChevronRight, Sparkles, Watch, Camera } from 'lucide-react';

interface Page2CountdownProps {
    data: {
        targetDate?: string;
        heading?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Countdown = ({ data, onNext, isEditing = false, onUpdate }: Page2CountdownProps) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const defaultData = {
        targetDate: data.targetDate || "2024-12-31T23:59:59Z",
        heading: data.heading || "The Big Surprise is Coming!"
    };

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const target = new Date(defaultData.targetDate).getTime();
            const diff = target - now;

            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000)
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        const timer = setInterval(updateCountdown, 1000);
        updateCountdown();
        return () => clearInterval(timer);
    }, [defaultData.targetDate]);

    const TimeUnit = ({ value, label, delay }: { value: number, label: string, delay: number }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8 }}
            className="group relative flex flex-col items-center bg-white border-2 border-pink-50 rounded-[3rem] p-10 md:p-14 shadow-xl transition-all hover:bg-pink-50"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent rounded-[3rem]" />
            <motion.div
                key={value}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-6xl md:text-[10rem] font-black text-pink-500 font-romantic leading-none relative z-10 drop-shadow-[0_10px_30px_rgba(251,113,133,0.3)]"
            >
                {value.toString().padStart(2, '0')}
            </motion.div>
            <div className="flex items-center gap-2 mt-8 z-10">
                <span className="h-[2px] w-6 bg-pink-100" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-pink-400">{label}</span>
                <span className="h-[2px] w-6 bg-pink-100" />
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-center p-8 font-outfit select-none isolate">

            {/* AMBIENT CELEBRATION ELEMENTS */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 p-20 text-[20rem] opacity-[0.03] rotate-12 font-black">PARTY</div>
                <div className="absolute bottom-0 left-0 p-20 text-[20rem] opacity-[0.03] -rotate-12 font-black">TIME</div>

                {/* Floating Bubbles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-4 h-4 rounded-full border border-pink-100 opacity-30"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -200, 0], scale: [1, 1.5, 1] }}
                        transition={{ duration: 10 + i, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center space-y-16">

                {/* Visual Label */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-4 bg-white px-10 py-4 rounded-full border border-pink-100 shadow-lg"
                >
                    <Watch size={20} className="text-pink-500 animate-spin-slow" />
                    <span className="text-[#5e2d63] font-black uppercase tracking-[0.6em] text-[10px]">Countdown to Magic</span>
                </motion.div>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-8xl font-black text-[#5e2d63] font-romantic leading-[1.1] drop-shadow-sm">
                        {defaultData.heading}
                    </h2>
                </motion.div>

                {/* HIGH-DENSITY COUNTER GRID */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full">
                    <TimeUnit value={timeLeft.days} label="Days" delay={0.2} />
                    <TimeUnit value={timeLeft.hours} label="Hours" delay={0.3} />
                    <TimeUnit value={timeLeft.minutes} label="Min" delay={0.4} />
                    <TimeUnit value={timeLeft.seconds} label="Sec" delay={0.5} />
                </div>

                {/* Pro Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col items-center gap-10"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5, boxShadow: "0 40px 100px rgba(251,113,133,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="group relative px-24 py-8 bg-pink-500 text-white font-black text-xs uppercase tracking-[0.6em] rounded-full transition-all flex items-center gap-6 shadow-2xl overflow-hidden"
                    >
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/10 to-transparent" />
                        <span className="relative z-10">Unwrap The Party</span>
                        <ChevronRight className="relative z-10 w-6 h-6 border-2 border-white rounded-full p-0.5 group-hover:translate-x-3 transition-transform" />
                    </motion.button>

                    {isEditing && (
                        <button
                            onClick={() => {
                                const val = prompt("Enter Target Date (YYYY-MM-DD):", defaultData.targetDate.split('T')[0]);
                                if (val) onUpdate?.('targetDate', new Date(val).toISOString());
                            }}
                            className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-pink-400 transition-colors flex items-center gap-2"
                        >
                            <Calendar size={14} /> Adjust The Date
                        </button>
                    )}
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
                .animate-spin-slow {
                    animation: spin 10s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
};

export default Page2Countdown;
