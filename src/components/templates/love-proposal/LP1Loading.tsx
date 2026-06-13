import { motion } from 'framer-motion';
import { Heart, Sparkles, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

const LP1Loading = ({ data, onNext }: any) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(p => {
                if (p >= 100) {
                    clearInterval(timer);
                    setTimeout(onNext, 1200);
                    return 100;
                }
                return p + Math.random() * 12;
            });
        }, 250);
        return () => clearInterval(timer);
    }, [onNext]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#2b0303] flex flex-col items-center justify-center p-8 font-serif select-none isolate">

            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#450a0a_0%,transparent_70%)] opacity-60" />
                <div className="absolute inset-0 bg-[#000]/20" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-lg text-center space-y-16"
            >
                {/* Visual Label */}
                <div className="relative inline-block">
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-12 bg-[#450a0a] rounded-full shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-4 border-amber-600/30"
                    >
                        <Heart size={80} fill="#dc2626" className="text-[#dc2626] drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
                    </motion.div>
                    <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-4 -right-4 text-amber-500"
                    >
                        <Sparkles size={44} />
                    </motion.div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black text-amber-500 font-romantic leading-tight uppercase tracking-tighter">
                        Raising the Curtain...
                    </h2>
                    <p className="text-amber-100/40 text-sm md:text-base font-black uppercase tracking-[0.4em]">
                        {data.subtext || "Preparing a story of eternal devotion."}
                    </p>
                </div>

                {/* Royal Progress Bar */}
                <div className="relative h-6 w-full bg-[#1a0101] rounded-full overflow-hidden shadow-2xl border border-amber-600/20 p-1">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-amber-700 rounded-full"
                    />
                </div>

                <div className="text-[10px] uppercase tracking-[0.6em] text-amber-600/60 font-black">
                    Initialization Status: {Math.round(progress)}%
                </div>
            </motion.div>

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

export default LP1Loading;
