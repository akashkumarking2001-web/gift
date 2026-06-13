import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Film, FilmIcon } from 'lucide-react';

const Page2Cinema = ({ data, onNext }: any) => {
    useEffect(() => {
        const timer = setTimeout(onNext, 4000);
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <div className="relative min-h-screen bg-black flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* AMBIENT CINESCOPE BARS */}
            <div className="absolute top-0 inset-x-0 h-24 bg-black z-30" />
            <div className="absolute bottom-0 inset-x-0 h-24 bg-black z-30" />

            {/* Grain Overlay */}
            <div className="absolute inset-0 z-10 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

            <div className="relative z-20 text-center space-y-12 max-w-2xl">
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "circIn" }}
                    className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />

                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-white/20 flex justify-center mb-8"
                    >
                        <Film size={64} strokeWidth={1} />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="text-white text-5xl md:text-8xl font-black font-romantic tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        {data.cinemaHeading || "Our Cinematic Journey"}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 2.5 }}
                        className="text-white uppercase tracking-[1em] text-[10px] font-black"
                    >
                        Loading Archive
                    </motion.p>
                </div>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.5, ease: "circIn", delay: 0.5 }}
                    className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
            </div>

            {/* LIGHT LEAK VIBE */}
            <motion.div
                animate={{
                    x: ['-50%', '50%', '-50%'],
                    opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full"
            />

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

export default Page2Cinema;
