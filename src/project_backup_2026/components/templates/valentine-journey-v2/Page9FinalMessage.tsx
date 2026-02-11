import { motion } from 'framer-motion';

interface Page9FinalMessageProps {
    data: {
        heading?: string;
        letterContent?: string;
        closingLine?: string;
        senderName?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page9FinalMessage = ({ data, onNext, isEditing = false, onUpdate }: Page9FinalMessageProps) => {
    const defaultData = {
        heading: data.heading || "A Letter From My Heart",
        letterContent: data.letterContent || "My dearest love,\n\nEvery moment with you feels like a dream come true. You've brought so much joy, laughter, and love into my life. I can't imagine my days without your smile, your warmth, and your beautiful soul.\n\nThank you for being you. Thank you for choosing me. Thank you for making every day an adventure worth living.\n\nI love you more than words can express, and I promise to show you every single day just how much you mean to me.",
        closingLine: data.closingLine || "Forever and always,",
        senderName: data.senderName || "Your Valentine"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-600 via-pink-500 to-orange-400 flex items-center justify-center p-4 py-16">
            {/* Floating Hearts */}
            {/* Floating Hearts - Optimized */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="absolute text-6xl opacity-15 pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -60, 0],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 6,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    {['💕', '💖', '💗', '💝', '💓'][i % 5]}
                </motion.div>
            ))}

            <div className="relative z-10 max-w-4xl w-full">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 relative group"
                >
                    <div
                        className={`relative inline-block px-12 py-4 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-2xl transition-all border-2 border-transparent hover:border-white/20' : ''}`}
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Heading:", defaultData.heading);
                                if (val) onUpdate?.('heading', val);
                            }
                        }}
                    >
                        <h1 className="text-5xl md:text-8xl font-black text-white drop-shadow-2xl font-romantic gradient-text leading-tight">
                            {defaultData.heading}
                        </h1>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    ✏️ Edit Heading
                                </span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Letter Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                    className="bg-[#fffdf8] rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] p-12 md:p-20 relative overflow-hidden border-2 border-white/50"
                    style={{
                        backgroundImage: `url('https://www.transparenttextures.com/patterns/cardboard.png')`,
                        backgroundBlendMode: 'multiply'
                    }}
                >
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500" />

                    {/* Wax Seal */}
                    <motion.div
                        className="absolute -top-10 right-16 w-24 h-24 bg-gradient-to-br from-rose-600 to-red-800 rounded-full shadow-[0_10px_30px_-5px_rgba(225,29,72,0.5)] flex items-center justify-center text-5xl border-8 border-white z-20 group/seal"
                        animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.2)_100%)] rounded-full" />
                        <span className="relative z-10 drop-shadow-lg">💕</span>
                    </motion.div>

                    {/* Letter Content */}
                    <div className="space-y-12">
                        <div
                            className={`relative group/letter transition-all ${isEditing ? 'cursor-pointer p-8 hover:bg-rose-50/50 rounded-2xl border-2 border-transparent hover:border-rose-200' : ''}`}
                            onClick={() => {
                                if (isEditing) {
                                    const val = prompt("Enter Letter Content:", defaultData.letterContent);
                                    if (val) onUpdate?.('letterContent', val);
                                }
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-2xl md:text-3xl text-gray-800 leading-relaxed font-lovely italic font-bold whitespace-pre-line text-center md:text-left"
                            >
                                {defaultData.letterContent}
                            </motion.div>
                            {isEditing && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-rose-200 shadow-sm">
                                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        ✏️ Edit Letter
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Closing */}
                        <div className="flex flex-col items-end space-y-4">
                            <div
                                className={`relative group/closing transition-all ${isEditing ? 'cursor-pointer px-8 py-2 hover:bg-rose-50/50 rounded-xl border-2 border-transparent hover:border-rose-200' : ''}`}
                                onClick={() => {
                                    if (isEditing) {
                                        const val = prompt("Enter Closing Line:", defaultData.closingLine);
                                        if (val) onUpdate?.('closingLine', val);
                                    }
                                }}
                            >
                                <p className="text-3xl text-gray-700 font-lovely italic font-bold">
                                    {defaultData.closingLine}
                                </p>
                                {isEditing && (
                                    <div className="absolute -top-6 right-0 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-rose-200 shadow-sm">
                                        <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1">
                                            ✏️ Edit
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`relative group/sender transition-all ${isEditing ? 'cursor-pointer px-8 py-4 hover:bg-rose-50/50 rounded-xl border-2 border-transparent hover:border-rose-200' : ''}`}
                                onClick={() => {
                                    if (isEditing) {
                                        const val = prompt("Enter Your Name:", defaultData.senderName);
                                        if (val) onUpdate?.('senderName', val);
                                    }
                                }}
                            >
                                <p className="text-6xl font-romantic text-rose-600 drop-shadow-sm">
                                    {defaultData.senderName} 💖
                                </p>
                                {isEditing && (
                                    <div className="absolute -bottom-6 right-0 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-rose-200 shadow-sm">
                                        <span className="text-[8px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-1">
                                            ✏️ Edit Name
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Decorative Letter Elements */}
                    <div className="absolute -bottom-6 -left-6 text-8xl opacity-10 select-none grayscale group-hover:grayscale-0 transition-all duration-700">💌</div>
                    <div className="absolute -bottom-6 -right-6 text-8xl opacity-10 select-none grayscale group-hover:grayscale-0 transition-all duration-700">✨</div>
                </motion.div>

                {/* Next Button */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex justify-center mt-16"
                >
                    <motion.button
                        onClick={onNext}
                        className="group relative overflow-hidden px-12 py-6 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Final Surprise
                            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Sparkles */}
            {/* Sparkles - Optimized */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-2 h-2 bg-white/40 rounded-full pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity
                    }}
                />
            ))}
        </div>
    );
};

export default Page9FinalMessage;
