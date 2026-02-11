import React, { useMemo, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

const V3Background: React.FC = () => {
    const { scrollY } = useScroll();
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 40,
                y: (e.clientY / window.innerHeight - 0.5) * 40
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const springX = useSpring(mousePos.x, { stiffness: 50, damping: 20 });
    const springY = useSpring(mousePos.y, { stiffness: 50, damping: 20 });

    // Parallax layers
    const y1 = useTransform(scrollY, [0, 1000], [0, -200]);

    const decorations = useMemo(() => [...Array(24)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 20 + Math.random() * 30,
        delay: -Math.random() * 20,
        scale: 0.2 + Math.random() * 0.6,
        type: Math.random() > 0.7 ? 'star' : Math.random() > 0.4 ? 'heart' : 'sparkle',
        rotate: Math.random() * 360
    })), []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#fff5f8]">
            {/* Soft Cinematic Gradients */}
            <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-pink-100/40 blur-[130px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-rose-100/40 blur-[130px] rounded-full animate-pulse-slow" />

            {/* Floating Celestial Elements */}
            <motion.div style={{ y: y1 }} className="absolute inset-0">
                {decorations.map(d => (
                    <motion.div
                        key={d.id}
                        className="absolute text-pink-400/10"
                        style={{ left: d.left, top: d.top, scale: d.scale, rotate: d.rotate }}
                        animate={{
                            y: [0, -150, 0],
                            rotate: [d.rotate, d.rotate + 90, d.rotate],
                            opacity: [0.05, 0.2, 0.05]
                        }}
                        transition={{
                            duration: d.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: d.delay
                        }}
                    >
                        {d.type === 'heart' ? (
                            <Heart className="w-16 h-16 fill-current" />
                        ) : d.type === 'star' ? (
                            <Star className="w-12 h-12 fill-current" />
                        ) : (
                            <Sparkles className="w-10 h-10" />
                        )}
                    </motion.div>
                ))}
            </motion.div>

            {/* Glass Shine Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 pointer-events-none" />

            {/* Subtle Grid / Texture */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#ff4d94 1px, transparent 1px)',
                    backgroundSize: '60px 60px'
                }}
            />
        </div>
    );
};

export default V3Background;
