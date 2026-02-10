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
            {[...Array(25)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="absolute text-6xl opacity-15"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -60, 0],
                        rotate: [0, 360],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 6,
                        delay: Math.random() * 5,
                        repeat: Infinity,
                        ease: 'easeInOut'
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
                        className={`relative inline-block px-12 py-4 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-2xl transition-all' : ''}`}
                        onDoubleClick={() => {
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
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">Double Click Heading</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Letter Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                    className="bg-white/95 backdrop-blur-xl rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] p-12 md:p-20 relative overflow-hidden border-2 border-white/50"
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
                            className={`relative group/letter transition-all ${isEditing ? 'cursor-pointer p-8 hover:bg-rose-50/50 rounded-2xl' : ''}`}
                            onDoubleClick={() => {
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
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/letter:opacity-100 transition-opacity whitespace-nowrap">
                                    <span className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em]">Double Click to Edit Story</span>
                                </div>
                            )}
                        </div>

                        {/* Closing */}
                        <div className="flex flex-col items-end space-y-4">
                            <div
                                className={`relative group/closing transition-all ${isEditing ? 'cursor-pointer px-8 py-2 hover:bg-rose-50/50 rounded-xl' : ''}`}
                                onDoubleClick={() => {
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
                                    <div className="absolute -top-6 right-0 opacity-0 group-hover/closing:opacity-100 transition-opacity whitespace-nowrap">
                                        <span className="text-[8px] font-black text-rose-400 uppercase tracking-widest">Double Click Closing</span>
                                    </div>
                                )}
                            </div>

                            <div
                                className={`relative group/sender transition-all ${isEditing ? 'cursor-pointer px-8 py-4 hover:bg-rose-50/50 rounded-xl' : ''}`}
                                onDoubleClick={() => {
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
                                    <div className="absolute -bottom-6 right-0 opacity-0 group-hover/sender:opacity-100 transition-opacity whitespace-nowrap">
                                        <span className="text-[8px] font-black text-rose-400 uppercase tracking-widest">Double Click Name</span>
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
                        className="group relative overflow-hidden px-16 py-8 rounded-[2.5rem] bg-white text-rose-600 font-black text-sm uppercase tracking-[0.4em] shadow-[0_25px_60px_-15px_rgba(255,255,255,0.4)] hover:shadow-[0_35px_80px_-15px_rgba(255,255,255,0.5)] transition-all"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-orange-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                        />
                        <span className="relative z-10 flex items-center gap-4">
                            Final Surprise
                            <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Sparkles */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-2 h-2 bg-white rounded-full"
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

export default Page9FinalMessage;
