import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", window.location.pathname);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center font-outfit text-white">
      <div style={{ transform: 'translateZ(0)', willChange: 'opacity', backfaceVisibility: 'hidden' }} className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse-slow pointer-events-none" />
      <div style={{ transform: 'translateZ(0)', willChange: 'opacity', backfaceVisibility: 'hidden' }} className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[150px] rounded-full animate-pulse-slow pointer-events-none" />
      <div className="absolute inset-0 grid-paper-bg opacity-10" />

      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
          className="glass-card p-16 md:p-24 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
        >
          <motion.h1
            animate={{
              rotateX: [0, 10, 0],
              rotateY: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transform: 'translateZ(0)', willChange: 'transform', backfaceVisibility: 'hidden' }}
            className="text-9xl font-black mb-8 italic gradient-text tracking-tighter"
          >
            404
          </motion.h1>
          <h2 className="text-3xl font-black mb-4 tracking-tight uppercase">Void Detected</h2>
          <p className="mb-12 text-white/40 font-medium italic tracking-widest uppercase text-xs">This sector of the magic world is yet to be discovered.</p>

          <Link to="/" className="inline-flex items-center gap-4 px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs gradient-primary text-primary-foreground shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 group">
            Recalibrate Horizon
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
