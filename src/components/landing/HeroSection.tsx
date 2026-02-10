import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Pause, SkipForward, Sparkles, Star, Music, Heart } from "lucide-react";

// Music playlist with your uploaded files
const MUSIC_PLAYLIST = [
  {
    id: 1,
    title: "Tamil Love Song",
    file: "/music/1.mp3",
    cover: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "En Kannu Kulla",
    file: "/music/En_Kannu_kulla_oru_sirikki_❣️_Appuchi_Gramam_❣️Vetkathukae_vetkam.mp3",
    cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Enna Solla",
    file: "/music/Enna_solla_Yedhu_solla_💕_Sollamal_Kollamal_💕_Dhnaush_💕_Samantha.mp3",
    cover: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Iruvarum Mattum",
    file: "/music/Iruvarum_mattum_vazha_❤️_7aum_Arivu_❤️_Harris_Jayaraj_❤️MP3_160K.mp3",
    cover: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Kadhal Cricket",
    file: "/music/Kadhal_cricketu_❤️Thani_Oruvan_❤️_Jayam_Ravi_❤️_Nayanthara_❤️Hip.mp3",
    cover: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Kangal Irandal",
    file: "/music/Kangal_Irandal_❤️_Subramaniapuram_❤️_Jai_❤️_Swathi_Reddy_❤️MP3_160K.mp3",
    cover: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Kannaana Kanne",
    file: "/music/Kannaana_kanne_Nee_kalangadhadi_💕_Naanum_Rowdy_Dhaan_💕_Vjs_❤️Nayanthara.mp3",
    cover: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Kannamma Unna",
    file: "/music/Kannamma_unna_Manasil_💕_Ispade_Rajavum_Idhaya_Raniyum_💕_Harish_kalyan.mp3",
    cover: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 9,
    title: "Sandakaari",
    file: "/music/Sandakaari_needhaan_❤️_Anirudh_❤️_Sangathamizhan_❤️_Vijay_Sethupathi.mp3",
    cover: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "Thangamey",
    file: "/music/Thangamey_onnathaan 💕_Anirudh_💕_Vijay_Sethupathi_💕_Nayanthara_💕.mp3",
    cover: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?q=80&w=1000&auto=format&fit=crop"
  }
];

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playlist, setPlaylist] = useState<typeof MUSIC_PLAYLIST>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize playlist: First song is "1", rest are randomized
  useEffect(() => {
    const firstSong = MUSIC_PLAYLIST[0]; // File named "1"
    const otherSongs = MUSIC_PLAYLIST.slice(1);

    // Shuffle other songs
    const shuffled = [...otherSongs].sort(() => Math.random() - 0.5);

    // Set playlist: first song + shuffled rest
    setPlaylist([firstSong, ...shuffled]);
  }, []);

  // Set volume to 70% when audio is loaded
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.7; // 70% volume
    }
  }, []);

  // Handle time updates
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle metadata loaded
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Play and handle promise to catch autoplay restrictions
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Audio playback failed:", error);
              setIsPlaying(false);
            });
        }
      }
    }
  };

  const playNext = () => {
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(false);
    setCurrentTime(0);

    // Auto-play next song after a brief delay
    setTimeout(() => {
      if (audioRef.current) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Auto-play failed:", error);
              setIsPlaying(false);
            });
        }
      }
    }, 100);
  };

  // Auto-play next song when current ends
  const handleSongEnd = () => {
    playNext();
  };

  const scrollToTemplates = () => {
    const element = document.getElementById('templates-gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentTrack = playlist[currentTrackIndex] || MUSIC_PLAYLIST[0];

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-screen flex items-center">
      {/* Background audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.file}
        onEnded={handleSongEnd}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

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

          {/* Left Card - Enhanced Cover Image */}
          <motion.div
            initial={{ rotate: -10, x: -100, opacity: 0 }}
            animate={{ rotate: -10, x: -40, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute glass-card w-72 h-96 rounded-3xl border border-primary/40 p-4 shadow-2xl flex flex-col justify-between bg-gradient-to-t from-primary/20 to-transparent z-10 overflow-hidden"
          >
            {/* Enhanced Cover Image with Gradient Overlay */}
            <div className="relative h-full w-full rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src={currentTrack.cover}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                alt="Album Cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Floating Music Icon */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-4 right-4 glass-card p-3 rounded-full backdrop-blur-md border border-white/20"
              >
                <Music className="w-5 h-5 text-primary" />
              </motion.div>

              {/* Song Info at Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                <motion.div
                  animate={isPlaying ? { opacity: [0.5, 1, 0.5] } : { opacity: 0.5 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-white/80 text-xs font-bold uppercase tracking-wider">Now Playing</span>
                </motion.div>
                <h4 className="text-white font-bold text-sm line-clamp-2">{currentTrack.title}</h4>
                <p className="text-white/60 text-xs">Tamil Love Songs</p>
              </div>

              {/* Animated Border Glow */}
              {isPlaying && (
                <motion.div
                  className="absolute inset-0 border-2 border-primary/50 rounded-2xl"
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>
          </motion.div>

          {/* Right Card - Music Player (Simplified) */}
          <motion.div
            initial={{ rotate: 5, x: 100, y: 20, opacity: 0 }}
            animate={{ rotate: 5, x: 40, y: 20, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="absolute glass-card w-72 h-96 rounded-3xl border border-primary/20 p-6 shadow-2xl flex flex-col bg-gradient-to-br from-white/10 to-transparent z-20"
          >
            {/* Music Player Header */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center border border-primary/30"
              >
                <Music className="w-6 h-6 text-primary" />
              </motion.div>
              <div className="space-y-1">
                <h3 className="text-white font-bold text-base leading-none font-outfit">Tamil Love Songs</h3>
                <p className="text-white/50 text-xs font-inter">Valentine's Special</p>
              </div>
            </div>

            {/* Visualizer - Enhanced */}
            <div className="flex-1 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center border border-white/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-primary/10" />

              {/* Visualizer bars */}
              <div className={`flex gap-1.5 h-16 items-end relative z-10 ${isPlaying ? 'opacity-100' : 'opacity-30'}`}>
                {[40, 70, 40, 100, 60, 30, 80, 50, 65, 45].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={isPlaying ? {
                      height: [`${h}%`, `${h * 0.5}%`, `${h}%`],
                      opacity: [0.6, 1, 0.6]
                    } : {
                      height: '20%',
                      opacity: 0.3
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.08,
                      ease: "easeInOut"
                    }}
                    className="w-1.5 bg-gradient-to-t from-primary to-primary/50 rounded-full shadow-lg shadow-primary/30"
                  />
                ))}
              </div>

              {/* Pulsing Background Effect */}
              {isPlaying && (
                <motion.div
                  className="absolute inset-0 bg-primary/10"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>

            {/* Controls - Only Play and Next buttons */}
            <div className="mt-6 flex justify-center items-center gap-4">
              <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center shadow-xl shadow-primary/40 hover:shadow-primary/60 transition-all"
              >
                {isPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
              </motion.button>

              <motion.button
                onClick={playNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all backdrop-blur-sm"
              >
                <SkipForward className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Compact Progress Bar */}
            <div className="mt-4 space-y-1.5">
              {/* Progress bar */}
              <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden group cursor-pointer"
                onClick={(e) => {
                  if (audioRef.current && duration) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const percentage = x / rect.width;
                    const newTime = percentage * duration;
                    audioRef.current.currentTime = newTime;
                    setCurrentTime(newTime);
                  }
                }}
              >
                {/* Progress fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                  transition={{ duration: 0.1 }}
                >
                  {/* Glow effect */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>

              {/* Time display */}
              <div className="flex justify-between items-center px-0.5">
                <span className="text-white/40 text-[10px] font-mono">
                  {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}
                </span>
                <span className="text-white/40 text-[10px] font-mono">
                  {duration ? `${Math.floor(duration / 60)}:${String(Math.floor(duration % 60)).padStart(2, '0')}` : '0:00'}
                </span>
              </div>
            </div>

            {/* Track Counter */}
            <div className="mt-2 text-center">
              <p className="text-white/40 text-xs font-mono">
                Track {currentTrackIndex + 1} of {playlist.length}
              </p>
            </div>
          </motion.div>

          {/* Floating Icons */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 left-10"
          >
            <Star className="w-8 h-8 text-primary fill-primary animate-pulse" />
          </motion.div>

          <motion.div
            animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-10 right-10"
          >
            <Heart className="w-10 h-10 text-pink-500 fill-pink-500/50" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
