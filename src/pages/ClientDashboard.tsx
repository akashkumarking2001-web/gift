import { useEffect, useState } from "react";
import { BusinessService, BusinessClient, UpgradeRequest } from "../lib/businessService";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "../hooks/use-toast";
import { LogOut, Rocket, Check, AlertTriangle, CloudUpload, Eye, EyeOff, Menu, X, CreditCard, Sparkles, FolderHeart, User } from "lucide-react";
import ARUpload from "../components/admin/ARUpload";
import { SettingsService } from "../lib/settings";
import { supabase } from "../lib/supabase";
import { uploadFileToR2 } from "../lib/r2Client";

interface ClientDashboardProps {
    slug: string;
}

// const SUBSCRIPTION_DAYS = 28; // Now dynamic based on package

export default function ClientDashboard({ slug }: ClientDashboardProps) {
    const [biz, setBiz] = useState<BusinessClient | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [upgradeReqs, setUpgradeReqs] = useState<UpgradeRequest[]>([]);
    const [paymentSettings, setPaymentSettings] = useState<any>({ upi_id: '', qr_code_url: '' });
    const { toast } = useToast();
    const navigate = useNavigate();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'magic_frame' | 'upgrade' | 'profile'>('dashboard');

    // Upgrade Form State
    const [reqPackage, setReqPackage] = useState<'299' | '799' | '4999'>('799');
    const [txNum, setTxNum] = useState("");
    const [ssUrl, setSsUrl] = useState("");

    useEffect(() => {
        const auth = localStorage.getItem(`client_auth_${slug}`);
        if (!auth) {
            navigate("/login");
            return;
        }

        const fetchBiz = async () => {
            try {
                const refreshed = await BusinessService.getBusinessByIdentifier(slug);
                if (refreshed) {
                    setBiz(refreshed);
                    const settings = await SettingsService.getSettings();
                    setPaymentSettings(settings);
                } else {
                    toast({ title: "Error", description: "Business account not found.", variant: "destructive" });
                    navigate("/login");
                }
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBiz();
    }, [slug, navigate]);

    const handleLogout = () => {
        localStorage.removeItem(`client_auth_${slug}`);
        navigate("/login");
    };

    const handleTogglePreview = async () => {
        if (!biz) return;
        try {
            const newVal = !biz.show_frames_preview;
            await BusinessService.toggleShowFramesPreview(biz.id, newVal);
            setBiz({ ...biz, show_frames_preview: newVal });
            toast({ title: "Success", description: `Frame Previews ${newVal ? 'Enabled' : 'Disabled'}` });
        } catch (error) {
            toast({ title: "Error", description: "Operation failed.", variant: "destructive" });
        }
    };

    const handleUpgradeSubmit = async (e: any) => {
        e.preventDefault();
        if (!biz) return;
        if (!txNum) {
            toast({ title: "Error", description: "Transaction Number is required.", variant: "destructive" });
            return;
        }

        try {
            await BusinessService.submitUpgradeRequest({
                client_id: biz.id,
                current_package: biz.package_type,
                requested_package: reqPackage,
                transaction_number: txNum,
                screenshot_url: ssUrl
            });
            toast({ title: "Success", description: "Upgrade request submitted! Awaiting admin approval." });
            setTxNum("");
            setSsUrl("");
            setActiveTab('dashboard');
        } catch (error: any) {
            toast({ title: "Error", description: error.message || "Failed to submit request.", variant: "destructive" });
        }
    };

    if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Dashboard...</div>;
    if (!biz) return <div className="min-h-screen bg-black flex items-center justify-center text-white">No active session.</div>;

    const frameLeft = biz.frame_limit === 999999 ? 'Unlimited' : biz.frame_limit - biz.frames_used;

    // Dynamic Subscription Logic
    const nextRenewalDate = biz.next_renewal_date ? new Date(biz.next_renewal_date) : null;
    const now = new Date();
    
    let daysRemainingCount = 0;
    if (nextRenewalDate && !isNaN(nextRenewalDate.getTime())) {
        const diffTime = nextRenewalDate.getTime() - now.getTime();
        daysRemainingCount = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    }
    
    // Package 4999 is Lifetime
    const isLifetime = biz.package_type === '4999';
    const isExpired = !isLifetime && (daysRemainingCount <= 0 || !biz.is_active);
    const daysRemaining = isLifetime ? "Lifetime" : (daysRemainingCount > 0 ? `${daysRemainingCount} Days` : "Expired");

    return (
        <div className="min-h-screen bg-[#0a060a] text-white font-sans flex overflow-hidden">
            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-40 md:hidden" />
            )}

            {/* Sidebar */}
            <aside className={`w-64 bg-[#0f090d] border-r border-white/5 flex flex-col fixed h-full z-50 transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="p-6 flex flex-col h-full">
                    <div className="flex flex-col text-center relative">
                        {/* Close button for mobile inside sidebar */}
                        <button onClick={() => setIsSidebarOpen(false)} className="absolute right-0 top-0 text-white/40 hover:text-white md:hidden p-2"><X className="w-5 h-5" /></button>
                        {biz.logo_url && (
                            <img src={biz.logo_url} className="h-12 w-12 mx-auto mb-2 object-contain rounded-xl" alt="Logo" />
                        )}
                        <span className="text-xl font-black gradient-text">{biz.business_name}</span>
                        <span className="text-[10px] text-white/40">{biz.custom_domain || `${slug}.giftmagic.beauty`}</span>
                    </div>

                    <nav className="flex-1 mt-8 space-y-1">
                        <div className="px-4 py-2 text-[10px] font-bold text-white/40 uppercase tracking-widest border-t border-white/5 pt-4">Workspace</div>
                        <Link to="/" className="w-full flex items-center gap-3 px-6 py-3 text-sm font-medium hover:bg-white/5 text-white/60 hover:text-white">
                            <Eye className="w-4 h-4" /> View Public Page
                        </Link>

                        <div className="px-4 py-2 text-[10px] font-bold text-white/40 uppercase tracking-widest border-t border-white/5 pt-4 mt-2">Navigation</div>
                        <button
                            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            <Sparkles className="w-4 h-4" /> Dashboard Stats
                        </button>
                        <button
                            onClick={() => { setActiveTab('magic_frame'); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'magic_frame' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            <FolderHeart className="w-4 h-4" /> Magic Frame
                        </button>
                        <button
                            onClick={() => { setActiveTab('upgrade'); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'upgrade' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            <Rocket className="w-4 h-4" /> Upgrade Subscription
                        </button>
                        <button
                            onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            <User className="w-4 h-4" /> Edit Profile
                        </button>
                    </nav>

                    <div className="border-t border-white/5 pt-4">
                        <button onClick={handleLogout} className="w-full flex items-center gap-2 justify-center text-red-500 bg-red-500/10 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all text-sm font-bold">
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                {isExpired ? (
                    <div className="max-w-xl mx-auto mt-20 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500 border border-red-500/20 shadow-lg shadow-red-500/10">
                            <AlertTriangle className="w-12 h-12" />
                        </div>
                        <div className="space-y-2">
                             <h2 className="text-4xl font-black gradient-text">Subscription Expired</h2>
                             <p className="text-white/60 font-medium">Your subscription access has ended. Please renew to continue using GiftMagic AR.</p>
                        </div>
                        
                        <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6 text-left">
                            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                <span className="text-white/40 text-xs font-bold uppercase">Total Frames Used</span>
                                <span className="text-xl font-black text-white">{biz.lifetime_frames_count} / {biz.frame_limit}</span>
                            </div>
                            
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-primary uppercase flex items-center gap-2"><CreditCard className="w-4 h-4" /> Renew via UPI</p>
                                <div className="bg-white p-4 rounded-2xl inline-block mx-auto flex flex-col items-center">
                                    {paymentSettings.qr_code_url ? (
                                        <img src={paymentSettings.qr_code_url} className="w-48 h-48 object-contain" alt="QR Code" />
                                    ) : (
                                       <div className="w-48 h-48 bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold">QR Code Not Set</div>
                                    )}
                                    <p className="text-black font-black mt-2 text-sm">{paymentSettings.upi_id}</p>
                                </div>
                                <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl text-center">
                                   <p className="text-[10px] text-white/40 uppercase font-black">Renewal Amount</p>
                                   <p className="text-2xl font-black text-primary">₹{biz.custom_package_price || biz.package_type}</p>
                                </div>
                                <p className="text-[10px] text-center text-white/40 italic">After payment, send your transaction screenshot to the admin for manual activation.</p>
                            </div>
                        </div>
                        
                        <button onClick={handleLogout} className="text-sm font-bold text-white/40 hover:text-white transition-colors">
                            Sign out of this session
                        </button>
                    </div>
                ) : (
                    <>
                        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white/5 border border-white/10 rounded-2xl md:hidden text-white hover:bg-white/10 transition-colors">
                            <Menu className="w-6 h-6" />
                        </button>
                        <div>
                            <h1 className="text-4xl font-black tracking-tight">{activeTab === 'dashboard' ? 'Overview' : activeTab.replace('_', ' ')}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">System Status: <span className="text-green-500">Operational</span></p>
                            </div>
                        </div>
                    </div>
                    {activeTab === 'dashboard' && (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleTogglePreview}
                                className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl border border-white/10 ${biz.show_frames_preview ? 'bg-primary text-white border-primary' : 'bg-white/5 text-white/60'}`}
                            >
                                {biz.show_frames_preview ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                Previews: {biz.show_frames_preview ? 'Visible' : 'Hidden'}
                            </button>
                        </div>
                    )}
                </header>

                {activeTab === 'dashboard' && (
                    <div className="max-w-xl mx-auto space-y-6">
                        {/* Subscription Stats Card */}
                        <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-6">
                            <div>
                                <span className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Pricing Plan</span>
                                 <h2 className="text-4xl font-black mt-1 gradient-text">
                                    ₹{biz.custom_package_price || biz.package_type}
                                    <span className="text-sm text-white/40"> {(biz.package_type === '799' || biz.package_type === 'pro') ? '/ Year' : (biz.package_type === '4999' || biz.package_type === 'enterprise') ? '/ Lifetime' : '/ Month'}</span>
                                </h2>
                                <p className="text-xs text-secondary mt-1 flex items-center gap-2 font-bold">
                                    <Sparkles className="w-3 h-3" /> Next Renewal: {new Date(biz.next_renewal_date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>

                            <div className="bg-white/5 rounded-2xl border border-white/5 p-4 grid grid-cols-2 gap-4">
                                <div className="text-center p-3">
                                    <span className="text-[10px] text-white/40 font-bold uppercase">Remaining Days</span>
                                    <p className="text-2xl font-black text-primary mt-1">{daysRemaining}</p>
                                </div>
                                <div className="text-center p-3 border-l border-white/5">
                                    <span className="text-[10px] text-white/40 font-bold uppercase">Remaining Frames</span>
                                    <p className="text-2xl font-black text-emerald-400 mt-1">{frameLeft}</p>
                                </div>
                            </div>

                            <button onClick={() => setActiveTab('upgrade')} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                                <Rocket className="w-4 h-4" /> Manage / Upgrade Plan
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'upgrade' && (
                    <div className="max-w-4xl mx-auto space-y-6">
                        <h3 className="text-2xl font-black mb-4 flex items-center justify-center gap-2"><Rocket className="w-6 h-6 text-primary" /> Upgrade Subscription</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { pkg: '299', title: 'Basic Pack', frames: '600 Magic Frames', duration: 'month' },
                                { pkg: '799', title: 'Standard Pack', frames: '1500 Magic Frames', duration: 'year' },
                                { pkg: '4999', title: 'Premium Website', frames: 'Own Website + Unlimited', duration: 'lifetime' }
                            ].map((card) => {
                                const isCurrent = biz.package_type === card.pkg;
                                const isSelected = reqPackage === card.pkg;

                                return (
                                    <div
                                        key={card.pkg}
                                        onClick={() => card.pkg !== '4999' && setReqPackage(card.pkg as any)}
                                        className={`glass-card p-6 rounded-3xl border border-white/10 flex flex-col justify-between items-center text-center cursor-pointer transition-all ${isCurrent ? 'border-green-500/30 bg-green-500/5' : isSelected && card.pkg !== '4999' ? 'border-primary/50 bg-primary/5 scale-[1.03]' : 'hover:border-white/20'}`}
                                    >
                                        <div className="space-y-2">
                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-1 py-0.5 rounded ${isCurrent ? 'bg-green-500/20 text-green-500' : 'text-white/40'}`}>
                                                {isCurrent ? 'Current Plan' : 'Options'}
                                            </span>
                                            <h4 className="text-xl font-bold mt-2">{card.title}</h4>
                                            <p className="text-3xl font-black gradient-text">₹{card.pkg}<span className="text-xs text-white/40">/{(card as any).duration}</span></p>
                                            <p className="text-xs text-secondary mt-1 font-bold">{card.frames}</p>
                                        </div>

                                        {card.pkg === '4999' ? (
                                            <button
                                                onClick={() => {
                                                    const text = `Hello Admin! I would like to upgrade my Dashboard ${biz.business_name} to the ₹4999 Premium website layout with Unlimited frames! Slug: ${biz.business_slug}`;
                                                    const url = `https://wa.me/${paymentSettings.admin_whatsapp || '91XXXXXXXXXX'}?text=${encodeURIComponent(text)}`;
                                                    window.open(url, '_blank');
                                                }}
                                                className="w-full mt-6 gradient-primary text-white font-bold py-3 rounded-xl hover:scale-[1.02] flex items-center justify-center gap-2"
                                            >
                                                 Chat with Admin
                                            </button>
                                        ) : !isCurrent && (
                                            <button
                                                className={`w-full mt-6 py-3 rounded-xl font-bold text-xs transition-colors ${isSelected ? 'bg-primary text-white' : 'bg-white/5 text-white/60 border border-white/10'}`}
                                            >
                                                {isSelected ? 'Selected' : 'Upgrade'}
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {reqPackage !== '4999' && biz.package_type !== reqPackage && (
                            <div className="glass-card p-6 rounded-3xl border border-white/10 max-w-md mx-auto space-y-4">
                                <div className="p-4 bg-white/[0.02] rounded-xl border border-white/5 text-center space-y-2">
                                    <p className="text-[10px] uppercase font-bold text-white/40">Admin UPI Payment</p>
                                    <p className="font-mono text-sm font-bold text-primary">{paymentSettings.upi_id || 'Pay Admin...'}</p>
                                    {paymentSettings.qr_code_url && (
                                        <img src={paymentSettings.qr_code_url} className="w-32 h-32 mx-auto rounded-lg mt-2" alt="QR Code" />
                                    )}
                                </div>

                                <form onSubmit={handleUpgradeSubmit} className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-white/40">Transaction Number (UTR)</label>
                                        <input
                                            required
                                            value={txNum}
                                            onChange={(e) => setTxNum(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                                            placeholder="Enter UTR Number"
                                        />
                                    </div>

                                    <button type="submit" className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg hover:scale-[1.01] transition-transform">
                                        Send Upgrade Request
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'magic_frame' && (
                    <div>
                        <ARUpload clientId={biz.id} />
                    </div>
                )}
                {activeTab === 'profile' && biz && (
                    <div className="max-w-xl mx-auto">
                        <div className="glass-card p-6 rounded-3xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Edit Profile</h3>

                            <form onSubmit={async (e) => {
                                e.preventDefault();
                                try {
                                    const { error } = await supabase
                                        .from('business_clients')
                                        .update({
                                            business_name: biz.business_name,
                                            email: biz.email,
                                            instagram_id: biz.instagram_id,
                                            whatsapp_number: (biz as any).whatsapp_number || ''
                                        })
                                        .eq('id', biz.id);

                                    if (error) throw error;
                                    toast({ title: "Success", description: "Profile updated successfully." });
                                } catch (error: any) {
                                    toast({ title: "Error", description: error.message, variant: "destructive" });
                                }
                            }} className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-white/40">Business Name</label>
                                    <input
                                        value={biz.business_name}
                                        onChange={(e) => setBiz({ ...biz, business_name: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-white/40">Email</label>
                                    <input
                                        type="email"
                                        value={biz.email}
                                        onChange={(e) => setBiz({ ...biz, email: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-white/40">Instagram ID</label>
                                    <input
                                        value={biz.instagram_id}
                                        onChange={(e) => setBiz({ ...biz, instagram_id: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase text-white/40">WhatsApp Number</label>
                                    <input
                                        value={(biz as any).whatsapp_number || ''}
                                        onChange={(e) => setBiz({ ...biz, whatsapp_number: e.target.value } as any)}
                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none"
                                        placeholder="Include country code, e.g., +91..."
                                    />
                                </div>

                                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl mb-4">
                                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div className="space-y-0.5">
                                            <p className="text-xs font-black uppercase text-emerald-400">Custom Domain Setup</p>
                                            <p className="text-[10px] text-white/40 leading-tight">Host on your own brand (e.g. www.yourstudio.com). Get setup instructions from Admin.</p>
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                const text = `Hello Admin! I want to set up a custom domain for my AR Studio "${biz.business_name}".\n\nMy business slug is: ${biz.business_slug}\n\nPlease help me with the DNS settings.`;
                                                window.open(`https://wa.me/918610381533?text=${encodeURIComponent(text)}`, '_blank');
                                            }}
                                            className="whitespace-nowrap bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 self-start sm:self-center"
                                        >
                                            🚀 Setup via WhatsApp
                                        </button>
                                   </div>
                                   <div className="mt-2 text-[9px] text-white/40 italic"> Current: <span className="text-white/60 not-italic font-mono">{biz.custom_domain || `${biz.business_slug}.giftmagic.beauty`}</span></div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase text-white/40">Upload New Logo</label>
                                    <div className="flex items-center gap-4">
                                        {biz.logo_url && (
                                            <img src={biz.logo_url} className="w-12 h-12 rounded-xl object-contain border border-white/10" />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                 if (!file) return;

                                                 try {
                                                    const filePath = `logos/${biz.business_slug}_${Date.now()}_logo`;
                                                    const publicUrl = await uploadFileToR2(file, filePath, 'ar-assets');
                                                    
                                                    const { error: updateError } = await supabase
                                                        .from('business_clients')
                                                        .update({ logo_url: publicUrl })
                                                        .eq('id', biz.id);

                                                    if (updateError) throw updateError;

                                                    setBiz({ ...biz, logo_url: publicUrl });
                                                    toast({ title: "Success", description: "Logo uploaded." });
                                                 } catch (error: any) {
                                                     toast({ title: "Error", description: error.message, variant: "destructive" });
                                                }
                                            }}
                                            className="text-xs text-white/60 bg-white/5 file:bg-primary file:text-white file:border-0 file:py-2 file:px-4 file:rounded-xl file:mr-4 file:font-bold hover:file:scale-[1.02] cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:scale-[1.01] transition-transform">
                                    Save Profile Changes
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                {/* Notices / Alerts */}
                {biz.frames_used >= biz.frame_limit && activeTab === 'dashboard' && (
                    <div className="max-w-xl mx-auto mt-6 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-4">
                        <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-md font-bold text-red-500">Usage Limit Reached</h4>
                            <p className="text-xs text-white/60">You have consumed your package's limit. Please upgrade or contact admin to renew access to Magic Frames.</p>
                        </div>
                    </div>
                )}
                    </>
                )}
            </main>
        </div>
    );
}
