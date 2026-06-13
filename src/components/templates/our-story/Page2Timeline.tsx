import { motion } from 'framer-motion';
import { Heart, ChevronRight, Star, Sparkles, MapPin } from 'lucide-react';

const Page2Timeline = ({ data, onNext }: any) => {
    const defaultMilestones = data.milestones || [
        { title: "The Day We Met", date: "Initial Chapter", description: "The moment everything changed and my world found its missing piece.", icon: '✨' },
        { title: "First Real Conversation", date: "Deep Connection", description: "When hours felt like minutes and I realized you were something special.", icon: '💬' },
        { title: "How It's Going", date: "Current Chapter", description: "Continuing to grow, laugh, and navigate this crazy life side by side.", icon: '❤️' }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-start py-24 px-8 font-outfit select-none isolate">

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#fee2e2_1px,transparent_1px),linear-gradient(to_bottom,#fee2e2_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.2]" />

            <div className="relative z-10 w-full max-w-4xl">

                {/* Header */}
                <div className="text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-3 text-pink-500 font-black uppercase tracking-[0.5em] text-[10px]"
                    >
                        <Sparkles size={14} className="animate-pulse" />
                        <span>Timeless Evolution</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-7xl font-black text-[#5e2d63] font-romantic">Our Evolution</h2>
                </div>

                {/* TIMELINE TRACK */}
                <div className="relative">
                    <div className="absolute left-[50%] top-0 bottom-0 w-1 bg-[#fee2e2] translate-x-[-50%] -z-10" />

                    <div className="space-y-32">
                        {defaultMilestones.map((milestone: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1 }}
                                className={`flex items-center w-full ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                {/* CARD */}
                                <div className="w-[45%]">
                                    <div className="bg-white border-2 border-pink-50 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative group transition-all hover:bg-pink-50">
                                        <div className="text-pink-600 font-black uppercase tracking-[0.4em] text-[8px] mb-4">{milestone.date}</div>
                                        <h3 className="text-2xl md:text-3xl font-black text-[#5e2d63] font-romantic mb-6 group-hover:text-pink-600 transition-colors">{milestone.title}</h3>
                                        <p className="text-slate-500 leading-relaxed font-medium italic">"{milestone.description}"</p>

                                        {/* Decorative Shadow Corner */}
                                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-pink-100/30 rounded-full blur-xl -z-10" />
                                    </div>
                                </div>

                                {/* CENTER POINT */}
                                <div className="w-[10%] flex justify-center relative">
                                    <div className="w-12 h-12 bg-[#fb7185] border-8 border-white rounded-full shadow-[0_0_20px_rgba(251,113,133,0.3)] z-10 flex items-center justify-center text-white text-lg">
                                        {milestone.icon}
                                    </div>
                                    {/* Connection Line decoration */}
                                    <div className={`absolute top-1/2 w-8 h-1 bg-pink-100 ${i % 2 === 0 ? 'left-[50%]' : 'right-[50%]'}`} />
                                </div>

                                {/* EMPTY SPACE */}
                                <div className="w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 flex justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-12 py-6 bg-[#fb7185] text-white font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl flex items-center gap-6"
                    >
                        Captured Forever <ChevronRight size={18} />
                    </motion.button>
                </motion.div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @font-face {
                    font-family: 'Romantic';
                    src: url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');
                }
            `}} />
        </div>
    );
};

export default Page2Timeline;
