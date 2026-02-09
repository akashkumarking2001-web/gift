import { motion } from "framer-motion";
import { Sparkles, Gift, Heart, ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const SpecialOffersSection = () => {
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
                        className="glass-card p-8 md:p-10 border-2 border-primary/30 relative overflow-hidden group flex flex-col"
                    >
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs font-black px-4 py-2 rounded-bl-xl uppercase tracking-widest">
                            Best Value
                        </div>

                        <div className="mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-3xl mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                💝
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">Valentine's Special Bundle</h3>
                            <p className="text-muted-foreground">Get 3 Premium Templates for the price of one coffee!</p>
                        </div>

                        <div className="space-y-4 mb-8 flex-1">
                            {[
                                "Interactive Love Letter Template",
                                "Polaroid Memory Wall Template",
                                "Our Love Radio Template"
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
                                <span className="text-4xl font-black text-white">₹99</span>
                                <span className="text-lg text-muted-foreground line-through mb-1">₹1,800</span>
                                <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded mb-2">95% OFF</span>
                            </div>

                            <Link to="/checkout" state={{ bundle: "valentines", price: 99 }}>
                                <button className="w-full gradient-primary text-white font-bold py-4 rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                                    Create Now
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Combo Offer */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                        className="glass-card p-8 md:p-10 border border-white/10 relative overflow-hidden group flex flex-col"
                    >
                        <div className="mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-3xl mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                🎁
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">All-Access Combo</h3>
                            <p className="text-muted-foreground">Unlock the entire library of magic for a lifetime.</p>
                        </div>

                        <div className="space-y-4 mb-8 flex-1">
                            {[
                                "Access to ALL 19+ Templates",
                                "Birthday, Anniversary & Fun Categories",
                                "Future Template Updates (1 Year)",
                                "Priority Support"
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
                                <span className="text-4xl font-black text-white">₹399</span>
                                <span className="text-lg text-muted-foreground line-through mb-1">₹5,000</span>
                                <span className="text-xs font-bold text-purple-400 bg-purple-400/10 px-2 py-1 rounded mb-2">92% OFF</span>
                            </div>

                            <Link to="/checkout" state={{ bundle: "all-access", price: 399 }}>
                                <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 text-sm uppercase tracking-widest">
                                    Get Full Access
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
