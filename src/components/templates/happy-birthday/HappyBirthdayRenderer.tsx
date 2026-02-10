import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Gift, Cake, Sparkles, X, Music, Camera, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTemplateAudio } from '../../../hooks/useTemplateAudio';

// --- Assets ---
// Placeholder SVGs/Icons will be used where images are not provided by user data
const BEAR_AVATAR = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif"; // Milk & Mocha vibe
const CONFETTI_COLORS = ['#FFC0CB', '#FF69B4', '#FF1493', '#DA70D6', '#9370DB'];

// --- Components ---

const LoadingScreen = ({ data, onNext }: any) => {
    useEffect(() => {
        const timer = setTimeout(onNext, 4000);
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <motion.div
                animate={{
                    y: [-10, 10, -10],
                    rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="mb-8 relative "
            >
                <Cake className="w-24 h-24 text-pink-500 drop-shadow-lg" />
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="absolute -top-2 -right-2 text-yellow-500"
                >
                    <Sparkles className="w-8 h-8" />
                </motion.div>
            </motion.div>

            <h2 className="text-xl md:text-2xl font-bold text-purple-900 mb-6 text-center">
                {data.subtext || "Loading your birthday surprise..."}
            </h2>

            <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden border border-white/50 shadow-inner">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                    className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                />
            </div>
        </div>
    );
};

const IntroCard = ({ data, onNext }: any) => {
    return (
        <div className="min-h-screen bg-purple-100 flex items-center justify-center p-6">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center relative overflow-hidden"
            >
                <div className="mb-6 flex justify-center">
                    <img src={data.mainImage || BEAR_AVATAR} className="w-32 h-32 object-cover rounded-full border-4 border-pink-100" alt="Character" />
                </div>

                <h1 className="text-2xl font-black text-gray-800 mb-4 leading-tight">
                    {data.heading || "A Cutiepie was born today!"}
                </h1>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    {data.subtext || "Yes, it's YOU! A little surprise awaits..."}
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30"
                >
                    {data.buttonText || "Start the surprise ✨"}
                </motion.button>
            </motion.div>
        </div>
    );
};

const CakeInteraction = ({ data, onNext }: any) => {
    const [step, setStep] = useState<'plain' | 'decorated' | 'lit'>('plain');

    const handleDecorate = () => setStep('decorated');
    const handleLight = () => {
        setStep('lit');
        setTimeout(onNext, 4000); // Auto advanced after celebration
    };

    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-3xl font-bold text-pink-600 mb-8 tracking-tight">
                {step === 'lit' ? (data.congratsText || "Happy Birthday!!") : "Let's make a cake!"}
            </h2>

            <div className="relative w-64 h-64 mb-12 flex items-center justify-center">
                <motion.div layout className="relative">
                    {/* Cake Base */}
                    <div className="w-48 h-32 bg-amber-200 rounded-lg shadow-xl relative mt-16 border-b-8 border-amber-300">
                        {/* Layer 2 */}
                        <div className="absolute -top-16 left-4 w-40 h-24 bg-pink-300 rounded-lg border-b-4 border-pink-400" />

                        {/* Decorations */}
                        <AnimatePresence>
                            {step !== 'plain' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute inset-0"
                                >
                                    {[...Array(10)].map((_, i) => (
                                        <div key={i} className="absolute w-2 h-2 rounded-full"
                                            style={{
                                                backgroundColor: CONFETTI_COLORS[i % 5],
                                                top: Math.random() * -40,
                                                left: Math.random() * 160
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Candle */}
                        <AnimatePresence>
                            {step === 'lit' && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-32 left-1/2 -translate-x-1/2 flex flex-col items-center"
                                >
                                    <div className="w-4 h-16 bg-white border border-gray-200 rounded-sm mb-1" />
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                                        transition={{ repeat: Infinity, duration: 0.2 }}
                                        className="w-4 h-6 bg-orange-500 rounded-full blur-[2px]"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            <div className="space-y-4">
                {step === 'plain' && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={handleDecorate}
                        className="px-8 py-3 bg-pink-500 text-white rounded-full font-bold shadow-lg"
                    >
                        Decorate 🎨
                    </motion.button>
                )}
                {step === 'decorated' && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={handleLight}
                        className="px-8 py-3 bg-orange-500 text-white rounded-full font-bold shadow-lg flex items-center gap-2 mx-auto"
                    >
                        <Sparkles className="w-5 h-5" /> Light Candle
                    </motion.button>
                )}
            </div>

            {step === 'lit' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 pointer-events-none flex items-center justify-center p-4 bg-black/20"
                >
                    <div className="text-4xl md:text-6xl animate-bounce">
                        🎉 🎂 🎈
                    </div>
                </motion.div>
            )}
        </div>
    );
};

const BalloonGame = ({ data, onNext }: any) => {
    const [poppedCount, setPoppedCount] = useState(0);
    const words = [data.w1 || "You", data.w2 || "Are", data.w3 || "A", data.w4 || "Cutie"];

    const handlePop = (idx: number) => {
        setPoppedCount(prev => prev + 1);
    };

    useEffect(() => {
        if (poppedCount === 4) {
            setTimeout(onNext, 2000);
        }
    }, [poppedCount, onNext]);

    return (
        <div className="min-h-screen bg-sky-100 flex flex-col items-center justify-center relative overflow-hidden">
            <h2 className="text-2xl font-bold text-sky-800 mb-12 z-10">
                {poppedCount < 4 ? "Pop the balloons!" : (data.finalMessage || "You are a Cutie!")}
            </h2>

            <div className="flex flex-wrap gap-8 justify-center items-center z-10 max-w-md">
                {words.map((word, i) => (
                    <Balloon key={i} word={word} onPop={() => handlePop(i)} color={CONFETTI_COLORS[i % 5]} />
                ))}
            </div>

            {/* Background Clouds */}
            <div className="absolute top-10 left-10 text-white/60"><motion.div animate={{ x: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity }}>☁️</motion.div></div>
            <div className="absolute top-20 right-20 text-white/60"><motion.div animate={{ x: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity }}>☁️</motion.div></div>
        </div>
    );
};

const Balloon = ({ word, onPop, color }: any) => {
    const [popped, setPopped] = useState(false);

    const handleClick = () => {
        if (!popped) {
            setPopped(true);
            onPop();
        }
    };

    return (
        <div className="relative w-24 h-32 flex items-center justify-center cursor-pointer" onClick={handleClick}>
            {!popped ? (
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-20 h-24 rounded-full shadow-lg relative flex items-center justify-center"
                    style={{ backgroundColor: color }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1.2, opacity: 0 }}
                >
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-400/50" />
                    <span className="text-white font-bold opacity-0 hover:opacity-100 transition-opacity text-xs">POP!</span>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5, opacity: [1, 0] }}
                    className="font-black text-2xl text-pink-600"
                >
                    {word}
                </motion.div>
            )}
        </div>
    );
};

const PhotoGallery = ({ data, onNext }: any) => {
    const [idx, setIdx] = useState(0);
    const photos: string[] = Array.isArray(data.photos) && data.photos.length > 0 ? data.photos : [BEAR_AVATAR, BEAR_AVATAR];

    const nextPhoto = () => setIdx((prev) => (prev + 1) % photos.length);
    const prevPhoto = () => setIdx((prev) => (prev - 1 + photos.length) % photos.length);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex flex-col items-center justify-center p-6">
            <h2 className="text-2xl font-bold text-indigo-900 mb-8 flex items-center gap-2">
                <Heart className="fill-red-500 text-red-500" /> Sweet Moments
            </h2>

            <div className="relative w-full max-w-md aspect-[4/5] bg-white p-4 pb-12 rounded-lg shadow-2xl skew-y-1">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={idx}
                        src={photos[idx]}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="w-full h-full object-cover rounded bg-gray-100"
                        alt="Memory"
                    />
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-4 flex justify-between px-8">
                    <button onClick={prevPhoto} className="p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"><ChevronLeft /></button>
                    <button onClick={nextPhoto} className="p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"><ChevronRight /></button>
                </div>

                <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-full shadow-lg transform rotate-12">
                    #{idx + 1}
                </div>
            </div>

            <p className="mt-8 text-gray-500 text-sm">Swipe for more memories</p>

            <button onClick={onNext} className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-xl shadow-lg font-bold">
                See Message 💌
            </button>
        </div>
    );
};

const LetterReveal = ({ data, onNext }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-rose-50 flex items-center justify-center p-6 perspective-1000">
            {!isOpen ? (
                <motion.div
                    layoutId="envelope"
                    onClick={() => setIsOpen(true)}
                    className="w-64 h-48 bg-pink-500 rounded-lg shadow-2xl flex items-center justify-center cursor-pointer relative group"
                    whileHover={{ scale: 1.05, rotate: -2 }}
                >
                    <Heart className="w-16 h-16 text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                    <div className="absolute bottom-4 text-white text-sm font-bold opacity-80">Tap to open</div>
                </motion.div>
            ) : (
                <motion.div
                    layoutId="envelope"
                    className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border-2 border-pink-100 relative"
                >
                    <button onClick={onNext} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        Skip
                    </button>
                    <h3 className="text-2xl font-black text-pink-600 mb-6">A Note For You</h3>
                    <div className="prose prose-pink max-h-[60vh] overflow-y-auto custom-scrollbar">
                        <p className="whitespace-pre-wrap text-lg text-gray-700 leading-relaxed font-handwriting">
                            {data.message || "Enter your heartfelt message here..."}
                        </p>
                    </div>
                    <button
                        onClick={onNext}
                        className="w-full mt-8 py-4 bg-pink-100 text-pink-700 font-bold rounded-xl hover:bg-pink-200 transition-colors"
                    >
                        One Last Surprise →
                    </button>
                </motion.div>
            )}
        </div>
    );
};

const FinalGift = ({ data }: any) => {
    const [opened, setOpened] = useState(false);

    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-white overflow-hidden relative">
            {!opened ? (
                <motion.div
                    className="cursor-pointer text-center"
                    onClick={() => setOpened(true)}
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                >
                    <div className="text-8xl mb-4">🎁</div>
                    <p className="text-xl font-bold animate-pulse">Tap to open</p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center z-10"
                >
                    <div className="text-9xl mb-8">💖</div>
                    <img src={data.characterImage || BEAR_AVATAR} className="w-40 h-40 mx-auto rounded-full border-4 border-pink-500 mb-8 object-cover" />
                    <h1 className="text-3xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                        {data.finalText || "Happy Birthday!"}
                    </h1>
                    <div className="flex gap-4 justify-center">
                        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                            Replay ↺
                        </button>
                    </div>
                </motion.div>
            )}

            {opened && (
                <div className="absolute inset-0 pointer-events-none">
                    {/* Simple confetti particles could go here */}
                </div>
            )}
        </div>
    );
};

// --- Renderer ---

export default function HappyBirthdayRenderer({
    pageId,
    data,
    onNext
}: {
    pageId: string,
    data: any,
    onNext: () => void
}) {
    const pageMapping: Record<string, React.ComponentType<any>> = {
        'p1': LoadingScreen,
        'p2': IntroCard,
        'p3': CakeInteraction,
        'p4': BalloonGame,
        'p5': PhotoGallery,
        'p6': LetterReveal,
        'p7': FinalGift
    };

    const Component = pageMapping[pageId] || LoadingScreen;

    return <Component data={data} onNext={onNext} />;
}
