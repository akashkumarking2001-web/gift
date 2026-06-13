import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Camera, CheckCircle2, ShieldCheck, Zap, Sparkles, Star, Puzzle, MoveRight } from 'lucide-react';

interface Page2PuzzleProps {
    data: {
        puzzleImage?: string;
        question?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Puzzle = ({ data, onNext, isEditing = false, onUpdate }: Page2PuzzleProps) => {
    const [solved, setSolved] = useState(false);

    const defaultData = {
        puzzleImage: data.puzzleImage || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=60",
        question: data.question || "Whose heart does this piece belong to?"
    };

    const handleSolve = () => {
        if (!isEditing) {
            setSolved(true);
            setTimeout(onNext, 2500);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-center p-8 text-center font-outfit isolate">

            {/* Hyper-Realistic Stellar Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]"
                />
            </div>

            <div className="relative z-10 max-w-7xl w-full flex flex-col items-center gap-20">

                {/* Visual Status Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-blue-900/10 backdrop-blur-3xl px-12 py-3.5 rounded-full border border-blue-800/20 shadow-2xl"
                >
                    <ShieldCheck size={16} className="text-blue-500" />
                    <span className="text-blue-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Registry Authentication</span>
                    <Zap size={16} className="text-blue-500 fill-current animate-pulse" />
                </motion.div>

                {/* Primary Question Display */}
                <div className="space-y-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-white font-romantic leading-tight tracking-tight drop-shadow-2xl px-4"
                    >
                        {defaultData.question}
                    </motion.h2>
                    <div className="h-1 w-40 bg-gradient-to-r from-transparent via-blue-600/40 to-transparent mx-auto" />
                </div>

                {/* High-Performance Puzzle Interface */}
                <div className="relative w-full max-w-xl aspect-square group/puzzle perspective-[2000px]">

                    {/* The "Backing" Image - High Density Glass Unit */}
                    <div className="absolute inset-0 rounded-[4rem] overflow-hidden border-2 border-white/5 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] isolate">
                        <img
                            src={defaultData.puzzleImage}
                            alt="Puzzle"
                            className={`w-full h-full object-cover transition-all duration-1000 ease-[0.22, 1, 0.36, 1] ${solved ? 'opacity-100' : 'opacity-20 blur-md scale-110'}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
                    </div>

                    {/* The "Missing Piece" Interaction Layer */}
                    <AnimatePresence>
                        {!solved && (
                            <motion.div
                                exit={{ opacity: 0, scale: 0.9, rotateX: 20 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute inset-0 flex items-center justify-center p-12"
                            >
                                <div className="w-full h-full border-4 border-dashed border-blue-500/40 rounded-[4rem] bg-blue-600/5 backdrop-blur-xl flex flex-col items-center justify-center gap-12 group/inner transition-all hover:bg-blue-600/10">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse" />
                                        <Puzzle size={120} strokeWidth={1} className="text-blue-400 group-hover/inner:scale-110 group-hover/inner:rotate-12 transition-transform duration-700" />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleSolve}
                                        className="px-16 py-8 bg-blue-600 text-white font-black text-xs uppercase tracking-[0.5em] rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(37,99,235,0.4)] transition-all"
                                    >
                                        Seal The Connection
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Completion Authentication Overlay */}
                    <AnimatePresence>
                        {solved && (
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", damping: 15 }}
                                className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                            >
                                <div className="bg-white/10 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/20 shadow-2xl">
                                    <CheckCircle2 size={120} strokeWidth={1} className="text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Editor Control Unit */}
                    {isEditing && (
                        <button
                            onClick={() => {
                                const url = prompt("Asset Protocol URL:", defaultData.puzzleImage);
                                if (url) onUpdate?.('puzzleImage', url);
                            }}
                            className="absolute -top-6 -right-6 w-16 h-16 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-30 isolate"
                        >
                            <Camera size={24} />
                        </button>
                    )}
                </div>

                {/* Final Professional Status */}
                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 opacity-10">
                        <div className="h-[1px] w-40 bg-white" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Status: {solved ? 'Encryption Verified' : 'Awaiting Input'}</span>
                        <div className="h-[1px] w-40 bg-white" />
                    </div>
                </div>

            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-2 opacity-10">
                <div className="font-romantic text-6xl text-blue-700 italic">Integration</div>
                <div className="h-[1px] w-48 bg-blue-700" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1em]">ID: MISSING-PIECE</span>
            </div>

        </div>
    );
};

export default Page2Puzzle;
