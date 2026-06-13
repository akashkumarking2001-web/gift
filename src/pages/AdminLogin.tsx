import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/use-toast";
import FloatingHearts from "../components/landing/FloatingHearts";
import Logo from "../components/Logo";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Ideally check for admin role here if metadata supports it
            // if (data.user?.user_metadata?.role !== 'admin') {
            //   await supabase.auth.signOut();
            //   throw new Error("Unauthorized access. Admin only.");
            // }

            toast({
                title: "Admin Access Granted",
                description: "Welcome to the command center.",
            });
            navigate("/admin");
        } catch (error: any) {
            toast({
                title: "Access Denied",
                description: error.message || "Invalid credentials",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] relative overflow-hidden flex items-center justify-center font-outfit selection:bg-red-500/30">
            <FloatingHearts />
            <div className="absolute inset-0 grid-paper-bg opacity-10" />

            {/* Darker, red-tinted backglow for Admin */}
            <div style={{ transform: 'translateZ(0)', willChange: 'opacity', backfaceVisibility: 'hidden' }} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full max-w-md px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                    className="glass-card p-10 relative overflow-hidden border border-white/10 shadow-3xl"
                >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

                    <div className="text-center mb-10 flex flex-col items-center">
                        <div className="mb-8">
                           <Logo iconSize="h-16 w-16" textSize="text-3xl" />
                        </div>
                        <h1 className="text-xl font-black text-white mb-2 tracking-widest uppercase italic">Command <span className="text-red-500">Center</span></h1>
                        <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">Restricted Administrative Mesh</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-red-500/60 ml-1">Admin ID</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 text-white placeholder:text-white/10 focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 transition-all text-sm font-mono"
                                placeholder="admin@system.local"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-red-500/60 ml-1">Secure Key</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/5 text-white placeholder:text-white/10 focus:outline-none focus:border-red-500/40 focus:ring-1 focus:ring-red-500/20 transition-all text-sm font-mono"
                                    placeholder="••••••••••••"
                                />
                                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group mt-8"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Authenticate
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <Link to="/" className="block text-center mt-8 text-xs text-white/20 hover:text-white/40 transition-colors">
                        Return to Public Gateway
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
