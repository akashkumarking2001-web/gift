import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5 bg-black/10"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              src="/logo.png"
              alt="Gift Magic"
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const textLogo = document.getElementById('navbar-text-logo');
                if (textLogo) textLogo.style.display = 'flex';
              }}
            />
            <div id="navbar-text-logo" style={{ display: 'none' }} className="flex-col leading-none">
              <span className="text-xl font-black tracking-tight">
                <span className="gradient-text">Gift </span>
                <span className="text-white">Magic</span>
              </span>
              <span className="text-[8px] font-bold tracking-[0.3em] text-primary/60">Digital Experience</span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Templates", href: "#templates-gallery" },
            { label: "Dashboard", href: "/dashboard" },
          ].map((item) => (
            <motion.div key={item.label} whileHover={{ y: -2 }}>
              {item.href.startsWith("#") ? (
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
            >
              Sign In
            </motion.button>
          </Link>
          <a href="/#special-offers">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="gradient-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full btn-glow flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Get Started
            </motion.button>
          </a>
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card-static border-t border-border/20 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors py-2">
                Dashboard
              </Link>
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors py-2">
                Sign In
              </Link>
              <a href="/#special-offers" onClick={() => setIsOpen(false)}>
                <button className="w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-full btn-glow flex items-center justify-center gap-2 mt-2">
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
