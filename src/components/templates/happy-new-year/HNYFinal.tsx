import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Snowflake, Heart, Star, Sparkles, RotateCcw } from 'lucide-react';

const HNYFinal = ({ data }: any) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-[#1a0b2e] to-[#09050f] flex flex-col items-center justify-center p-6 font-outfit overflow-hidden isolate select-none">

            {/* SNOWFLAKE DECORATIONS */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-white/10"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, 100, 0],
                            rotate: 360,
                            opacity: [0.1, 0.3, 0.1]
                        }}
                        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
                    >
                        <Snowflake size={Math.random() * 20 + 10} />
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-sm perspective-[2000px]"
            >
                {/* 3D GREETING CARD */}
                <motion.div
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="relative w-full h-[550px] cursor-pointer"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ rotateY: isFlipped ? -180 : 0 }}
                    transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                >
                    {/* Front Face */}
                    <div
                        className="absolute inset-0 bg-[#fdfaff] rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/20 p-8 flex flex-col items-center justify-between backface-hidden z-20"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <div className="flex flex-col items-center gap-4 pt-10">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-48 h-48 bg-purple-50 rounded-full flex items-center justify-center p-4 relative"
                            >
                                {/* Placeholder for Snowman/Bear Visuals */}
                                <div className="text-8xl">⛄</div>
                                <div className="absolute -bottom-4 -right-4 text-6xl">🧸</div>
                                <div className="absolute top-0 right-0 animate-pulse text-yellow-400">
                                    <Sparkles size={40} fill="currentColor" />
                                </div>
                            </motion.div>

                            <h2 className="text-4xl font-black text-purple-900 font-romantic tracking-tighter text-center mt-6">
                                HAPPY NEW YEAR <br /> 2026
                            </h2>
                        </div>

                        <div className="w-full flex flex-col items-center gap-6 pb-10">
                            <div className="text-purple-400 font-bold uppercase tracking-[0.4em] text-[10px]">For my Cutiepie :)</div>
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-[10px] uppercase font-black tracking-widest shadow-lg"
                            >
                                Tap to read
                            </motion.div>
                        </div>
                    </div>

                    {/* Inside Face (The Letter) */}
                    <div
                        className="absolute inset-0 bg-white rounded-[2rem] shadow-none p-1 p-2 flex flex-col backface-hidden"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                        <div className="w-full h-full bg-[#fdfaff] rounded-[1.8rem] border border-purple-100 flex flex-col overflow-hidden">
                            <div className="px-8 py-6 border-b border-purple-50 flex justify-between items-center bg-purple-50/20">
                                <span className="text-purple-900 font-bold uppercase tracking-[0.2em] text-[9px]">A Message For You</span>
                                <Heart className="text-pink-400" fill="currentColor" size={12} />
                            </div>

                            <div className="p-8 md:p-10 flex-1 overflow-y-auto font-romantic text-purple-900 leading-relaxed custom-scrollbar letter-scroll">
                                <p className="text-lg md:text-xl italic">
                                    {data.message || "I hope this year brings you calm mornings and even calmer nights. No matter what this year holds for you, I hope you always feel supported and loved.\n\nYou deserve a year full of wonders, a year where every challenge turns into a lesson and every dream feels a little closer. I'm so grateful to have you in my life as we step into this new chapter together."}
                                </p>
                                <div className="mt-12 pt-8 border-t border-purple-50">
                                    <p className="text-sm opacity-60">Yours always,</p>
                                    <p className="text-2xl font-black mt-1">Sasi ❤️</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* RELOAD BUTTON (Only shown after flip) */}
                <AnimatePresence>
                    {isFlipped && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => window.location.reload()}
                            className="w-full mt-12 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                        >
                            <RotateCcw size={16} /> Replay
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
                .backface-hidden {
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #f3e8ff;
                    border-radius: 10px;
                }
                .letter-scroll {
                    mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
                }
            `}} />
        </div>
    );
};

export default HNYFinal;
