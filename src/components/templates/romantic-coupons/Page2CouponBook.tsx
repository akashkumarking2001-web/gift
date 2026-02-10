import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Ticket, Star, Heart, Sparkles } from 'lucide-react';

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
        <div className="min-h-screen relative overflow-hidden bg-[#0a0805] flex flex-col items-center justify-start p-8 md:p-16 overflow-y-auto scrollbar-hide">
            {/* Elegant Background Texture */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.05)_0%,transparent_60%)]" />

            <div className="relative z-10 w-full max-w-4xl text-center mb-16">
                <h2 className="text-3xl font-black text-white uppercase tracking-[0.5em] opacity-40">Your Love Vouchers</h2>
            </div>

            {/* Coupons Grid */}
            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-20">
                {defaultData.coupons.map((coupon, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
                        className={`relative group/coupon bg-[#111111] border-2 border-dashed border-amber-900/40 rounded-[2rem] p-10 flex flex-col overflow-hidden shadow-2xl transition-all ${isEditing ? 'cursor-pointer hover:border-amber-500/50' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const title = prompt("Edit Coupon Title:", coupon.title);
                                const desc = prompt("Edit Coupon Description:", coupon.description);
                                if (title !== null || desc !== null) {
                                    const newCoupons = [...defaultData.coupons];
                                    newCoupons[index] = {
                                        title: title || coupon.title,
                                        description: desc || coupon.description
                                    };
                                    onUpdate?.('coupons', newCoupons);
                                }
                            }
                        }}
                    >
                        {/* Ticket Perforations */}
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0a0805] rounded-full border-r-2 border-dashed border-amber-900/40" />
                        <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#0a0805] rounded-full border-l-2 border-dashed border-amber-900/40" />

                        <div className="flex justify-between items-start mb-6">
                            <Star className="text-amber-500/30" size={24} />
                            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500/40 italic">#00{index + 1}</div>
                        </div>

                        <h3 className="text-3xl font-black text-white mb-4 font-lovely tracking-tight">{coupon.title}</h3>
                        <p className="text-white/40 text-sm leading-relaxed italic">{coupon.description}</p>

                        {/* Footer of the ticket */}
                        <div className="mt-8 pt-8 border-t border-dashed border-amber-900/20 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Heart size={14} fill="#f59e0b" className="text-amber-500" />
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 font-inter">Non-Refundable</span>
                            </div>
                            <Ticket size={20} className="text-amber-500/20" />
                        </div>

                        {isEditing && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/coupon:opacity-100 transition-opacity">
                                <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">Double Click to Edit Coupon</span>
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Add Coupon (Editor Only) */}
                {isEditing && defaultData.coupons.length < 10 && (
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="rounded-[2rem] border-2 border-dashed border-amber-500/10 flex flex-col items-center justify-center gap-4 hover:border-amber-500/30 hover:bg-amber-600/5 transition-all cursor-pointer min-h-[250px]"
                        onClick={() => {
                            const title = prompt("Enter Coupon Title:");
                            if (title) {
                                onUpdate?.('coupons', [...defaultData.coupons, {
                                    title,
                                    description: "Redeemable for one beautiful moment together."
                                }]);
                            }
                        }}
                    >
                        <Sparkles className="text-amber-500 opacity-20 w-12 h-12" />
                        <span className="text-[10px] font-black text-amber-500 opacity-20 uppercase tracking-[0.4em]">Add Voucher</span>
                    </motion.div>
                )}
            </div>

            {/* Termination Footer */}
            <div className="relative z-10 w-full max-w-xs mx-auto mt-auto pb-20">
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="w-full py-5 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full text-white font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl shadow-amber-600/30"
                >
                    Claim My History →
                </motion.button>
            </div>
        </div>
    );
};

export default Page2CouponBook;
