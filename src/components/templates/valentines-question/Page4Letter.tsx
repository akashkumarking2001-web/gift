import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

interface Page4LetterProps {
    data: {
        message?: string;
        senderName?: string;
    };
    onNext: () => void; // Usually back to start or a thank you
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4Letter = ({ data, onNext, isEditing = false, onUpdate }: Page4LetterProps) => {
    const defaultData = {
        message: data.message || "My dearest, every day with you is a blessing. I'm so grateful to have you in my life. You make everything better just by being you.",
        senderName: data.senderName || "Love, Your Forever"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0d0d] flex items-center justify-center p-6 md:p-12">
            {/* Background Texture/Accents */}
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-rose-900/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-red-900/10 blur-[120px] rounded-full" />

            <div className="relative z-10 w-full max-w-3xl">
                {/* Envelope/Letter Container */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-[#1a1a1a]/80 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-10 md:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden group"
                >
                    {/* Decorative Wax Seal (Glass style) */}
                    <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-rose-700 p-0.5 shadow-2xl shadow-red-600/20 rotate-12 flex items-center justify-center">
                        <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                            <Heart size={32} fill="white" className="text-white opacity-80" />
                        </div>
                    </div>

                    {/* Letter Content */}
                    <div className="relative z-20">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-4 mb-12 text-white/30"
                        >
                            <Mail size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em]">A Letter for You</span>
                            <div className="flex-1 h-[1px] bg-white/5" />
                        </motion.div>

                        {/* Message Body */}
                        <div
                            className={`mb-16 relative group/msg ${isEditing ? 'cursor-pointer hover:bg-white/5 p-4 rounded-2xl transition-all' : ''}`}
                            onDoubleClick={() => {
                                if (isEditing) {
                                    const val = prompt("Edit Love Letter:", defaultData.message);
                                    if (val !== null) onUpdate?.('message', val);
                                }
                            }}
                        >
                            <p className="text-white text-2xl md:text-3xl font-romantic leading-[1.8] tracking-wide text-justify italic opacity-90">
                                {defaultData.message}
                            </p>
                            {isEditing && (
                                <div className="absolute -top-4 left-0 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                                    <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] bg-black/40 px-3 py-1 rounded-full whitespace-nowrap">Double Click to Edit Content</span>
                                </div>
                            )}
                        </div>

                        {/* Signature */}
                        <div
                            className={`flex flex-col items-end relative group/sig ${isEditing ? 'cursor-pointer hover:bg-white/5 p-4 rounded-2xl transition-all' : ''}`}
                            onDoubleClick={() => {
                                if (isEditing) {
                                    const val = prompt("Edit Signature:", defaultData.senderName);
                                    if (val !== null) onUpdate?.('senderName', val);
                                }
                            }}
                        >
                            <div className="w-48 h-[1px] bg-white/10 mb-6" />
                            <p className="text-3xl md:text-4xl text-red-500 font-romantic drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                {defaultData.senderName}
                            </p>
                            {isEditing && (
                                <div className="absolute -top-4 right-0 opacity-0 group-hover/sig:opacity-100 transition-opacity">
                                    <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.3em] bg-black/40 px-3 py-1 rounded-full whitespace-nowrap">Double Click to Edit Signature</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Floating Heart Decorations (Subtle) */}
                    <motion.div
                        animate={{ y: [0, -10, 0], opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute bottom-10 left-10 text-9xl text-white pointer-events-none"
                    >
                        ❤️
                    </motion.div>
                </motion.div>

                {/* Final Action Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-12 flex justify-center"
                >
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all font-black text-xs uppercase tracking-[0.3em]"
                    >
                        Replay Experience <span className="text-lg">↺</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Page4Letter;
