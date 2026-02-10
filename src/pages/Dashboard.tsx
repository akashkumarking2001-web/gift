import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Gift, History, Settings, LogOut, Plus, Eye, Copy, Check, Bell, ChevronRight, Sparkles, Lock, Clock,
  CreditCard, Users, Code, AlertCircle, Instagram
} from "lucide-react";
import FloatingHearts from "../components/landing/FloatingHearts";
import { supabase } from "../lib/supabase";
import { GiftService } from "../lib/gifts";
import { PaymentService } from "../lib/payments";
import { PurchaseService, UserPurchase } from "../lib/purchaseService";
import { ProfileService } from "../lib/profileService";
import { TemplateService } from "../lib/templateService";
import { useToast } from "../hooks/use-toast";
import { TEMPLATES, TemplateDefinition } from "../lib/templates";
import CountdownTimer from "../components/CountdownTimer";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("templates");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [userGifts, setUserGifts] = useState<any[]>([]);
  const [purchases, setPurchases] = useState<UserPurchase[]>([]);
  const [allTemplates, setAllTemplates] = useState<TemplateDefinition[]>([]);
  const [userStats, setUserStats] = useState({ totalSpent: 0, transactionCount: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadDashboardData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }
      setUser(session.user);

      // Fetch profile
      // Fetch profile
      const profileData = await ProfileService.getProfile();
      setProfile(profileData);

      // Fetch user purchases
      try {
        const userPurchases = await PurchaseService.getUserPurchases();
        setPurchases(userPurchases);
      } catch (e) {
        console.error("Failed to load purchases", e);
      }

      // Fetch all templates
      try {
        const templates = await TemplateService.getAll();
        setAllTemplates(templates.length > 0 ? templates : TEMPLATES);
      } catch (e) {
        console.error("Failed to load templates", e);
        setAllTemplates(TEMPLATES);
      }

      // Fetch stats
      if (session.user.email) {
        try {
          const stats = await PaymentService.getUserStats(session.user.email);
          setUserStats({ totalSpent: stats.totalSpent, transactionCount: stats.transactionCount });
        } catch (e) {
          console.error("Failed to load stats", e);
        }
      }

      // Fetch gifts
      try {
        const gifts = await GiftService.getUserGifts();
        setUserGifts(gifts);
      } catch (e) {
        console.error("Failed to load gifts", e);
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboardData();
  }, [navigate]);

  const handleCreateGift = async (templateId: number) => {
    try {
      const newGift = await GiftService.createGift(templateId);
      navigate(`/editor/${newGift.id}`);
    } catch (error) {
      console.error("Failed to create gift:", error);
      toast({
        title: "Error",
        description: "Failed to initialize gift editor. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const copyLink = (uuid: string) => {
    const url = `${window.location.origin}/gift/${uuid}`;
    navigator.clipboard.writeText(url);
    setCopiedId(uuid);
    setTimeout(() => setCopiedId(null), 2000);
    toast({ title: "Link Copied!", description: "Share it with your loved one." });
  };

  const sidebarItems = [
    { id: "templates", label: "My Templates", icon: LayoutDashboard },
    { id: "gifts", label: "Gift History", icon: Gift },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "transactions", label: "Transactions", icon: History },
    { id: "wallet", label: "Wallet & Credits", icon: CreditCard },
    { id: "referrals", label: "Referrals", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "developer", label: "Developer", icon: Code },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          style={{ transform: 'translateZ(0)', willChange: 'transform', backfaceVisibility: 'hidden' }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-4xl"
        >
          💝
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <FloatingHearts />
      <div className="absolute inset-0 grid-paper-bg pointer-events-none" />

      {/* Background glow effects */}
      <div
        style={{ transform: 'translateZ(0)', willChange: 'opacity', backfaceVisibility: 'hidden' }}
        className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full pointer-events-none"
      />
      <div
        style={{ transform: 'translateZ(0)', willChange: 'opacity', backfaceVisibility: 'hidden' }}
        className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full pointer-events-none"
      />

      <header className="sticky top-0 z-50 glass-header px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Gift className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-black tracking-tight text-white group cursor-default">
            Gift<span className="gradient-text"> Magic</span> Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative w-10 h-10 rounded-xl glass-card-static flex items-center justify-center text-muted-foreground hover:text-white hover:border-white/20 transition-all">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-background" />
          </button>

          <div className="h-8 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-white leading-none mb-1">{profile?.full_name || user?.email?.split('@')[0]}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Premium User</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-secondary p-[1px]">
              <div className="w-full h-full rounded-[10px] bg-background flex items-center justify-center text-sm font-bold text-white">
                {profile?.full_name?.[0] || 'U'}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex min-h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-72 hidden lg:flex flex-col border-r border-white/5 p-6 space-y-8 bg-black/20 backdrop-blur-3xl">
          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all duration-300 relative group overflow-hidden ${activeTab === item.id
                  ? "text-primary bg-primary/5 shadow-[inset_0_0_20px_rgba(255,107,181,0.05)]"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
                  }`}
              >
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-full"
                  />
                )}
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-primary" : "group-hover:scale-110 transition-transform"}`} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-auto p-5 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-white/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl glass-card-static flex items-center justify-center text-primary text-xl">
                ₹
              </div>
              <div>
                <p className="text-[9px] font-black text-white/50 uppercase tracking-widest">Total Spent</p>
                <p className="text-lg font-black text-primary">₹{userStats.totalSpent}</p>
              </div>
            </div>
            <button className="w-full py-3 rounded-2xl bg-white text-black text-xs font-black hover:bg-primary hover:text-white transition-all duration-500 shadow-xl">
              UPGRADE PRO
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-4 rounded-2xl font-bold text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Logout Session
          </button>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {activeTab === "templates" && (
                <motion.div
                  key="templates"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="space-y-10"
                >
                  {/* My Purchased Templates Section */}
                  {purchases.length > 0 && (
                    <div className="space-y-6">
                      <div className="flex flex-col gap-2">
                        <h2 className="text-4xl font-black text-white tracking-tighter">My <span className="gradient-text">Templates</span></h2>
                        <p className="text-muted-foreground font-medium">Your purchased templates - ready to customize!</p>
                      </div>

                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {purchases.map((purchase, i) => {
                          const template = allTemplates.find(t => t.id.toString() === purchase.template_id);
                          const isLocked = purchase.status === 'pending';
                          const isRejected = purchase.status === 'rejected';

                          return (
                            <motion.div
                              key={purchase.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="group relative"
                              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                            >
                              <div className={`glass-card flex flex-col h-full ${isLocked ? 'opacity-75' : 'cursor-pointer hover:border-primary/50'} transition-all duration-500 overflow-hidden shadow-2xl`}>
                                {/* Locked Overlay */}
                                {isLocked && (
                                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
                                    <Lock className="w-12 h-12 text-primary mb-4 animate-pulse" />
                                    <h4 className="text-white font-bold text-lg mb-2">Template Locked</h4>
                                    <p className="text-white/60 text-sm mb-4">Your purchase is being reviewed</p>
                                    <div className="flex items-center gap-2 text-primary text-xs font-bold bg-primary/10 px-4 py-2 rounded-full">
                                      <Clock className="w-4 h-4" />
                                      Available within 2 hours
                                    </div>
                                  </div>
                                )}

                                {/* Rejected Overlay */}
                                {isRejected && (
                                  <div className="absolute inset-0 bg-red-950/90 backdrop-blur-md z-10 flex flex-col items-center justify-center p-6 text-center border-2 border-red-500/50 space-y-4">
                                    <div className="bg-red-500/20 p-3 rounded-full">
                                      <AlertCircle className="w-8 h-8 text-red-500" />
                                    </div>
                                    <div>
                                      <h4 className="text-white font-bold text-lg">Payment Rejected</h4>
                                      <p className="text-white/60 text-xs mt-1">Your payment was rejected.<br />Please resubmit your request.</p>
                                    </div>

                                    <Link
                                      to={`/checkout?templateId=${template?.id}&title=${encodeURIComponent(template?.title || '')}&price=${template?.price}&mrp=${template?.originalPrice}`}
                                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors w-full"
                                    >
                                      Re-request
                                    </Link>

                                    <div className="pt-2 border-t border-white/10 w-full">
                                      <a href="https://instagram.com/giftmagic" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 text-[10px] text-white/40 hover:text-white transition-colors">
                                        <Instagram className="w-3 h-3" />
                                        Contact us for quick ID activation
                                      </a>
                                    </div>
                                  </div>
                                )}

                                <div className={`h-40 bg-gradient-to-br ${template?.color || 'from-primary to-secondary'} opacity-20 group-hover:opacity-40 transition-all duration-700 flex items-center justify-center text-7xl relative overflow-hidden`}>
                                  <div>{template?.icon || '🎁'}</div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                  <div>
                                    <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2 block">{template?.category || 'Template'}</span>
                                    <h3 className="text-xl font-black text-white leading-tight mb-2">{purchase.template_title}</h3>
                                    <div className="text-xs text-white/40 mb-4">
                                      Purchased {new Date(purchase.purchased_at).toLocaleDateString()}
                                    </div>
                                  </div>
                                  {!isLocked && !isRejected && (
                                    <button
                                      onClick={() => template && handleCreateGift(template.id)}
                                      className="w-full gradient-primary py-3 rounded-2xl text-primary-foreground font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform"
                                    >
                                      <Eye className="w-4 h-4" />
                                      Customize Now
                                    </button>
                                  )}
                                  {/* Hidden button for layout structure when locked/rejected */}
                                  {(isLocked || isRejected) && <div className="h-10"></div>}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* More Templates Section */}
                  <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-4xl font-black text-white tracking-tighter">
                        {purchases.length > 0 ? 'More' : 'Browse'} <span className="gradient-text">Templates</span>
                      </h2>
                      <p className="text-muted-foreground font-medium">Unlock premium templates to create magical gifts</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {allTemplates
                        .filter(t => !purchases.some(p => p.template_id === t.id.toString() && p.status !== 'rejected'))
                        .map((t, i) => (
                          <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group"
                          >
                            <div className="glass-card flex flex-col h-full cursor-pointer hover:border-primary/50 transition-all duration-500 overflow-hidden shadow-2xl relative">
                              {/* Limited Offer Badge */}
                              <div className="absolute top-0 right-0 z-20">
                                <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white text-[9px] font-black px-3 py-1.5 rounded-bl-xl uppercase tracking-wider shadow-lg">
                                  Limited Time Offer! Grab it soon!
                                </div>
                              </div>

                              <div className={`h-40 bg-gradient-to-br ${t.color} opacity-20 group-hover:opacity-40 transition-all duration-700 flex items-center justify-center text-7xl relative overflow-hidden`}>
                                <motion.div
                                  animate={{
                                    rotate: [0, 5, -5, 0],
                                    scale: [1, 1.1, 1]
                                  }}
                                  style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                                  transition={{ duration: 4, repeat: Infinity }}
                                >
                                  {t.icon}
                                </motion.div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Sparkles className="absolute top-4 right-4 w-4 h-4 text-white/40 animate-sparkle" />
                                  <Sparkles className="absolute bottom-4 left-4 w-3 h-3 text-white/30 animate-sparkle" style={{ animationDelay: '0.5s' }} />
                                </div>
                              </div>
                              <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2 block">{t.category}</span>
                                  <h3 className="text-xl font-black text-white leading-tight mb-4 group-hover:text-primary transition-colors">{t.title}</h3>

                                  {/* Pricing */}
                                  <div className="flex items-baseline gap-2 mb-3">
                                    {t.originalPrice && t.originalPrice > t.price && (
                                      <span className="text-white/30 line-through text-sm">₹{t.originalPrice}</span>
                                    )}
                                    <span className="text-2xl font-black text-primary">₹{t.price}</span>
                                    {t.originalPrice && t.originalPrice > t.price && (
                                      <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded ml-2">
                                        {Math.round(((t.originalPrice - t.price) / t.originalPrice) * 100)}% OFF
                                      </span>
                                    )}
                                  </div>

                                  {/* Countdown Timer */}
                                  {t.offerEndsAt && (
                                    <div className="mb-4">
                                      <CountdownTimer endTime={t.offerEndsAt} className="text-xs" />
                                    </div>
                                  )}
                                </div>
                                <Link
                                  to={`/checkout?templateId=${t.id}&title=${encodeURIComponent(t.title)}&price=${t.price}${t.originalPrice ? `&mrp=${t.originalPrice}` : ''}`}
                                  className="w-full gradient-primary py-3 rounded-2xl text-primary-foreground font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform"
                                >
                                  <Plus className="w-4 h-4" />
                                  Buy Now
                                </Link>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "gifts" && (
                <motion.div
                  key="gifts"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="space-y-10"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-black text-white tracking-tighter">Gift <span className="gradient-text">Vault</span></h2>
                    <p className="text-muted-foreground font-medium">Manage and monitor all your magical creations.</p>
                  </div>

                  {userGifts.length === 0 ? (
                    <div className="glass-card p-20 text-center space-y-8 flex flex-col items-center shadow-2xl">
                      <div className="w-32 h-32 rounded-full bg-primary/5 flex items-center justify-center text-6xl animate-float">🎁</div>
                      <div className="space-y-2">
                        <h3 className="text-3xl font-black text-white">Your Vault is Empty</h3>
                        <p className="text-muted-foreground max-sm">Bring your first gift to life by selecting a template from the studio.</p>
                      </div>
                      <button
                        onClick={() => setActiveTab('templates')}
                        className="gradient-primary px-10 py-4 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                      >
                        Start Creating
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {userGifts.map((gift: any, i: number) => {
                        const template = TEMPLATES.find((t: any) => t.id === gift.template_id);
                        return (
                          <motion.div
                            key={gift.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-6 flex flex-col md:flex-row md:items-center gap-6 group hover:border-primary/30 transition-all duration-300"
                          >
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                              {template?.icon || "✨"}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="text-xl font-black text-white">{template?.title || 'Magic Experience'}</span>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${gift.is_published ? "bg-pastel-green/20 text-pastel-green" : "bg-primary/20 text-primary"}`}>
                                  {gift.is_published ? "Live" : "Draft"}
                                </span>
                              </div>
                              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground">
                                <span className="flex items-center gap-2">
                                  <History className="w-3.5 h-3.5" />
                                  {new Date(gift.created_at).toLocaleDateString()}
                                </span>
                                <span className="flex items-center gap-2">
                                  <Eye className="w-3.5 h-3.5" />
                                  {gift.views || 0} Interactions
                                </span>
                                {gift.gift_uuid && (
                                  <span className="text-primary/60 truncate max-sm hidden sm:block">ID: {gift.gift_uuid}</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => gift.gift_uuid && copyLink(gift.gift_uuid)}
                                disabled={!gift.gift_uuid}
                                className="w-12 h-12 rounded-xl glass-card-static flex items-center justify-center hover:border-primary/50 disabled:opacity-30 transition-all"
                              >
                                {copiedId === gift.gift_uuid ? <Check className="w-5 h-5 text-pastel-green" /> : <Copy className="w-5 h-5" />}
                              </motion.button>
                              <button
                                onClick={() => navigate(`/editor/${gift.id}`)}
                                className="px-6 py-3 rounded-xl glass-card-static hover:bg-white/5 text-xs font-black uppercase tracking-widest transition-all"
                              >
                                Edit
                              </button>
                              {gift.gift_uuid && (
                                <button
                                  onClick={() => window.open(`/gift/${gift.gift_uuid}`, '_blank')}
                                  className="px-6 py-3 rounded-xl gradient-primary text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                                >
                                  Preview
                                </button>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "transactions" && (
                <motion.div
                  key="transactions"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="space-y-10"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-black text-white tracking-tighter">Transaction <span className="gradient-text">History</span></h2>
                    <p className="text-muted-foreground font-medium">Track all your purchases and payments.</p>
                  </div>
                  <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left min-w-[600px]">
                        <thead className="bg-white/5 text-xs uppercase tracking-wider font-bold text-white/50">
                          <tr>
                            <th className="p-6">Date</th>
                            <th className="p-6">Item</th>
                            <th className="p-6">Amount</th>
                            <th className="p-6">Status</th>
                            <th className="p-6">Reference</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {purchases.map((p) => (
                            <tr key={p.id} className="text-sm font-medium hover:bg-white/5 transition-colors">
                              <td className="p-6 text-white/70">{new Date(p.purchased_at).toLocaleDateString()}</td>
                              <td className="p-6 text-white text-base font-bold">{p.template_title}</td>
                              <td className="p-6 text-primary font-black">₹{p.amount_paid}</td>
                              <td className="p-6">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${p.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                                  p.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                                    'bg-yellow-500/20 text-yellow-500'
                                  }`}>
                                  {p.status}
                                </span>
                              </td>
                              <td className="p-6 font-mono text-xs text-white/50">{p.transaction_id}</td>
                            </tr>
                          ))}
                          {purchases.length === 0 && (
                            <tr>
                              <td colSpan={5} className="p-12 text-center text-white/40">No transactions found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}

              {["wallet", "referrals", "notifications", "developer"].includes(activeTab) && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6"
                >
                  <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-4xl animate-pulse">
                    {activeTab === "wallet" ? "💳" : activeTab === "referrals" ? "👥" : activeTab === "notifications" ? "🔔" : "👨‍💻"}
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-white capitalize">{activeTab === "wallet" ? "Wallet & Credits" : activeTab}</h2>
                    <p className="text-muted-foreground max-w-md mx-auto">This feature is currently under development. Check back soon for updates!</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('templates')}
                    className="gradient-primary px-8 py-3 rounded-xl text-white font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                  >
                    Back to Templates
                  </button>
                  {activeTab === "developer" && (
                    <div className="glass-card p-6 max-w-lg mx-auto text-left mt-8 w-full border border-primary/20">
                      <h4 className="flex items-center gap-2 text-primary font-bold mb-4">
                        <Code className="w-4 h-4" />
                        Developer API Access
                      </h4>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">API Key</label>
                          <div className="bg-black/40 p-3 rounded-lg font-mono text-xs text-white/70 flex justify-between items-center">
                            ••••••••••••••••
                            <button className="text-primary hover:text-white transition-colors">Show</button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Webhook Endpoint</label>
                          <div className="bg-black/40 p-3 rounded-lg font-mono text-xs text-white/70">
                            https://api.giftmagic.com/v1/webhook
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  className="space-y-10"
                >
                  <div className="flex flex-col gap-2">
                    <h2 className="text-4xl font-black text-white tracking-tighter">Profile <span className="gradient-text">Configuration</span></h2>
                    <p className="text-muted-foreground font-medium">Personalize your creator account settings.</p>
                  </div>

                  <div className="glass-card p-10 space-y-12 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative group">
                        <div className="w-32 h-32 rounded-[2.5rem] gradient-primary flex items-center justify-center text-5xl shadow-2xl relative z-10">
                          {profile?.full_name?.[0] || <Plus className="w-10 h-10" />}
                        </div>
                        <div className="absolute inset-0 bg-primary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                        <button className="absolute -bottom-2 -right-2 w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-xl z-20 hover:scale-110 transition-transform">
                          <Settings className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-3xl font-black text-white mb-2">{profile?.full_name || 'Creative Creator'}</h3>
                        <p className="text-muted-foreground font-bold mb-4">{user?.email}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">Unlimited License</span>
                          <span className="px-4 py-1.5 rounded-full bg-pastel-green/10 border border-pastel-green/20 text-pastel-green text-[10px] font-black uppercase tracking-[0.2em]">Global Architect</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        { name: "Global Profile", icon: Eye },
                        { name: "Account Safety", icon: Settings },
                        { name: "Smart Notifications", icon: Bell },
                        { name: "Transaction Vault", icon: History },
                        { name: "Developer Forge", icon: LayoutDashboard },
                        { name: "Experience Credits", icon: Sparkles }
                      ].map((item) => (
                        <motion.button
                          key={item.name}
                          whileHover={{ scale: 1.02, y: -4 }}
                          className="flex items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-primary/40 transition-all group relative overflow-hidden"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <item.icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-white font-black text-sm uppercase tracking-wider">{item.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
