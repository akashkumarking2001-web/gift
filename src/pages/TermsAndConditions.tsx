import { motion } from "framer-motion";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import FloatingHearts from "../components/landing/FloatingHearts";

const TermsAndConditions = () => {
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
          <h1 className="text-4xl md:text-5xl font-black mb-8 gradient-text">Terms & Conditions</h1>
          <p className="text-white/60 mb-8">Last Updated: March 29, 2026</p>

          <div className="space-y-8 text-white/80 leading-relaxed font-medium">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Welcome to Giftmagic</h2>
              <p>
                Welcome to Giftmagic, a platform owned and operated by AxoSoul. By accessing our website and using our services (digital templates, AR features, subscriptions), you agree to comply with and be bound by the following terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Services Provided</h2>
              <p className="mb-4">Giftmagic provides:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Digital Templates:</strong> Customizable designs for birthdays, weddings, Valentine’s Day, etc.</li>
                <li><strong>AR Features:</strong> Subscription-based Augmented Reality (AR) magic frames where scanning a photo plays an associated video.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. User Accounts</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To use certain features, you must create an account. You are responsible for maintaining the confidentiality of your account login information.</li>
                <li>You must be at least 18 years old or have parental consent to use this service.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Purchases and Subscriptions</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>One-time Purchases:</strong> Payments for digital templates are one-time and provide access to the specific template purchased.</li>
                <li><strong>Subscriptions:</strong> AR services are provided on a monthly/yearly subscription basis.</li>
                <li><strong>Pricing:</strong> All prices are listed in INR (Indian Rupees) and are subject to change without notice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. User Content and Conduct</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are solely responsible for the photos, videos, and text you upload for AR magic frames or templates.</li>
                <li><strong>Prohibited Content:</strong> You agree not to upload any content that is illegal, pornographic, hateful, or violates third-party copyrights.</li>
                <li>We reserve the right to delete any content that violates these terms without a refund.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>The software, design, and AR technology used in Giftmagic are the intellectual property of AxoSoul.</li>
                <li>The digital templates are for personal use only and cannot be resold or redistributed as your own work.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Giftmagic (AxoSoul) is not liable for any technical failures, data loss, or server downtime.</li>
                <li>We do not guarantee that our AR features will be compatible with every mobile device or browser.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your access to our services immediately, without prior notice, if you breach these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of India, and any disputes will be subject to the jurisdiction of the courts in Tirunelveli, Tamil Nadu.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Contact Information</h2>
              <p>If you have questions or comments about this policy, you may contact us at:</p>
              <div className="mt-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                <p><strong>Brand:</strong> Giftmagic by AxoSoul</p>
                <p><strong>Email:</strong> Axosolu@gmail.com</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
