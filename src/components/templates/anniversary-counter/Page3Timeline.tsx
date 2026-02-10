import { motion } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';

interface Page3TimelineProps {
    data: {
        heading?: string;
        milestones?: Array<{
            date: string;
            title: string;
            description: string;
        }>;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page3Timeline = ({ data, onNext, isEditing = false, onUpdate }: Page3TimelineProps) => {
    const defaultData = {
        heading: data.heading || "Our Journey So Far",
        milestones: data.milestones && data.milestones.length > 0 ? data.milestones : [
            { date: "Jan 12, 2023", title: "When We Met", description: "The day my life changed forever." },
            { date: "Feb 14, 2023", title: "First Date", description: "Coffee, laughs, and a lot of nerves." },
            { date: "May 20, 2023", title: "Official", description: "Making it official under the stars." },
            { date: "Jan 01, 2024", title: "New Year", description: "Our first New Year's together." }
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0a08] flex flex-col items-center justify-start p-8 md:p-16 overflow-y-auto scrollbar-hide">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.05)_0%,transparent_60%)]" />

            <div className="relative z-10 w-full max-w-4xl text-center mb-24">
                {/* Heading */}
                <div
                    className={`mb-4 relative group inline-block ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-3 rounded-2xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Heading:", defaultData.heading);
                            if (val !== null) onUpdate?.('heading', val);
                        }
                    }}
                >
                    <h2 className="text-4xl md:text-7xl font-black text-white font-lovely tracking-tight">
                        {defaultData.heading}
                    </h2>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click to Edit Heading</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Vertical Timeline */}
            <div className="relative z-10 w-full max-w-2xl px-4 md:px-0">
                {/* Center Line */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-600 via-amber-600/50 to-transparent" />

                <div className="space-y-24">
                    {defaultData.milestones.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`relative flex flex-col ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'} items-start w-full`}
                        >
                            {/* Node Dot */}
                            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.8)] z-20 border-2 border-black" />

                            <div
                                className={`w-full md:w-[45%] bg-[#1a1a1a]/50 backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] relative group/card hover:border-amber-500/30 transition-all ${isEditing ? 'cursor-pointer' : ''}`}
                                onDoubleClick={() => {
                                    if (isEditing) {
                                        const title = prompt("Edit Title:", item.title);
                                        const date = prompt("Edit Date:", item.date);
                                        const desc = prompt("Edit Description:", item.description);

                                        const newMilestones = [...defaultData.milestones];
                                        newMilestones[index] = {
                                            title: title || item.title,
                                            date: date || item.date,
                                            description: desc || item.description
                                        };
                                        onUpdate?.('milestones', newMilestones);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-3 text-amber-500/80 mb-4">
                                    <Calendar size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{item.date}</span>
                                </div>
                                <h3 className="text-2xl font-black text-white mb-4 font-lovely">{item.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed italic">{item.description}</p>

                                {isEditing && (
                                    <div className="absolute -top-4 right-8 opacity-0 group-hover/card:opacity-100 transition-opacity whitespace-nowrap">
                                        <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">Double Click Card to Edit</span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Add Milestone Button (Editor Only) */}
                    {isEditing && defaultData.milestones.length < 8 && (
                        <div className="flex justify-center">
                            <button
                                onClick={() => {
                                    const title = prompt("Enter Title:");
                                    if (title) {
                                        onUpdate?.('milestones', [...defaultData.milestones, {
                                            title,
                                            date: "New Date",
                                            description: "New Description"
                                        }]);
                                    }
                                }}
                                className="px-8 py-3 bg-amber-600/10 border border-amber-600/30 text-amber-500 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-amber-600/20"
                            >
                                + Add Milestone
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Termination Footer */}
            <div className="relative z-10 w-full max-w-xs mx-auto mt-32 pb-20">
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="w-full py-5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-white font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl shadow-amber-600/30"
                >
                    The Final Vow →
                </motion.button>
            </div>
        </div>
    );
};

export default Page3Timeline;
