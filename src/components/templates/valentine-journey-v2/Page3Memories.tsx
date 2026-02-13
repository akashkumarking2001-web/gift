import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { GiftService } from '../../../lib/gifts';
import { Loader2, Upload } from 'lucide-react';
import GiftBox from './GiftBox';

interface Page3MemoriesProps {
    data: {
        heading?: string;
        photos?: string[];
        polaroidCaption?: string;
        giftBoxVideo?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string | string[]) => void;
}

const Page3Memories = ({ data, onNext, isEditing = false, onUpdate }: Page3MemoriesProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
    const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const [isGiftBoxUnlocked, setIsGiftBoxUnlocked] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const defaultData = {
        heading: data.heading || "Our Beautiful Memories",
        photos: data.photos || [
            'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1974&auto=format&fit=crop'
        ],
        polaroidCaption: data.polaroidCaption || "Every moment with you is precious"
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && uploadingIndex !== null) {
            const file = e.target.files[0];
            try {
                const url = await GiftService.uploadMedia(file);
                if (url) {
                    const newPhotos = [...defaultData.photos];
                    newPhotos[uploadingIndex] = url;
                    onUpdate?.('photos', newPhotos);
                }
            } catch (error) {
                console.error("Upload failed", error);
                alert("Upload failed. Please try again.");
            } finally {
                setUploadingIndex(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
            }
        }
    };

    const polaroidRotations = [-2, 1, -1, 2, -1];

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-900 via-pink-900 to-rose-950 flex items-center justify-center p-4">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
            />

            {/* Subtle Animated Background - Optimized */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />

            {/* Reduced particle count for performance */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={`bg-heart-${i}`}
                    className="absolute text-4xl opacity-5 pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.05, 0.1, 0.05]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 5,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                >
                    ❤️
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
                        className={`relative inline-block px-12 py-4 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-2xl transition-all border-2 border-transparent hover:border-white/20' : ''}`}
                        onClick={() => {
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
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    ✏️ Edit Heading
                                </span>
                            </div>
                        )}
                    </div>

                    <motion.div
                        className={`mt-4 relative inline-block group/caption ${isEditing ? 'cursor-pointer px-8 py-2 hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/20' : ''}`}
                        onClick={() => {
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
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    ✏️ Edit Caption
                                </span>
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
                            {/* Polaroid Frame with Texture */}
                            <motion.div
                                className="bg-[#fffdf8] p-4 pb-16 rounded shadow-xl cursor-pointer relative overflow-hidden"
                                style={{
                                    backgroundImage: `url('https://www.transparenttextures.com/patterns/cardboard.png')`,
                                    backgroundBlendMode: 'multiply'
                                }}
                                whileHover={{ scale: 1.05, zIndex: 10, rotate: 0 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedPhoto(index)}
                            >
                                {/* Photo */}
                                <div className="w-64 h-80 bg-gray-100 relative group overflow-hidden brightness-95 contrast-110">
                                    <img
                                        src={photo}
                                        alt={`Memory ${index + 1}`}
                                        className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                            e.currentTarget.src = `https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1974&auto=format&fit=crop`;
                                        }}
                                    />

                                    {/* Upload Overlay */}
                                    {/* Upload Overlay - Always visible when editing */}
                                    {isEditing && (
                                        <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center justify-end z-20">
                                            {uploadingIndex === index ? (
                                                <div className="flex items-center gap-2 text-white bg-black/50 px-3 py-1 rounded-full">
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                    <span className="text-[10px]">Uploading...</span>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setUploadingIndex(index);
                                                        fileInputRef.current?.click();
                                                    }}
                                                    className="bg-white/90 text-rose-600 px-3 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider hover:bg-white transition-colors flex items-center gap-2 shadow-sm mb-1"
                                                >
                                                    <Upload className="w-3 h-3" /> Replace
                                                </button>
                                            )}
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

                {/* Next Button - Themed */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="flex justify-center mt-20"
                >
                    {!isGiftBoxUnlocked ? (
                        <GiftBox
                            videoUrl={data.giftBoxVideo}
                            onUpdate={(url) => onUpdate?.('giftBoxVideo', url)}
                            isEditing={isEditing}
                            onUnlocked={() => setIsGiftBoxUnlocked(true)}
                            postVideoType="text"
                            postVideoText="Do you remember this?"
                        />
                    ) : (
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            onClick={onNext}
                            className="group relative overflow-hidden px-12 py-6 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 transition-all"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Continue Journey
                                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </motion.button>
                    )}
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
            {/* Minimal Sparkles */}
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={`sparkle-${i}`}
                    className="absolute w-1 h-1 bg-white/40 rounded-full pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        opacity: [0, 0.8, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 3,
                        delay: Math.random() * 5,
                        repeat: Infinity
                    }}
                />
            ))}
        </div>
    );
};

export default Page3Memories;
