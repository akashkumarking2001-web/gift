import { motion } from "framer-motion";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import FloatingHearts from "../components/landing/FloatingHearts";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <FloatingHearts />
      <Navbar />
      
      <div className="container relative z-10 px-6 py-32 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 rounded-3xl border border-white/10"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-8 gradient-text">Privacy Policy</h1>
          <p className="text-white/60 mb-8">Last Updated: April 08, 2026</p>

          <div className="space-y-8 text-white/80 leading-relaxed font-medium">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Welcome to Giftmagic</h2>
              <p>
                Welcome to Giftmagic (www.giftmagic.beauty). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website, use our mobile application, and use our services, including purchasing digital AR (Augmented Reality) albums and features.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect personal information that you voluntarily provide to us when you register, express an interest in obtaining information about our products, or when you participate in activities on the platform.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personal Data:</strong> Name, phone number, and email address.</li>
                <li><strong>User Content:</strong> Photos, videos, and media files you upload to create your "Magic Frames" AR albums. These files are stored securely on our cloud storage.</li>
                <li><strong>Payment Data:</strong> We collect data necessary to process your payment if you make purchases. All payment data is handled securely by our payment processor, Cashfree. We do not store your credit card or sensitive financial details on our servers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To facilitate account creation and login process.</li>
                <li>To process and manage your orders for AR albums.</li>
                <li>To host and provide technical support for your digital AR content.</li>
                <li>To send administrative information, such as order confirmations and updates.</li>
                <li>To respond to user inquiries and offer customer support.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Storage & Permissions</h2>
              <p className="mb-4">Your media files are stored securely using industry-standard cloud storage (Supabase / Cloudflare R2). Our mobile application may request the following permissions:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Camera:</strong> To scan QR codes and enable the AR experience.</li>
                <li><strong>Storage/Gallery:</strong> To allow you to upload images and videos for your frames.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Data Deletion Rights</h2>
              <p>
                You have the right to request the deletion of your account and all associated data at any time. You can do this through the "Danger Zone" in your profile settings within the app, or by contacting our support team. Upon a valid request, we will remove your personal profile and all uploaded media files within 7-14 business days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
              <p>If you have questions or comments about this policy, or wish to request data deletion, you may contact us at:</p>
              <div className="mt-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                <p><strong>Website:</strong> www.giftmagic.beauty</p>
                <p><strong>WhatsApp Support:</strong> +91 8610381533</p>
                <p><strong>Email:</strong> support@giftmagic.beauty</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
