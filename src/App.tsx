import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Editor from "./pages/Editor";
import GiftViewer from "./pages/GiftViewer";
import TemplateDetails from "./pages/TemplateDetails";
import Setup from "./pages/Setup";
import NotFound from "./pages/NotFound";
import Scanner from "./pages/Scanner";
import { AudioProvider } from "./context/AudioContext";

import ClientPublicPage from "./pages/ClientPublicPage";
import ClientLogin from "./pages/ClientLogin";
import ClientDashboard from "./pages/ClientDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import RefundPolicy from "./pages/RefundPolicy";
import VendorRegister from "./pages/VendorRegister";
import WhatsAppSupport from "./components/WhatsAppSupport";

const queryClient = new QueryClient();

const MagicFrameWrapper = () => {
  const subPath = window.location.pathname.replace('/magic-frame', '');
  const iframeSrc = `/magic-frame/index.html#${subPath || '/'}`;
  
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <iframe 
        src={iframeSrc} 
        style={{ width: '100%', height: '100%', border: 'none' }} 
        title="Magic Frame"
        key={window.location.pathname}
        allow="payment *; camera *; microphone *; geolocation *; accelerometer *; gyroscope *; xr-spatial-tracking *;"
      />
    </div>
  );
};

const App = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  // Define main domains to exclude from custom domain check
  const mainDomains = ['giftmagic.beauty', 'localhost', '127.0.0.1'];
  const isMainDomain = mainDomains.some(d => hostname === d || hostname.endsWith('.' + d));
  
  let subdomain = '';
  let customDomain = '';

  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    // Localhost subdomain check
    if (parts.length > 1 && parts[parts.length - 1] === 'localhost') {
      subdomain = parts.slice(0, -1).join('.');
    }
  } else if (hostname.endsWith('giftmagic.beauty')) {
    // Production subdomain check
    if (parts.length > 2) {
      subdomain = parts.slice(0, -2).join('.');
    }
  } else {
    // It's a custom domain - Normalize by removing 'www.' if present
    customDomain = hostname.startsWith('www.') ? hostname.slice(4) : hostname;
  }

  // Determine if we should show the Client Router
  const isClientSite = (subdomain && subdomain !== 'www' && subdomain !== 'admin') || customDomain;
  const clientIdentifier = customDomain || subdomain;

  // --- Client App Router (Subdomain or Custom Domain) ---
  if (isClientSite) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AudioProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Routes>
                <Route path="/magic-frame" element={<MagicFrameWrapper />} />
                <Route path="/magic-frame/*" element={<MagicFrameWrapper />} />
                <Route path="/" element={<ClientPublicPage slug={clientIdentifier} />} />
                <Route path="/login" element={<ClientLogin slug={clientIdentifier} />} />
                <Route path="/dashboard" element={<ClientDashboard slug={clientIdentifier} />} />
                <Route path="/scan" element={<Scanner />} />
                <Route path="*" element={<Link to="/" className="text-white">Not Found. Back to Home</Link>} />
              </Routes>
            </BrowserRouter>
          </AudioProvider>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // --- Main App Router ---
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AudioProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/magic-frame" element={<MagicFrameWrapper />} />
              <Route path="/magic-frame/*" element={<MagicFrameWrapper />} />
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/vendor-register" element={<VendorRegister />} />
              <Route path="/signup" element={<VendorRegister />} />
              <Route path="/history" element={<Dashboard />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/editor/:id" element={<Editor />} />
              <Route path="/gift/:uuid" element={<GiftViewer />} />
              <Route path="/template/:slug" element={<TemplateDetails />} />
              <Route path="/setup" element={<Setup />} />
              <Route path="/scan" element={<Scanner />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/terms-of-service" element={<TermsAndConditions />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AppWhatsAppVisibility />
          </BrowserRouter>
        </AudioProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const AppWhatsAppVisibility = () => {
  const { pathname } = window.location;
  const internalPages = ['/dashboard', '/admin', '/history', '/editor', '/setup', '/admin/login'];
  const isInternal = internalPages.some(p => pathname.startsWith(p));

  if (!isInternal) return null;
  return <WhatsAppSupport />;
};

export default App;
