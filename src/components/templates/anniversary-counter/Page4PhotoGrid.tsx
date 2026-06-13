import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Camera, ChevronRight, Heart, Maximize2, X, Sparkles } from 'lucide-react';

interface Page4PhotoGridProps {
    data: {
        photos?: string[];
        heading?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page4PhotoGrid = ({ data, onNext, isEditing = false, onUpdate }: Page4PhotoGridProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const defaultPhotos = data.photos && data.photos.length > 0 ? data.photos : [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1519225423080-719306788961?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1520856729051-7b6a909bbf16?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=800"
    ];

    const heading = data.heading || "The Gallery of Us";

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-start py-20 px-6 font-outfit select-none isolate">

            {/* AMBIENT SOFT FLOW */}
            <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[#fefce8] to-transparent pointer-events-none opacity-40" />

            <div className="relative z-10 w-full max-w-7xl">

                {/* Header Section */}
                <div className="text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-4 bg-white px-8 py-3 rounded-full border border-amber-100 shadow-lg"
                    >
                        <Camera size={20} className="text-amber-500" />
                        <span className="text-amber-700 font-black uppercase tracking-[0.6em] text-[10px]">A Gilded Visual Legacy</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-8xl font-black text-[#451a03] font-romantic leading-tight"
                    >
                        {heading}
                    </motion.h2>
                </div>

                {/* PREMIUM MASONRY MODELLING */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-12 space-y-12 px-4">
                    {defaultPhotos.map((photo: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            whileHover={{ y: -10 }}
                            className="relative group break-inside-avoid"
                        >
                            <div
                                className="bg-white p-5 rounded-[2.5rem] shadow-xl border border-amber-50 overflow-hidden cursor-zoom-in group-hover:shadow-2xl transition-all"
                                onClick={() => setSelectedPhoto(photo)}
                            >
                                <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
                                    <img
                                        src={photo}
                                        alt={`Memorable moment ${i + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-colors" />
                                </div>
                                <div className="mt-6 flex items-center justify-between px-2">
                                    <div className="flex flex-col">
                                        <span className="text-[8px] font-black uppercase tracking-widest text-amber-500/40">Legacy Item</span>
                                        <span className="text-[#451a03] font-romantic font-black">Moment 0{i + 1}</span>
                                    </div>
                                    <Heart size={18} fill="#fbbf24" className="text-amber-400 transform group-hover:scale-125 transition-transform" />
                                </div>
                            </div>

                            {/* Decorative Floating Element */}
                            {i % 2 === 0 && (
                                <motion.div
                                    animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full shadow-lg border border-amber-50 flex items-center justify-center -z-10"
                                >
                                    <Sparkles size={16} className="text-amber-400" />
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Final Button */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-32 flex justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-24 py-8 bg-[#451a03] text-amber-50 font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl flex items-center gap-6 group transition-all"
                    >
                        <span>Hear My Vow</span>
                        <ChevronRight size={18} className="group-hover:translate-x-3 transition-transform" />
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
                        className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl flex items-center justify-center p-8 cursor-zoom-out"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.button
                            className="absolute top-10 right-10 p-5 bg-[#451a03] rounded-full shadow-2xl text-amber-50 hover:bg-amber-900 transition-colors"
                        >
                            <X size={28} />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="max-w-6xl max-h-[85vh] bg-white p-8 shadow-[0_100px_200px_-50px_rgba(69,26,3,0.3)] rounded-[4rem] border border-amber-50 flex flex-col items-center"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <img src={selectedPhoto} alt="Full View" className="max-w-full max-h-full object-contain rounded-3xl" />
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

export default Page4PhotoGrid;
