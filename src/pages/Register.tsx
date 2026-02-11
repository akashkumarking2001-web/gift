import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Sparkles, ArrowRight, Eye, EyeOff } from "lucide-react";
import FloatingHearts from "../components/landing/FloatingHearts";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/use-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.name,
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: formData.email,
            full_name: formData.name,
            status: 'Active'
          });

        if (profileError) console.error("Profile creation error:", profileError);

        toast({
          title: "Registration Successful",
          description: "Welcome to Gift Magic!",
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
      <div
        style={{ transform: 'translateZ(0)', willChange: 'opacity', backfaceVisibility: 'hidden' }}
        className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse pointer-events-none"
      />
      <div
        style={{ transform: 'translateZ(0)', willChange: 'opacity', backfaceVisibility: 'hidden', animationDelay: '2s' }}
        className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[150px] rounded-full animate-pulse pointer-events-none"
      />
      <div className="absolute inset-0 grid-paper-bg opacity-20" />

      <div className="relative z-10 w-full max-w-xl px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
          className="text-center mb-12"
        >
          <div className="inline-flex flex-col items-center gap-6 group">
            <Link to="/" className="relative">
              <img
                src="/logo.svg"
                alt="Gift Magic"
                className="h-24 w-auto object-contain group-hover:scale-105 transition-transform"
                onError={(e: any) => {
                  e.currentTarget.src = "/logo.png";
                  const fallback = document.getElementById('register-logo-fallback');
                  if (fallback) fallback.style.display = 'block';
                }}
              />
              <motion.div
                id="register-logo-fallback"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                style={{ display: 'none', transform: 'translateZ(0)', willChange: 'transform' }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-7xl absolute inset-0 flex items-center justify-center"
              >
                💝
              </motion.div>
            </Link>

            {/* Brand Text */}
            <div className="flex flex-col items-center leading-tight">
              <span className="text-5xl font-black tracking-tight flex items-center">
                <span className="gradient-text">Gift</span>
                <span className="text-white ml-2">Magic</span>
              </span>
              <span className="text-xs font-bold tracking-[0.4em] text-[#f04299]/60 uppercase mt-2">Digital Experience</span>
            </div>
          </div>
        </motion.div>

        {/* Register form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 20 }}
          style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
          className="glass-card p-10 md:p-14 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Create Identity</h1>
            <p className="text-muted-foreground font-medium">Join the circle of digital magic creators</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#f04299]/80 ml-1">Creator Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#f04299] transition-colors" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e: any) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#f04299]/50 focus:ring-4 focus:ring-[#f04299]/10 transition-all font-medium"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#f04299]/80 ml-1">Identity Vector (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#f04299] transition-colors" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@magic.com"
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#f04299]/50 focus:ring-4 focus:ring-[#f04299]/10 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#f04299]/80 ml-1">Access Key (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#f04299] transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-14 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#f04299]/50 focus:ring-4 focus:ring-[#f04299]/10 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#f04299]/80 ml-1">Verify Key</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[#f04299] transition-colors" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e: any) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#f04299]/50 focus:ring-4 focus:ring-[#f04299]/10 transition-all font-medium"
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full gradient-primary h-16 rounded-3xl text-primary-foreground font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70 group/btn relative overflow-hidden"
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
                    Authorize Account
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-muted-foreground">
              Already a creator?{" "}
              <Link to="/login" className="text-primary font-black uppercase tracking-widest hover:text-white transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
