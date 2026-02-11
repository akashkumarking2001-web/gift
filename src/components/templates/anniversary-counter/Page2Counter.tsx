import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, Heart, Sparkles, ChevronRight, Watch, Clock } from 'lucide-react';

const Page2Counter = ({ data, onNext }: any) => {
    const [stats, setStats] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const startDate = new Date(data.startDate || "2023-01-01");

        const update = () => {
            const now = new Date();
            const diff = now.getTime() - startDate.getTime();

            setStats({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((diff % (1000 * 60)) / 1000)
            });
        };

        const timer = setInterval(update, 1000);
        update();
        return () => clearInterval(timer);
    }, [data.startDate]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-center p-8 font-outfit select-none isolate">

            {/* AMBIENT CELESTIAL TRACK */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border-[1px] border-amber-900 rounded-full"
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-16">

                {/* Visual Label */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex items-center gap-4 bg-white px-10 py-4 rounded-full border border-amber-100 shadow-xl"
                >
                    <Clock size={20} className="text-amber-500 animate-spin-slow" />
                    <span className="text-[#451a03] font-black uppercase tracking-[0.6em] text-[10px]">The Chronometer of Love</span>
                </motion.div>

                {/* MAIN COUNTER */}
                <div className="relative text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative inline-block"
                    >
                        <h2 className="text-[12rem] md:text-[22rem] font-black text-amber-900/10 font-romantic leading-none select-none">
                            {stats.days}
                        </h2>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span
                                key={stats.days}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-7xl md:text-[14rem] font-black text-[#451a03] font-romantic drop-shadow-[0_20px_40px_rgba(69,26,3,0.2)]"
                            >
                                {stats.days}
                            </motion.span>
                            <span className="text-amber-600 font-black uppercase tracking-[1em] text-[10px] md:text-xs">Beautiful Days</span>
                        </div>
                    </motion.div>
                </div>

                {/* TIME SUB-STATIONS */}
                <div className="grid grid-cols-3 gap-8 md:gap-16 w-full max-w-3xl">
                    {[
                        { label: 'Hours', value: stats.hours },
                        { label: 'Minutes', value: stats.minutes },
                        { label: 'Seconds', value: stats.seconds }
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="bg-white border border-amber-50 rounded-3xl p-8 flex flex-col items-center gap-2 shadow-lg"
                        >
                            <span className="text-2xl md:text-5xl font-black text-[#451a03] font-romantic">{item.value.toString().padStart(2, '0')}</span>
                            <div className="h-0.5 w-6 bg-amber-100" />
                            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-amber-500/60">{item.label}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="mt-12 flex flex-col items-center gap-4 group"
                >
                    <div className="w-16 h-16 rounded-full border border-amber-100 flex items-center justify-center group-hover:bg-amber-50 transition-colors">
                        <ChevronRight className="text-amber-500 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.6em] text-amber-400">View Our Legacy</span>
                </motion.button>
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

export default Page2Counter;
