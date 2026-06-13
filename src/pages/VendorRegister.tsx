import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Mail, Lock, Sparkles, ArrowRight, Eye, EyeOff, Building, Phone, Instagram, CheckCircle2, CreditCard } from "lucide-react";
import FloatingHearts from "../components/landing/FloatingHearts";
import { supabase } from "../lib/supabase";
import { useToast } from "../hooks/use-toast";
import Logo from "../components/Logo";

const PACKAGES = [
  { id: 'starter', name: 'Starter Kit', price: 299, features: ['600 Magic Frames', 'Standard Support', '28 Days Validity'] },
  { id: 'pro', name: 'Professional', price: 799, features: ['1500 Magic Frames', 'Priority Support', '1 Year Validity'] },
  { id: 'enterprise', name: 'Enterprise', price: 4999, features: ['Unlimited Frames', 'Dedicated Support', 'Lifetime Validity'] },
];

const VendorRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(PACKAGES[0]);
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    instagram: "",
    password: "",
  });

  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{status: 'success'|'failed'|null, message: string}>({ status: null, message: '' });

  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const { toast } = useToast();

  useEffect(() => {
    const pkg = searchParams.get('package');
    if (pkg) {
      if (pkg === '4999') {
        const text = `Hello Giftmagic! I am interested in the ₹4999 Enterprise package. Please help me get started!`;
        window.location.href = `https://wa.me/918610381533?text=${encodeURIComponent(text)}`;
        return;
      }
      const selected = PACKAGES.find(p => p.price.toString() === pkg || p.id === pkg);
      if (selected) {
        setSelectedPackage(selected);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Check for return from payment
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('order_id');
    const requestId = urlParams.get('request_id');
    if (orderId && requestId) {
      setIsVerifyingPayment(true);
      handlePostPayment(orderId, requestId);
    }
  }, []);

  const handlePostPayment = async (orderId: string, requestId: string) => {
    try {
      console.log("Verifying payment for order:", orderId);
      const resp = await fetch(`/api/verify-cashfree-order?orderId=${orderId}`);
      
      if (!resp.ok) {
        throw new Error(`Verification service returned ${resp.status}`);
      }
      
      const statusData = await resp.json();
      console.log("Payment status response:", statusData);

      if (statusData.order_status === 'PAID') {
        setPaymentResult({ status: 'success', message: 'Payment confirmed! Preparing your dashboard...' });
        const { data, error } = await supabase.rpc('approve_business_request', {
          p_request_id: requestId
        });
        
        if (error) throw error;
        
        // The updated RPC returns JSONB with the slug
        const slug = data?.business_slug || data?.[0]?.business_slug;
        
        if (slug) {
          // AUTO-LOGIN: Set auth in localStorage
          localStorage.setItem(`client_auth_${slug}`, 'true');
          toast({ title: "Welcome Aboard!", description: "Your account is activated. Redirecting to your dashboard..." });
          
          // Redirect to dynamic dashboard
          const isLocal = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1');
          if (isLocal) {
            // Use current port and hostname correctly
            const port = window.location.port ? `:${window.location.port}` : '';
            window.location.href = `${window.location.protocol}//${slug}.localhost${port}/dashboard`;
          } else {
            window.location.href = `https://${slug}.giftmagic.beauty/dashboard`;
          }
        } else {
          toast({ title: "Account Activated!", description: "You can now log in to your dashboard." });
          navigate("/login");
        }
      } else {
        const msg = statusData.order_status === 'FAILED' ? "Your payment failed. Please try again." : 
                   statusData.order_status === 'CANCELLED' ? "Payment was cancelled." : 
                   statusData.order_status === 'EXPIRED' ? "The payment session expired. Please register again." :
                   "Your payment is pending; please try logging in after some time.";
        setPaymentResult({ status: 'failed', message: msg });
        toast({ title: "Payment Status", description: msg, variant: "destructive" });
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setPaymentResult({ status: 'failed', message: error.message });
      toast({ title: "Verification Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsLoading(true);

    try {
      // 1. Create Registration Request
      const { data: request, error } = await supabase
        .from('business_registration_requests')
        .insert({
          business_name: formData.businessName,
          email: formData.email,
          whatsapp_number: formData.phone,
          instagram_id: formData.instagram,
          password_plain: formData.password,
          package_name: selectedPackage.name,
          package_price: selectedPackage.price,
          status: 'pending',
          payment_status: 'PENDING'
        })
        .select()
        .single();

      if (error) throw error;

      // 2. Create Cashfree Order
      const safePhone = formData.phone.replace(/[^0-9]/g, '').substring(0, 10) || '9999999999';
      const orderRes = await fetch('/api/create-cashfree-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: selectedPackage.price,
          customer_id: formData.email.replace(/[^a-zA-Z0-9]/g, '_'),
          customer_email: formData.email,
          customer_phone: safePhone,
          return_url: `${window.location.origin}/vendor-register?request_id=${request.id}&order_id={order_id}`
        })
      });

      const orderData = await orderRes.json();
      
      if (orderData.payment_session_id) {
        // Update request with cf_order_id
        await supabase
          .from('business_registration_requests')
          .update({ cf_order_id: orderData.order_id })
          .eq('id', request.id);

        if (!(window as any).Cashfree) {
          throw new Error("Cashfree SDK not loaded. Please refresh.");
        }
        const mode = orderData.checkout_base?.includes('sandbox') ? 'sandbox' : 'production';
        const cf = (window as any).Cashfree({ mode });
        cf.checkout({
          paymentSessionId: orderData.payment_session_id,
          redirectTarget: '_self'
        });
      } else {
        throw new Error("Payment initialization failed");
      }
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a060a] relative overflow-hidden flex items-center justify-center py-16 font-outfit">
      <FloatingHearts />

      {/* Background glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full animate-pulse pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[150px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute inset-0 grid-paper-bg opacity-10" />

      <div className="relative z-10 w-full max-w-4xl px-6">
        {/* Logo */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="flex justify-center mb-10"
        >
          <Logo iconSize="h-16 w-16" textSize="text-3xl" />
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-xl"
        >
          {isVerifyingPayment ? (
            <div className="text-center py-12 space-y-6">
              {!paymentResult.status ? (
                <>
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <h2 className="text-2xl font-black text-white">Verifying Transaction</h2>
                  <p className="text-white/40">Please do not refresh or close this window.</p>
                </>
              ) : paymentResult.status === 'success' ? (
                <>
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-white">Payment Confirmed!</h2>
                  <p className="text-white/60">{paymentResult.message}</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-white">Verification Failed</h2>
                  <p className="text-white/60 mb-6">{paymentResult.message}</p>
                  <button onClick={() => navigate('/login')} className="bg-white/5 border border-white/10 px-8 py-3 rounded-xl hover:bg-white/10 transition-colors">
                    Go to Login
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
                  {step === 1 ? "Business Registration" : "Select Your Package"}
                </h1>
                <p className="text-muted-foreground font-medium italic">
                  {step === 1 ? "Partner with the most magical AR gift network" : "Choose a plan that fits your studio"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 ? (
                  <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-1">Business Identity</label>
                  <div className="relative group">
                    <Building className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="e.g. Magic Frames Studio"
                      className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Business Email</label>
                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="studio@email.com"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">WhatsApp No.</label>
                    <div className="relative group">
                      <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-white transition-colors" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 00000 00000"
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-primary/80 ml-1">Security</label>
                  <div className="relative group">
                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter Secure Password"
                      className="w-full pl-14 pr-14 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-primary/50 transition-all font-medium"
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
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PACKAGES.map((pkg) => (
                  <label 
                    key={pkg.id} 
                    className={`relative cursor-pointer transition-all duration-300 group ${
                      selectedPackage.id === pkg.id ? 'scale-105' : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-90'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="package" 
                      className="hidden" 
                      onClick={() => setSelectedPackage(pkg)} 
                    />
                    <div className={`p-6 rounded-3xl border-2 h-full flex flex-col ${
                      selectedPackage.id === pkg.id ? 'bg-primary/10 border-primary shadow-xl shadow-primary/20' : 'bg-white/5 border-white/5'
                    }`}>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-black text-sm uppercase tracking-widest text-white/80">{pkg.name}</h3>
                        {selectedPackage.id === pkg.id && <CheckCircle2 className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="mb-6">
                        <span className="text-4xl font-black text-white">₹{pkg.price}</span>
                        <span className="text-[10px] text-white/40 block mt-1 uppercase">One-time payment</span>
                      </div>
                      <ul className="space-y-3 flex-grow">
                        {pkg.features.map((f, i) => (
                          <li key={i} className="text-[11px] font-medium text-white/60 flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </label>
                ))}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 pt-4">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-8 h-16 rounded-2xl border border-white/10 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors"
                >
                  Back
                </button>
              )}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 gradient-primary h-16 rounded-2xl text-white font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isLoading ? "Processing..." : (step === 1 ? "Review Packages" : `Continue to Payment`)}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-white/5 pt-8">
            <p className="text-sm font-medium text-muted-foreground">
              Already a partner?{" "}
              <Link to="/login" className="text-primary font-black uppercase tracking-widest hover:text-white transition-colors ml-2">
                Vendor Login hub
              </Link>
            </p>
          </div>
          </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VendorRegister;
