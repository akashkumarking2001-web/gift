import { motion } from 'framer-motion';
import { Mail, Heart, ShieldCheck } from 'lucide-react';

interface Page4LetterProps {
    data: {
        message?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4Letter = ({ data, onNext, isEditing = false, onUpdate }: Page4LetterProps) => {
    const defaultData = {
        message: data.message || "I promise to love you, cherish you, and stand by your side through every adventure that life brings our way. You are my greatest discovery and my most precious treasure. Forever yours."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0202] flex items-center justify-center p-6 md:p-12">
            {/* Background Texture/Accents */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.08)_0%,transparent_70%)]" />

            <div className="relative z-10 w-full max-w-3xl">
                {/* Royal Parchment Aesthetic */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-[#111111] border border-red-900/40 rounded-[3rem] p-10 md:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden group"
                >
                    {/* Decorative Wax Seal (Glass Style) */}
                    <div className="absolute top-10 right-10 w-24 h-24 bg-red-600/20 backdrop-blur-3xl rounded-full flex items-center justify-center border border-red-500/30 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                        <Heart size={32} fill="#dc2626" className="text-red-600 drop-shadow-lg" />
                    </div>

                    {/* Letter Content */}
                    <div className="relative z-20">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-4 mb-16"
                        >
                            <Mail size={16} className="text-red-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.8em] text-white/30">An Eternal Commitment</span>
                        </motion.div>

                        {/* Message Body */}
                        <div
                            className={`mb-20 relative group/msg ${isEditing ? 'cursor-pointer hover:bg-white/5 p-8 rounded-[2rem] transition-all' : ''}`}
                            onDoubleClick={() => {
                                if (isEditing) {
                                    const val = prompt("Edit Final Vow:", defaultData.message);
                                    if (val !== null) onUpdate?.('message', val);
                                }
                            }}
                        >
                            <p className="text-white text-2xl md:text-4xl font-romantic leading-[1.8] italic opacity-90 text-justify">
                                "{defaultData.message}"
                            </p>
                            {isEditing && (
                                <div className="absolute -top-6 left-0 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                                    <span className="text-[8px] font-black text-red-500 uppercase tracking-[0.3em] bg-red-500/10 px-3 py-1 rounded-full whitespace-nowrap">Double Click to Edit Vow</span>
                                </div>
                            )}
                        </div>

                        {/* Signature */}
                        <div className="flex flex-col items-end">
                            <div className="w-56 h-[2px] bg-red-900/30 mb-8" />
                            <p className="text-4xl md:text-5xl text-red-600 font-romantic tracking-widest px-4">
                                Forever Yours
                            </p>
                            <div className="mt-6 flex items-center gap-3 text-white/20">
                                <ShieldCheck size={14} className="text-red-500/40" />
                                <span className="text-[8px] uppercase tracking-[0.5em] font-black italic">A lifetime guarantee</span>
                            </div>
                        </div>
                    </div>

                    {/* Subtle Internal Glow */}
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-600/10 blur-[100px] rounded-full pointer-events-none" />
                </motion.div>

                {/* Final Action Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-16 flex flex-col items-center gap-8"
                >
                    <button
                        onClick={() => window.location.reload()}
                        className="px-12 py-5 bg-gradient-to-r from-red-600 to-red-900 rounded-full text-white font-black text-xs uppercase tracking-[0.6em] shadow-[0_30px_60px_-15px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95 transition-all"
                    >
                        Replay Vow ↺
                    </button>
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">The End of the Beginning</p>
                </motion.div>
            </div>
        </div>
    );
};

export default Page4Letter;
