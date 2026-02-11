import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, Heart, ShieldCheck, ChevronRight, Sparkles, Watch, Info } from 'lucide-react';

interface Page2CounterProps {
    data: {
        startDate?: string;
        heading?: string;
        subtext?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Counter = ({ data, onNext, isEditing = false, onUpdate }: Page2CounterProps) => {
    const [timeElapsed, setTimeElapsed] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 });

    const defaultData = {
        startDate: data.startDate || "2023-01-01T00:00:00Z",
        heading: data.heading || "Our Beautiful Journey Together",
        subtext: data.subtext || "Every moment with you is a blessing"
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
                    seconds: totalSeconds % 60,
                    totalDays: totalDays
                });
            }
        };

        const timer = setInterval(updateCounter, 1000);
        updateCounter();
        return () => clearInterval(timer);
    }, [defaultData.startDate]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfd] flex flex-col items-center justify-start py-20 px-8 font-outfit select-none">

            {/* PASTEL BACKGROUND PATTERN */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="light-hearts" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                            <text x="10" y="40" fontSize="30" fill="#fee2e2" className="opacity-40">💕</text>
                            <text x="50" y="20" fontSize="15" fill="#fee2e2" className="opacity-20">💖</text>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#light-hearts)" />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-24 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 mb-6"
                    >
                        <Heart size={24} fill="#f43f5e" className="text-rose-500 animate-pulse" />
                        <h2 className="text-pink-600 text-5xl md:text-7xl font-black font-romantic tracking-tight">
                            Happy Anniversary!
                        </h2>
                        <Heart size={24} fill="#f43f5e" className="text-rose-500 animate-pulse" />
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-pink-400 font-black uppercase tracking-[0.5em] text-[10px]"
                    >
                        {defaultData.subtext}
                    </motion.p>
                </div>

                {/* MAIN CARDS GRID */}
                <div className="w-full relative">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="bg-white border-2 border-pink-100 rounded-[3.5rem] p-10 md:p-20 shadow-[0_40px_120px_-30px_rgba(244,63,94,0.15)] text-center relative overflow-hidden"
                    >
                        {/* Decorative Corner Icons (matching Frame 20) */}
                        <div className="absolute top-8 left-8 text-4xl transform -rotate-12 animate-bounce">🎊</div>
                        <div className="absolute top-8 right-8 text-4xl transform rotate-12 animate-pulse">💝</div>
                        <div className="absolute bottom-8 right-8 text-4xl animate-bounce" style={{ animationDelay: '0.5s' }}>💖</div>
                        <div className="absolute bottom-8 left-8 text-2xl animate-pulse">📷</div>

                        <div className="space-y-12">
                            <h3 className="text-[#5e2d63] text-2xl md:text-4xl font-black font-romantic opacity-70">
                                {defaultData.heading}
                            </h3>

                            <div className="space-y-2">
                                <motion.div
                                    key={timeElapsed.totalDays}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-8xl md:text-[12rem] font-black text-pink-500 leading-none drop-shadow-[0_15px_45px_rgba(244,63,94,0.2)] font-romantic"
                                >
                                    {timeElapsed.totalDays}
                                </motion.div>
                                <p className="text-pink-400 text-xl md:text-3xl font-black uppercase tracking-[0.4em]">
                                    Beautiful Days Together
                                </p>
                            </div>

                            <div className="h-0.5 w-32 bg-pink-100 mx-auto" />

                            <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed italic">
                                "Every single day has been a blessing. From our first hello to today, each moment with you has been magical. Here's to countless more days filled with love, laughter, and beautiful memories!"
                            </p>
                        </div>
                    </motion.div>

                    {/* Secondary Detail Cards (Horizontal layout) */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full">
                        {[
                            { label: 'Years', value: timeElapsed.years, icon: '🗓️' },
                            { label: 'Hours', value: timeElapsed.hours, icon: '⌚' },
                            { label: 'Minutes', value: timeElapsed.minutes, icon: '⏰' },
                            { label: 'Seconds', value: timeElapsed.seconds, icon: '⚡' }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                                className="bg-white/80 backdrop-blur-xl border-2 border-pink-50 rounded-[2rem] p-6 text-center shadow-lg"
                            >
                                <div className="text-2xl mb-2">{stat.icon}</div>
                                <div className="text-4xl font-black text-pink-600 font-romantic leading-tight">{stat.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-300 mt-1">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-20 flex flex-col items-center gap-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-16 py-6 bg-pink-500 hover:bg-pink-600 text-white font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl flex items-center gap-4 transition-all"
                    >
                        Our Precious Moments <ChevronRight size={18} />
                    </motion.button>

                    {isEditing && (
                        <button
                            onClick={() => {
                                const val = prompt("Enter Start Date (YYYY-MM-DD):", defaultData.startDate.split('T')[0]);
                                if (val) onUpdate?.('startDate', new Date(val).toISOString());
                            }}
                            className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-pink-400 transition-colors flex items-center gap-2"
                        >
                            <Calendar size={14} /> Edit Start Date
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
            `}} />
        </div>
    );
};

export default Page2Counter;
