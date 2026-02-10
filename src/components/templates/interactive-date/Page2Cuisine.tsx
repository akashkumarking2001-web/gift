import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Utensils, Pizza, Soup, Beef } from 'lucide-react';

interface Page2CuisineProps {
    data: {
        options?: string[];
        heading?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page2Cuisine = ({ data, onNext, isEditing = false, onUpdate }: Page2CuisineProps) => {
    const [selected, setSelected] = useState<string | null>(null);

    const defaultData = {
        heading: data.heading || "Choose our cuisine for tonight:",
        options: data.options && data.options.length > 0 ? data.options : [
            "Italian Pizza",
            "Sushi Night",
            "Classic Steak",
            "Mexican Tacos"
        ]
    };

    const icons = [<Pizza size={24} />, <Soup size={24} />, <Beef size={24} />, <Utensils size={24} />];

    const handleSelect = (option: string) => {
        if (!isEditing) {
            setSelected(option);
            setTimeout(onNext, 1200);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#051010] flex flex-col items-center justify-center p-8 text-center">
            {/* Background reactive glow */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        className="absolute inset-0 bg-teal-500 blur-[100px]"
                    />
                )}
            </AnimatePresence>

            <div className="relative z-10 w-full max-w-4xl">
                {/* Heading */}
                <div
                    className={`mb-20 relative group inline-block ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-3 rounded-2xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit Heading:", defaultData.heading);
                            if (val !== null) onUpdate?.('heading', val);
                        }
                    }}
                >
                    <h2 className="text-3xl md:text-5xl font-black text-white font-lovely tracking-tight">
                        {defaultData.heading}
                    </h2>
                    {isEditing && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-[8px] font-black text-white/40 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click to Edit Heading</span>
                        </div>
                    )}
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto">
                    {defaultData.options.map((option, index) => (
                        <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(20,184,166,0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleSelect(option)}
                            className={`flex items-center gap-6 p-8 border border-white/10 rounded-[2.5rem] bg-white/5 backdrop-blur-3xl transition-all relative overflow-hidden group/opt ${selected === option ? 'border-teal-500/50 bg-teal-500/10' : ''}`}
                        >
                            <div className="w-16 h-16 bg-teal-600/20 rounded-2xl flex items-center justify-center text-teal-400">
                                {icons[index % icons.length]}
                            </div>
                            <span className="text-xl md:text-2xl font-black text-white font-lovely tracking-wide">
                                {option}
                            </span>
                            {isEditing && (
                                <div
                                    className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover/opt:opacity-100 transition-opacity"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const val = prompt(`Edit Option ${index + 1}:`, option);
                                        if (val !== null) {
                                            const newOptions = [...defaultData.options];
                                            newOptions[index] = val;
                                            onUpdate?.('options', newOptions);
                                        }
                                    }}
                                >
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Double Click to Edit Option</span>
                                </div>
                            )}
                        </motion.button>
                    ))}
                </div>

                {selected && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-16 text-teal-400 font-black text-xs uppercase tracking-[0.5em]"
                    >
                        Excellent choice! Preparing {selected}...
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default Page2Cuisine;
