import { motion } from "framer-motion";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import FloatingHearts from "../components/landing/FloatingHearts";

const RefundPolicy = () => {
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
          <h1 className="text-4xl md:text-5xl font-black mb-8 gradient-text">Refund & Cancellation Policy</h1>
          <p className="text-white/60 mb-8">Last Updated: April 08, 2026</p>

          <div className="space-y-8 text-white/80 leading-relaxed font-medium">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Digital Goods Policy</h2>
              <p>
                At Giftmagic (www.giftmagic.beauty), we provide digital AR (Augmented Reality) albums and hosting services. Since our products are digital content delivered instantly upon payment verification, we operate under a strict <strong>No Refund</strong> policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. No Refunds</h2>
              <p className="mb-4">Once an AR Magic Frame is created and the payment is successfully processed, the service is considered "delivered" and "consumed."</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>All Sales are Final:</strong> We do not offer refunds, returns, or exchanges for any digital products or AR activation fees.</li>
                <li><strong>No Partial Refunds:</strong> No refunds will be provided for unused portions of the service or hosting period.</li>
                <li><strong>Change of Mind:</strong> We do not offer refunds for accidental purchases or changes of mind after the AR album has been generated.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Cancellation</h2>
              <p>
                As the service is a one-time activation for digital hosting and AR generation, cancellations are not applicable once the process has started and assets have been uploaded to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Exceptional Circumstances</h2>
              <p className="mb-4">We strive for 100% technical reliability. However, we only consider refunds in the following rare cases:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Duplicate Payments:</strong> If you were charged twice for the same order due to a technical glitch in the payment gateway, please provide transaction IDs. Duplicate charges will be refunded within 7-10 working days.</li>
                <li><strong>Unresolved Technical Faults:</strong> If a major system error on our end prevents the AR frame from working and our support team cannot fix it within 7 business days, a refund or service credit may be issued at our sole discretion.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Support</h2>
              <p>If you face any issues with your AR album, our team is here to help you get it working perfectly.</p>
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

export default RefundPolicy;
