import { motion } from 'framer-motion';
import { Camera, Heart, Sparkles, ChevronRight } from 'lucide-react';

const C5Nebula = ({ data, onNext, isEditing = false, onUpdate }: any) => {
    const photos = data.photos && data.photos.length > 0 ? data.photos : [
        "https://images.unsplash.com/photo-1464802686167-b939a67e06a1?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1543722530-d2c32013a1e6?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1506318137071-a8e063b4b4bf?auto=format&fit=crop&q=80&w=800"
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-start py-20 px-6 font-mono select-none isolate">

            <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />

            {/* Glowing Dust Particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-500 rounded-full blur-xl"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    animate={{
                        opacity: [0, 0.5, 0],
                        scale: [1, 5, 1]
                    }}
                    transition={{
                        duration: 5 + Math.random() * 10,
                        repeat: Infinity
                    }}
                />
            ))}

            <div className="relative z-10 w-full max-w-7xl">

                {/* Header */}
                <div className="text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-4 bg-white/5 px-8 py-3 rounded-full border border-white/10 shadow-lg backdrop-blur-md"
                    >
                        <Camera size={20} className="text-blue-400" />
                        <span className="text-blue-300 font-black uppercase tracking-[0.5em] text-[10px]">Nebula Memory Scans</span>
                    </motion.div>
                    <h2 className="text-5xl md:text-9xl font-black text-white leading-tight uppercase tracking-tighter italic">Stellar Reflections</h2>
                </div>

                {/* SCATTER CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-4">
                    {photos.map((photo: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? 5 : -5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            whileHover={{ y: -15, rotate: 0, scale: 1.05 }}
                            className="bg-black/40 border border-white/10 p-6 rounded-[2.5rem] shadow-2xl transition-all hover:shadow-[0_45px_100px_-20px_rgba(37,99,235,0.3)] group relative overflow-hidden backdrop-blur-md cursor-pointer"
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
                            <div className="aspect-square bg-blue-950/20 relative overflow-hidden rounded-2xl flex items-center justify-center">
                                <img src={photo} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors" />
                            </div>

                            <div className="mt-8 flex justify-between items-center px-2">
                                <div className="flex flex-col">
                                    <span className="text-blue-500/40 font-black uppercase tracking-[0.3em] text-[8px]">Sector 0{i + 1}</span>
                                    <span className="text-white font-black text-[10px] uppercase">Coordinate_{i + 1}.MEM</span>
                                </div>
                                <Heart className="text-blue-500/30 w-5 h-5 group-hover:scale-125 transition-transform group-hover:text-blue-500 group-hover:fill-current" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-32 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-20 py-8 bg-white text-black font-black text-xs uppercase tracking-[0.8em] rounded-full shadow-2xl flex items-center gap-6 transition-all"
                    >
                        <span>Decode Future Path</span>
                        <ChevronRight size={18} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default C5Nebula;
