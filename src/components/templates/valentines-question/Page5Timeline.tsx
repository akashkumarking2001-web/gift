import { motion } from 'framer-motion';
import { Heart, ChevronRight, Star, Sparkles } from 'lucide-react';

const Page5Timeline = ({ data, onNext }: any) => {
    const defaultMilestones = data.milestones || [
        { title: "First Met", date: "The Beginning", description: "The moment our paths crossed and my world changed forever.", icon: '✨' },
        { title: "First Date", date: "The Spark", description: "A magical evening where I realized you were the one.", icon: '💬' },
        { title: "Today", date: "The Present", description: "Still falling for you more and more every single day.", icon: '❤️' }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#8b0000] flex flex-col items-center justify-start py-24 px-8 font-outfit select-none isolate">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#b22222_0%,#8b0000_60%)] opacity-80" />

            <div className="relative z-10 w-full max-w-4xl">

                {/* Header */}
                <div className="text-center mb-24 space-y-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-3 text-rose-200 font-black uppercase tracking-[0.5em] text-[10px]"
                    >
                        <Sparkles size={14} className="animate-pulse" />
                        <span>Timeless Evolution</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-8xl font-black text-white font-romantic">Our Story</h2>
                </div>

                {/* TIMELINE TRACK */}
                <div className="relative">
                    <div className="absolute left-[50%] top-0 bottom-0 w-[2px] bg-white/10 translate-x-[-50%] -z-10" />

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
                                    <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative group transition-all hover:bg-white/10">
                                        <div className="text-rose-400 font-black uppercase tracking-[0.4em] text-[8px] mb-4">{milestone.date}</div>
                                        <h3 className="text-2xl md:text-3xl font-black text-white font-romantic mb-6">{milestone.title}</h3>
                                        <p className="text-rose-100/60 leading-relaxed font-medium italic">"{milestone.description}"</p>
                                    </div>
                                </div>

                                {/* CENTER POINT */}
                                <div className="w-[10%] flex justify-center relative">
                                    <div className="w-14 h-14 bg-white border-8 border-[#8b0000] rounded-full shadow-[0_0_30px_rgba(255,255,255,0.2)] z-10 flex items-center justify-center text-[#8b0000] text-xl">
                                        {milestone.icon}
                                    </div>
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
                        className="px-12 py-6 bg-white text-rose-900 font-black text-xs uppercase tracking-[0.6em] rounded-full shadow-2xl flex items-center gap-6"
                    >
                        My Vow To You <ChevronRight size={18} />
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

export default Page5Timeline;
