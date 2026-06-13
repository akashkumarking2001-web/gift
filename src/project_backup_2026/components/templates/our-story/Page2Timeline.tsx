import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ShieldCheck, Zap, Sparkles, Star, MoveRight, Layers, Workflow, Clock } from 'lucide-react';

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
        <div className="min-h-screen relative overflow-hidden bg-[#02020a] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* HYPER-REALISTIC CELESTIAL ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_60%)]"
                />

                {/* Constellation Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.1)_1px,transparent_1px)] bg-[size:60px_60px] opacity-10 pointer-events-none perspective-[1000px] rotate-x-60" />

                {/* Parallax Star Dust */}
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-indigo-300/30 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -150, 0], opacity: [0, 0.7, 0] }}
                        transition={{ duration: 6 + Math.random() * 8, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-indigo-950/20 backdrop-blur-3xl px-14 py-4 rounded-full border border-indigo-900/30 shadow-2xl mx-auto isolate"
                >
                    <Workflow size={16} className="text-indigo-400" />
                    <span className="text-indigo-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Temporal Sequence // Validated</span>
                    <Zap size={16} className="text-indigo-400 fill-current animate-pulse" />
                </motion.div>

                {/* THE CHAPTERS HEADER */}
                <div className="space-y-12 text-center max-w-6xl font-romantic">
                    <h2 className="text-5xl md:text-[8rem] font-black text-white leading-tight tracking-[0.02em] px-4 drop-shadow-[0_0_40px_rgba(99,102,241,0.4)] italic">
                        The Chapters
                    </h2>
                    <div className="h-[2px] w-[30rem] bg-gradient-to-r from-transparent via-indigo-800/60 to-transparent mx-auto" />
                </div>

                {/* HIGH-FIDELITY CONSTELLATION SEQUENCE */}
                <div className="relative w-full max-w-5xl space-y-24 pb-48">

                    {/* Connecting Line */}
                    <div className="absolute left-[3rem] md:left-1/2 top-20 bottom-20 w-[2px] bg-gradient-to-b from-transparent via-indigo-900/50 to-transparent -translate-x-1/2 z-0" />

                    {defaultData.milestones.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Content Node */}
                            <div className="flex-1 w-full">
                                <div className="group relative bg-[#0a0a15]/80 backdrop-blur-3xl border border-indigo-800/30 rounded-[3rem] p-10 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden isolate hover:border-indigo-500/50 transition-colors duration-500">
                                    {/* Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <div className="relative z-10 space-y-6">
                                        <div className="flex items-center gap-4 text-indigo-400 opacity-60">
                                            <Calendar size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">{item.date}</span>
                                        </div>
                                        <h3 className="text-2xl md:text-4xl font-black text-white font-romantic leading-tight">{item.title}</h3>
                                        <p className="text-indigo-200/60 text-lg leading-[1.6] italic font-romantic tracking-wide">
                                            "{item.text}"
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Central Star Node */}
                            <div className="relative z-10 shrink-0">
                                <div className="w-24 h-24 bg-[#0a0a15] rounded-full border-2 border-indigo-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                                    <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(99,102,241,1)]" />
                                    <div className="absolute inset-0 border border-dashed border-indigo-800/40 rounded-full animate-[spin_10s_linear_infinite]" />
                                </div>
                            </div>

                            {/* Empty spacer for alignment */}
                            <div className="flex-1 hidden md:block" />

                        </motion.div>
                    ))}

                    {/* Editor Action Unit */}
                    {isEditing && (
                        <motion.div whileHover={{ scale: 1.05 }} className="pt-12 flex justify-center relative z-20">
                            <button
                                onClick={() => {
                                    const title = prompt("Star System Name:");
                                    if (title) onUpdate?.('milestones', [...defaultData.milestones, { title, date: "Future Event", text: "Recording starlight..." }]);
                                }}
                                className="group px-12 py-5 bg-indigo-950/40 backdrop-blur-xl border border-indigo-600/30 rounded-full text-indigo-300 font-black text-xs uppercase tracking-[0.6em] hover:bg-indigo-900/50 shadow-2xl transition-all flex items-center gap-4"
                            >
                                <Sparkles size={16} className="text-indigo-400 group-hover:rotate-180 transition-transform duration-700" />
                                Chart New Star
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* PROFESSIONAL TACTICAL ACTION */}
                <div className="relative z-10 w-full max-w-4xl mx-auto pb-32 flex flex-col items-center gap-14">
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-28 py-10 bg-[#02020a] border border-indigo-900/40 rounded-[4rem] text-indigo-400 font-black text-xs uppercase tracking-[0.8em] shadow-[0_50px_100px_-20px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[420px]"
                    >
                        <div className="absolute inset-0 bg-indigo-900 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                        <span className="relative z-10">Proceed To Visuals</span>
                        <MoveRight className="relative z-10 w-8 h-8 border border-indigo-800/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700" />
                    </motion.button>

                    <div className="flex flex-col items-center gap-6 opacity-20">
                        <div className="h-[1px] w-[40rem] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-indigo-300">Space-Time: Synchronized</span>
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 left-12 flex flex-col items-start gap-4 opacity-15">
                <div className="font-romantic text-8xl text-indigo-900 italic">Epics</div>
                <div className="h-[1px] w-72 bg-indigo-900/40" />
                <span className="text-[10px] font-black tracking-widest text-indigo-200 uppercase tracking-[1.5em]">TIMELINE-VIEW // V5.02</span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />

        </div>
    );
};

export default Page2Timeline;
