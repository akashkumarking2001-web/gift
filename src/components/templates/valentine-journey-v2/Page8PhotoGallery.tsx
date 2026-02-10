import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Page8PhotoGalleryProps {
    data: {
        heading?: string;
        galleryPhotos?: string[];
        captions?: string[];
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page8PhotoGallery = ({ data, onNext, isEditing = false, onUpdate }: Page8PhotoGalleryProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const defaultData = {
        heading: data.heading || "Our Photo Album",
        galleryPhotos: data.galleryPhotos || [
            'https://via.placeholder.com/600x400/FFB6C1/FF1493?text=Photo+1',
            'https://via.placeholder.com/400x600/FFC0CB/FF69B4?text=Photo+2',
            'https://via.placeholder.com/600x600/FFB6C1/FF1493?text=Photo+3',
            'https://via.placeholder.com/500x400/FFC0CB/FF69B4?text=Photo+4',
            'https://via.placeholder.com/400x500/FFB6C1/FF1493?text=Photo+5',
            'https://via.placeholder.com/600x400/FFC0CB/FF69B4?text=Photo+6',
            'https://via.placeholder.com/400x600/FFB6C1/FF1493?text=Photo+7',
            'https://via.placeholder.com/500x500/FFC0CB/FF69B4?text=Photo+8'
        ],
        captions: data.captions || [
            'Our first adventure',
            'Sunset together',
            'Silly moments',
            'Coffee dates',
            'Beach day',
            'City lights',
            'Cozy nights',
            'Forever memories'
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 py-16">
            {/* Background Hearts */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="absolute text-7xl opacity-10"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -40, 0],
                        rotate: 360
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        delay: Math.random() * 5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    📸
                </motion.div>
            ))}

            <div className="relative z-10 max-w-7xl w-full">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 relative group"
                >
                    <div
                        className={`relative inline-block px-12 py-4 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-2xl transition-all' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Heading:", defaultData.heading);
                                if (val) onUpdate?.('heading', val);
                            }
                        }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black text-white drop-shadow-2xl font-romantic gradient-text leading-tight">
                            {defaultData.heading}
                        </h1>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">Double Click Heading</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Masonry Photo Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 mb-16">
                    {defaultData.galleryPhotos.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.08 * index, duration: 0.6 }}
                            className="break-inside-avoid mb-6"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <motion.div
                                className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] cursor-pointer group/photo border-4 border-white/30"
                                whileHover={{ scale: 1.02, zIndex: 10 }}
                                onClick={() => setSelectedPhoto(index)}
                                onDoubleClick={(e: React.MouseEvent) => {
                                    if (isEditing) {
                                        e.stopPropagation();
                                        const url = prompt(`Edit Photo #${index + 1} URL:`, photo);
                                        if (url) {
                                            const newPhotos = [...defaultData.galleryPhotos];
                                            newPhotos[index] = url;
                                            onUpdate?.('galleryPhotos', newPhotos);
                                        }
                                    }
                                }}
                            >
                                <img
                                    src={photo}
                                    alt={defaultData.captions[index]}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover/photo:scale-110"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                        e.currentTarget.src = `https://via.placeholder.com/600x400/FFB6C1/FF1493?text=Photo+${index + 1}`;
                                    }}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/photo:opacity-100 transition-all duration-500">
                                    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover/photo:translate-y-0 transition-transform duration-500">
                                        <div
                                            className={`relative group/caption ${isEditing ? 'cursor-pointer p-2 hover:bg-white/10 rounded-xl transition-all' : ''}`}
                                            onDoubleClick={(e: React.MouseEvent) => {
                                                if (isEditing) {
                                                    e.stopPropagation();
                                                    const val = prompt(`Edit Caption for Photo #${index + 1}:`, defaultData.captions[index]);
                                                    if (val) {
                                                        const newCaptions = [...defaultData.captions];
                                                        newCaptions[index] = val;
                                                        onUpdate?.('captions', newCaptions);
                                                    }
                                                }
                                            }}
                                        >
                                            <p className="text-white font-lovely italic font-bold text-2xl drop-shadow-lg">
                                                "{defaultData.captions[index]}"
                                            </p>
                                            {isEditing && (
                                                <div className="absolute -top-6 left-0 opacity-0 group-hover/caption:opacity-100 transition-opacity whitespace-nowrap">
                                                    <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Double Click Caption</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Edit Indicator (Image) */}
                                {isEditing && (
                                    <div className="absolute top-4 left-4 opacity-0 group-hover/photo:opacity-100 transition-opacity">
                                        <span className="bg-black/40 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">Double Click Image to Edit URL</span>
                                    </div>
                                )}

                                {/* Heart on Hover */}
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -45, opacity: 0 }}
                                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                            exit={{ scale: 0, rotate: 45, opacity: 0 }}
                                            className="absolute top-6 right-6 text-6xl filter drop-shadow-[0_10px_20px_rgba(255,20,147,0.5)] z-20"
                                        >
                                            💖
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Next Button */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex justify-center"
                >
                    <motion.button
                        onClick={onNext}
                        className="group relative overflow-hidden px-16 py-8 rounded-[2.5rem] bg-white text-indigo-600 font-black text-sm uppercase tracking-[0.4em] shadow-[0_25px_60px_-15px_rgba(255,255,255,0.4)] hover:shadow-[0_35px_80px_-15px_rgba(255,255,255,0.5)] transition-all"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                        />
                        <span className="relative z-10 flex items-center gap-4">
                            More Magic
                            <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedPhoto !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.5, rotate: 10 }}
                            className="max-w-5xl w-full"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <img
                                src={defaultData.galleryPhotos[selectedPhoto]}
                                alt={defaultData.captions[selectedPhoto]}
                                className="w-full h-auto rounded-3xl shadow-2xl"
                            />
                            <p className="text-white text-2xl font-bold text-center mt-6">
                                {defaultData.captions[selectedPhoto]}
                            </p>
                        </motion.div>
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute top-8 right-8 bg-white text-purple-600 w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold hover:scale-110 transition-transform"
                        >
                            ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Page8PhotoGallery;
