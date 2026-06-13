import { motion } from 'framer-motion';
import { Star, Heart, Sparkles, ChevronRight, Share2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const LP5Celebrate = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    useEffect(() => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#f59e0b', '#dc2626', '#ffffff'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#f59e0b', '#dc2626', '#ffffff'] });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const heading = data.celebrationHeading || "Infinite Joy Unlocked";
    const subtext = data.celebrationSubtext || "You've made me the happiest person in the universe. Our forever starts now.";

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#2b0303] flex flex-col items-center justify-center p-8 font-serif select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#450a0a_0%,transparent_70%)] opacity-40" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-4xl bg-[#450a0a]/40 backdrop-blur-3xl rounded-[4rem] p-12 md:p-24 border-4 border-amber-600/30 text-center space-y-12 shadow-[0_60px_150px_rgba(0,0,0,0.8)]"
            >
                {/* Celebration Icon */}
                <div className="relative inline-block">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-[-40px] border-[1px] border-dashed border-amber-500/20 rounded-full"
                    />

                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-16 bg-amber-600 rounded-[3rem] shadow-[0_0_80px_rgba(245,158,11,0.5)] border-4 border-amber-400 relative z-10"
                    >
                        <Sparkles size={80} className="text-black" />
                    </motion.div>
                </div>

                <div className="space-y-8">
                    <h2
                        className="text-4xl md:text-[8rem] font-black text-white font-romantic leading-tight uppercase tracking-tighter cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Heading:", heading);
                                if (val) onUpdate?.('celebrationHeading', val);
                            }
                        }}
                    >
                        {heading}
                    </h2>
                    <div className="h-[2px] w-24 bg-amber-500/20 mx-auto" />
                    <p
                        className="text-amber-100/40 text-xl md:text-3xl font-black uppercase tracking-[0.1em] italic leading-relaxed cursor-pointer px-4"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Subtext:", subtext);
                                if (val) onUpdate?.('celebrationSubtext', val);
                            }
                        }}
                    >
                        "{subtext}"
                    </p>
                </div>

                <div className="pt-12 flex flex-col gap-10">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-24 py-8 bg-white text-black font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl transition-all"
                    >
                        The Eternal Vow
                    </motion.button>
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

export default LP5Celebrate;
