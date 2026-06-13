import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, Heart, ShieldCheck, ChevronRight, Sparkles, Watch } from 'lucide-react';

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
        heading: data.heading || "Every Second is a Choice to Stay"
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

    const TimeUnit = ({ value, label, delay }: { value: number, label: string, delay: number }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8 }}
            className="group relative flex flex-col items-center bg-white/5 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-2xl transition-all hover:bg-white/10"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent rounded-[3rem]" />
            <motion.div
                key={value}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl md:text-8xl font-black text-amber-500 font-romantic leading-none drop-shadow-[0_10px_30px_rgba(245,158,11,0.3)]"
            >
                {value.toString().padStart(2, '0')}
            </motion.div>
            <div className="flex items-center gap-2 mt-6">
                <span className="h-[1px] w-4 bg-amber-500/30" />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.5em] text-white/40">{label}</span>
                <span className="h-[1px] w-4 bg-amber-500/30" />
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#080706] flex flex-col items-center justify-center p-8 font-outfit">

            {/* Hyper-Realistic Gilded Atmospehre */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(180,130,50,0.1),transparent_70%)]" />
                <div className="absolute inset-0 bg-[#080706]/60 backdrop-blur-[100px]" />

                {/* Floating Gilded Numbers */}
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-[20rem] font-black text-amber-900/5 select-none"
                        style={{ left: `${i * 20}%`, top: `${Math.random() * 80}%` }}
                        animate={{ y: [0, -50, 0] }}
                        transition={{ duration: 10 + i, repeat: Infinity }}
                    >
                        {i + 1}
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center space-y-16">

                {/* Visual Anchor */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl px-10 py-3 rounded-full border border-white/10"
                >
                    <Watch size={16} className="text-amber-500" />
                    <span className="text-amber-100/50 font-black uppercase tracking-[0.6em] text-[10px]">The Pulse of Forever</span>
                    <Heart size={16} fill="#f43f5e" className="text-rose-500 animate-pulse" />
                </motion.div>

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <h2 className="text-4xl md:text-7xl font-black text-white font-romantic leading-[1.1] drop-shadow-2xl">
                        {defaultData.heading}
                    </h2>
                    <div className="h-1 w-40 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-8 opacity-30" />
                </motion.div>

                {/* HIGH-DENSITY COUNTER GRID */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 w-full">
                    <TimeUnit value={timeElapsed.years} label="Years" delay={0.2} />
                    <TimeUnit value={timeElapsed.days} label="Days" delay={0.3} />
                    <TimeUnit value={timeElapsed.hours} label="Hours" delay={0.4} />
                    <TimeUnit value={timeElapsed.minutes} label="Min" delay={0.5} />
                    <TimeUnit value={timeElapsed.seconds} label="Sec" delay={0.6} />
                </div>

                {/* Pro Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col items-center gap-10"
                >
                    {isEditing && (
                        <button
                            onClick={() => {
                                const date = prompt("Enter Start Date (YYYY-MM-DD):", defaultData.startDate.split('T')[0]);
                                if (date) onUpdate?.('startDate', new Date(date).toISOString());
                            }}
                            className="px-12 py-5 bg-white/5 border border-white/10 rounded-3xl text-amber-100/40 font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-3"
                        >
                            <Calendar size={14} /> Adjust The Beginning
                        </button>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="group relative px-20 py-8 bg-white text-[#0a0805] font-black text-xs uppercase tracking-[0.6em] rounded-[3rem] transition-all flex items-center gap-6 shadow-[0_40px_100px_rgba(255,255,255,0.15)] isolate"
                    >
                        <div className="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
                        <span className="relative z-10 text-amber-900">Explore The Roadmap</span>
                        <ChevronRight className="relative z-10 w-6 h-6 border-2 border-amber-900 rounded-full p-0.5 group-hover:translate-x-3 transition-transform" />
                    </motion.button>
                </motion.div>

            </div>

            {/* Background Texture Detail */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
    );
};

export default Page2Counter;
