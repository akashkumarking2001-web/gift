import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Sparkles, ChevronRight, Heart } from 'lucide-react';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page13WhispersOfUs: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [isProceeding, setIsProceeding] = useState(false);
    const images = data.photos || [
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7',
        'https://images.unsplash.com/photo-1522673607200-16488346369c',
        'https://images.unsplash.com/photo-1511105612620-2c7c32e35a50'
    ];

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const handleImageUpdate = (index: number, newUrl: string) => {
        const newImages = [...images];
        newImages[index] = newUrl;
        safeUpdate('photos', newImages);
    };

    return (
        <div className="min-h-screen v3-theme-pink flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden font-romantic">
            <V3Background />

            <div className={`relative z-10 w-full max-w-7xl transition-all duration-1000 ${isProceeding ? 'opacity-0 scale-150 blur-3xl' : 'opacity-100'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-8 border border-white/20">
                        <Camera className="w-5 h-5 text-pink-500" />
                        <span className="text-[10px] text-pink-600/60 font-black tracking-[0.4em] italic uppercase">whispers of us • gallery i</span>
                    </div>
                    <h2 className="text-4xl md:text-7xl font-black text-[#4a041a] tracking-tighter italic leading-[0.9]">
                        <V3EditableField
                            value={data.headingLine1 || "Soulful"}
                            onUpdate={(v) => safeUpdate('headingLine1', v)}
                            isEditing={!!isEditing}
                        >
                            {data.headingLine1 || "Soulful"}
                        </V3EditableField>
                        <br />
                        <V3EditableField
                            value={data.headingLine2 || "Attachments"}
                            onUpdate={(v) => safeUpdate('headingLine2', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="v3-gradient-text">{data.headingLine2 || "Attachments"}</span>
                        </V3EditableField>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {images.map((img: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? -2 : 2 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
                            className="relative aspect-[3/4] group"
                        >
                            <div className="absolute inset-0 bg-white/40 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity" />
                            <V3EditableField
                                value={img}
                                onUpdate={(v) => handleImageUpdate(i, v)}
                                isEditing={!!isEditing}
                                type="image"
                                label={`Attachment ${i + 1}`}
                                className="w-full h-full"
                            >
                                <div className="w-full h-full p-4 bg-white/90 rounded-[3rem] shadow-2xl border-4 border-white overflow-hidden relative">
                                    <img src={img} className="w-full h-full object-cover rounded-[2.2rem]" alt="Memory" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#4a041a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                                        <Heart className="text-white fill-white w-8 h-8 md:w-10 md:h-10 mb-2" />
                                        <p className="text-white font-romantic font-black italic text-xl">forever framing</p>
                                    </div>
                                </div>
                            </V3EditableField>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setIsProceeding(true);
                            setTimeout(onNext, 1000);
                        }}
                        className="px-10 py-5 bg-[#4a041a] text-white font-black text-[12px] tracking-[0.3em] rounded-full border-2 border-white/20 shadow-xl italic"
                    >
                        THE JOURNEY DEEPENS
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Page13WhispersOfUs;
