import { motion } from "framer-motion";
import { Check, Sparkles, Briefcase, User, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BusinessService } from "../../lib/businessService";
import { SettingsService } from "../../lib/settings";

const PricingSection = () => {
    const [businessPackages, setBusinessPackages] = useState<any[]>([]);
    const [personalPricing, setPersonalPricing] = useState({ price: 149, original_mrp: 499 });
    const [whatsappNumber, setWhatsappNumber] = useState("");

    useEffect(() => {
        // Fetch Business Packages
        BusinessService.getPackages().then(data => {
            if (data) setBusinessPackages(data);
        });

        // Fetch Personal Pricing & WhatsApp
        SettingsService.getSettings().then((s: any) => {
            if (s.whatsapp_number) setWhatsappNumber(s.whatsapp_number);
            if (s.album_pricing) {
                try {
                    const p = typeof s.album_pricing === 'string' ? JSON.parse(s.album_pricing) : s.album_pricing;
                    setPersonalPricing(p);
                } catch (e) {
                    console.error('Error parsing pricing', e);
                }
            }
        });
    }, []);

    const handleActionClick = (pkg: any) => {
        const pkgPrice = Number(pkg.price);
        
        if (pkgPrice === 459 || pkgPrice === 4999) {
            const text = `Hello Giftmagic! I am interested in the ₹${pkgPrice} ${pkg.name} package. Please help me get started!`;
            const wp = whatsappNumber || "918610381533";
            window.open(`https://wa.me/${wp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`, '_blank');
            return;
        }
        
        // Redirect to Vendor Registration
        window.location.href = `/signup?package=${pkg.price}`;
    };

    return (
        <section className="py-20 relative overflow-hidden bg-background">
            <div className="container relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black mb-4">
                        Choose Your <span className="gradient-text">Magic Plan</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-lg mx-auto">
                        Affordable pricing for both personal memories and business growth.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {/* Personal Plan Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8 }}
                        className="glass-card p-8 border border-white/10 relative overflow-hidden group flex flex-col"
                    >
                        <div className="mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-2xl mb-6 shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                <User className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2">Personal Magic</h3>
                            <p className="text-muted-foreground text-sm">Perfect for gifting and personal memories.</p>
                        </div>

                        <div className="space-y-4 mb-8 flex-1">
                            {[
                                "Single High-Quality Frame",
                                "Lifetime Access",
                                "HD Media Support",
                                "Share via Unique Link",
                                "Free AR View"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <Check className="w-3 h-3" />
                                    </div>
                                    <span className="text-sm font-medium text-white/70">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6 border-t border-white/10">
                            <div className="flex items-end gap-3 mb-6">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-1">One Time</span>
                                    <span className="text-3xl font-black text-white">₹{personalPricing.price}</span>
                                </div>
                                <span className="text-sm text-muted-foreground line-through mb-1">₹{personalPricing.original_mrp}</span>
                                <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded mb-1.5 font-mono">
                                    {Math.round(((personalPricing.original_mrp - personalPricing.price) / personalPricing.original_mrp) * 100)}% OFF
                                </span>
                            </div>

                            <button 
                                onClick={() => window.location.href = '/magic-frame/#/register'}
                                className="w-full gradient-primary text-white font-bold py-3.5 rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
                            >
                                Create Now
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>

                    {/* Business Plans Mapping */}
                    {businessPackages.map((pkg, idx) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * (idx + 1) }}
                            whileHover={{ y: -8 }}
                            className={`glass-card p-8 border relative overflow-hidden group flex flex-col ${idx === 1 ? 'border-primary/40 shadow-2xl shadow-primary/5' : 'border-white/10'}`}
                        >
                            {idx === 1 && (
                                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest">
                                    Recommended
                                </div>
                            )}

                            <div className="mb-6">
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform ${
                                    idx === 0 ? 'from-emerald-500 to-teal-600 shadow-emerald-500/20' :
                                    idx === 1 ? 'from-blue-500 to-indigo-600 shadow-blue-500/20' :
                                    'from-purple-500 to-pink-600 shadow-purple-500/20'
                                }`}>
                                    <Briefcase className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-black text-white mb-2">{pkg.name}</h3>
                                <p className="text-muted-foreground text-sm">Grow your business with AR Magic.</p>
                            </div>

                            <div className="space-y-4 mb-8 flex-1">
                                {[
                                    `${(pkg.frame_limit || 0).toLocaleString()} Frames included`,
                                    "Business Dashboard",
                                    "Custom Branding",
                                    "Analytics Tracking",
                                    pkg.price === 4999 || pkg.price === "4999" ? "Lifetime Validity" : 
                                    (pkg.price === 799 || pkg.price === "799") ? "1 Year Validity" : "28 Days Validity"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${
                                            idx === 0 ? 'bg-emerald-500/20 text-emerald-500' :
                                            idx === 1 ? 'bg-blue-500/20 text-blue-500' :
                                            'bg-purple-500/20 text-purple-500'
                                        }`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-sm font-medium text-white/70">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <div className="flex items-end gap-3 mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Business</span>
                                        <span className="text-3xl font-black text-white">₹{pkg.price}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground line-through mb-1">₹{pkg.mrp || (pkg.price * 3)}</span>
                                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded mb-1.5 font-mono">
                                        -{Math.round((( (pkg.mrp || (pkg.price * 3)) - pkg.price) / (pkg.mrp || (pkg.price * 3))) * 100)}%
                                    </span>
                                </div>

                                <button 
                                    onClick={() => handleActionClick(pkg)}
                                    className={`w-full font-bold py-3.5 rounded-xl hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 text-xs uppercase tracking-widest ${
                                    idx === 1 || idx === 2 ? 'gradient-primary text-white shadow-xl shadow-primary/20' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                                }`}>
                                    Partner With Us
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
