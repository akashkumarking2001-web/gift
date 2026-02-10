import { motion } from 'framer-motion';
import { Mail, Heart } from 'lucide-react';

interface Page3NoteProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page3Note = ({ data, onNext, isEditing = false, onUpdate }: Page3NoteProps) => {
    const defaultData = {
        text: data.text || "You are the most amazing person I've ever met. I'm so lucky to have you. 🐼❤️"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d071a] flex flex-col items-center justify-center p-8 text-center scrollbar-hide overflow-y-auto">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1),transparent_60%)]" />

            <div className="relative z-10 w-full max-w-3xl">
                {/* Vintage Letter Aesthetic with Panda Twist */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-white p-12 md:p-20 rounded-sm shadow-2xl border-l-[1.5rem] border-violet-600 group"
                >
                    {/* Panda Paw Print (SVG Placeholder) */}
                    <div className="absolute top-8 right-8 text-violet-100 rotate-12 flex flex-col items-center opacity-40">
                        <div className="w-10 h-8 bg-current rounded-[100%] mb-1" />
                        <div className="flex gap-1">
                            <div className="w-3 h-3 bg-current rounded-full" />
                            <div className="w-3 h-3 bg-current rounded-full" />
                            <div className="w-3 h-3 bg-current rounded-full" />
                            <div className="w-3 h-3 bg-current rounded-full" />
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-4 mb-12 text-violet-200"
                    >
                        <Mail size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-violet-400">Panda's Secret Note</span>
                        <div className="flex-1 h-[1px] bg-violet-100" />
                    </motion.div>

                    <div
                        className={`relative group/msg ${isEditing ? 'cursor-pointer hover:bg-violet-50 p-6 rounded-2xl transition-all' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Secret Note:", defaultData.text);
                                if (val !== null) onUpdate?.('text', val);
                            }
                        }}
                    >
                        <p className="text-[#1a1a1a] text-2xl md:text-4xl font-romantic leading-relaxed text-justify opacity-90 italic">
                            {defaultData.text}
                        </p>
                        {isEditing && (
                            <div className="absolute -top-6 left-0 opacity-0 group-hover/msg:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-[8px] font-black text-violet-300 uppercase tracking-widest bg-violet-50 px-3 py-1 rounded-full">Double Click to Edit Note</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-20 flex flex-col items-end">
                        <div className="w-40 h-[2px] bg-violet-100 mb-6" />
                        <p className="text-3xl font-romantic text-violet-600">Your Panda</p>
                    </div>
                </motion.div>

                {/* Final Action Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-20 flex flex-col items-center gap-8"
                >
                    <button
                        onClick={() => window.location.reload()}
                        className="px-16 py-6 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full text-white font-black text-xs uppercase tracking-[0.6em] shadow-[0_30px_60px_-15px_rgba(124,58,237,0.5)] hover:scale-110 active:scale-95 transition-all"
                    >
                        Read Again ↺
                    </button>
                    <div className="flex items-center gap-4 text-white/20">
                        <div className="w-10 h-[1px] bg-white/10" />
                        <Heart size={16} fill="currentColor" />
                        <div className="w-10 h-[1px] bg-white/10" />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Page3Note;
