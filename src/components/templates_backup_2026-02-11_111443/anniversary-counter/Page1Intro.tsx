import { motion } from 'framer-motion';
import { Clock, Star, Hourglass, MoveRight, Sparkles } from 'lucide-react';

interface Page1IntroProps {
    data: {
        text?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Intro = ({ data, onNext, isEditing = false, onUpdate }: Page1IntroProps) => {
    const defaultData = {
        text: data.text || "Every second spent with you is a second I'll cherish forever."
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#0a0805] flex flex-col items-center justify-center p-8 text-center font-outfit">

            {/* Hyper-Realistic Gilded Atmospehre */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(180,130,50,0.15),transparent_70%)]"
                />

                {/* Micro-sparkle dust */}
                {[...Array(40)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[1.5px] h-[1.5px] bg-amber-200/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -120, 0],
                            opacity: [0, 0.5, 0]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 8,
                            repeat: Infinity,
                        }}
                    />
                ))}
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 max-w-5xl w-full flex flex-col items-center">

                {/* Advanced Chronometer Graphic */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="mb-16 relative"
                >
                    <div className="relative p-14 bg-white/5 backdrop-blur-3xl rounded-[5rem] border border-amber-900/20 shadow-[0_50px_100px_-20px_rgba(180,130,50,0.3)] isolate">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent rounded-[5rem]" />

                        {/* Spinning Inner Ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-4 border border-dashed border-amber-500/20 rounded-full"
                        />

                        <Clock size={80} strokeWidth={1.5} className="text-amber-500 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]" />

                        {/* Hand Animation */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[4.5rem] left-[4.5rem] w-8 h-[2px] bg-amber-400 origin-left"
                        />
                    </div>

                    {/* Floating Accent Icons */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 -right-4 p-4 bg-amber-500/10 backdrop-blur-xl rounded-2xl border border-amber-500/20"
                    >
                        <Hourglass size={20} className="text-amber-400" />
                    </motion.div>
                </motion.div>

                {/* Narrative Typography */}
                <div className="space-y-10 mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-10 py-2.5 rounded-full border border-white/5"
                    >
                        <Sparkles size={14} className="text-amber-400 fill-current" />
                        <span className="text-amber-100/50 font-black uppercase tracking-[0.6em] text-[9px]">The Chronology of Love</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl md:text-8xl font-black text-white font-romantic leading-tight tracking-tight px-4 max-w-4xl"
                    >
                        "{defaultData.text}"
                    </motion.h1>
                </div>

                {/* Professional Navigation */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-20 py-8 bg-[#0a0805] border-2 border-amber-500/30 rounded-[3rem] text-amber-500 font-black text-xs uppercase tracking-[0.7em] shadow-[0_30px_80px_-15px_rgba(180,130,50,0.4)] transition-all flex items-center gap-6"
                >
                    <div className="absolute inset-0 bg-amber-500 opacity-0 group-hover:opacity-10 transition-opacity rounded-[3rem]" />
                    <span className="relative z-10">Step Into Our Story</span>
                    <MoveRight className="relative z-10 w-6 h-6 border-2 border-amber-500/30 rounded-full p-0.5 group-hover:translate-x-4 transition-transform duration-500" />
                </motion.button>
            </div>

            {/* Corner Decorative Elements */}
            <div className="fixed bottom-12 right-12 flex flex-col items-end gap-2 opacity-10">
                <div className="font-romantic text-6xl text-amber-500 italic">Anniversary</div>
                <div className="h-[1px] w-40 bg-amber-500" />
            </div>

        </div>
    );
};

export default Page1Intro;
