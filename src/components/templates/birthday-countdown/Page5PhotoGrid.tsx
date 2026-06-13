import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Camera, ChevronRight, Heart, Maximize2, X, Sparkles } from 'lucide-react';

interface Page5PhotoGridProps {
    data: {
        photos?: string[];
        heading?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page5PhotoGrid = ({ data, onNext, isEditing = false, onUpdate }: Page5PhotoGridProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const defaultPhotos = data.photos && data.photos.length > 0 ? data.photos : [
        "https://images.unsplash.com/photo-1530103862676-fa8c91abeead?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1533294160622-d5fece3e080d?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=800"
    ];

    const heading = data.heading || "Year in Review";

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-start py-20 px-6 font-outfit select-none isolate">

            <div className="relative z-10 w-full max-w-7xl">

                {/* Header Section */}
                <div className="text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-4 bg-white px-8 py-3 rounded-full border border-pink-100 shadow-md"
                    >
                        <Camera size={20} className="text-pink-500" />
                        <span className="text-pink-600 font-black uppercase tracking-[0.6em] text-[10px]">A Wonderful Year Together</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-8xl font-black text-[#5e2d63] font-romantic leading-tight"
                    >
                        {heading}
                    </motion.h2>
                </div>

                {/* DYNAMIC SCATTER GRID */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {defaultPhotos.map((photo, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            whileHover={{ y: -10, rotate: i % 2 === 0 ? 2 : -2 }}
                            className="relative group break-inside-avoid"
                        >
                            <div
                                className="bg-white p-4 rounded-3xl shadow-xl border border-pink-50 overflow-hidden cursor-zoom-in group-hover:shadow-2xl transition-all"
                                onClick={() => setSelectedPhoto(photo)}
                            >
                                <img
                                    src={photo}
                                    alt={`Year detail ${i + 1}`}
                                    className="w-full rounded-2xl object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="mt-4 flex items-center justify-between px-2">
                                    <Sparkles size={16} className="text-amber-400 group-hover:animate-spin-slow" />
                                    <Heart size={16} fill="#fda4af" className="text-pink-300 transform group-hover:scale-125 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Final Button */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-24 flex justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-24 py-8 bg-pink-500 hover:bg-pink-600 text-white font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl flex items-center gap-6 group transition-all"
                    >
                        One Last Surprise <ChevronRight size={18} className="group-hover:translate-x-3 transition-transform" />
                    </motion.button>
                </motion.div>
            </div>

            {/* LIGHTBOX MODAL */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white/90 backdrop-blur-3xl flex items-center justify-center p-8 cursor-zoom-out"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.button
                            className="absolute top-8 right-8 p-4 bg-white rounded-full shadow-2xl hover:bg-slate-50 transition-colors"
                        >
                            <X size={24} className="text-pink-600" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="max-w-5xl max-h-[80vh] bg-white p-6 shadow-[0_100px_200px_-50px_rgba(251,113,133,0.3)] rounded-[3rem] border border-pink-50 flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedPhoto} alt="Full View" className="max-w-full max-h-full object-contain rounded-2xl" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
                .animate-spin-slow {
                    animation: spin 6s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
};

export default Page5PhotoGrid;
