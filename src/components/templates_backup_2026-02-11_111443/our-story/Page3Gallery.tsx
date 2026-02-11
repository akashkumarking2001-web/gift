import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Maximize2, X, Camera, ShieldCheck, Zap, Sparkles, Star, MoveRight, Frame, Image as ImageIcon, Film } from 'lucide-react';

interface Page3GalleryProps {
    data: {
        photos?: string[];
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page3Gallery = ({ data, onNext, isEditing = false, onUpdate }: Page3GalleryProps) => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    const defaultData = {
        photos: data.photos && data.photos.length > 0 ? data.photos : [
            "https://images.unsplash.com/photo-1516589174412-9d41b973cc59?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1494972308935-a996ad871fd8?w=800&auto=format&fit=crop&q=60",
            "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&auto=format&fit=crop&q=60"
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#02020a] flex flex-col items-center justify-start p-6 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* HYPER-REALISTIC STARLIGHT GALLERY ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.15),transparent_70%)]"
                />

                {/* Film Grain Texture */}
                <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')]" />

                {/* Parallax Light Beams */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[50vh] bg-gradient-to-b from-indigo-500/20 to-transparent top-[-20%] rotate-12 blur-xl"
                        style={{ left: `${20 + i * 15}%` }}
                        animate={{ opacity: [0.2, 0.5, 0.2], height: ['40vh', '60vh', '40vh'] }}
                        transition={{ duration: 4 + i, repeat: Infinity }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-24">

                {/* VISUAL STATUS ANCHOR: Gallery */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-indigo-950/20 backdrop-blur-3xl px-14 py-4 rounded-full border border-indigo-900/30 shadow-2xl mx-auto isolate"
                >
                    <Film size={16} className="text-indigo-400" />
                    <span className="text-indigo-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Visual Database // Encrypted</span>
                    <Zap size={16} className="text-indigo-400 fill-current animate-pulse" />
                </motion.div>

                {/* THE GALLERY HEADER */}
                <div className="space-y-12 text-center max-w-6xl font-romantic">
                    <div className="flex flex-col items-center gap-6">
                        <Camera size={48} className="text-indigo-500/40" />
                        <h2 className="text-5xl md:text-[8rem] font-black text-white leading-tight tracking-[0.02em] px-4 drop-shadow-[0_0_40px_rgba(124,58,237,0.4)] italic">
                            Visual Memory
                        </h2>
                    </div>
                    <div className="h-[2px] w-[30rem] bg-gradient-to-r from-transparent via-indigo-700/60 to-transparent mx-auto" />
                </div>

                {/* HIGH-FIDELITY FLOATING FRAMES */}
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 pb-40 px-4">
                    {defaultData.photos.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: index * 0.15 }}
                            whileHover={{ y: -20, scale: 1.05, zIndex: 10 }}
                            className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden bg-[#0a0a15] border border-indigo-500/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] isolate cursor-pointer"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            {/* Image Container */}
                            <div className="absolute inset-2 rounded-[2.5rem] overflow-hidden">
                                <img
                                    src={photo}
                                    alt={`Visual Memory ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 filter brightness-90 group-hover:brightness-110"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                            </div>

                            {/* Floating Metadata */}
                            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">REC-00{index + 1}</span>
                                    </div>
                                    <h3 className="text-white font-romantic text-2xl italic">Moment</h3>
                                </div>
                                <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                    <Maximize2 size={20} className="text-white" />
                                </div>
                            </div>

                            {/* Corner Frame Accents */}
                            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-indigo-500/50 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-indigo-500/50 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    ))}

                    {/* Editor Action Unit */}
                    {isEditing && (
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                                const url = prompt("Memory Source URL:");
                                if (url) onUpdate?.('photos', [...defaultData.photos, url]);
                            }}
                            className="aspect-[4/5] rounded-[3rem] border-2 border-dashed border-indigo-800/40 bg-indigo-900/5 flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-indigo-900/10 transition-all shadow-inner group"
                        >
                            <div className="p-6 bg-indigo-500/10 rounded-full border border-indigo-500/20 group-hover:scale-110 transition-transform">
                                <ImageIcon size={40} className="text-indigo-400" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-300">Upload Memory</span>
                        </motion.div>
                    )}
                </div>

                {/* PROFESSIONAL TACTICAL ACTION */}
                <div className="relative z-10 w-full max-w-4xl mx-auto pb-32 flex flex-col items-center gap-14">
                    <motion.button
                        onClick={onNext}
                        whileHover={{ scale: 1.05, y: -10 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-28 py-10 bg-[#02020a] border border-indigo-900/40 rounded-[4rem] text-indigo-400 font-black text-xs uppercase tracking-[0.8em] shadow-[0_50px_100px_-20px_rgba(79,70,229,0.3)] transition-all flex items-center justify-center gap-8 isolate overflow-hidden min-w-[420px]"
                    >
                        <div className="absolute inset-0 bg-indigo-900 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                        <span className="relative z-10">Proceed To Finale</span>
                        <MoveRight className="relative z-10 w-8 h-8 border border-indigo-800/30 rounded-full p-1 group-hover:translate-x-6 transition-transform duration-700" />
                    </motion.button>

                    <div className="flex flex-col items-center gap-6 opacity-20">
                        <div className="h-[1px] w-[40rem] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-indigo-300">Archive Status: Sealed</span>
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
                        className="fixed inset-0 z-[100] bg-[#02020a]/95 backdrop-blur-[60px] flex items-center justify-center p-8 md:p-24"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.button
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="absolute top-8 right-8 md:top-12 md:right-12 p-6 bg-white/5 border border-white/10 rounded-full text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all z-50 group"
                        >
                            <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
                        </motion.button>

                        <motion.img
                            initial={{ scale: 0.9, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            src={selectedPhoto}
                            className="max-w-[95vw] max-h-[85vh] object-contain rounded-[3rem] shadow-[0_0_150px_rgba(124,58,237,0.3)] border border-white/10"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        />

                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 font-black uppercase tracking-[0.5em] text-xs">
                            Viewing High-Resolution Memory
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-3 opacity-15 text-right font-outfit">
                <div className="font-romantic text-8xl text-indigo-900 italic">Vision</div>
                <div className="h-[1px] w-72 bg-indigo-900/40" />
                <span className="text-[10px] font-black tracking-widest text-indigo-200 uppercase tracking-[1.5em]">GALLERY-VIEW // V5.03</span>
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

export default Page3Gallery;
