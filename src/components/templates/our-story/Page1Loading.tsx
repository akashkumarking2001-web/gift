import { motion } from 'framer-motion';
import { Cloud, Wind, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

const Page1Loading = ({ data, onNext }: any) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(timer);
                    setTimeout(onNext, 1200);
                    return 100;
                }
                return p + Math.random() * 10;
            });
        }, 300);
        return () => clearInterval(timer);
    }, [onNext]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#faf7f2] flex flex-col items-center justify-center p-8 font-serif select-none isolate">

            {/* Ghibli Ambient Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_100%,#fdf2f8_0%,transparent_50%)]" />
                <motion.div
                    animate={{ x: [-100, 100] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-0 text-white/40"
                >
                    <Cloud size={120} />
                </motion.div>
                <motion.div
                    animate={{ x: [100, -100] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-1/4 right-0 text-white/40"
                >
                    <Cloud size={150} />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg text-center space-y-12"
            >
                {/* Hand-drawn Sketch Effect Icon */}
                <div className="relative inline-block">
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-10 bg-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.05)] border-4 border-[#e5e7eb]"
                    >
                        <Wind size={60} className="text-[#94a3b8]" />
                    </motion.div>
                    <div className="absolute -top-4 -right-4 bg-rose-400 p-4 rounded-full shadow-lg text-white">
                        <Heart size={20} fill="currentColor" />
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-3xl md:text-5xl font-black text-[#1e293b] font-serif tracking-tight">
                        Opening Our Storybook...
                    </h2>
                    <p className="text-[#64748b] text-sm md:text-base font-medium italic">
                        {data.subtext || "Tracing back the lines of our beautiful journey."}
                    </p>
                </div>

                {/* Watercolor Progress Bar */}
                <div className="relative h-4 w-full bg-white rounded-full overflow-hidden shadow-inner border border-[#f1f5f9]">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200"
                    />
                    {/* Pencil Texture Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] pointer-events-none" />
                </div>

                <div className="text-[10px] uppercase tracking-[0.4em] text-[#94a3b8] font-black">
                    Page Verification: {Math.round(progress)}%
                </div>
            </motion.div>
        </div>
    );
};

export default Page1Loading;
