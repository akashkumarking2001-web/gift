import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border/20 relative overflow-hidden">
      <div className="absolute inset-0 grid-paper-bg" />

      <div className="container relative z-10 px-4">
        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            style={{ transform: 'translateZ(0)', willChange: 'transform', backfaceVisibility: 'hidden' }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-5xl inline-block mb-6"
          >
            💖
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Create <span className="gradient-text">Magic</span>?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Start creating unforgettable digital gifts that your loved ones will cherish forever.
          </p>
          <motion.button
            onClick={() => document.getElementById('templates-gallery')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="gradient-primary px-10 py-4 rounded-full text-primary-foreground font-semibold text-lg btn-glow animate-glow-pulse inline-flex items-center gap-3 cursor-pointer"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              style={{ transform: 'translateZ(0)', willChange: 'transform' }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              🎁
            </motion.span>
            Start Creating — It's Easy!
          </motion.button>
        </motion.div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/20">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="GiftMagic"
              className="h-8 w-auto object-contain hover:scale-105 transition-transform"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const footerTextLogo = document.getElementById('footer-text-logo');
                if (footerTextLogo) footerTextLogo.style.display = 'block';
              }}
            />
            <div id="footer-text-logo" style={{ display: 'none' }}>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                style={{ transform: 'translateZ(0)', willChange: 'transform', display: 'inline-block' }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-xl"
              >
                💝
              </motion.span>
              <span className="font-bold ml-2"><span className="gradient-text">Gift</span>Magic</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a className="hover:text-foreground transition-colors cursor-pointer">About</a>
            <a className="hover:text-foreground transition-colors cursor-pointer">Privacy</a>
            <a className="hover:text-foreground transition-colors cursor-pointer">Terms</a>
            <a className="hover:text-foreground transition-colors cursor-pointer">Contact</a>
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="w-4 h-4 text-primary animate-pulse-heart fill-primary" /> in India
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
