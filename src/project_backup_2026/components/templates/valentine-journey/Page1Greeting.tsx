import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, Sparkles, Star, MoveRight, ShieldCheck, Zap } from 'lucide-react';

interface Page1GreetingProps {
    data: {
        greeting?: string;
        subtext?: string;
        mainImage?: string;
        buttonText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Greeting = ({ data, onNext, isEditing = false, onUpdate }: Page1GreetingProps) => {
    const defaultData = {
        greeting: data.greeting || "Hey Cutiepie",
        subtext: data.subtext || "This Valentine, I made something special for you",
        mainImage: data.mainImage || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=60",
        buttonText: data.buttonText || "Begin The Journey"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0508] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* Hyper-Realistic Crimson Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(225,29,72,0.15),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(244,63,94,0.15),transparent_50%)]"
                />

                {/* Floating Crimson Dust */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1.5px] h-[1.5px] bg-rose-400/20 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 6 + Math.random() * 8, repeat: Infinity }}
                    />
                ))}

                <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')]" />
            </div>

            <div className="relative z-10 max-w-6xl w-full flex flex-col items-center">

                {/* High-Fidelity Visual Anchor (Polaroid 3D) */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 2 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-20 relative group perspective-[2000px]"
                >
                    <div className="relative p-8 bg-white rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/20 isolate overflow-hidden group-hover:rotate-0 transition-transform duration-700">
                        <div className="relative aspect-square w-64 md:w-96 rounded-xl overflow-hidden shadow-inner border border-black/5">
                            <img
                                src={defaultData.mainImage}
                                alt="Memory"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                        </div>

                        <div className="mt-8 mb-12 flex flex-col items-center gap-4">
                            <div className="h-1 w-12 bg-rose-500/20 rounded-full" />
                            <Heart size={24} fill="#e11d48" className="text-rose-600 drop-shadow-[0_0_15px_rgba(225,29,72,0.4)]" />
                        </div>

                        {/* Inventory Synchronization Fill Overlay */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-600 to-rose-400 opacity-20" />
                    </div>

                    {/* Orbiting Decorative Accents */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-10 border border-dashed border-rose-500/10 rounded-full pointer-events-none"
                    />
                </motion.div>

                {/* Narrative Typography Section */}
                <div className="space-y-12 mb-28 text-center max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-rose-900/10 backdrop-blur-xl px-12 py-3.5 rounded-full border border-rose-800/20 mx-auto"
                    >
                        <Star size={14} className="text-rose-400 fill-current animate-pulse" />
                        <span className="text-rose-100/50 font-black uppercase tracking-[0.6em] text-[10px]">Registry Sequence 01</span>
                        <Zap size={14} className="text-rose-400 fill-current opacity-30" />
                    </motion.div>

                    <div className="space-y-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-5xl md:text-9xl font-black text-white font-romantic leading-tight tracking-[0.02em] px-4 drop-shadow-2xl"
                        >
                            "{defaultData.greeting}"
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            transition={{ delay: 0.8 }}
                            className="text-xl md:text-3xl font-romantic text-rose-100 italic tracking-widest"
                        >
                            {defaultData.subtext}
                        </motion.p>
                    </div>
                </div>

                {/* Professional Navigation Area */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-24 py-9 bg-[#0d0508] border-2 border-rose-900/30 rounded-[3.5rem] text-rose-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(225,29,72,0.3)] transition-all flex items-center gap-6 isolate overflow-hidden"
                >
                    <div className="absolute inset-0 bg-rose-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-[3.5rem]" />
                    <span className="relative z-10 text-rose-500">{defaultData.buttonText}</span>
                    <MoveRight className="relative z-10 w-6 h-6 border-2 border-rose-900/30 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                </motion.button>
            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-2 opacity-10">
                <div className="font-romantic text-6xl text-rose-700 italic">Expedition</div>
                <div className="h-[1px] w-48 bg-rose-700" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1em]">System: Journey V4</span>
            </div>

        </div>
    );
};

export default Page1Greeting;
