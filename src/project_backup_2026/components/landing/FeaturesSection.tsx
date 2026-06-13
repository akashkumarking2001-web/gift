import { motion } from "framer-motion";
import { Smartphone, Zap, Palette, Share2, Shield, Heart } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Perfect on every phone. Designed for WhatsApp sharing.",
    emoji: "📱",
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Share via link — no app download, no waiting.",
    emoji: "⚡",
  },
  {
    icon: Palette,
    title: "Easy to Customize",
    description: "Our editor lets anyone create professional results in minutes.",
    emoji: "🎨",
  },
  {
    icon: Share2,
    title: "One-Click Sharing",
    description: "WhatsApp, Instagram, SMS — share anywhere instantly.",
    emoji: "🔗",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your gifts are private. Only people with the link can view.",
    emoji: "🔒",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every template is handcrafted to evoke real emotions.",
    emoji: "💝",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-paper-bg" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl inline-block mb-4"
          >
            💎
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">GiftMagic</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Everything you need to create unforgettable digital gifts
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-card p-7 h-full group"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    animate={{ y: [0, -5, 0], rotate: [0, 5, -5, 0] }}
                    style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                    className="text-3xl flex-shrink-0"
                  >
                    {feature.emoji}
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
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

export default FeaturesSection;
