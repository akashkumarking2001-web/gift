import { motion } from "framer-motion";

const steps = [
  {
    icon: "🎨",
    title: "Choose a Template",
    description: "Browse our collection of 19+ stunning interactive templates for every occasion.",
    color: "from-primary to-pink-deep",
  },
  {
    icon: "✏️",
    title: "Customize It",
    description: "Add your personal touch — messages, photos, names. Our editor makes it effortless.",
    color: "from-secondary to-pastel-purple",
  },
  {
    icon: "🔗",
    title: "Share the Magic",
    description: "Get a unique link and share instantly via WhatsApp. No app download needed!",
    color: "from-accent to-pink-soft",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-paper-bg" />
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />

      <div className="container relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-4xl inline-block mb-4"
          >
            💫
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Create magical digital gifts in just 3 simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
              className="relative"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-px bg-gradient-to-r from-primary/30 to-transparent" />
              )}

              <motion.div
                whileHover={{ y: -8 }}
                className="glass-card p-8 text-center h-full"
              >
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                  className="text-5xl mb-5 inline-block"
                >
                  {step.icon}
                </motion.div>

                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full gradient-primary text-primary-foreground text-sm font-bold mb-4">
                  {i + 1}
                </div>

                <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
