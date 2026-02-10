import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    text: "My boyfriend was in tears! The countdown + love letter combo was absolutely magical. Worth every rupee! 💖",
    rating: 5,
    avatar: "🧕",
    template: "Birthday Countdown",
  },
  {
    name: "Arjun M.",
    text: "The Valentine's question template with the runaway 'No' button was hilarious! She said YES of course 😂❤️",
    rating: 5,
    avatar: "👨",
    template: "Valentine's Question",
  },
  {
    name: "Sneha R.",
    text: "Created a gift in 8 minutes, shared on WhatsApp, and my best friend couldn't stop crying. This is genius!",
    rating: 5,
    avatar: "👩",
    template: "5 Things I Love",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-paper-bg" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl inline-block mb-4"
          >
            🌟
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            >
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card p-6 h-full flex flex-col"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <motion.div
                      key={j}
                      animate={{ scale: [1, 1.2, 1] }}
                      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.1 }}
                    >
                      <Star className="w-4 h-4 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed mb-4 flex-1">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border/20">
                  <span className="text-2xl">{t.avatar}</span>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t.name}</div>
                    <div className="text-xs text-primary">{t.template}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
