import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles, X, Check, Camera, MessageCircle, BookOpen, Clock, Calendar, Gift, Music } from 'lucide-react';
import { useTemplateAudio } from '../../hooks/useTemplateAudio'; // Assuming this hook handles global audio, but for page interactions we need local trigger
// Actually, useTemplateAudio is top-level. For local interactions, we might want to pass down playClick/playReveal
// or re-use the hook if it's singleton-like (it uses refs, so per-component instance is fine if it doesn't double BGM).
// Better: TemplateRenderer passes these down. For now, let's keep it simple and focus on visuals.

// --- Helper Components ---

const PageContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden ${className}`}>
        {children}
    </div>
);

const AnimatedText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => (
    <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.8, ease: "easeOut" }}
        className={`text-3xl md:text-5xl font-black text-center leading-tight ${className}`}
    >
        {text}
    </motion.h2>
);

// --- Page Implementations ---

const LoadingPage = ({ data, onNext }: any) => {
    useEffect(() => {
        const timer = setTimeout(onNext, 4000); // Auto advances
        return () => clearTimeout(timer);
    }, [onNext]);

    return (
        <PageContainer className="bg-black text-white">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mb-8"
            />
            <AnimatedText text={data.subtext || "Loading your surprise..."} />
            <div className="mt-8 w-64 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 4 }}
                    className="h-full bg-primary"
                />
            </div>
        </PageContainer>
    );
};

const CharacterPage = ({ data, onNext }: any) => (
    <PageContainer className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
        <div className="max-w-md w-full text-center space-y-8">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="w-48 h-48 mx-auto bg-white/10 rounded-full flex items-center justify-center text-8xl"
            >
                {data.mainImage ? <img src={data.mainImage} className="w-full h-full object-cover rounded-full" /> : "🐼"}
            </motion.div>
            <AnimatedText text={data.greeting || "Hello!"} />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/80 text-lg"
            >
                {data.subtext}
            </motion.p>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onNext}
                className="px-8 py-4 bg-white text-purple-900 font-bold rounded-full shadow-lg"
            >
                {data.buttonText || "Begin Journey"}
            </motion.button>
        </div>
    </PageContainer>
);

const MessagePage = ({ data, onNext }: any) => (
    <PageContainer className="bg-gradient-to-tr from-rose-900 to-pink-900 text-white">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full glass-card p-8 md:p-12 text-center space-y-6 border border-white/10 rounded-3xl"
        >
            <Heart className="w-12 h-12 text-pink-500 mx-auto animate-pulse" />
            <AnimatedText text={data.heading || data.title || "A Note For You"} className="text-2xl md:text-4xl" />
            <motion.p className="text-lg md:text-xl leading-relaxed text-white/90 whitespace-pre-wrap">
                {data.text || data.message || "Enter your message here..."}
            </motion.p>
            <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onNext}
                className="mt-8 px-6 py-3 bg-pink-500 hover:bg-pink-600 rounded-xl font-bold transition-colors"
            >
                Continue ❤️
            </motion.button>
        </motion.div>
    </PageContainer>
);

const PhotoPage = ({ data, onNext }: any) => (
    <PageContainer className="bg-[#050505] text-white">
        <div className="max-w-4xl w-full space-y-8 text-center">
            <AnimatedText text={data.heading || "Our Memories"} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-[300px]">
                {data.photos && Array.isArray(data.photos) && data.photos.map((photo: string, i: number) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`rounded-2xl overflow-hidden relative group ${i % 3 === 0 ? 'md:col-span-2' : ''}`}
                    >
                        <img src={photo} alt="Memory" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                            <Camera className="text-white/80" />
                        </div>
                    </motion.div>
                ))}
            </div>
            <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onNext}
                className="mt-8 px-8 py-4 border border-white/20 hover:border-white rounded-full transition-colors font-bold tracking-widest uppercase text-sm"
            >
                Next Chapter
            </motion.button>
        </div>
    </PageContainer>
);

const CountdownPage = ({ data, onNext }: any) => {
    // Basic countdown logic omitted for brevity, handled by visual only
    return (
        <PageContainer className="bg-slate-900 text-white">
            <div className="text-center space-y-12">
                <AnimatedText text={data.heading || "Counting Down..."} />
                <div className="flex gap-4 justify-center">
                    {['Days', 'Hours', 'Minutes', 'Seconds'].map((label) => (
                        <div key={label} className="bg-white/5 p-4 rounded-2xl min-w-[80px]">
                            <div className="text-4xl font-black font-mono">00</div>
                            <div className="text-xs uppercase tracking-widest text-white/40">{label}</div>
                        </div>
                    ))}
                </div>
                <p className="text-xl text-white/60">{data.targetDate ? new Date(data.targetDate).toLocaleDateString() : "Special Day"}</p>
                <motion.button onClick={onNext} className="text-white/40 hover:text-white transition-colors">Skip Wait &gt;</motion.button>
            </div>
        </PageContainer>
    );
};

const GamePage = ({ data, onNext }: any) => {
    // Implement Dodging Button here
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });

    const dodge = () => {
        const x = (Math.random() - 0.5) * 300; // Move up to 150px x
        const y = (Math.random() - 0.5) * 300; // Move up to 150px y
        setNoBtnPos({ x, y });
    };

    return (
        <PageContainer className="bg-rose-950 text-white">
            <div className="text-center space-y-12 max-w-2xl">
                <AnimatedText text={data.question || "Will you be my Valentine?"} />
                <div className="h-64 flex items-center justify-center">
                    <img src={data.characterImage || "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzhvMXMwZnV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvM3ZwOHV4aHdvMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/MeIucAjPKoA1j0zZX/giphy.gif"} className="h-full object-contain drop-shadow-2xl" />
                </div>
                <div className="flex items-center justify-center gap-8 relative h-20">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onNext}
                        className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-full font-black shadow-lg text-lg"
                    >
                        {data.yesText || "YES!"}
                    </motion.button>

                    <motion.button
                        animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                        onHoverStart={dodge}
                        onClick={dodge} // For mobile tap
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="px-8 py-3 bg-red-500/20 hover:bg-red-500 rounded-full font-bold border border-red-500/50"
                    >
                        {data.noText || "No"}
                    </motion.button>
                </div>
            </div>
        </PageContainer>
    );
};

const CelebrationPage = ({ data, onNext }: any) => (
    <PageContainer className="bg-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-center space-y-8 relative z-10"
        >
            <div className="text-9xl mb-8">🎉</div>
            <AnimatedText text={data.mainText || data.mainHeading || "Celebration!"} />
            <motion.p className="text-xl max-w-lg mx-auto text-white/80">
                {data.loveMessage || "This is the start of something beautiful."}
            </motion.p>
            {data.signature && (
                <div className="font-handwriting text-4xl text-primary mt-12 rotate-[-5deg]">
                    ~ {data.signature}
                </div>
            )}
            <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => window.location.reload()} // Reset or end
                className="mt-12 px-8 py-4 bg-white/10 text-white font-bold rounded-full backdrop-blur-md border border-white/20"
            >
                Replay Experience ↺
            </motion.button>
        </motion.div>
    </PageContainer>
);

// --- Main Universal Renderer ---

const UniversalTemplateRenderer = ({ pageId, data, onNext, isEditing }: any) => {
    // Map page types to components
    // If data.type isn't passed, we might need to look it up from the template definition, 
    // but usually TemplateRenderer passes the *content*. 
    // Wait, the `data` prop contains the fields *entered* by the user. 
    // The `pageId` lets us know *which* page it is, but we need the *type* from the template definition.
    // However, the caller `TemplateRenderer` has access to the `template` object implicitly via `SpecificRenderer`.
    // BUT, for a Universal Renderer, we need the `type` passed in, or we infer it.

    // Actually, `TemplateRenderer` calls this. `TemplateRenderer.tsx` gets `templateSlug`.

    // To make this work smoothly, I'll pass the `pageType` prop to this component from the parent wrapper I'll create.

    // For now, let's assume `data` might contain a `_type` if I inject it, OR I use heuristics.
    // Better: I will update `TemplateRenderer.tsx` to pass the `page` object (config) locally.

    // Let's implement a fallback heuristic just in case:
    const detectType = () => {
        if (data?.photos) return 'photo';
        if (data?.question) return 'game';
        if (data?.targetDate) return 'countdown';
        if (data?.greeting) return 'character'; // intro
        return 'message'; // default
    };

    const type = data?._type || detectType();

    const components: any = {
        'loading': LoadingPage,
        'character': CharacterPage,
        'message': MessagePage,
        'letter': MessagePage, // Re-use message for letter for now
        'photo': PhotoPage,
        'countdown': CountdownPage,
        'game': GamePage,
        'celebration': CelebrationPage,
        'slider': MessagePage, // Fallback
        'flip-cards': MessagePage, // Fallback
        'timeline': PhotoPage, // Fallback
    };

    const Component = components[type] || MessagePage;

    return <Component data={data} onNext={onNext} />;
};

export default UniversalTemplateRenderer;
