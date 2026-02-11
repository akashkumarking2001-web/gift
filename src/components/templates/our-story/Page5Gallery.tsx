import { motion } from 'framer-motion';
import { Camera, Heart, Sparkles, ChevronRight } from 'lucide-react';

const Page5Gallery = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    const photos = data.photos && data.photos.length > 0 ? data.photos : [
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1516589174184-c68526614486?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1522673607200-16484837ecec?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=800"
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#faf7f2] flex flex-col items-center justify-start py-20 px-6 font-serif select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#fee2e2_0%,transparent_50%)] opacity-30" />

            <div className="relative z-10 w-full max-w-7xl">

                {/* Header Section */}
                <div className="text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-4 bg-white/80 px-8 py-3 rounded-full border border-rose-100 shadow-sm backdrop-blur-sm"
                    >
                        <Camera size={18} className="text-rose-400" />
                        <span className="text-[#64748b] font-bold uppercase tracking-[0.4em] text-[10px]">Memorable Fragments</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-9xl font-black text-[#1e293b] font-serif tracking-tight leading-tight"
                    >
                        Captured Soul
                    </motion.h2>
                </div>

                {/* SCATTER CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-4">
                    {photos.map((photo: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9, rotate: i % 2 === 0 ? 3 : -3 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            whileHover={{ y: -15, rotate: 0, scale: 1.02 }}
                            className="bg-white p-6 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.03)] border-2 border-[#f1f5f9] transition-all hover:shadow-2xl group cursor-pointer"
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
                            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-[#f8fafc] relative">
                                <img src={photo} alt="" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute inset-0 bg-rose-200/0 group-hover:bg-rose-200/5 transition-colors" />
                            </div>
                            <div className="mt-8 flex justify-between items-center px-2">
                                <div className="flex flex-col">
                                    <span className="text-rose-300 font-bold uppercase tracking-[0.2em] text-[8px]">Moment 0{i + 1}</span>
                                    <span className="text-[#1e293b] font-serif font-black italic">A soft memory.</span>
                                </div>
                                <Heart size={18} fill="#fda4af" className="text-rose-400 transition-transform group-hover:scale-125" />
                            </div>
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
                        className="px-24 py-8 bg-[#1e293b] text-white font-bold text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl flex items-center gap-6 group transition-all"
                    >
                        <span>The Favorite Chapter</span>
                        <ChevronRight size={18} className="group-hover:translate-x-3 transition-transform" />
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default Page5Gallery;
