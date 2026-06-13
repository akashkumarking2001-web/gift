import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Home, Heart, Sparkles, ChevronRight, Globe, Stars } from 'lucide-react';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page10Future: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [activeDream, setActiveDream] = useState<number | null>(null);
    const [isProceeding, setIsProceeding] = useState(false);
    const [showDreamWhisper, setShowDreamWhisper] = useState(false);

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const dreams = data.dreams || [
        { id: 1, title: "Global Adventures", icon: Globe, desc: "Exploring every corner of the earth with you by my side." },
        { id: 2, title: "Our Sanctuary", icon: Home, desc: "Building a space filled with laughter, peace, and our story." },
        { id: 3, title: "Eternal Growth", icon: Sparkles, desc: "Becoming the best versions of ourselves together." },
        { id: 4, title: "Unconditional Love", icon: Heart, desc: "A promise that only gets stronger with every sunrise." }
    ];

    const handleDreamUpdate = (index: number, field: string, value: string) => {
        const newDreams = [...dreams];
        newDreams[index] = { ...newDreams[index], [field]: value };
        safeUpdate('dreams', newDreams);
    };

    const handleProceed = () => {
        setIsProceeding(true);
        setTimeout(onNext, 1000);
    };

    return (
        <div className="min-h-screen v3-theme-pink flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden font-romantic px-4">
            <V3Background />

            <div className={`relative z-10 w-full max-w-6xl transition-all duration-1000 ${isProceeding ? 'opacity-0 scale-150 rotate-6 blur-3xl' : 'opacity-100 scale-100 rotate-0 blur-0'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div
                        onClick={() => setShowDreamWhisper(!showDreamWhisper)}
                        className="inline-flex items-center gap-4 bg-pink-500/5 border border-pink-500/10 px-6 py-2 md:px-8 md:py-3 rounded-full mb-8 md:mb-10 shadow-inner backdrop-blur-sm cursor-help relative"
                    >
                        <Plane className="w-5 h-5 md:w-6 md:h-6 text-pink-600/60 animate-pulse" />
                        <V3EditableField
                            value={data.chapterLabel || "chapter ix • the vision"}
                            onUpdate={(v) => safeUpdate('chapterLabel', v)}
                            isEditing={!!isEditing}
                            label="Chapter"
                        >
                            <span className="text-[11px] md:text-[12px] text-pink-600/60 font-black italic tracking-[0.4em]">
                                {data.chapterLabel || "chapter ix • the vision"}
                            </span>
                        </V3EditableField>

                        <AnimatePresence>
                            {showDreamWhisper && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-56 bg-white/90 backdrop-blur-xl p-3 rounded-xl shadow-lg border border-pink-50 z-50 pointer-events-none"
                                >
                                    <p className="text-pink-800 font-romantic italic text-[11px] text-center normal-case">
                                        "Every dream of mine starts and ends with you."
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <h2 className="text-4xl md:text-7xl lg:text-9xl font-black text-[#4a041a] tracking-tight leading-[0.9] mb-4 md:mb-8 italic">
                        <V3EditableField
                            value={data.titleLine1 || "The Future"}
                            onUpdate={(v) => safeUpdate('titleLine1', v)}
                            isEditing={!!isEditing}
                        >
                            {data.titleLine1 || "The Future"}
                        </V3EditableField>
                        <br />
                        <V3EditableField
                            value={data.titleLine2 || "We Build"}
                            onUpdate={(v) => safeUpdate('titleLine2', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="v3-gradient-text block mt-2 md:mt-4">{data.titleLine2 || "We Build"}</span>
                        </V3EditableField>
                    </h2>
                    <div className="text-pink-900/40 text-[10px] md:text-[11px] font-black tracking-[0.6em] italic animate-pulse mt-8 md:mt-12">
                        <V3EditableField
                            value={data.instruction || "choose a dream to plant it in our story"}
                            onUpdate={(v) => safeUpdate('instruction', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="lowercase">{data.instruction || "choose a dream to plant it in our story"}</span>
                        </V3EditableField>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 auto-rows-fr">
                    {dreams.map((dream: any, i: number) => {
                        const isActive = activeDream === dream.id || isEditing;
                        const Icon = dream.icon || Sparkles;

                        return (
                            <motion.div
                                key={dream.id}
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                onClick={() => !isEditing && setActiveDream(dream.id)}
                                className={`group relative h-full flex flex-col justify-center p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] border-2 md:border-4 transition-all duration-700 cursor-pointer overflow-hidden min-h-[200px] md:min-h-[300px] shadow-lg ${isActive
                                    ? 'bg-white/90 border-pink-200 shadow-2xl z-20 scale-[1.02]'
                                    : 'bg-white/40 border-white/60 hover:border-pink-200 hover:bg-white/60'
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 text-center md:text-left text-[#4a041a]">
                                    <div className={`w-20 h-20 md:w-28 md:h-28 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center transition-all duration-700 ${isActive ? 'bg-gradient-to-br from-[#ff4d94] to-[#ff1a75] text-white shadow-xl rotate-6' : 'bg-pink-100 text-pink-400 group-hover:rotate-6'
                                        }`}>
                                        <Icon className="w-8 h-8 md:w-12 md:h-12" />
                                    </div>
                                    <div className="flex-1">
                                        <V3EditableField
                                            value={dream.title}
                                            onUpdate={(v) => handleDreamUpdate(i, 'title', v)}
                                            isEditing={!!isEditing}
                                            label="Title"
                                        >
                                            <h3 className={`text-xl md:text-4xl font-black mb-2 md:mb-4 transition-colors duration-700 tracking-tight italic ${isActive ? 'text-[#4a041a]' : 'text-[#4a041a]/30'}`}>
                                                {dream.title}
                                            </h3>
                                        </V3EditableField>
                                        <AnimatePresence mode="wait">
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    className="w-full"
                                                >
                                                    <V3EditableField
                                                        value={dream.desc}
                                                        onUpdate={(v) => handleDreamUpdate(i, 'desc', v)}
                                                        isEditing={!!isEditing}
                                                        type="textarea"
                                                        label="Desc"
                                                    >
                                                        <p className="text-[#4a041a]/70 text-base md:text-xl leading-relaxed italic font-medium normal-case">
                                                            "{dream.desc}"
                                                        </p>
                                                    </V3EditableField>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-pink-500/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </motion.div>
                        );
                    })}
                </div>

                <AnimatePresence>
                    {(activeDream !== null || isEditing) && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="mt-16 md:mt-32 text-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleProceed}
                                className="group relative inline-flex items-center gap-4 px-12 py-6 md:px-14 md:py-7 bg-gradient-to-r from-[#ff4d94] to-[#ff1a75] text-white font-black text-[12px] md:text-[13px] tracking-widest rounded-[2rem] shadow-xl overflow-hidden border-2 border-white/20"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                                <span className="relative z-10 flex items-center gap-3 italic font-romantic font-black">
                                    <V3EditableField
                                        value={data.nextButtonText || "the final breath"}
                                        onUpdate={(v) => safeUpdate('nextButtonText', v)}
                                        isEditing={!!isEditing}
                                        label="Btn Name"
                                    >
                                        {data.nextButtonText || "the final breath"}
                                    </V3EditableField>
                                    <Stars className="w-5 h-5 group-hover:rotate-180 transition-transform duration-1000 fill-white" />
                                </span>
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Page10Future;
