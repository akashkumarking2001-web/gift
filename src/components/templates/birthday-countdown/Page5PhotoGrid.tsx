import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Camera, X, Maximize2 } from 'lucide-react';

interface Page5PhotoGridProps {
    data: {
        heading?: string;
        subheading?: string;
        photos?: string[];
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page5PhotoGrid = ({ data, onNext, isEditing = false, onUpdate }: Page5PhotoGridProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const defaultData = {
        heading: data.heading || "Precious Memories",
        subheading: data.subheading || "Every moment is special",
        photos: data.photos && data.photos.length > 0 ? data.photos : [
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1464349095431-e94592854b7b?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800&auto=format&fit=crop&q=60"
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050505] flex flex-col items-center justify-start p-8 md:p-16 overflow-y-auto scrollbar-hide">
            {/* Background Glows */}
            <div className="absolute top-0 left-0 w-full h-[50%] bg-pink-900/10 blur-[150px] rounded-full" />

            <div className="relative z-10 w-full max-w-5xl text-center mb-16">
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

                {/* Subheading */}
                <div
                    className={`relative group inline-block ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-3 rounded-2xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Subheading:", defaultData.subheading);
                            if (val !== null) onUpdate?.('subheading', val);
                        }
                    }}
                >
                    <p className="text-lg md:text-2xl text-pink-500/60 font-medium italic font-romantic tracking-widest">
                        {defaultData.subheading}
                    </p>
                    {isEditing && (
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click to Edit Subheading</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Photo Grid */}
            <div className="relative z-10 w-full max-w-6xl grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 mb-20">
                {defaultData.photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10, rotate: index % 2 === 0 ? 2 : -2 }}
                        className="relative group/photo"
                    >
                        {/* Polaroid-style w/ wavy border logic via CSS filter or mask - using border-radius and shadow here */}
                        <div className="bg-white p-4 pb-12 rounded-sm shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transform transition-transform duration-500">
                            <div className="aspect-square overflow-hidden bg-gray-100 relative group/inner">
                                <img
                                    src={photo}
                                    alt={`Moment ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/inner:scale-110"
                                />
                                <div
                                    onClick={() => setSelectedPhoto(photo)}
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover/inner:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                                >
                                    <Maximize2 className="text-white w-8 h-8" />
                                </div>

                                {isEditing && (
                                    <div
                                        className="absolute top-2 right-2 bg-black/60 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-red-500 transition-colors"
                                        onClick={(e: React.MouseEvent) => {
                                            e.stopPropagation();
                                            const newPhotos = [...defaultData.photos];
                                            const url = prompt("Enter Image URL:", photo);
                                            if (url) {
                                                newPhotos[index] = url;
                                                onUpdate?.('photos', newPhotos);
                                            }
                                        }}
                                    >
                                        <Camera className="text-white w-4 h-4" />
                                    </div>
                                )}
                            </div>
                            {/* Polaroid Signature Area */}
                            <div className="mt-4 flex justify-center">
                                <div className="w-12 h-0.5 bg-gray-200 rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Add Photo Button (Editor Only) */}
                {isEditing && defaultData.photos.length < 10 && (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="aspect-square rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 hover:border-pink-500/50 hover:bg-white/5 transition-all transition-colors cursor-pointer"
                        onClick={() => {
                            const url = prompt("Enter Photo URL:");
                            if (url) onUpdate?.('photos', [...(data.photos || []), url]);
                        }}
                    >
                        <Camera className="text-white/20 w-12 h-12" />
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

                        <motion.div
                            layoutId="selected-photo"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative max-w-5xl w-full aspect-auto rounded-3xl overflow-hidden shadow-2xl"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <img
                                src={selectedPhoto}
                                alt="Selected Memory"
                                className="w-full h-full object-contain"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Termination Footer */}
            <div className="relative z-10 w-full max-w-xs text-center pb-20 mt-auto">
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

export default Page5PhotoGrid;
