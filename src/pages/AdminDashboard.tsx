import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, CreditCard, Users, BarChart3, Settings, LogOut,
  Check, X, Search, Bell, Calendar, Filter, FileText, ExternalLink, Image as ImageIcon, Plus, Gift, Save, ScanLine, Menu, Mail, Send, RefreshCw, Sparkles, Edit2, Trash2, Eye, EyeOff, Play,
  Building, Clock, History, Phone, Instagram
} from "lucide-react";
import ARUpload from "../components/admin/ARUpload";
import { PaymentService } from "../lib/payments";
import { TEMPLATES, TemplateDefinition } from "../lib/templates";
import { supabase } from "../lib/supabase";
import { SettingsService } from "../lib/settings";
import { TemplateService } from "../lib/templateService";
import { PurchaseService, UserPurchase } from "../lib/purchaseService";
import { useToast } from "../hooks/use-toast";
import { BusinessService, BusinessClient, UpgradeRequest } from "../lib/businessService";
import { Link as RouterLink } from "react-router-dom"; // for avoiding circular link icon
import { uploadFileToR2 } from "../lib/r2Client";
import Logo from "../components/Logo";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Business System State
  const [businessClients, setBusinessClients] = useState<BusinessClient[]>([]);
  const [businessRequests, setBusinessRequests] = useState<UpgradeRequest[]>([]);
  const [bizRegRequests, setBizRegRequests] = useState<any[]>([]);
  const [bizSettings, setBizSettings] = useState({ upi_id: '', qr_code_url: '' });
  const [newBizData, setNewBizData] = useState({
    business_name: '', logo_url: '', email: '', password_hash: '', instagram_id: '', whatsapp_number: '', package_type: '299', frame_limit: 600, custom_domain: '', custom_package_price: undefined as number | undefined
  });
  const [editingBiz, setEditingBiz] = useState<BusinessClient | null>(null);

  // Settings State
  const [settings, setSettings] = useState<any>({ upi_id: '', qr_code_url: '', instagram_url: '' });

  const [templates, setTemplates] = useState<TemplateDefinition[]>(TEMPLATES);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  // Contact Requests State
  const [contactRequests, setContactRequests] = useState<any[]>([]);

  // Registered Users State
  const [registeredUsers, setRegisteredUsers] = useState<any[]>([]);

  // AR Albums Approval State
  const [arAlbums, setArAlbums] = useState<any[]>([]);

  // Pending Magic Frames State
  const [personalRegRequests, setPersonalRegRequests] = useState<any[]>([]);
  const [pendingArCreations, setPendingArCreations] = useState<any[]>([]);
  const [expandedUserEmail, setExpandedUserEmail] = useState<string | null>(null);
  const [editingPersonalUser, setEditingPersonalUser] = useState<any | null>(null);

  // PRICING MANAGEMENT STATE
  const [personalPricing, setPersonalPricing] = useState({ price: 149, original_mrp: 499 });
  const [activePackages, setActivePackages] = useState<any[]>([]);

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

  const [arApprovalSubTab, setArApprovalSubTab] = useState("pending");

  useEffect(() => {
    checkAuth();
    fetchPayments();
    fetchPurchases();
    fetchArAlbums();
    fetchPendingArCreations();
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
    fetchBizData();
    fetchContactRequests();
    fetchBizRegRequests();
    fetchPersonalRegRequests();
    fetchRegisteredUsers();

    // Fetch Pricing
    BusinessService.getPackages().then(data => setActivePackages(data || []));
    SettingsService.getSettings().then(s => {
      if (s.album_pricing) {
        try {
          const p = typeof s.album_pricing === 'string' ? JSON.parse(s.album_pricing) : s.album_pricing;
          setPersonalPricing(p);
        } catch (e) { console.error('Error parsing pricing', e); }
      }
    });
  }, []);

  const fetchRegisteredUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setRegisteredUsers(data || []);
    } catch (e) {
      console.error("Failed to fetch registered users:", e);
    }
  };

  const fetchBizRegRequests = async () => {
    try {
      const data = await BusinessService.getRegistrationRequests();
      setBizRegRequests(data || []);
    } catch (e) {
      console.error("Failed to fetch reg requests:", e);
    }
  };

  const fetchPersonalRegRequests = async () => {
    try {
      // 1. Fetch official registration requests
      const { data: requests, error: reqErr } = await supabase
        .from('personal_registration_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (reqErr) throw reqErr;
      
      // 2. Discover users from ar_albums (Personal users have client_id = null)
      const { data: albumUsers, error: albumErr } = await supabase
        .from('ar_albums')
        .select('phone_number, username, created_at, amount_paid, payment_status, album_type')
        .is('client_id', null);
      
      if (albumErr) throw albumErr;

      // Create a map of discovered users from albums
      const discoveredUsers: any[] = [];
      const seenEmails = new Set(requests?.map(r => r.email) || []);

      if (albumUsers) {
        albumUsers.forEach(album => {
          // Use phone number or username as unique identifier if email is missing
          const identifier = album.phone_number || album.username || `user_${album.created_at}`;
          if (!seenEmails.has(identifier)) {
            discoveredUsers.push({
              id: identifier,
              full_name: album.username || "Discovered User",
              email: identifier,
              phone_number: album.phone_number,
              status: 'approved',
              created_at: album.created_at,
              is_discovered: true
            });
            seenEmails.add(identifier);
          }
        });
      }

      setPersonalRegRequests([...(requests || []), ...discoveredUsers]);
    } catch (e) {
      console.error("Failed to fetch personal registration requests:", e);
    }
  };

  const fetchContactRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setContactRequests(data || []);
    } catch (e) {
      console.error("Failed to fetch contact requests:", e);
    }
  };

  const handleUpdateContactStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("contact_requests")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      setContactRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
      toast({ title: "Success", description: `Request marked as ${status}.` });
    } catch (e) {
      toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
    }
  };

  const fetchArAlbums = async () => {
    try {
      const { data, error } = await supabase
        .from('ar_albums')
        .select('*, client:business_clients(business_name)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setArAlbums(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchPendingArCreations = async () => {
    try {
      const { data, error } = await supabase
        .from('pending_ar_creations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setPendingArCreations(data || []);
    } catch (e) {
      console.error("Failed to fetch pending creations:", e);
    }
  };

  const handleApproveAlbum = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ar_albums')
        .update({ approval_status: 'approved', payment_status: 'paid', is_active: true })
        .eq('id', id);
      if (error) throw error;
      setArAlbums(prev => prev.map(a => a.id === id ? { ...a, approval_status: 'approved', payment_status: 'paid', is_active: true } : a));
      toast({ title: "Success", description: "Album approved and activated." });
    } catch (e) {
      toast({ title: "Error", description: "Approval failed.", variant: "destructive" });
    }
  };

  const handleRejectAlbum = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ar_albums')
        .update({ approval_status: 'rejected' })
        .eq('id', id);
      if (error) throw error;
      setArAlbums(prev => prev.map(a => a.id === id ? { ...a, approval_status: 'rejected' } : a));
      toast({ title: "Success", description: "Album rejected." });
    } catch (e) {
      toast({ title: "Error", description: "Rejection failed.", variant: "destructive" });
    }
  };

  const fetchBizData = async () => {
    try {
      const clients = await BusinessService.getAllClients();
      setBusinessClients(clients);
      const reqs = await BusinessService.getUpgradeRequests();
      setBusinessRequests(reqs);
      const bizS = await BusinessService.getPaymentSettings();
      setBizSettings(bizS);
    } catch (e) {
      console.error("Failed to fetch business data:", e);
    }
  };

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
        status: newPurchaseData.status as any,
      });

      await fetchPurchases();
      setIsAddingPurchase(false);
      setNewPurchaseData({
        user_email: '', template_id: '', template_title: '', amount_paid: 0,
        transaction_id: 'MANUAL-' + Math.random().toString(36).substring(7).toUpperCase(),
        status: 'approved'
      });
      toast({ title: "Success", description: "Manual purchase created!" });
    } catch (error) {
      console.error("Manual purchase creation failed:", error);
      toast({ title: "Error", description: "Failed to create manual purchase.", variant: "destructive" });
    }
  };

  // Business System Handlers
  const handleRegisterBusiness = async () => {
    try {
      if (!newBizData.business_name || !newBizData.email || !newBizData.password_hash) {
        toast({ title: "Error", description: "Required fields missing.", variant: "destructive" });
        return;
      }

      const slug = newBizData.business_name.toLowerCase().replace(/\s+/g, '-');
      const limit = newBizData.package_type === '4999' ? 999999 : newBizData.package_type === '799' ? 1500 : 600;

      await BusinessService.registerBusiness({
        ...newBizData,
        business_slug: slug,
        frame_limit: limit,
        // The service already handles custom_package_price and custom_domain from spreading newBizData
      } as any);

      toast({ title: "Success", description: "Business registered successfully!" });
      setNewBizData({ business_name: '', logo_url: '', email: '', password_hash: '', instagram_id: '', whatsapp_number: '', package_type: '299', frame_limit: 600, custom_domain: '', custom_package_price: undefined });
      fetchBizData();
      setActiveTab('biz-history');
    } catch (error: any) {
      console.error(error);
      toast({ title: "Error", description: error.message || "Failed to register business.", variant: "destructive" });
    }
  };

  const handleRenewPlan = async (client: any) => {
    try {
      let validityText = '28 days';
      if (client.package_type === '4999' || client.package_type === 'enterprise') validityText = 'Lifetime';
      else if (client.package_type === '799' || client.package_type === 'pro') validityText = '1 year';
      
      await BusinessService.renewSubscription(client.id);
      toast({ title: "Success", description: `Plan renewed for ${validityText}!` });
      fetchBizData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to renew plan.", variant: "destructive" });
    }
  };

  const handleApproveUpgrade = async (request_id: string, client_id: string, new_package: string) => {
    try {
      const limit = (new_package === '4999' || new_package === 'enterprise') ? 999999 : new_package === '799' ? 1500 : 600;
      await BusinessService.approveUpgradeRequest(request_id, client_id, new_package, limit);
      toast({ title: "Success", description: "Upgrade request approved!" });
      fetchBizData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to approve upgrade.", variant: "destructive" });
    }
  };

  const handleRejectUpgrade = async (request_id: string) => {
    try {
      await BusinessService.rejectUpgradeRequest(request_id);
      toast({ title: "Success", description: "Upgrade request rejected." });
      fetchBizData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to reject upgrade.", variant: "destructive" });
    }
  };

  const handleToggleBizStatus = async (client_id: string, current_status: boolean) => {
    try {
      await BusinessService.toggleClientStatus(client_id, !current_status);
      fetchBizData();
      toast({ title: "Success", description: `Account ${current_status ? 'Suspended' : 'Activated'}` });
    } catch (error) {
      toast({ title: "Error", description: "Operation failed.", variant: "destructive" });
    }
  };

  const handleDeleteBiz = async (client_id: string) => {
    console.log("[Admin] Attempting to delete business:", client_id);
    try {
      // Direct delete - no confirm() dialog which can be blocked by browsers
      const { error } = await supabase.from('business_clients').delete().eq('id', client_id);
      if (error) {
        console.error("[Admin] Supabase delete error:", error);
        throw error;
      }
      console.log("[Admin] Delete success. Refreshing data...");
      await fetchBizData();
      toast({ title: "✅ Deleted", description: "Business account removed successfully." });
    } catch (error: any) {
      console.error("[Admin] Delete failed:", error);
      toast({ title: "Delete Failed", description: error.message || "Permission denied. Check RLS policies.", variant: "destructive" });
    }
  };

  const handleSaveBizPaymentSettings = async () => {
    try {
      await BusinessService.updatePaymentSettings(bizSettings.upi_id, bizSettings.qr_code_url);
      toast({ title: "Success", description: "Payment settings updated." });
      fetchBizData();
    } catch (error) {
      toast({ title: "Error", description: "Failed to update payment settings.", variant: "destructive" });
    }
  };

  const handleApproveRegRequest = async (id: string) => {
    try {
      const { data: req, error: selErr } = await supabase.from('business_registration_requests').select('*').eq('id', id).single();
      if (selErr) throw selErr;

      const { error } = await supabase.rpc('approve_business_request', {
        p_request_id: id,
        p_password: req.password_plain
      });
      if (error) throw error;

      setBizRegRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
      toast({ title: "Approved!", description: "Business client account has been securely provisioned & activated." });
      fetchBizRegRequests();
      fetchBizData();
    } catch (e: any) {
      toast({ title: "Approval Error", description: e.message || "Failed to approve request", variant: "destructive" });
    }
  };

  const handleRejectRegRequest = async (id: string) => {
    try {
      const { error } = await supabase.from('business_registration_requests').update({ status: 'rejected' }).eq('id', id);
      if (error) throw error;
      setBizRegRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
      toast({ title: "Rejected", description: "Request marked as rejected." });
      fetchBizRegRequests();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleApprovePersonalRequest = async (id: string) => {
    try {
      const { error } = await supabase.rpc('approve_personal_request', { p_request_id: id });
      if (error) throw error;
      toast({ title: "Success", description: "Personal user approved and synchronized." });
      fetchPersonalRegRequests();
    } catch (e: any) {
      toast({ title: "Error", description: e.message || "Approval failed.", variant: "destructive" });
    }
  };

  const handleDeleteRegRequest = async (id: string) => {
    try {
      const { error } = await supabase.from('business_registration_requests').delete().eq('id', id);
      if (error) throw error;
      setBizRegRequests(prev => prev.filter(r => r.id !== id));
      toast({ title: "Deleted", description: "Request securely deleted." });
      fetchBizRegRequests();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
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
      if (settings.hero_special_offer) await SettingsService.updateSetting('hero_special_offer', settings.hero_special_offer);
      toast({ title: "Success", description: "Settings updated successfully." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
    }
  };

  const handleSavePriceSettings = async () => {
    try {
      // 1. Save Personal Pricing
      await SettingsService.updateSetting('album_pricing', JSON.stringify(personalPricing));

      // 2. Save Business Packages
      for (const pkg of activePackages) {
        await BusinessService.updatePackage(pkg.id, {
          price: pkg.price,
          frame_limit: pkg.frame_limit,
          is_active: pkg.is_active
        });
      }

      toast({ title: "Success", description: "Pricing updated globally across all apps!" });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
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
      {/* Sidebar BackDrop for Mobile */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-[#0f090d] border-r border-white/5 flex flex-col fixed h-full z-50 transform transition-transform md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 group">
            <Logo textSize="text-lg" />
            <span className="text-[8px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-bold uppercase -mt-4">Admin</span>
          </Link>
        </div>

        <nav className="flex-1 mt-4 overflow-y-auto scrollbar-hide">
          <div className="px-4 py-2 text-[10px] font-bold text-white/30 uppercase tracking-widest">Management</div>
          <button
            onClick={() => { setActiveTab('purchases'); setIsSidebarOpen(false); }}
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
            onClick={() => { setActiveTab('payments'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'payments' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <CreditCard className="w-5 h-5" />
            Payments
          </button>
          <button
            onClick={() => { setActiveTab('users'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Users className="w-5 h-5" />
            Users
          </button>
          <button
            onClick={() => { setActiveTab('templates'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'templates' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Templates
          </button>
          <button
            onClick={() => { setActiveTab('magic-frames'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'magic-frames' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Sparkles className="w-5 h-5 text-[#f04299]" />
            Magic Frame Monitoring
            {pendingArCreations.length > 0 && (
              <span className="ml-auto bg-[#f04299] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {pendingArCreations.length}
              </span>
            )}
          </button>
          <button
            onClick={() => { setActiveTab('ar-approvals'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'ar-approvals' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <ImageIcon className="w-5 h-5" />
            Album Approvals
            {arAlbums.filter(a => a.approval_status === 'pending').length > 0 && (
              <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {arAlbums.filter(a => a.approval_status === 'pending').length}
              </span>
            )}
          </button>
          <button
            onClick={() => { setActiveTab('ar'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'ar' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <ScanLine className="w-5 h-5" />
            All Albums
          </button>
          <button
            onClick={() => { setActiveTab('analytics'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'analytics' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </button>
          <button
            onClick={() => { setActiveTab('contact'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'contact' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Mail className="w-5 h-5" />
            Contact Leads
            {contactRequests.filter(r => r.status === 'new').length > 0 && (
              <span className="ml-auto bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {contactRequests.filter(r => r.status === 'new').length}
              </span>
            )}
          </button>
          <button
            onClick={() => { setActiveTab('bundles'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'bundles' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Gift className="w-5 h-5" />
            Bundles & Pricing
          </button>

          <div className="px-4 py-4 mt-4 text-[10px] font-bold text-white/30 uppercase tracking-widest border-t border-white/5">Business System</div>
          <button
            onClick={() => { setActiveTab('biz-register'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'biz-register' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Plus className="w-5 h-5" />
            Register Business
          </button>
          <button
            onClick={() => { setActiveTab('biz-history'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'biz-history' ? 'bg-primary/10 text-primary border-r-2 border-primary' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Users className="w-5 h-5" />
            Registered Vendors
          </button>

          <button
            onClick={() => { setActiveTab('personal-reg'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-6 py-3.5 text-sm font-medium transition-colors ${activeTab === 'personal-reg' ? 'bg-[#f04299]/10 text-[#f04299] border-r-2 border-[#f04299]' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
          >
            <Sparkles className="w-5 h-5" />
            Users Monitoring
            {personalRegRequests.filter(r => r.status === 'pending').length > 0 && (
              <span className="ml-auto bg-[#f04299] text-white text-xs font-bold px-2 py-0.5 rounded-full">{personalRegRequests.filter(r => r.status === 'pending').length}</span>
            )}
          </button>

          <div className="px-4 py-4 mt-2 text-[10px] font-bold text-white/30 uppercase tracking-widest border-t border-white/5">Settings</div>
          <button
            onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
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
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto h-screen">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            {/* Burger menu for Mobile */}
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-white/5 border border-white/10 rounded-xl md:hidden text-white">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-3xl font-black capitalize">{activeTab} Dashboard</h2>
              <p className="text-white/40 text-sm">Manage your platform resources</p>
            </div>
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

        {activeTab === 'magic-frames' && (
          <div className="space-y-8">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl border-l-4 border-l-[#f04299]">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-[#f04299]/10 rounded-xl"><Sparkles className="w-5 h-5 text-[#f04299]" /></div>
                  <span className="text-[10px] font-bold text-[#f04299] px-2 py-1 bg-[#f04299]/10 rounded-full uppercase">Monitoring</span>
                </div>
                <h3 className="text-white/60 text-sm font-medium">Pending Magic Frames</h3>
                <p className="text-4xl font-black mt-1">{pendingArCreations.length}</p>
              </motion.div>
            </section>

            <section className="glass-card rounded-2xl overflow-hidden border border-white/5">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white">Live AR Creation Stream</h3>
                <button onClick={fetchPendingArCreations} className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors">
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                    <tr>
                      <th className="px-6 py-4">Created At</th>
                      <th className="px-6 py-4">Ref / Source</th>
                      <th className="px-6 py-4">Frame Details</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pendingArCreations.length === 0 ? (
                      <tr><td colSpan={5} className="p-12 text-center text-white/20">System Idle — No pending magic frame tasks</td></tr>
                    ) : pendingArCreations.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="text-sm font-medium">{new Date(item.created_at).toLocaleDateString()}</div>
                          <div className="text-[10px] text-white/30">{new Date(item.created_at).toLocaleTimeString()}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-[11px] font-mono text-primary/80 mb-1">{item.order_id || 'LOCAL-SYNC'}</div>
                          <div className="text-[9px] text-white/40 select-all">{item.client_id || 'Personal/Guest'}</div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                              {item.payload?.image_url ? (
                                <img src={item.payload.image_url} className="w-8 h-8 rounded border border-white/10 object-cover" alt="img" />
                              ) : <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center border border-white/10"><ImageIcon className="w-3 h-3 opacity-20" /></div>}
                              {item.payload?.video_url ? (
                                <div className="w-8 h-8 rounded border border-white/10 bg-black flex items-center justify-center"><Play className="w-3 h-3 text-emerald-400" /></div>
                              ) : <div className="w-8 h-8 rounded bg-white/5 border border-white/10 flex items-center justify-center"><Plus className="w-3 h-3 opacity-20" /></div>}
                            </div>
                            <div>
                              <div className="font-bold text-sm text-white/90">{item.payload?.title || 'Magic Frame'}</div>
                              <div className="text-[10px] text-white/40">{item.payload?.phone_number}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${item.status === 'paid' ? 'bg-emerald-500' : 'bg-[#f04299] animate-pulse'}`} />
                            <span className={`text-[10px] font-black uppercase tracking-wider ${item.status === 'paid' ? 'text-emerald-500' : 'text-primary'}`}>
                              {item.status === 'paid' ? 'PAID / READY' : item.status || 'AWAITING PAYMENT'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={async () => {
                                try {
                                  await supabase.from('ar_albums').insert({
                                    ...item.payload,
                                    is_active: true,
                                    approval_status: 'approved',
                                    payment_status: 'paid',
                                    cf_order_id: item.order_id
                                  });
                                  await supabase.from('pending_ar_creations').delete().eq('id', item.id);
                                  toast({ title: "Activated", description: "The Magic Frame is now live!" });
                                  fetchPendingArCreations();
                                } catch (e: any) {
                                  toast({ title: "Error", description: e.message, variant: "destructive" });
                                }
                              }}
                              className="p-1.5 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                supabase.from('pending_ar_creations').delete().eq('id', item.id).then(() => fetchPendingArCreations());
                              }}
                              className="p-1.5 bg-white/5 text-white/20 hover:text-white hover:bg-white/10 rounded transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
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
                          <label htmlFor="edit_template_title" className="text-xs font-bold uppercase tracking-widest text-white/40">Title</label>
                          <input
                            id="edit_template_title"
                            name="title"
                            value={editingTemplate.title}
                            onChange={(e) => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="edit_template_price" className="text-xs font-bold uppercase tracking-widest text-white/40">Price (₹)</label>
                            <input
                              id="edit_template_price"
                              name="price"
                              type="number"
                              value={editingTemplate.price}
                              onChange={(e) => setEditingTemplate({ ...editingTemplate, price: parseInt(e.target.value) })}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="edit_template_originalPrice" className="text-xs font-bold uppercase tracking-widest text-white/40">Original Price (₹)</label>
                            <input
                              id="edit_template_originalPrice"
                              name="originalPrice"
                              type="number"
                              value={editingTemplate.originalPrice || editingTemplate.price}
                              onChange={(e) => setEditingTemplate({ ...editingTemplate, originalPrice: parseInt(e.target.value) })}
                              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="edit_template_category" className="text-xs font-bold uppercase tracking-widest text-white/40">Category</label>
                          <select
                            id="edit_template_category"
                            name="category"
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
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x300?text=Invalid+Image'; }}
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

        {/* Contact Requests Tab */}
        {activeTab === 'contact' && (
          <section className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-white/5">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 font-display">Inquiry Hub</h3>
                  <p className="text-white/40 text-sm">Strategic partnerships and digital experience enquiries.</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center group">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest group-hover:text-primary transition-colors">Pending</p>
                    <p className="text-xl font-black">{contactRequests.filter(r => r.status === 'new').length}</p>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10 self-center"></div>
                  <div className="text-center group">
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">Replied</p>
                    <p className="text-xl font-black">{contactRequests.filter(r => r.status === 'replied').length}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-x-scroll">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-widest border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4">Identity</th>
                    <th className="px-6 py-4">Communication</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {contactRequests.map((req) => (
                    <motion.tr key={req.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center text-primary font-black border border-primary/20">{req.name.substring(0, 1).toUpperCase()}</div>
                          <div>
                            <div className="font-bold text-sm text-white/90">{req.name}</div>
                            <div className="text-[10px] text-white/30">{new Date(req.created_at).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="text-[10px] text-primary select-all">{req.email}</div>
                      </td>
                      <td className="px-6 py-4 max-w-md">
                        <div className="font-bold text-xs text-white/60 mb-1">{req.subject}</div>
                        <div className="text-sm text-white/40 line-clamp-2 hover:line-clamp-none cursor-default transition-all">{req.message}</div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={req.status}
                          onChange={(e) => handleUpdateContactStatus(req.id, e.target.value)}
                          className={`bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[10px] font-bold uppercase transition-all focus:outline-none ${req.status === 'new' ? 'text-primary border-primary/20' :
                            req.status === 'replied' ? 'text-emerald-500 border-emerald-500/20' :
                              'text-white/20'
                            }`}
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <a href={`mailto:${req.email}?subject=RE: ${req.subject}`} className="inline-flex items-center gap-2 bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                          <Send className="w-3 h-3" /> Reply
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                  {contactRequests.length === 0 && (
                    <tr><td colSpan={4} className="p-8 text-center text-white/40">No contact requests found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'ar-approvals' && (
          <section className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-white/5">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">AR Album Approvals</h3>
                  <p className="text-white/40 text-sm">Verify and manage magic frame activations.</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setArApprovalSubTab("pending")}
                    className={`text-sm font-bold pb-2 border-b-2 transition-colors ${arApprovalSubTab === 'pending' ? 'text-white border-primary' : 'text-white/40 border-transparent hover:text-white'}`}
                  >
                    Pending ({arAlbums.filter(a => a.approval_status === 'pending').length})
                  </button>
                  <button
                    onClick={() => setArApprovalSubTab("all")}
                    className={`text-sm font-bold pb-2 border-b-2 transition-colors ${arApprovalSubTab === 'all' ? 'text-white border-primary' : 'text-white/40 border-transparent hover:text-white'}`}
                  >
                    All History
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Created At</th>
                    <th className="px-6 py-4">Album Details</th>
                    <th className="px-6 py-4">Vendor/User</th>
                    <th className="px-6 py-4">Order / Ref</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {(arApprovalSubTab === 'pending' ? arAlbums.filter(a => a.approval_status === 'pending') : arAlbums).length === 0 ? (
                    <tr><td colSpan={7} className="p-8 text-center text-white/40">No records found.</td></tr>
                  ) : (arApprovalSubTab === 'pending' ? arAlbums.filter(a => a.approval_status === 'pending') : arAlbums).map((album) => (
                    <motion.tr key={album.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-sm font-medium">{new Date(album.created_at).toLocaleDateString()}</div>
                        <div className="text-[10px] text-white/30">{new Date(album.created_at).toLocaleTimeString()}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="font-bold text-white mb-2">{album.title}</div>
                        <div className="flex gap-2">
                          {album.image_url && (
                            <div className="group relative">
                              <img src={album.image_url} className="w-12 h-12 object-cover rounded-lg border border-white/10" alt="Ref" />
                              <a href={album.image_url} target="_blank" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg"><Plus className="w-4 h-4" /></a>
                            </div>
                          )}
                          {album.video_url && (
                            <div className="group relative">
                              <video src={album.video_url} className="w-12 h-12 object-cover rounded-lg border border-white/10" muted />
                              <a href={album.video_url} target="_blank" className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg"><Plus className="w-4 h-4" /></a>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-bold text-white/90">{album.client?.business_name || 'Personal User'}</div>
                        <div className="text-[10px] text-white/40 font-mono">{album.phone_number || album.user_email}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[10px] text-white/40 mb-1">Gateway Ref:</div>
                        <code className="bg-white/5 px-2 py-1 rounded text-[11px] text-primary/80 font-mono">
                          {album.cf_order_id || album.manual_transaction_id || 'N/A'}
                        </code>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm font-black text-emerald-500">₹{album.amount_paid || 0}</div>
                        <div className="text-[9px] uppercase font-bold text-white/30">{album.payment_status || 'Unpaid'}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${album.approval_status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' :
                          album.approval_status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                            'bg-primary/10 text-primary'
                          }`}>
                          {album.approval_status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          {album.approval_status === 'pending' && (
                            <>
                              <button onClick={() => handleApproveAlbum(album.id)} className="p-2 bg-emerald-500 text-white rounded-lg hover:scale-105 transition-all shadow-lg shadow-emerald-500/20">
                                <Check className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleRejectAlbum(album.id)} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-500/20">
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
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

        {/* Personal Registration Monitoring Tab */}
        {activeTab === 'personal-reg' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <header className="space-y-1">
                <h3 className="text-3xl font-black text-[#f04299]">Personal-Reg Dashboard</h3>
                <p className="text-white/40 text-sm">Full administrative control over individual magic enthusiasts.</p>
              </header>
              <div className="flex gap-3">
                <button 
                  onClick={fetchPersonalRegRequests}
                  className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all text-white/60 hover:text-white"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <div className="glass-card-static rounded-xl px-4 py-2 border border-white/10 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#f04299]" />
                  <span className="text-sm font-bold">{personalRegRequests.length} Users</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {personalRegRequests.map((user) => {
                const userAlbums = arAlbums.filter(a => a.phone_number === user.email || a.user_email === user.email);
                const isExpanded = expandedUserEmail === user.email;
                const totalSpent = userAlbums.reduce((sum, a) => sum + (a.amount_paid || 0), 0);

                return (
                  <motion.div 
                    layout
                    key={user.id} 
                    className={`glass-card rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 ${isExpanded ? 'ring-2 ring-[#f04299]/50 shadow-[0_0_40px_rgba(240,66,153,0.1)]' : 'hover:bg-white/[0.02]'}`}
                  >
                    <div className="p-6 md:p-8">
                      {/* User Header Info */}
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                        <div className="flex items-center gap-5">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#f04299]/20 to-transparent border border-[#f04299]/30 flex items-center justify-center text-2xl font-black text-[#f04299] shadow-inner">
                            {user.full_name?.substring(0, 1).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold flex items-center gap-2">
                              {user.full_name}
                              {user.status === 'approved' && <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" title="Verified User" />}
                            </h4>
                            <p className="text-sm text-white/40 font-medium">{user.email}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-[10px] font-black uppercase tracking-widest text-[#f04299]/60 flex items-center gap-1.5">
                                <Clock className="w-3 h-3" /> Joined {new Date(user.created_at).toLocaleDateString()}
                              </span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60 flex items-center gap-1.5">
                                <CreditCard className="w-3 h-3" /> ₹{totalSpent} Spent
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                          <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                            user.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                            user.status === 'rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                            'bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse'
                          }`}>
                            {user.status || 'PENDING'}
                          </div>
                          
                          <div className="flex gap-2 ml-auto lg:ml-0">
                            <button 
                              onClick={() => setExpandedUserEmail(isExpanded ? null : user.email)}
                              className={`p-3 rounded-xl border transition-all flex items-center gap-2 text-sm font-bold ${
                                isExpanded ? 'bg-white text-black border-white' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'
                              }`}
                            >
                              <History className="w-4 h-4" /> 
                              {isExpanded ? 'Close Activity' : 'View Activity'}
                            </button>
                            <button 
                              onClick={() => setEditingPersonalUser(user)}
                              className="p-3 bg-[#f04299]/10 text-[#f04299] hover:bg-[#f04299] hover:text-white rounded-xl border border-[#f04299]/20 transition-all"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={async () => {
                                try {
                                  const { error } = await supabase.from('personal_registration_requests').delete().eq('id', user.id);
                                  if (error) throw error;
                                  toast({ title: "User Deleted", description: "All records have been purged." });
                                  fetchPersonalRegRequests();
                                } catch (e: any) {
                                  toast({ title: "Delete Failed", description: e.message, variant: "destructive" });
                                }
                              }}
                              className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl border border-red-500/20 transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Activity & Content */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="mt-8 pt-8 border-t border-white/5 space-y-8"
                          >
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Album Count</p>
                                <p className="text-2xl font-black">{userAlbums.length} Uploads</p>
                              </div>
                              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Successful Payments</p>
                                <p className="text-2xl font-black text-emerald-400">{userAlbums.filter(a => a.payment_status === 'paid').length}</p>
                              </div>
                              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Unpaid / Incomplete</p>
                                <p className="text-2xl font-black text-red-400">{userAlbums.filter(a => a.payment_status !== 'paid').length}</p>
                              </div>
                            </div>

                            {/* Detailed Album & Mapping Verification (A to Z) */}
                            <div>
                              <div className="flex items-center gap-2 mb-4">
                                <ScanLine className="w-5 h-5 text-[#f04299]" />
                                <h5 className="text-sm font-black uppercase tracking-widest">A to Z Mapping Verification</h5>
                              </div>
                              <div className="space-y-4">
                                {userAlbums.length === 0 ? (
                                  <div className="bg-white/[0.02] rounded-2xl p-10 text-center border border-dashed border-white/10">
                                    <p className="text-white/20 font-medium">No albums created by this user yet.</p>
                                  </div>
                                ) : (
                                  userAlbums.map((album, idx) => (
                                    <div key={album.id} className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:border-[#f04299]/20 transition-all flex flex-col md:flex-row gap-6">
                                      <div className="flex-none flex gap-3">
                                        <div className="space-y-2">
                                          <p className="text-[9px] font-black text-white/30 uppercase text-center">Trigger</p>
                                          <div className="w-24 h-24 rounded-xl border border-white/10 overflow-hidden group relative">
                                            <img src={album.image_url} className="w-full h-full object-cover" alt="target" />
                                            <a href={album.image_url} target="_blank" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                              <Eye className="w-5 h-5" />
                                            </a>
                                          </div>
                                        </div>
                                        <div className="flex items-center justify-center pt-8">
                                          <div className="h-[2px] w-6 bg-gradient-to-r from-[#f04299] to-emerald-500" />
                                        </div>
                                        <div className="space-y-2">
                                          <p className="text-[9px] font-black text-white/30 uppercase text-center">Video Content</p>
                                          <div className="w-24 h-24 rounded-xl border border-white/10 overflow-hidden group relative bg-black">
                                            <video src={album.video_url} className="w-full h-full object-cover" muted />
                                            <a href={album.video_url} target="_blank" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                              <Play className="w-5 h-5 text-emerald-500" />
                                            </a>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex-1 space-y-4">
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <p className="text-lg font-bold">{album.title || 'Untitled Magic'}</p>
                                            <p className="text-[10px] text-white/40 font-mono tracking-tighter">REF: {album.id}</p>
                                          </div>
                                          <div className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                            album.payment_status === 'paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-primary/10 text-primary border-primary/20'
                                          }`}>
                                            {album.payment_status?.toUpperCase() || 'UNPAID'}
                                          </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/5">
                                          <div>
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Creation Date</p>
                                            <p className="text-xs font-bold">{new Date(album.created_at).toLocaleDateString()} at {new Date(album.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                          </div>
                                          <div>
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Payment ID</p>
                                            <p className="text-xs font-mono text-primary/80 truncate max-w-[120px]">{album.cf_order_id || album.manual_transaction_id || 'N/A'}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}

              {personalRegRequests.length === 0 && (
                <div className="glass-card rounded-3xl p-20 text-center border border-dashed border-white/10">
                  <Sparkles className="w-12 h-12 text-[#f04299]/20 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-white/40">No personal registrations yet.</h4>
                  <p className="text-white/20 text-sm mt-2">New user signups from the app will appear here.</p>
                </div>
              )}
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

        {/* Pricing Settings Tab */}
        {activeTab === 'pricing' && (
          <div className="space-y-10">
            <header className="space-y-1">
              <h3 className="text-3xl font-black">Subscription & Global Pricing</h3>
              <p className="text-white/40 text-sm">Manage what you charge your Personal and Business customers.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Category */}
              <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary"><Users className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-xl font-bold">Personal Users</h4>
                    <p className="text-xs text-white/40 italic">Pay-per-Upload Model</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50">Current Price (₹)</label>
                    <input
                      type="number"
                      value={personalPricing.price}
                      onChange={(e) => setPersonalPricing({ ...personalPricing, price: parseInt(e.target.value) })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40">Market Price (MRP ₹)</label>
                    <input
                      type="number"
                      value={personalPricing.original_mrp}
                      onChange={(e) => setPersonalPricing({ ...personalPricing, original_mrp: parseInt(e.target.value) })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 opacity-60"
                    />
                  </div>
                </div>
                <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
                  <p className="text-[10px] text-white/60 leading-relaxed">
                    <span className="text-primary font-bold">Note:</span> This price applies to all users using the "Magic Frame" personal dashboard in the mobile app. Update reflects instantly.
                  </p>
                </div>
              </div>

              {/* Business System Category */}
              <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500"><Gift className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-xl font-bold">Business Packages</h4>
                    <p className="text-xs text-white/40 italic">B2B SaaS Model (28-day plans)</p>
                  </div>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {activePackages.map((pkg, idx) => (
                    <div key={pkg.id || idx} className="bg-white/5 border border-white/5 rounded-2xl p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black uppercase text-emerald-400">{pkg.name || 'Package'}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={pkg.is_active !== false} onChange={(e) => {
                            const newList = [...activePackages];
                            newList[idx].is_active = e.target.checked;
                            setActivePackages(newList);
                          }} className="sr-only peer" />
                          <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                        </label>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-white/30 uppercase">Price (₹)</label>
                          <input
                            type="number"
                            value={pkg.price}
                            onChange={(e) => {
                              const newList = [...activePackages];
                              newList[idx].price = parseInt(e.target.value);
                              setActivePackages(newList);
                            }}
                            className="w-full bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-bold text-white/30 uppercase">Frame Limit</label>
                          <input
                            type="number"
                            value={pkg.frame_limit}
                            onChange={(e) => {
                              const newList = [...activePackages];
                              newList[idx].frame_limit = parseInt(e.target.value);
                              setActivePackages(newList);
                            }}
                            className="w-full bg-black/40 border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button
                onClick={handleSavePriceSettings}
                className="bg-primary text-white font-black px-12 py-5 rounded-2xl shadow-[0_0_30px_rgba(240,66,153,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-3 text-sm uppercase tracking-widest"
              >
                <Save className="w-5 h-5" /> Save Global Prices
              </button>
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

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">Instagram Profile URL</label>
                <input
                  value={settings.instagram_url || ''}
                  onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="https://instagram.com/..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-[#f04299]/60">Hero Special Offer Text</label>
                <input
                  value={settings.hero_special_offer || ''}
                  onChange={(e) => setSettings({ ...settings, hero_special_offer: e.target.value })}
                  className="w-full bg-black/40 border border-[#f04299]/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f04299]/50"
                  placeholder="e.g. Summer Special Sale"
                />
                <p className="text-[10px] text-white/30 italic">Appears at the very top of the home page landing.</p>
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

        {/* AR CMS Tab */}
        {activeTab === 'ar' && (
          <div className="space-y-6">
            <ARUpload />
          </div>
        )}

        {/* Business Register Tab */}
        {activeTab === 'biz-register' && (
          <div className="max-w-2xl mx-auto glass-card p-8 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-black mb-6">Register New Business</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white/40">Business Name</label>
                <input
                  value={newBizData.business_name}
                  onChange={(e) => setNewBizData({ ...newBizData, business_name: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="e.g. Magic Studio"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white/40">Upload Business Logo</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      try {
                        const filePath = `logos/new_${Date.now()}_logo`;
                        const publicUrl = await uploadFileToR2(file, filePath, 'ar-assets');
                        setNewBizData({ ...newBizData, logo_url: publicUrl });
                        toast({ title: "Success", description: "Logo uploaded to storage." });
                      } catch (error: any) {
                        toast({ title: "Error", description: error.message, variant: "destructive" });
                      }
                    }}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none file:bg-primary/20 file:text-primary file:border-0 file:rounded-xl file:px-2 file:py-1 cursor-pointer"
                  />
                  {newBizData.logo_url && <span className="text-xs text-green-400 font-bold whitespace-nowrap">Uploaded!</span>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white/40">Email ID</label>
                <input
                  type="email"
                  value={newBizData.email}
                  onChange={(e) => setNewBizData({ ...newBizData, email: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="client@email.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white/40">Password</label>
                <input
                  type="password"
                  value={newBizData.password_hash}
                  onChange={(e) => setNewBizData({ ...newBizData, password_hash: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="Set login password"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white/40">Instagram ID (Optional)</label>
                <input
                  value={newBizData.instagram_id}
                  onChange={(e) => setNewBizData({ ...newBizData, instagram_id: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="@handle"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white/40">WhatsApp Number</label>
                <input
                  value={newBizData.whatsapp_number}
                  onChange={(e) => setNewBizData({ ...newBizData, whatsapp_number: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="+91XXXXXXXXXX"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white/40">Package Plan</label>
                <select
                  value={newBizData.package_type}
                  onChange={(e) => setNewBizData({ ...newBizData, package_type: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                >
                  <option value="299">₹299 — 600 Magic Frames</option>
                  <option value="799">₹799 — 1500 Magic Frames</option>
                  <option value="4999">₹4999 — Own Website + Unlimited</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white/40">Custom Domain (Optional)</label>
                <input
                  value={newBizData.custom_domain}
                  onChange={(e) => setNewBizData({ ...newBizData, custom_domain: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="e.g. client.com"
                />
                <p className="text-[10px] text-white/30 italic">Must point A/CNAME to Vercel first.</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-white/40">Custom Package Price (Optional)</label>
                <input
                  type="number"
                  value={newBizData.custom_package_price || ''}
                  onChange={(e) => setNewBizData({ ...newBizData, custom_package_price: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                  placeholder="e.g. 400"
                />
                <p className="text-[10px] text-white/30 italic">Overrides the default package price for this client.</p>
              </div>

              <button
                onClick={handleRegisterBusiness}
                className="w-full bg-primary text-white font-bold py-4 rounded-xl mt-4 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
              >
                Create Business Account
              </button>
            </div>
          </div>
        )}

        {/* Magic Frame Monitoring (Duplicate Tab Removed) */}

        {/* Business Clients Tab */}
        {activeTab === 'biz-history' && (
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-white/5 bg-white/[0.01]">
              <h3 className="text-xl font-bold">Vendor Network Management</h3>
              <p className="text-white/40 text-xs">Complete tracking of business partners and subscription lifecycles.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-widest border-b border-white/5">
                  <tr>
                    <th className="px-6 py-4">Vendor Details</th>
                    <th className="px-6 py-4">Plan & Package</th>
                    <th className="px-6 py-4">Gateway Tracking</th>
                    <th className="px-6 py-4">History & Dates</th>
                    <th className="px-6 py-4 text-right">Status & Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {businessClients.map((biz) => (
                    <tr key={biz.id} className="hover:bg-white/[0.02] transition-colors border-b border-white/5">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img src={biz.logo_url || 'https://placehold.co/40'} className="w-10 h-10 rounded-xl object-cover border border-white/10" onError={(e) => { e.currentTarget.src = 'https://placehold.co/40'; }} alt="logo" />
                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${biz.is_active ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-primary">{biz.business_name}</div>
                            <div className="flex items-center gap-2">
                              <div className="text-[10px] text-white/50 font-medium">
                                {biz.custom_domain || `${biz.business_slug}.giftmagic.beauty`}
                              </div>
                              {biz.instagram_id && (
                                <a href={`https://instagram.com/${biz.instagram_id.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-[9px] text-primary/60 hover:text-primary transition-colors">
                                  @{biz.instagram_id.replace('@', '')}
                                </a>
                              )}
                            </div>
                            <div className="flex flex-col gap-0.5 mt-1">
                              <div className="text-[10px] text-white/30 flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" /> {biz.email}</div>
                              {biz.whatsapp_number && <div className="text-[10px] text-white/30 flex items-center gap-1.5"><Phone className="w-2.5 h-2.5" /> {biz.whatsapp_number}</div>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="text-white text-[11px] font-bold mb-1">
                            {biz.package_type === '4999' ? 'Magic Enterprise' : biz.package_type === '799' ? 'Pro Studio' : 'Starter Kit'}
                          </span>
                          <span className="text-primary text-sm font-black">₹{biz.custom_package_price || biz.package_type}</span>
                          <div className="mt-2">
                            <div className="flex justify-between items-center text-[9px] mb-1">
                              <span className="text-white/40 font-bold uppercase tracking-tighter">Usage: {biz.frames_used}</span>
                              <span className="text-white/60 font-black">{Math.round((biz.frames_used / (biz.frame_limit || 1)) * 100)}%</span>
                            </div>
                            <div className="w-24 bg-white/5 h-1 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${Math.min(100, (biz.frames_used / (biz.frame_limit || 1)) * 100)}%` }} />
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[11px] font-mono text-white/80 bg-white/5 px-2 py-1.5 rounded border border-white/5 inline-block">
                          {(biz as any).last_order_id || biz.id.split('-')[0].toUpperCase()}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <CreditCard className="w-3 h-3 text-white/20" />
                          <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter">Payment Captured</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-3">
                          <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Registered On</p>
                            <p className="text-[11px] font-medium text-white/70">{new Date(biz.subscription_start_date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Expiry / Renewal</p>
                            {(() => {
                              let nextDate: Date;
                              if (biz.next_renewal_date) {
                                nextDate = new Date(biz.next_renewal_date);
                              } else {
                                nextDate = new Date(biz.subscription_start_date);
                                let validityDays = 28;
                                const pType = biz.package_type as any;
                                if (pType === '4999' || pType === 'enterprise') validityDays = 36500;
                                else if (pType === '799' || pType === 'pro') validityDays = 365;
                                nextDate.setDate(nextDate.getDate() + validityDays);
                              }
                              
                              const isLifetime = ((biz.package_type as any) === '4999' || (biz.package_type as any) === 'enterprise');
                              if (isLifetime) return <p className="text-[11px] font-black text-emerald-400">Lifetime Access</p>;
                              
                              const daysLeft = Math.ceil((nextDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                              return <p className={`text-[11px] font-black ${daysLeft <= 5 ? 'text-red-500' : 'text-emerald-400'}`}>{nextDate.toLocaleDateString()} ({daysLeft}d)</p>
                            })()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex flex-col items-end gap-3">
                          <div className={`text-[9px] px-2.5 py-1 rounded-full font-black uppercase tracking-widest border ${biz.is_active ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}>
                            {biz.is_active ? 'Active' : 'Suspended'}
                          </div>
                          <div className="flex items-center gap-1.5 mt-1">
                            <button onClick={() => handleRenewPlan(biz)} title="Renew ID" className="p-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-xl border border-emerald-500/20 transition-all"><RefreshCw className="w-4 h-4" /></button>
                            <button onClick={() => setEditingBiz(biz)} className="p-2 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-xl border border-primary/20 transition-all"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => handleToggleBizStatus(biz.id, biz.is_active)} title="Block/Active" className="p-2 bg-white/5 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-all">{biz.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                            <button onClick={() => handleDeleteBiz(biz.id)} className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl border border-red-500/20 transition-all"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {/* Join with Pending Registration Requests */}
                  {bizRegRequests.map((req) => (
                    <tr key={req.id} className="bg-white/[0.02] hover:bg-white/[0.04] transition-colors border-b border-primary/10">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Building className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-bold text-sm text-white/90">{req.business_name}</div>
                            <div className="flex items-center gap-2">
                              <div className="text-[10px] text-primary/60 font-black uppercase tracking-widest">Enrolling...</div>
                              <div className="text-[10px] text-white/60 font-bold px-1.5 py-0.5 bg-white/5 rounded">Owner: {req.contact_person}</div>
                            </div>
                            <div className="flex flex-col gap-0.5 mt-1.5">
                              <div className="text-[10px] text-white/30 flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" /> {req.email}</div>
                              <div className="text-[10px] text-white/30 flex items-center gap-1.5"><Phone className="w-2.5 h-2.5" /> {req.whatsapp_number || req.phone || 'N/A'}</div>
                              {req.instagram_id && <div className="text-[10px] text-white/30 flex items-center gap-1.5"><Instagram className="w-2.5 h-2.5" /> {req.instagram_id}</div>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-white text-[11px] font-bold mb-1">{req.package_name || 'Selected Package'}</div>
                        <div className="text-white/60 text-sm font-black">₹{req.package_price}</div>
                      </td>
                      <td className="px-6 py-5">
                        <div className={`inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border ${req.payment_status?.toUpperCase() === 'PAID' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-primary/10 border-primary/20 text-primary animate-pulse'
                          }`}>
                          <Clock className="w-3 h-3" />
                          <span className="text-[10px] font-black uppercase tracking-tighter">
                            {req.payment_status || 'AWAITING PAYMENT'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mb-0.5">Registration Entry</p>
                        <p className="text-[11px] font-medium text-white/70">{new Date(req.created_at).toLocaleDateString()}</p>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Manual Fallback</span>
                          <div className="flex gap-2">
                            <button onClick={() => handleApproveRegRequest(req.id)} className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"><Check className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleRejectRegRequest(req.id)} className="p-2 bg-white/5 text-white/40 hover:text-white rounded-lg transition-colors"><X className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleDeleteRegRequest(req.id)} className="p-2 bg-white/5 text-red-500/40 hover:text-red-500 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {businessClients.length === 0 && bizRegRequests.length === 0 && (
                    <tr><td colSpan={5} className="p-16 text-center text-white/20">Zero business network found yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Registration Requests Tab */}
        {activeTab === 'reg-requests' && (
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">Vendor Registration Requests</h3>
              </div>
              <button onClick={fetchBizRegRequests} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                <RefreshCw className="w-4 h-4 text-white/60" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Business Info</th>
                    <th className="px-6 py-4">Package</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bizRegRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4">
                        <div className="font-bold text-sm text-white/90">{req.business_name}</div>
                        <div className="text-[10px] text-primary/60 font-bold mb-1">Owner: {req.contact_person}</div>
                        <div className="flex flex-col gap-0.5">
                          <div className="text-[10px] text-white/40 flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" /> {req.email}</div>
                          <div className="text-[10px] text-white/40 flex items-center gap-1.5"><Phone className="w-2.5 h-2.5" /> {req.whatsapp_number || req.phone || 'N/A'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-sm">₹{req.package_price}</td>
                      <td className="px-6 py-4">
                        <div className="text-[9px] uppercase font-black text-primary/80">{req.payment_status}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${req.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary/10 text-primary'}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => supabase.rpc('approve_business_request', { p_request_id: req.id }).then(() => fetchBizRegRequests())} className="p-1.5 bg-emerald-500 text-white rounded"><Check className="w-4 h-4" /></button>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleDeleteRegRequest(req.id)}
                            className="p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {bizRegRequests.length === 0 && (
                    <tr><td colSpan={5} className="p-8 text-center text-white/40">No pending registrations.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Registered Users Tab */}
        {activeTab === 'registered-users' && (
          <div className="glass-card rounded-2xl overflow-hidden border border-white/5">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">App User Network</h3>
                <p className="text-white/40 text-sm">Direct users registered through the Giftmagic app ecosystem.</p>
              </div>
              <button onClick={fetchRegisteredUsers} className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-colors">
                <RefreshCw className="w-4 h-4 text-white/60" />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-white/5 text-white/40 text-[10px] uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">Identity</th>
                    <th className="px-6 py-4">Communication</th>
                    <th className="px-6 py-4">Registered On</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {registeredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">{u.full_name?.substring(0, 2).toUpperCase()}</div>
                          <span className="font-bold text-sm">{u.full_name || 'Anonymous'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-white/60">{u.email}</td>
                      <td className="px-6 py-4 text-xs text-white/30">{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <AnimatePresence>
          {editingBiz && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card-static w-full max-w-lg p-8 rounded-3xl border border-white/10 relative"
              >
                <button
                  onClick={() => setEditingBiz(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-2xl font-black mb-6">Edit Client Package</h3>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-white/40">Business Name</label>
                    <input
                      disabled
                      value={editingBiz.business_name}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-white/40">Package Plan</label>
                    <select
                      value={editingBiz.package_type}
                      onChange={(e) => setEditingBiz({ ...editingBiz, package_type: e.target.value as any })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                    >
                      <option value="299">₹299 — 600 Magic Frames</option>
                      <option value="799">₹799 — 1500 Magic Frames</option>
                      <option value="4999">₹4999 — Own Website + Unlimited</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-white/40">Custom Frame Limit</label>
                    <input
                      type="number"
                      value={editingBiz.frame_limit === 999999 ? '' : editingBiz.frame_limit}
                      onChange={(e) => setEditingBiz({ ...editingBiz, frame_limit: e.target.value ? parseInt(e.target.value) : 600 })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                      placeholder="Enter custom limit if needed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-white/40">Custom Domain</label>
                    <input
                      value={editingBiz.custom_domain || ''}
                      onChange={(e) => setEditingBiz({ ...editingBiz, custom_domain: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                      placeholder="e.g. client.com"
                    />
                  </div>

                  <button
                    onClick={async () => {
                      if (!editingBiz) return;
                      try {
                        const limit = editingBiz.package_type === '4999' ? 999999 : editingBiz.frame_limit;
                        await BusinessService.updateClient(editingBiz.id, {
                          package_type: editingBiz.package_type,
                          frame_limit: limit,
                          custom_domain: editingBiz.custom_domain
                        });
                        toast({ title: "Success", description: "Package type updated." });
                        fetchBizData();
                        setEditingBiz(null);
                      } catch (error) {
                        toast({ title: "Error", description: "Update failed.", variant: "destructive" });
                      }
                    }}
                    className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform mt-4"
                  >
                    Save Package Changes
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {editingPersonalUser && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card-static w-full max-w-lg p-8 rounded-3xl border border-white/10 relative"
              >
                <button
                  onClick={() => setEditingPersonalUser(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-2xl font-black mb-6 text-[#f04299]">Edit Personal Enthusiast</h3>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-white/40">Full Name</label>
                    <input
                      value={editingPersonalUser.full_name}
                      onChange={(e) => setEditingPersonalUser({ ...editingPersonalUser, full_name: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f04299]/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-white/40">Email Address</label>
                    <input
                      value={editingPersonalUser.email}
                      disabled
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white/40 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-white/40">Registration Status</label>
                    <select
                      value={editingPersonalUser.status}
                      onChange={(e) => setEditingPersonalUser({ ...editingPersonalUser, status: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f04299]/50 appearance-none"
                    >
                      <option value="pending">Pending Review</option>
                      <option value="approved">Approved / Active</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-white/40">Admin Notes</label>
                    <textarea
                      value={editingPersonalUser.admin_notes || ''}
                      onChange={(e) => setEditingPersonalUser({ ...editingPersonalUser, admin_notes: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#f04299]/50 min-h-[100px]"
                      placeholder="Add internal notes about this user..."
                    />
                  </div>

                  {editingPersonalUser.status === 'pending' && (
                    <button
                      onClick={async () => {
                        try {
                          const { error } = await supabase.rpc('approve_personal_request', { p_request_id: editingPersonalUser.id });
                          if (error) throw error;
                          toast({ title: "User Approved", description: `${editingPersonalUser.full_name} is now active.` });
                          fetchPersonalRegRequests();
                          setEditingPersonalUser(null);
                        } catch (e: any) {
                          toast({ title: "Approval Failed", description: e.message, variant: "destructive" });
                        }
                      }}
                      className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-transform"
                    >
                      Quick Approve & Activate
                    </button>
                  )}

                  <button
                    onClick={async () => {
                      try {
                        const { error } = await supabase
                          .from('personal_registration_requests')
                          .update({ 
                            full_name: editingPersonalUser.full_name,
                            status: editingPersonalUser.status,
                            admin_notes: editingPersonalUser.admin_notes,
                            updated_at: new Date().toISOString()
                          })
                          .eq('id', editingPersonalUser.id);
                        
                        if (error) throw error;
                        toast({ title: "Updated", description: "User profile has been saved." });
                        fetchPersonalRegRequests();
                        setEditingPersonalUser(null);
                      } catch (e: any) {
                        toast({ title: "Update Failed", description: e.message, variant: "destructive" });
                      }
                    }}
                    className="w-full bg-[#f04299] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#f04299]/20 hover:scale-[1.02] transition-transform"
                  >
                    Save Changes
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
