import { motion } from 'framer-motion';
import { useState } from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';

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
            setTimeout(onNext, 1500);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-center p-8 text-center text-blue-100">
            {/* Background reactive glow */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${solved ? 'opacity-30' : 'opacity-0'} bg-blue-500 blur-[150px]`} />

            <div className="relative z-10 w-full max-w-4xl">
                {/* Question Area */}
                <div
                    className={`mb-16 relative group inline-block ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-3 rounded-2xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Question:", defaultData.question);
                            if (val !== null) onUpdate?.('question', val);
                        }
                    }}
                >
                    <h2 className="text-3xl md:text-5xl font-black font-lovely tracking-tight">
                        {defaultData.question}
                    </h2>
                </div>

                {/* Puzzle Interface */}
                <div className="relative w-full max-w-md mx-auto aspect-square group/puzzle">
                    {/* The "Backing" Image */}
                    <div className="absolute inset-0 rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                        <img
                            src={defaultData.puzzleImage}
                            alt="Puzzle"
                            className={`w-full h-full object-cover transition-all duration-700 ${solved ? 'opacity-100' : 'opacity-20 blur-sm scale-110'}`}
                        />
                    </div>

                    {/* The "Missing Piece" Overlay */}
                    <motion.div
                        animate={solved ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center p-8"
                    >
                        <div className="w-full h-full border-4 border-dashed border-blue-500/50 rounded-[3rem] bg-blue-600/10 flex flex-col items-center justify-center gap-6">
                            <PuzzlePieceIcon className="w-32 h-32 text-blue-400 group-hover/puzzle:scale-110 transition-transform" />
                            <button
                                onClick={handleSolve}
                                className="px-10 py-4 bg-blue-600 rounded-full text-white font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                            >
                                Tap to Fill
                            </button>
                        </div>
                    </motion.div>

                    {/* Editor Control */}
                    {isEditing && (
                        <button
                            onClick={() => {
                                const url = prompt("Enter Puzzle Image URL:", defaultData.puzzleImage);
                                if (url) onUpdate?.('puzzleImage', url);
                            }}
                            className="absolute -top-4 -right-4 w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-20"
                        >
                            <Camera size={20} />
                        </button>
                    )}

                    {/* Solve Overlay */}
                    {solved && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center z-20"
                        >
                            <div className="bg-white/10 backdrop-blur-3xl rounded-full p-4 border border-white/20">
                                <CheckCircle2 size={100} className="text-blue-400" />
                            </div>
                        </motion.div>
                    )}
                </div>

                {solved && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-16 text-blue-400 font-black text-xs uppercase tracking-[0.5em]"
                    >
                        Puzzle Complete! You are the missing piece!
                    </motion.p>
                )}
            </div>
        </div>
    );
};

const PuzzlePieceIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M21.41 11.58L17.41 7.58A2 2 0 0 0 16 7h-2V5a2 2 0 0 0-2-2h-1V2h-2v1h-1a2 2 0 0 0-2 2v2H4a2 2 0 0 0-2 2v2h1v2H2v1a2 2 0 0 0 2 2h2v2a2 2 0 0 0 2 2h1v1h2v-1h1a2 2 0 0 0 2-2v-2h2a2 2 0 0 0 1.41-.58l4-4a2 2 0 0 0 0-2.84zM16 17H8v-2h4a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H8V7h8z" />
    </svg>
);

export default Page2Puzzle;
