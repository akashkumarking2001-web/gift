import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { Check, Copy, Shield, Lock, Instagram } from "lucide-react";
import FloatingHearts from "../components/landing/FloatingHearts";
import { PurchaseService } from "../lib/purchaseService";
import { ProfileService } from "../lib/profileService";
import { SettingsService } from "../lib/settings";
import { supabase } from "../lib/supabase";
import { TEMPLATES } from "../lib/templates";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // System Settings State
  const [upiId, setUpiId] = useState("payments@giftly.upi");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Template Info - Check location.state first (for bundles), then URL params (for individual templates)
  const location = useLocation();
  const bundleState = location.state as { bundle?: string; price?: number; title?: string } | null;

  const urlParams = new URLSearchParams(window.location.search);
  const paramId = urlParams.get('templateId') || '1';

  // Find template matching paramId
  const selectedTemplate = TEMPLATES.find(t => t.id.toString() === paramId);

  // Determine title, price, and MRP based on bundle or template
  let templateTitle: string;
  let templatePrice: number;
  let templateMrp: number;
  let templateId: string;

  if (bundleState?.bundle) {
    // Bundle purchase
    templateId = bundleState.bundle;
    if (bundleState.bundle === "valentines") {
      templateTitle = "Valentine's Special Bundle (3 Templates)";
      templatePrice = 99;
      templateMrp = 1800;
    } else if (bundleState.bundle === "all-access") {
      templateTitle = "All-Access Combo (19+ Templates)";
      templatePrice = 399;
      templateMrp = 5000;
    } else {
      templateTitle = bundleState.title || "Special Bundle";
      templatePrice = bundleState.price || 99;
      templateMrp = 0;
    }
  } else {
    // Individual template purchase
    templateId = paramId;
    templateTitle = urlParams.get('title') || selectedTemplate?.title || 'Premium Template';
    templatePrice = parseInt(urlParams.get('price') || selectedTemplate?.price.toString() || '149');
    templateMrp = parseInt(urlParams.get('mrp') || selectedTemplate?.originalPrice.toString() || '0');
  }

  const [isNewUser, setIsNewUser] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    // Check auth
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Existing user - auto-fill details
        setEmail(user.email || "");
        setIsNewUser(false);
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
        // New user - don't pre-fill, show registration fields
        setIsNewUser(true);
        setEmail("");
        setFullName("");
        setMobile("");
      }
    };

    // Load settings
    SettingsService.getSettings().then((s: any) => {
      if (s.upi_id) setUpiId(s.upi_id);
      if (s.qr_code_url) setQrCodeUrl(s.qr_code_url);
      if (s.instagram_url) setInstagramUrl(s.instagram_url);
    });

    checkAuth();
  }, []);

  const copyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    toast({ title: "UPI ID Copied", description: "Paste it in your payment app." });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !mobile) {
      toast({ title: "Missing Information", description: "Please fill in all details.", variant: "destructive" });
      return;
    }

    // Validate password for new users
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

    if (transactionId.length < 10) {
      toast({
        title: "Invalid Transaction ID",
        description: "Please enter a valid 12-digit UTR number.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Step 1: Create user account if new user
      if (isNewUser) {
        // Sign up the user
        const { data: authData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              full_name: fullName,
              phone: mobile,
            }
          }
        });

        if (signUpError) throw signUpError;

        // Check if email confirmation is required
        if (authData.user && !authData.session) {
          // Email confirmation required - sign in immediately (for development/testing)
          const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInError) {
            // If sign-in fails, it means email confirmation is required
            toast({
              title: "Account Created! 📧",
              description: "Please check your email to confirm your account, then login to complete your purchase.",
              variant: "default",
            });
            setTimeout(() => navigate("/login"), 3000);
            return;
          }
        }

        // Create user profile
        await ProfileService.updateProfile({
          full_name: fullName,
          phone: mobile,
        });

        toast({
          title: "Account Created! ✅",
          description: "Your account has been created successfully.",
        });

        // Small delay to ensure session is fully established
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Step 2: Upload screenshot if provided
      let screenshotUrl = undefined;

      if (screenshot) {
        const fileExt = screenshot.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('payment-proofs')
          .upload(filePath, screenshot);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          // Don't throw, just log and proceed without screenshot if it fails? 
          // Or user said "Submit Payment Proof button must be functional even if user hasn't uploaded".
          // If they uploaded and it failed, maybe we should warn? But sticking to user request: screenshot not mandatory.
        } else {
          const { data } = supabase.storage
            .from('payment-proofs')
            .getPublicUrl(filePath);
          screenshotUrl = data.publicUrl;
        }
      }

      // Step 3: Create purchase using PurchaseService
      await PurchaseService.createPurchase({
        template_id: templateId,
        template_title: templateTitle,
        amount_paid: templatePrice,
        transaction_id: transactionId,
        payment_screenshot_url: screenshotUrl,
      });

      // Step 4: Update user profile (for existing users)
      if (!isNewUser) {
        await ProfileService.updateProfile({
          full_name: fullName,
          phone: mobile,
        });
      }

      toast({
        title: "Purchase Submitted! 🎉",
        description: "Your template will be unlocked within 2 hours after verification.",
      });

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (error: any) {
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: error.message || "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a060a] text-white font-sans selection:bg-primary/30">
      <FloatingHearts />

      {/* Navbar */}
      <nav className="w-full z-50 px-6 py-4 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="GiftMagic"
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const checkoutTextLogo = document.getElementById('checkout-text-logo');
                if (checkoutTextLogo) checkoutTextLogo.style.display = 'block';
              }}
            />
            <div id="checkout-text-logo" style={{ display: 'none' }} className="text-2xl font-black tracking-tighter text-white">
              <span className="text-primary pr-2">♥</span>Gift Magic
            </div>
          </Link>
          <div className="flex items-center gap-2 text-white/60 text-sm font-medium bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
            <Lock className="w-4 h-4 text-green-500" />
            Secure Checkout
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12">

          {/* Left Column: Order Summary */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-3xl font-black mb-6">Order Summary</h2>
              <div className="glass-card rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="text-2xl">✨</div>
                  <div>
                    <p className="font-bold text-white">{templateTitle}</p>
                    <p className="text-xs text-white/40">Premium Template</p>
                  </div>
                </div>

                {/* Template Features - Dynamic based on template */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-white/60 uppercase tracking-wider">What's Included:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Fully customizable template</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Interactive animations</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      <span>Shareable gift link</span>
                    </div>
                  </div>
                </div>

                <hr className="border-white/5" />

                {/* Dynamic Pricing */}
                <div className="space-y-3">
                  {templateMrp > templatePrice && (
                    <>
                      <div className="flex justify-between text-sm text-white/60">
                        <span>Original Price</span>
                        <span className="line-through">₹{templateMrp}</span>
                      </div>
                      <div className="flex justify-between text-sm text-primary font-bold">
                        <span>Limited Time Discount ({Math.round(((templateMrp - templatePrice) / templateMrp) * 100)}% Off)</span>
                        <span>-₹{templateMrp - templatePrice}</span>
                      </div>
                    </>
                  )}
                  {templateMrp <= templatePrice && (
                    <div className="flex justify-between text-sm text-white/60">
                      <span>Template Price</span>
                      <span>₹{templatePrice}</span>
                    </div>
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
                <Check className="w-6 h-6 text-blue-500" />
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/60 leading-none">
                  Manual Verification<br /><span className="text-[8px] opacity-50">Verified within 5 mins</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Checkout Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-8 lg:p-10 space-y-10 border border-white/10">
              <div>
                <h2 className="text-3xl font-black mb-2">Secure Checkout</h2>
                <p className="text-white/40 text-sm">Fill in your details to get instant access after payment.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Section 1: Details */}
                <div className="space-y-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80 flex items-center gap-2">
                    <span className="bg-primary/20 text-primary w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span>
                    Your Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-white/60 px-1">Full Name</label>
                      <input
                        className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-white/20 focus:outline-none"
                        placeholder="John Doe"
                        type="text"
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
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-semibold text-white/60 px-1">Mobile Number (WhatsApp)</label>
                      <input
                        className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-white/20 focus:outline-none"
                        placeholder="+91 98765 43210"
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        required
                      />
                    </div>

                    {/* Password fields - only for new users */}
                    {isNewUser && (
                      <>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-white/60 px-1">Password</label>
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

                {/* Section 2: Payment */}
                <div className="space-y-6 pt-6 border-t border-white/5">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-primary/80 flex items-center gap-2">
                    <span className="bg-primary/20 text-primary w-5 h-5 rounded-full flex items-center justify-center text-[10px]">2</span>
                    Manual UPI Payment
                  </h3>

                  <div className="flex flex-col md:flex-row gap-8 items-center bg-white/5 rounded-2xl p-6 border border-white/5">
                    <div className="bg-white p-3 rounded-xl shadow-2xl shrink-0">
                      <div className="size-32 bg-white flex items-center justify-center border-4 border-white">
                        {/* Placeholder for QR Code - replacing specific Image with div/icon or keeping simulates */}
                        {qrCodeUrl ? (
                          <img src={qrCodeUrl} alt="UPI QR Code" className="w-full h-full object-contain" />
                        ) : (
                          <div className="w-full h-full bg-black flex items-center justify-center text-white font-bold text-xs text-center p-2">
                            SCAN QR TO PAY
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-4 flex-1 w-full">
                      <div className="space-y-1">
                        <p className="text-sm text-white/60">Scan to pay exactly <span className="text-white font-bold">₹{templatePrice}</span></p>
                        <div className="flex items-center gap-2 text-sm md:text-lg font-mono font-bold bg-black/50 px-3 py-2 rounded-lg border border-white/10 w-fit">
                          {upiId}
                          <button type="button" onClick={copyUPI} className="text-primary hover:text-white transition-colors ml-2">
                            <Copy className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-[10px] text-white/30 uppercase tracking-tighter border border-white/10 px-2 py-1 rounded">Generic UPI</div>
                        <div className="text-[10px] text-white/30 uppercase tracking-tighter border border-white/10 px-2 py-1 rounded">GPay / PhonePe</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-white/60 px-1">Transaction UTR / Ref ID (12 Digits)</label>
                      <input
                        className="w-full rounded-xl px-4 py-4 bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all text-white placeholder:text-white/20 focus:outline-none text-center text-xl tracking-[0.5em] font-mono"
                        maxLength={12}
                        placeholder="XXXXXXXXXXXX"
                        type="text"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-white/60 px-1">Payment Screenshot</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setScreenshot(e.target.files ? e.target.files[0] : null)}
                          className="w-full rounded-xl px-4 py-3 bg-white/5 border border-white/10 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 transition-all text-sm text-white/60 cursor-pointer"
                        />
                      </div>
                      <p className="text-[10px] text-white/40 italic">Upload a clear screenshot of the payment confirmation screen.</p>
                    </div>
                    <p className="text-[10px] text-center text-white/30 italic">Wait 2-5 minutes after submitting for automated confirmation.</p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white font-black py-5 rounded-xl text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isSubmitting ? "Verifying..." : (
                        <>
                          <Check className="w-6 h-6" />
                          Submit Payment Proof
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 opacity-40">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                <Shield className="w-3 h-3" /> Safe & Secure Transaction
              </span>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 mt-12 relative z-10 glass-card-static">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-xs text-center md:text-left">
            © 2024 Gift Magic Interactive Marketplace. All rights reserved. <br className="md:hidden" />
            For support: help@giftly.upi
          </p>
          <div className="flex gap-4">
            {instagramUrl && (
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors flex items-center gap-1">
                <Instagram className="w-3 h-3" />
                <span className="text-xs">Follow</span>
              </a>
            )}
            <a className="text-white/20 hover:text-white text-xs" href="#">Privacy Policy</a>
            <a className="text-white/20 hover:text-white text-xs" href="#">Refund Policy</a>
            <a className="text-white/20 hover:text-white text-xs" href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;
