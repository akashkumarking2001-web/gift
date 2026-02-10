import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Photo {
    url: string;
    caption?: string;
}

interface Page3MemoriesProps {
    data: {
        heading?: string;
        photos?: Photo[];
        polaroidCaption?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page3Memories = ({ data, onNext, isEditing = false, onUpdate }: Page3MemoriesProps) => {
    const defaultPhotos: Photo[] = data.photos && data.photos.length > 0 ? data.photos : [
        { url: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop', caption: 'Our first date' },
        { url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop', caption: 'Beach sunset' },
        { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop', caption: 'Laughing together' },
        { url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop', caption: 'Your birthday' },
        { url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop', caption: 'Forever moment' }
    ];

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const defaultData = {
        heading: data.heading || "Memories",
        photos: defaultPhotos,
        polaroidCaption: data.polaroidCaption || "Precious moments..."
    };

    const nextPhoto = () => {
        setDirection(1);
        setCurrentPhotoIndex((prev) => (prev + 1) % defaultData.photos.length);
    };

    const prevPhoto = () => {
        setDirection(-1);
        setCurrentPhotoIndex((prev) => (prev - 1 + defaultData.photos.length) % defaultData.photos.length);
    };

    const currentPhoto = defaultData.photos[currentPhotoIndex];

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            rotate: direction > 0 ? 10 : -10
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            rotate: 0
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            rotate: direction < 0 ? 10 : -10
        })
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 flex flex-col items-center justify-center p-4">
            {/* Wavy Borders */}
            <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,50 Q120,0 240,50 T480,50 T720,50 T960,50 T1200,50 T1440,50 L1440,0 L0,0 Z" fill="#f472b6" fillOpacity="0.3" />
                </svg>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
                    <path d="M0,50 Q120,100 240,50 T480,50 T720,50 T960,50 T1200,50 T1440,50 L1440,100 L0,100 Z" fill="#a855f7" fillOpacity="0.3" />
                </svg>
            </div>

            {/* Floating Hearts */}
            {[...Array(8)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-2xl opacity-10 pointer-events-none"
                    style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 3) * 25}%`
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 15, -15, 0],
                        scale: [1, 1.3, 1]
                    }}
                    transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3
                    }}
                >
                    💕
                </motion.div>
            ))}

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 mb-8 text-center"
            >
                {isEditing ? (
                    <input
                        type="text"
                        value={defaultData.heading}
                        onChange={(e) => onUpdate?.('heading', e.target.value)}
                        className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-center border-b-2 border-pink-300 focus:outline-none focus:border-pink-500 transition-colors"
                        maxLength={30}
                    />
                ) : (
                    <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600">
                        {defaultData.heading}
                    </h1>
                )}
            </motion.div>

            {/* Polaroid Photo Frame */}
            <div className="relative z-10 max-w-2xl w-full mb-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: 2 }}
                    transition={{ duration: 0.8, type: 'spring' }}
                    className="bg-white rounded-3xl shadow-2xl p-6 pb-16 transform hover:rotate-0 transition-transform duration-300"
                >
                    {/* Photo Container with Navigation */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.img
                                key={currentPhotoIndex}
                                src={currentPhoto.url}
                                alt={currentPhoto.caption || `Memory ${currentPhotoIndex + 1}`}
                                className="absolute inset-0 w-full h-full object-cover"
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: 'spring', stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 }
                                }}
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/800x600/FFC0CB/DC143C?text=Memory';
                                }}
                            />
                        </AnimatePresence>

                        {/* Navigation Buttons */}
                        {defaultData.photos.length > 1 && !isEditing && (
                            <>
                                <button
                                    onClick={prevPhoto}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
                                >
                                    <ChevronLeft className="w-6 h-6 text-pink-600" />
                                </button>
                                <button
                                    onClick={nextPhoto}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all"
                                >
                                    <ChevronRight className="w-6 h-6 text-pink-600" />
                                </button>
                            </>
                        )}

                        {/* Photo Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-bold">
                            {currentPhotoIndex + 1} / {defaultData.photos.length}
                        </div>
                    </div>

                    {/* Photo Caption */}
                    <div className="text-center">
                        {currentPhoto.caption && !isEditing && (
                            <motion.p
                                key={`caption-${currentPhotoIndex}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-gray-600 italic text-lg mb-3"
                            >
                                "{currentPhoto.caption}"
                            </motion.p>
                        )}

                        {/* Handwritten Caption */}
                        {isEditing ? (
                            <input
                                type="text"
                                value={defaultData.polaroidCaption}
                                onChange={(e) => onUpdate?.('polaroidCaption', e.target.value)}
                                className="w-full text-2xl font-handwriting text-pink-600 text-center border-b-2 border-pink-300 focus:outline-none focus:border-pink-500 transition-colors"
                                maxLength={50}
                                style={{ fontFamily: "'Caveat', cursive" }}
                            />
                        ) : (
                            <p className="text-2xl font-handwriting text-pink-600" style={{ fontFamily: "'Caveat', cursive" }}>
                                {defaultData.polaroidCaption}
                            </p>
                        )}
                    </div>

                    {/* Decorative Tape */}
                    <div className="absolute -top-3 left-1/4 w-20 h-8 bg-yellow-100/60 backdrop-blur-sm transform -rotate-12 shadow-md"></div>
                    <div className="absolute -top-3 right-1/4 w-20 h-8 bg-yellow-100/60 backdrop-blur-sm transform rotate-12 shadow-md"></div>
                </motion.div>

                {/* Photo Dots Indicator */}
                <div className="flex justify-center gap-2 mt-6">
                    {defaultData.photos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setDirection(index > currentPhotoIndex ? 1 : -1);
                                setCurrentPhotoIndex(index);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentPhotoIndex
                                    ? 'bg-pink-600 w-8'
                                    : 'bg-pink-300 hover:bg-pink-400'
                                }`}
                            disabled={isEditing}
                        />
                    ))}
                </div>
            </div>

            {/* Next Button */}
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={onNext}
                className="relative z-10 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Continue →
            </motion.button>
        </div>
    );
};

export default Page3Memories;
