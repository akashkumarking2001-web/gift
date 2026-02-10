import { motion } from 'framer-motion';
import { Mail, Heart, Sparkles } from 'lucide-react';

interface Page4VowProps {
    data: {
        message?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4Vow = ({ data, onNext, isEditing = false, onUpdate }: Page4VowProps) => {
    const defaultData = {
        message: data.message || "My love for you grows with every tick of the clock. This anniversary is just another beautiful chapter in our eternal story. I promise to cherish every second we have together, now and forever."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0a08] flex items-center justify-center p-6 md:p-12">
            {/* Background Texture/Accents */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)]" />

            <div className="relative z-10 w-full max-w-3xl">
                {/* Luxury Document Aesthetic */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-[#1a1a1a]/80 backdrop-blur-2xl border border-amber-600/20 rounded-[3rem] p-10 md:p-20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden group"
                >
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-600/20 to-transparent" />
                    <Sparkles className="absolute top-10 right-10 text-amber-500/30 w-12 h-12" />

                    {/* Letter Content */}
                    <div className="relative z-20">
                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-4 mb-12"
                        >
                            <Mail size={16} className="text-amber-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">My Anniversary Vow</span>
                            <div className="flex-1 h-[1px] bg-amber-600/20" />
                        </motion.div>

                        {/* Message Body */}
                        <div
                            className={`mb-16 relative group/msg ${isEditing ? 'cursor-pointer hover:bg-white/5 p-6 rounded-2xl transition-all' : ''}`}
                            onDoubleClick={() => {
                                if (isEditing) {
                                    const val = prompt("Edit My Vow:", defaultData.message);
                                    if (val !== null) onUpdate?.('message', val);
                                }
                            }}
                        >
                            <p className="text-white text-2xl md:text-3xl font-romantic leading-[1.8] tracking-wide text-justify italic opacity-90 drop-shadow-sm">
                                {defaultData.message}
                            </p>
                            {isEditing && (
                                <div className="absolute -top-4 left-0 opacity-0 group-hover/msg:opacity-100 transition-opacity">
                                    <span className="text-[8px] font-black text-amber-500 uppercase tracking-[0.3em] bg-amber-500/10 px-3 py-1 rounded-full whitespace-nowrap">Double Click to Edit Vow</span>
                                </div>
                            )}
                        </div>

                        {/* Signature */}
                        <div className="flex flex-col items-end">
                            <div className="w-48 h-[1px] bg-amber-600/30 mb-6" />
                            <p className="text-3xl md:text-4xl text-amber-500 font-romantic tracking-wider">
                                Yours Eternally
                            </p>
                            <div className="mt-4 flex items-center gap-2">
                                <Heart size={14} fill="#d97706" className="text-amber-600" />
                                <span className="text-[8px] text-white/20 uppercase tracking-[0.4em] font-black">Forever & Always</span>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Lighting Interaction (Subtle) */}
                    <motion.div
                        animate={{ opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-amber-600/10 to-transparent pointer-events-none"
                    />
                </motion.div>

                {/* Final Action Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-16 flex justify-center"
                >
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-4 px-10 py-5 rounded-full bg-white/5 border border-amber-600/20 text-white/40 hover:text-amber-500 hover:bg-amber-600/10 hover:border-amber-500/40 transition-all font-black text-xs uppercase tracking-[0.4em] shadow-2xl"
                    >
                        Replay Journey <span className="text-lg">↺</span>
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Page4Vow;
