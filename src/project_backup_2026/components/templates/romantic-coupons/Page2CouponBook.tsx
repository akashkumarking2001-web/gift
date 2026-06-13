import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Star, Heart, Sparkles, ShieldCheck, Zap, MoveRight, Layers, LayoutGrid } from 'lucide-react';

interface Page2CouponBookProps {
    data: {
        coupons?: Array<{
            title: string;
            description: string;
        }>;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page2CouponBook = ({ data, onNext, isEditing = false, onUpdate }: Page2CouponBookProps) => {
    const defaultData = {
        coupons: data.coupons && data.coupons.length > 0 ? data.coupons : [
            { title: "Movie Night", description: "Your choice of movie, plus popcorn and cuddles." },
            { title: "Home Dinner", description: "I'll cook your favorite meal from scratch." },
            { title: "Foot Massage", description: "30 minutes of pure relaxation after a long day." },
            { title: "One Big Hug", description: "Redeem for a 1-minute long squeeze anytime." }
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0a05] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* Hyper-Realistic Gilded Atmosphere */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1),transparent_70%)]" />
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">

                {/* Visual Anchor Header */}
                <div className="text-center space-y-8 mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-amber-900/10 backdrop-blur-3xl px-12 py-3.5 rounded-full border border-amber-800/20 shadow-2xl mx-auto"
                    >
                        <ShieldCheck size={16} className="text-amber-500" />
                        <span className="text-amber-100/50 font-black uppercase tracking-[0.6em] text-[10px]">Transmission Parameter 02</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <LayoutGrid size={40} className="text-amber-700/40" />
                        <h2 className="text-4xl md:text-8xl font-black text-white font-romantic leading-tight tracking-[0.02em] drop-shadow-2xl">
                            Voucher Registry
                        </h2>
                    </motion.div>
                </div>

                {/* HIGH-FIDELITY TICKET SEQUENCE */}
                <div className="w-full max-w-5xl space-y-16 pb-40">
                    {defaultData.coupons.map((coupon, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group/card relative bg-white/[0.02] backdrop-blur-3xl border-2 border-dashed border-amber-900/30 rounded-[4rem] p-12 md:p-20 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.5)] overflow-hidden isolate transition-all duration-700 hover:border-amber-500/30"
                        >
                            {/* Cinematic Internal Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                            {/* Ticket Perforations */}
                            <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-[#0d0a05] rounded-full border-2 border-dashed border-amber-900/30 z-20" />
                            <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-[#0d0a05] rounded-full border-2 border-dashed border-amber-900/30 z-20" />

                            <div className="relative z-10 flex flex-col gap-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4 py-2 px-6 bg-amber-900/20 rounded-full border border-amber-500/20">
                                        <Ticket size={14} className="text-amber-400" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-100/60">Voucher 00{index + 1}</span>
                                    </div>
                                    <Star size={20} className="text-amber-500/20 group-hover/card:text-amber-400 transition-colors" />
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-3xl md:text-6xl font-black text-white font-romantic leading-tight tracking-tight drop-shadow-xl">{coupon.title}</h3>
                                    <p className="text-amber-100/30 text-lg md:text-2xl leading-[1.6] italic font-romantic tracking-wide drop-shadow-xl max-w-2xl">
                                        "{coupon.description}"
                                    </p>
                                </div>

                                <div className="mt-8 pt-8 border-t border-dashed border-amber-900/20 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <Heart size={16} fill="#f59e0b" className="text-amber-500 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-900/60 font-outfit">Non-Transferable Asset</span>
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/10">Valid: Eternity</span>
                                </div>
                            </div>

                            {/* Massive Background Decor */}
                            <div className="absolute top-10 right-10 text-[10rem] md:text-[18rem] font-black text-white/[0.02] select-none pointer-events-none font-outfit translate-x-12 translate-y-12 group-hover/card:translate-x-0 group-hover/card:translate-y-0 transition-transform duration-1000">
                                LUXE
                            </div>
                        </motion.div>
                    ))}

                    {/* Editor Action Unit */}
                    {isEditing && defaultData.coupons.length < 10 && (
                        <motion.div whileHover={{ scale: 1.02 }} className="pt-12 flex justify-center">
                            <button
                                onClick={() => {
                                    const title = prompt("Voucher Designation:");
                                    if (title) onUpdate?.('coupons', [...defaultData.coupons, { title, description: "Redeemable for one high-fidelity temporal experience..." }]);
                                }}
                                className="group px-12 py-5 bg-amber-900/10 backdrop-blur-2xl border-2 border-dashed border-amber-800/40 rounded-full text-amber-400 font-black text-xs uppercase tracking-[0.6em] hover:bg-amber-900/20 shadow-2xl transition-all flex items-center gap-4"
                            >
                                <Sparkles size={16} className="group-hover:rotate-180 transition-transform duration-700" />
                                Mint New Voucher
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Professional Action Footer */}
                <div className="relative z-10 w-full max-w-2xl mx-auto pt-20 pb-40 flex flex-col items-center gap-12">
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="group relative px-24 py-9 bg-[#0d0a05] border-2 border-amber-900/30 rounded-[3.5rem] text-amber-500 font-black text-xs uppercase tracking-[0.8em] shadow-[0_40px_100px_-20px_rgba(245,158,11,0.3)] transition-all flex items-center gap-6 isolate overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-amber-600 opacity-0 group-hover:opacity-10 transition-opacity rounded-[3.5rem]" />
                        <span className="relative z-10">Archive All Vouchers</span>
                        <MoveRight className="relative z-10 w-6 h-6 border-2 border-amber-900/30 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                    </motion.button>

                    <div className="flex items-center gap-4 opacity-10">
                        <Zap size={14} className="text-amber-500 fill-current" />
                        <span className="text-[8px] font-black tracking-[1em] uppercase text-white">Registry Synchronized</span>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Page2CouponBook;
