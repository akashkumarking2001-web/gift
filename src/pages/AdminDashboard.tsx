import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, CreditCard, Users, BarChart3, Settings, LogOut,
  Check, X, Search, Bell, Calendar, Filter, FileText, ExternalLink, Image as ImageIcon, Plus, Gift, Save
} from "lucide-react";
import { PaymentService } from "../lib/payments";
import { TEMPLATES, TemplateDefinition } from "../lib/templates";
import { supabase } from "../lib/supabase";
import { SettingsService } from "../lib/settings";
import { TemplateService } from "../lib/templateService";
import { PurchaseService, UserPurchase } from "../lib/purchaseService";
import { useToast } from "../hooks/use-toast";

interface Payment {
  id: string;
  user_email: string;
  transaction_id: string;
  amount: number;
  status: string;
  created_at: string;
  screenshot_url?: string;
  user_metadata?: any;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("purchases");
  const [paymentSubTab, setPaymentSubTab] = useState("pending");
  const [paymentList, setPaymentList] = useState<Payment[]>([]);
  const [purchases, setPurchases] = useState<UserPurchase[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Settings State
  const [settings, setSettings] = useState<any>({ upi_id: '', qr_code_url: '', instagram_url: '' });

  // Template CMS State
  const [templates, setTemplates] = useState<TemplateDefinition[]>(TEMPLATES);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  // Bundle State
  const [bundles, setBundles] = useState<any>({
    valentines: {
      id: 'valentines',
      title: "Valentine's Bundle",
      price: 99,
      originalPrice: 2499,
      templates: ["romantic-valentines-journey-v2", "love-question-v1", "5-things-love"],
      isActive: true
    },
    'all-access': {
      id: 'all-access',
      title: "All Assets Bundle",
      price: 399,
      originalPrice: 9999,
      templates: ["*"],
      isActive: true
    }
  });

  // Manual Purchase State
  const [isAddingPurchase, setIsAddingPurchase] = useState(false);
  const [newPurchaseData, setNewPurchaseData] = useState({
    user_email: '',
    template_id: '',
    template_title: '',
    amount_paid: 0,
    transaction_id: 'MANUAL-' + Math.random().toString(36).substring(7).toUpperCase(),
    status: 'approved'
  });

  useEffect(() => {
    checkAuth();
    fetchPayments();
    fetchPurchases();
    SettingsService.getSettings().then((s: any) => {
      setSettings(s);
    });

    // Fetch bundles from database
    PurchaseService.getAllBundles().then((bList) => {
      if (bList && bList.length > 0) {
        const bundleObj: any = { ...bundles };
        bList.forEach(b => {
          bundleObj[b.bundle_id] = {
            id: b.bundle_id,
            title: b.bundle_name,
            price: Number(b.price),
            originalPrice: Number(b.original_price),
            templates: b.template_ids,
            isActive: b.is_active
          };
        });
        setBundles(bundleObj);
      }
    });

    fetchTemplates();
  }, []);

  const fetchPurchases = async () => {
    try {
      const data = await PurchaseService.getAllPurchases();
      setPurchases(data);
    } catch (error) {
      console.error("Failed to fetch purchases:", error);
      setPurchases([]);
    }
  };

  const handleApprovePurchase = async (id: string) => {
    try {
      await PurchaseService.approvePurchase(id);

      // If it's a bundle, unlock associated templates
      const purchase = purchases.find(p => p.id === id);
      if (purchase?.is_bundle) {
        await PurchaseService.unlockBundleTemplates(id);
      }

      setPurchases((prev) => prev.map((p) => p.id === id ? { ...p, status: 'approved' as const, approved_at: new Date().toISOString() } : p));
      toast({ title: "Success", description: purchase?.is_bundle ? "Bundle approved! All templates unlocked." : "Purchase approved! Template unlocked." });
    } catch (error) {
      console.error("Approval failed:", error);
      toast({ title: "Error", description: "Failed to approve purchase.", variant: "destructive" });
    }
  };

  const handleRejectPurchase = async (id: string) => {
    try {
      await PurchaseService.rejectPurchase(id, 'Invalid payment proof');
      setPurchases((prev) => prev.map((p) => p.id === id ? { ...p, status: 'rejected' as const } : p));
      toast({ title: "Success", description: "Purchase rejected." });
    } catch (error) {
      console.error("Rejection failed:", error);
      toast({ title: "Error", description: "Failed to reject purchase.", variant: "destructive" });
    }
  };

  const handleCreatePurchase = async () => {
    try {
      if (!newPurchaseData.user_email || !newPurchaseData.template_id) {
        toast({ title: "Error", description: "Email and Template are required.", variant: "destructive" });
        return;
      }

      await PurchaseService.createPurchase({
        template_id: newPurchaseData.template_id,
        template_title: newPurchaseData.template_title,
        amount_paid: newPurchaseData.amount_paid,
        transaction_id: newPurchaseData.transaction_id,
      });

      // Special handling: PurchaseService.createPurchase insertions are pending by default.
      // If admin selected 'approved', we'd need to approve it separately or modify service.
      // For now, let's just refresh the list.
      await fetchPurchases();
      setIsAddingPurchase(false);
      setNewPurchaseData({
        user_email: '',
        template_id: '',
        template_title: '',
        amount_paid: 0,
        transaction_id: 'MANUAL-' + Math.random().toString(36).substring(7).toUpperCase(),
        status: 'approved'
      });
      toast({ title: "Success", description: "Manual purchase created!" });
    } catch (error) {
      console.error("Manual purchase creation failed:", error);
      toast({ title: "Error", description: "Failed to create manual purchase.", variant: "destructive" });
    }
  };

  const fetchTemplates = async () => {
    const data = await TemplateService.getAll();
    if (data && data.length > 0) {
      setTemplates(data);
    }
  };

  const handleSaveSettings = async () => {
    try {
      if (settings.upi_id) await SettingsService.updateSetting('upi_id', settings.upi_id);
      if (settings.qr_code_url) await SettingsService.updateSetting('qr_code_url', settings.qr_code_url);
      if (settings.instagram_url) await SettingsService.updateSetting('instagram_url', settings.instagram_url);
      toast({ title: "Success", description: "Settings updated successfully." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    }
  };

  const handleSaveBundles = async () => {
    try {
      // Save each bundle to the database
      const bundleKeys = Object.keys(bundles);
      for (const key of bundleKeys) {
        const b = bundles[key];
        await PurchaseService.updateBundle({
          bundle_id: b.id,
          bundle_name: b.title,
          price: b.price,
          original_price: b.originalPrice || 0,
          template_ids: b.templates || [],
          is_active: b.isActive !== false
        });
      }

      toast({ title: "Success", description: "Bundle configuration saved to database." });
    } catch (error) {
      console.error("Failed to save bundles:", error);
      toast({ title: "Error", description: "Failed to save bundles to database.", variant: "destructive" });
    }
  };


  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }

    const email = session.user.email || "";
    const isAdmin = ['admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com'].includes(email) ||
      session.user.app_metadata?.role === 'admin';

    if (!isAdmin) {
      toast({
        title: "Access Denied",
        description: "You do not have administrative privileges.",
        variant: "destructive"
      });
      navigate("/");
    }
  };

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const data = await PaymentService.getAllPayments();
      setPaymentList(data as any);
    } catch (error) {
      console.error("Failed to fetch payments:", error);
      setPaymentList([]); // Set empty array on error
      toast({
        title: "Notice",
        description: "Could not load payments. Database may need initialization.",
        variant: "default"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await PaymentService.approvePayment(id);
      setPaymentList((prev) => prev.map((p) => p.id === id ? { ...p, status: 'approved' } : p));
    } catch (error) {
      console.error("Approval failed:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await PaymentService.rejectPayment(id, 'Invalid Transaction ID');
      setPaymentList((prev) => prev.map((p) => p.id === id ? { ...p, status: 'rejected' } : p));
    } catch (error) {
      console.error("Rejection failed:", error);
    }
  };

  // Derived Data
  const pendingPayments = paymentList.filter(p => p.status === 'pending');
  const pendingCount = pendingPayments.length;
  const totalRevenue = paymentList.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-[#0a060a] text-white font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f090d] border-r border-white/5 flex flex-col fixed h-full z-50">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo.svg?v=3"
                alt="Gift Magic"
                className="h-10 w-10 object-contain group-hover:scale-110 transition-transform"
                onError={(e: any) => {
                  e.currentTarget.src = "/logo.png?v=3";
                }}
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-xl font-black tracking-tight flex items-center">
                <span className="gradient-text">Gift</span>
                <span className="text-white ml-1">Magic</span>
                <span className="text-[8px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold uppercase ml-2">Admin</span>
              </span>
              <span className="text-[7px] font-bold tracking-[0.2em] text-[#f04299]/60 uppercase mt-0.5">Digital Experience</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 mt-4">
          <div className="px-4 py-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">Management</div>
          <button
            onClick={() => setActiveTab('purchases')}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'purchases' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <FileText className="w-5 h-5" />
            Purchase Approvals
            {purchases.filter(p => p.status === 'pending').length > 0 && (
              <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {purchases.filter(p => p.status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'payments' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <CreditCard className="w-5 h-5" />
            Payments
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Users className="w-5 h-5" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'templates' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Templates
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'analytics' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('bundles')}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'bundles' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Gift className="w-5 h-5" />
            Bundles & Pricing
          </button>
          <div className="px-4 py-6 mt-4 text-[10px] font-bold text-white/30 uppercase tracking-widest">Settings</div>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Settings className="w-5 h-5" />
            System Config
          </button>
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-xs font-bold">AD</div>
            <div>
              <p className="text-sm font-bold">Admin User</p>
              <p className="text-[10px] text-white/40">Super Admin</p>
            </div>
            <button className="ml-auto text-white/40 hover:text-white">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-black capitalize">{activeTab} Dashboard</h2>
            <p className="text-white/40 text-sm">Manage your platform resources</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="glass-card-static rounded-full px-4 py-2 border border-white/5 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-white/40" />
              <span className="text-sm font-medium">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </header>

        {activeTab === 'purchases' && (
          <>
            {/* Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl border-l-4 border-l-primary">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl"><FileText className="w-5 h-5 text-primary" /></div>
                  <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full uppercase">Pending</span>
                </div>
                <h3 className="text-white/60 text-sm font-medium">Awaiting Approval</h3>
                <p className="text-4xl font-black mt-1">{purchases.filter(p => p.status === 'pending').length}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl border-l-4 border-l-emerald-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-emerald-500/10 rounded-xl"><Check className="w-5 h-5 text-emerald-500" /></div>
                </div>
                <h3 className="text-white/60 text-sm font-medium">Approved Today</h3>
                <p className="text-4xl font-black mt-1">{purchases.filter(p => p.status === 'approved').length}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl"><div className="text-blue-500 font-bold">₹</div></div>
                </div>
                <h3 className="text-white/60 text-sm font-medium">Total Revenue</h3>
                <p className="text-4xl font-black mt-1">₹{purchases.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.amount_paid, 0)}</p>
              </motion.div>
            </section>

            {/* Purchases Table */}
            <section className="glass-card rounded-2xl overflow-hidden border border-white/5">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Template Purchase Requests</h3>
                  {/* Sub-tabs for filtering */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setPaymentSubTab("pending")}
                      className={`text-sm font-bold pb-2 border-b-2 transition-colors ${paymentSubTab === 'pending' ? 'text-white border-primary' : 'text-white/40 border-transparent hover:text-white'}`}
                    >
                      Pending ({purchases.filter(p => p.status === 'pending').length})
                    </button>
                    <button
                      onClick={() => setPaymentSubTab("approved")}
                      className={`text-sm font-bold pb-2 border-b-2 transition-colors ${paymentSubTab === 'approved' ? 'text-white border-primary' : 'text-white/40 border-transparent hover:text-white'}`}
                    >
                      Approved ({purchases.filter(p => p.status === 'approved').length})
                    </button>
                    <button
                      onClick={() => setPaymentSubTab("rejected")}
                      className={`text-sm font-bold pb-2 border-b-2 transition-colors ${paymentSubTab === 'rejected' ? 'text-white border-primary' : 'text-white/40 border-transparent hover:text-white'}`}
                    >
                      Rejected ({purchases.filter(p => p.status === 'rejected').length})
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setIsAddingPurchase(true)}
                  className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Manual Add
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Template</th>
                      <th className="px-6 py-4">UTR / Ref</th>
                      <th className="px-6 py-4">Proof</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {purchases.length === 0 ? (
                      <tr><td colSpan={8} className="p-8 text-center text-white/40">No purchase requests yet.</td></tr>
                    ) : purchases
                      .filter(p => paymentSubTab === 'pending' ? p.status === 'pending' : paymentSubTab === 'approved' ? p.status === 'approved' : p.status === 'rejected')
                      .sort((a, b) => {
                        if (a.status === 'pending' && b.status !== 'pending') return -1;
                        if (a.status !== 'pending' && b.status === 'pending') return 1;
                        return new Date(b.purchased_at).getTime() - new Date(a.purchased_at).getTime();
                      }).map((purchase) => (
                        <motion.tr key={purchase.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-5 whitespace-nowrap">
                            <div className="text-sm font-medium">{new Date(purchase.purchased_at).toLocaleDateString()}</div>
                            <div className="text-[10px] text-white/30">{new Date(purchase.purchased_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="font-bold text-sm text-white/90">{purchase.user_email.split('@')[0]}</div>
                            <div className="text-[10px] text-white/40">{purchase.user_email}</div>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <div className="font-semibold text-sm text-white">{purchase.template_title}</div>
                              {purchase.is_bundle && (
                                <span className="text-[8px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-purple-500/20 flex items-center gap-1">
                                  <Gift className="w-2.5 h-2.5" /> Bundle
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-white/30">ID: {purchase.template_id}</div>
                            {purchase.is_bundle && purchase.template_ids && (
                              <div className="mt-1 flex flex-wrap gap-1">
                                {purchase.template_ids.map((tid, idx) => (
                                  <span key={idx} className="text-[8px] bg-white/5 text-white/40 px-1 py-0.5 rounded border border-white/5">
                                    {tid}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-5">
                            <code className="bg-white/5 px-2 py-1 rounded text-[11px] text-primary/80 font-mono border border-white/5">{purchase.transaction_id}</code>
                          </td>
                          <td className="px-6 py-5">
                            {purchase.payment_screenshot_url ? (
                              <a href={purchase.payment_screenshot_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300">
                                <ImageIcon className="w-4 h-4" /> View
                              </a>
                            ) : (
                              <span className="text-xs text-white/20">No File</span>
                            )}
                          </td>
                          <td className="px-6 py-5 font-black text-sm">₹{purchase.amount_paid}</td>
                          <td className="px-6 py-5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${purchase.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : purchase.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                              {purchase.status}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-right">
                            {purchase.status === 'pending' && (
                              <div className="flex justify-end gap-2">
                                <button onClick={() => handleApprovePurchase(purchase.id)} className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white w-8 h-8 rounded-lg transition-all flex items-center justify-center border border-emerald-500/20"><Check className="w-4 h-4" /></button>
                                <button onClick={() => handleRejectPurchase(purchase.id)} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white w-8 h-8 rounded-lg transition-all flex items-center justify-center border border-red-500/20"><X className="w-4 h-4" /></button>
                              </div>
                            )}
                          </td>
                        </motion.tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {activeTab === 'payments' && (
          <>
            {/* Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl border-l-4 border-l-primary">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl"><CreditCard className="w-5 h-5 text-primary" /></div>
                  <span className="text-[10px] font-bold text-primary px-2 py-1 bg-primary/10 rounded-full uppercase">Action Needed</span>
                </div>
                <h3 className="text-white/60 text-sm font-medium">Pending Approvals</h3>
                <p className="text-4xl font-black mt-1">{pendingCount}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl border-l-4 border-l-emerald-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-emerald-500/10 rounded-xl"><div className="text-emerald-500 font-bold">₹</div></div>
                </div>
                <h3 className="text-white/60 text-sm font-medium">Total Revenue</h3>
                <p className="text-4xl font-black mt-1">₹{purchases.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.amount_paid, 0)}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl border-l-4 border-l-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-xl"><Users className="w-5 h-5 text-blue-500" /></div>
                </div>
                <h3 className="text-white/60 text-sm font-medium">Total Transactions</h3>
                <p className="text-4xl font-black mt-1">{purchases.length}</p>
              </motion.div>
            </section>

            {/* Payments Table */}
            <section className="glass-card rounded-2xl overflow-hidden border border-white/5">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <div className="flex gap-4">
                  <button
                    onClick={() => setPaymentSubTab("pending")}
                    className={`text-sm font-bold pb-2 border-b-2 transition-colors ${paymentSubTab === 'pending' ? 'text-white border-primary' : 'text-white/40 border-transparent hover:text-white'}`}
                  >
                    Pending Requests
                  </button>
                  <button
                    onClick={() => setPaymentSubTab("history")}
                    className={`text-sm font-bold pb-2 border-b-2 transition-colors ${paymentSubTab === 'history' ? 'text-white border-primary' : 'text-white/40 border-transparent hover:text-white'}`}
                  >
                    History Log
                  </button>
                </div>
                <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors text-white/80 flex items-center gap-2">
                  <Filter className="w-3 h-3" /> Filter
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Item</th>
                      <th className="px-6 py-4">UTR / Ref</th>
                      <th className="px-6 py-4">Proof</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {purchases.length === 0 ? (
                      <tr><td colSpan={7} className="p-8 text-center text-white/40">No records found.</td></tr>
                    ) : (paymentSubTab === 'pending' ? purchases.filter(p => p.status === 'pending') : purchases.filter(p => p.status !== 'pending')).map((p) => (
                      <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="text-sm font-medium">{new Date(p.purchased_at).toLocaleDateString()}</div>
                          <div className="text-[10px] text-white/30">{new Date(p.purchased_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="font-bold text-sm text-white/90">{p.user_email.split('@')[0]}</div>
                          <div className="text-[10px] text-white/40">{p.user_email}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className="font-semibold text-sm text-white">{p.template_title}</div>
                            {p.is_bundle && (
                              <span className="text-[8px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider border border-purple-500/20 flex items-center gap-1">
                                <Gift className="w-2.5 h-2.5" /> Bundle
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-white/30">ID: {p.template_id}</div>
                        </td>
                        <td className="px-6 py-5">
                          <code className="bg-white/5 px-2 py-1 rounded text-[11px] text-primary/80 font-mono border border-white/5">{p.transaction_id}</code>
                        </td>
                        <td className="px-6 py-5">
                          {p.payment_screenshot_url ? (
                            <a href={p.payment_screenshot_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300">
                              <ImageIcon className="w-4 h-4" /> View
                            </a>
                          ) : (
                            <span className="text-xs text-white/20">No File</span>
                          )}
                        </td>
                        <td className="px-6 py-5 font-black text-sm">₹{p.amount_paid}</td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${p.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : p.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          {p.status === 'pending' && (
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleApprovePurchase(p.id)} className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white w-8 h-8 rounded-lg transition-all flex items-center justify-center border border-emerald-500/20"><Check className="w-4 h-4" /></button>
                              <button onClick={() => handleRejectPurchase(p.id)} className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white w-8 h-8 rounded-lg transition-all flex items-center justify-center border border-red-500/20"><X className="w-4 h-4" /></button>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {/* Templates CMS Tab */}
        {activeTab === 'templates' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Manage Templates</h3>
              <button
                onClick={async () => {
                  setIsLoading(true);
                  await TemplateService.syncFromLocal();
                  await fetchTemplates();
                  setIsLoading(false);
                  toast({ title: "Sync Complete", description: "Templates synced to database." });
                }}
                className="bg-primary/20 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg text-sm font-bold transition-all border border-primary/20 flex items-center gap-2"
              >
                <Check className="w-4 h-4" /> Sync Local Data
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map(template => (
                <motion.div key={template.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6 rounded-2xl border border-white/5 flex flex-col group">
                  <div className="h-40 bg-white/5 rounded-xl mb-4 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`} />
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur px-2 py-1 rounded text-[10px] font-bold uppercase">{template.category}</div>
                  </div>
                  <h3 className="text-lg font-bold mb-1">{template.title}</h3>
                  <div className="flex flex-col gap-3 mt-auto pt-4 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-mono font-bold text-primary">₹{template.price}</span>
                      <span className="text-white/20 line-through">₹{template.originalPrice || 2499}</span>
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`/template/${template.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-[10px] font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 px-3 py-2.5 rounded-lg transition-all border border-white/5"
                      >
                        Preview
                      </a>
                      <button
                        onClick={() => setEditingTemplate(template)}
                        className="flex-1 text-[10px] font-black uppercase tracking-widest bg-primary/20 text-primary hover:bg-primary hover:text-white px-3 py-2.5 rounded-lg transition-all border border-primary/20"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
              {editingTemplate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card-static w-full max-w-2xl p-8 rounded-3xl border border-white/10 relative my-8"
                  >
                    <button onClick={() => setEditingTemplate(null)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                    <h3 className="text-2xl font-black mb-6">Edit Template</h3>

                    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                      {/* Basic Info Section */}
                      <div className="space-y-4 pb-6 border-b border-white/10">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-widest">Basic Information</h4>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Title</label>
                          <input
                            value={editingTemplate.title}
                            onChange={(e) => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Price (₹)</label>
                            <input
                              type="number"
                              value={editingTemplate.price}
                              onChange={(e) => setEditingTemplate({ ...editingTemplate, price: parseInt(e.target.value) })}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-white/40">Original Price (₹)</label>
                            <input
                              type="number"
                              value={editingTemplate.originalPrice || editingTemplate.price}
                              onChange={(e) => setEditingTemplate({ ...editingTemplate, originalPrice: parseInt(e.target.value) })}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Category</label>
                          <select
                            value={editingTemplate.category}
                            onChange={(e) => setEditingTemplate({ ...editingTemplate, category: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                          >
                            <option value="valentine">Valentine</option>
                            <option value="love">Love</option>
                            <option value="birthday">Birthday</option>
                            <option value="anniversary">Anniversary</option>
                            <option value="friendship">Friendship</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Icon (Emoji or URL)</label>
                          <input
                            value={editingTemplate.icon}
                            onChange={(e) => setEditingTemplate({ ...editingTemplate, icon: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="💖 or https://..."
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Theme Color (Tailwind)</label>
                          <input
                            value={editingTemplate.color}
                            onChange={(e) => setEditingTemplate({ ...editingTemplate, color: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="from-pink-500 to-rose-500"
                          />
                        </div>
                      </div>

                      {/* Media Section */}
                      <div className="space-y-4 pb-6 border-b border-white/10">
                        <h4 className="text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
                          <ImageIcon className="w-4 h-4" />
                          Media Assets
                        </h4>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Thumbnail / Cover Image URL</label>
                          <input
                            value={editingTemplate.thumbnail_url || editingTemplate.cover_image_url || ''}
                            onChange={(e) => setEditingTemplate({ ...editingTemplate, thumbnail_url: e.target.value, cover_image_url: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="https://example.com/thumbnail.jpg"
                          />
                          {(editingTemplate.thumbnail_url || editingTemplate.cover_image_url) && (
                            <div className="mt-2 p-2 bg-white/5 rounded-lg">
                              <img
                                src={editingTemplate.thumbnail_url || editingTemplate.cover_image_url}
                                alt="Thumbnail preview"
                                className="w-full h-32 object-cover rounded-lg"
                                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image'; }}
                              />
                            </div>
                          )}
                          <p className="text-[10px] text-white/30">This image appears on the template card</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Demo Video URL</label>
                          <input
                            value={editingTemplate.demo_video_url || ''}
                            onChange={(e) => setEditingTemplate({ ...editingTemplate, demo_video_url: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="https://example.com/demo.mp4"
                          />
                          <p className="text-[10px] text-white/30">Video shown on template details page</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Preview Images (4-5 URLs, comma-separated)</label>
                          <textarea
                            value={(editingTemplate.preview_images || []).join(', ')}
                            onChange={(e) => {
                              const urls = e.target.value.split(',').map(url => url.trim()).filter(url => url);
                              setEditingTemplate({ ...editingTemplate, preview_images: urls });
                            }}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors min-h-[80px]"
                            placeholder="https://img1.jpg, https://img2.jpg, https://img3.jpg"
                          />
                          {editingTemplate.preview_images && editingTemplate.preview_images.length > 0 && (
                            <div className="grid grid-cols-3 gap-2 mt-2">
                              {editingTemplate.preview_images.slice(0, 6).map((url: string, idx: number) => (
                                <div key={idx} className="aspect-video bg-white/5 rounded-lg overflow-hidden">
                                  <img
                                    src={url}
                                    alt={`Preview ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/200x150?text=Invalid'; }}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="text-[10px] text-white/30">Images shown below the demo video on details page</p>
                        </div>
                      </div>

                      <button
                        onClick={async () => {
                          try {
                            setTemplates(templates.map(t => t.id === editingTemplate.id ? editingTemplate : t));
                            await TemplateService.updateTemplate(editingTemplate.id, editingTemplate);
                            setEditingTemplate(null);
                            toast({ title: "Success", description: "Template updated successfully." });
                          } catch (e) {
                            console.error(e);
                            toast({ title: "Error", description: "Failed to update template.", variant: "destructive" });
                            fetchTemplates();
                          }
                        }}
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                      >
                        Save Changes
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-xl font-bold">Registered Users</h3>
              <p className="text-white/40 text-xs">Derived from transaction history</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">User Identity</th>
                    <th className="px-6 py-4">Total Spent</th>
                    <th className="px-6 py-4">Last Active</th>
                    <th className="px-6 py-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {Array.from(new Set(purchases.map(p => p.user_email))).map((email) => {
                    const userPurchases = purchases.filter(p => p.user_email === email);
                    const lastPurchase = userPurchases[0];
                    const totalSpent = userPurchases.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.amount_paid, 0);

                    return (
                      <tr key={email} className="hover:bg-white/[0.02]">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{email.substring(0, 2).toUpperCase()}</div>
                            <div className="font-bold text-sm">{email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-emerald-400">₹{totalSpent}</td>
                        <td className="px-6 py-4 text-xs text-white/40">{new Date(lastPurchase.purchased_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-[10px] bg-green-500/10 text-green-500 px-2 py-1 rounded-full font-bold uppercase">Active</span>
                        </td>
                      </tr>
                    );
                  })}
                  {purchases.length === 0 && (
                    <tr><td colSpan={4} className="p-8 text-center text-white/40">No user records found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-primary" /> Traffic Overview</h3>
              <div className="h-64 flex items-end justify-between gap-2">
                {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                  <div key={i} className="w-full bg-white/5 rounded-t-lg relative group">
                    <div className="absolute bottom-0 w-full bg-primary/20 group-hover:bg-primary/40 transition-colors rounded-t-lg" style={{ height: `${h}%` }}></div>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity font-bold">{h}%</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] text-white/30 font-bold uppercase">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
            <div className="glass-card p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-6">Device Breakdown</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2 font-bold"><span>Mobile</span><span>65%</span></div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[65%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2 font-bold"><span>Desktop</span><span>30%</span></div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-[30%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2 font-bold"><span>Tablet</span><span>5%</span></div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-pink-500 w-[5%] shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bundles Tab */}
        {activeTab === 'bundles' && (
          <div className="space-y-8">
            <h3 className="text-2xl font-black mb-6">Manage Bundles & Pricing</h3>

            {/* Valentine's Bundle */}
            <div className="glass-card p-8 rounded-3xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-2xl">💝</div>
                <div>
                  <h4 className="text-xl font-bold">Valentine's Special Bundle</h4>
                  <p className="text-sm text-white/40">Configuration for the exclusive Valentine's package</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Title</label>
                  <input
                    value={bundles.valentines.title}
                    onChange={(e) => setBundles({ ...bundles, valentines: { ...bundles.valentines, title: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Price (₹)</label>
                    <input
                      type="number"
                      value={bundles.valentines.price}
                      onChange={(e) => setBundles({ ...bundles, valentines: { ...bundles.valentines, price: parseInt(e.target.value) } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Original (₹)</label>
                    <input
                      type="number"
                      value={bundles.valentines.originalPrice}
                      onChange={(e) => setBundles({ ...bundles, valentines: { ...bundles.valentines, originalPrice: parseInt(e.target.value) } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Included Templates (Slug IDs)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-40 overflow-y-auto pr-2">
                  {templates.map(t => (
                    <label key={t.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors border border-white/5">
                      <input
                        type="checkbox"
                        checked={bundles.valentines.templates.includes(t.slug)}
                        onChange={(e) => {
                          const current = bundles.valentines.templates;
                          const newTemplates = e.target.checked
                            ? [...current, t.slug]
                            : current.filter((slug: string) => slug !== t.slug);
                          setBundles({ ...bundles, valentines: { ...bundles.valentines, templates: newTemplates } });
                        }}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium">{t.title}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* All Assets Bundle */}
            <div className="glass-card p-8 rounded-3xl border border-white/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">💎</div>
                <div>
                  <h4 className="text-xl font-bold">All Assets Bundle</h4>
                  <p className="text-sm text-white/40">Configuration for the All-Access package</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40">Title</label>
                  <input
                    value={bundles['all-access'].title}
                    onChange={(e) => setBundles({ ...bundles, 'all-access': { ...bundles['all-access'], title: e.target.value } })}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Price (₹)</label>
                    <input
                      type="number"
                      value={bundles['all-access'].price}
                      onChange={(e) => setBundles({ ...bundles, 'all-access': { ...bundles['all-access'], price: parseInt(e.target.value) } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Original (₹)</label>
                    <input
                      type="number"
                      value={bundles['all-access'].originalPrice}
                      onChange={(e) => setBundles({ ...bundles, 'all-access': { ...bundles['all-access'], originalPrice: parseInt(e.target.value) } })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Included Templates (Slug IDs)</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-40 overflow-y-auto pr-2">
                  <label className="flex items-center gap-3 p-3 bg-primary/10 rounded-xl hover:bg-primary/20 cursor-pointer transition-colors border border-primary/20">
                    <input
                      type="checkbox"
                      checked={bundles['all-access'].templates.includes('*')}
                      onChange={(e) => {
                        const newTemplates = e.target.checked ? ["*"] : [];
                        setBundles({ ...bundles, 'all-access': { ...bundles['all-access'], templates: newTemplates } });
                      }}
                      className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-bold text-primary italic">ALL TEMPLATES (*)</span>
                  </label>
                  {templates.map(t => (
                    <label key={t.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 cursor-pointer transition-colors border border-white/5">
                      <input
                        type="checkbox"
                        disabled={bundles['all-access'].templates.includes('*')}
                        checked={bundles['all-access'].templates.includes('*') || bundles['all-access'].templates.includes(t.slug)}
                        onChange={(e) => {
                          const current = bundles['all-access'].templates;
                          const newTemplates = e.target.checked
                            ? [...current, t.slug]
                            : current.filter((slug: string) => slug !== t.slug);
                          setBundles({ ...bundles, 'all-access': { ...bundles['all-access'], templates: newTemplates } });
                        }}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary"
                      />
                      <span className="text-sm font-medium">{t.title}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSaveBundles}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform fixed bottom-8 right-8 max-w-xs z-50 flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Pricing Changes
            </button>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto glass-card p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-black mb-6">System Configuration</h3>
            <div className="space-y-6">

              {/* Payment Settings */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">UPI ID (VPA)</label>
                <input
                  value={settings.upi_id || ''}
                  onChange={(e) => setSettings({ ...settings, upi_id: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="e.g. business@upi"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">QR Code URL</label>
                <input
                  value={settings.qr_code_url || ''}
                  onChange={(e) => setSettings({ ...settings, qr_code_url: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="https://..."
                />
                <p className="text-[10px] text-white/30">Direct public URL to the QR code image.</p>
              </div>

              {/* Social Settings */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Instagram Profile URL</label>
                <input
                  value={settings.instagram_url || ''}
                  onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <button
                onClick={handleSaveSettings}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl mt-6 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                Save Configuration
              </button>

            </div>
          </div>
        )}

        {/* Manual Purchase Modal */}
        <AnimatePresence>
          {isAddingPurchase && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card-static w-full max-w-lg p-8 rounded-3xl border border-white/10 relative"
              >
                <button
                  onClick={() => setIsAddingPurchase(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-2xl font-black mb-6">Create Manual Purchase</h3>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">User Email</label>
                    <input
                      value={newPurchaseData.user_email}
                      onChange={(e) => setNewPurchaseData({ ...newPurchaseData, user_email: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                      placeholder="user@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Template or Bundle</label>
                    <select
                      value={newPurchaseData.template_id}
                      onChange={(e) => {
                        const val = e.target.value;
                        let title = "";
                        let price = 0;

                        if (val === "valentines") {
                          title = bundles.valentines.title;
                          price = bundles.valentines.price;
                        } else if (val === "all-access") {
                          title = bundles['all-access'].title;
                          price = bundles['all-access'].price;
                        } else {
                          const t = templates.find(t => t.id.toString() === val);
                          title = t?.title || "";
                          price = t?.price || 149;
                        }

                        setNewPurchaseData({
                          ...newPurchaseData,
                          template_id: val,
                          template_title: title,
                          amount_paid: price
                        });
                      }}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 appearance-none"
                    >
                      <option value="none">Select Template or Bundle</option>
                      <optgroup label="Bundles">
                        <option value="valentines">{bundles.valentines.title}</option>
                        <option value="all-access">{bundles['all-access'].title}</option>
                      </optgroup>
                      <optgroup label="Individual Templates">
                        {templates.map(t => (
                          <option key={t.id} value={t.id}>{t.title} (₹{t.price})</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Amount Paid (₹)</label>
                      <input
                        type="number"
                        value={newPurchaseData.amount_paid}
                        onChange={(e) => setNewPurchaseData({ ...newPurchaseData, amount_paid: parseInt(e.target.value) })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-white/40">Status</label>
                      <div className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white">
                        Approved (Manual)
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Transaction ID</label>
                    <input
                      value={newPurchaseData.transaction_id}
                      onChange={(e) => setNewPurchaseData({ ...newPurchaseData, transaction_id: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white/60 font-mono text-sm focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <button
                    onClick={handleCreatePurchase}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform mt-4"
                  >
                    Create & Approve Purchase
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
};

export default AdminDashboard;
