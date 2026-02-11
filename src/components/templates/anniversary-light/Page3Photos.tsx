import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Camera, ChevronRight, Heart, Maximize2, X } from 'lucide-react';

interface Page3PhotosProps {
    data: {
        photos?: string[];
        heading?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page3Photos = ({ data, onNext, isEditing = false, onUpdate }: Page3PhotosProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const defaultPhotos = data.photos && data.photos.length > 0 ? data.photos : [
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1516589174184-c68526614486?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1522673607200-16484837ecec?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=800"
    ];

    const heading = data.heading || "Our Precious Moments";

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfd] flex flex-col items-center justify-start py-20 px-6 font-outfit select-none">

            {/* AMBIENT FLOATING TEXTURE */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-5 bg-[radial-gradient(#ec4899_1px,transparent_1px)] bg-[size:30px_30px]" />

            <div className="relative z-10 w-full max-w-7xl">

                {/* Header Section */}
                <div className="text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-4 bg-white px-8 py-3 rounded-full border border-pink-100 shadow-lg"
                    >
                        <Camera size={20} className="text-pink-500" />
                        <span className="text-pink-600 font-black uppercase tracking-[0.6em] text-[10px]">Captured Forever</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-7xl font-black text-[#5e2d63] font-romantic leading-tight"
                    >
                        {heading}
                    </motion.h2>
                </div>

                {/* POLAROID GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-4">
                    {defaultPhotos.map((photo, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40, rotate: Math.random() * 10 - 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15, duration: 0.8, type: "spring" }}
                            whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
                            className="group relative"
                        >
                            <div className="bg-white p-4 pb-16 shadow-[0_15px_45px_rgba(0,0,0,0.1)] rounded-sm border border-slate-100 transition-all group-hover:shadow-[0_45px_80px_-20px_rgba(236,72,153,0.3)]">
                                <div className="aspect-[4/5] bg-slate-100 relative overflow-hidden flex items-center justify-center">
                                    <img
                                        src={photo}
                                        alt={`Moment ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    {/* Action Overlays */}
                                    <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-pink-500/10 transition-colors" />

                                    <button
                                        onClick={() => setSelectedPhoto(photo)}
                                        className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                                    >
                                        <Maximize2 size={16} className="text-pink-600" />
                                    </button>
                                </div>

                                {/* Washi Tape Decoration */}
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-pink-500/10 backdrop-blur-sm border border-white/40 rotate-1 flex items-center justify-center">
                                    <div className="w-full h-0.5 border-t border-dashed border-pink-300 opacity-30" />
                                </div>

                                {/* Caption Area */}
                                <div className="mt-8 text-center px-4">
                                    <p className="text-[#5e2d63]/40 font-black uppercase tracking-[0.3em] text-[10px]">Memory 0{i + 1}</p>
                                    <Heart className="mx-auto mt-2 text-rose-500/30 w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-24 flex justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-12 py-6 bg-white border-2 border-pink-100 text-pink-600 font-black text-xs uppercase tracking-[0.5em] rounded-full shadow-xl flex items-center gap-6 group hover:bg-pink-50 transition-all"
                    >
                        A Letter From My Heart <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
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
                        className="fixed inset-0 z-[100] bg-white/80 backdrop-blur-3xl flex items-center justify-center p-8 cursor-zoom-out"
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
                            className="max-w-4xl max-h-[80vh] bg-white p-4 shadow-[0_100px_200px_-50px_rgba(0,0,0,0.2)] rounded-sm border border-slate-100 flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedPhoto} alt="Full View" className="max-w-full max-h-full object-contain" />
                            <div className="py-6 flex items-center gap-4 text-pink-500 font-romantic text-2xl italic">
                                <Heart fill="currentColor" size={20} />
                                Forever together
                                <Heart fill="currentColor" size={20} />
                            </div>
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
            `}} />
        </div>
    );
};

export default Page3Photos;
