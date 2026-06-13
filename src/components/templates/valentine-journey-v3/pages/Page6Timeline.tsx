import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, ChevronRight } from 'lucide-react';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';
import RealisticHeart from '../RealisticHeart';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page6Timeline: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [isProceeding, setIsProceeding] = useState(false);
    const [activeNode, setActiveNode] = useState<number | null>(null);

    const events = data.timeline || [
        { date: "Oct 2022", event: "The First Hello", description: "Our first meeting that changed everything." },
        { date: "Dec 2022", event: "A Winter Dream", description: "Walking through the lights together." },
        { date: "Feb 2023", event: "The Big Step", description: "When we decided to build our world together." },
        { date: "Today", event: "Forever Growing", description: "Still falling for you every single second." }
    ];

    const whispers = [
        "A single spark ignited a universe.",
        "Under the frost, our hearts stayed warm.",
        "Choosing you was the easiest decision I ever made.",
        "The best is yet to come, my love."
    ];

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const handleEventUpdate = (index: number, field: string, value: string) => {
        const newEvents = [...events];
        newEvents[index] = { ...newEvents[index], [field]: value };
        safeUpdate('timeline', newEvents);
    };

    const handleProceed = () => {
        setIsProceeding(true);
        setTimeout(onNext, 800);
    };

    return (
        <div className="min-h-screen v3-theme-pink relative overflow-hidden flex flex-col items-center justify-start py-12 md:py-24 px-4 font-romantic">
            <V3Background />

            <div className={`relative z-10 w-full max-w-5xl transition-all duration-1000 ${isProceeding ? 'opacity-0 scale-95 blur-2xl' : 'opacity-100 scale-100 blur-0'}`}>
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-32"
                >
                    <div className="inline-flex items-center gap-4 bg-pink-500/5 border border-pink-500/10 px-6 py-2 md:px-10 md:py-4 rounded-full mb-8 md:mb-12 shadow-inner backdrop-blur-sm">
                        <div className="relative">
                            <RealisticHeart size="48px" />
                        </div>
                        <V3EditableField
                            value={data.chapterLabel || "chapter v • the chronology"}
                            onUpdate={(v) => safeUpdate('chapterLabel', v)}
                            isEditing={!!isEditing}
                            label="Chapter"
                        >
                            <span className="text-[11px] md:text-[12px] text-pink-600/60 font-black italic tracking-[0.4em]">
                                {data.chapterLabel || "chapter v • the chronology"}
                            </span>
                        </V3EditableField>
                    </div>
                    <h2 className="text-4xl md:text-7xl lg:text-9xl font-black text-[#4a041a] tracking-tight leading-[0.9] italic">
                        <V3EditableField
                            value={data.titleLine1 || "Our Cosmic"}
                            onUpdate={(v) => safeUpdate('titleLine1', v)}
                            isEditing={!!isEditing}
                        >
                            {data.titleLine1 || "Our Cosmic"}
                        </V3EditableField>
                        <br />
                        <V3EditableField
                            value={data.titleLine2 || "Journey"}
                            onUpdate={(v) => safeUpdate('titleLine2', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="v3-gradient-text block mt-1 md:mt-4">{data.titleLine2 || "Journey"}</span>
                        </V3EditableField>
                    </h2>
                    <div className="mt-8 md:mt-12 flex justify-center">
                        <motion.div
                            animate={{ y: [0, 15, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="w-[2px] h-16 md:h-24 bg-gradient-to-b from-transparent via-pink-400/20 to-transparent rounded-full"
                        />
                    </div>
                </motion.div>

                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] md:w-[3px] bg-gradient-to-b from-pink-400/40 via-rose-500/10 to-transparent md:-translate-x-1/2 rounded-full" />

                    <div className="space-y-20 md:space-y-32">
                        {events.map((item: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, scale: 0.95 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`relative flex items-center justify-start md:justify-center w-full ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Timeline Node */}
                                <div
                                    onClick={() => setActiveNode(activeNode === i ? null : i)}
                                    className="absolute left-[20px] md:left-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-4 border-pink-400 shadow-lg md:-translate-x-1/2 z-20 flex items-center justify-center cursor-pointer group"
                                >
                                    <div className="w-2 h-2 rounded-full bg-pink-400 group-hover:scale-150 transition-transform animate-pulse" />

                                    {/* node whisper */}
                                    <AnimatePresence>
                                        {activeNode === i && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                                                className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-pink-50 z-50 pointer-events-none"
                                            >
                                                <p className="text-pink-800 font-romantic italic text-sm text-center">
                                                    "{whispers[i % whispers.length]}"
                                                </p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        className="v3-glass-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] border-white/60 relative group bg-white/60 shadow-xl"
                                    >
                                        <V3EditableField
                                            value={item.date}
                                            onUpdate={(v) => handleEventUpdate(i, 'date', v)}
                                            isEditing={!!isEditing}
                                            label="Date"
                                        >
                                            <span className="text-[11px] md:text-[12px] font-black text-pink-600/50 tracking-[0.3em] mb-4 block italic">
                                                {item.date}
                                            </span>
                                        </V3EditableField>

                                        <V3EditableField
                                            value={item.event}
                                            onUpdate={(v) => handleEventUpdate(i, 'event', v)}
                                            isEditing={!!isEditing}
                                            label="Event"
                                        >
                                            <h3 className="text-2xl md:text-4xl font-black text-[#4a041a] mb-4 tracking-tight group-hover:text-pink-600 transition-colors italic">
                                                {item.event}
                                            </h3>
                                        </V3EditableField>

                                        <V3EditableField
                                            value={item.description}
                                            onUpdate={(v) => handleEventUpdate(i, 'description', v)}
                                            isEditing={!!isEditing}
                                            type="textarea"
                                            label="Desc"
                                        >
                                            <p className="text-[#4a041a]/60 text-base md:text-xl leading-relaxed italic font-medium">
                                                "{item.description}"
                                            </p>
                                        </V3EditableField>

                                        <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-10 transition-all duration-700 rotate-12 scale-125">
                                            <Star className="w-8 h-8 text-pink-500 fill-pink-500" />
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 md:mt-40 text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleProceed}
                        className="group relative inline-flex items-center gap-4 px-12 py-6 md:px-14 md:py-7 bg-gradient-to-r from-[#ff4d94] to-[#ff1a75] text-white font-black text-[12px] md:text-[13px] tracking-widest rounded-[2rem] shadow-xl overflow-hidden border-2 border-white/20"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        <span className="relative z-10 flex items-center gap-3 italic font-romantic">
                            <V3EditableField
                                value={data.nextButtonText || "a challenge awaits"}
                                onUpdate={(v) => safeUpdate('nextButtonText', v)}
                                isEditing={!!isEditing}
                                label="Btn Name"
                            >
                                {data.nextButtonText || "a challenge awaits"}
                            </V3EditableField>
                            <Star className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700 fill-white" />
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Page6Timeline;
