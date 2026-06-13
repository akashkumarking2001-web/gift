import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import ShareModal from '../components/ShareModal';
import QRCodeService from '../lib/qrCodeService';

/**
 * EXAMPLE: How to integrate QR Code & Share functionality
 * into your Valentine's template completion page
 */

const ValentineGiftCompletionExample = () => {
    const [showShareModal, setShowShareModal] = useState(false);
    const [giftUrl, setGiftUrl] = useState('');
    const [giftData, setGiftData] = useState<any>(null);

    /**
     * Call this when user finishes customizing their gift
     */
    const handlePublishGift = async () => {
        try {
            // 1. Generate unique link
            const uniqueId = QRCodeService.generateUniqueId();
            const { fullUrl } = QRCodeService.generateGiftUrl(uniqueId);

            console.log('Generated unique ID:', uniqueId);
            console.log('Generated URL:', fullUrl);
            // Example: https://your-domain.com/gift/abc123def456

            // 2. Save gift data to database
            const savedGift = await saveGiftToDatabase({
                id: uniqueId,
                url: fullUrl,
                templateId: 20, // Valentine's template
                customization: {
                    // Page 1
                    greeting: 'Hey Cutiepie',
                    subtext: 'This Valentine...',
                    mainImage: 'https://...',

                    // Page 2
                    reason1: 'Your smile',
                    reason2: 'Your laugh',
                    // ... etc

                    // Page 3
                    photos: [
                        { url: 'https://...', caption: 'Our first date' },
                        // ...
                    ],

                    // Page 4
                    question: 'Will you be my Valentine?',

                    // Page 5
                    loveMessage: 'Every moment with you...',
                },
                createdAt: new Date(),
                published: true
            });

            // 3. Set state and show share modal
            setGiftData(savedGift);
            setGiftUrl(fullUrl);
            setShowShareModal(true);

        } catch (error) {
            console.error('Error publishing gift:', error);
            alert('Failed to publish gift. Please try again.');
        }
    };

    /**
     * Dummy function - replace with your actual database save
     */
    const saveGiftToDatabase = async (data: any) => {
        // Example with Supabase:
        // const { data: gift, error } = await supabase
        //   .from('gifts')
        //   .insert({
        //     unique_link_id: data.id,
        //     gift_url: data.url,
        //     template_id: data.templateId,
        //     customization_data: data.customization,
        //     created_at: data.createdAt,
        //     is_published: data.published
        //   })
        //   .select()
        //   .single();
        //
        // if (error) throw error;
        // return gift;

        // For now, just return the data
        return data;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
                {/* Gift Preview */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600 mb-4">
                        Your Gift is Ready! 🎉
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Your Valentine's gift has been created successfully!
                    </p>
                </div>

                {/* Preview Card */}
                <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-6 mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-3xl">
                            💖
                        </div>
                        <div>
                            <h3 className="font-bold text-xl text-gray-800">Romantic Valentine's Journey</h3>
                            <p className="text-gray-600">5 interactive pages</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                        {['Greeting', 'Why You?', 'Memories', 'Question', 'Message'].map((page, i) => (
                            <div key={i} className="bg-white rounded-lg p-2 text-center">
                                <div className="text-2xl mb-1">✅</div>
                                <div className="text-xs text-gray-600">{page}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    {/* Publish & Share Button */}
                    <motion.button
                        onClick={handlePublishGift}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white font-bold py-5 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-lg"
                    >
                        <Share2 className="w-6 h-6" />
                        Publish & Share Gift
                    </motion.button>

                    {/* Preview Button */}
                    <button className="w-full bg-white border-2 border-pink-300 text-pink-600 font-bold py-4 rounded-2xl hover:bg-pink-50 transition-colors">
                        Preview Gift
                    </button>

                    {/* Edit Button */}
                    <button className="w-full bg-gray-100 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors">
                        Edit Customization
                    </button>
                </div>

                {/* Info */}
                <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-blue-800">
                        <strong>💡 Tip:</strong> After publishing, you'll get a unique link and QR codes to share your gift!
                    </p>
                </div>
            </div>

            {/* Share Modal */}
            <ShareModal
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
                giftUrl={giftUrl}
                giftTitle="My Valentine's Gift"
            />
        </div>
    );
};

export default ValentineGiftCompletionExample;

/**
 * INTEGRATION STEPS:
 * 
 * 1. Import this component or copy the logic
 * 2. Replace `saveGiftToDatabase` with your actual database save function
 * 3. Add this to your routing:
 *    <Route path="/gift/complete" element={<ValentineGiftCompletionExample />} />
 * 4. Navigate here after user completes customization
 * 5. Done! Users can now share their gifts with QR codes
 * 
 * WHAT HAPPENS:
 * 
 * 1. User clicks "Publish & Share Gift"
 * 2. Unique link is generated (e.g., /gift/abc123)
 * 3. Gift data is saved to database
 * 4. Share Modal opens with:
 *    - Direct link (copy, WhatsApp, Email, SMS)
 *    - Standard QR code (5 colors, downloadable)
 *    - AI Artistic QR code (upload photo, blend, download)
 * 5. User shares via preferred method
 * 6. Recipient opens link and views the gift!
 * 
 * DATABASE SCHEMA EXAMPLE:
 * 
 * CREATE TABLE gifts (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   unique_link_id VARCHAR(255) UNIQUE NOT NULL,
 *   gift_url TEXT NOT NULL,
 *   template_id INTEGER NOT NULL,
 *   user_id UUID REFERENCES users(id),
 *   customization_data JSONB NOT NULL,
 *   qr_code_url TEXT,
 *   ai_qr_code_url TEXT,
 *   is_published BOOLEAN DEFAULT false,
 *   created_at TIMESTAMP DEFAULT NOW(),
 *   published_at TIMESTAMP,
 *   views_count INTEGER DEFAULT 0
 * );
 * 
 * CREATE INDEX idx_gifts_unique_link ON gifts(unique_link_id);
 * CREATE INDEX idx_gifts_user ON gifts(user_id);
 */
