import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Image as ImageIcon, Sparkles, ChevronRight } from 'lucide-react';

const Page3Gallery = ({ data, onNext }: any) => {
    const defaultPhotos = [
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1516589174184-c68526614486?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1513271922711-58b22e4dfd13?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1517841905240-472988bad1fa?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800"
    ];

    const photos = Array.isArray(data.photos) && data.photos.length > 0 ? data.photos : defaultPhotos;

    return (
        <div className="relative min-h-screen bg-black flex flex-col items-center justify-start py-20 px-6 font-outfit overflow-hidden isolate select-none">

            {/* Cinematic Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] to-[#1a0b2e] opacity-80" />

            <div className="relative z-10 w-full max-w-6xl space-y-12">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 border-b border-white/10 pb-8">
                    <div className="space-y-4 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20"
                        >
                            <Camera size={12} className="text-blue-400" />
                            <span className="text-blue-200 font-black uppercase tracking-[0.4em] text-[8px]">Gallery Module</span>
                        </motion.div>
                        <h2 className="text-white text-4xl md:text-6xl font-black font-romantic tracking-tight">
                            {data.galleryHeading || "Moments Captured"}
                        </h2>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-10 py-5 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl flex items-center gap-3 shadow-xl"
                    >
                        <span>The Epilogue</span>
                        <ChevronRight size={14} />
                    </motion.button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {photos.map((photo: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className={`group relative overflow-hidden rounded-[2rem] bg-white/5 border border-white/10 aspect-[3/4] ${i % 3 === 1 ? 'md:translate-y-12' : ''}`}
                        >
                            <img
                                src={photo}
                                alt="Gallery item"
                                className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                <div className="space-y-1">
                                    <p className="text-white text-sm font-bold tracking-tight">Memory #{i + 1}</p>
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={10} className="text-blue-400" />
                                        <span className="text-white/40 text-[9px] uppercase font-black tracking-widest italic">Cinematic Edition</span>
                                    </div>
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className="absolute top-4 left-4 border-t border-l border-white/30 w-4 h-4 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute bottom-4 right-4 border-b border-r border-white/30 w-4 h-4 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>

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

export default Page3Gallery;
