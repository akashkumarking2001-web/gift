import { motion } from 'framer-motion';
import { Heart, ChevronRight, Star, Sparkles, MapPin } from 'lucide-react';

const Page4Timeline = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    const defaultMilestones = data.milestones || [
        { title: "The Encounter", date: "The Beginning", description: "The day our paths finally crossed and everything changed.", icon: '🤝' },
        { title: "First Real Chat", date: "Deep Connection", description: "Hours felt like seconds as we discovered each other's worlds.", icon: '💬' },
        { title: "Today", date: "Living the Dream", description: "Still discovering new things to love about you every single day.", icon: '✨' }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#faf7f2] flex flex-col items-center justify-start py-24 px-8 font-serif select-none isolate">

            {/* Sketch Grid Overlay */}
            <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-5 pointer-events-none" />

            <div className="relative z-10 w-full max-w-4xl">

                {/* Header */}
                <div className="text-center mb-32 space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-3 text-rose-400 font-bold uppercase tracking-[0.5em] text-[10px]"
                    >
                        <Heart size={14} className="animate-pulse" />
                        <span>Our Sketch of Time</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-8xl font-black text-[#1e293b] font-serif leading-tight">Our Journey</h2>
                </div>

                {/* TIMELINE TRACK */}
                <div className="relative">
                    {/* Central Hand-drawn Looking Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-rose-100 -translate-x-1/2 -z-10" />

                    <div className="space-y-40">
                        {defaultMilestones.map((milestone: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                                className={`relative flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* DATE TAG (Side) */}
                                <div className="hidden md:block w-[40%] text-center">
                                    <div className="text-[10px] font-bold uppercase tracking-[0.8em] text-[#94a3b8] mb-2">{milestone.date}</div>
                                    <div className="h-[1px] w-12 bg-[#e5e7eb] mx-auto" />
                                </div>

                                {/* CENTER ORNAMENT */}
                                <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white border-4 border-rose-50 rounded-full flex items-center justify-center text-3xl shadow-xl z-10">
                                        {milestone.icon}
                                    </div>
                                    <div className="absolute inset-[-10px] bg-rose-100/30 rounded-full blur-xl -z-10 animate-pulse" />
                                </div>

                                {/* CONTENT CARD */}
                                <div className="w-full md:w-[40%]">
                                    <div
                                        className="bg-white/60 backdrop-blur-md border-2 border-white rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative group hover:shadow-2xl transition-all cursor-pointer"
                                        onClick={() => {
                                            if (isEditing) {
                                                const title = prompt("Edit Milestone Title:", milestone.title);
                                                const date = prompt("Edit Milestone Date:", milestone.date);
                                                const desc = prompt("Edit Milestone Description:", milestone.description);
                                                if (title && date && desc) {
                                                    const newMilestones = [...defaultMilestones];
                                                    newMilestones[i] = { ...milestone, title, date, description: desc };
                                                    onUpdate?.('milestones', newMilestones);
                                                }
                                            }
                                        }}
                                    >
                                        <div className="md:hidden text-[8px] font-bold uppercase tracking-[0.4em] text-rose-400 mb-4">{milestone.date}</div>
                                        <h3 className="text-2xl md:text-3xl font-black text-[#1e293b] font-serif mb-6 group-hover:text-rose-500 transition-colors">{milestone.title}</h3>
                                        <p className="text-[#64748b] leading-relaxed font-medium italic">"{milestone.description}"</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Final Button */}
                <div className="mt-40 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-20 py-8 bg-[#1e293b] text-white font-bold text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl flex items-center gap-6"
                    >
                        Fragmented Memories <ChevronRight size={18} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default Page4Timeline;
