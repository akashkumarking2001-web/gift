import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, Pause, Sparkles, Star, Music, Heart } from "lucide-react";

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const scrollToTemplates = () => {
    const element = document.getElementById('templates-gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Background audio element - using a placeholder for now */}
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Content */}
        <div className="relative z-10 flex flex-col gap-8 text-left">

          {/* Valentine's Day Special Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-full px-4 py-1.5 w-fit backdrop-blur-md"
          >
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
            <span className="text-pink-200 text-xs font-bold uppercase tracking-widest">Valentine's Day Special Offer</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl lg:text-7xl font-black leading-tight text-white font-outfit"
          >
            Turn Memories <br />
            <span className="text-primary italic font-accent text-5xl lg:text-6xl leading-normal">into Digital Magic</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 text-lg max-w-lg leading-relaxed font-inter"
          >
            The world's first interactive marketplace for emotional gift templates. Create personalized 3D glassmorphism experiences that last forever.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 mt-2"
          >
            <button
              onClick={scrollToTemplates}
              className="bg-primary text-white font-bold px-8 py-4 rounded-full text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center gap-3 group font-outfit"
            >
              Create Your Gift Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToTemplates}
              className="glass-card px-8 py-4 rounded-full text-lg font-bold border border-white/10 hover:bg-white/10 transition-all text-white font-outfit"
            >
              View Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-4 mt-4 opacity-80"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-12 h-12 rounded-full border-2 border-[#0a060a] bg-gray-800 bg-[url('https://i.pravatar.cc/150?img=${i + 10}')] bg-cover`} />
              ))}
            </div>
            <p className="text-sm text-white font-inter">Trusted by <span className="text-primary font-bold">50,000+</span> lovebirds worldwide</p>
          </motion.div>
        </div>

        {/* Right Visuals */}
        <div className="relative h-[600px] w-full flex items-center justify-center">
          {/* Decorative Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

          <motion.div
            initial={{ rotate: -10, x: -100, opacity: 0 }}
            animate={{ rotate: -10, x: -40, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute glass-card w-72 h-96 rounded-3xl border border-primary/40 p-4 shadow-2xl flex flex-col justify-end bg-gradient-to-t from-primary/20 to-transparent z-10"
          >
            <div className="h-48 w-full rounded-2xl bg-white/5 mb-4 overflow-hidden relative group cursor-pointer">
              <img src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Couple" />
              <div className="absolute top-3 right-3 glass-card p-2 rounded-full"><Star className="w-3 h-3 text-primary fill-primary" /></div>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-24 bg-white/20 rounded-full" />
              <div className="h-2 w-16 bg-white/10 rounded-full" />
            </div>
          </motion.div>

          <motion.div
            initial={{ rotate: 5, x: 100, y: 20, opacity: 0 }}
            animate={{ rotate: 5, x: 40, y: 20, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute glass-card w-72 h-96 rounded-3xl border border-primary/20 p-4 shadow-2xl flex flex-col bg-gradient-to-br from-white/10 to-transparent z-20"
          >
            {/* Music Player Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center animate-spin-slow">
                <Music className="w-5 h-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="text-white font-bold text-sm leading-none font-outfit">Tamil Hit Love Songs</h3>
                <p className="text-white/50 text-xs font-inter">Valentine's Special Playlist</p>
              </div>
            </div>

            <div className="flex-1 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-50" />

              {/* Visualizer bars simulation */}
              <div className={`flex gap-1 h-12 items-end ${isPlaying ? 'opacity-100' : 'opacity-30'}`}>
                {[40, 70, 40, 100, 60, 30, 80, 50].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={isPlaying ? { height: [h + '%', (h * 0.5) + '%', h + '%'] } : { height: '20%' }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1 bg-primary rounded-full transition-all duration-300"
                    style={{ height: isPlaying ? `${h}%` : '20%' }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center px-2">
              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-primary/30"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
              </button>

              <div className="flex-1 ml-4 space-y-2">
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    animate={isPlaying ? { width: ["0%", "100%"] } : { width: "0%" }}
                    transition={isPlaying ? { duration: 30, ease: "linear", repeat: Infinity } : { duration: 0 }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/40 font-mono">
                  <span>{isPlaying ? "0:12" : "0:00"}</span>
                  <span>3:45</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Icons */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 left-10"
          >
            <Star className="w-8 h-8 text-primary fill-primary animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
