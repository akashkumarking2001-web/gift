import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Check, Shield, Star, Clock, Zap } from "lucide-react";
import { TEMPLATES, TemplateDefinition } from "../lib/templates";
import { TemplateService } from "../lib/templateService";
import FloatingHearts from "../components/landing/FloatingHearts";

const TemplateDetails = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [template, setTemplate] = useState<TemplateDefinition | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Use local templates directly
        const t = TEMPLATES.find(t => t.slug === slug);
        setTemplate(t || null);
        setLoading(false);

        // Database version (disabled for now)
        // TemplateService.getAll().then(templates => {
        //     const t = templates.find(t => t.slug === slug);
        //     setTemplate(t || null);
        //     setLoading(false);
        // });
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a060a] flex items-center justify-center text-white">
                <FloatingHearts />
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div
                        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                        className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"
                    />
                    <p className="text-white/60 font-mono text-sm">Loading Magic...</p>
                </div>
            </div>
        );
    }

    if (!template) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-[#0a060a]">
                <div className="text-center space-y-4">
                    <p className="text-xl">Template not found.</p>
                    <button onClick={() => navigate("/")} className="text-primary underline hover:text-white transition-colors">
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    const handleBuyNow = () => {
        navigate("/checkout", {
            state: {
                title: template.title,
                price: template.price,
                templateId: template.id,
                mrp: template.originalPrice
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#0a060a] text-white font-sans selection:bg-primary/30 overflow-x-hidden">
            <FloatingHearts />

            {/* Navbar placeholder or back button */}
            <nav className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors glass-card-static px-4 py-2 rounded-full"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>
            </nav>

            <main className="container mx-auto px-4 py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left: Video Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                        className="space-y-6"
                    >
                        <div className="relative aspect-video rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl group">
                            {template.demo_video_url ? (
                                <>
                                    {/* Actual Demo Video */}
                                    <video
                                        src={template.demo_video_url}
                                        className="w-full h-full object-cover"
                                        controls
                                        poster={template.thumbnail_url || template.cover_image_url}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="absolute bottom-4 left-4 glass-card-static px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        <Play className="w-3 h-3 fill-current" />
                                        Demo Video
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* Placeholder if no video */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`} />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                                            <Play className="w-8 h-8 text-white fill-white" />
                                        </div>
                                    </div>
                                    {template.thumbnail_url || template.cover_image_url ? (
                                        <img
                                            src={template.thumbnail_url || template.cover_image_url}
                                            alt={template.title}
                                            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                                        />
                                    ) : (
                                        <img
                                            src={`https://source.unsplash.com/random/800x600?${template.category},gift`}
                                            alt={template.title}
                                            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                                        />
                                    )}
                                    <div className="absolute bottom-4 left-4 glass-card-static px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        <Play className="w-3 h-3 fill-current" />
                                        Video Preview
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Preview Images Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            {template.preview_images && template.preview_images.length > 0 ? (
                                template.preview_images.slice(0, 3).map((imgUrl: string, i: number) => (
                                    <div key={i} className="aspect-video rounded-xl glass-card border border-white/10 overflow-hidden relative cursor-pointer hover:border-primary/50 transition-colors group">
                                        <img
                                            src={imgUrl}
                                            alt={`${template.title} preview ${i + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                e.currentTarget.src = `https://source.unsplash.com/random/400x300?${template.category},${i}`;
                                            }}
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                                    </div>
                                ))
                            ) : (
                                [1, 2, 3].map((i) => (
                                    <div key={i} className="aspect-video rounded-xl glass-card border border-white/10 overflow-hidden relative cursor-pointer hover:border-primary/50 transition-colors">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`} />
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>

                    {/* Right: Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                        className="space-y-8"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-widest">
                                    {template.category}
                                </span>
                                {template.tag && (
                                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-black uppercase tracking-widest">
                                        {template.tag}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
                                {template.title}
                            </h1>
                            <div className="flex items-center gap-4 text-lg">
                                <span className="text-3xl font-black text-primary">₹{template.price}</span>
                                <span className="text-white/40 line-through decoration-white/20">₹{template.originalPrice}</span>
                                <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-bold rounded">
                                    {Math.round(((template.originalPrice - template.price) / template.originalPrice) * 100)}% OFF
                                </span>
                            </div>
                        </div>

                        <p className="text-white/70 text-lg leading-relaxed border-l-2 border-primary/30 pl-6">
                            Create an unforgettable {template.category.toLowerCase()} experience.
                            Fully interactive, mobile-responsive, and ready to share in minutes.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { icon: Clock, label: "5 Min Setup" },
                                { icon: Zap, label: "Instant Delivery" },
                                { icon: Shield, label: "Secure & Private" },
                                { icon: Star, label: "Premium Quality" }
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <feature.icon className="w-5 h-5 text-primary" />
                                    <span className="font-bold text-sm">{feature.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-white/10 space-y-4">
                            <button
                                onClick={handleBuyNow}
                                className="w-full bg-primary hover:bg-primary/90 text-white text-xl font-bold py-5 rounded-2xl shadow-xl shadow-primary/20 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
                            >
                                Create This Gift Now
                            </button>
                            <p className="text-center text-xs text-white/40 uppercase tracking-widest">
                                100% Satisfaction Guarantee
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
};

export default TemplateDetails;
