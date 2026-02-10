import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  label: string;
  icon: string;
  duration?: number;
}

const AnimatedCounter = ({ end, suffix = "", label, icon, duration = 2 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasEntered) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasEntered, end, duration]);

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setHasEntered(true)}
      viewport={{ once: true }}
      style={{ transform: 'translateZ(0)', willChange: 'transform, opacity', backfaceVisibility: 'hidden' }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="text-4xl mb-3"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {icon}
      </motion.div>
      <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </motion.div>
  );
};

export default AnimatedCounter;
