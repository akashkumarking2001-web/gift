import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Heart, ShieldCheck, ChevronRight, Star } from 'lucide-react';

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
        heading: data.heading || "The Chronicles of Forever",
        milestones: data.milestones && data.milestones.length > 0 ? data.milestones : [
            { date: "Day 001", title: "Atomic Meeting", description: "The moment our separate universes collided into one." },
            { date: "Week 04", title: "First Resonance", description: "Finding the rhythm that only our hearts could dance to." },
            { date: "Month 06", title: "Eternal Alignment", description: "Deciding that every future sight must include your smile." },
            { date: "Present", title: "The Unfolding", description: "Every morning is a new chapter in a book that never ends." }
        ]
    };

    return (
        <div className="min-h-screen relative overflow-y-auto overflow-x-hidden bg-[#080706] flex flex-col items-center pt-24 pb-40 font-outfit scrollbar-hide">

            {/* Cinematic Background Environment */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(180,130,50,0.1),transparent_60%)]" />
                <div className="absolute inset-0 bg-[#080706]/40 backdrop-blur-[120px]" />

                {/* Floating Gilded Dust */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1.5px] h-[1.5px] bg-amber-400/20 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.4, 0] }}
                        transition={{ duration: 5 + Math.random() * 5, repeat: Infinity }}
                    />
                ))}
            </div>

            {/* Header Section */}
            <div className="relative z-10 text-center mb-32 px-6 max-w-4xl space-y-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-10 py-3 rounded-full border border-white/10"
                >
                    <Calendar size={16} className="text-amber-500" />
                    <span className="text-amber-100/50 font-black uppercase tracking-[0.5em] text-[10px]">The Sacred Timeline</span>
                </motion.div>

                <h1 className="text-5xl md:text-9xl font-black text-white font-romantic leading-tight drop-shadow-2xl">
                    {defaultData.heading}
                </h1>
            </div>

            {/* HIGH-FIDELITY VERTICAL TIMELINE */}
            <div className="relative z-10 w-full max-w-5xl px-8">

                {/* Central High-Gloss Thread */}
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: '100%' }}
                    transition={{ duration: 2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500/0 via-amber-500/30 to-amber-500/0 hidden md:block"
                />

                <div className="space-y-40 relative">
                    {defaultData.milestones.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className={`relative flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center justify-between gap-12`}
                        >
                            {/* Visual Narrative Card */}
                            <div className="flex-1 w-full md:w-[45%] group">
                                <motion.div
                                    whileHover={{ y: -10, filter: "brightness(1.1)" }}
                                    className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/5 p-10 md:p-14 rounded-[4rem] shadow-2xl overflow-hidden isolate transition-all"
                                >
                                    {/* Glass Accents */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] pointer-events-none" />

                                    <div className="space-y-8 relative z-10">
                                        <div className="flex items-center justify-between">
                                            <div className="px-6 py-2 bg-amber-500/10 rounded-full border border-amber-500/20">
                                                <span className="text-amber-400 font-black uppercase tracking-[0.3em] text-[10px]">{item.date}</span>
                                            </div>
                                            <Heart size={18} className="text-white/10 group-hover:text-amber-500/40 transition-colors" />
                                        </div>

                                        <h3 className="text-3xl md:text-5xl font-black text-white font-romantic leading-tight">
                                            {item.title}
                                        </h3>

                                        <p className="text-amber-100/40 text-xl font-lovely italic leading-relaxed">
                                            "{item.description}"
                                        </p>
                                    </div>

                                    {/* High-Gloss Border Reveal */}
                                    <motion.div
                                        className="absolute bottom-0 left-0 h-1 bg-amber-500"
                                        initial={{ width: 0 }}
                                        whileInView={{ width: '100%' }}
                                        transition={{ duration: 1.5 }}
                                    />
                                </motion.div>
                            </div>

                            {/* Chrono Node Dot */}
                            <div className="hidden md:flex relative z-10 w-24 h-24 items-center justify-center">
                                <motion.div
                                    whileInView={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-14 h-14 rounded-full bg-black border-4 border-amber-500/40 flex items-center justify-center text-amber-500 shadow-[0_0_30px_rgba(180,130,50,0.5)]"
                                >
                                    <Star size={20} fill="currentColor" />
                                </motion.div>
                            </div>

                            {/* Alignment Spacer */}
                            <div className="hidden md:block flex-1 w-full md:w-[45%]" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Final Professional Action */}
            <motion.div
                className="mt-40 z-20 flex flex-col items-center gap-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <motion.button
                    onClick={onNext}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-24 py-8 bg-white text-[#0a0805] font-black text-xs uppercase tracking-[0.7em] rounded-[3rem] shadow-[0_50px_100px_rgba(255,255,255,0.1)] flex items-center gap-6"
                >
                    <div className="absolute inset-0 bg-amber-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
                    <span className="relative z-10">Step Into Our Vow</span>
                    <ChevronRight className="relative z-10 w-6 h-6 border-2 border-amber-900 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                </motion.button>

                <div className="flex items-center gap-4 opacity-10">
                    <div className="h-[1px] w-12 bg-white" />
                    <span className="text-[8px] font-black tracking-[1em] uppercase">Infinity Found</span>
                    <div className="h-[1px] w-12 bg-white" />
                </div>
            </motion.div>

        </div>
    );
};

export default Page3Timeline;
