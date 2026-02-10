import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 8 + 8,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setHearts(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-primary"
            style={{
              left: `${heart.x}%`,
              fontSize: `${heart.size}px`,
              opacity: heart.opacity,
              backfaceVisibility: 'hidden',
              perspective: 1000,
              transform: 'translateZ(0)',
              willChange: 'transform, opacity'
            }}
            initial={{ y: "110vh", rotate: 0, scale: 0 }}
            animate={{
              y: ["110vh", "-10vh"],
              rotate: [0, 180, 360],
              scale: [0, 1, 1, 0.5],
              x: [0, Math.sin(heart.id) * 40, 0],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
