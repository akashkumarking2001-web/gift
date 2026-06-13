import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft, ChevronRight, Save, Eye, Share2,
    CheckCircle2, Circle, Layout, Image as ImageIcon,
    Smartphone, Monitor, Music
} from "lucide-react";
import { TEMPLATES } from "../lib/templates";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/use-toast";
import FloatingHearts from "../components/landing/FloatingHearts";
import { GiftService } from "../lib/gifts";
import TemplateRenderer from "../components/templates/TemplateRenderer";

const Editor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();

    const [template, setTemplate] = useState<any>(null);
    const [gift, setGift] = useState<any>(null);
    const [giftData, setGiftData] = useState<any>({});
    const [activePageIndex, setActivePageIndex] = useState(0);
    const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');
    const [isDesignView, setIsDesignView] = useState(false);
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
            <div
                style={{ transform: 'translateZ(0)', willChange: 'opacity', backfaceVisibility: 'hidden' }}
                className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none"
            />
            <div
                style={{ transform: 'translateZ(0)', willChange: 'opacity', backfaceVisibility: 'hidden' }}
                className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none"
            />
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
                            onClick={() => setIsDesignView(!isDesignView)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isDesignView ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-white/5 border border-white/10 text-white/70 hover:text-white'}`}
                        >
                            <Layout className="w-4 h-4" />
                            <span className="hidden sm:inline">{isDesignView ? "Editing View" : "Design View"}</span>
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

            <div className={`flex-1 flex overflow-hidden relative z-10 ${isDesignView ? 'bg-black' : ''}`}>
                {/* Sidebar - Page List (Modules) */}
                {!isDesignView && (
                    <aside
                        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                        className="w-20 lg:w-64 bg-black/40 backdrop-blur-3xl border-r border-white/5 overflow-y-auto flex flex-col transition-all"
                    >
                        <div className="p-6 lg:p-8 border-b border-white/5">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-1 hidden lg:block">Architecture</h2>
                            <p className="text-sm font-black text-white hidden lg:block">Modules</p>
                            <Layout className="w-5 h-5 text-white/40 lg:hidden mx-auto" />
                        </div>

                        <nav className="p-2 lg:p-4 space-y-2 flex-1">
                            {template.pages.map((page: any, index: number) => {
                                const isComplete = page.requiredFields.every((f: string) => giftData[page.id]?.[f]);
                                const isActive = activePageIndex === index;

                                return (
                                    <motion.button
                                        key={page.id}
                                        whileHover={{ x: isActive ? 0 : 4 }}
                                        onClick={() => setActivePageIndex(index)}
                                        className={`w-full group flex items-center justify-center lg:justify-start gap-4 p-3 lg:px-5 lg:py-4 rounded-2xl text-sm transition-all relative overflow-hidden ${isActive
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

                                        <div className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-xl text-[10px] font-black border transition-all ${isActive ? "bg-primary border-transparent text-primary-foreground" : "bg-white/5 border-white/10"}`}>
                                            {String(index + 1).padStart(2, '0')}
                                        </div>

                                        <div className="hidden lg:block flex-1 text-left">
                                            <p className={`font-black uppercase tracking-widest text-[10px] mb-0.5 ${isActive ? "text-primary" : "text-white/40"}`}>Module {index + 1}</p>
                                            <p className="font-bold text-xs truncate max-w-[120px]">{page.title}</p>
                                        </div>

                                        {isComplete && (
                                            <div className={`hidden lg:flex w-6 h-6 rounded-full items-center justify-center ${isActive ? "bg-primary/20 text-primary" : "bg-pastel-green/10 text-pastel-green"}`}>
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            </div>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </nav>
                    </aside>
                )}

                {/* Center Preview Section */}
                <main className="flex-1 flex flex-col bg-[#050505] relative overflow-hidden">
                    {/* PC/Mobile Toggles */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex bg-white/5 border border-white/10 rounded-2xl p-1.5 backdrop-blur-xl">
                        <button
                            onClick={() => setPreviewMode('mobile')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${previewMode === 'mobile' ? 'bg-primary shadow-lg text-primary-foreground' : 'text-white/40 hover:text-white'}`}
                        >
                            <Smartphone className="w-4 h-4" />
                            Mobile
                        </button>
                        <button
                            onClick={() => setPreviewMode('desktop')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${previewMode === 'desktop' ? 'bg-primary shadow-lg text-primary-foreground' : 'text-white/40 hover:text-white'}`}
                        >
                            <Monitor className="w-4 h-4" />
                            Desktop
                        </button>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-4 lg:p-12 overflow-auto">
                        <AnimatePresence mode="wait">
                            <motion.div
                                layout
                                key={`${previewMode}-${isDesignView}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                                className={`relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] transition-all duration-500 overflow-hidden isolate ${isDesignView
                                    ? 'w-full h-full border-0 rounded-0'
                                    : previewMode === 'mobile'
                                        ? 'w-[340px] h-[680px] border-[12px] border-[#1C1C1E] rounded-[3rem]'
                                        : 'w-full max-w-5xl aspect-video border-[1px] border-white/10 rounded-2xl'
                                    }`}
                            >
                                {/* Mobile Notch */}
                                {previewMode === 'mobile' && !isDesignView && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1C1C1E] rounded-b-3xl z-50 flex items-center justify-center">
                                        <div className="w-10 h-1 bg-white/5 rounded-full" />
                                    </div>
                                )}

                                <div className="w-full h-full bg-[#050505] relative overflow-y-auto scrollbar-hide">
                                    <div
                                        className="w-full min-h-full transition-transform duration-500 origin-top"
                                        style={{
                                            transform: (previewMode === 'mobile' && !isDesignView) ? 'scale(0.84)' : 'none',
                                            width: (previewMode === 'mobile' && !isDesignView) ? '375px' : '100%',
                                            margin: (previewMode === 'mobile' && !isDesignView) ? '0 auto' : '0'
                                        }}
                                    >
                                        <TemplateRenderer
                                            templateSlug={template.slug}
                                            pageId={activePage.id}
                                            data={giftData[activePage.id] || {}}
                                            onNext={() => {
                                                if (activePageIndex < template.pages.length - 1) {
                                                    setActivePageIndex(activePageIndex + 1);
                                                }
                                            }}
                                            isEditing={!isDesignView}
                                            onUpdate={(field: string, value: any) => updateField(activePage.id, field, value)}
                                        />
                                    </div>

                                    {/* Direct Edit Tooltip */}
                                    {!isDesignView && (
                                        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
                                            <motion.div
                                                animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="bg-black/50 backdrop-blur-md border border-white/10 text-white/50 text-[7px] font-black uppercase tracking-[0.4em] px-4 py-2 rounded-full flex items-center gap-2 whitespace-nowrap"
                                            >
                                                Double Click Elements to Direct Edit
                                            </motion.div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons for Center Section */}
                    {!isDesignView && (
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={activePageIndex === 0}
                                onClick={() => setActivePageIndex((prev: any) => prev - 1)}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white disabled:opacity-20 transition-all shadow-xl"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </motion.button>
                            <div className="glass-card-static px-6 py-3 border border-white/10 text-xs font-black uppercase tracking-widest text-white/60">
                                {activePageIndex + 1} / {template.pages.length}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={activePageIndex === template.pages.length - 1}
                                onClick={() => setActivePageIndex((prev: any) => prev + 1)}
                                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white disabled:opacity-20 transition-all shadow-xl"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </motion.button>
                        </div>
                    )}
                </main>

                {/* Right Configuration Sidebar */}
                {!isDesignView && (
                    <aside
                        style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                        className="w-96 bg-black/40 backdrop-blur-3xl border-l border-white/5 overflow-y-auto hidden xl:flex flex-col"
                    >
                        <div className="p-8 border-b border-white/5 bg-white/5">
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-2">
                                <Layout className="w-4 h-4" />
                                Configuration
                            </div>
                            <h2 className="text-2xl font-black text-white tracking-widest uppercase font-romantic gradient-text">Customizing</h2>
                        </div>

                        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-10 scrollbar-hide">
                            <header className="mb-6">
                                <div className="mb-8 space-y-4 pb-6 border-b border-white/10">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-primary">
                                        <Music className="w-4 h-4" />
                                        Audio Experience
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Background Ambience (Max 2MB)</label>
                                        <div className="flex items-center gap-3">
                                            <div className="relative flex-1 group/upload">
                                                <input
                                                    type="text"
                                                    value={giftData['global_settings']?.bgMusicUrl || ""}
                                                    readOnly
                                                    placeholder="No audio track selected"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white/60 focus:outline-none cursor-pointer"
                                                    onClick={() => document.getElementById('bgm-upload')?.click()}
                                                />
                                                <input
                                                    id="bgm-upload"
                                                    type="file"
                                                    accept="audio/mp3,audio/mpeg"
                                                    className="hidden"
                                                    onChange={async (e) => {
                                                        const file = e.target.files?.[0];
                                                        if (!file) return;
                                                        if (file.size > 2 * 1024 * 1024) {
                                                            toast({ title: "File too large", description: "Audio must be under 2MB.", variant: "destructive" });
                                                            return;
                                                        }
                                                        setIsUploading(true);
                                                        try {
                                                            const url = await GiftService.uploadMedia(file);
                                                            if (url) updateField('global_settings', 'bgMusicUrl', url);
                                                            toast({ title: "Audio Uploaded", description: "Background ambience set successfully." });
                                                        } catch (err) {
                                                            console.error(err);
                                                            toast({ title: "Upload Failed", description: "Could not upload audio file.", variant: "destructive" });
                                                        } finally {
                                                            setIsUploading(false);
                                                        }
                                                    }}
                                                />
                                                <div className="absolute right-2 top-2">
                                                    <button
                                                        onClick={() => document.getElementById('bgm-upload')?.click()}
                                                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-primary"
                                                    >
                                                        {isUploading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Music className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            </div>
                                            {giftData['global_settings']?.bgMusicUrl && (
                                                <button
                                                    onClick={() => updateField('global_settings', 'bgMusicUrl', '')}
                                                    className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-colors"
                                                >
                                                    <div className="w-4 h-4 relative">
                                                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-current rotate-45" />
                                                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-current -rotate-45" />
                                                    </div>
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-[10px] text-white/30">Auto-plays on view mode. Ducking enabled.</p>
                                    </div>
                                </div>

                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] mb-1">Active Chapter</p>
                                <h3 className="text-xl font-black text-white tracking-tighter">{activePage.title}</h3>
                            </header>

                            <div className="space-y-10">
                                {activePage.requiredFields.map((field: string) => (
                                    <motion.div
                                        key={field}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-4 group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 group-focus-within:text-primary transition-colors flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-primary" />
                                                {field.replace(/([A-Z])/g, ' $1').trim()}
                                            </label>
                                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">Property Layer</span>
                                        </div>

                                        {field.toLowerCase().includes('image') || field.toLowerCase().includes('photo') ? (
                                            <div className="space-y-4">
                                                <div className="relative group/upload">
                                                    <input
                                                        type="text"
                                                        value={giftData[activePage.id]?.[field] || ""}
                                                        onChange={(e) => updateField(activePage.id, field, e.target.value)}
                                                        placeholder="Enter Media URL..."
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                                                    />
                                                    <div className="absolute right-3 top-3">
                                                        <button className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/40 hover:text-primary">
                                                            <ImageIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="p-1.5 bg-white/5 rounded-3xl border border-white/5">
                                                    <div className="relative aspect-video rounded-2xl overflow-hidden glass-card">
                                                        {giftData[activePage.id]?.[field] ? (
                                                            <img
                                                                src={giftData[activePage.id][field]}
                                                                alt="Preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex flex-col items-center justify-center text-white/10 gap-2">
                                                                <ImageIcon className="w-8 h-8" />
                                                                <span className="text-[10px] font-black uppercase tracking-widest">No Media Selected</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : field.toLowerCase().includes('text') || field.toLowerCase().includes('message') || field.toLowerCase().includes('reason') ? (
                                            <textarea
                                                value={giftData[activePage.id]?.[field] || ""}
                                                onChange={(e) => updateField(activePage.id, field, e.target.value)}
                                                rows={4}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all resize-none font-medium leading-relaxed"
                                                placeholder={`Enter your ${field.toLowerCase()}...`}
                                            />
                                        ) : field.toLowerCase().includes('date') ? (
                                            <input
                                                type="datetime-local"
                                                value={giftData[activePage.id]?.[field] || ""}
                                                onChange={(e) => updateField(activePage.id, field, e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all font-mono"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={giftData[activePage.id]?.[field] || ""}
                                                onChange={(e) => updateField(activePage.id, field, e.target.value)}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:bg-white/[0.08] transition-all"
                                                placeholder={`Enter ${field}...`}
                                            />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Secure Save Action */}
                        <div className="p-8 border-t border-white/5 bg-black/40 backdrop-blur-xl">
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSave}
                                disabled={isSaving}
                                className="w-full h-16 rounded-2xl gradient-primary text-white font-black text-sm uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(255,107,181,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(255,107,181,0.5)] transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
                            >
                                {isSaving ? (
                                    <span className="flex items-center gap-3">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Transmitting...
                                    </span>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                        <span>Secure Progress</span>
                                    </>
                                )}
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </motion.button>
                            <div className="mt-4 flex items-center justify-center gap-2 text-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.2em]">Encrypted Secure Stream v4.2</span>
                            </div>
                        </div>
                    </aside>
                )}
            </div >
        </div >
    );
};

export default Editor;
