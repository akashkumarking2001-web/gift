import { motion } from 'framer-motion';
import { Camera, Heart, Sparkles, ChevronRight } from 'lucide-react';

const SSSGallery = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    const photos = data.photos && data.photos.length > 0 ? data.photos : [
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1516589174184-c68526614486?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1522673607200-16484837ecec?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=800"
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0d0d] flex flex-col items-center justify-start py-20 px-6 font-mono select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#4c0519_0%,transparent_50%)]" />

            <div className="relative z-10 w-full max-w-7xl">

                {/* Header */}
                <div className="text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border border-white/10 shadow-lg backdrop-blur-md"
                    >
                        <Camera size={20} className="text-rose-500" />
                        <span className="text-rose-400 font-black uppercase tracking-[0.5em] text-[10px]">Visual Pattern Reconstruction</span>
                    </motion.div>
                    <h2 className="text-5xl md:text-9xl font-black text-white leading-tight uppercase tracking-tighter">Captured Bliss</h2>
                </div>

                {/* SCATTER CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                    {photos.map((photo: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? 5 : -5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            whileHover={{ y: -15, rotate: 0, scale: 1.05 }}
                            className="bg-black border border-white/10 p-5 rounded-3xl shadow-2xl transition-all hover:shadow-[0_45px_100px_-20px_rgba(225,29,72,0.3)] group relative overflow-hidden"
                            onClick={() => {
                                if (isEditing) {
                                    const val = prompt("Enter Image URL for slot " + i, photo);
                                    if (val) {
                                        const newPhotos = [...photos];
                                        newPhotos[i] = val;
                                        onUpdate?.('photos', newPhotos);
                                    }
                                }
                            }}
                        >
                            <div className="aspect-[4/5] bg-rose-950/20 relative overflow-hidden rounded-2xl flex items-center justify-center">
                                <img src={photo} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/10 transition-colors" />
                            </div>

                            <div className="mt-6 flex justify-between items-center px-2">
                                <div className="flex flex-col">
                                    <span className="text-rose-500/40 font-black uppercase tracking-[0.3em] text-[8px]">Pattern 0{i + 1}</span>
                                    <span className="text-white font-black text-[10px] uppercase">Snapshot_{i + 1}.DAT</span>
                                </div>
                                <Heart className="text-rose-500/30 w-4 h-4 group-hover:scale-125 transition-transform group-hover:text-rose-500 group-hover:fill-current" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-24 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-20 py-8 bg-white text-black font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl flex items-center gap-6 transition-all"
                    >
                        <span>Analyze Smile Reasons</span>
                        <ChevronRight size={18} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default SSSGallery;
