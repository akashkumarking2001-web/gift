import AnimatedCounter from "./AnimatedCounter";

const StatsSection = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      <div className="absolute inset-0 grid-paper-bg" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[100px]" />

      <div className="container relative z-10 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          <AnimatedCounter end={5000} suffix="+" label="Gifts Created" icon="🎁" />
          <AnimatedCounter end={19} label="Templates" icon="🎨" />
          <AnimatedCounter end={98} suffix="%" label="Happy Users" icon="💖" />
          <AnimatedCounter end={10} suffix="min" label="Avg. Create Time" icon="⚡" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
