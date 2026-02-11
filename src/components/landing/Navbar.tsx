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
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <img
                src="/logo.svg?v=3"
                alt="Gift Magic"
                className="h-10 w-10 object-contain group-hover:scale-110 transition-transform"
                onError={(e: any) => {
                  e.currentTarget.src = "/logo.png?v=3";
                }}
              />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-black tracking-tight flex items-center">
                <span className="gradient-text">Gift</span>
                <span className="text-white ml-1">Magic</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.25em] text-[#f04299]/60 uppercase">Digital Experience</span>
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
                  className="text-sm font-bold text-white/60 hover:text-white transition-colors cursor-pointer relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ) : (
                <Link
                  to={item.href}
                  className="text-sm font-bold text-white/60 hover:text-white transition-colors cursor-pointer relative group"
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
              className="text-sm font-bold text-white/60 hover:text-white transition-colors px-4 py-2"
            >
              Sign In
            </motion.button>
          </Link>
          <a href="/#special-offers">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="gradient-primary text-white text-sm font-black px-6 py-2.5 rounded-2xl shadow-lg shadow-primary/20 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Get Started
            </motion.button>
          </a>
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="md:hidden text-white p-2 bg-white/5 rounded-xl border border-white/10"
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
            className="md:hidden bg-black/99 backdrop-blur-2xl border-t border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-lg font-bold text-white/70 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-lg font-bold text-white/70 hover:text-white transition-colors">
                Sign In
              </Link>
              <div className="h-px bg-white/5 w-full my-4" />
              <a href="/#special-offers" onClick={() => setIsOpen(false)}>
                <button className="w-full gradient-primary text-white font-black py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5" />
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
