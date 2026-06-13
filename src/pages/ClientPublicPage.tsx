import { useEffect, useState } from "react";
import { BusinessService, BusinessClient } from "../lib/businessService";
import { Link } from "react-router-dom";
import { Camera, Instagram, ExternalLink, Sparkles, MessageCircle, Heart, Check, Loader2, CreditCard, Shield, AlertTriangle, X } from "lucide-react";
import { motion } from "framer-motion";
import WhatsAppSupport from "../components/WhatsAppSupport";
import confetti from "canvas-confetti";
import { supabase } from "../lib/supabase";

interface ClientPublicPageProps {
    slug: string;
}

function KaviyaCheckoutPage({ slug, biz }: { slug: string; biz: BusinessClient }) {
    const [view, setView] = useState<'landing' | 'select-package' | 'form' | 'processing' | 'success' | 'failed' | 'verifying'>('verifying');
    const [selectedPackage, setSelectedPackage] = useState<{ name: string; price: number; description: string; features: string[] } | null>(null);
    
    // Form fields
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Verification details
    const [verifiedDetails, setVerifiedDetails] = useState<{
        orderId: string;
        amount: number;
        packageName: string;
    } | null>(null);

    const packages = [
        {
            name: "Normal Package",
            price: 300,
            description: "Unlock high-quality standard AR frame experiences.",
            features: [
                "Virtual Experience",
                "1 Custom AR Frame",
                "1 Month Hosting Validity",
                "Standard Setup Support"
            ],
            color: "from-pink-500/10 to-purple-500/10 border-pink-500/20",
            buttonColor: "bg-pink-600 hover:bg-pink-700 shadow-pink-600/20",
            badge: "Popular"
        },
        {
            name: "Live Package",
            price: 1000,
            description: "Ultimate interactive experience with lifetime validity.",
            features: [
                "Live Experience",
                "Unlimited AR Frames",
                "Lifetime Hosting & Support",
                "Priority Admin Setup"
            ],
            color: "from-purple-500/15 via-[#f04299]/15 to-pink-500/15 border-[#f04299]/30",
            buttonColor: "bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 shadow-purple-600/20",
            badge: "Best Value"
        }
    ];

    const previewPhotos = [
        { id: 1, title: "Premium Photo 1" },
        { id: 2, title: "Premium Photo 2" },
        { id: 3, title: "Premium Photo 3" },
        { id: 4, title: "Premium Photo 4" },
        { id: 5, title: "Premium Photo 5" },
        { id: 6, title: "Premium Photo 6" }
    ];

    useEffect(() => {
        const checkPaymentResult = async () => {
            const params = new URLSearchParams(window.location.search);
            const success = params.get('success') === 'true';
            const orderId = params.get('order_id');
            const pkgName = params.get('package');

            if (success && orderId) {
                setView('verifying');
                try {
                    const res = await fetch(`/api/verify-cashfree-order?orderId=${orderId}`);
                    const data = await res.json();
                    
                    if (data && data.order_status === 'PAID') {
                        // Check if we already logged this transaction to avoid duplicates
                        const { data: existing } = await supabase
                            .from('payments')
                            .select('id')
                            .eq('transaction_id', orderId)
                            .maybeSingle();

                        if (!existing) {
                            // Save verified purchase to payments table
                            await supabase.from('payments').insert({
                                user_email: data.customer_details?.customer_email || 'kaviya_customer@giftmagic.beauty',
                                transaction_id: orderId,
                                amount: Number(data.order_amount),
                                status: 'approved',
                                screenshot_url: 'CASHFREE',
                                user_metadata: {
                                    client_slug: 'kaviya',
                                    package_name: pkgName || 'Custom Package',
                                    customer_name: data.customer_details?.customer_name || 'Guest Customer',
                                    customer_phone: data.customer_details?.customer_phone || ''
                                }
                            });
                        }
                        
                        setVerifiedDetails({
                            orderId,
                            amount: Number(data.order_amount),
                            packageName: pkgName || 'Selected Package'
                        });
                        setView('success');
                        
                        // Confetti
                        const duration = 4 * 1000;
                        const end = Date.now() + duration;

                        (function frame() {
                            confetti({
                                particleCount: 5,
                                angle: 60,
                                spread: 55,
                                origin: { x: 0 },
                                colors: ['#f04299', '#a855f7', '#3b82f6']
                            });
                            confetti({
                                particleCount: 5,
                                angle: 120,
                                spread: 55,
                                origin: { x: 1 },
                                colors: ['#f04299', '#a855f7', '#3b82f6']
                            });

                            if (Date.now() < end) {
                                requestAnimationFrame(frame);
                            }
                        }());
                    } else {
                        setView('failed');
                    }
                } catch (err) {
                    console.error("Verification failed:", err);
                    setView('failed');
                }
            } else {
                setView('landing');
            }
        };

        checkPaymentResult();
    }, []);

    const handleSelectPackage = (pkg: typeof packages[0]) => {
        setSelectedPackage(pkg);
        setView('form');
        setErrorMsg("");
    };

    const handleBackToPackages = () => {
        setView('select-package');
        setSelectedPackage(null);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!fullName || !email || !mobile) {
            setErrorMsg("Please fill in all details.");
            return;
        }

        const phoneDigits = mobile.replace(/\D/g, '');
        if (phoneDigits.length < 10) {
            setErrorMsg("Please enter a valid 10-digit mobile number.");
            return;
        }

        setIsSubmitting(true);
        setView('processing');

        try {
            const returnUrl = `${window.location.origin}${window.location.pathname}?success=true&order_id={order_id}&package=${encodeURIComponent(selectedPackage!.name)}`;
            
            const response = await fetch('/api/create-cashfree-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: selectedPackage!.price,
                    customer_id: `guest_${Date.now()}_${phoneDigits.slice(-4)}`,
                    customer_name: fullName,
                    customer_email: email,
                    customer_phone: phoneDigits,
                    order_note: `Kaviya's World - ${selectedPackage!.name}`,
                    return_url: returnUrl
                })
            });

            const orderData = await response.json();
            if (!response.ok) {
                throw new Error(orderData.message || "Failed to create order");
            }

            // Create initial pending record in payments
            await supabase.from('payments').insert({
                user_email: email,
                transaction_id: orderData.order_id,
                amount: selectedPackage!.price,
                status: 'pending',
                user_metadata: {
                    client_slug: 'kaviya',
                    package_name: selectedPackage!.name,
                    customer_name: fullName,
                    customer_phone: phoneDigits
                }
            });

            const mode = import.meta.env.VITE_CASHFREE_MODE === 'production' ? 'production' : 'sandbox';
            
            if (!window.Cashfree) {
                throw new Error("Cashfree SDK not loaded. Please refresh.");
            }
            const cf = window.Cashfree({ mode });
            
            await cf.checkout({
                paymentSessionId: orderData.payment_session_id,
                redirectTarget: '_self'
            });

        } catch (err: any) {
            console.error("Order creation failed:", err);
            setErrorMsg(err.message || "Failed to initiate payment. Please try again.");
            setView('form');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#060309] text-white flex flex-col items-center justify-start p-6 relative overflow-y-auto font-sans w-full">
            {/* Animated Background Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.4, 0.3],
                    x: [-20, 20, -20],
                    y: [-20, 20, -20]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#f04299]/15 blur-3xl rounded-full pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.3, 0.2],
                    x: [30, -30, 30],
                    y: [10, -10, 10]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full pointer-events-none"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060309]/80 to-[#060309] pointer-events-none"></div>

            {/* Floating Hearts Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: '110vh', x: `${Math.random() * 100}vw`, scale: Math.random() * 0.5 + 0.4 }}
                  animate={{ opacity: [0, 0.7, 0], y: '-10vh' }}
                  transition={{ duration: Math.random() * 5 + 6, repeat: Infinity, delay: Math.random() * 4, ease: "linear" }}
                  className="absolute text-pink-500"
                >
                  <Heart className="w-6 h-6 fill-pink-500/30" />
                </motion.div>
              ))}
            </div>

            <div className="max-w-md w-full text-center space-y-6 z-10 py-6">
                {/* 18+ Only Warning Header */}
                {(view === 'landing' || view === 'select-package' || view === 'form') && (
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mx-auto inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 px-4 py-1.5 rounded-full text-xs font-black text-red-500 tracking-wider uppercase shadow-lg shadow-red-500/5"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        🔞 18+ Only
                    </motion.div>
                )}

                {/* Header (Shows for landing, selector and form view) */}
                {(view === 'landing' || view === 'select-package' || view === 'form') && (
                    <div className="space-y-4">
                        {/* Logo Frame */}
                        {biz.logo_url && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5, type: 'spring' }}
                                className="mx-auto p-1.5 bg-gradient-to-tr from-[#f04299] via-purple-500 to-pink-500 rounded-3xl w-24 h-24 flex items-center justify-center shadow-xl shadow-purple-500/20 relative"
                            >
                                <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-md"></div>
                                <img
                                    src={biz.logo_url}
                                    alt={biz.business_name}
                                    className="h-full w-full object-contain rounded-[22px] bg-black/40 z-10"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </motion.div>
                        )}
                        <motion.h1
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-5xl font-black tracking-tight bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent"
                        >
                            Kaviya's World
                        </motion.h1>
                        <p className="text-sm text-white/60">Unlock premium digital memories and augmented reality experiences.</p>
                    </div>
                )}

                {/* View 1: Verifying */}
                {view === 'verifying' && (
                    <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6 flex flex-col items-center my-auto">
                        <Loader2 className="w-12 h-12 text-[#f04299] animate-spin" />
                        <h2 className="text-xl font-bold">Verifying Payment...</h2>
                        <p className="text-sm text-white/40">Please wait while we confirm your transaction with Cashfree secure servers.</p>
                    </div>
                )}

                {/* View 2: Landing Page (Buy Packages Button + Locked Grid) */}
                {view === 'landing' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        {/* Big Buy CTA Button */}
                        <button
                            onClick={() => setView('select-package')}
                            className="w-full bg-gradient-to-r from-[#f04299] via-purple-500 to-[#f04299] text-white font-black text-xl py-5 rounded-2xl shadow-xl shadow-purple-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 animate-pulse"
                        >
                            🔑 Buy Packages / Unlock All
                        </button>

                        {/* Gallery Section */}
                        <div className="space-y-4 text-left">
                            <h3 className="text-sm font-black uppercase tracking-wider text-[#f04299] border-b border-white/5 pb-2">
                                Premium Previews ({previewPhotos.length})
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                {previewPhotos.map((photo) => (
                                    <div 
                                        key={photo.id} 
                                        className="aspect-[3/4] relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-pink-900/10 via-purple-900/10 to-black flex flex-col items-center justify-center p-4 text-center group cursor-pointer hover:border-[#f04299]/30 transition-colors"
                                        onClick={() => setView('select-package')}
                                    >
                                        {/* Blurred Abstract Background */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/5 via-purple-500/5 to-transparent blur-md group-hover:scale-110 transition-transform" />
                                        
                                        {/* Glow Padlock Circle */}
                                        <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-[#f04299] shadow-lg shadow-black/50 group-hover:scale-110 transition-transform mb-3 z-10">
                                            <span className="text-xl">🔒</span>
                                        </div>
                                        
                                        <span className="text-[10px] font-black uppercase tracking-wider text-white/40 group-hover:text-white/60 transition-colors z-10">
                                            Preview Locked
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* View 3: Select Package Overlay (Modal style) */}
                {view === 'select-package' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-6 rounded-3xl border border-white/10 text-left space-y-6 relative"
                    >
                        <button 
                            onClick={() => setView('landing')}
                            className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="border-b border-white/5 pb-3">
                            <h3 className="text-2xl font-black">Choose Package</h3>
                            <p className="text-xs text-white/40">Select a package to unlock digital content.</p>
                        </div>

                        <div className="space-y-4">
                            {packages.map((pkg) => (
                                <div 
                                    key={pkg.name}
                                    className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col justify-between gap-4"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-[10px] bg-[#f04299]/10 border border-[#f04299]/20 px-2 py-0.5 rounded-full font-bold text-[#f04299] uppercase tracking-wider">
                                                {pkg.badge}
                                            </span>
                                            <h4 className="text-xl font-bold mt-1.5">{pkg.name}</h4>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-black text-white">₹{pkg.price}</span>
                                            <p className="text-[9px] text-white/40">One-time</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5 text-xs text-white/80">
                                        {pkg.features.map(f => (
                                            <div key={f} className="flex items-center gap-2">
                                                <Check className="w-3.5 h-3.5 text-[#f04299]" />
                                                <span className={f === "Virtual Experience" || f === "Live Experience" ? "font-bold text-white" : ""}>
                                                    {f}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => handleSelectPackage(pkg)}
                                        className={`w-full py-3 rounded-xl font-black text-xs text-white shadow-md transition-all ${pkg.buttonColor}`}
                                    >
                                        Select {pkg.name}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* View 4: Form */}
                {view === 'form' && selectedPackage && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-6 rounded-3xl border border-white/10 text-left space-y-6"
                    >
                        <div className="flex justify-between items-center border-b border-white/5 pb-4">
                            <div>
                                <h3 className="text-lg font-bold">Checkout</h3>
                                <p className="text-xs text-white/40">{selectedPackage.name}</p>
                            </div>
                            <div className="text-right">
                                <span className="text-xl font-black text-[#f04299]">₹{selectedPackage.price}</span>
                            </div>
                        </div>

                        {errorMsg && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-xl text-xs flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-white/40 tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f04299]/50 transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-white/40 tracking-wider">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f04299]/50 transition-colors"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-white/40 tracking-wider">WhatsApp Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="e.g. 9876543210"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#f04299]/50 transition-colors"
                                />
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={handleBackToPackages}
                                    className="flex-1 bg-white/5 border border-white/10 py-4 rounded-xl text-xs font-bold hover:bg-white/10 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-[2] bg-gradient-to-r from-pink-600 to-purple-600 font-black text-xs py-4 rounded-xl shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Proceed to Pay"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* View 5: Processing */}
                {view === 'processing' && (
                    <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6 flex flex-col items-center">
                        <Loader2 className="w-12 h-12 text-[#f04299] animate-spin" />
                        <h2 className="text-xl font-bold">Connecting Gateway...</h2>
                        <p className="text-sm text-white/40">Opening secure Cashfree payment page. Please do not close or reload.</p>
                    </div>
                )}

                {/* View 6: Success */}
                {view === 'success' && verifiedDetails && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-8 rounded-3xl border border-emerald-500/20 bg-emerald-950/5 space-y-6 flex flex-col items-center text-center my-auto"
                    >
                        <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                            <Check className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-emerald-400">Payment Successful!</h2>
                            <p className="text-sm text-white/60">Thank you for your purchase.</p>
                        </div>

                        <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-left space-y-2 text-xs">
                            <div className="flex justify-between">
                                <span className="text-white/40">Package:</span>
                                <span className="font-bold">{verifiedDetails.packageName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/40">Amount Paid:</span>
                                <span className="font-bold text-[#f04299]">₹{verifiedDetails.amount}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/40">Order ID:</span>
                                <span className="font-mono text-white/60">{verifiedDetails.orderId}</span>
                            </div>
                        </div>

                        <p className="text-[10px] text-white/40 italic">
                            Your payment has been logged successfully. Kaviya will be notified and will contact you shortly to activate your digital magic frame features!
                        </p>

                        <button
                            onClick={() => {
                                window.history.replaceState({}, document.title, window.location.pathname);
                                setView('landing');
                            }}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 py-4 rounded-xl font-black text-xs text-white transition-colors"
                        >
                            Back to Packages
                        </button>
                    </motion.div>
                )}

                {/* View 7: Failed */}
                {view === 'failed' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-8 rounded-3xl border border-red-500/20 bg-red-950/5 space-y-6 flex flex-col items-center text-center my-auto"
                    >
                        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center text-red-400">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-red-400">Payment Failed</h2>
                            <p className="text-sm text-white/60">The payment verification failed or the order was cancelled.</p>
                        </div>

                        <button
                            onClick={() => {
                                window.history.replaceState({}, document.title, window.location.pathname);
                                setView('landing');
                            }}
                            className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl font-black text-xs text-white transition-colors"
                        >
                            Try Again
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default function ClientPublicPage({ slug }: ClientPublicPageProps) {
    const [biz, setBiz] = useState<BusinessClient | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const urlAlbumId = new URLSearchParams(window.location.search).get('albumId');

    useEffect(() => {
        const fetchBiz = async () => {
            try {
                const data = await BusinessService.getBusinessByIdentifier(slug);
                setBiz(data);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBiz();
    }, [slug]);

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-sans">Loading Portal...</div>;
    if (!biz || !biz.is_active) return <div className="min-h-screen bg-black flex items-center justify-center text-white font-sans">Portfolio Suspended or Not Found.</div>;

    if (slug.toLowerCase() === 'kaviya') {
        return <KaviyaCheckoutPage slug={slug} biz={biz} />;
    }

    return (
        <div className="min-h-screen bg-[#060309] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Animated Background Orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.4, 0.3],
                    x: [-20, 20, -20],
                    y: [-20, 20, -20]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#f04299]/15 blur-3xl rounded-full"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.3, 0.2],
                    x: [30, -30, 30],
                    y: [10, -10, 10]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 blur-3xl rounded-full"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#060309]/80 to-[#060309]"></div>

            {/* Floating Hearts Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: '110vh', x: `${Math.random() * 100}vw`, scale: Math.random() * 0.5 + 0.4 }}
                  animate={{ opacity: [0, 0.7, 0], y: '-10vh' }}
                  transition={{ duration: Math.random() * 5 + 6, repeat: Infinity, delay: Math.random() * 4, ease: "linear" }}
                  className="absolute text-pink-500"
                >
                  <Heart className="w-6 h-6 fill-pink-500/30" />
                </motion.div>
              ))}
            </div>

            <div className="max-w-md w-full text-center space-y-6 z-10">
                {/* Tagline Above Logo */}
                <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-lg text-primary italic font-accent mb-4 tracking-wide"
                >
                    Relive Your Memories with Digital Magic
                </motion.p>

                {/* Logo Frame */}
                {biz.logo_url && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, type: 'spring' }}
                        className="mx-auto p-1.5 bg-gradient-to-tr from-[#f04299] via-purple-500 to-primary rounded-3xl w-28 h-28 flex items-center justify-center shadow-xl shadow-primary/20 relative"
                    >
                        <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-md"></div>
                        <img
                            src={biz.logo_url}
                            alt={biz.business_name}
                            className="h-full w-full object-contain rounded-[22px] bg-black/40 z-10"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </motion.div>
                )}

                <div className="space-y-3">
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-black tracking-tight"
                    >
                        {biz.business_name}
                    </motion.h1>

                    {biz.instagram_id && (
                        <motion.div
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <a
                                href={`https://instagram.com/${biz.instagram_id.replace('@', '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-white/90 bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-all hover:scale-105 shadow-md shadow-black/30"
                            >
                                <Instagram className="w-3.5 h-3.5 text-[#f04299]" />
                                {biz.instagram_id}
                                <ExternalLink className="w-2.5 h-2.5 opacity-40 ml-0.5" />
                            </a>
                        </motion.div>
                    )}

                    {(biz as any).whatsapp_number && (
                        <motion.div
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.35 }}
                        >
                            <a
                                href={`https://wa.me/${(biz as any).whatsapp_number.replace('+', '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-white/90 bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-full hover:bg-green-500/20 transition-all hover:scale-105 shadow-md shadow-black/30"
                            >
                                <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                                Chat on WhatsApp
                                <ExternalLink className="w-2.5 h-2.5 opacity-40 ml-0.5" />
                            </a>
                        </motion.div>
                    )}
                </div>

                {/* Scan Link */}
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl mt-6 shadow-xl"
                >
                    <Link
                        to={urlAlbumId ? `/scan?albumId=${urlAlbumId}` : "/scan"}
                        className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-[#f04299] to-primary text-white font-black text-xl py-6 px-4 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <Camera className="w-6 h-6 animate-pulse" />
                        Scan Magic Frame
                    </Link>
                </motion.div>

                {/* Conditional Footer */}
                {!biz.custom_domain && (
                    <div className="flex flex-col items-center gap-1 mt-6 opacity-30 hover:opacity-100 transition-opacity cursor-default group">
                        <p className="text-[9px] text-white font-medium flex items-center gap-1.5 grayscale group-hover:grayscale-0 transition-all">
                            Safe & Encrypted // GiftMagic AR
                        </p>
                        <button 
                            onClick={() => window.open('https://wa.me/918610381533?text=Hi%20Axosoul,%20I%20am%20interested%20in%20GiftMagic%20AR%20Platform', '_blank')}
                            className="text-[8px] text-primary/80 font-bold uppercase tracking-tighter flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
                        >
                            Powered by Axosoul <MessageCircle className="w-2.5 h-2.5" />
                        </button>
                    </div>
                )}

                {biz.show_frames_preview && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-12 space-y-4"
                    >
                        <div className="border-t border-white/5 pt-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#f04299] flex items-center justify-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Our Frame Designs</h3>
                            <p className="text-xs text-secondary mt-0.5">Exclusive collections waiting for your moments</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {['Classic Wood', 'Digital Art', 'Neon Glow', 'Vintage Glass'].map((design) => (
                                <div key={design} className="aspect-[4/3] bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center text-xs font-bold text-white/40 border border-white/5 hover:border-[#f04299]/30 transition-colors hover:bg-white/10 cursor-pointer">
                                    {design}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
            {/* Floating Corner WhatsApp */}
            {(biz as any)?.whatsapp_number && (
                <WhatsAppSupport 
                    phoneNumber={(biz as any).whatsapp_number} 
                    message={`Hi ${biz.business_name}, I am interested in your services!`} 
                />
            )}
        </div>
    );
}
