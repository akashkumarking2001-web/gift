import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("contact_requests")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            status: "new"
          }
        ]);

      if (error) throw error;

      setSubmitted(true);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Auto close after 3 seconds on success
      setTimeout(() => {
        onClose();
        setSubmitted(false);
      }, 3000);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-black border border-white/10 rounded-3xl p-0 overflow-hidden">
        <div className="absolute inset-0 grid-paper-bg opacity-5 -z-10" />
        
        <DialogHeader className="p-8 pb-0">
          <DialogTitle className="text-3xl font-black text-white tracking-tight">
            Get in <span className="gradient-text">Touch</span>
          </DialogTitle>
          <DialogDescription className="text-white/40 mt-2 font-medium">
            Have a question or need a custom design? We're here to help.
          </DialogDescription>
        </DialogHeader>

        <div className="p-8 pt-6">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/60 font-medium ml-1">Your Name</Label>
                  <Input
                    id="name"
                    required
                    placeholder="Enter your name"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/10 py-6 rounded-2xl focus:ring-primary focus:border-primary transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/60 font-medium ml-1">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/10 py-6 rounded-2xl focus:ring-primary focus:border-primary transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white/60 font-medium ml-1">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What's this about?"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/10 py-6 rounded-2xl focus:ring-primary focus:border-primary transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white/60 font-medium ml-1">Message</Label>
                  <Textarea
                    id="message"
                    required
                    placeholder="How can we help you?"
                    rows={4}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/10 rounded-2xl focus:ring-primary focus:border-primary transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <Button
                  disabled={loading}
                  className="w-full gradient-primary py-7 rounded-2xl text-white font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </Button>
                
                <div className="pt-4 flex items-center justify-center gap-2 border-t border-white/5">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                    Direct Email: <span className="text-white/60 select-all">Axosolu@gmail.com</span>
                  </span>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-10 text-center"
              >
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Message Sent!</h3>
                <p className="text-white/40 mb-8 max-w-[250px] mx-auto leading-relaxed">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm font-bold text-white/60">Axosolu@gmail.com</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
