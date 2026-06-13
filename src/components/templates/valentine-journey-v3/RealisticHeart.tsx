import React from 'react';
import { motion } from 'framer-motion';

const RealisticHeart: React.FC<{ size?: string; className?: string }> = ({ size = "200px", className = "" }) => {
    return (
        <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
            {/* The Anatomical Core - Using SVG for precise structure */}
            <motion.div
                className="relative w-full h-full"
                animate={{
                    scale: [1, 1.15, 1.05, 1.25, 1],
                }}
                transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    times: [0, 0.1, 0.2, 0.4, 0.7],
                    ease: "easeInOut"
                }}
            >
                <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_40px_rgba(255,26,117,0.6)]">
                    <defs>
                        <radialGradient id="heartGradient" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#ff4d94" />
                            <stop offset="50%" stopColor="#cc0052" />
                            <stop offset="100%" stopColor="#4a041a" />
                        </radialGradient>
                        <linearGradient id="arteryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ff85b3" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#ff1a75" stopOpacity="0.9" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Vena Cava / Arteries (The "Roots") */}
                    <path
                        d="M80,40 Q90,10 110,35 T130,20"
                        fill="none"
                        stroke="url(#arteryGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        className="opacity-90"
                    />
                    <path
                        d="M70,50 Q60,20 40,35"
                        fill="none"
                        stroke="#ff85b3"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="opacity-70"
                    />

                    {/* Main Anatomical Body */}
                    <path
                        d="M100,60 
                           C100,60 70,45 45,65 
                           C20,85 25,130 50,160 
                           C75,190 100,200 100,200 
                           C100,200 125,190 150,160 
                           C175,130 180,85 155,65 
                           C130,45 100,60 100,60 
                           Z"
                        fill="url(#heartGradient)"
                        filter="url(#glow)"
                    />

                    {/* Left Ventricle Detail */}
                    <path
                        d="M105,75 C130,80 150,110 145,140 C140,170 110,185 100,190"
                        fill="none"
                        stroke="white"
                        strokeWidth="1"
                        strokeOpacity="0.2"
                        strokeLinecap="round"
                    />

                    {/* Highlight Shine */}
                    <ellipse
                        cx="65" cy="85" rx="15" ry="10"
                        fill="white"
                        fillOpacity="0.15"
                        transform="rotate(-20, 65, 85)"
                    />

                    {/* Pulsing Inner Core Glow */}
                    <motion.circle
                        cx="100" cy="110" r="30"
                        fill="#ff1a75"
                        animate={{
                            opacity: [0.1, 0.4, 0.1],
                            scale: [1, 1.4, 1]
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{ filter: 'blur(15px)' }}
                    />
                </svg>

                {/* Aesthetic Detail: Floating Particles around the heart */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-pink-300 rounded-full"
                        initial={{
                            x: "50%",
                            y: "50%",
                            opacity: 0
                        }}
                        animate={{
                            x: `${50 + (Math.random() - 0.5) * 120}%`,
                            y: `${50 + (Math.random() - 0.5) * 120}%`,
                            opacity: [0, 0.8, 0],
                            scale: [0, 1.5, 0]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                    />
                ))}
            </motion.div>

            {/* Ambient Shadow/Glow Background */}
            <div className="absolute inset-0 bg-pink-600/5 blur-[50px] rounded-full -z-10 animate-pulse" />
        </div>
    );
};

export default RealisticHeart;
