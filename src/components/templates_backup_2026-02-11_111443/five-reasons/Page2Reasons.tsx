import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Heart, Sparkles, Star, Target, ChevronRight, ChevronLeft, ShieldCheck, MoveRight, Zap, Target as TargetIcon } from 'lucide-react';

interface Page2ReasonsProps {
    data: {
        r1?: string;
        r2?: string;
        r3?: string;
        r4?: string;
        r5?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Reasons = ({ data, onNext, isEditing = false, onUpdate }: Page2ReasonsProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const defaultData = {
        r1: data.r1 || "The way you smile whenever you see me.",
        r2: data.r2 || "How you always know exactly what to say.",
        r3: data.r3 || "Your passion for the things you love.",
        r4: data.r4 || "The way you make me feel safe and heard.",
        r5: data.r5 || "Simply because you are uniquely you."
    };

    const reasons = [defaultData.r1, defaultData.r2, defaultData.r3, defaultData.r4, defaultData.r5];
    const sequenceColor = '#f59e0b'; // Premium Gold/Amber

    const handleNext = () => {
        if (activeIndex < 4) setActiveIndex(prev => prev + 1);
        else onNext();
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0a0a] flex flex-col items-center justify-start p-8 md:p-24 overflow-y-auto scrollbar-hide isolate font-outfit">

            {/* HYPER-REALISTIC CINEMATIC ENVIRONMENT (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.1, 0.25, 0.1] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1),transparent_70%)] blur-[100px]"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/film-grain.png')]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-20">

                {/* VISUAL STATUS ANCHOR: Sequencing Protocol */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-4 bg-amber-900/10 backdrop-blur-3xl px-14 py-4 rounded-full border border-amber-800/20 shadow-2xl mx-auto isolate"
                >
                    <TargetIcon size={18} className="text-amber-500" />
                    <span className="text-amber-100/50 font-black uppercase tracking-[0.8em] text-[10px]">Inventory Sequence Protocol 02 // Step 0{activeIndex + 1}</span>
                    <Zap size={18} className="text-amber-500 fill-current animate-pulse" />
                </motion.div>

                {/* THE NAVIGATION MATRIX: High-Density Gilded Status Units */}
                <div className="flex gap-6 md:gap-10 items-center bg-white/[0.02] backdrop-blur-3xl p-8 rounded-[3.5rem] border border-white/5 shadow-3xl isolate">
                    {reasons.map((_, i) => (
                        <motion.button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className="relative group flex flex-col items-center gap-4"
                        >
                            <motion.div
                                animate={{
                                    scale: activeIndex === i ? 1.1 : 1,
                                    width: activeIndex === i ? 100 : 50,
                                    backgroundColor: activeIndex === i ? sequenceColor : 'rgba(255,255,255,0.05)'
                                }}
                                className="h-2.5 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.2)] relative overflow-hidden transition-all duration-700"
                            >
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 bg-white/40 skew-x-12"
                                    />
                                )}
                            </motion.div>
                            <span className={`text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${activeIndex === i ? 'text-amber-500 opacity-100' : 'text-white opacity-10'}`}>
                                0{i + 1}
                            </span>
                        </motion.button>
                    ))}
                </div>

                {/* THE MANIFESTO UNIT: High-Fidelity Glass Artifact */}
                <div className="relative w-full aspect-video md:aspect-[21/9] flex items-center justify-center perspective-[3000px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.9, rotateX: 20, z: -200 }}
                            animate={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
                            exit={{ opacity: 0, scale: 1.1, rotateX: -20, z: 200, filter: 'blur(40px)' }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            className="relative w-full h-full bg-[#111]/40 backdrop-blur-[60px] rounded-[6rem] border border-amber-500/15 shadow-[0_80px_150px_-30px_rgba(0,0,0,1)] isolate overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            {/* Narrative Backdrop Number */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 0.08, x: 0 }}
                                className="absolute inset-0 flex items-center justify-center font-romantic text-[20rem] md:text-[35rem] font-black text-amber-500 select-none pointer-events-none"
                            >
                                0{activeIndex + 1}
                            </motion.div>

                            <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-12 md:p-32 text-center gap-12 font-romantic">
                                <Sparkles size={40} className="text-amber-500 opacity-20 animate-pulse" />
                                <h2 className="text-5xl md:text-9xl font-black text-white leading-tight drop-shadow-3xl max-w-5xl italic">
                                    "{reasons[activeIndex]}"
                                </h2>
                                <div className="flex items-center gap-8 opacity-20">
                                    <div className="h-[1px] w-24 bg-white/40" />
                                    <Heart size={20} fill="#f59e0b" className="text-amber-500" />
                                    <div className="h-[1px] w-24 bg-white/40" />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* THE PROFESSIONAL ACTION: Tactical Core Navigation */}
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-16 pb-32">
                    <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">

                        <button
                            onClick={() => setActiveIndex(prev => Math.max(0, prev - 1))}
                            disabled={activeIndex === 0}
                            className={`group flex items-center gap-6 px-10 py-5 bg-white/[0.02] border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.5em] transition-all ${activeIndex === 0 ? 'opacity-10 cursor-not-allowed grayscale' : 'text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20'}`}
                        >
                            <ChevronLeft size={18} /> PREV_PHASE
                        </button>

                        <motion.button
                            onClick={handleNext}
                            whileHover={{ scale: 1.1, y: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-[0_40px_80px_rgba(255,255,255,0.2)] hover:shadow-[0_60px_100px_rgba(255,255,255,0.3)] transition-all duration-500 group overflow-hidden isolate"
                        >
                            <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative z-10 flex flex-col items-center gap-1">
                                {activeIndex === 4 ? (
                                    <>
                                        <ShieldCheck size={32} className="text-black group-hover:text-white transition-colors" />
                                        <span className="text-[8px] font-bold text-black group-hover:text-white transition-colors">END</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-3xl font-black tracking-tighter text-black group-hover:text-white transition-colors">0{activeIndex + 2}</span>
                                        <MoveRight size={20} className="text-black group-hover:text-white transition-colors" />
                                    </>
                                )}
                            </div>
                        </motion.button>

                        <button
                            onClick={handleNext}
                            className={`group flex items-center gap-6 px-10 py-5 bg-white/[0.02] border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.5em] transition-all text-white/60 hover:text-white hover:bg-white/5 hover:border-white/20`}
                        >
                            NEXT_PHASE <ChevronRight size={18} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-4 opacity-15">
                        <div className="h-[1px] w-96 bg-gradient-to-r from-transparent via-white to-transparent" />
                        <span className="text-[10px] font-black tracking-[1.5em] uppercase text-white">Registry: Inventory Sequence {activeIndex + 1} // 05 Confirmed</span>
                    </div>
                </div>

            </div>

            {/* Corner Decorative Metadata */}
            <div className="fixed bottom-12 left-12 flex flex-col items-start gap-4 opacity-15">
                <div className="font-romantic text-8xl text-amber-900 italic">Inventory</div>
                <div className="h-[1px] w-72 bg-amber-900/40" />
                <span className="text-[10px] font-black tracking-widest text-white uppercase tracking-[1.5em]">FIVE-SEQ // V3.02</span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />

        </div>
    );
};

export default Page2Reasons;
