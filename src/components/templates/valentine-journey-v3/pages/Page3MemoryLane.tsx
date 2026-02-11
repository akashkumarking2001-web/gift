import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, Sparkles, Heart } from 'lucide-react';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';
import RealisticHeart from '../RealisticHeart';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page3MemoryLane: React.FC<PageProps> = ({ data, onNext, isEditing, onUpdate }) => {
    const images = data.photos || data.images || [
        'https://images.unsplash.com/photo-1511105612620-2c7c32e35a50',
        'https://images.unsplash.com/photo-1516589174184-c6858b16ecb0',
        'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac'
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isProceeding, setIsProceeding] = useState(false);
    const [heartbeatIndex, setHeartbeatIndex] = useState<number | null>(null);

    const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const handleProceed = () => {
        setIsProceeding(true);
        setTimeout(onNext, 1000);
    };

    return (
        <div className="min-h-screen v3-theme-pink flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden font-romantic px-4">
            <V3Background />

            <div className={`relative z-10 w-full max-w-7xl transition-all duration-1000 ${isProceeding ? 'opacity-0 scale-150 blur-3xl' : 'opacity-100 scale-100 blur-0'}`}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-24"
                >
                    <div className="inline-flex items-center gap-3 bg-pink-500/5 border border-pink-500/10 px-6 py-2 md:px-8 md:py-3 rounded-full mb-6 md:mb-10 shadow-inner">
                        <Camera className="w-5 h-5 md:w-6 md:h-6 text-pink-600 animate-pulse" />
                        <V3EditableField
                            value={data.chapterLabel || "chapter ii • immersive memoirs"}
                            onUpdate={(v) => safeUpdate('chapterLabel', v)}
                            isEditing={!!isEditing}
                            label="Chapter"
                        >
                            <span className="text-[10px] md:text-[12px] text-pink-600 tracking-[0.4em] font-black italic">
                                {data.chapterLabel || "chapter ii • immersive memoirs"}
                            </span>
                        </V3EditableField>
                    </div>
                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-[#4a041a] tracking-tight leading-[0.9] mb-4 md:mb-8 italic">
                        <V3EditableField
                            value={data.titleLine1 || "Memory"}
                            onUpdate={(v) => safeUpdate('titleLine1', v)}
                            isEditing={!!isEditing}
                        >
                            {data.titleLine1 || "Memory"}
                        </V3EditableField>
                        <br />
                        <V3EditableField
                            value={data.titleLine2 || "Hall"}
                            onUpdate={(v) => safeUpdate('titleLine2', v)}
                            isEditing={!!isEditing}
                        >
                            <span className="v3-gradient-text block mt-2 md:mt-4">{data.titleLine2 || "Hall"}</span>
                        </V3EditableField>
                    </h2>
                    <div className="text-pink-900/50 mt-6 md:mt-10 max-w-2xl mx-auto text-base md:text-2xl lg:text-3xl font-romantic italic font-black tracking-tight leading-relaxed px-4">
                        <V3EditableField
                            value={data.description || "Each frame is a heartbeat captured in time. Scroll through the sanctuary of our history."}
                            onUpdate={(v) => safeUpdate('description', v)}
                            isEditing={!!isEditing}
                            type="textarea"
                            label="Desc"
                        >
                            "{data.description || "Each frame is a heartbeat captured in time. Scroll through the sanctuary of our history."}"
                        </V3EditableField>
                    </div>
                </motion.div>

                {/* Cinematic 3D Carousel - Perfectly scaled */}
                <div className="relative h-[450px] md:h-[650px] lg:h-[800px] w-full flex items-center justify-center pointer-events-none perspective-1000">
                    <AnimatePresence mode="popLayout">
                        {images.map((img: string, i: number) => {
                            const depth = (i - currentIndex + images.length) % images.length;
                            const isVisible = depth === 0 || depth === 1 || depth === images.length - 1;
                            if (!isVisible) return null;

                            let xOffset = 0;
                            let zIndex = 0;
                            let scale = 0;
                            let opacity = 0;
                            let rotate = 0;

                            if (depth === 0) {
                                zIndex = 50;
                                scale = 1;
                                opacity = 1;
                                xOffset = 0;
                            } else if (depth === 1) {
                                zIndex = 30;
                                scale = 0.75;
                                opacity = 0.25;
                                xOffset = typeof window !== 'undefined' && window.innerWidth > 768 ? 400 : 150;
                                rotate = 12;
                            } else {
                                zIndex = 30;
                                scale = 0.75;
                                opacity = 0.25;
                                xOffset = typeof window !== 'undefined' && window.innerWidth > 768 ? -400 : -150;
                                rotate = -12;
                            }

                            return (
                                <motion.div
                                    key={img + i}
                                    initial={{ opacity: 0, scale: 0.5, x: xOffset }}
                                    animate={{
                                        opacity,
                                        scale,
                                        x: xOffset,
                                        rotateY: rotate,
                                        z: zIndex * 2,
                                        filter: depth === 0 ? "blur(0px)" : "blur(8px)"
                                    }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ type: "spring", stiffness: 90, damping: 18 }}
                                    className="absolute w-[280px] md:w-[480px] lg:w-[600px] aspect-[4/5] pointer-events-auto"
                                    style={{ zIndex }}
                                >
                                    <V3EditableField
                                        value={img}
                                        onUpdate={(v) => {
                                            const newImages = [...images];
                                            newImages[i] = v;
                                            safeUpdate('photos', newImages);
                                        }}
                                        isEditing={!!isEditing}
                                        type="image"
                                        label="Replace Memory"
                                        className="h-full"
                                    >
                                        <div
                                            onMouseDown={() => setHeartbeatIndex(i)}
                                            onMouseUp={() => setHeartbeatIndex(null)}
                                            onMouseLeave={() => setHeartbeatIndex(null)}
                                            className="relative w-full h-full v3-glass-card p-4 md:p-8 rounded-[3rem] md:rounded-[4rem] group overflow-hidden bg-white/65 border-2 md:border-4 border-white shadow-[0_40px_80px_-20px_rgba(255,77,148,0.25)]"
                                        >
                                            <img
                                                src={img}
                                                alt="Memory"
                                                className="w-full h-full object-cover rounded-[2.2rem] md:rounded-[3rem] transition-all duration-1000 group-hover:scale-105"
                                            />

                                            {/* Hidden Pulse Surprise */}
                                            <AnimatePresence>
                                                {heartbeatIndex === i && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        animate={{ opacity: 1, scale: 1.2 }}
                                                        exit={{ opacity: 0, scale: 0.8 }}
                                                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                                    >
                                                        <Heart className="w-24 h-24 md:w-32 md:h-32 text-white/40 fill-white/20 animate-pulse" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            <div className="absolute inset-x-6 md:inset-x-12 bottom-8 md:bottom-12 p-6 md:p-10 bg-white/95 backdrop-blur-3xl rounded-[2rem] md:rounded-[2.5rem] border-white shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-6 group-hover:translate-y-0">
                                                <V3EditableField
                                                    value={data[`photoLabel_${i}`] || "pure moment"}
                                                    onUpdate={(v) => safeUpdate(`photoLabel_${i}`, v)}
                                                    isEditing={!!isEditing}
                                                    label="Caption"
                                                >
                                                    <h4 className="text-[#4a041a] font-romantic font-black text-2xl md:text-4xl italic tracking-tight mb-2">
                                                        {data[`photoLabel_${i}`] || "pure moment"}
                                                    </h4>
                                                </V3EditableField>
                                                <V3EditableField
                                                    value={data[`photoSubLabel_${i}`] || "captured forever"}
                                                    onUpdate={(v) => safeUpdate(`photoSubLabel_${i}`, v)}
                                                    isEditing={!!isEditing}
                                                    label="Date/Meta"
                                                >
                                                    <p className="text-pink-600/60 text-[11px] md:text-[12px] tracking-[0.3em] font-black italic">
                                                        {data[`photoSubLabel_${i}`] || "captured forever"}
                                                    </p>
                                                </V3EditableField>
                                            </div>
                                        </div>
                                    </V3EditableField>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* Carousel Navigation - More compact */}
                <div className="flex items-center justify-center gap-8 md:gap-16 mt-16 md:mt-24">
                    <motion.button
                        whileHover={{ scale: 1.1, x: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prev}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-white/40 backdrop-blur-xl border-2 md:border-4 border-white flex items-center justify-center text-pink-500 transition-all shadow-xl"
                    >
                        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                    </motion.button>

                    <div className="flex gap-3 md:gap-5">
                        {images.map((_: any, i: number) => (
                            <motion.div
                                key={i}
                                animate={{
                                    width: i === currentIndex ? 48 : 12,
                                    backgroundColor: i === currentIndex ? '#ff4d94' : 'rgba(255, 77, 148, 0.15)',
                                    scale: i === currentIndex ? 1.1 : 1
                                }}
                                className="h-2 md:h-3 rounded-full transition-all duration-500 pointer-events-none"
                            />
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1, x: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={next}
                        className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-white/40 backdrop-blur-xl border-2 md:border-4 border-white flex items-center justify-center text-pink-500 transition-all shadow-xl"
                    >
                        <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                    </motion.button>
                </div>

                {/* Immersive Interaction: Pulse to Proceed */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-24 md:mt-40 flex flex-col items-center gap-10"
                >
                    <div className="text-center space-y-4">
                        <V3EditableField
                            value={data.proceedInstruction || "gently pressure the pulse to step deeper"}
                            onUpdate={(v) => safeUpdate('proceedInstruction', v)}
                            isEditing={!!isEditing}
                        >
                            <p className="text-pink-900/30 text-[10px] md:text-[11px] font-black tracking-[0.6em] italic animate-pulse">
                                {data.proceedInstruction || "gently pressure the pulse to step deeper"}
                            </p>
                        </V3EditableField>
                    </div>

                    <motion.div
                        onMouseDown={() => !isEditing && handleProceed()}
                        onTouchStart={() => !isEditing && handleProceed()}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95, rotate: isEditing ? 0 : 5 }}
                        className={`relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center cursor-pointer transition-all duration-1000 ${isProceeding ? 'scale-[25] opacity-0 blur-3xl' : ''}`}
                    >
                        {/* Pulse Layers - Softened */}
                        {[1.3, 1.8].map((s, i) => (
                            <motion.div
                                key={i}
                                animate={{ scale: [1, s, 1], opacity: [0.15, 0, 0.15] }}
                                transition={{ duration: 4, repeat: Infinity, delay: i * 1.5 }}
                                className="absolute inset-0 bg-pink-500 rounded-full blur-2xl"
                            />
                        ))}

                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            <RealisticHeart size="180px" />
                        </div>
                    </motion.div>

                    {isEditing && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onNext}
                            className="mt-8 px-8 py-4 bg-pink-500 text-white rounded-xl text-[10px] font-black tracking-widest shadow-xl border-2 border-white/20"
                        >
                            preview journey
                        </motion.button>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Page3MemoryLane;
