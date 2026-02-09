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

const GiftViewer = () => {
    const { uuid } = useParams();
    const [loading, setLoading] = useState(true);
    const [template, setTemplate] = useState<any>(null);
    const [giftData, setGiftData] = useState<any>({});
    const [currentPage, setCurrentPage] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-6xl mb-8"
                >
                    💝
                </motion.div>
                <h2 className="text-xl font-bold font-poppins">Preparing your gift...</h2>
                <div className="mt-4 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                        className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
                    />
                </div>
            </div>
        );
    }

    if (!template) return <div className="min-h-screen flex items-center justify-center">Gift not found</div>;

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex flex-col font-outfit">
            <FloatingHearts />
            <div className="absolute inset-0 grid-paper-bg opacity-20 pointer-events-none" />

            {/* Dynamic Background Glows */}
            <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse-slow pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[150px] rounded-full animate-pulse-slow pointer-events-none" style={{ animationDelay: '2s' }} />

            {/* Header / Brand */}
            <div className="fixed top-0 left-0 right-0 p-8 flex justify-center z-50 pointer-events-none">
                <div className="flex items-center gap-2 glass-header px-6 py-2 rounded-full border border-white/10 shadow-2xl">
                    <span className="text-xl">💝</span>
                    <span className="text-sm font-black tracking-tighter uppercase whitespace-nowrap">
                        <span className="gradient-text">Gift</span>Magic Experience
                    </span>
                </div>
            </div>

            {/* Experience Layer */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10"
                >
                    <div className="max-w-xl w-full perspective-1000">
                        <motion.div
                            whileHover={{ rotateY: 2, rotateX: -2 }}
                            className="glass-card p-12 space-y-10 border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group"
                        >
                            {/* Inner Glossy Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-50 pointer-events-none" />

                            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
                                <motion.div
                                    animate={{
                                        y: [0, -15, 0],
                                        rotate: [0, 5, -5, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="text-8xl filter drop-shadow-[0_0_30px_rgba(255,107,181,0.5)]"
                                >
                                    {template.icon}
                                </motion.div>
                            </div>

                            <div className="space-y-6 pt-8">
                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-4xl md:text-5xl font-black tracking-tighter leading-none"
                                >
                                    <span className="text-white block mb-2">{pageContent.heading || activePage.title}</span>
                                    <div className="h-1.5 w-24 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
                                </motion.h2>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-xl text-white/70 leading-relaxed font-medium italic"
                                >
                                    &ldquo;{pageContent.message || pageContent.subtext || "Love is the greatest gift of all..."}&rdquo;
                                </motion.p>
                            </div>

                            {activePage.type === 'countdown' && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="grid grid-cols-4 gap-3 bg-black/20 p-4 rounded-3xl border border-white/5"
                                >
                                    {[
                                        { label: 'DAYS', value: timeLeft.days },
                                        { label: 'HOURS', value: timeLeft.hours },
                                        { label: 'MINS', value: timeLeft.minutes },
                                        { label: 'SECS', value: timeLeft.seconds }
                                    ].map(item => (
                                        <div key={item.label} className="relative group">
                                            <div className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                                                {String(item.value).padStart(2, '0')}
                                            </div>
                                            <div className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/80 mt-1">{item.label}</div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.02, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleNext}
                                className="w-full h-20 gradient-primary rounded-3xl text-primary-foreground font-black text-xl shadow-[0_20px_40px_-10px_rgba(255,107,181,0.5)] flex items-center justify-center gap-4 group/btn relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    {currentPage === template.pages.length - 1 ? "CELEBRATE EXPERIENCE ✨" : "UNFOLD MORE MAGIC"}
                                    <motion.div
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ChevronRight className="w-8 h-8" />
                                    </motion.div>
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                            </motion.button>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Sophisticated Controls Overlay */}
            <div className="fixed bottom-0 left-0 right-0 p-10 flex items-center justify-between z-50">
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-white border border-white/10 shadow-2xl hover:border-primary/50 transition-all"
                >
                    {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6 text-white/40" />}
                </motion.button>

                <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-1.5">
                        {template.pages.map((_: any, i: number) => (
                            <motion.div
                                key={i}
                                animate={{
                                    width: currentPage === i ? 24 : 8,
                                    backgroundColor: currentPage === i ? 'hsla(var(--primary))' : 'hsla(var(--white) / 0.2)'
                                }}
                                className="h-2 rounded-full transition-all duration-500"
                            />
                        ))}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Magic Sequence</span>
                </div>

                <motion.button
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-white border border-white/10 shadow-2xl hover:border-primary/50 transition-all"
                >
                    <Share2 className="w-6 h-6" />
                </motion.button>
            </div>

            <div className="fixed bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-black text-white/10 uppercase tracking-[0.5em] z-0 pointer-events-none">
                ENCRYPTED MAGIC BY GIFTMAGIC
            </div>
        </div>
    );
};

export default GiftViewer;
