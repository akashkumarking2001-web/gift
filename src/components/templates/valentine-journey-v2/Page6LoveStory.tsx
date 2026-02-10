import { motion } from 'framer-motion';
import { useState } from 'react';

interface Page6LoveStoryProps {
    data: {
        heading?: string;
        milestone1Title?: string;
        milestone1Date?: string;
        milestone1Description?: string;
        milestone2Title?: string;
        milestone2Date?: string;
        milestone2Description?: string;
        milestone3Title?: string;
        milestone3Date?: string;
        milestone3Description?: string;
        milestone4Title?: string;
        milestone4Date?: string;
        milestone4Description?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page6LoveStory = ({ data, onNext, isEditing = false, onUpdate }: Page6LoveStoryProps) => {
    const [activeMilestone, setActiveMilestone] = useState<number | null>(null);

    const defaultData = {
        heading: data.heading || "Our Love Story",
        milestone1Title: data.milestone1Title || "First Meeting",
        milestone1Date: data.milestone1Date || "January 2024",
        milestone1Description: data.milestone1Description || "The day our eyes met and everything changed",
        milestone2Title: data.milestone2Title || "First Date",
        milestone2Date: data.milestone2Date || "February 2024",
        milestone2Description: data.milestone2Description || "Coffee turned into hours of conversation",
        milestone3Title: data.milestone3Title || "First Kiss",
        milestone3Date: data.milestone3Date || "March 2024",
        milestone3Description: data.milestone3Description || "Under the stars, a moment I'll never forget",
        milestone4Title: data.milestone4Title || "Together Forever",
        milestone4Date: data.milestone4Date || "Now & Always",
        milestone4Description: data.milestone4Description || "Every day with you is a new adventure"
    };

    const milestones = [
        {
            id: 1,
            title: defaultData.milestone1Title,
            date: defaultData.milestone1Date,
            description: defaultData.milestone1Description,
            emoji: '✨',
            color: 'from-pink-500 to-rose-500'
        },
        {
            id: 2,
            title: defaultData.milestone2Title,
            date: defaultData.milestone2Date,
            description: defaultData.milestone2Description,
            emoji: '☕',
            color: 'from-rose-500 to-orange-500'
        },
        {
            id: 3,
            title: defaultData.milestone3Title,
            date: defaultData.milestone3Date,
            description: defaultData.milestone3Description,
            emoji: '💋',
            color: 'from-orange-500 to-pink-600'
        },
        {
            id: 4,
            title: defaultData.milestone4Title,
            date: defaultData.milestone4Date,
            description: defaultData.milestone4Description,
            emoji: '💕',
            color: 'from-pink-600 to-rose-600'
        }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-600 flex items-center justify-center p-4 py-16">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`bg-${i}`}
                        className="absolute text-7xl"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`
                        }}
                        animate={{
                            rotate: 360,
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            delay: Math.random() * 5,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                    >
                        💕
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-5xl w-full">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24 relative group"
                >
                    <div
                        className={`relative inline-block px-12 py-4 ${isEditing ? 'cursor-pointer hover:bg-white/5 rounded-2xl transition-all' : ''}`}
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
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] bg-black/20 backdrop-blur-md px-3 py-1 rounded-full whitespace-nowrap">Double Click Heading</span>
                            </div>
                        )}
                    </div>
                    <motion.div
                        className="mt-6 text-7xl inline-block"
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    >
                        📖💕
                    </motion.div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <motion.div
                        className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 -translate-x-1/2 hidden md:block"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        style={{ transformOrigin: 'top' }}
                    />

                    {/* Milestones */}
                    <div className="space-y-16 md:space-y-32">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={milestone.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 * index, duration: 0.8, type: 'spring' }}
                                className={`flex items-center gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                onMouseEnter={() => setActiveMilestone(milestone.id)}
                                onMouseLeave={() => setActiveMilestone(null)}
                            >
                                {/* Content Card */}
                                <motion.div
                                    className="flex-1"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className={`bg-white rounded-[2.5rem] shadow-2xl p-10 relative overflow-hidden border-2 border-white/50 ${activeMilestone === milestone.id ? 'ring-8 ring-white/20' : ''} transition-all duration-500`}>
                                        {/* Gradient Background */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />

                                        {/* Content */}
                                        <div className="relative z-10 space-y-4">
                                            {/* Emoji & Date */}
                                            <div className="flex items-center justify-between">
                                                <motion.div
                                                    className="text-7xl drop-shadow-lg"
                                                    animate={{
                                                        rotate: activeMilestone === milestone.id ? [0, -10, 10, 0] : 0,
                                                        scale: activeMilestone === milestone.id ? 1.1 : 1
                                                    }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    {milestone.emoji}
                                                </motion.div>

                                                <div
                                                    className={`group/date relative ${isEditing ? 'cursor-pointer px-4 py-1 hover:bg-pink-50 rounded-lg transition-all' : ''}`}
                                                    onDoubleClick={() => {
                                                        if (isEditing) {
                                                            const val = prompt(`Edit Date for Milestone #${milestone.id}:`, milestone.date);
                                                            if (val) onUpdate?.(`milestone${milestone.id}Date`, val);
                                                        }
                                                    }}
                                                >
                                                    <span className="text-base font-black text-pink-600 tracking-widest uppercase">
                                                        {milestone.date}
                                                    </span>
                                                    {isEditing && (
                                                        <div className="absolute -top-6 right-0 opacity-0 group-hover/date:opacity-100 transition-opacity whitespace-nowrap">
                                                            <span className="text-[8px] font-black text-pink-300 uppercase tracking-widest">Double Click Date</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Title */}
                                            <div
                                                className={`group/title relative ${isEditing ? 'cursor-pointer py-2 hover:bg-pink-50 rounded-xl transition-all' : ''}`}
                                                onDoubleClick={() => {
                                                    if (isEditing) {
                                                        const val = prompt(`Edit Title for Milestone #${milestone.id}:`, milestone.title);
                                                        if (val) onUpdate?.(`milestone${milestone.id}Title`, val);
                                                    }
                                                }}
                                            >
                                                <h3 className="text-4xl font-black text-gray-800 leading-tight">
                                                    {milestone.title}
                                                </h3>
                                                {isEditing && (
                                                    <div className="absolute -top-6 left-0 opacity-0 group-hover/title:opacity-100 transition-opacity whitespace-nowrap">
                                                        <span className="text-[8px] font-black text-pink-300 uppercase tracking-widest">Double Click Title</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Description */}
                                            <div
                                                className={`group/desc relative ${isEditing ? 'cursor-pointer p-4 hover:bg-pink-50 rounded-2xl transition-all' : ''}`}
                                                onDoubleClick={() => {
                                                    if (isEditing) {
                                                        const val = prompt(`Edit Description for Milestone #${milestone.id}:`, milestone.description);
                                                        if (val) onUpdate?.(`milestone${milestone.id}Description`, val);
                                                    }
                                                }}
                                            >
                                                <p className="text-xl text-gray-600 leading-relaxed font-lovely italic">
                                                    "{milestone.description}"
                                                </p>
                                                {isEditing && (
                                                    <div className="absolute -bottom-6 left-0 opacity-0 group-hover/desc:opacity-100 transition-opacity whitespace-nowrap">
                                                        <span className="text-[8px] font-black text-pink-300 uppercase tracking-widest">Double Click Narrative</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Decorative Corner */}
                                        <div className="absolute -bottom-2 -right-2 text-6xl opacity-10 drop-shadow-xl select-none">💖</div>
                                    </div>
                                </motion.div>

                                {/* Center Circle (Timeline Dot) */}
                                <motion.div
                                    className="hidden md:block relative"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2 * index + 0.3, type: 'spring', bounce: 0.6 }}
                                >
                                    <motion.div
                                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${milestone.color} shadow-2xl flex items-center justify-center text-3xl border-4 border-white`}
                                        animate={{
                                            scale: activeMilestone === milestone.id ? 1.3 : 1,
                                            rotate: activeMilestone === milestone.id ? 360 : 0
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {milestone.emoji}
                                    </motion.div>

                                    {/* Pulse Ring */}
                                    {activeMilestone === milestone.id && (
                                        <motion.div
                                            className={`absolute inset-0 rounded-full bg-gradient-to-br ${milestone.color}`}
                                            initial={{ scale: 1, opacity: 0.5 }}
                                            animate={{ scale: 2, opacity: 0 }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                    )}
                                </motion.div>

                                {/* Spacer for opposite side */}
                                <div className="flex-1 hidden md:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Next Button */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    className="flex justify-center mt-24"
                >
                    <motion.button
                        onClick={onNext}
                        className="group relative overflow-hidden px-16 py-8 rounded-[2.5rem] bg-white text-pink-600 font-black text-sm uppercase tracking-[0.4em] shadow-[0_25px_60px_-15px_rgba(255,255,255,0.4)] hover:shadow-[0_35px_80px_-15px_rgba(255,255,255,0.5)] transition-all"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-fuchsia-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                        />
                        <span className="relative z-10 flex items-center gap-4">
                            More Magic awaits
                            <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Floating Hearts */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`float-${i}`}
                    className="absolute text-5xl opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        delay: Math.random() * 5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    💕
                </motion.div>
            ))}

            {/* Sparkles */}
            {[...Array(25)].map((_, i) => (
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

export default Page6LoveStory;
