import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, Sparkles, ArrowRight, Check } from "lucide-react";
import FloatingHearts from "../components/landing/FloatingHearts";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordsMatch) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords are the same.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
            phone: formData.phone,
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email: formData.email,
            full_name: formData.name,
            status: 'Active'
          });

        if (profileError) console.error("Profile creation error:", profileError);

        toast({
          title: "Registration Successful",
          description: "Welcome to GiftMagic!",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = formData.password.length >= 8;
  const passwordsMatch = formData.password === formData.confirmPassword && formData.confirmPassword.length > 0;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center py-16 font-outfit">
      <FloatingHearts />

      {/* Background glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[150px] rounded-full animate-pulse pointer-events-none" style={{ animationDelay: '2s' }} />
      <div className="absolute inset-0 grid-paper-bg opacity-20" />

      <div className="relative z-10 w-full max-w-xl px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <Link to="/" className="inline-flex flex-col items-center gap-4 group">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.2, 1],
                y: [0, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-7xl filter drop-shadow-[0_0_20px_rgba(255,107,181,0.5)] group-hover:scale-125 transition-transform duration-500"
            >
              💝
            </motion.div>
            <div className="flex flex-col">
              <span className="text-4xl font-black tracking-tighter">
                <span className="gradient-text">Gift</span>
                <span className="text-white">Magic</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Creative Studio</span>
            </div>
          </Link>
        </motion.div>

        {/* Registration form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 20 }}
          className="glass-card p-10 md:p-14 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Decorative element */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-secondary/10 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/2" />

          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Forge Your Legend</h1>
            <p className="text-muted-foreground font-medium">Join the elite circle of digital gift creators</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-1">The Creator (Name)</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Elden Root"
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-1">Comms Link (Phone)</label>
                <div className="relative group">
                  <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 00000 00000"
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-1">Identity Vector (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nexus@magic.com"
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-1">Access Key</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-14 pr-12 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-1">Verify Key</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Password Validation */}
            <div className="flex gap-4 px-2">
              <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${passwordStrength ? 'text-primary' : 'text-white/20'}`}>
                <div className={`w-2 h-2 rounded-full ${passwordStrength ? 'bg-primary shadow-[0_0_10px_rgba(255,107,181,1)]' : 'bg-white/10'}`} />
                Complexity
              </div>
              <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${passwordsMatch ? 'text-primary' : 'text-white/20'}`}>
                <div className={`w-2 h-2 rounded-full ${passwordsMatch ? 'bg-primary shadow-[0_0_10px_rgba(255,107,181,1)]' : 'bg-white/10'}`} />
                Matching
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full gradient-primary h-16 rounded-3xl text-primary-foreground font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 group/btn relative overflow-hidden mt-4"
            >
              <span className="relative z-10 flex items-center gap-3">
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-6 h-6 border-3 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                  />
                ) : (
                  <>
                    Initialize Account
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </form>

          {/* Terms */}
          <p className="text-[10px] font-bold text-white/30 text-center mt-8 uppercase tracking-widest">
            By initializing, you accept the{" "}
            <Link to="/terms" className="text-primary hover:text-white transition-colors">Directives</Link> &{" "}
            <Link to="/privacy" className="text-primary hover:text-white transition-colors">Privacy protocols</Link>
          </p>
        </motion.div>

        {/* Login link */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-muted-foreground font-medium"
        >
          Already an initiate?{" "}
          <Link to="/login" className="text-primary font-black uppercase tracking-widest text-xs ml-2 hover:text-white transition-colors">
            Enter the vault
          </Link>
        </motion.p>
      </div>
    </div>
  );
};

export default Register;
