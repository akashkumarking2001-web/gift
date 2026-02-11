import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Star, MoveRight, ShieldCheck, Zap, Camera } from 'lucide-react';

interface Photo {
    url: string;
    caption?: string;
}

interface Page3MemoriesProps {
    data: {
        heading?: string;
        photos?: Photo[];
        polaroidCaption?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page3Memories = ({ data, onNext, isEditing = false, onUpdate }: Page3MemoriesProps) => {
    const defaultPhotos: Photo[] = data.photos && data.photos.length > 0 ? data.photos : [
        { url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop', caption: 'Our first date' },
        { url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop', caption: 'Beach sunset' },
        { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop', caption: 'Laughing together' },
        { url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop', caption: 'Your birthday' },
        { url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop', caption: 'Forever moment' }
    ];

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const defaultData = {
        heading: data.heading || "Memories",
        photos: defaultPhotos,
        polaroidCaption: data.polaroidCaption || "Precious moments..."
    };

    const nextPhoto = () => {
        setDirection(1);
        setCurrentPhotoIndex((prev) => (prev + 1) % defaultData.photos.length);
    };

    const prevPhoto = () => {
        setDirection(-1);
        setCurrentPhotoIndex((prev) => (prev - 1 + defaultData.photos.length) % defaultData.photos.length);
    };

    const currentPhoto = defaultData.photos[currentPhotoIndex];

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
            scale: 0.8,
            rotate: direction > 0 ? 15 : -15
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotate: 0
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 500 : -500,
            opacity: 0,
            scale: 0.8,
            rotate: direction < 0 ? 15 : -15
        })
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0508] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* Hyper-Realistic Studio Atmosphere */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(225,29,72,0.1),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(244,63,94,0.1),transparent_50%)]"
                />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-20">

                {/* Visual Header Anchor */}
                <div className="text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-rose-900/10 backdrop-blur-3xl px-12 py-3.5 rounded-full border border-rose-800/20 shadow-2xl mx-auto"
                    >
                        <ShieldCheck size={16} className="text-rose-500" />
                        <span className="text-rose-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Registry Sequence 03</span>
                        <Zap size={16} className="text-rose-500 fill-current animate-pulse" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight tracking-[0.02em] drop-shadow-2xl"
                    >
                        {defaultData.heading}
                    </motion.h2>
                </div>

                {/* HIGH-FIDELITY GALLERY INTERFACE */}
                <div className="relative w-full max-w-5xl group/gallery">

                    {/* The Primary Polaroid View Unit */}
                    <div className="relative perspective-[2000px] h-[600px] md:h-[800px]">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentPhotoIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: 'spring', stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.4 },
                                    rotate: { duration: 0.6 }
                                }}
                                className="absolute inset-0 p-8 md:p-12 bg-white rounded-[3rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)] border-4 border-white/20 isolate overflow-hidden flex flex-col gap-10"
                            >
                                {/* Image Asset Unit */}
                                <div className="relative w-full flex-1 rounded-[2.5rem] overflow-hidden shadow-inner border border-black/5 bg-gray-100">
                                    <img
                                        src={currentPhoto.url}
                                        alt={currentPhoto.caption}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

                                    {/* Editor Overlay */}
                                    {isEditing && (
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <Camera size={40} className="text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Narrative Component */}
                                <div className="space-y-6 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <p className="text-rose-950 text-2xl md:text-4xl font-romantic leading-snug italic opacity-80 px-8">
                                            "{currentPhoto.caption}"
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center gap-4 opacity-10">
                                        <div className="h-[1px] w-20 bg-rose-900" />
                                        <Heart size={16} fill="#9d174d" className="text-rose-900" />
                                        <div className="h-[1px] w-20 bg-rose-900" />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Professional Navigation Controls */}
                        {!isEditing && (
                            <>
                                <button
                                    onClick={prevPhoto}
                                    className="absolute -left-12 md:-left-24 top-1/2 -translate-y-1/2 w-20 h-20 bg-white/5 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/10 shadow-2xl hover:bg-white/10 hover:scale-110 transition-all z-20 group"
                                >
                                    <ChevronLeft className="w-8 h-8 text-white group-hover:text-rose-500 transition-colors" />
                                </button>
                                <button
                                    onClick={nextPhoto}
                                    className="absolute -right-12 md:-right-24 top-1/2 -translate-y-1/2 w-20 h-20 bg-white/5 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/10 shadow-2xl hover:bg-white/10 hover:scale-110 transition-all z-20 group"
                                >
                                    <ChevronRight className="w-8 h-8 text-white group-hover:text-rose-500 transition-colors" />
                                </button>
                            </>
                        )}
                    </div>

                    {/* Pagination Indicators */}
                    <div className="flex justify-center gap-6 mt-16">
                        {defaultData.photos.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentPhotoIndex ? 1 : -1);
                                    setCurrentPhotoIndex(index);
                                }}
                                className={`h-1.5 transition-all duration-700 rounded-full ${index === currentPhotoIndex ? 'w-24 bg-rose-500 shadow-[0_0_15px_rgba(225,29,72,0.4)]' : 'w-8 bg-white/10 hover:bg-white/20'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Professional Action Footer */}
                <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center gap-12 pb-40">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="group relative px-24 py-9 bg-[#0d0508] border-2 border-rose-900/30 rounded-[3.5rem] text-rose-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(225,29,72,0.3)] transition-all flex items-center gap-6 isolate overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-rose-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-[3.5rem]" />
                        <span className="relative z-10 text-rose-500">Seal These Moments</span>
                        <MoveRight className="relative z-10 w-6 h-6 border-2 border-rose-900/30 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                    </motion.button>

                    <div className="flex items-center gap-4 opacity-10">
                        <Star size={14} className="text-rose-500 fill-current" />
                        <span className="text-[8px] font-black tracking-[1em] uppercase text-white">Registry Status: In-Progress</span>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Page3Memories;
