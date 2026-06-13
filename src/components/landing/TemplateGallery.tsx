import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { TEMPLATES, TemplateDefinition } from "../../lib/templates";
import { TemplateService } from "../../lib/templateService";

const TemplateGallery = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [templates, setTemplates] = useState<TemplateDefinition[]>(TEMPLATES); // Use local templates directly

  // Temporarily disabled - using local templates
  // useEffect(() => {
  //   TemplateService.getAll().then(setTemplates);
  // }, []);

  // Filter templates
  const filteredTemplates = activeCategory === "All"
    ? templates
    : templates.filter(t => t.category === activeCategory);

  // Display logic: Show first 6 or all based on state
  const displayedTemplates = showAll ? filteredTemplates : filteredTemplates.slice(0, 6);

  const categories = ["All", "Birthday", "Valentine's", "Anniversary", "Apology", "Fun", "Romance"];

  const handleTemplateClick = (slug: string) => {
    navigate(`/template/${slug}`);
  };

  return (
    <section id="templates-gallery" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-paper-bg opacity-30" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px]" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="text-4xl inline-block mb-4"
          >
            🎁
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Premium <span className="gradient-text">Templates</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            19+ handcrafted interactive experiences for every occasion
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                ? "gradient-primary text-primary-foreground btn-glow"
                : "glass-card-static text-muted-foreground hover:text-foreground hover:border-primary/30"
                }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Template grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <AnimatePresence mode="popLayout">
            {displayedTemplates.map((template, i) => (
              <motion.div
                layout
                key={template.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                onClick={() => handleTemplateClick(template.slug)}
              >
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="glass-card overflow-hidden group cursor-pointer h-full flex flex-col"
                >
                  {/* Preview area */}
                  <div className={`relative h-48 bg-gradient-to-br ${template.color} flex items-center justify-center overflow-hidden`}>
                    <motion.span
                      className="text-6xl"
                      animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      {template.icon}
                    </motion.span>

                    {/* Floating sparkles on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(5)].map((_, j) => (
                        <motion.div
                          key={j}
                          className="absolute text-white/40"
                          style={{
                            left: `${10 + j * 20}%`,
                            top: `${10 + j * 15}%`,
                            transform: 'translateZ(0)',
                            willChange: 'transform, opacity'
                          }}
                          animate={{ y: [-10, 10, -10], opacity: [0.1, 0.6, 0.1], scale: [1, 1.5, 1] }}
                          transition={{ duration: 2 + j, repeat: Infinity }}
                        >
                          ✦
                        </motion.div>
                      ))}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent p-4 flex flex-col justify-end">
                      <div className="flex items-center justify-between mb-1">
                        {template.tag && (
                          <div className={`glass-card-static px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider border ${template.tag === 'FLAGSHIP'
                              ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/10 shadow-[0_0_10px_rgba(234,179,8,0.3)] animate-pulse'
                              : 'border-primary/20 text-primary bg-primary/10'
                            }`}>
                            {template.tag}
                          </div>
                        )}
                        <div className="glass-card-static px-2 py-0.5 rounded-full text-[8px] font-bold text-white/70">
                          {template.pages.length} Pages
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col bg-card/10 backdrop-blur-sm border-t border-white/5">
                    <div className="mb-4">
                      <span className="text-[10px] font-bold text-primary/80 uppercase tracking-widest mb-1 block">
                        {template.category}
                      </span>
                      <h3 className="text-xl font-black text-white leading-tight group-hover:text-primary transition-colors duration-300">
                        {template.title}
                      </h3>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex flex-col">
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-black text-white tracking-tighter">₹{template.price}</span>
                          <span className="text-xs text-muted-foreground line-through opacity-40">₹{template.originalPrice}</span>
                        </div>
                      </div>

                      <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-xl"
                      >
                        <Sparkles className="w-5 h-5" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* View All Button */}
        {filteredTemplates.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card-static px-8 py-3 rounded-full font-semibold text-foreground hover:border-primary/40 transition-all inline-flex items-center gap-2"
            >
              {showAll ? "Show Less" : "View All Templates"}
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TemplateGallery;
