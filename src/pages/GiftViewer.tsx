import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Heart, Volume2, VolumeX, Share2,
    ChevronRight, ChevronLeft, Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";
import { TEMPLATES, TemplateDefinition } from "../lib/templates";
import FloatingHearts from "../components/landing/FloatingHearts";
import { GiftService } from "../lib/gifts";
import { useToast } from "../hooks/use-toast";
import TemplateRenderer from "../components/templates/TemplateRenderer";
import { useTemplateAudio } from "../hooks/useTemplateAudio";

const GiftViewer = () => {
    const { uuid } = useParams();
    const [loading, setLoading] = useState(true);
    const [template, setTemplate] = useState<any>(null);
    const [giftData, setGiftData] = useState<any>({});
    const [currentPage, setCurrentPage] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const { playClick, playTransition, playReveal, playBGM, isMuted, toggleMute } = useTemplateAudio({
        bgMusicUrl: giftData['global_settings']?.bgMusicUrl,
        isEditor: false
    });

    useEffect(() => {
        const fetchGift = async () => {
            if (!uuid) return;
            try {
                const data = await GiftService.getGiftByUuid(uuid);
                const foundTemplate = TEMPLATES.find((t: any) => t.id === data.template_id);
                if (foundTemplate) {
                    setTemplate(foundTemplate);
                    setGiftData(data.gift_data || {});
                }
            } catch (e) {
                console.error("Failed to fetch gift:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchGift();
    }, [uuid]);

    const activePage = template?.pages[currentPage];
    const pageContent = template ? (giftData[activePage.id] || {}) : {};

    useEffect(() => {
        if (activePage?.type !== 'countdown') return;
        const target = new Date(pageContent.targetDate || Date.now()).getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                clearInterval(interval);
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
    }, [activePage, pageContent.targetDate]);

    const handleNext = () => {
        playTransition();
        if (currentPage === 0) playBGM();

        if (template && currentPage < template.pages.length - 1) {
            setCurrentPage(prev => prev + 1);
        } else {
            // Final celebration
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FF69B4', '#FFB6C1', '#D8BFD8']
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white relative overflow-hidden font-outfit">
                <FloatingHearts />
                <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse-slow pointer-events-none" />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                    style={{ transform: 'translateZ(0)', willChange: 'transform', backfaceVisibility: 'hidden' }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-8"
                >
                    💝
                </motion.div>
                <h2 className="text-xl font-bold font-poppins">Preparing your gift...</h2>
                <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        style={{
                            width: '100%',
                            originX: 0,
                            transform: 'translateZ(0)',
                            willChange: 'transform'
                        }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 2 }}
                        className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
                    />
                </div>
            </div>
        );
    }

    if (!template) return <div className="min-h-screen flex items-center justify-center">Gift not found</div>;

    if (!template) return <div className="min-h-screen flex items-center justify-center">Gift not found</div>;

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col font-outfit">
            <FloatingHearts />

            {/* Template Rendering Layer */}
            <div
                style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                className="flex-1 relative z-10"
            >
                <TemplateRenderer
                    templateSlug={template.slug}
                    pageId={activePage.id}
                    data={giftData[activePage.id] || {}}
                    onNext={handleNext}
                />
            </div>

            {/* Experience Controls (Floating) */}
            <div className="fixed bottom-0 left-0 right-0 p-6 lg:p-10 flex items-center justify-between z-50 pointer-events-none">
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        playClick();
                        toggleMute();
                    }}
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl glass-card flex items-center justify-center text-white border border-white/10 shadow-2xl hover:border-primary/50 transition-all pointer-events-auto"
                >
                    {!isMuted ? <Volume2 className="w-5 h-5 lg:w-6 lg:h-6" /> : <VolumeX className="w-5 h-5 lg:w-6 lg:h-6 text-white/40" />}
                </motion.button>

                <div className="flex flex-col items-center gap-2 lg:gap-3">
                    <div className="flex gap-1.5">
                        {template.pages.map((_: any, i: number) => (
                            <motion.div
                                key={i}
                                animate={{
                                    scaleX: currentPage === i ? 3 : 1,
                                    backgroundColor: currentPage === i ? 'hsla(var(--primary))' : 'hsla(var(--white) / 0.2)'
                                }}
                                style={{ transform: 'translateZ(0)', willChange: 'transform, background-color', transformOrigin: 'center' }}
                                className="h-1.5 lg:h-2 w-2 rounded-full transition-all duration-500"
                            />
                        ))}
                    </div>
                    <span className="text-[8px] lg:text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Chapter {currentPage + 1} of {template.pages.length}</span>
                </div>

                <motion.button
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl glass-card flex items-center justify-center text-white border border-white/10 shadow-2xl hover:border-primary/50 transition-all pointer-events-auto"
                >
                    <div onClick={() => playClick()}>
                        <Share2 className="w-5 h-5 lg:w-6 lg:h-6" />
                    </div>
                </motion.button>
            </div>

            {/* Subtle Brand Watermark */}
            <div className="fixed bottom-3 left-1/2 -translate-x-1/2 text-[7px] lg:text-[9px] font-black text-white/5 uppercase tracking-[0.5em] z-0 pointer-events-none">
                ENCRYPTED MAGIC BY GIFTMAGIC
            </div>

        </div>
    );
};

export default GiftViewer;
