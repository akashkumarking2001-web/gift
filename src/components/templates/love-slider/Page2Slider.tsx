import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface Page2SliderProps {
    data: {
        m1?: string;
        m2?: string;
        m3?: string;
        m4?: string;
        m5?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Slider = ({ data, onNext, isEditing = false, onUpdate }: Page2SliderProps) => {
    const [sliderValue, setSliderValue] = useState(0);
    const [hasCompleted, setHasCompleted] = useState(false);

    const defaultData = {
        m1: data.m1 || "A little bit...",
        m2: data.m2 || "Quite a lot actually.",
        m3: data.m3 || "More than pizza (huge deal).",
        m4: data.m4 || "To the moon and back!",
        m5: data.m5 || "Till the end of infinity. ❤️"
    };

    const messages = [defaultData.m1, defaultData.m2, defaultData.m3, defaultData.m4, defaultData.m5];

    // Get current message index based on slider percentage
    const currentIndex = Math.min(Math.floor(sliderValue / 20), 4);
    const currentMessage = messages[currentIndex];

    useEffect(() => {
        if (sliderValue >= 98 && !hasCompleted) {
            setHasCompleted(true);
            if (!isEditing) {
                setTimeout(onNext, 2000);
            }
        }
    }, [sliderValue, hasCompleted, onNext, isEditing]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d071a] flex flex-col items-center justify-center p-8">
            {/* Background reactive to slider */}
            <motion.div
                animate={{
                    backgroundColor: sliderValue > 50 ? '#1a0b2e' : '#0d071a',
                    opacity: 0.5 + (sliderValue / 200)
                }}
                className="absolute inset-0 transition-colors duration-1000"
            />

            {/* Glowing Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2 + (sliderValue / 100), 1],
                    opacity: [0.1, 0.3 + (sliderValue / 200), 0.1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 blur-[150px] rounded-full"
            />

            <div className="relative z-10 w-full max-w-2xl text-center">
                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-black text-purple-500 uppercase tracking-[0.5em] mb-12"
                >
                    Slide to Measure My Love
                </motion.h2>

                {/* Message Display */}
                <div className="h-40 flex items-center justify-center mb-12 relative group">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`text-4xl md:text-6xl font-black text-white font-lovely transition-all ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-4 rounded-2xl' : ''}`}
                        onDoubleClick={() => {
                            if (isEditing) {
                                const field = `m${currentIndex + 1}`;
                                const val = prompt(`Edit Message ${currentIndex + 1}:`, messages[currentIndex]);
                                if (val !== null) onUpdate?.(field, val);
                            }
                        }}
                    >
                        {currentMessage}
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                <span className="text-[8px] font-black text-white/30 uppercase tracking-widest bg-black/40 px-2 py-1 rounded-full">Double Click to Edit Level {currentIndex + 1}</span>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* The Slider */}
                <div className="relative w-full h-8 bg-white/5 rounded-full border border-white/10 p-1 flex items-center group">
                    {/* Progress Track */}
                    <div
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                        style={{ width: `${sliderValue}%` }}
                    />

                    {/* Draggable Handle */}
                    <motion.div
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }} // We'll handle manual positioning for better control in this UI
                        onDrag={(e: any, info: any) => {
                            const container = e.currentTarget.parentElement;
                            if (container) {
                                const rect = container.getBoundingClientRect();
                                const newValue = Math.max(0, Math.min(100, ((info.point.x - rect.left) / rect.width) * 100));
                                setSliderValue(newValue);
                            }
                        }}
                        style={{ left: `calc(${sliderValue}% - 30px)` }}
                        className="absolute top-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing border-4 border-purple-500 z-20"
                    >
                        <Heart size={24} fill={sliderValue > 0 ? "#a855f7" : "none"} className="text-purple-600" />
                    </motion.div>

                    {/* Percentage Indicator */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                        Current Love Intensity: {Math.round(sliderValue)}%
                    </div>
                </div>

                {/* Success Message */}
                {sliderValue >= 98 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-20 text-pink-500 font-black text-xs uppercase tracking-[0.5em] animate-pulse"
                    >
                        Overflowing Detected! <Heart size={14} className="inline ml-2" fill="currentColor" />
                    </motion.div>
                )}

                {/* Editor Instructions */}
                {isEditing && (
                    <p className="mt-24 text-white/10 text-[9px] uppercase tracking-widest leading-loose">
                        Tip: Slide the handle to different positions to edit all 5 messages.<br />
                        Double-click the message text above to customize it.
                    </p>
                )}

                {!isEditing && sliderValue < 98 && (
                    <p className="mt-24 text-white/20 text-[10px] uppercase tracking-widest animate-bounce">
                        Keep sliding →
                    </p>
                )}
            </div>
        </div>
    );
};

export default Page2Slider;
