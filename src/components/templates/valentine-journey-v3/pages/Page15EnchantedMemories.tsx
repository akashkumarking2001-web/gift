import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, Sparkles, ChevronRight, Heart } from 'lucide-react';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page15EnchantedMemories: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const [isProceeding, setIsProceeding] = useState(false);
    const images = data.photos || [
        'https://images.unsplash.com/photo-1516589174184-c6858b16ecb0',
        'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac',
        'https://images.unsplash.com/photo-1494774139091-9e1f5ba4e5b3',
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7'
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

            <div className={`relative z-10 w-full max-w-7xl transition-all duration-1000 ${isProceeding ? 'opacity-0 scale-95 blur-3xl' : 'opacity-100'}`}>
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="text-left mb-16 md:mb-24 px-4"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <ImageIcon className="w-8 h-8 text-pink-500" />
                        <span className="text-sm text-pink-600/60 font-black tracking-[0.5em] italic uppercase">chapter xv • enchanted memories</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black text-[#4a041a] tracking-tight leading-[0.85] italic">
                        <V3EditableField
                            value={data.galleryTitle || "Ethereal"}
                            onUpdate={(v) => safeUpdate('galleryTitle', v)}
                            isEditing={!!isEditing}
                        >
                            {data.galleryTitle || "Ethereal"}
                        </V3EditableField>
                        <br />
                        <span className="v3-gradient-text">Glimpses</span>
                    </h2>
                </motion.div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 px-4">
                    {images.map((img: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="break-inside-avoid relative group"
                        >
                            <V3EditableField
                                value={img}
                                onUpdate={(v) => handleImageUpdate(i, v)}
                                isEditing={!!isEditing}
                                type="image"
                                label={`Glimpse ${i + 1}`}
                            >
                                <div className="relative overflow-hidden rounded-[2.5rem] border-2 border-white/60 shadow-2xl bg-white/40 p-3">
                                    <img
                                        src={img}
                                        className="w-full h-full object-cover rounded-[2rem] transition-transform duration-1000 group-hover:scale-105"
                                        alt="Memory"
                                    />
                                    <div className="mt-4 px-4 pb-4">
                                        <p className="text-[#4a041a] font-romantic font-black italic text-lg opacity-60">"captured in our light"</p>
                                    </div>
                                    <div className="absolute top-8 right-8 text-white/40">
                                        <Sparkles className="w-8 h-8 animate-pulse" />
                                    </div>
                                </div>
                            </V3EditableField>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-24 text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            setIsProceeding(true);
                            setTimeout(onNext, 1000);
                        }}
                        className="group relative px-16 py-7 bg-gradient-to-r from-[#ff4d94] to-[#ff1a75] text-white font-black text-[13px] tracking-[0.4em] rounded-full shadow-[0_20px_50px_-10px_rgba(255,77,148,0.5)] overflow-hidden border-2 border-white/20 italic"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                        <span className="relative z-10">THE FINAL THRESHOLD</span>
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Page15EnchantedMemories;
