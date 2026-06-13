import { motion } from 'framer-motion';
import { Camera, Heart, Sparkles, ChevronRight } from 'lucide-react';

const Page3Gallery = ({ data, onNext }: any) => {
    const photos = data.photos && data.photos.length > 0 ? data.photos : [
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1516589174184-c68526614486?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1522673607200-16484837ecec?auto=format&fit=crop&q=80&w=800",
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=800"
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-start py-20 px-6 font-outfit select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#fff1f2_0%,transparent_50%)]" />

            <div className="relative z-10 w-full max-w-7xl">

                {/* Header */}
                <div className="text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-4 bg-white px-8 py-3 rounded-full shadow-lg border border-pink-50"
                    >
                        <Camera size={20} className="text-rose-500" />
                        <span className="text-rose-600 font-black uppercase tracking-[0.5em] text-[10px]">Visual Memoirs</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-8xl font-black text-[#5e2d63] font-romantic leading-tight">Visual Chapter</h2>
                </div>

                {/* SCATTER CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                    {photos.map((photo: string, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? 3 : -3 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            whileHover={{ y: -15, rotate: 0, scale: 1.05 }}
                            className="bg-white p-4 pb-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-sm border border-slate-100 transition-all hover:shadow-[0_45px_100px_-20px_rgba(251,113,133,0.3)] group"
                        >
                            <div className="aspect-[4/5] bg-slate-50 relative overflow-hidden flex items-center justify-center">
                                <img src={photo} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-rose-500/0 group-hover:bg-rose-500/5 transition-colors" />
                            </div>

                            <div className="mt-8 text-center space-y-2">
                                <span className="text-rose-400 font-black uppercase tracking-[0.3em] text-[8px]">Moment {i + 1}</span>
                                <Heart className="mx-auto text-rose-500/30 w-4 h-4 group-hover:scale-125 transition-transform" />
                            </div>

                            {/* Paper Note Detail */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-8 bg-[#fffdfa]/80 backdrop-blur-sm border border-slate-100/50 shadow-sm transition-opacity opacity-60 group-hover:opacity-100" />
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-24 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-20 py-8 bg-[#fb7185] hover:bg-[#f43f5e] text-white font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl flex items-center gap-6 transition-all"
                    >
                        <span>The Epilogue</span>
                        <ChevronRight size={18} />
                    </motion.button>
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
