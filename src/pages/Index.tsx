import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Instagram, PlayCircle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { SettingsService } from "../lib/settings";
import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import StatsSection from "../components/landing/StatsSection";
import HowItWorks from "../components/landing/HowItWorks";
import TemplateGallery from "../components/landing/TemplateGallery";
import FeaturesSection from "../components/landing/FeaturesSection";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import Footer from "../components/landing/Footer";
import FloatingHearts from "../components/landing/FloatingHearts";
import SpecialOffersSection from "../components/landing/SpecialOffersSection";
import PricingSection from "../components/landing/PricingSection";

const RevealSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  const [instaLink, setInstaLink] = useState("");
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    SettingsService.getSettings().then((s: any) => {
      if (s.instagram_url) setInstaLink(s.instagram_url);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingHearts />
      <Navbar />

      <HeroSection />

      <RevealSection>
        <div className="flex flex-col items-center justify-center relative z-20 mt-16 pb-8 px-4 gap-4 w-full max-w-md mx-auto">
            <a 
              href="/magic-frame/"
              className="w-full"
            >
                <button className="w-full gradient-primary text-white font-black py-5 px-8 rounded-2xl uppercase tracking-[0.2em] text-lg shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4">
                    <Sparkles className="w-6 h-6" />
                    Magic Frame
                </button>
            </a>

            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold py-4 px-8 rounded-2xl uppercase tracking-widest text-sm backdrop-blur-md transition-all flex items-center justify-center gap-3 shadow-lg"
            >
                <PlayCircle className="w-5 h-5 text-pink-400" />
                How to Use / Demo Video
            </button>
        </div>
      </RevealSection>

      <RevealSection>
        <PricingSection />
      </RevealSection>

      <RevealSection>
        <SpecialOffersSection />
      </RevealSection>

      <RevealSection>
        <StatsSection />
      </RevealSection>

      <RevealSection>
        <HowItWorks />
      </RevealSection>

      <RevealSection>
        <TemplateGallery />
      </RevealSection>

      <RevealSection>
        <FeaturesSection />
      </RevealSection>

      <RevealSection>
        <TestimonialsSection />
      </RevealSection>

      <RevealSection>
        <Footer />
      </RevealSection>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <button 
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <iframe 
              src="https://www.youtube.com/embed/Qzmc5Hltgtk?autoplay=1&modestbranding=1&rel=0&controls=0" 
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>
        </div>
      )}

      {instaLink && (
        <motion.a
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          href={instaLink}
          style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed right-6 bottom-6 z-50 bg-gradient-to-tr from-purple-500 to-pink-500 p-3 rounded-full shadow-lg shadow-pink-500/20 hover:scale-110 active:scale-95 transition-all text-white"
        >
          <Instagram className="w-6 h-6" />
        </motion.a>
      )}
    </div>
  );
};

export default Index;
