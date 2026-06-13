import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface WhatsAppSupportProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppSupport = ({ 
  phoneNumber = "918610381533", 
  message = "Hello! I need some help regarding Magic Frame AR." 
}: WhatsAppSupportProps) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodedMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[999] flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] border-2 border-white/20 hover:bg-[#20bd5a] transition-colors"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white fill-white" />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
    </motion.a>
  );
};

export default WhatsAppSupport;
