import { motion } from 'framer-motion';
import { Heart, Sparkles, RefreshCw, Star, ShieldCheck } from 'lucide-react';

const Page7Final = ({ data, isEditing = false, onUpdate }: any) => {
    const sealText = data.sealText || "Sealed with a Thousand Kisses";

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-center p-8 font-outfit select-none isolate">

            {/* LUXURY VINYL TEXTURE */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-3xl text-center space-y-16"
            >
                {/* THE SEAL */}
                <div className="relative inline-block group">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-40px] border-[1px] border-dashed border-amber-300 rounded-full opacity-30"
                    />

                    <motion.div
                        initial={{ rotate: -15 }}
                        whileInView={{ rotate: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        className="w-64 h-64 bg-amber-600 rounded-full shadow-[0_20px_60px_rgba(180,83,9,0.4)] border-4 border-amber-400 flex items-center justify-center relative z-10 overflow-hidden"
                    >
                        {/* Wax Texture Reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/20" />

                        <Heart size={100} fill="#fff" className="text-white drop-shadow-lg" />
                    </motion.div>

                    {/* Floating Charms */}
                    <div className="absolute -top-10 -right-10 w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center border border-amber-50">
                        <Star size={32} fill="#fbbf24" className="text-amber-400" />
                    </div>
                </div>

                <div className="space-y-8">
                    <h2
                        className="text-4xl md:text-7xl font-black text-[#451a03] font-romantic leading-tight cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Seal Text:", sealText);
                                if (val) onUpdate?.('sealText', val);
                            }
                        }}
                    >
                        {sealText}
                    </h2>
                    <div className="flex items-center justify-center gap-4 text-amber-500 font-black uppercase tracking-[0.8em] text-[10px]">
                        <ShieldCheck size={16} />
                        <span>Authentication Complete</span>
                    </div>
                </div>

                <div className="pt-20">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-4 px-10 py-5 bg-white border border-amber-100 rounded-full text-amber-900/40 hover:text-amber-600 transition-all uppercase font-black text-[10px] tracking-[0.6em] mx-auto shadow-xl"
                    >
                        <RefreshCw size={14} /> Relive Our Legacy
                    </motion.button>
                </div>
            </motion.div>

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

export default Page7Final;
