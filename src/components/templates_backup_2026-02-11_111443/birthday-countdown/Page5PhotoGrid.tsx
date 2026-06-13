import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Camera, X, Maximize2, Star, Sparkles, MoveRight, ChevronRight, Heart } from 'lucide-react';

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
        heading: data.heading || "The Visual Legacy",
        subheading: data.subheading || "Captured moments of a life well-lived together.",
        photos: data.photos && data.photos.length > 0 ? data.photos : [
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1464349095431-e94592854b7b?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?w=800&auto=format&fit=crop&q=60"
        ]
    };

    return (
        <div className="min-h-screen relative overflow-y-auto overflow-x-hidden bg-[#05050a] flex flex-col items-center pt-24 pb-40 font-outfit scrollbar-hide isolate">

            {/* Hyper-Realistic Gilded Atmospehre */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.1),transparent_70%)]" />
                <div className="absolute inset-0 bg-[#05050a]/40 backdrop-blur-[100px]" />

                {/* Floating Bokeh Details */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-pink-400/20 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.4, 0] }}
                        transition={{ duration: 6 + Math.random() * 6, repeat: Infinity }}
                    />
                ))}
            </div>

            {/* Header Section */}
            <div className="relative z-10 text-center mb-32 px-6 max-w-4xl space-y-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-xl px-10 py-3 rounded-full border border-white/10"
                >
                    <Camera size={16} className="text-pink-400" />
                    <span className="text-pink-100/50 font-black uppercase tracking-[0.5em] text-[10px]">Digital Artifacts</span>
                    <Star size={16} className="text-yellow-400 fill-current opacity-30" />
                </motion.div>

                <div className="space-y-6">
                    <h1 className="text-5xl md:text-9xl font-black text-white font-romantic leading-tight drop-shadow-2xl">
                        {defaultData.heading}
                    </h1>
                    <p className="text-pink-100/40 text-xl md:text-2xl font-lovely italic leading-relaxed">
                        "{defaultData.subheading}"
                    </p>
                </div>
            </div>

            {/* HIGH-FIDELITY MASONRY-STYLE GRID */}
            <div className="relative z-10 w-full max-w-7xl px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 lg:gap-20">
                {defaultData.photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="group relative"
                    >
                        {/* Realistic High-Gloss Frame */}
                        <motion.div
                            whileHover={{ y: -15, rotate: index % 2 === 0 ? 1 : -1, scale: 1.02 }}
                            className="relative aspect-[4/5] bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[4rem] p-8 shadow-2xl overflow-hidden isolate"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

                            {/* Inner Image Container */}
                            <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-inner group-hover:shadow-2xl transition-all duration-700">
                                <img
                                    src={photo}
                                    alt={`Moment ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                                />

                                <div
                                    onClick={() => setSelectedPhoto(photo)}
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-sm"
                                >
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20">
                                        <Maximize2 className="text-white w-8 h-8" />
                                    </div>
                                </div>
                            </div>

                            {/* Caption/Metadata Area */}
                            <div className="mt-8 flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-pink-500/40 italic">Coded Memory {index + 1}</p>
                                    <h4 className="text-white/60 font-romantic text-2xl">Eternal Frame</h4>
                                </div>
                                <Heart size={18} className="text-white/10 group-hover:text-pink-500/40 transition-colors" />
                            </div>
                        </motion.div>
                    </motion.div>
                ))}

                {/* PRO ADD BUTTON */}
                {isEditing && (
                    <motion.div
                        whileInView={{ opacity: 1 }}
                        className="aspect-[4/5] bg-white/[0.01] backdrop-blur-3xl rounded-[4rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center gap-6 hover:bg-white/5 hover:border-pink-500/20 transition-all cursor-pointer"
                        onClick={() => {
                            const url = prompt("Enter Photo URL:");
                            if (url) onUpdate?.('photos', [...(data.photos || []), url]);
                        }}
                    >
                        <div className="w-24 h-24 rounded-full bg-pink-500/10 flex items-center justify-center">
                            <Camera size={40} className="text-pink-500/40" />
                        </div>
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Inventory Addition</span>
                    </motion.div>
                )}
            </div>

            {/* Final Professional Action */}
            <motion.div
                className="mt-40 z-20 flex flex-col items-center gap-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <div className="flex items-center gap-6 mb-10 opacity-30">
                    <Sparkles size={20} className="text-pink-500" />
                    <div className="h-[1px] w-20 bg-white" />
                    <span className="text-[10px] font-black tracking-[0.8em] uppercase">Observation End</span>
                    <div className="h-[1px] w-20 bg-white" />
                    <Sparkles size={20} className="text-pink-500" />
                </div>

                <motion.button
                    onClick={onNext}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-24 py-9 bg-white text-[#050510] font-black text-xs uppercase tracking-[0.7em] rounded-[3rem] shadow-[0_50px_100px_rgba(255,255,255,0.15)] flex items-center gap-6 isolate"
                >
                    <div className="absolute inset-0 bg-pink-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />
                    <span className="relative z-10 text-pink-900">Enter The Sanctuary</span>
                    <ChevronRight className="relative z-10 w-6 h-6 border-2 border-pink-900 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                </motion.button>
            </motion.div>

            {/* LIGHTBOX ENHANCEMENT */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-[100px] flex items-center justify-center p-8 lg:p-24"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-12 right-12 w-16 h-16 bg-white/5 backdrop-blur-3xl rounded-full flex items-center justify-center border border-white/10 hover:bg-red-500 transition-colors z-[110]"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <X className="text-white" />
                        </motion.button>

                        <motion.div
                            layoutId="selected-photo"
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            className="relative max-w-7xl w-full h-full rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(236,72,153,0.3)] border border-white/10"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        >
                            <img
                                src={selectedPhoto}
                                alt="Memory Focal Point"
                                className="w-full h-full object-contain bg-black/40"
                            />

                            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 px-10 py-4 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl">
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/60">High-Resolution Reminiscence</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default Page5PhotoGrid;
