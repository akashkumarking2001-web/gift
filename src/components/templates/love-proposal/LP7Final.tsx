import { motion } from 'framer-motion';
import { Heart, Sparkles, Send, Share2, RefreshCw, Star, Gift, ShieldCheck } from 'lucide-react';

const LP7Final = ({ data, isEditing = false, onUpdate }: any) => {
    const heading = data.finalHeading || "Forever Sealed";
    const signature = data.signatureText || "Eternal Love";

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#2b0303] flex flex-col items-center justify-center p-8 font-serif select-none isolate">

            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,#450a0a_0%,transparent_70%)] opacity-40" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-4xl bg-[#450a0a]/40 backdrop-blur-3xl rounded-[4rem] border-4 border-amber-600/30 p-12 md:p-24 shadow-[0_60px_150px_rgba(0,0,0,0.8)] text-center space-y-12"
            >
                {/* Final Interactive Reveal */}
                <div className="relative inline-block group">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-[-60px] border-2 border-dashed border-amber-500/20 rounded-full"
                    />

                    <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="p-16 bg-[#1a0101] rounded-[3.5rem] shadow-[0_0_80px_rgba(245,158,11,0.3)] border-4 border-amber-500 relative z-10"
                    >
                        <ShieldCheck size={100} className="text-amber-500 drop-shadow-2xl" />
                    </motion.div>
                    <div className="absolute -top-6 -right-6 bg-white p-6 rounded-full shadow-2xl text-[#dc2626]">
                        <Heart size={32} fill="currentColor" />
                    </div>
                </div>

                <div className="space-y-8">
                    <h2
                        className="text-5xl md:text-[8rem] font-black text-white font-romantic leading-tight uppercase tracking-tighter cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Final Heading:", heading);
                                if (val) onUpdate?.('finalHeading', val);
                            }
                        }}
                    >
                        {heading}
                    </h2>
                    <div className="h-[2px] w-24 bg-amber-500/20 mx-auto" />
                    <p
                        className="text-amber-500 text-2xl md:text-5xl font-romantic italic cursor-pointer"
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Edit Signature:", signature);
                                if (val) onUpdate?.('signatureText', val);
                            }
                        }}
                    >
                        "{signature}"
                    </p>
                </div>

                {/* Final Engagement Cluster */}
                <div className="pt-12 flex flex-col gap-10">
                    <div className="flex justify-center gap-8">
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="p-6 bg-white/5 rounded-full text-white shadow-xl border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <Share2 size={24} />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            className="p-6 bg-white/5 rounded-full text-white shadow-xl border border-white/10 hover:bg-white/10 transition-colors"
                        >
                            <Send size={24} />
                        </motion.button>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-4 text-white/20 hover:text-white transition-colors uppercase font-black text-[10px] tracking-[0.6em] mx-auto"
                    >
                        <RefreshCw size={14} /> Restart Prophet
                    </motion.button>
                </div>

                {/* Corner detail */}
                <div className="absolute top-10 right-10 text-amber-500/10"><Star size={100} /></div>
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

export default LP7Final;
