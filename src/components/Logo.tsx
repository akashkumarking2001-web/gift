import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  iconSize?: string;
  textSize?: string;
  showText?: boolean;
  onClick?: () => void;
}

const Logo = ({ className = "", iconSize = "h-10 w-10", textSize = "text-xl", showText = true, onClick }: LogoProps) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} onClick={onClick}>
      {/* The Circular "G" Icon */}
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        className={`${iconSize} relative flex-shrink-0`}
      >
        <div className="absolute inset-0 bg-primary blur-lg opacity-40 rounded-full animate-pulse" />
        <div className="relative w-full h-full bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-xl border border-white/50">
           <div className="w-[85%] h-[85%] bg-[#f04299] rounded-full flex items-center justify-center font-black text-white" style={{ fontSize: '100%', lineHeight: 1 }}>
              G
           </div>
        </div>
      </motion.div>

      {/* Brand Text: Giftmagic */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className={`${textSize} font-bold tracking-tight flex items-center font-inter`}>
            <span className="text-white">Gift</span>
            <span className="text-white">magic</span>
          </div>
          <span className="text-[7px] font-bold tracking-[0.3em] text-[#f04299]/60 uppercase mt-1">Digital Experience</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
