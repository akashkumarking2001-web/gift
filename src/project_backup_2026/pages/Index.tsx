import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
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
