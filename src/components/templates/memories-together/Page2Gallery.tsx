import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Maximize2, X, Image as ImageIcon, Camera } from 'lucide-react';

interface Page2GalleryProps {
    data: {
        heading?: string;
        photos?: string[];
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page2Gallery = ({ data, onNext, isEditing = false, onUpdate }: Page2GalleryProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const defaultData = {
        heading: data.heading || "Capturing Our Best Moments",
        photos: data.photos && data.photos.length > 0 ? data.photos : [
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1522673607200-164883eecd4c?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1494972308935-a996ad871fd8?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1516589174412-9d41b973cc59?w=800&auto=format&fit=crop&q=60"
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050305] flex flex-col items-center justify-start p-6 md:p-12 overflow-y-auto scrollbar-hide">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-[50%] bg-pink-900/10 blur-[150px] rounded-full" />

            <div className="relative z-10 w-full max-w-6xl text-center mb-16">
                {/* Heading */}
                <div
                    className={`mb-4 relative group inline-block ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-3 rounded-2xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Heading:", defaultData.heading);
                            if (val !== null) onUpdate?.('heading', val);
                        }
                    }}
                >
                    <h2 className="text-4xl md:text-7xl font-black text-white font-lovely tracking-tight">
                        {defaultData.heading}
                    </h2>
                    {isEditing && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click to Edit Heading</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Masonry-like Grid */}
            <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">
                {defaultData.photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="relative group/photo overflow-hidden rounded-[2.5rem] aspect-[4/5] bg-white/5 shadow-2xl"
                    >
                        <img
                            src={photo}
                            alt={`Memory ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/photo:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/photo:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                            <div className="flex justify-between items-center">
                                <button
                                    onClick={() => setSelectedPhoto(photo)}
                                    className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20"
                                >
                                    <Maximize2 size={20} className="text-white" />
                                </button>

                                {isEditing && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const url = prompt("Enter Photo URL:", photo);
                                            if (url) {
                                                const newPhotos = [...defaultData.photos];
                                                newPhotos[index] = url;
                                                onUpdate?.('photos', newPhotos);
                                            }
                                        }}
                                        className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30"
                                    >
                                        <Camera size={20} className="text-white" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Card Gloss Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                    </motion.div>
                ))}

                {/* Add Photo Button (Editor Only) */}
                {isEditing && defaultData.photos.length < 12 && (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="aspect-[4/5] rounded-[2.5rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-pink-500/50 hover:bg-white/5 transition-all cursor-pointer"
                        onClick={() => {
                            const url = prompt("Enter Image URL:");
                            if (url) onUpdate?.('photos', [...(data.photos || []), url]);
                        }}
                    >
                        <ImageIcon className="text-white/20 w-16 h-16" />
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">Add Memory</span>
                    </motion.div>
                )}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all z-20"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <X className="text-white" />
                        </motion.button>

                        <motion.img
                            layoutId="selected-photo"
                            src={selectedPhoto}
                            alt="Selected Memory"
                            className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Termination Footer */}
            <div className="relative z-10 w-full max-w-xs mx-auto mt-auto pb-20">
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="w-full py-5 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full text-white font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl shadow-pink-600/30"
                >
                    Final Chapter →
                </motion.button>
            </div>
        </div>
    );
};

export default Page2Gallery;
