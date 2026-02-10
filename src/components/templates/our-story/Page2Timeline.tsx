import { motion } from 'framer-motion';
import { BookOpen, Calendar } from 'lucide-react';

interface Page2TimelineProps {
    data: {
        milestones?: Array<{
            date: string;
            title: string;
            text: string;
        }>;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page2Timeline = ({ data, onNext, isEditing = false, onUpdate }: Page2TimelineProps) => {
    const defaultData = {
        milestones: data.milestones && data.milestones.length > 0 ? data.milestones : [
            { date: "Day 1", title: "The Encounter", text: "Where it all began. The spark was immediate." },
            { date: "Month 3", title: "Deepening Roots", text: "Late night talks and shared dreams." },
            { date: "Year 1", title: "Milestone One", text: "Building a foundation that lasts." }
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0515] flex flex-col items-center justify-start p-8 md:p-16 overflow-y-auto scrollbar-hide">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-900/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-violet-900/10 blur-[150px] rounded-full" />

            <div className="relative z-10 w-full max-w-4xl text-center mb-24">
                <div className="flex justify-center mb-8">
                    <BookOpen className="text-indigo-400 opacity-30 w-16 h-16" />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-[0.5em] opacity-40">The Chapters</h2>
            </div>

            {/* Horizontal-style Timeline Cards (Stacking) */}
            <div className="relative z-10 w-full max-w-2xl px-4 md:px-0 space-y-12">
                {defaultData.milestones.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className={`group relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 md:p-12 shadow-2xl hover:border-indigo-500/30 transition-all ${isEditing ? 'cursor-pointer' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const title = prompt("Edit Chapter Title:", item.title);
                                const date = prompt("Edit Date/Phase:", item.date);
                                const text = prompt("Edit Story Detail:", item.text);

                                const newMilestones = [...defaultData.milestones];
                                newMilestones[index] = {
                                    title: title || item.title,
                                    date: date || item.date,
                                    text: text || item.text
                                };
                                onUpdate?.('milestones', newMilestones);
                            }
                        }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <Calendar size={16} className="text-indigo-500" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400/60">{item.date}</span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-black text-white mb-6 font-lovely">{item.title}</h3>
                        <p className="text-white/40 text-sm md:text-lg leading-relaxed italic">{item.text}</p>

                        {/* Card Decorative Counter */}
                        <div className="absolute top-10 right-10 text-8xl font-black text-white/5 select-none pointer-events-none">
                            0{index + 1}
                        </div>

                        {isEditing && (
                            <div className="absolute -top-4 right-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full">Double Click to Edit Chapter</span>
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Add Chapter (Editor Only) */}
                {isEditing && defaultData.milestones.length < 6 && (
                    <div className="flex justify-center pt-8">
                        <button
                            onClick={() => {
                                const title = prompt("Enter Chapter Title:");
                                if (title) {
                                    onUpdate?.('milestones', [...defaultData.milestones, {
                                        title,
                                        date: "Future Chapter",
                                        text: "The story continues..."
                                    }]);
                                }
                            }}
                            className="px-10 py-4 bg-indigo-600/10 border border-indigo-500/30 text-indigo-400 rounded-full font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-600/20"
                        >
                            + Add New Chapter
                        </button>
                    </div>
                )}
            </div>

            {/* Termination Footer */}
            <div className="relative z-10 w-full max-w-xs mx-auto mt-32 pb-20">
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="w-full py-5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full text-white font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl shadow-indigo-600/30"
                >
                    Visual Journey →
                </motion.button>
            </div>
        </div>
    );
};

export default Page2Timeline;
