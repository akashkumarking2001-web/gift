import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, CreditCard, Users, BarChart3, Settings, LogOut,
  Check, X, Search, Bell, Calendar, Filter, FileText, ExternalLink, Image as ImageIcon
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

  useEffect(() => {
    checkAuth();
    fetchPayments();
    fetchPurchases();
    SettingsService.getSettings().then((s: any) => setSettings(s));
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
      setPurchases((prev) => prev.map((p) => p.id === id ? { ...p, status: 'approved' as const, approved_at: new Date().toISOString() } : p));
      toast({ title: "Success", description: "Purchase approved! Template unlocked for user." });
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
  const historyPayments = paymentList.filter(p => p.status !== 'pending');
  const displayedPayments = paymentSubTab === 'pending' ? pendingPayments : historyPayments;

  const pendingCount = pendingPayments.length;
  const totalRevenue = paymentList.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-[#0a060a] text-white font-sans flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f090d] border-r border-white/5 flex flex-col fixed h-full z-50">
        <div className="p-6 flex items-center gap-2">
          <div className="text-primary text-3xl">♥</div>
          <h1 className="text-2xl font-black tracking-tight text-white">Gift Magic</h1>
          <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold uppercase ml-1">Admin</span>
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
              <div className="p-6 border-b border-white/5">
                <h3 className="text-xl font-bold text-white mb-4">Template Purchase Requests</h3>

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
                            <div className="font-semibold text-sm text-white">{purchase.template_title}</div>
                            <div className="text-[10px] text-white/30">ID: {purchase.template_id}</div>
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
                  <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/5">
                    <span className="font-mono font-bold text-primary">₹{template.price}</span>
                    <button
                      onClick={() => setEditingTemplate(template)}
                      className="text-xs font-bold bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Edit Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Edit Modal */}
            <AnimatePresence>
              {editingTemplate && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card-static w-full max-w-lg p-8 rounded-3xl border border-white/10 relative"
                  >
                    <button onClick={() => setEditingTemplate(null)} className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-5 h-5" /></button>
                    <h3 className="text-2xl font-black mb-6">Edit Template</h3>

                    <div className="space-y-4">
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
                          <label className="text-xs font-bold uppercase tracking-widest text-white/40">Markdown MRP (₹)</label>
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
                        <input
                          value={editingTemplate.category}
                          onChange={(e) => setEditingTemplate({ ...editingTemplate, category: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Icon URL / Image</label>
                        <input
                          value={editingTemplate.icon}
                          onChange={(e) => setEditingTemplate({ ...editingTemplate, icon: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="Emoji (✨) or https://..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-white/40">Theme Color (Tailwind Class)</label>
                        <input
                          value={editingTemplate.color}
                          onChange={(e) => setEditingTemplate({ ...editingTemplate, color: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="from-pink-500 to-rose-500"
                        />
                      </div>

                      <button
                        onClick={async () => {
                          try {
                            setTemplates(templates.map(t => t.id === editingTemplate.id ? editingTemplate : t));
                            await TemplateService.updateTemplate(editingTemplate.id, editingTemplate);
                            setEditingTemplate(null);
                            toast({ title: "Success", description: "Template updated." });
                          } catch (e) {
                            console.error(e);
                            toast({ title: "Error", description: "Failed to update.", variant: "destructive" });
                            fetchTemplates();
                          }
                        }}
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl mt-6 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
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

      </main>
    </div>
  );
};

export default AdminDashboard;
