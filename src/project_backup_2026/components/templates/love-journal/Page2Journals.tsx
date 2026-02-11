import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Calendar, ShieldCheck, Zap, Sparkles, Star, ChevronRight, Archive, MoveRight, BookOpen, Clock } from 'lucide-react';
import { useState } from 'react';

interface Page2JournalsProps {
    data: {
        entries?: Array<{
            date: string;
            text: string;
        }>;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page2Journals = ({ data, onNext, isEditing = false, onUpdate }: Page2JournalsProps) => {
    const defaultData = {
        entries: data.entries && data.entries.length > 0 ? data.entries : [
            { date: "Oct 12, 2023", text: "Today I realized how much you mean to me. It's the small things, like the way you smile when you're thinking." },
            { date: "Dec 25, 2023", text: "Our first Christmas. I never thought I'd find someone who makes the holidays feel so magical." },
            { date: "Feb 14, 2024", text: "Writing this as I wait for you. Every second feels like a lifetime when you're not here." }
        ]
    };

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0a08] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* HYPER-REALISTIC VINTAGE ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.25, 0.1],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(180,83,9,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(120,53,15,0.1),transparent_50%)]"
                />

                {/* Vintage Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]" />

                {/* Parallax Dust */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-amber-400/20 rounded-full shadow-[0_0_8px_rgba(217,119,6,0.3)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -200, 0], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-20">

                {/* VISUAL STATUS ANCHOR: Archive Index */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-amber-950/10 backdrop-blur-3xl px-14 py-4 rounded-full border border-amber-900/20 shadow-2xl mx-auto isolate"
                >
                    <Archive size={18} className="text-amber-600" />
                    <span className="text-amber-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Archival Index 02 // Memoir Logs</span>
                    <Zap size={18} className="text-amber-600 fill-current animate-pulse" />
                </motion.div>

                {/* THE MEMOIR MANIFEST: High-Fidelity Entry Cards */}
                <div className="w-full max-w-5xl flex flex-col gap-12">
                    {defaultData.entries.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1, delay: index * 0.2, type: "spring", bounce: 0.2 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="group relative"
                        >
                            <div className={`relative p-12 md:p-16 bg-[#1a1410]/80 backdrop-blur-[40px] rounded-[3.5rem] border transition-all duration-700 overflow-hidden isolate ${hoveredIndex === index ? 'border-amber-600/40 shadow-[0_40px_100px_-20px_rgba(180,83,9,0.3)]' : 'border-amber-900/10 shadow-lg'}`}>

                                {/* Hover Glow Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-r from-amber-700/5 via-transparent to-transparent transition-opacity duration-700 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`} />

                                <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-16 items-start">

                                    {/* Date Column */}
                                    <div className="flex flex-col gap-4 min-w-[200px] border-l-2 border-amber-900/20 pl-6 md:pl-8 py-2">
                                        <div className="flex items-center gap-3 text-amber-600/60">
                                            <Calendar size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Entry Date</span>
                                        </div>
                                        <h3 className="text-3xl font-black text-amber-500 font-romantic italic">{item.date}</h3>
                                        <div className="mt-4 flex items-center gap-2 opacity-30">
                                            <Clock size={12} className="text-amber-200" />
                                            <span className="text-[10px] font-mono text-amber-200">LOG_ID: {1000 + index}</span>
                                        </div>
                                    </div>

                                    {/* Content Column */}
                                    <div className="flex-1 space-y-8">
                                        <BookOpen size={24} className="text-amber-700/40" />
                                        <p className="text-2xl md:text-4xl font-romantic leading-snug text-white/90 drop-shadow-lg">
                                            "{item.text}"
                                        </p>
                                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                                            <div className="h-[1px] w-24 bg-amber-500" />
                                            <Star size={12} fill="currentColor" className="text-amber-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* VISUAL & FUNCTIONAL STATUS FOOTER */}
                <div className="relative z-10 w-full max-w-4xl mx-auto pt-10 pb-32 flex flex-col items-center gap-14">

                    {/* Editor Trigger */}
                    {isEditing && (
                        <button
                            onClick={() => {
                                const date = prompt("Chronicle Date:");
                                if (date) onUpdate?.('entries', [...defaultData.entries, { date, text: "A new memory etched in time..." }]);
                            }}
                            className="flex items-center gap-4 px-8 py-4 bg-amber-900/10 border border-amber-800/30 rounded-full text-amber-500 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-amber-900/20 transition-all"
                        >
                            <PenTool size={14} /> Inscribe New Memory
                        </button>
                    )}

                    <motion.button
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="group relative px-28 py-10 bg-[#0d0a08] border-2 border-amber-900/40 rounded-[4rem] text-amber-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_50px_120px_-30px_rgba(180,83,9,0.3)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[380px]"
                    >
                        <div className="absolute inset-0 bg-amber-800 opacity-0 group-hover:opacity-10 transition-opacity" />
                        <span className="relative z-10">Unseal Final Chapter</span>
                        <MoveRight className="relative z-10 w-8 h-8 border-2 border-amber-800/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700" />
                    </motion.button>

                    <div className="flex items-center gap-6 opacity-20">
                        <div className="h-[1px] w-48 bg-white" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Registry: Verified</span>
                        <div className="h-[1px] w-48 bg-white" />
                    </div>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-amber-900 italic">Chronicle</div>
                <div className="h-[1px] w-72 bg-amber-900/40" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1.5em]">LOVE-JOURNAL // V2.02</span>
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

export default Page2Journals;
