import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Sparkles, ArrowRight } from "lucide-react";
import Logo from "../components/Logo";
import FloatingHearts from "../components/landing/FloatingHearts";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/use-toast";

const Login = () => {
  const [accountType, setAccountType] = useState<"personal" | "business">("personal");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 1. Try Business Login First (Universal Login)
      const { BusinessService } = await import("../lib/businessService");
      try {
        const client = await BusinessService.verifyLogin(email, password);
        if (client) {
          if (!client.is_active) {
            // Check why they are suspended/inactive
            const { data: regReq } = await supabase
              .from('business_registration_requests')
              .select('payment_status, status')
              .eq('email', email)
              .order('created_at', { ascending: false })
              .maybeSingle();

            if (regReq) {
              if (regReq.payment_status?.toUpperCase() === 'PENDING') {
                toast({ 
                  title: "Payment Pending", 
                  description: "Your payment is pending; please try logging in after some time.", 
                  variant: "destructive" 
                });
                return;
              } else if (regReq.status === 'pending') {
                toast({ 
                  title: "Payment Required", 
                  description: "You haven't completed the payment yet. Please pay to gain access.", 
                  variant: "destructive" 
                });
                return;
              }
            }
            
            toast({ 
              title: "Account Suspended", 
              description: "Your account is currently inactive. Please contact support.", 
              variant: "destructive" 
            });
            return;
          }

          localStorage.setItem("business_auth", JSON.stringify(client));
          toast({ title: "Portal Login Successful", description: `Welcome back, ${client.business_name}!` });
          
          // Cross-subdomain redirect logic
          const hostname = window.location.hostname;
          const host = window.location.host; 
          const protocol = window.location.protocol;
          
          let targetHost = host;
          if (host.includes("localhost")) {
              const port = host.split(":")[1] || "5173";
              targetHost = `${client.custom_domain || client.business_slug}.localhost:${port}`;
          } else if (host.endsWith("giftmagic.beauty")) {
              targetHost = client.custom_domain || `${client.business_slug}.giftmagic.beauty`;
          } else {
              targetHost = client.custom_domain || `${client.business_slug}.giftmagic.beauty`;
          }

          if (targetHost !== host) {
              window.location.href = `${protocol}//${targetHost}/dashboard`;
              return;
          }
          
          navigate("/dashboard");
          return; // Exit after successful business login
        }
      } catch (err: any) {
        console.error("Biz Login Error:", err);
        // If it's a specific "suspended" error, we'd handle it here, 
        // but verifyLogin might just return null for wrong pass.
      }

      // 2. Fallback to Personal Login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      toast({ title: "Login Successful", description: "Welcome back!" });
      navigate("/dashboard");

    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center font-outfit">
      <FloatingHearts />

      {/* Background glows */}
      <div
        style={{ transform: 'translateZ(0)', willChange: 'opacity', backfaceVisibility: 'hidden' }}
        className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[150px] rounded-full animate-pulse pointer-events-none"
      />
      <div
        style={{ transform: 'translateZ(0)', willChange: 'opacity', backfaceVisibility: 'hidden', animationDelay: '2s' }}
        className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/20 blur-[150px] rounded-full animate-pulse pointer-events-none"
      />
      <div className="absolute inset-0 grid-paper-bg opacity-20" />

      <div className="relative z-10 w-full max-w-xl px-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
          className="text-center mb-12 flex justify-center"
        >
          <Link to="/">
            <Logo 
              iconSize="h-20 w-20" 
              textSize="text-5xl" 
              className="flex-col gap-6"
            />
          </Link>
        </motion.div>

        {/* Login form */}
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
            <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Access Your Vault</h1>
            <p className="text-muted-foreground font-medium">Step back into the world of digital magic</p>

            {/* Account Type Toggle */}
            <div className="flex justify-center mt-6">
              <div className="inline-flex p-1 bg-white/5 rounded-xl border border-white/10">
                <button
                  onClick={() => setAccountType("personal")}
                  className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${accountType === "personal" ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
                >
                  Personal
                </button>
                <button
                  onClick={() => setAccountType("business")}
                  className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${accountType === "business" ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-white/40 hover:text-white'}`}
                >
                  Business
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-1">Identity Vector (Email)</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  placeholder="name@magic.com"
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-1">Access Key (Password)</label>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-14 py-4 rounded-2xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-medium"
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

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="w-4 h-4 rounded border border-white/20 bg-white/5 group-hover:border-primary transition-colors" />
                <span className="text-xs font-bold text-muted-foreground group-hover:text-white transition-colors">Remember Me</span>
              </label>
              <Link to="/forgot-password" opacity-100 className="text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors">
                Lost Key?
              </Link>
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
                    Initialize Session
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
