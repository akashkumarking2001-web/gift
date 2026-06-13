import { motion } from 'framer-motion';

interface Page7TimelineProps {
    data: {
        heading?: string;
        moments?: Array<{
            date: string;
            title: string;
            description: string;
        }>;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page7Timeline = ({ data, onNext, isEditing = false, onUpdate }: Page7TimelineProps) => {
    const defaultData = {
        heading: data.heading || "Every Moment Counts",
        moments: data.moments || [
            { date: "Day 1", title: "First Hello", description: "You smiled and my world lit up" },
            { date: "Week 1", title: "First Laugh", description: "Your laugh became my favorite sound" },
            { date: "Month 1", title: "First Adventure", description: "We explored the city together" },
            { date: "Month 3", title: "First 'I Love You'", description: "Three words that changed everything" },
            { date: "Month 6", title: "First Trip", description: "Creating memories across the world" },
            { date: "Today", title: "Forever Starts", description: "Every day is a new beginning with you" }
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center p-4 py-16">
            {/* Background Animation */}
            {/* Background Animation - Optimized */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`bg-${i}`}
                    className="absolute text-6xl opacity-10 pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -50, 0],
                        rotate: 360
                    }}
                    transition={{
                        duration: 10 + Math.random() * 5,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    ⏰
                </motion.div>
            ))}

            <div className="relative z-10 max-w-6xl w-full">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 relative group"
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
                        <h1 className="text-6xl md:text-9xl font-black text-white drop-shadow-2xl font-romantic gradient-text leading-tight">
                            {defaultData.heading}
                        </h1>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">Double Click Heading</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Timeline Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {defaultData.moments.map((moment, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                                delay: 0.15 * index,
                                duration: 0.8,
                                type: 'spring',
                                bounce: 0.4
                            }}
                            whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
                            className="bg-[#fffdf8] rounded-[2.5rem] shadow-2xl p-8 relative overflow-hidden group/card border-2 border-white/50"
                            style={{
                                backgroundImage: `url('https://www.transparenttextures.com/patterns/cardboard.png')`,
                                backgroundBlendMode: 'multiply'
                            }}
                        >
                            {/* Gradient Accent */}
                            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500" />

                            {/* Date Badge */}
                            <div
                                className={`group/date relative inline-block mb-6 ${isEditing ? 'cursor-pointer px-4 py-1 hover:bg-purple-50 rounded-lg transition-all' : ''}`}
                                onDoubleClick={() => {
                                    if (isEditing) {
                                        const val = prompt(`Edit Moment #${index + 1} Date:`, moment.date);
                                        if (val) {
                                            const newMoments = [...defaultData.moments];
                                            newMoments[index] = { ...newMoments[index], date: val };
                                            onUpdate?.('moments', newMoments);
                                        }
                                    }
                                }}
                            >
                                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-lg block">
                                    {moment.date}
                                </span>
                                {isEditing && (
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/date:opacity-100 transition-opacity whitespace-nowrap">
                                        <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">Double Click Date</span>
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <div
                                className={`group/title relative mb-4 ${isEditing ? 'cursor-pointer py-1 hover:bg-purple-50 rounded-xl transition-all' : ''}`}
                                onDoubleClick={() => {
                                    if (isEditing) {
                                        const val = prompt(`Edit Moment #${index + 1} Title:`, moment.title);
                                        if (val) {
                                            const newMoments = [...defaultData.moments];
                                            newMoments[index] = { ...newMoments[index], title: val };
                                            onUpdate?.('moments', newMoments);
                                        }
                                    }
                                }}
                            >
                                <h3 className="text-3xl font-black text-gray-800 leading-tight">
                                    {moment.title}
                                </h3>
                                {isEditing && (
                                    <div className="absolute -top-6 left-0 opacity-0 group-hover/title:opacity-100 transition-opacity whitespace-nowrap">
                                        <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">Double Click Title</span>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            <div
                                className={`group/desc relative ${isEditing ? 'cursor-pointer p-4 hover:bg-purple-50 rounded-2xl transition-all' : ''}`}
                                onDoubleClick={() => {
                                    if (isEditing) {
                                        const val = prompt(`Edit Moment #${index + 1} Narrative:`, moment.description);
                                        if (val) {
                                            const newMoments = [...defaultData.moments];
                                            newMoments[index] = { ...newMoments[index], description: val };
                                            onUpdate?.('moments', newMoments);
                                        }
                                    }
                                }}
                            >
                                <p className="text-xl text-gray-600 leading-relaxed font-lovely italic font-bold">
                                    "{moment.description}"
                                </p>
                                {isEditing && (
                                    <div className="absolute -bottom-6 left-0 opacity-0 group-hover/desc:opacity-100 transition-opacity whitespace-nowrap">
                                        <span className="text-[8px] font-black text-purple-400 uppercase tracking-widest">Double Click Narrative</span>
                                    </div>
                                )}
                            </div>

                            {/* Decorative Heart */}
                            <motion.div
                                className="absolute -bottom-4 -right-4 text-7xl opacity-10 drop-shadow-xl select-none grayscale group-hover/card:grayscale-0 transition-all duration-500"
                                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                💕
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Next Button */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex justify-center"
                >
                    <motion.button
                        onClick={onNext}
                        className="group relative overflow-hidden px-12 py-6 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Keep Exploring
                            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Page7Timeline;
