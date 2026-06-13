import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles, ChevronRight, Quote } from 'lucide-react';

interface Page4MessageCardsProps {
    data: {
        card1Heading?: string;
        card1Body?: string;
        card2Heading?: string;
        card2Body?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page4MessageCards = ({ data, onNext, isEditing = false, onUpdate }: Page4MessageCardsProps) => {
    const cards = [
        {
            heading: data.card1Heading || "The Day You Were Born",
            body: data.card1Body || "The world became a little brighter, the stars aligned, and the most incredible person came into existence. Today we celebrate that magic!",
            color: 'from-[#fff5f8] to-[#fdf2f9]',
            emoji: '🌟'
        },
        {
            heading: data.card2Heading || "My Wish For You",
            body: data.card2Body || "May your year be filled with as much joy, love, and laughter as you bring into my life every single day. You deserve it all!",
            color: 'from-[#fefce8] to-[#fffbeb]',
            emoji: '✨'
        }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-[#fffdfa] flex flex-col items-center justify-start py-20 px-6 font-outfit select-none isolate">

            <div className="relative z-10 w-full max-w-6xl">

                {/* Header Section */}
                <div className="text-center mb-20 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-4 bg-white px-8 py-3 rounded-full border border-pink-100 shadow-lg"
                    >
                        <Quote size={20} className="text-pink-500 fill-current opacity-20" />
                        <span className="text-[#5e2d63] font-black uppercase tracking-[0.6em] text-[10px]">Heartfelt Wishes</span>
                    </motion.div>
                </div>

                {/* CARDS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {cards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                            className={`relative bg-white border-2 border-pink-50 rounded-[3rem] p-12 md:p-16 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.05)] overflow-hidden group`}
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-pink-100/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2" />

                            <div className="relative z-10 space-y-8">
                                <div className="text-5xl mb-6">{card.emoji}</div>
                                <h3 className="text-3xl md:text-5xl font-black text-[#5e2d63] font-romantic leading-tight">
                                    {card.heading}
                                </h3>
                                <div className="h-1 w-20 bg-pink-100" />
                                <p className="text-slate-500 text-lg md:text-xl leading-relaxed italic">
                                    "{card.body}"
                                </p>
                            </div>

                            {/* Decorative Detail */}
                            <Heart className="absolute bottom-8 right-8 text-pink-500/10 w-16 h-16 transform group-hover:scale-125 transition-transform" />
                        </motion.div>
                    ))}
                </div>

                {/* Footer Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-24 flex justify-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onNext}
                        className="px-12 py-6 bg-white border-2 border-pink-100 text-[#5e2d63] font-black text-xs uppercase tracking-[0.5em] rounded-full shadow-xl flex items-center gap-6 group hover:bg-pink-50 transition-all"
                    >
                        Our Favorite Memories <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
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

export default Page4MessageCards;
