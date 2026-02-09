import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft, ChevronRight, Save, Eye, Share2,
    CheckCircle2, Circle, Layout, Image as ImageIcon,
    Smartphone, Monitor
} from "lucide-react";
import { TEMPLATES } from "../lib/templates";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/use-toast";
import FloatingHearts from "../components/landing/FloatingHearts";
import { GiftService } from "../lib/gifts";

const Editor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [template, setTemplate] = useState<any>(null);
    const [gift, setGift] = useState<any>(null);
    const [giftData, setGiftData] = useState<any>({});
    const [activePageIndex, setActivePageIndex] = useState(0);
    const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    // Load template and gift data
    useEffect(() => {
        const loadGift = async () => {
            if (!id) return;
            try {
                const gift = await GiftService.getGift(id);
                setGift(gift);
                const foundTemplate = TEMPLATES.find((t: any) => t.id === gift.template_id);
                if (foundTemplate) {
                    setTemplate(foundTemplate);
                    setGiftData(gift.gift_data || {});
                }
                if (gift.updated_at) setLastSaved(new Date(gift.updated_at));
            } catch (e) {
                console.error(e);
                toast({ title: "Error", description: "Failed to load gift.", variant: "destructive" });
            }
        };
        loadGift();
    }, [id]);

    // Auto-save logic
    useEffect(() => {
        const timer = setInterval(() => {
            handleSave(true);
        }, 30000);
        return () => clearInterval(timer);
    }, [giftData]);

    // Countdown Logic for Preview
    useEffect(() => {
        if (!template) return;
        const activePage = template.pages[activePageIndex];
        const pageData = giftData[activePage.id] || {};

        if (activePage.type !== 'countdown' || !pageData.targetDate) return;

        const target = new Date(pageData.targetDate).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [activePageIndex, giftData, template]);

    const handleSave = async (isAuto = false) => {
        if (isSaving || !id) return;
        setIsSaving(true);

        try {
            await GiftService.updateGift(id, giftData);
            setLastSaved(new Date());
            if (!isAuto) {
                toast({
                    title: "Progress Saved",
                    description: "Your gift has been successfully saved.",
                });
            }
        } catch (error) {
            console.error("Save failed:", error);
            if (!isAuto) {
                toast({
                    title: "Save Failed",
                    description: "There was an error saving your progress.",
                    variant: "destructive",
                });
            }
        } finally {
            setIsSaving(false);
        }
    };



    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, pageId: string, field: string) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setIsUploading(true);
        const newUrls: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                // Check size (max 50MB for video, 5MB for image)
                const maxSize = file.type.startsWith('video/') ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
                if (file.size > maxSize) {
                    toast({ title: "File too large", description: `${file.name} is too large.`, variant: "destructive" });
                    continue;
                }

                const url = await GiftService.uploadMedia(file);
                if (url) newUrls.push(url);
            }

            // Update state
            const currentUrls = giftData[pageId]?.[field] || [];
            updateField(pageId, field, [...currentUrls, ...newUrls]);

            toast({ title: "Upload Complete", description: `Successfully uploaded ${newUrls.length} file(s).` });
        } catch (error: any) {
            console.error("Upload error:", error);
            toast({ title: "Upload Failed", description: error.message || "Failed to upload media.", variant: "destructive" });
        } finally {
            setIsUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    const removeMedia = (pageId: string, field: string, indexToRemove: number) => {
        const currentUrls = giftData[pageId]?.[field] || [];
        const newUrls = currentUrls.filter((_: any, index: number) => index !== indexToRemove);
        updateField(pageId, field, newUrls);
    };

    const handlePublish = async () => {
        if (!id) return;
        try {
            await GiftService.publishGift(id);
            const updatedGift = await GiftService.getGift(id);
            setGift(updatedGift);
            toast({
                title: "Gift Published!",
                description: "You can now share the link with your loved one.",
            });
        } catch (error) {
            toast({
                title: "Publish Failed",
                description: "Make sure all required fields are filled.",
                variant: "destructive",
            });
        }
    };

    const handleShare = () => {
        if (!gift?.gift_uuid) {
            handlePublish();
            return;
        }
        const url = `${window.location.origin}/gift/${gift.gift_uuid}`;
        navigator.clipboard.writeText(url);
        toast({
            title: "Link Copied!",
            description: "Ready to share via WhatsApp or social media.",
        });
    };

    const updateField = (pageId: string, field: string, value: any) => {
        setGiftData((prev: any) => ({
            ...prev,
            [pageId]: {
                ...(prev[pageId] || {}),
                [field]: value
            }
        }));
    };

    const handlePreview = () => {
        if (gift?.gift_uuid) {
            window.open(`/gift/${gift.gift_uuid}`, '_blank');
        } else {
            toast({
                title: "Preview Unavailable",
                description: "Save your changes first to generate a preview.",
                variant: "destructive"
            });
        }
    };

    if (!template) return <div className="min-h-screen flex items-center justify-center">Loading editor...</div>;

    const activePage = template.pages[activePageIndex];

    return (
        <div className="min-h-screen bg-[#050505] relative overflow-hidden flex flex-col font-outfit text-white">
            <FloatingHearts />

            {/* Background Glows */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 grid-paper-bg opacity-10 pointer-events-none" />

            {/* Toolbar */}
            <header className="relative z-30 bg-black/40 backdrop-blur-2xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-6">
                    <motion.button
                        whileHover={{ scale: 1.1, x: -2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/dashboard')}
                        className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-xl border border-white/5 transition-all group"
                    >
                        <ChevronLeft className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                    </motion.button>

                    <div className="h-8 w-[1px] bg-white/10" />

                    <div>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80">Active Protocol</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        </div>
                        <h1 className="font-black text-xl tracking-tight leading-none mt-1">{template.title}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex flex-col items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Sync Status</span>
                        <p className="text-[11px] font-medium text-white/60">
                            {isSaving ? (
                                <span className="flex items-center gap-2">
                                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="text-primary italic">Syncing to cloud...</motion.span>
                                </span>
                            ) : lastSaved ? `Manifest secured ${lastSaved.toLocaleTimeString()}` : "Unsecured Session"}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <motion.button
                            onClick={handlePreview}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white/70 hover:text-white"
                        >
                            <Eye className="w-4 h-4" />
                            <span className="hidden sm:inline">Preview</span>
                        </motion.button>

                        <motion.button
                            onClick={() => handleSave()}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest gradient-primary text-primary-foreground shadow-xl shadow-primary/20"
                        >
                            <Save className="w-4 h-4" />
                            <span className="hidden sm:inline">Save Manifest</span>
                        </motion.button>

                        <motion.button
                            onClick={handleShare}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest bg-pastel-green text-white shadow-xl shadow-pastel-green/20"
                        >
                            <Share2 className="w-4 h-4" />
                            <span className="hidden sm:inline">{gift?.is_published ? "Transmit" : "Finalize & Transmit"}</span>
                        </motion.button>
                    </div>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden relative z-10">
                {/* Sidebar - Page List */}
                <aside className="w-80 bg-black/20 backdrop-blur-3xl border-r border-white/5 overflow-y-auto hidden lg:flex flex-col">
                    <div className="p-8 border-b border-white/5">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-1">Architecture</h2>
                        <p className="text-sm font-black text-white">Template Modules</p>
                    </div>

                    <nav className="p-4 space-y-2 flex-1">
                        {template.pages.map((page: any, index: number) => {
                            const isComplete = page.requiredFields.every((f: string) => giftData[page.id]?.[f]);
                            const isActive = activePageIndex === index;

                            return (
                                <motion.button
                                    key={page.id}
                                    whileHover={{ x: isActive ? 0 : 4 }}
                                    onClick={() => setActivePageIndex(index)}
                                    className={`w-full group flex items-center gap-4 px-5 py-4 rounded-2xl text-sm transition-all relative overflow-hidden ${isActive
                                        ? "bg-white/10 border border-white/10"
                                        : "hover:bg-white/5 text-white/40 hover:text-white/70"
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav"
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_rgba(255,107,181,1)]"
                                        />
                                    )}

                                    <div className={`w-8 h-8 flex items-center justify-center rounded-xl text-[10px] font-black border transition-all ${isActive ? "bg-primary border-transparent text-primary-foreground" : "bg-white/5 border-white/10"}`}>
                                        {String(index + 1).padStart(2, '0')}
                                    </div>

                                    <div className="flex-1 text-left">
                                        <p className={`font-black uppercase tracking-widest text-[10px] mb-0.5 ${isActive ? "text-primary" : "text-white/40"}`}>Module {index + 1}</p>
                                        <p className="font-bold text-xs">{page.title}</p>
                                    </div>

                                    {isComplete ? (
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isActive ? "bg-primary/20 text-primary" : "bg-pastel-green/10 text-pastel-green"}`}>
                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                        </div>
                                    ) : (
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-white/30 transition-colors" />
                                    )}
                                </motion.button>
                            );
                        })}
                    </nav>

                    <div className="p-8 border-t border-white/5">
                        <div className="glass-card p-6 border border-white/10 relative overflow-hidden group">
                            {/* Glow accent */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Studio Progress</span>
                                <span className="text-xs font-black text-primary">60%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "60%" }}
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                />
                            </div>
                            <p className="text-[9px] font-bold text-white/20 mt-4 uppercase tracking-[0.2em] italic">4 modules to completion</p>
                        </div>
                    </div>
                </aside>

                {/* Main Editor Section */}
                <main className="flex-1 overflow-y-auto p-8 lg:p-12 relative">
                    <div className="max-w-3xl mx-auto space-y-10">
                        <header className="flex flex-col gap-2">
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-primary">
                                <Layout className="w-4 h-4" />
                                Configuration Terminal
                            </div>
                            <div className="flex items-center justify-between">
                                <h2 className="text-4xl font-black text-white tracking-tighter">
                                    Edit <span className="text-primary italic">{activePage.title}</span>
                                </h2>
                                <div className="flex gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        disabled={activePageIndex === 0}
                                        onClick={() => setActivePageIndex((prev: any) => prev - 1)}
                                        className="p-3 rounded-2xl glass-card-static border border-white/10 text-white/40 hover:text-white disabled:opacity-20 transition-all shadow-xl"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        disabled={activePageIndex === template.pages.length - 1}
                                        onClick={() => setActivePageIndex((prev: any) => prev + 1)}
                                        className="p-3 rounded-2xl glass-card-static border border-white/10 text-white/40 hover:text-white disabled:opacity-20 transition-all shadow-xl"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </motion.button>
                                </div>
                            </div>
                        </header>

                        <div className="glass-card p-10 md:p-12 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] space-y-10 relative overflow-hidden">
                            {/* Dynamic Glow */}
                            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

                            {/* Dynamic Field Rendering */}
                            <div className="space-y-8 relative z-10">
                                {activePage.requiredFields.map((field: string) => (
                                    <motion.div
                                        key={field}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-4"
                                    >
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 ml-2 block">
                                            {field.replace(/([A-Z])/g, ' $1').trim()} Payload
                                        </label>

                                        {field === 'message' || field.includes('Body') ? (
                                            <div className="relative group">
                                                <textarea
                                                    className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-8 text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium text-lg min-h-[200px]"
                                                    placeholder={`Type your ${field.toLowerCase()} here...`}
                                                    value={giftData[activePage.id]?.[field] || ''}
                                                    onChange={(e: any) => updateField(activePage.id, field, e.target.value)}
                                                />
                                                <div className="absolute right-6 bottom-6 text-[10px] font-black tracking-widest text-white/20">CTRL + S</div>
                                            </div>
                                        ) : field === 'photos' || field === 'videos' || field.includes('media') ? (
                                            <div className="space-y-6">
                                                {/* Upload Area */}
                                                <div className="relative group border-2 border-dashed border-white/10 rounded-[2.5rem] p-10 hover:bg-white/5 hover:border-primary/40 transition-all text-center">
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*,video/*"
                                                        onChange={(e) => handleFileUpload(e, activePage.id, field)}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        disabled={isUploading}
                                                    />

                                                    {isUploading ? (
                                                        <div className="flex flex-col items-center gap-4">
                                                            <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                                                            <p className="text-sm font-bold text-white/60 animate-pulse">Uploading Media...</p>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary border border-primary/20 mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                                <ImageIcon className="w-8 h-8" />
                                                            </div>
                                                            <p className="text-lg font-black text-white italic">Drop Images or Videos Here</p>
                                                            <p className="text-[10px] font-bold text-white/30 mt-2 uppercase tracking-widest">JPG, PNG, MP4 (Max 50MB)</p>
                                                        </>
                                                    )}
                                                </div>

                                                {/* Preview Grid */}
                                                {(giftData[activePage.id]?.[field] || []).length > 0 && (
                                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                                        {(giftData[activePage.id]?.[field] || []).map((url: string, idx: number) => (
                                                            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group/item border border-white/10 bg-black/40">
                                                                {url.match(/\.(mp4|webm|mov)$/i) ? (
                                                                    <video src={url} className="w-full h-full object-cover" muted loop autoPlay playsInline />
                                                                ) : (
                                                                    <img src={url} alt="Uploaded" className="w-full h-full object-cover" />
                                                                )}

                                                                <button
                                                                    onClick={() => removeMedia(activePage.id, field, idx)}
                                                                    className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover/item:opacity-100 transition-opacity"
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ) : field.includes('Date') ? (
                                            <div className="relative group">
                                                <input
                                                    type="datetime-local"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-mono tracking-widest"
                                                    value={giftData[activePage.id]?.[field] || ''}
                                                    onChange={(e: any) => updateField(activePage.id, field, e.target.value)}
                                                />
                                            </div>
                                        ) : (
                                            <div className="relative group">
                                                <input
                                                    type="text"
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-lg font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                                    placeholder={`SPECIFY ${field.toUpperCase()}`}
                                                    value={giftData[activePage.id]?.[field] || ''}
                                                    onChange={(e: any) => updateField(activePage.id, field, e.target.value)}
                                                />
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-8 group">
                            <motion.button
                                whileHover={{ x: -5 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={activePageIndex === 0}
                                onClick={() => setActivePageIndex((prev: any) => prev - 1)}
                                className="flex items-center gap-4 px-8 py-5 rounded-3xl font-black uppercase tracking-widest text-xs border border-white/5 hover:bg-white/5 transition-all text-white/40 hover:text-white disabled:opacity-10"
                            >
                                <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                                Previous Module
                            </motion.button>
                            <motion.button
                                whileHover={{ x: 5, scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={activePageIndex === template.pages.length - 1}
                                onClick={() => setActivePageIndex((prev: any) => prev + 1)}
                                className="flex items-center gap-4 px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs gradient-primary text-primary-foreground shadow-2xl shadow-primary/20 transition-all disabled:opacity-10"
                            >
                                Advance Protocol
                                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </motion.button>
                        </div>
                    </div>
                </main>

                {/* Live Preview Pane */}
                <aside className="w-[500px] bg-black/40 backdrop-blur-3xl border-l border-white/5 p-10 hidden xl:flex flex-col gap-10 overflow-hidden">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-1">Live Manifest</h2>
                            <p className="text-sm font-black text-white">Visual Verification</p>
                        </div>
                        <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-xl">
                            <button
                                onClick={() => setPreviewMode('mobile')}
                                className={`p-2.5 rounded-xl transition-all ${previewMode === 'mobile' ? 'bg-primary shadow-lg text-primary-foreground' : 'text-white/40 hover:text-white'}`}
                            >
                                <Smartphone className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setPreviewMode('desktop')}
                                className={`p-2.5 rounded-xl transition-all ${previewMode === 'desktop' ? 'bg-primary shadow-lg text-primary-foreground' : 'text-white/40 hover:text-white'}`}
                            >
                                <Monitor className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                        <motion.div
                            layout
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                maxWidth: previewMode === 'mobile' ? 320 : '100%',
                                aspectRatio: previewMode === 'mobile' ? 9 / 18.5 : 16 / 9,
                                borderRadius: previewMode === 'mobile' ? '4rem' : '1rem'
                            }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className={`relative w-full bg-[#0A0A0A] border-[14px] border-[#1C1C1E] shadow-[0_100px_100px_-30px_rgba(0,0,0,0.8)] p-1 overflow-hidden group/phone transition-all duration-500`}
                        >
                            {/* Notch */}
                            {/* Notch - Only show on mobile */}
                            {previewMode === 'mobile' && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-[#1C1C1E] rounded-b-3xl z-50 flex items-center justify-center">
                                    <div className="w-12 h-1 bg-white/5 rounded-full" />
                                </div>
                            )}

                            {/* Screen Content */}
                            <div className={`w-full h-full bg-[#050505] ${previewMode === 'mobile' ? 'rounded-[3rem]' : 'rounded-lg'} relative overflow-hidden flex items-center justify-center isolate`}>
                                <FloatingHearts />
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-secondary/10 pointer-events-none" />

                                <div className="relative z-10 px-8 py-12 flex flex-col items-center text-center w-full">
                                    <motion.div
                                        key={activePageIndex}
                                        initial={{ filter: 'blur(20px)', opacity: 0, scale: 1.5 }}
                                        animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.8, type: "spring" }}
                                        className="text-7xl mb-10 drop-shadow-[0_0_30px_rgba(255,107,181,0.5)]"
                                    >
                                        {template.icon}
                                    </motion.div>

                                    <motion.h3
                                        key={`heading-${activePageIndex}`}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="font-black text-2xl mb-4 text-white leading-tight tracking-tight uppercase"
                                    >
                                        {giftData[activePage.id]?.heading || activePage.title}
                                    </motion.h3>

                                    <motion.p
                                        key={`msg-${activePageIndex}`}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-sm text-white/40 font-medium leading-relaxed italic"
                                    >
                                        {giftData[activePage.id]?.message || giftData[activePage.id]?.subtext || "Real-time verification stream active..."}
                                    </motion.p>

                                    {/* Countdown Preview */}
                                    {activePage.type === 'countdown' && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="grid grid-cols-4 gap-2 bg-black/40 p-3 rounded-2xl border border-white/10 mt-6"
                                        >
                                            {[
                                                { label: 'D', value: timeLeft.days },
                                                { label: 'H', value: timeLeft.hours },
                                                { label: 'M', value: timeLeft.minutes },
                                                { label: 'S', value: timeLeft.seconds }
                                            ].map(item => (
                                                <div key={item.label} className="text-center">
                                                    <div className="text-lg font-black text-white">{String(item.value).padStart(2, '0')}</div>
                                                    <div className="text-[6px] font-bold text-primary">{item.label}</div>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}

                                    {/* Bottom Indicator */}
                                    <div className="absolute bottom-12 left-0 right-0 px-10">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] font-black text-white/20 tracking-widest italic">{String(activePageIndex + 1).padStart(2, '0')}.</span>
                                            <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_10px_rgba(255,107,181,1)]" />
                                            <span className="text-[10px] font-black text-white/20 tracking-widest italic">{String(template.pages.length).padStart(2, '0')}.</span>
                                        </div>
                                        <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                animate={{ width: `${((activePageIndex + 1) / template.pages.length) * 100}%` }}
                                                className="h-full bg-gradient-to-r from-primary to-secondary"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Ambient Light */}
                            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/phone:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                        </motion.div>

                        <p className="mt-10 text-[10px] font-black text-white/10 uppercase tracking-[0.5em] italic">Encrypted Secure Stream v4.2</p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Editor;
