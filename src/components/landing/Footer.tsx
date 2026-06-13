import { motion } from "framer-motion";
import { Heart, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ContactModal from "./ContactModal";
import Logo from "../Logo";

const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <footer className="py-20 border-t border-white/5 relative overflow-hidden bg-black">
      <div className="absolute inset-0 grid-paper-bg opacity-10" />

      <div className="container relative z-10 px-6">
        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            style={{ transform: 'translateZ(0)', willChange: 'transform' }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-6xl mb-8 inline-block"
          >
            💝
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight text-white">
            Ready to Unlock <span className="gradient-text">Magic</span>?
          </h2>
          <p className="text-white/40 mb-10 max-w-md mx-auto font-medium leading-relaxed">
            Create an unforgettable digital experience for your loved one in just minutes.
          </p>
          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              onClick={() => {
                const el = document.getElementById('templates-gallery');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.location.href = '/#templates-gallery';
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="gradient-primary px-12 py-5 rounded-2xl text-white font-black text-lg shadow-2xl shadow-primary/20 inline-flex items-center gap-3"
            >
              Start Creating Now
            </motion.button>
            <motion.button
              onClick={() => setIsContactOpen(true)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 px-12 py-5 rounded-2xl text-white font-black text-lg shadow-2xl inline-flex items-center gap-3"
            >
              Contact Support
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-10 border-t border-white/5">
          <Link to="/">
            <Logo />
          </Link>

          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link to="/terms-and-conditions" className="hover:text-primary transition-colors">Terms</Link>
            <Link to="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="hover:text-primary transition-colors focus:outline-none uppercase"
            >
              Contact
            </button>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
            Created with <Heart className="w-4 h-4 text-primary fill-primary animate-pulse" /> for Love
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.5em]">
            © {new Date().getFullYear()} GIFT MAGIC — ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
            <Mail className="w-3 h-3 text-primary/40" />
            <span>Support: <span className="text-white/40 select-all">Axosolu@gmail.com</span></span>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </footer>
  );
};

export default Footer;
