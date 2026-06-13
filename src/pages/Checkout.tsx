import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  // @ts-ignore
  useLocation
} from 'react-router-dom';
import { useToast } from "../hooks/use-toast";
import { Check, Shield, Lock, Instagram, Loader2, CreditCard } from "lucide-react";
import Logo from "../components/Logo";
import FloatingHearts from "../components/landing/FloatingHearts";
import { PurchaseService, BundleTemplate } from "../lib/purchaseService";
import { ProfileService } from "../lib/profileService";
import { SettingsService } from "../lib/settings";
import { supabase } from "../lib/supabase";
import { TEMPLATES } from "../lib/templates";

// Declare Cashfree for TypeScript
declare global {
  interface Window {
    Cashfree: any;
  }
}

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cashfree, setCashfree] = useState<any>(null);

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Template Info
  const location = useLocation();
  const checkoutState = location.state as {
    bundle?: string;
    templateId?: string | number;
    title?: string;
    price?: number;
    mrp?: number;
  } | null;

  const urlParams = new URLSearchParams(window.location.search);
  const templateId = (checkoutState?.templateId || checkoutState?.bundle || urlParams.get('templateId') || '1').toString();
  const selectedTemplate = TEMPLATES.find(t => t.id.toString() === templateId);

  let templateTitle: string;
  let templatePrice: number;
  let templateMrp: number;

  const [bundleData, setBundleData] = useState<BundleTemplate | null>(null);
  const [instagramUrl, setInstagramUrl] = useState("");

  if (checkoutState?.bundle) {
    templateTitle = bundleData?.bundle_name || checkoutState.title || (checkoutState.bundle === "valentines" ? "Valentine's Special Bundle" : "Special Bundle");
    templatePrice = bundleData?.price || checkoutState.price || (checkoutState.bundle === "valentines" ? 99 : checkoutState.bundle === "all-access" ? 399 : 149);
    templateMrp = bundleData?.original_price || checkoutState.mrp || 2499;
  } else if (checkoutState?.templateId) {
    templateTitle = checkoutState.title || selectedTemplate?.title || 'Premium Template';
    templatePrice = checkoutState.price || selectedTemplate?.price || 149;
    templateMrp = checkoutState.mrp || selectedTemplate?.originalPrice || 0;
  } else {
    templateTitle = urlParams.get('title') || selectedTemplate?.title || 'Premium Template';
    templatePrice = parseInt(urlParams.get('price') || selectedTemplate?.price.toString() || '149');
    templateMrp = parseInt(urlParams.get('mrp') || selectedTemplate?.originalPrice.toString() || '0');
  }

  const [isNewUser, setIsNewUser] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Initialize Cashfree
    if (window.Cashfree) {
      const mode = import.meta.env.VITE_CASHFREE_MODE || 'sandbox';
      setCashfree(window.Cashfree({ mode }));
    }

    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
        setIsNewUser(false);

        try {
          if (checkoutState?.templateId) {
            const status = await PurchaseService.getTemplateStatus(checkoutState.templateId.toString());
            if (status === 'owned') {
              toast({ title: "Already Owned", description: "You already have access to this template." });
              navigate("/dashboard");
              return;
            }
          }
        } catch (e) {
          console.error("Duplicate check failed", e);
        }

        try {
          const profile = await ProfileService.getProfile();
          if (profile) {
            setFullName(profile.full_name || "");
            setMobile(profile.phone || "");
          }
        } catch (e) {
          console.error("Failed to load profile", e);
        }
      } else {
        setIsNewUser(true);
      }
    };

    SettingsService.getSettings().then((s: any) => {
      if (s.instagram_url) setInstagramUrl(s.instagram_url);
    });

    if (checkoutState?.bundle) {
      PurchaseService.getBundleConfiguration(checkoutState.bundle).then(b => {
        if (b) setBundleData(b);
      });
    }

    checkAuth();
  }, [checkoutState]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !mobile) {
      toast({ title: "Missing Information", description: "Please fill in all details.", variant: "destructive" });
      return;
    }

    if (isNewUser) {
      if (!password || password.length < 6) {
        toast({ title: "Invalid Password", description: "Password must be at least 6 characters.", variant: "destructive" });
        return;
      }
      if (password !== confirmPassword) {
        toast({ title: "Password Mismatch", description: "Passwords do not match.", variant: "destructive" });
        return;
      }
    }

    if (!cashfree) {
      toast({ title: "Payment Error", description: "Cashfree SDK not loaded. Please refresh.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Create account if needed
      let currentUserId = "";
      if (isNewUser) {
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, phone: mobile }
          }
        });

        if (signUpError) throw signUpError;
        
        if (authData.user) {
          currentUserId = authData.user.id;
          await ProfileService.updateProfile({ full_name: fullName, phone: mobile });
        }
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        currentUserId = user?.id || "";
      }

      // 2. Create Cashfree Order via backend
      const apiUrl = '/api/create-cashfree-order';
      console.log('Fetching order from:', apiUrl);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: templatePrice,
          customer_id: currentUserId || email.replace(/[^a-zA-Z0-9]/g, '_'),
          customer_name: fullName,
          customer_email: email,
          customer_phone: mobile,
          order_note: `Order for ${templateTitle}`
        })
      });

      const orderData = await response.json();
      if (!response.ok) throw new Error(orderData.message || "Failed to create order");

      // 3. Create purchase record in database (as Pending)
      const isBundle = !!checkoutState?.bundle;
      const basePurchaseData = {
        amount_paid: templatePrice,
        transaction_id: orderData.order_id,
        cf_order_id: orderData.order_id,
        cf_session_id: orderData.payment_session_id,
        status: 'pending' as const,
      };

      if (isBundle && checkoutState?.bundle) {
        await PurchaseService.createBundlePurchase({
          bundle_id: checkoutState.bundle,
          bundle_name: templateTitle,
          template_id: 'BUNDLE', // Placeholder for non-null column
          template_title: templateTitle,
          ...basePurchaseData
        });
      } else {
        await PurchaseService.createPurchase({
          template_id: templateId,
          template_title: templateTitle,
          ...basePurchaseData
        });
      }

      toast({ 
        title: "Payment Initiated", 
        description: "Opening secure payment window..." 
      });

      // 4. Trigger Cashfree Checkout
      if (!window.Cashfree) {
         throw new Error("Cashfree SDK not found. Please refresh the page.");
      }
      const cf = window.Cashfree({ mode: import.meta.env.VITE_CASHFREE_MODE === 'production' ? 'production' : 'sandbox' });
      
      await cf.checkout({
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: '_self'
      });


    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Payment Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a060a] text-white font-sans selection:bg-primary/30 relative overflow-x-hidden">
      <FloatingHearts />

      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

      <nav className="w-full z-50 px-6 py-4 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/">
            <Logo textSize="text-lg" />
          </Link>
          <div className="flex items-center gap-2 text-white/60 text-sm font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Lock className="w-4 h-4 text-green-500" />
            Secure Checkout
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-black mb-6">Order Summary</h2>
              <div className="glass-card rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="text-2xl">✨</div>
                  <div>
                    <p className="font-bold text-white">{templateTitle}</p>
                    <p className="text-xs text-white/40">Premium Digital Template</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-white/60 uppercase tracking-wider">What's Included:</p>
                  <div className="space-y-2">
                    {["Fully customizable template", "Interactive animations", "Lifetime access", "Shareable gift link"].map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-3">
                  {templateMrp > templatePrice && (
                    <>
                      <div className="flex justify-between text-sm text-white/60">
                        <span>Original Price</span>
                        <span className="line-through">₹{templateMrp}</span>
                      </div>
                      <div className="flex justify-between text-sm text-primary font-bold">
                        <span>Discount ({Math.round(((templateMrp - templatePrice) / templateMrp) * 100)}% Off)</span>
                        <span>-₹{templateMrp - templatePrice}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between text-xl font-black pt-2 border-t border-white/5">
                    <span>Total Payable</span>
                    <span className="text-primary">₹{templatePrice}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card-static p-4 rounded-xl flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-500" />
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 leading-none">
                  SSL Secure<br /><span className="text-[8px] opacity-50">256-bit encryption</span>
                </div>
              </div>
              <div className="glass-card-static p-4 rounded-xl flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-blue-500" />
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 leading-none">
                  Instant Access<br /><span className="text-[8px] opacity-50">Auto-verified payment</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 lg:p-10 space-y-10 border border-white/10">
              <div>
                <h2 className="text-3xl font-black mb-2">Checkout</h2>
                <p className="text-white/40 text-sm">Fill in your details to proceed with the secure payment.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80 flex items-center gap-2">
                    <span className="bg-primary/20 text-primary w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
                    Your Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-white/60 px-1">Full Name</label>
                      <input
                        className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-white/20 focus:outline-none"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-white/60 px-1">Email Address</label>
                      <input
                        className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-white/20 focus:outline-none"
                        placeholder="john@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={!isNewUser}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-semibold text-white/60 px-1">Mobile Number (WhatsApp)</label>
                      <input
                        className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-white/20 focus:outline-none"
                        placeholder="+91 98765 43210"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                    </div>

                    {isNewUser && (
                      <>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-white/60 px-1">Create Password</label>
                          <input
                            className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-white/20 focus:outline-none"
                            placeholder="Min. 6 characters"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-white/60 px-1">Confirm Password</label>
                          <input
                            className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-white/20 focus:outline-none"
                            placeholder="Re-enter password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-white font-black py-5 rounded-xl text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                      <>
                        <Check className="w-6 h-6" />
                        Pay Securely with Cashfree
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-white/30 italic mt-4">
                    UPI, Cards, and Netbanking supported via secure Cashfree payment gateway.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 mt-12 relative z-10 glass-card-static">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs text-center md:text-left">
            © 2026 Gift Magic Interactive Marketplace. <br className="md:hidden" />
            Licensed Digital Magic Platform.
          </p>
          <div className="flex gap-4">
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors flex items-center gap-1">
                <Instagram className="w-3 h-3" />
                <span className="text-xs">Instagram</span>
              </a>
            )}
            <Link className="text-white/20 hover:text-white text-xs" to="/privacy">Privacy</Link>
            <Link className="text-white/20 hover:text-white text-xs" to="/refund">Refund</Link>
            <Link className="text-white/20 hover:text-white text-xs" to="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
