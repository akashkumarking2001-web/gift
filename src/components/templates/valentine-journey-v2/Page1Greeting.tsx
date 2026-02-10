import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Page1GreetingProps {
    data: {
        greeting?: string;
        recipientName?: string;
        subtext?: string;
        mainImage?: string;
        buttonText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Greeting = ({ data, onNext, isEditing = false, onUpdate }: Page1GreetingProps) => {
    const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([]);

    useEffect(() => {
        // Generate more floating hearts for premium feel
        const heartArray = Array.from({ length: 30 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 10 + Math.random() * 6
        }));
        setHearts(heartArray);
    }, []);

    const defaultData = {
        greeting: data.greeting || "Hey Beautiful",
        recipientName: data.recipientName || "Cutiepie",
        subtext: data.subtext || "I made something special for you this Valentine's Day",
        mainImage: data.mainImage || "https://via.placeholder.com/500x500/FFB6C1/FF1493?text=💖",
        buttonText: data.buttonText || "Open Your Gift"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 flex items-center justify-center p-4">
            {/* Animated Gradient Background */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-400/50 via-rose-400/50 to-orange-400/50"
                animate={{
                    background: [
                        'linear-gradient(to bottom right, rgba(236, 72, 153, 0.5), rgba(244, 63, 94, 0.5), rgba(251, 146, 60, 0.5))',
                        'linear-gradient(to bottom right, rgba(244, 63, 94, 0.5), rgba(251, 146, 60, 0.5), rgba(236, 72, 153, 0.5))',
                        'linear-gradient(to bottom right, rgba(251, 146, 60, 0.5), rgba(236, 72, 153, 0.5), rgba(244, 63, 94, 0.5))',
                        'linear-gradient(to bottom right, rgba(236, 72, 153, 0.5), rgba(244, 63, 94, 0.5), rgba(251, 146, 60, 0.5))'
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            {/* Floating Hearts Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute text-4xl opacity-20"
                        style={{ left: `${heart.x}%` }}
                        initial={{ y: '110vh', rotate: 0, scale: 0.5 }}
                        animate={{
                            y: '-10vh',
                            rotate: 360,
                            x: [0, 40, -40, 0],
                            scale: [0.5, 1, 0.8, 1, 0.5]
                        }}
                        transition={{
                            duration: heart.duration,
                            delay: heart.delay,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        {heart.id % 3 === 0 ? '💖' : heart.id % 3 === 1 ? '💕' : '💗'}
                    </motion.div>
                ))}
            </div>

            {/* Main Content - Enhanced Polaroid Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, type: 'spring', bounce: 0.4 }}
                className="relative z-10 max-w-lg w-full"
            >
                {/* Polaroid Frame with Shadow */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 pb-16 transform hover:rotate-0 transition-all duration-500 hover:shadow-pink-500/50">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 right-0 h-10 overflow-hidden rounded-t-3xl">
                        <svg className="w-full h-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#ec4899" />
                                    <stop offset="50%" stopColor="#f43f5e" />
                                    <stop offset="100%" stopColor="#fb923c" />
                                </linearGradient>
                            </defs>
                            <path d="M0,10 Q5,0 10,10 Q15,0 20,10 Q25,0 30,10 Q35,0 40,10 Q45,0 50,10 Q55,0 60,10 Q65,0 70,10 Q75,0 80,10 Q85,0 90,10 Q95,0 100,10 L100,0 L0,0 Z" fill="url(#topGradient)" />
                        </svg>
                    </div>

                    {/* Image Container with Enhanced Effects */}
                    <div
                        className="relative aspect-square rounded-2xl overflow-hidden mb-8 mt-6 border-4 border-pink-100 shadow-xl group cursor-pointer"
                        onDoubleClick={() => {
                            if (isEditing) {
                                const url = prompt("Enter Image URL:", defaultData.mainImage);
                                if (url) onUpdate?.('mainImage', url);
                            }
                        }}
                    >
                        <motion.img
                            src={defaultData.mainImage}
                            alt="Character"
                            className="w-full h-full object-cover"
                            initial={{ scale: 1.2, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                e.currentTarget.src = 'https://via.placeholder.com/500x500/FFB6C1/FF1493?text=💖';
                            }}
                        />
                        {/* Sparkle Effect on Hover */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            animate={{
                                background: [
                                    'linear-gradient(to top right, rgba(236, 72, 153, 0.2), transparent, rgba(251, 146, 60, 0.2))',
                                    'linear-gradient(to top right, rgba(251, 146, 60, 0.2), transparent, rgba(236, 72, 153, 0.2))'
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white text-[10px] font-black uppercase tracking-widest mb-2">Double Click to Replace</p>
                                <button className="bg-white text-pink-600 px-6 py-2 rounded-full font-black text-[10px] shadow-lg hover:scale-105 transition-all uppercase tracking-tighter">
                                    📷 Replace
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Greeting Text with Typewriter Effect */}
                    <div className="text-center space-y-4 mb-10">
                        <div
                            className={`relative group/text transition-all ${isEditing ? 'cursor-pointer p-4 hover:bg-rose-50 rounded-2xl' : ''}`}
                            onDoubleClick={() => {
                                if (isEditing) {
                                    const val = prompt("Edit Greeting:", defaultData.greeting);
                                    if (val !== null) onUpdate?.('greeting', val);
                                }
                            }}
                        >
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 font-romantic drop-shadow-sm leading-tight"
                            >
                                {defaultData.greeting}
                            </motion.h1>
                            {isEditing && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/text:opacity-100 transition-opacity whitespace-nowrap">
                                    <span className="text-[10px] font-black text-pink-400 uppercase tracking-[0.2em] bg-white px-3 py-1 rounded-full shadow-sm border border-pink-100">Double Click Greeting</span>
                                </div>
                            )}
                        </div>

                        <div
                            className={`relative group/name transition-all ${isEditing ? 'cursor-pointer p-6 hover:bg-rose-50 rounded-2xl' : ''}`}
                            onDoubleClick={() => {
                                if (isEditing) {
                                    const val = prompt("Edit Name:", defaultData.recipientName);
                                    if (val !== null) onUpdate?.('recipientName', val);
                                }
                            }}
                        >
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7, duration: 0.6, type: 'spring' }}
                                className="text-7xl md:text-8xl font-black text-rose-600 font-lovely drop-shadow-sm leading-none"
                            >
                                {defaultData.recipientName}
                            </motion.h2>
                            {isEditing && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/name:opacity-100 transition-opacity whitespace-nowrap">
                                    <span className="text-[10px] font-black text-pink-400 uppercase tracking-[0.2em] bg-white px-3 py-1 rounded-full shadow-sm border border-pink-100">Double Click Name</span>
                                </div>
                            )}
                        </div>

                        <div
                            className={`relative group/sub transition-all ${isEditing ? 'cursor-pointer p-4 hover:bg-rose-50 rounded-2xl' : ''}`}
                            onDoubleClick={() => {
                                if (isEditing) {
                                    const val = prompt("Edit Message:", defaultData.subtext);
                                    if (val !== null) onUpdate?.('subtext', val);
                                }
                            }}
                        >
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.6 }}
                                className="text-xl md:text-2xl text-gray-700 font-medium px-4 tracking-tight leading-relaxed"
                            >
                                {defaultData.subtext}
                            </motion.p>
                            {isEditing && (
                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover/sub:opacity-100 transition-opacity whitespace-nowrap">
                                    <span className="text-[8px] font-black text-pink-400/50 uppercase tracking-[0.2em]">Double Click Subtext</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Enhanced Next Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.8 }}
                    >
                        <motion.button
                            onClick={onNext}
                            className="w-full relative overflow-hidden px-14 py-8 rounded-[2.5rem] bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500 text-white font-black text-sm uppercase tracking-[0.4em] shadow-[0_25px_60px_-15px_rgba(244,63,94,0.4)] hover:shadow-[0_35px_80px_-15px_rgba(244,63,94,0.5)] transition-all"
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                            />
                            <span className="relative z-10 flex items-center justify-center gap-4">
                                {defaultData.buttonText}
                                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                            </span>
                        </motion.button>
                        {isEditing && (
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const val = prompt("Enter Button Text:", defaultData.buttonText);
                                        if (val) onUpdate?.('buttonText', val);
                                    }}
                                    className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] hover:text-white/60 transition-colors"
                                >
                                    Edit Button Text
                                </button>
                            </div>
                        )}
                    </motion.div>

                    {/* Decorative Bottom Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-10 overflow-hidden rounded-b-3xl">
                        <svg className="w-full h-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0,0 Q5,10 10,0 Q15,10 20,0 Q25,10 30,0 Q35,10 40,0 Q45,10 50,0 Q55,10 60,0 Q65,10 70,0 Q75,10 80,0 Q85,10 90,0 Q95,10 100,0 L100,10 L0,10 Z" fill="url(#topGradient)" />
                        </svg>
                    </div>
                </div>

                {/* Decorative Floating Hearts Around Card */}
                <motion.div
                    className="absolute -top-12 -right-12 text-7xl filter drop-shadow-lg"
                    animate={{
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.2, 1],
                        y: [0, -10, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                    💕
                </motion.div>
                <motion.div
                    className="absolute -bottom-12 -left-12 text-6xl filter drop-shadow-lg"
                    animate={{
                        rotate: [0, -15, 15, 0],
                        scale: [1, 1.15, 1],
                        y: [0, 10, 0]
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                    💖
                </motion.div>
                <motion.div
                    className="absolute top-1/2 -right-16 text-5xl filter drop-shadow-lg"
                    animate={{
                        rotate: [0, 20, -20, 0],
                        x: [0, 10, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                    💗
                </motion.div>
            </motion.div>

            {/* Sparkle Particles */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-2 h-2 bg-white rounded-full opacity-70"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        delay: Math.random() * 5,
                        repeat: Infinity
                    }}
                />
            ))}
        </div>
    );
};

export default Page1Greeting;
