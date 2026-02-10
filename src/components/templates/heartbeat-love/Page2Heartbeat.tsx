import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Heart, Activity } from 'lucide-react';

interface Page2HeartbeatProps {
    data: {
        bpm?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page2Heartbeat = ({ data, onNext, isEditing = false, onUpdate }: Page2HeartbeatProps) => {
    const [progress, setProgress] = useState(0);

    const defaultData = {
        bpm: data.bpm || "120"
    };

    const beatDuration = 60 / parseInt(defaultData.bpm);

    useEffect(() => {
        if (!isEditing) {
            let startTimestamp: number | null = null;
            let animationFrameId: number;
            const totalDuration = 3000; // 3 seconds to complete sync

            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const lapsed = timestamp - startTimestamp;
                const p = Math.min((lapsed / totalDuration) * 100, 100);

                setProgress(p);

                if (p < 100) {
                    animationFrameId = requestAnimationFrame(step);
                } else {
                    setTimeout(onNext, 500);
                }
            };

            animationFrameId = requestAnimationFrame(step);
            return () => cancelAnimationFrame(animationFrameId);
        }
    }, [isEditing, onNext]);

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0d0505] flex flex-col items-center justify-center p-8 text-center text-red-50">
            {/* Pulsing Core Glow */}
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: beatDuration, repeat: Infinity }}
                style={{ transform: 'translateZ(0)', willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
                className="absolute w-[800px] h-[800px] bg-red-600 blur-[200px] rounded-full"
            />

            <div className="relative z-10 w-full max-w-4xl">
                {/* BPM Display */}
                <div
                    className={`mb-20 relative group inline-block ${isEditing ? 'cursor-pointer hover:bg-white/5 px-8 py-3 rounded-2xl transition-all' : ''}`}
                    onDoubleClick={() => {
                        if (isEditing) {
                            const val = prompt("Edit BPM:", defaultData.bpm);
                            if (val !== null) onUpdate?.('bpm', val);
                        }
                    }}
                >
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-red-500 mb-2">Live Pulse Rhythm</span>
                        <h2 className="text-8xl md:text-10xl font-black font-inter tracking-tighter text-white">
                            {defaultData.bpm}
                            <span className="text-2xl font-black text-red-500 ml-4 group-hover:scale-125 transition-all inline-block">BPM</span>
                        </h2>
                    </div>
                </div>

                {/* Heart Center */}
                <div className="relative w-full max-w-xs mx-auto aspect-square mb-24">
                    {/* Outer Rings */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                            transition={{ duration: beatDuration * 2, repeat: Infinity, delay: i * (beatDuration / 1.5) }}
                            className="absolute inset-0 border-2 border-red-500/20 rounded-full"
                        />
                    ))}

                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: beatDuration, repeat: Infinity }}
                        style={{ transform: 'translateZ(0)', willChange: 'transform', backfaceVisibility: 'hidden' }}
                        className="absolute inset-0 bg-gradient-to-br from-red-600 to-rose-950 rounded-full shadow-[0_0_100px_rgba(220,38,38,0.5)] border-4 border-red-500/30 flex items-center justify-center overflow-hidden"
                    >
                        <Heart size={80} fill="white" className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]" />

                        {/* Liquid Progress Fill (Visual Only) */}
                        <motion.div
                            className="absolute bottom-0 left-0 w-full bg-white/10"
                            style={{
                                height: '100%',
                                originY: 'bottom',
                                transform: 'translateZ(0)',
                                willChange: 'transform'
                            }}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: progress / 100 }}
                        />
                    </motion.div>
                </div>

                {/* Loading State */}
                <div className="max-w-xs mx-auto space-y-4">
                    <div className="w-full h-1 bg-red-900/30 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]"
                            style={{
                                width: '100%',
                                originX: 0,
                                transform: 'translateZ(0)',
                                willChange: 'transform'
                            }}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: progress / 100 }}
                        />
                    </div>
                    <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-red-500/40">
                        <span className="flex items-center gap-2"><Activity size={10} /> Synching Pulse</span>
                        <span>{progress}%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page2Heartbeat;
