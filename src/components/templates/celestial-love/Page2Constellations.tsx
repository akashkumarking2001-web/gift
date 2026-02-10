import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

interface Page2ConstellationsProps {
    data: {
        stars?: Array<{
            label: string;
            x: number;
            y: number;
        }>;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page2Constellations = ({ data, onNext, isEditing = false, onUpdate }: Page2ConstellationsProps) => {
    const defaultData = {
        stars: data.stars && data.stars.length > 0 ? data.stars : [
            { label: "Our First Meeting", x: 20, y: 30 },
            { label: "The First Kiss", x: 70, y: 20 },
            { label: "When I Found Out", x: 40, y: 60 },
            { label: "Eternal Promise", x: 80, y: 80 }
        ]
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050510] flex flex-col items-center justify-start p-8 md:p-16 overflow-y-auto scrollbar-hide">
            {/* Cosmic Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_70%)]" />

            <div className="relative z-10 w-full max-w-4xl text-center mb-16">
                <h2 className="text-3xl font-black text-blue-100 uppercase tracking-[0.5em] opacity-40">Our Constellation</h2>
            </div>

            {/* Interactive Star Map Area */}
            <div className="relative z-10 w-full max-w-5xl aspect-square md:aspect-video rounded-[3.5rem] bg-black/40 border border-white/5 backdrop-blur-3xl overflow-hidden shadow-2xl">
                {/* Connecting Constellation Lines (SVG) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                        d={`M ${defaultData.stars.map(s => `${s.x}%,${s.y}%`).join(' L ')}`}
                        className="stroke-blue-500/30 stroke-[2] fill-none"
                        style={{ vectorEffect: 'non-scaling-stroke' }}
                    />
                </svg>

                {/* Star Points */}
                {defaultData.stars.map((star, index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="absolute group/star cursor-pointer"
                        style={{ left: `${star.x}%`, top: `${star.y}%`, transform: 'translate(-50%, -50%)' }}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const label = prompt("Edit Star Label:", star.label);
                                if (label !== null) {
                                    const newStars = [...defaultData.stars];
                                    newStars[index] = { ...star, label };
                                    onUpdate?.('stars', newStars);
                                }
                            }
                        }}
                    >
                        {/* Glowing Star Icon */}
                        <div className="relative">
                            <Star size={24} fill="#60a5fa" className="text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
                            <motion.div
                                animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                                className="absolute inset-0 bg-blue-500 rounded-full"
                            />
                        </div>

                        {/* Star Label */}
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full scale-0 group-hover/star:scale-100 transition-all origin-top">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{star.label}</span>
                        </div>

                        {isEditing && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover/star:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded-full">Double Click to Edit Star</span>
                            </div>
                        )}
                    </motion.div>
                ))}

                {/* Add Star (Editor Only) */}
                {isEditing && defaultData.stars.length < 8 && (
                    <div className="absolute bottom-8 right-8">
                        <button
                            onClick={() => {
                                const label = prompt("Enter Memory Name:");
                                if (label) {
                                    onUpdate?.('stars', [...defaultData.stars, {
                                        label,
                                        x: Math.random() * 80 + 10,
                                        y: Math.random() * 80 + 10
                                    }]);
                                }
                            }}
                            className="flex items-center gap-4 px-8 py-3 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600/20"
                        >
                            <Sparkles size={14} /> Add Star Memory
                        </button>
                    </div>
                )}
            </div>

            {/* Termination Footer */}
            <div className="relative z-10 w-full max-w-xs mx-auto mt-20 pb-20">
                <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="w-full py-5 border border-blue-500/30 bg-blue-600/10 text-blue-400 rounded-full font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl transition-all"
                >
                    Final Starlight →
                </motion.button>
            </div>
        </div>
    );
};

export default Page2Constellations;
