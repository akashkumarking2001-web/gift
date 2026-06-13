import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { GiftService } from '../../../lib/gifts';
import { Loader2, Upload, Plus, Trash2, X } from 'lucide-react';

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
    const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
    const [isUploadingNew, setIsUploadingNew] = useState(false);

    // Two refs: one for replacing an existing photo, one for adding a new one
    const replaceInputRef = useRef<HTMLInputElement>(null);
    const addInputRef = useRef<HTMLInputElement>(null);

    const defaultData = {
        heading: data.heading || "Our Photo Album",
        galleryPhotos: data.galleryPhotos || [
            'https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069&auto=format&fit=crop'
        ],
        captions: data.captions || [
            'Our first adventure',
            'Sunset together',
            'Silly moments',
            'Forever memories'
        ]
    };

    const handleReplacePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && uploadingIndex !== null) {
            const file = e.target.files[0];
            try {
                const url = await GiftService.uploadMedia(file);
                if (url) {
                    const newPhotos = [...defaultData.galleryPhotos];
                    newPhotos[uploadingIndex] = url;
                    onUpdate?.('galleryPhotos', newPhotos);
                }
            } catch (error) {
                console.error("Upload failed", error);
                alert("Upload failed. Please try again.");
            } finally {
                setUploadingIndex(null);
                if (replaceInputRef.current) replaceInputRef.current.value = '';
            }
        }
    };

    const handleAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIsUploadingNew(true);
            const file = e.target.files[0];
            try {
                const url = await GiftService.uploadMedia(file);
                if (url) {
                    const newPhotos = [...defaultData.galleryPhotos, url];
                    const newCaptions = [...defaultData.captions, 'New Memory'];
                    onUpdate?.('galleryPhotos', newPhotos);
                    onUpdate?.('captions', newCaptions);
                }
            } catch (error) {
                console.error("Upload failed", error);
                alert("Upload failed. Please try again.");
            } finally {
                setIsUploadingNew(false);
                if (addInputRef.current) addInputRef.current.value = '';
            }
        }
    };

    const handleRemovePhoto = (index: number) => {
        const newPhotos = defaultData.galleryPhotos.filter((_, i) => i !== index);
        const newCaptions = defaultData.captions.filter((_, i) => i !== index);
        onUpdate?.('galleryPhotos', newPhotos);
        onUpdate?.('captions', newCaptions);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4 py-16">
            <input
                type="file"
                ref={replaceInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleReplacePhoto}
            />
            <input
                type="file"
                ref={addInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleAddPhoto}
            />

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />

            {/* Background Hearts - Optimized */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="absolute text-7xl opacity-5 pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: 360
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    ✨
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
                        className={`relative inline-block px-12 py-4 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-2xl transition-all border-2 border-transparent hover:border-white/20' : ''}`}
                        onClick={() => {
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
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    ✏️ Edit Heading
                                </span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Add Photo Button - Moved Outside Grid */}
                {isEditing && (
                    <div className="mb-12 flex justify-center">
                        <button
                            onClick={() => addInputRef.current?.click()}
                            disabled={isUploadingNew}
                            className="relative overflow-hidden w-full max-w-sm h-32 border-2 border-dashed border-white/40 rounded-3xl flex items-center justify-center gap-4 text-white hover:bg-white/10 hover:border-white/80 transition-all group"
                        >
                            {isUploadingNew ? (
                                <Loader2 className="w-8 h-8 animate-spin text-white" />
                            ) : (
                                <>
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Plus className="w-6 h-6" />
                                    </div>
                                    <span className="font-bold uppercase tracking-widest text-sm">Add New Memory</span>
                                </>
                            )}
                        </button>
                    </div>
                )}

                {/* Masonry Photo Grid */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 mb-16 space-y-6">
                    {defaultData.galleryPhotos.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * index, duration: 0.5 }}
                            className="break-inside-avoid relative group/item"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <motion.div
                                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer bg-white/5 border border-white/10"
                                whileHover={{ scale: 1.02, zIndex: 10 }}
                                onClick={() => !isEditing && setSelectedPhoto(index)}
                            >
                                <img
                                    src={photo}
                                    alt={defaultData.captions[index] || `Photo ${index + 1}`}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover/item:scale-105"
                                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                        e.currentTarget.src = `https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1974&auto=format&fit=crop`;
                                    }}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                    <p className="text-white font-medium text-lg italic">
                                        {defaultData.captions[index]}
                                    </p>
                                </div>

                                {/* Edit Controls - Always visible if editing */}
                                {isEditing && (
                                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                                        {uploadingIndex === index ? (
                                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                                        ) : (
                                            <>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setUploadingIndex(index);
                                                        replaceInputRef.current?.click();
                                                    }}
                                                    className="bg-white text-indigo-600 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-lg z-20"
                                                >
                                                    <Upload className="w-3 h-3" /> Reupload
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemovePhoto(index);
                                                    }}
                                                    className="bg-red-500/20 text-white border border-red-500/50 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-500/40 transition-colors flex items-center gap-2 shadow-lg backdrop-blur-sm z-20"
                                                >
                                                    <Trash2 className="w-3 h-3" /> Remove
                                                </button>

                                                <button
                                                    className="mt-2 text-white bg-black/20 backdrop-blur px-3 py-1 rounded text-[10px] uppercase tracking-widest border border-white/20 hover:bg-black/40 flex items-center gap-2 z-20"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const val = prompt("Enter new caption:", defaultData.captions[index]);
                                                        if (val) {
                                                            const newCaptions = [...defaultData.captions];
                                                            newCaptions[index] = val;
                                                            onUpdate?.('captions', newCaptions);
                                                        }
                                                    }}
                                                >
                                                    ✏️ Edit Text
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
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
                        className="group relative overflow-hidden px-12 py-6 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            <span className="text-lg">✨</span>
                            More Magic
                            <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
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
                                alt={defaultData.captions[selectedPhoto] || "Photo"}
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
                            <X className="w-6 h-6" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Page8PhotoGallery;
