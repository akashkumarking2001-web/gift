import { motion } from 'framer-motion';

interface Page1BuildUpProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1BuildUp = ({ data, onNext, isEditing = false, onUpdate }: Page1BuildUpProps) => {
    const defaultData = {
        text: data.text || "Do you know how much I love you?"
    };

    const words = defaultData.text.split(" ");

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0510] flex flex-col items-center justify-center p-8">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)]" />

            <div className="relative z-10 max-w-2xl text-center">
                <div
                    className={`relative group ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-4 rounded-3xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Build-up Text:", defaultData.text);
                            if (val !== null) onUpdate?.('text', val);
                        }
                    }}
                >
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                        {words.map((word, wordIndex) => (
                            <motion.span
                                key={wordIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: wordIndex * 0.2, duration: 0.8 }}
                                className="text-4xl md:text-6xl font-black text-white font-lovely"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </div>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Double Click to Edit</span>
                        </div>
                    )}
                </div>

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: words.length * 0.2 + 0.5 }}
                    onClick={onNext}
                    className="mt-20 group relative px-12 py-5 bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all rounded-full text-white/40 hover:text-white font-black text-[10px] uppercase tracking-[0.4em]"
                >
                    Discover the Truth →
                </motion.button>
            </div>

            {/* Subtle background animations */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-500 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        scale: [1, 2, 1],
                        opacity: [0.1, 0.3, 0.1]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </div>
    );
};

export default Page1BuildUp;
