import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Page1GreetingProps {
    data: {
        greeting?: string;
        subtext?: string;
        mainImage?: string;
        buttonText?: string;
    };
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page1Greeting = ({ data, onNext, isEditing = false, onUpdate }: Page1GreetingProps) => {
    const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number; duration: number }>>([]);

    useEffect(() => {
        // Generate floating hearts
        const heartArray = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            delay: Math.random() * 5,
            duration: 8 + Math.random() * 4
        }));
        setHearts(heartArray);
    }, []);

    const defaultData = {
        greeting: data.greeting || "Hey Cutiepie",
        subtext: data.subtext || "This Valentine, I made something special for you",
        mainImage: data.mainImage || "https://via.placeholder.com/400x400/FFB6C1/FF1493?text=💖",
        buttonText: data.buttonText || "Next"
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-400 via-rose-400 to-orange-400 flex items-center justify-center p-4">
            {/* Floating Hearts Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute text-4xl opacity-30"
                        style={{ left: `${heart.x}%` }}
                        initial={{ y: '100vh', rotate: 0 }}
                        animate={{
                            y: '-20vh',
                            rotate: 360,
                            x: [0, 30, -30, 0]
                        }}
                        transition={{
                            duration: heart.duration,
                            delay: heart.delay,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                    >
                        💖
                    </motion.div>
                ))}
            </div>

            {/* Main Content - Polaroid Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 2 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="relative z-10 max-w-md w-full"
            >
                {/* Polaroid Frame */}
                <div className="bg-white rounded-3xl shadow-2xl p-6 pb-12 transform hover:rotate-0 transition-transform duration-300">
                    {/* Scalloped Border Top */}
                    <div className="absolute top-0 left-0 right-0 h-8 overflow-hidden">
                        <svg className="w-full h-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0,10 Q5,0 10,10 Q15,0 20,10 Q25,0 30,10 Q35,0 40,10 Q45,0 50,10 Q55,0 60,10 Q65,0 70,10 Q75,0 80,10 Q85,0 90,10 Q95,0 100,10 L100,0 L0,0 Z" fill="#FFB6C1" />
                        </svg>
                    </div>

                    {/* Image Container */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 mt-4 border-4 border-pink-100 shadow-lg">
                        <img
                            src={defaultData.mainImage}
                            alt="Character"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'https://via.placeholder.com/400x400/FFB6C1/FF1493?text=💖';
                            }}
                        />
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                <button className="bg-white text-pink-600 px-4 py-2 rounded-full font-bold text-sm">
                                    📷 Change Image
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Greeting Text */}
                    <div className="text-center space-y-3 mb-6">
                        {isEditing ? (
                            <input
                                type="text"
                                value={defaultData.greeting}
                                onChange={(e) => onUpdate?.('greeting', e.target.value)}
                                className="w-full text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 text-center border-b-2 border-pink-300 focus:outline-none focus:border-pink-500 transition-colors"
                                maxLength={50}
                            />
                        ) : (
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600"
                            >
                                {defaultData.greeting}
                            </motion.h1>
                        )}

                        {isEditing ? (
                            <textarea
                                value={defaultData.subtext}
                                onChange={(e) => onUpdate?.('subtext', e.target.value)}
                                className="w-full text-lg text-gray-700 text-center border-b-2 border-pink-300 focus:outline-none focus:border-pink-500 transition-colors resize-none"
                                maxLength={100}
                                rows={2}
                            />
                        ) : (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-lg text-gray-700 font-medium"
                            >
                                {defaultData.subtext}
                            </motion.p>
                        )}
                    </div>

                    {/* Next Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        onClick={onNext}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {defaultData.buttonText} →
                    </motion.button>

                    {/* Scalloped Border Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
                        <svg className="w-full h-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0,0 Q5,10 10,0 Q15,10 20,0 Q25,10 30,0 Q35,10 40,0 Q45,10 50,0 Q55,10 60,0 Q65,10 70,0 Q75,10 80,0 Q85,10 90,0 Q95,10 100,0 L100,10 L0,10 Z" fill="#FFB6C1" />
                        </svg>
                    </div>
                </div>

                {/* Decorative Hearts Around Card */}
                <motion.div
                    className="absolute -top-8 -right-8 text-6xl"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    💕
                </motion.div>
                <motion.div
                    className="absolute -bottom-8 -left-8 text-5xl"
                    animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                >
                    💖
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Page1Greeting;
