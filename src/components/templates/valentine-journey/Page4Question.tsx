import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Star, MoveRight, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

interface Page4QuestionProps {
    data: {
        question?: string;
        characterImage?: string;
        yesText?: string;
        notSureText?: string;
        pleaseText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4Question = ({ data, onNext, isEditing = false, onUpdate }: Page4QuestionProps) => {
    const [notSureClicks, setNotSureClicks] = useState(0);
    const [notSureScale, setNotSureScale] = useState(1);
    const [showPlease, setShowPlease] = useState(false);
    const [answered, setAnswered] = useState(false);

    const defaultData = {
        question: data.question || "Will you be my Valentine?",
        characterImage: data.characterImage || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=60",
        yesText: data.yesText || "YES!",
        notSureText: data.notSureText || "Not Sure",
        pleaseText: data.pleaseText || "Please say yes! 💖"
    };

    const handleNotSureClick = () => {
        if (isEditing || answered) return;

        setNotSureClicks(prev => prev + 1);
        setNotSureScale(prev => Math.max(0.1, prev - 0.2));
        setShowPlease(true);

        setTimeout(() => setShowPlease(false), 2000);
    };

    const handleYesClick = () => {
        if (isEditing || answered) return;

        setAnswered(true);

        const duration = 4000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 40, spread: 360, ticks: 100, zIndex: 50 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                clearInterval(interval);
                setTimeout(onNext, 1500);
                return;
            }

            const particleCount = 60 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#e11d48', '#fb7185', '#ffffff']
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#e11d48', '#fb7185', '#ffffff']
            });
        }, 250);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0508] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* Hyper-Realistic Gilded Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(225,29,72,0.15),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(244,63,94,0.15),transparent_50%)]"
                />

                {/* Floating Micro-Particles */}
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

            <div className="relative z-10 max-w-7xl w-full flex flex-col items-center gap-16">

                {/* Visual Status Anchor */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-rose-900/10 backdrop-blur-3xl px-12 py-3.5 rounded-full border border-rose-800/20 shadow-2xl"
                >
                    <ShieldCheck size={16} className="text-rose-500" />
                    <span className="text-rose-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Decision Parameter 04</span>
                    <Zap size={16} className="text-rose-500 fill-current animate-pulse" />
                </motion.div>

                {/* Primary Question Section */}
                <div className="space-y-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-9xl font-black text-white font-romantic leading-tight drop-shadow-2xl px-4"
                    >
                        {defaultData.question}
                    </motion.h1>
                    <div className="h-1 w-40 bg-gradient-to-r from-transparent via-rose-600/40 to-transparent mx-auto" />
                </div>

                {/* Character Asset Unit (Glass Polaroid) */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="relative perspective-[2000px]"
                >
                    <div className="relative w-64 h-64 md:w-96 md:h-96 bg-white rounded-[3rem] p-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/20 rotate-3 hover:rotate-0 transition-transform duration-700 isolate overflow-hidden">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner border border-black/5 bg-gray-50">
                            <img
                                src={defaultData.characterImage}
                                alt="Character"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        {/* Internal Glow Accents */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-500/10 blur-[40px] rounded-full" />
                    </div>

                    {/* Orbiting Ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-10 border border-dashed border-rose-500/10 rounded-full"
                    />

                    {/* Floating Secondary Heart */}
                    <motion.div
                        className="absolute -top-8 -right-8 text-7xl drop-shadow-2xl"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        ❤️
                    </motion.div>
                </motion.div>

                {/* Tactical Interaction Overlay */}
                <AnimatePresence>
                    {showPlease && !isEditing && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: -20 }}
                            className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none"
                        >
                            <div className="bg-rose-950/40 backdrop-blur-3xl px-16 py-8 rounded-[3rem] border-2 border-rose-500/40 shadow-[0_50px_100px_rgba(225,29,72,0.3)]">
                                <p className="text-3xl md:text-5xl font-romantic text-white italic drop-shadow-2xl">
                                    {defaultData.pleaseText}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* High-Fidelity Button Interface */}
                <div className="relative w-full flex flex-col items-center gap-12 isolate">

                    <div className="flex flex-col md:flex-row items-center gap-12">
                        {/* THE DEFINITIVE CHOICE: Royal Glass Unit */}
                        <motion.button
                            onClick={handleYesClick}
                            disabled={answered}
                            whileHover={{ scale: 1.05, y: -10 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative px-24 py-10 bg-white text-[#9d174d] font-black text-xl md:text-4xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(255,255,255,0.4)] transition-all z-20 font-romantic tracking-widest isolate overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="relative z-10 flex items-center gap-6">
                                {defaultData.yesText} <Heart size={36} fill="currentColor" className="animate-pulse" />
                            </span>
                        </motion.button>

                        {/* THE EVASIVE CHOICE: Shrinking Ghost Unit */}
                        {notSureScale > 0.1 && (
                            <motion.button
                                onClick={handleNotSureClick}
                                disabled={answered}
                                animate={{ scale: notSureScale }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="px-16 py-8 bg-rose-950/20 backdrop-blur-md border-2 border-white/10 text-white/40 font-black text-lg md:text-2xl rounded-[3rem] z-10 hover:border-white/20 hover:text-white transition-colors flex items-center gap-4"
                            >
                                <AlertCircle size={24} className="opacity-20" />
                                <span className="tracking-widest uppercase text-xs font-outfit">{defaultData.notSureText}</span>
                            </motion.button>
                        )}
                    </div>

                    {/* Registry Hints */}
                    <div className="flex flex-col items-center gap-4 opacity-10">
                        <div className="h-[1px] w-48 bg-white" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Status: Awaiting Affirmation</span>
                    </div>
                </div>

            </div>

            {/* Final Success State Overlay */}
            <AnimatePresence>
                {answered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 flex items-center justify-center bg-[#0d0508]/90 backdrop-blur-xl z-[200]"
                    >
                        <div className="text-center space-y-12 max-w-4xl px-8">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-48 h-48 md:w-64 md:h-64 bg-white/[0.05] border-2 border-rose-500/30 rounded-full flex items-center justify-center mx-auto shadow-[0_0_100px_rgba(225,29,72,0.5)] isolate"
                            >
                                <Heart size={100} fill="#e11d48" className="text-rose-500 drop-shadow-[0_0_40px_rgba(225,29,72,0.8)]" />
                            </motion.div>

                            <div className="space-y-6">
                                <h2 className="text-6xl md:text-9xl font-black text-white font-romantic leading-tight tracking-tight drop-shadow-2xl">
                                    "I Knew You'd Say Yes!"
                                </h2>
                                <p className="text-2xl md:text-4xl text-rose-200/50 font-romantic italic tracking-widest">
                                    Synchronization successful. Establishing eternal bond.
                                </p>
                            </div>

                            <motion.div
                                animate={{ width: ['0%', '100%'] }}
                                transition={{ duration: 1.5 }}
                                className="h-1 bg-rose-500 mx-auto max-w-sm rounded-full"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-2 opacity-10 font-outfit">
                <div className="font-romantic text-6xl text-rose-700 italic">Declaration</div>
                <div className="h-[1px] w-48 bg-rose-700" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1em]">ID: VALENTINE-INIT-04</span>
            </div>

        </div>
    );
};

export default Page4Question;
