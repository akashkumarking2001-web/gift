import { motion } from "framer-motion";
import { Sparkles, Gift, Heart, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { PurchaseService, BundleTemplate } from "../../lib/purchaseService";

const SpecialOffersSection = () => {
    const [bundles, setBundles] = useState<Record<string, BundleTemplate>>({
        valentines: {
            id: 0,
            bundle_id: 'valentines',
            bundle_name: "Valentine's Bundle",
            template_ids: [],
            price: 99,
            original_price: 2499,
            is_active: true,
            created_at: "",
            updated_at: ""
        },
        'all-access': {
            id: 0,
            bundle_id: 'all-access',
            bundle_name: "All Assets Bundle",
            template_ids: [],
            price: 399,
            original_price: 9999,
            is_active: true,
            created_at: "",
            updated_at: ""
        }
    });

    useEffect(() => {
        PurchaseService.getAllBundles().then(bList => {
            if (bList && bList.length > 0) {
                const bObj: any = {};
                bList.forEach(b => {
                    bObj[b.bundle_id] = b;
                });
                setBundles(prev => ({ ...prev, ...bObj }));
            }
        });
    }, []);

    return (
        <section id="special-offers" className="py-16 relative overflow-hidden">
            <div className="absolute inset-0 grid-paper-bg opacity-40" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-red-500/20 border border-pink-500/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md">
                        <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
                        <span className="text-pink-200 text-xs font-bold uppercase tracking-widest">Limited Time Offer</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black mb-4">
                        Exclusive <span className="gradient-text">Bundles</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                        Unlock premium templates at unbeatable prices.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Valentine's Special Bundle */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                        style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                        className="glass-card p-8 md:p-10 border-2 border-primary/30 relative overflow-hidden group flex flex-col"
                    >
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-black px-4 py-2 rounded-bl-xl uppercase tracking-widest">
                            Most Popular
                        </div>

                        <div className="mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-3xl mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                💝
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">{bundles.valentines.bundle_name}</h3>
                            <p className="text-muted-foreground">Unlock 3 Premium Valentine's Templates for one low price!</p>
                        </div>

                        <div className="space-y-4 mb-8 flex-1">
                            {[
                                "Valentine Journey V3 (8K FLAGSHIP)",
                                "Romantic Journey V2 (Super Animated)",
                                "Interactive Love Question Template",
                                "Full HD Media Support",
                                "Unique Shareable Link"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <div className="flex items-end gap-3 mb-6">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">Bundle Price</span>
                                    <span className="text-4xl font-black text-white">₹{bundles.valentines.price}</span>
                                </div>
                                <span className="text-lg text-muted-foreground line-through mb-1">₹{bundles.valentines.original_price || 2499}</span>
                                <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded mb-2">SAVE {Math.round((((bundles.valentines.original_price || 2499) - bundles.valentines.price) / (bundles.valentines.original_price || 2499)) * 100)}%</span>
                            </div>

                            <Link to="/checkout" state={{ bundle: "valentines", price: bundles.valentines.price, title: bundles.valentines.bundle_name }}>
                                <button className="w-full gradient-primary text-white font-bold py-4 rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                                    Get Bundle Now
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* All Assets Bundle */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                        style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                        className="glass-card p-8 md:p-10 border border-white/10 relative overflow-hidden group flex flex-col"
                    >
                        <div className="mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                💎
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">{bundles['all-access'].bundle_name}</h3>
                            <p className="text-muted-foreground">Unlock EVERYTHING. All current and future templates included.</p>
                        </div>

                        <div className="space-y-4 mb-8 flex-1">
                            {[
                                "Access to ALL 19+ Templates",
                                "All Future Template Releases",
                                "Priority Support",
                                "White-label Options",
                                "Massive Savings"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-white">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <div className="flex items-end gap-3 mb-6">
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Combo Price</span>
                                    <span className="text-4xl font-black text-white">₹{bundles['all-access'].price}</span>
                                </div>
                                <span className="text-lg text-muted-foreground line-through mb-1">₹{bundles['all-access'].original_price || 9999}</span>
                                <span className="text-xs font-bold text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded mb-2">BEST VALUE</span>
                            </div>

                            <Link to="/checkout" state={{ bundle: "all-access", price: bundles['all-access'].price, title: bundles['all-access'].bundle_name }}>
                                <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                                    Get All Assets
                                    <Gift className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SpecialOffersSection;
