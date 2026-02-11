import { motion } from 'framer-motion';
import { Heart, ChevronRight, Star, Sparkles, MapPin } from 'lucide-react';

const Page3Timeline = ({ data, onNext }: any) => {
    const defaultMilestones = data.milestones || [
        { title: "The Union", date: "Initial Milestone", description: "Where two souls promised to walk the same path forever.", icon: '🏛️' },
        { title: "First Anniversary", date: "365 Days of Joy", description: "Celebrating the first of many beautiful years together.", icon: '🥂' },
        { title: "Today & Beyond", date: "The Eternal Now", description: "Continuing to write our masterpiece, one golden day at a time.", icon: '✨' }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-start py-24 px-8 font-outfit select-none isolate">

            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#fefce8] to-transparent" />

            <div className="relative z-10 w-full max-w-4xl">

                {/* Header */}
                <div className="text-center mb-32 space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-3 text-amber-600 font-black uppercase tracking-[0.5em] text-[10px]"
                    >
                        <Sparkles size={14} className="animate-pulse" />
                        <span>The Gilded Scroll</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-8xl font-black text-[#451a03] font-romantic">Golden Milestones</h2>
                </div>

                {/* TIMELINE TRACK */}
                <div className="relative pl-12 md:pl-0">
                    {/* Central Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-amber-200 -translate-x-1/2 -z-10" />

                    <div className="space-y-40">
                        {defaultMilestones.map((milestone: any, i: number) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, delay: i * 0.2 }}
                                className={`relative flex flex-col md:flex-row items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* DATE TAG (Side) */}
                                <div className="hidden md:block w-[40%] text-center">
                                    <div className="text-[10px] font-black uppercase tracking-[0.8em] text-amber-400 mb-2">{milestone.date}</div>
                                    <div className="h-0.5 w-12 bg-amber-100 mx-auto" />
                                </div>

                                {/* CENTER ORNAMENT */}
                                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                                    <div className="w-16 h-16 bg-white border-2 border-amber-200 rounded-full flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(251,191,36,0.2)] z-10 scale-90 md:scale-100">
                                        {milestone.icon}
                                    </div>
                                    <div className="absolute inset-0 bg-amber-100/50 rounded-full blur-xl -z-10 animate-pulse" />
                                </div>

                                {/* CONTENT CARD */}
                                <div className="w-full md:w-[40%] pl-16 md:pl-0">
                                    <div className="bg-white border-[1px] border-amber-50 rounded-[2.5rem] p-10 shadow-xl relative group hover:shadow-2xl transition-all">
                                        <div className="md:hidden text-[8px] font-black uppercase tracking-[0.4em] text-amber-500/60 mb-4">{milestone.date}</div>
                                        <h3 className="text-2xl md:text-4xl font-black text-[#451a03] font-romantic mb-6 group-hover:text-amber-600 transition-colors">{milestone.title}</h3>
                                        <p className="text-amber-900/60 leading-relaxed font-medium italic">"{milestone.description}"</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Final Button */}
                <div className="mt-40 flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-20 py-8 bg-[#451a03] text-amber-50 font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl flex items-center gap-6"
                    >
                        The Gallery of Us <ChevronRight size={18} />
                    </motion.button>
                </div>
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

export default Page3Timeline;
