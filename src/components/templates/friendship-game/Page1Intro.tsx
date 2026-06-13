import { motion } from 'framer-motion';
import { Sparkles, Trophy, Brain, Users, ChevronRight, Puzzle } from 'lucide-react';

interface Page1IntroProps {
    data: {
        friendName?: string;
        heading?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Intro = ({ data, onNext, isEditing = false, onUpdate }: Page1IntroProps) => {
    return (
        <div className="min-h-screen relative overflow-hidden bg-[#050508] flex flex-col items-center justify-center p-6 md:p-12 font-outfit select-none isolate">

            {/* CYBER AMBIENCE */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] bg-cyan-500/5 blur-[150px] rounded-full" />
                <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-pink-500/5 blur-[120px] rounded-full" />

                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-lg flex flex-col items-center"
            >
                {/* Visual Icon */}
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="mb-12"
                >
                    <div className="p-8 bg-gradient-to-br from-cyan-500 to-pink-500 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.3)]">
                        <Puzzle size={60} className="text-white fill-current animate-pulse" />
                    </div>
                </motion.div>

                {/* Typography */}
                <div className="text-center space-y-8 mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 leading-tight">
                        Friendship Memory Game
                    </h1>

                    <div className="space-y-4 max-w-sm mx-auto text-left">
                        {[
                            { icon: Sparkles, text: 'Find all friendship pairs', color: 'text-yellow-400' },
                            { icon: Brain, text: 'Test your memory skill', color: 'text-pink-400' },
                            { icon: Sparkles, text: 'Complete to unlock memories', color: 'text-cyan-400' },
                            { icon: Trophy, text: 'Try to finish in fewer moves!', color: 'text-amber-400' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="flex items-center gap-4 group"
                            >
                                <item.icon size={16} className={`${item.color} group-hover:scale-125 transition-transform`} />
                                <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(6,182,212,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="w-full py-6 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-black text-xs uppercase tracking-[0.4em] rounded-2xl shadow-xl flex items-center justify-center gap-4"
                >
                    <span>Start Friendship Challenge</span>
                    <Users size={18} />
                </motion.button>
            </motion.div>

            {/* DECORATIVE CORNER LABELS */}
            <div className="absolute bottom-10 left-10 text-[8px] font-black uppercase tracking-[0.5em] text-cyan-500/30">
                Connection Status // Secure
            </div>
            <div className="absolute bottom-10 right-10 text-[8px] font-black uppercase tracking-[0.5em] text-pink-500/30">
                Memory Buffer // Optimizing
            </div>
        </div>
    );
};

export default Page1Intro;
