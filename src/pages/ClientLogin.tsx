import { useState } from "react";
import { BusinessService } from "../lib/businessService";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { LogIn } from "lucide-react";
import Logo from "../components/Logo";
import FloatingHearts from "../components/landing/FloatingHearts";

interface ClientLoginProps {
    slug: string;
}

export default function ClientLogin({ slug }: ClientLoginProps) {
    const [biz, setBiz] = useState<any>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const client = await BusinessService.verifyLogin(email, password);
            if (client) {
                const isValidClient = client.business_slug === slug || client.custom_domain === slug;
                if (!isValidClient) {
                    toast({ title: "Routing", description: "Redirecting to your correct portal..." });
                    const protocol = window.location.protocol;
                    const host = window.location.host;
                    let targetHost = host;
                    if (host.includes("localhost")) {
                        const port = host.split(":")[1] || "5173";
                        targetHost = `${client.custom_domain || client.business_slug}.localhost:${port}`;
                    } else if (host.endsWith("giftmagic.beauty")) {
                        targetHost = client.custom_domain || `${client.business_slug}.giftmagic.beauty`;
                    } else {
                        targetHost = client.custom_domain || `${client.business_slug}.giftmagic.beauty`; 
                    }
                    window.location.href = `${protocol}//${targetHost}/dashboard`;
                    return;
                }
                localStorage.setItem(`client_auth_${slug}`, JSON.stringify(client));
                toast({ title: "Success", description: "Logged in successfully to Dashboard." });
                navigate("/dashboard");
            } else {
                toast({ title: "Error", description: "Invalid credentials.", variant: "destructive" });
            }
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to login.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a050d] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-outfit">
            <FloatingHearts />
            <div className="absolute inset-0 grid-paper-bg opacity-10" />
            
            {/* Ambient Backglow */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="w-full max-w-sm glass-card p-10 rounded-3xl border border-white/10 shadow-2xl z-10 relative overflow-hidden group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent rounded-3xl blur opacity-25" />
                
                <div className="relative flex flex-col items-center">
                    <div className="mb-10">
                        <Link to="/">
                            <Logo iconSize="h-16 w-16" textSize="text-3xl" />
                        </Link>
                    </div>

                    <div className="text-center space-y-3 mb-10">
                        <h1 className="text-5xl font-black text-white tracking-tighter italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                            Partner <span className="text-primary drop-shadow-[0_0_15px_rgba(240,66,153,0.5)]">Petrol</span>
                        </h1>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.4em] font-sans">
                            Proprietary AR Management System
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="w-full space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Secure Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-all font-medium"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Credential</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                                placeholder="Password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-primary text-white font-black uppercase tracking-[0.2em] text-xs rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {isLoading ? 'Decrypting Access...' : <><LogIn className="w-4 h-4" /> Authorize</>}
                        </button>
                    </form>

                    <div className="text-center pt-6 border-t border-white/5 mt-6 w-full">
                        <Link to="/" className="text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors">
                            ← Terminate Session
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

