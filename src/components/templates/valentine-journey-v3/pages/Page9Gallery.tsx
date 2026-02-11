import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize2, ChevronRight, Upload, Sparkles } from 'lucide-react';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page9Gallery: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [isProceeding, setIsProceeding] = useState(false);
    const [showGalleryWhisper, setShowGalleryWhisper] = useState(false);

    const images = data.photos || [
        'https://images.unsplash.com/photo-1511105612620-2c7c32e35a50',
        'https://images.unsplash.com/photo-1516589174184-c6858b16ecb0',
        'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac',
        'https://images.unsplash.com/photo-1494774139091-9e1f5ba4e5b3',
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
        'https://images.unsplash.com/photo-1522673607200-16488346369c'
    ];

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const handleImageUpdate = (index: number, newUrl: string) => {
        const newImages = [...images];
        newImages[index] = newUrl;
        safeUpdate('photos', newImages);
    };

    const handleProceed = () => {
        setIsProceeding(true);
        setTimeout(onNext, 1000);
    };

    return (
        <div className="min-h-screen v3-theme-pink flex flex-col items-center justify-start py-12 md:py-24 px-4 relative overflow-hidden font-romantic">
            <V3Background />

            <div className={`relative z-10 w-full max-w-7xl transition-all duration-1000 ${isProceeding ? 'opacity-0 scale-110 blur-3xl rotate-0' : 'opacity-100 scale-100 blur-0 rotate-0'}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-32"
                >
                    <div
                        onClick={() => setShowGalleryWhisper(!showGalleryWhisper)}
                        className="inline-flex items-center gap-4 bg-pink-500/5 border border-pink-500/10 px-6 py-2 md:px-10 md:py-3 rounded-full mb-8 md:mb-10 shadow-inner backdrop-blur-sm cursor-help relative"
                    >
                        <Camera className="w-5 h-5 md:w-6 md:h-6 text-pink-600/60 animate-pulse" />
                        <V3EditableField
                            value={data.chapterLabel || "chapter viii • the visualization"}
                            onUpdate={(v) => safeUpdate('chapterLabel', v)}
                            isEditing={!!isEditing}
                            label="Chapter"
                        >
                            <span className="text-[11px] md:text-[12px] text-pink-600/60 font-black italic tracking-[0.4em]">
                                {data.chapterLabel || "chapter viii • the visualization"}
                            </span>
                        </V3EditableField>

                        <AnimatePresence>
                            {showGalleryWhisper && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-56 bg-white/90 backdrop-blur-xl p-3 rounded-xl shadow-lg border border-pink-50 z-50 pointer-events-none"
                                >
                                    <p className="text-pink-800 font-romantic italic text-[11px] text-center normal-case">
                                        "A visual echo of every beautiful second we've shared."
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <h2 className="text-4xl md:text-7xl lg:text-9xl font-black text-[#4a041a] tracking-tight mb-4 md:mb-8 leading-[0.9] italic">
                        <V3EditableField
                            value={data.titleLine1 || "Art of"}
                            onUpdate={(v) => safeUpdate('titleLine1', v)}
                            isEditing={!!isEditing}
                        >
                            {data.titleLine1 || "Art of"}
                        </V3EditableField>
                        <br />
                        <V3EditableField
                            value={data.titleLine2 || "Our Story"}
                            onUpdate={(v) => safeUpdate('titleLine2', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="v3-gradient-text block mt-2 md:mt-4">{data.titleLine2 || "Our Story"}</span>
                        </V3EditableField>
                    </h2>
                    <div className="text-pink-900/40 text-[10px] md:text-[11px] font-black tracking-[0.6em] italic animate-pulse mt-8 md:mt-12">
                        <V3EditableField
                            value={data.instruction || "stroll through the visual history"}
                            onUpdate={(v) => safeUpdate('instruction', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="lowercase">{data.instruction || "stroll through the visual history"}</span>
                        </V3EditableField>
                    </div>
                </motion.div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 auto-rows-[250px] md:auto-rows-[350px]">
                    {images.map((img: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
                            className={`group relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] border-2 border-white/60 shadow-lg cursor-pointer bg-white/40 ${i % 4 === 0 ? 'md:row-span-2' : ''
                                } ${i % 5 === 0 ? 'md:col-span-2' : ''}`}
                        >
                            <V3EditableField
                                value={img}
                                onUpdate={(v) => handleImageUpdate(i, v)}
                                isEditing={!!isEditing}
                                type="image"
                                label={`Photo ${i + 1}`}
                                className="w-full h-full"
                            >
                                <img
                                    src={img}
                                    alt="Memory"
                                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ease-out"
                                />
                            </V3EditableField>

                            <div className="absolute inset-0 bg-gradient-to-t from-[#4a041a]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-10 pointer-events-none">
                                <V3EditableField
                                    value={data[`photoTitle${i}`] || "pure moment"}
                                    onUpdate={(v) => safeUpdate(`photoTitle${i}`, v)}
                                    isEditing={!!isEditing}
                                    label="Title"
                                >
                                    <h4 className="text-white font-black text-xl md:text-2xl tracking-tight italic lowercase">
                                        {data[`photoTitle${i}`] || "pure moment"}
                                    </h4>
                                </V3EditableField>
                                <V3EditableField
                                    value={data[`photoMeta${i}`] || "captured in love • 2024"}
                                    onUpdate={(v) => safeUpdate(`photoMeta${i}`, v)}
                                    isEditing={!!isEditing}
                                    label="Meta"
                                >
                                    <p className="text-pink-200/60 text-[10px] md:text-[11px] font-black italic lowercase tracking-widest mt-1">
                                        {data[`photoMeta${i}`] || "captured in love • 2024"}
                                    </p>
                                </V3EditableField>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-24 md:mt-48 text-center"
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
                                value={data.nextButtonText || "vision of future"}
                                onUpdate={(v) => safeUpdate('nextButtonText', v)}
                                isEditing={!!isEditing}
                                label="Btn Name"
                            >
                                {data.nextButtonText || "vision of future"}
                            </V3EditableField>
                            <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700 fill-white" />
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Page9Gallery;
