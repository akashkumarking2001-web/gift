import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Candy, Cake, IceCream, Cookie, ShieldCheck, Zap, Sparkles, Star, ChevronRight, Check, Diamond } from 'lucide-react';

interface Page3DesertProps {
    data: {
        options?: string[];
        heading?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page3Desert = ({ data, onNext, isEditing = false, onUpdate }: Page3DesertProps) => {
    const [selected, setSelected] = useState<string | null>(null);

    const defaultData = {
        heading: data.heading || "The Sweet Conclusion",
        options: data.options && data.options.length > 0 ? data.options : [
            "Chocolate Aura Lava",
            "Strawberry Horizon Sundae",
            "Midnight Macaron Box",
            "Gilded Cheesecake Slice"
        ]
    };

    const icons = [
        <Cake size={32} strokeWidth={1.5} />,
        <IceCream size={32} strokeWidth={1.5} />,
        <Cookie size={32} strokeWidth={1.5} />,
        <Candy size={32} strokeWidth={1.5} />
    ];

    const handleSelect = (option: string) => {
        if (!isEditing) {
            setSelected(option);
            setTimeout(onNext, 1500);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#020606] flex flex-col items-center justify-center p-8 text-center font-outfit isolate selection-none">

            {/* HYPER-REALISTIC DESSERT ATMOSPHERE (V2 Enhancement) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <motion.div
                    animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.25),transparent_70%)]"
                />

                {/* Sugar Dust Particles */}
                {[...Array(60)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                        animate={{
                            y: [0, -150, 0],
                            opacity: [0, 0.5, 0],
                            rotate: [0, 180, 0]
                        }}
                        transition={{ duration: 5 + Math.random() * 10, repeat: Infinity }}
                    />
                ))}

                {/* Ambient Spotlight */}
                <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-16">

                {/* VISUAL ANCHOR HEADER */}
                <div className="flex flex-col items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-4 bg-teal-950/40 backdrop-blur-3xl px-12 py-3 rounded-full border border-teal-900/30 shadow-2xl"
                    >
                        <Diamond size={16} className="text-teal-400" />
                        <span className="text-teal-100/50 font-black uppercase tracking-[0.6em] text-[10px]">Course Selection // Finale</span>
                        <Zap size={16} className="text-teal-500 fill-current opacity-60" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-7xl font-black text-white font-romantic leading-tight tracking-[0.02em] drop-shadow-2xl max-w-4xl"
                    >
                        {defaultData.heading}
                    </motion.h2>
                </div>

                {/* HIGH-FIDELITY OPTION GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">
                    {defaultData.options.map((option, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: index * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect(option)}
                            className={`group relative flex items-center justify-between p-8 md:p-10 bg-[#0a1818]/60 backdrop-blur-xl border ${selected === option ? 'border-teal-500 bg-teal-900/40 ring-4 ring-teal-500/20' : 'border-teal-900/30 hover:border-teal-500/50 hover:bg-teal-900/20'} rounded-[3rem] text-left transition-all duration-500 overflow-hidden isolate shadow-lg`}
                        >
                            {/* Interior Glow */}
                            <div className={`absolute inset-0 bg-gradient-to-r from-teal-500/0 via-teal-500/5 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none ${selected === option ? 'opacity-100' : ''}`} />

                            <div className="flex items-center gap-8 relative z-10 w-full">
                                {/* Icon Container */}
                                <div className={`relative w-20 h-20 flex-shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 ${selected === option ? 'bg-teal-500 text-[#020606] rotate-12 scale-110' : 'bg-[#020606] text-teal-500 group-hover:text-teal-400 border border-teal-900/50'}`}>
                                    {icons[index % icons.length]}

                                    {/* Icon Orbit */}
                                    {selected !== option && (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 border border-dashed border-teal-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                                        />
                                    )}
                                </div>

                                <div className="space-y-2 flex-grow">
                                    <div className="flex items-center gap-3">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-600">Pastry Art 0{index + 1}</p>
                                        <div className="h-[1px] flex-grow bg-teal-900/30 group-hover:bg-teal-500/30 transition-colors" />
                                    </div>
                                    <span className={`text-2xl md:text-3xl font-black font-romantic tracking-wide block transition-colors duration-300 ${selected === option ? 'text-teal-400 italic' : 'text-teal-50 group-hover:text-white'}`}>
                                        {option}
                                    </span>
                                </div>

                                {/* Selection Indicator */}
                                <div className={`w-12 h-12 flex-shrink-0 rounded-full border border-teal-900/50 flex items-center justify-center transition-all duration-300 ${selected === option ? 'bg-teal-500 border-teal-500 scale-100' : 'scale-90 group-hover:border-teal-500/50'}`}>
                                    {selected === option ? (
                                        <Check size={20} className="text-[#020606]" strokeWidth={3} />
                                    ) : (
                                        <ChevronRight size={20} className="text-teal-700 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                                    )}
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* VISUAL STATUS FEEDBACK */}
                <div className="h-24 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        {selected ? (
                            <motion.div
                                key="selected"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col items-center gap-4"
                            >
                                <div className="flex items-center gap-3 text-teal-400 font-black text-xs uppercase tracking-[0.4em]">
                                    <Sparkles size={14} className="fill-current animate-pulse" />
                                    Sweetness Selected
                                    <Sparkles size={14} className="fill-current animate-pulse" />
                                </div>
                                <div className="h-[2px] w-24 bg-teal-500/40 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
                                        className="h-full w-full bg-teal-400"
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="waiting"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center gap-3 opacity-30"
                            >
                                <span className="text-[10px] font-black tracking-[0.8em] uppercase text-teal-100">Awaiting Dessert Preference</span>
                                <div className="flex gap-2">
                                    <div className="w-1 h-1 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: '0s' }} />
                                    <div className="w-1 h-1 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }} />
                                    <div className="w-1 h-1 bg-teal-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>

            {/* FLOATING DECORATIVE METADATA */}
            <div className="fixed bottom-12 left-12 flex flex-col items-start gap-4 opacity-15">
                <div className="font-romantic text-8xl text-teal-900 italic">Sweet</div>
                <div className="h-[1px] w-72 bg-teal-900/40" />
                <span className="text-[10px] font-black tracking-widest text-teal-200 uppercase tracking-[1.5em]">SELECTION-TYPE // FINALE</span>
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

export default Page3Desert;
