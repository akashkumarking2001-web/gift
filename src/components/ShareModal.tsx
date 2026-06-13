import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Link as LinkIcon, QrCode, Sparkles, Copy, Check } from 'lucide-react';
import QRCodeService from '../lib/qrCodeService';
import AIQRCodeService from '../lib/aiQrService';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    giftUrl: string;
    giftTitle?: string;
}

type QRType = 'standard' | 'ai';
type TabType = 'link' | 'qr';

const ShareModal = ({ isOpen, onClose, giftUrl, giftTitle = 'My Special Gift' }: ShareModalProps) => {
    const [activeTab, setActiveTab] = useState<TabType>('link');
    const [qrType, setQRType] = useState<QRType>('standard');
    const [standardQR, setStandardQR] = useState<string>('');
    const [aiQR, setAIQR] = useState<string>('');
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [isGeneratingAI, setIsGeneratingAI] = useState(false);
    const [copied, setCopied] = useState(false);
    const [qrColor, setQRColor] = useState('#f04299');

    // Generate standard QR code on mount
    useEffect(() => {
        if (isOpen && giftUrl) {
            generateStandardQR();
        }
    }, [isOpen, giftUrl, qrColor]);

    const generateStandardQR = async () => {
        try {
            const qr = await QRCodeService.generateBrandedQRCode(giftUrl, qrColor, {
                size: 512,
                errorCorrectionLevel: 'H'
            });
            setStandardQR(qr);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validation = AIQRCodeService.validateImageFile(file);
        if (!validation.valid) {
            alert(validation.error);
            return;
        }

        setUploadedImage(file);
    };

    const generateAIQR = async () => {
        if (!uploadedImage || !standardQR) return;

        setIsGeneratingAI(true);
        try {
            const result = await AIQRCodeService.generateAIQRCode(
                standardQR,
                uploadedImage,
                giftUrl,
                {
                    strength: 0.7,
                    guidanceScale: 10
                }
            );

            if (result.error) {
                alert(result.error);
            } else if (result.dataUrl) {
                setAIQR(result.dataUrl);
                setQRType('ai');
            }
        } catch (error) {
            console.error('Error generating AI QR:', error);
            alert('Failed to generate AI QR code. Please try again.');
        } finally {
            setIsGeneratingAI(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(giftUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    const downloadQR = () => {
        const qrToDownload = qrType === 'ai' ? aiQR : standardQR;
        if (qrToDownload) {
            QRCodeService.downloadQRCode(qrToDownload, `${giftTitle}-qrcode.png`);
        }
    };

    const shareVia = (platform: 'whatsapp' | 'email' | 'sms') => {
        const message = encodeURIComponent(`Check out this special gift I made for you! 💖`);
        const url = encodeURIComponent(giftUrl);

        const urls = {
            whatsapp: `https://wa.me/?text=${message}%20${url}`,
            email: `mailto:?subject=${encodeURIComponent(giftTitle)}&body=${message}%20${url}`,
            sms: `sms:?body=${message}%20${url}`
        };

        window.open(urls[platform], '_blank');
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                    className="bg-gradient-to-br from-white to-pink-50 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-pink-100 rounded-full transition-colors z-10"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>

                    {/* Header */}
                    <div className="p-8 pb-6 border-b border-pink-200">
                        <div className="flex items-center gap-3 mb-2">
                            <Share2 className="w-8 h-8 text-pink-600" />
                            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-rose-600">
                                Share Your Gift
                            </h2>
                        </div>
                        <p className="text-gray-600">Choose how you want to share this special moment</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-pink-200">
                        <button
                            onClick={() => setActiveTab('link')}
                            className={`flex-1 py-4 px-6 font-bold transition-colors ${activeTab === 'link'
                                ? 'text-pink-600 border-b-4 border-pink-600'
                                : 'text-gray-500 hover:text-pink-500'
                                }`}
                        >
                            <LinkIcon className="w-5 h-5 inline mr-2" />
                            Direct Link
                        </button>
                        <button
                            onClick={() => setActiveTab('qr')}
                            className={`flex-1 py-4 px-6 font-bold transition-colors ${activeTab === 'qr'
                                ? 'text-pink-600 border-b-4 border-pink-600'
                                : 'text-gray-500 hover:text-pink-500'
                                }`}
                        >
                            <QrCode className="w-5 h-5 inline mr-2" />
                            QR Code
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {activeTab === 'link' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                                className="space-y-6"
                            >
                                {/* URL Display */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Gift Link</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={giftUrl}
                                            readOnly
                                            className="flex-1 px-4 py-3 bg-white border-2 border-pink-200 rounded-xl focus:outline-none focus:border-pink-400 font-mono text-sm"
                                        />
                                        <button
                                            onClick={copyToClipboard}
                                            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center gap-2"
                                        >
                                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                            {copied ? 'Copied!' : 'Copy'}
                                        </button>
                                    </div>
                                </div>

                                {/* Share Buttons */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-3">Share Via</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <button
                                            onClick={() => shareVia('whatsapp')}
                                            className="p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-bold flex flex-col items-center gap-2"
                                        >
                                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                            WhatsApp
                                        </button>
                                        <button
                                            onClick={() => shareVia('email')}
                                            className="p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors font-bold flex flex-col items-center gap-2"
                                        >
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            Email
                                        </button>
                                        <button
                                            onClick={() => shareVia('sms')}
                                            className="p-4 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors font-bold flex flex-col items-center gap-2"
                                        >
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                            SMS
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'qr' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                                className="space-y-6"
                            >
                                {/* QR Type Selection */}
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setQRType('standard')}
                                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${qrType === 'standard'
                                            ? 'border-pink-500 bg-pink-50'
                                            : 'border-gray-200 hover:border-pink-300'
                                            }`}
                                    >
                                        <QrCode className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                                        <div className="font-bold text-gray-800">Standard QR</div>
                                        <div className="text-xs text-gray-500">Clean & simple</div>
                                    </button>
                                    <button
                                        onClick={() => setQRType('ai')}
                                        className={`flex-1 p-4 rounded-xl border-2 transition-all ${qrType === 'ai'
                                            ? 'border-pink-500 bg-pink-50'
                                            : 'border-gray-200 hover:border-pink-300'
                                            }`}
                                    >
                                        <Sparkles className="w-8 h-8 mx-auto mb-2 text-pink-600" />
                                        <div className="font-bold text-gray-800">AI Artistic QR</div>
                                        <div className="text-xs text-gray-500">Blend with photo</div>
                                    </button>
                                </div>

                                {/* Standard QR Code */}
                                {qrType === 'standard' && (
                                    <div className="space-y-4">
                                        {/* Color Picker */}
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">QR Code Color</label>
                                            <div className="flex gap-3">
                                                {['#f04299', '#000000', '#3b82f6', '#8b5cf6', '#10b981'].map((color) => (
                                                    <button
                                                        key={color}
                                                        onClick={() => setQRColor(color)}
                                                        className={`w-12 h-12 rounded-full border-4 transition-all ${qrColor === color ? 'border-pink-500 scale-110' : 'border-gray-200'
                                                            }`}
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* QR Code Display */}
                                        {standardQR && (
                                            <div className="bg-white p-6 rounded-2xl border-2 border-pink-200">
                                                <img src={standardQR} alt="QR Code" className="w-full max-w-sm mx-auto" />
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* AI QR Code */}
                                {qrType === 'ai' && (
                                    <div className="space-y-4">
                                        {/* Upload Section */}
                                        {!aiQR && (
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                                    Upload Your Photo
                                                </label>
                                                <div className="border-2 border-dashed border-pink-300 rounded-xl p-8 text-center hover:border-pink-500 transition-colors cursor-pointer">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="hidden"
                                                        id="ai-qr-upload"
                                                    />
                                                    <label htmlFor="ai-qr-upload" className="cursor-pointer">
                                                        <Sparkles className="w-12 h-12 mx-auto mb-3 text-pink-500" />
                                                        <div className="font-bold text-gray-800 mb-1">
                                                            {uploadedImage ? uploadedImage.name : 'Click to upload image'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            JPEG, PNG, or WebP (max 10MB)
                                                        </div>
                                                    </label>
                                                </div>

                                                {uploadedImage && (
                                                    <button
                                                        onClick={generateAIQR}
                                                        disabled={isGeneratingAI}
                                                        className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {isGeneratingAI ? (
                                                            <>
                                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                                </svg>
                                                                Generating AI QR Code...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Sparkles className="w-5 h-5 inline mr-2" />
                                                                Generate AI QR Code
                                                            </>
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        {/* AI QR Display */}
                                        {aiQR && (
                                            <div className="space-y-4">
                                                <div className="bg-white p-6 rounded-2xl border-2 border-pink-200">
                                                    <img src={aiQR} alt="AI QR Code" className="w-full max-w-sm mx-auto rounded-xl" />
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setAIQR('');
                                                        setUploadedImage(null);
                                                    }}
                                                    className="w-full py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-colors"
                                                >
                                                    Generate New AI QR
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Download Button */}
                                {((qrType === 'standard' && standardQR) || (qrType === 'ai' && aiQR)) && (
                                    <button
                                        onClick={downloadQR}
                                        className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download QR Code
                                    </button>
                                )}
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ShareModal;
