import { motion } from 'framer-motion';
import { Camera, ChevronRight, Heart, Sparkles, Star } from 'lucide-react';

const Page3Memories = ({ data, onNext }: any) => {
    const photos = data.photos && data.photos.length > 0 ? data.photos : [
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1543132220-4bf3de6e10ae?auto=format&fit=crop&q=80&w=800"
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050508] flex flex-col items-center justify-start py-20 px-6 font-outfit select-none isolate">

            <div className="relative z-10 w-full max-w-6xl">

                {/* Header */}
                <div className="text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-3 rounded-full backdrop-blur-md"
                    >
                        <Sparkles size={18} className="text-cyan-400" />
                        <span className="text-white font-black uppercase tracking-[0.6em] text-[10px]">Data Restored // Memories Unlocked</span>
                    </motion.div>
                </div>

                {/* HORIZONTAL SCROLL GALLERY */}
                <div className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-12 snap-x px-4 no-scrollbar">
                    {photos.map((photo: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="min-w-[300px] md:min-w-[400px] aspect-[3/4] rounded-[2.5rem] overflow-hidden relative snap-center group shadow-2xl border-2 border-white/5"
                        >
                            <img src={photo} alt="Memory" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />

                            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="text-cyan-400 font-black uppercase tracking-[0.4em] text-[8px]">Index 0{i + 1}</span>
                                    <p className="text-white text-xl font-bold font-romantic">Special Moment</p>
                                </div>
                                <Heart size={20} fill="#ec4899" className="text-pink-500 drop-shadow-[0_0_10px_#ec4899]" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-16 flex justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(6,182,212,0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-16 py-6 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-black text-xs uppercase tracking-[0.5em] rounded-full flex items-center gap-4 shadow-xl"
                    >
                        Final Word From Friend <ChevronRight size={18} />
                    </motion.button>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}} />
        </div>
    );
};

export default Page3Memories;
