import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Page3MemoriesProps {
    data: {
        heading?: string;
        photos?: string[];
        polaroidCaption?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string | string[]) => void;
}

const Page3Memories = ({ data, onNext, isEditing = false, onUpdate }: Page3MemoriesProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);

    const defaultData = {
        heading: data.heading || "Our Beautiful Memories",
        photos: data.photos || [
            'https://via.placeholder.com/400x500/FFB6C1/FF1493?text=Memory+1',
            'https://via.placeholder.com/400x500/FFC0CB/FF69B4?text=Memory+2',
            'https://via.placeholder.com/400x500/FFB6C1/FF1493?text=Memory+3',
            'https://via.placeholder.com/400x500/FFC0CB/FF69B4?text=Memory+4',
            'https://via.placeholder.com/400x500/FFB6C1/FF1493?text=Memory+5'
        ],
        polaroidCaption: data.polaroidCaption || "Every moment with you is precious"
    };

    const polaroidRotations = [-3, 2, -2, 3, -1];

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-400 via-pink-400 to-rose-500 flex items-center justify-center p-4">
            {/* Animated Background Hearts */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={`bg-heart-${i}`}
                    className="absolute text-6xl opacity-10"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -50, 0],
                        rotate: [0, 180, 360],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        delay: Math.random() * 5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    💕
                </motion.div>
            ))}

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl w-full">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="text-center mb-16 relative group"
                >
                    <div
                        className={`relative inline-block px-12 py-4 ${isEditing ? 'cursor-pointer hover:bg-white/5 rounded-2xl transition-all' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Heading:", defaultData.heading);
                                if (val) onUpdate?.('heading', val);
                            }
                        }}
                    >
                        <h1 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl font-romantic gradient-text leading-tight">
                            {defaultData.heading}
                        </h1>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] bg-black/20 backdrop-blur-md px-3 py-1 rounded-full">Double Click Title</span>
                            </div>
                        )}
                    </div>

                    <motion.div
                        className={`mt-4 relative inline-block group/caption ${isEditing ? 'cursor-pointer px-8 py-2 hover:bg-white/10 rounded-xl transition-all' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Caption:", defaultData.polaroidCaption);
                                if (val) onUpdate?.('polaroidCaption', val);
                            }
                        }}
                    >
                        <p className="text-white/90 text-2xl font-bold font-lovely italic drop-shadow-lg">
                            "{defaultData.polaroidCaption}"
                        </p>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/caption:opacity-100 transition-opacity">
                                <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em]">Double Click Caption</span>
                            </div>
                        )}
                    </motion.div>
                </motion.div>

                {/* Polaroid Photo Grid */}
                <div className="flex flex-wrap justify-center gap-10 mb-16 px-4">
                    {defaultData.photos.slice(0, 5).map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 100, rotate: polaroidRotations[index] * 5 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                rotate: hoveredPhoto === index ? 0 : polaroidRotations[index]
                            }}
                            transition={{
                                delay: 0.1 * index,
                                duration: 0.8,
                                type: 'spring',
                                bounce: 0.4
                            }}
                            className="relative group/photo"
                            onMouseEnter={() => setHoveredPhoto(index)}
                            onMouseLeave={() => setHoveredPhoto(null)}
                        >
                            {/* Polaroid Frame */}
                            <motion.div
                                className="bg-white p-5 pb-20 rounded-lg shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] cursor-pointer relative"
                                whileHover={{ scale: 1.05, zIndex: 10, rotate: 0 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedPhoto(index)}
                                onDoubleClick={(e: React.MouseEvent) => {
                                    if (isEditing) {
                                        e.stopPropagation();
                                        const url = prompt(`Enter URL for Memory #${index + 1}:`, photo);
                                        if (url) {
                                            const newPhotos = [...defaultData.photos];
                                            newPhotos[index] = url;
                                            onUpdate?.('photos', newPhotos);
                                        }
                                    }
                                }}
                            >
                                {/* Photo */}
                                <div className="w-64 h-80 rounded-sm overflow-hidden bg-gray-100 relative group">
                                    <img
                                        src={photo}
                                        alt={`Memory ${index + 1}`}
                                        className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                            e.currentTarget.src = `https://via.placeholder.com/400x500/FFB6C1/FF1493?text=Memory+${index + 1}`;
                                        }}
                                    />
                                    {isEditing && (
                                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white text-[8px] font-black uppercase tracking-widest mb-1">Double Click to Change</p>
                                            <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-tighter">
                                                📷 Replace
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Polaroid Caption */}
                                <div className="absolute bottom-6 left-0 right-0 text-center">
                                    <p className="text-gray-400 font-romantic text-2xl tracking-tighter">
                                        Memory #{index + 1}
                                    </p>
                                </div>

                                {/* Decorative Tape */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-xl rotate-3 shadow-sm border border-white/50" />
                            </motion.div>

                            {/* Floating Heart on Hover */}
                            <AnimatePresence>
                                {hoveredPhoto === index && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 0, scale: 0 }}
                                        animate={{ opacity: 1, y: -40, scale: 1.2 }}
                                        exit={{ opacity: 0, y: -60, scale: 0 }}
                                        className="absolute -top-10 left-1/2 -translate-x-1/2 text-5xl pointer-events-none drop-shadow-xl"
                                    >
                                        💖
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Next Button */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex justify-center mt-20"
                >
                    <motion.button
                        onClick={onNext}
                        className="group relative overflow-hidden px-16 py-8 rounded-[2.5rem] bg-white text-orange-600 font-black text-sm uppercase tracking-[0.4em] shadow-[0_25px_60px_-15px_rgba(255,255,255,0.4)] hover:shadow-[0_35px_80px_-15px_rgba(255,255,255,0.5)] transition-all"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-rose-500/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700"
                        />
                        <span className="relative z-10 flex items-center gap-4">
                            See What's Next
                            <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                        </span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Photo Zoom Modal */}
            <AnimatePresence>
                {selectedPhoto !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0.5, rotate: 10 }}
                            transition={{ type: 'spring', bounce: 0.3 }}
                            className="bg-white p-6 pb-20 rounded-3xl shadow-2xl max-w-2xl w-full"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden">
                                <img
                                    src={defaultData.photos[selectedPhoto]}
                                    alt={`Memory ${selectedPhoto + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 text-center">
                                <p className="text-gray-700 font-handwriting text-2xl">
                                    Memory #{selectedPhoto + 1}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute top-4 right-4 bg-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative Corner Hearts */}
            <motion.div
                className="absolute top-10 right-10 text-8xl opacity-30"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            >
                💕
            </motion.div>
            <motion.div
                className="absolute bottom-10 left-10 text-8xl opacity-30"
                animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
                💗
            </motion.div>

            {/* Sparkles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        delay: Math.random() * 5,
                        repeat: Infinity
                    }}
                />
            ))}
        </div>
    );
};

export default Page3Memories;
