import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Maximize2, X, Image as ImageIcon, Camera, ShieldCheck, Zap, Sparkles, Star, ChevronRight, Frame, MoveRight, Film } from 'lucide-react';

interface Page2GalleryProps {
    data: {
        heading?: string;
        photos?: string[];
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page2Gallery = ({ data, onNext, isEditing = false, onUpdate }: Page2GalleryProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const defaultData = {
        heading: data.heading || "The Visual Compendium",
        photos: data.photos && data.photos.length > 0 ? data.photos : [
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1522673607200-164883eecd4c?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1494972308935-a996ad871fd8?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1516589174412-9d41b973cc59?w=800&auto=format&fit=crop&q=60"
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#1a0f0f] flex flex-col items-center justify-start p-6 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* HYPER-REALISTIC MEMORY REEL ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,72,0.1),transparent_70%)]"
                />

                {/* Film Strip Border Effect */}
                <div className="absolute top-0 bottom-0 left-0 w-8 md:w-12 bg-black/40 border-r border-rose-900/20 bg-[linear-gradient(to_bottom,transparent_4px,rgba(225,29,72,0.1)_4px,rgba(225,29,72,0.1)_24px,transparent_24px)] bg-[size:100%_40px]" />
                <div className="absolute top-0 bottom-0 right-0 w-8 md:w-12 bg-black/40 border-l border-rose-900/20 bg-[linear-gradient(to_bottom,transparent_4px,rgba(225,29,72,0.1)_4px,rgba(225,29,72,0.1)_24px,transparent_24px)] bg-[size:100%_40px]" />

                {/* Scratched Film Texture */}
                <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/scratched.png')]" />

                {/* Parallax Floaties */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[30px] bg-rose-500/10 rounded-full"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.4, 0] }}
                        transition={{ duration: 6 + Math.random() * 8, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Reel */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-rose-950/20 backdrop-blur-3xl px-14 py-4 rounded-full border border-rose-900/30 shadow-2xl mx-auto isolate"
                >
                    <Film size={16} className="text-rose-400" />
                    <span className="text-rose-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Reel Sequence // 02</span>
                    <Zap size={16} className="text-rose-400 fill-current animate-pulse" />
                </motion.div>

                {/* THE GALLERY HEADER */}
                <div className="space-y-12 text-center max-w-6xl font-romantic">
                    <h2 className="text-5xl md:text-[8rem] font-black text-white leading-tight tracking-[0.02em] px-4 drop-shadow-[0_0_40px_rgba(225,29,72,0.4)] italic">
                        {defaultData.heading}
                    </h2>
                    <div className="h-[2px] w-[30rem] bg-gradient-to-r from-transparent via-rose-700/60 to-transparent mx-auto" />
                </div>

                {/* HIGH-FIDELITY FILM GRID */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16 pb-40 px-4">
                    {defaultData.photos.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            whileHover={{ y: -20, scale: 1.02 }}
                            className="group relative rounded-[2rem] p-4 bg-black/60 border border-rose-900/30 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] isolate cursor-pointer"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            {/* Film Border Holes */}
                            <div className="absolute top-0 left-0 right-0 h-8 flex justify-between items-center px-4 opacity-30">
                                {[...Array(8)].map((_, i) => <div key={i} className="w-3 h-4 bg-white/20 rounded-sm" />)}
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 h-8 flex justify-between items-center px-4 opacity-30">
                                {[...Array(8)].map((_, i) => <div key={i} className="w-3 h-4 bg-white/20 rounded-sm" />)}
                            </div>

                            {/* Image Container */}
                            <div className="relative aspect-[4/5] rounded-xl overflow-hidden mt-2 mb-2">
                                <img
                                    src={photo}
                                    alt={`Memory ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 sepia-[.3] group-hover:sepia-0"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                {/* Floating Metadata */}
                                <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-[8px] font-black uppercase tracking-widest text-white">
                                        Frame {index + 1}
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <h4 className="text-white font-romantic text-2xl italic drop-shadow-lg">Scene {index + 1}</h4>
                                    <div className="p-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                        <Maximize2 size={16} className="text-white" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Editor Add Button */}
                    {isEditing && (
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                                const url = prompt("Memory Source URL:");
                                if (url) onUpdate?.('photos', [...defaultData.photos, url]);
                            }}
                            className="rounded-[2rem] bg-rose-900/10 border-2 border-dashed border-rose-800/40 flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-rose-900/20 transition-all shadow-inner aspect-[4/5] mt-[24px] mb-[24px]"
                        >
                            <div className="p-6 bg-rose-500/10 rounded-full border border-rose-500/20 group-hover:scale-110 transition-transform">
                                <Camera size={40} className="text-rose-400" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-300">Add Footage</span>
                        </motion.div>
                    )}
                </div>

                {/* PROFESSIONAL TACTICAL ACTION */}
                <div className="relative z-10 w-full max-w-4xl mx-auto pb-32 flex flex-col items-center gap-14">
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-28 py-10 bg-[#1a0f0f] border border-rose-900/40 rounded-[4rem] text-rose-400 font-black text-xs uppercase tracking-[0.8em] shadow-[0_50px_100px_-20px_rgba(225,29,72,0.3)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[420px]"
                    >
                        <div className="absolute inset-0 bg-rose-900 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                        <span className="relative z-10">Proceed To Finale</span>
                        <MoveRight className="relative z-10 w-8 h-8 border border-rose-800/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700" />
                    </motion.button>

                    <div className="flex flex-col items-center gap-6 opacity-20">
                        <div className="h-[1px] w-[40rem] bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-rose-300">Archive Status: Sealed</span>
                    </div>
                </div>

            </div>

            {/* LIGHTBOX OVERLAY */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-[#1a0f0f]/98 backdrop-blur-[60px] flex items-center justify-center p-8 md:p-24"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.button
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-8 right-8 md:top-12 md:right-12 p-6 bg-white/5 border border-white/10 rounded-full text-white hover:bg-rose-600 hover:border-rose-500 transition-all z-50 group"
                        >
                            <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
                        </motion.button>

                        <motion.img
                            initial={{ scale: 0.9, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            src={selectedPhoto}
                            className="max-w-[95vw] max-h-[85vh] object-contain rounded-[1rem] shadow-[0_0_150px_rgba(225,29,72,0.3)] border-4 border-black box-content"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        />

                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 font-black uppercase tracking-[0.5em] text-xs">
                            Running 35mm Scan
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-rose-900 italic">Reel</div>
                <div className="h-[1px] w-72 bg-rose-900/40" />
                <span className="text-[10px] font-black tracking-widest text-rose-200 uppercase tracking-[1.5em]">GALLERY-VIEW // V6.02</span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />

        </div>
    );
};

export default Page2Gallery;
