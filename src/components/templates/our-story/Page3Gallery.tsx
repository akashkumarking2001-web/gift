import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Maximize2, X, Camera } from 'lucide-react';

interface Page3GalleryProps {
    data: {
        photos?: string[];
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page3Gallery = ({ data, onNext, isEditing = false, onUpdate }: Page3GalleryProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const defaultData = {
        photos: data.photos && data.photos.length > 0 ? data.photos : [
            "https://images.unsplash.com/photo-1516589174412-9d41b973cc59?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1494972308935-a996ad871fd8?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&auto=format&fit=crop&q=60"
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-start p-8 md:p-16 overflow-y-auto scrollbar-hide">
            {/* Background Glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.1),transparent_50%)]" />

            <div className="relative z-10 w-full max-w-4xl text-center mb-16">
                <h2 className="text-3xl font-black text-white uppercase tracking-[0.5em] opacity-40">Snapshot of Us</h2>
            </div>

            {/* Premium Photo Carousel/Grid Hybrid */}
            <div className="relative z-10 w-full max-w-6xl grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
                {defaultData.photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? 5 : -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10, scale: 1.05 }}
                        className="relative group/photo aspect-square overflow-hidden rounded-[2rem] bg-indigo-900/20 border border-white/5 shadow-2xl"
                    >
                        <img
                            src={photo}
                            alt={`Moment ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover/photo:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => setSelectedPhoto(photo)}>
                            <Maximize2 className="text-white w-8 h-8" />
                        </div>

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
                                className="absolute top-4 right-4 w-10 h-10 bg-indigo-600/80 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-indigo-500 transition-colors"
                            >
                                <Camera size={18} className="text-white" />
                            </button>
                        )}
                    </motion.div>
                ))}

                {/* Add Photo (Editor Only) */}
                {isEditing && defaultData.photos.length < 8 && (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="aspect-square rounded-[2rem] border-2 border-dashed border-indigo-500/20 flex flex-col items-center justify-center gap-4 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all cursor-pointer"
                        onClick={() => {
                            const url = prompt("Enter Image URL:");
                            if (url) onUpdate?.('photos', [...(data.photos || []), url]);
                        }}
                    >
                        <Camera className="text-indigo-400 opacity-20 w-12 h-12" />
                        <span className="text-[10px] font-black text-indigo-400 opacity-20 uppercase tracking-[0.4em]">Add Snapshot</span>
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
                            alt="Selected Moment"
                            className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl"
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
                    className="w-full py-5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full text-white font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl shadow-indigo-600/30"
                >
                    Final Verse →
                </motion.button>
            </div>
        </div>
    );
};

export default Page3Gallery;
