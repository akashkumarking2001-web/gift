import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, Star } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

const Page3Celebration = ({ data, onNext }: any) => {
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
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#ff0000', '#ffffff', '#ffd700'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#ff0000', '#ffffff', '#ffd700'] });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#8b0000] flex flex-col items-center justify-center p-8 text-center font-outfit select-none isolate">

            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,#b22222_0%,#8b0000_70%,#4a0000_100%)]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-3xl rounded-[4rem] border border-white/20 p-12 md:p-24 shadow-[0_60px_150px_-30px_rgba(0,0,0,0.5)] overflow-hidden"
            >
                <div className="space-y-12">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="mb-12 inline-block"
                    >
                        <div className="p-10 bg-rose-50 rounded-[3rem] shadow-inner relative z-10 transition-transform hover:scale-110">
                            <Heart size={60} fill="#f43f5e" className="text-rose-500 drop-shadow-[0_10px_20px_rgba(244,63,94,0.3)]" />
                        </div>
                        <Star className="absolute -top-4 -right-4 text-amber-400 fill-current animate-pulse shadow-2xl" size={40} />
                    </motion.div>

                    <h1 className="text-5xl md:text-[8rem] font-black text-white font-romantic leading-tight">
                        {data.mainText || "YAYYY! ❤️"}
                    </h1>

                    <p className="text-rose-100 text-2xl md:text-3xl font-medium max-w-2xl mx-auto leading-relaxed italic">
                        "You just made me the happiest person in the world!"
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-20 py-8 bg-white text-rose-900 font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl flex items-center gap-4 mx-auto mt-16 group transition-all"
                    >
                        <span>A message for you</span>
                        <ChevronRight className="group-hover:translate-x-2 transition-transform" />
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

export default Page3Celebration;
