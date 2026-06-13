import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import QRCode from 'qrcode';
import { Loader2, Upload, Download, Share2, ImageIcon, Type } from 'lucide-react';

interface Page11EndingProps {
    data: {
        thankYouText?: string;
        finalMessage?: string;
        shareText?: string;
    };
    onNext?: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: string) => void;
}

const Page11Ending = ({ data, isEditing = false, onUpdate }: Page11EndingProps) => {
    const [copied, setCopied] = useState(false);

    const defaultData = {
        thankYouText: data.thankYouText || "Thank You For Being Mine",
        finalMessage: data.finalMessage || "This is just the beginning of our forever story. Here's to many more beautiful moments together! 💕",
        shareText: data.shareText || "Share this love story"
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Our Love Story',
                text: 'Check out this beautiful Valentine message!',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const [showShareModal, setShowShareModal] = useState(false);
    const [shareStep, setShareStep] = useState<'menu' | 'qr_setup' | 'poster_result'>('menu');
    const [userPhoto, setUserPhoto] = useState<string | null>(null);
    const [selectedFrame, setSelectedFrame] = useState<'circle' | 'heart' | 'box'>('heart');
    const [posterUrl, setPosterUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleReplay = () => {
        window.location.reload();
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setUserPhoto(event.target.result as string);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const generatePoster = async () => {
        setIsGenerating(true);
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // Set canvas size (Poster size)
            canvas.width = 800;
            canvas.height = 1200;

            // Background
            const gradient = ctx.createLinearGradient(0, 0, 0, 1200);
            gradient.addColorStop(0, '#fce7f3'); // pink-100
            gradient.addColorStop(1, '#fbcfe8'); // pink-200
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 800, 1200);

            // Pattern Overlay (Hearts)
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            for (let i = 0; i < 50; i++) {
                const x = Math.random() * 800;
                const y = Math.random() * 1200;
                const size = Math.random() * 20 + 10;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }

            // Text: Call to Action
            ctx.fillStyle = '#be185d'; // pink-700
            ctx.font = 'bold 60px serif';
            ctx.textAlign = 'center';
            ctx.fillText("Scan for a Surprise!", 400, 150);
            ctx.fillStyle = '#db2777'; // pink-600
            ctx.font = 'italic 40px serif';
            ctx.fillText("A special message is waiting...", 400, 220);

            // Teddy Bears (Emojis)
            ctx.font = '150px serif';
            ctx.fillText("🧸", 200, 600);
            ctx.fillText("🧸", 600, 600);

            // Generate QR Code
            const qrDataUrl = await QRCode.toDataURL(window.location.href, { width: 300, margin: 1, color: { dark: '#be185d', light: '#ffffff' } });
            const qrImg = new Image();
            qrImg.src = qrDataUrl;
            await new Promise((resolve) => { qrImg.onload = resolve; });

            // Draw QR Code (Centered between bears)
            ctx.drawImage(qrImg, 250, 450, 300, 300);

            // Draw User Photo (if uploaded)
            if (userPhoto) {
                const photoImg = new Image();
                photoImg.src = userPhoto;
                await new Promise((resolve) => { photoImg.onload = resolve; });

                // Frame Logic
                const frameSize = 250;
                const frameX = 400 - frameSize / 2;
                const frameY = 850;

                ctx.save();
                ctx.beginPath();
                if (selectedFrame === 'circle') {
                    ctx.arc(400, frameY + frameSize / 2, frameSize / 2, 0, Math.PI * 2);
                } else if (selectedFrame === 'heart') {
                    // Simple heart path
                    const topCurveHeight = frameSize * 0.3;
                    ctx.moveTo(400, frameY + frameSize * 0.2);
                    ctx.bezierCurveTo(400, frameY, 400 - frameSize / 2, frameY, 400 - frameSize / 2, frameY + topCurveHeight);
                    ctx.bezierCurveTo(400 - frameSize / 2, frameY + (frameSize + topCurveHeight) / 2, 400, frameY + frameSize, 400, frameY + frameSize);
                    ctx.bezierCurveTo(400, frameY + frameSize, 400 + frameSize / 2, frameY + (frameSize + topCurveHeight) / 2, 400 + frameSize / 2, frameY + topCurveHeight);
                    ctx.bezierCurveTo(400 + frameSize / 2, frameY, 400, frameY, 400, frameY + frameSize * 0.2);
                } else {
                    // Box
                    ctx.rect(frameX, frameY, frameSize, frameSize);
                }
                ctx.closePath();
                ctx.clip();

                // Draw image to fill frame
                const scale = Math.max(frameSize / photoImg.width, frameSize / photoImg.height);
                const x = frameX + (frameSize - photoImg.width * scale) / 2;
                const y = frameY + (frameSize - photoImg.height * scale) / 2;
                ctx.drawImage(photoImg, x, y, photoImg.width * scale, photoImg.height * scale);
                ctx.restore();

                // Draw Frame Border
                ctx.save();
                ctx.beginPath();
                ctx.lineWidth = 10;
                ctx.strokeStyle = '#be185d';
                if (selectedFrame === 'circle') {
                    ctx.arc(400, frameY + frameSize / 2, frameSize / 2, 0, Math.PI * 2);
                } else if (selectedFrame === 'heart') {
                    const topCurveHeight = frameSize * 0.3;
                    ctx.moveTo(400, frameY + frameSize * 0.2);
                    ctx.bezierCurveTo(400, frameY, 400 - frameSize / 2, frameY, 400 - frameSize / 2, frameY + topCurveHeight);
                    ctx.bezierCurveTo(400 - frameSize / 2, frameY + (frameSize + topCurveHeight) / 2, 400, frameY + frameSize, 400, frameY + frameSize);
                    ctx.bezierCurveTo(400, frameY + frameSize, 400 + frameSize / 2, frameY + (frameSize + topCurveHeight) / 2, 400 + frameSize / 2, frameY + topCurveHeight);
                    ctx.bezierCurveTo(400 + frameSize / 2, frameY, 400, frameY, 400, frameY + frameSize * 0.2);
                } else {
                    ctx.rect(frameX, frameY, frameSize, frameSize);
                }
                ctx.closePath();
                ctx.stroke();
                ctx.restore();

                // Caption under photo
                ctx.fillStyle = '#db2777';
                ctx.font = '20px serif';
                ctx.fillText("Sent with Love", 400, 1150);
            }

            setPosterUrl(canvas.toDataURL('image/png'));
            setShareStep('poster_result');
        } catch (error) {
            console.error("Poster generation failed", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-x-hidden bg-gradient-to-br from-pink-600 via-rose-600 to-red-700 flex flex-col items-center justify-center p-4 pb-20">
            {/* Animated Background */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    background: [
                        'linear-gradient(to bottom right, #db2777, #e11d48, #dc2626)',
                        'linear-gradient(to bottom right, #e11d48, #dc2626, #db2777)',
                        'linear-gradient(to bottom right, #dc2626, #db2777, #e11d48)',
                        'linear-gradient(to bottom right, #db2777, #e11d48, #dc2626)'
                    ]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />

            {/* Floating Hearts Celebration */}
            {/* Floating Hearts Celebration - Optimized */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={`heart-${i}`}
                    className="absolute text-6xl pointer-events-none"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.1
                    }}
                    animate={{
                        y: [0, -100, 0],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 6 + Math.random() * 6,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    {['💖', '💕', '💗', '💝', '💓', '❤️'][i % 6]}
                </motion.div>
            ))}

            <div className="relative z-10 max-w-4xl w-full text-center">
                {/* Main Thank You */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 1, type: 'spring', bounce: 0.5 }}
                    className="mb-12 relative group/heading"
                >
                    <div
                        className={`relative inline-block px-12 py-6 ${isEditing ? 'cursor-pointer hover:bg-white/10 rounded-3xl transition-all border-2 border-transparent hover:border-white/20' : ''}`}
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Thank You Heading:", defaultData.thankYouText);
                                if (val) onUpdate?.('thankYouText', val);
                            }
                        }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black text-white drop-shadow-2xl font-romantic gradient-text leading-tight">
                            {defaultData.thankYouText}
                        </h1>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30">
                                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                                    ✏️ Edit Heading
                                </span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Giant Heart Animation */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, type: 'spring', bounce: 0.6 }}
                    className="mb-16"
                >
                    <motion.div
                        className="text-[10rem] md:text-[14rem] inline-block filter drop-shadow-[0_20px_50px_rgba(255,255,255,0.4)]"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                            filter: [
                                'drop-shadow(0 20px 50px rgba(255,255,255,0.4))',
                                'drop-shadow(0 30px 60px rgba(255,255,255,0.6))',
                                'drop-shadow(0 20px 50px rgba(255,255,255,0.4))'
                            ]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        💖
                    </motion.div>
                </motion.div>

                {/* Final Message Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="bg-[#fffdf8] rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] p-12 md:p-16 mb-16 max-w-3xl mx-auto border-2 border-white/50 relative overflow-hidden"
                    style={{
                        backgroundImage: `url('https://www.transparenttextures.com/patterns/cardboard.png')`,
                        backgroundBlendMode: 'multiply'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-white/5 to-rose-500/5 pointer-events-none" />

                    <div
                        className={`relative group/msg transition-all ${isEditing ? 'cursor-pointer p-8 hover:bg-pink-50/50 rounded-2xl border-2 border-transparent hover:border-pink-200' : ''}`}
                        onClick={() => {
                            if (isEditing) {
                                const val = prompt("Enter Final Message:", defaultData.finalMessage);
                                if (val) onUpdate?.('finalMessage', val);
                            }
                        }}
                    >
                        <p className="text-2xl md:text-4xl text-gray-800 font-lovely italic font-bold leading-relaxed text-center">
                            "{defaultData.finalMessage}"
                        </p>
                        {isEditing && (
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white/50 backdrop-blur-md px-3 py-1 rounded-full border border-pink-200">
                                <span className="text-[10px] font-black text-pink-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                    ✏️ Edit Message
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Decorative Corner Hearts */}
                    <div className="absolute top-8 left-8 text-5xl opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700">💕</div>
                    <div className="absolute top-8 right-8 text-5xl opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700">💖</div>
                    <div className="absolute bottom-8 left-8 text-5xl opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700">💗</div>
                    <div className="absolute bottom-8 right-8 text-5xl opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700">💝</div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                    {/* Replay Button */}
                    <motion.button
                        onClick={handleReplay}
                        className="group relative overflow-hidden px-10 py-5 rounded-full bg-white text-rose-600 font-bold text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all min-w-[240px]"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            🔄 REPLAY STORY
                        </span>
                    </motion.button>

                    {/* Share Button (Green) */}
                    <motion.button
                        onClick={() => setShowShareModal(true)}
                        className="group relative overflow-hidden px-10 py-5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all min-w-[240px]"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            📤 SHARE & QR CODE
                        </span>
                    </motion.button>
                </motion.div>

                {/* Share Modal */}
                {showShareModal && (
                    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-3xl p-8 max-w-lg w-full relative">
                            <button
                                onClick={() => setShowShareModal(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>

                            <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">Share Your Love Story</h3>

                            {shareStep === 'menu' && (
                                <div className="grid grid-cols-1 gap-4">
                                    <button
                                        onClick={() => {
                                            if (navigator.share) {
                                                navigator.share({
                                                    title: 'Our Love Story',
                                                    text: 'Check out this beautiful Valentine message!',
                                                    url: window.location.href
                                                });
                                            } else {
                                                handleCopyLink();
                                            }
                                        }}
                                        className="bg-gray-100 p-6 rounded-2xl flex items-center gap-4 hover:bg-gray-200 transition-colors"
                                    >
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">🔗</div>
                                        <div className="text-left">
                                            <div className="font-bold text-lg text-gray-800">Share Link</div>
                                            <div className="text-sm text-gray-500">Copy or share via apps</div>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => setShareStep('qr_setup')}
                                        className="bg-pink-50 p-6 rounded-2xl flex items-center gap-4 hover:bg-pink-100 transition-colors border border-pink-100"
                                    >
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">🖼️</div>
                                        <div className="text-left">
                                            <div className="font-bold text-lg text-pink-700">Create QR Poster</div>
                                            <div className="text-sm text-pink-500/70">Custom design with your photo</div>
                                        </div>
                                    </button>
                                </div>
                            )}

                            {shareStep === 'qr_setup' && (
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">1. Upload Your Photo</label>
                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors relative overflow-hidden"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            {userPhoto ? (
                                                <img src={userPhoto} alt="Preview" className="h-32 mx-auto object-contain rounded-lg shadow-sm" />
                                            ) : (
                                                <div className="text-gray-400">
                                                    <Upload className="w-8 h-8 mx-auto mb-2" />
                                                    <span>Click to upload photo</span>
                                                </div>
                                            )}
                                            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-bold text-gray-700">2. Choose Frame Style</label>
                                        <div className="flex justify-center gap-4">
                                            {(['circle', 'heart', 'box'] as const).map((frame) => (
                                                <button
                                                    key={frame}
                                                    onClick={() => setSelectedFrame(frame)}
                                                    className={`w-16 h-16 border-2 rounded-xl flex items-center justify-center transition-all ${selectedFrame === frame ? 'border-pink-500 bg-pink-50 text-pink-600 shadow-md transform scale-105' : 'border-gray-200 text-gray-300 hover:border-gray-300'}`}
                                                >
                                                    {frame === 'circle' && <div className="w-8 h-8 rounded-full border-2 border-current" />}
                                                    {frame === 'heart' && <span className="text-2xl">❤️</span>}
                                                    {frame === 'box' && <div className="w-8 h-8 border-2 border-current" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={generatePoster}
                                        disabled={isGenerating}
                                        className="w-full bg-gradient-to-r from-pink-500 to-rose-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {isGenerating ? <Loader2 className="animate-spin" /> : 'Generate Poster ✨'}
                                    </button>
                                </div>
                            )}

                            {shareStep === 'poster_result' && posterUrl && (
                                <div className="space-y-6 text-center">
                                    <div className="bg-gray-100 p-2 rounded-xl">
                                        <img src={posterUrl} alt="Generated Poster" className="w-full rounded-lg shadow-inner max-h-[400px] object-contain" />
                                    </div>
                                    <div className="flex gap-4">
                                        <a
                                            href={posterUrl}
                                            download="valentine-poster.png"
                                            className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors"
                                        >
                                            <Download className="w-4 h-4" /> Download
                                        </a>
                                        <button
                                            onClick={() => setShareStep('menu')}
                                            className="px-6 py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50"
                                        >
                                            Back
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Made with Love */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-12"
                >
                    <p className="text-white/80 text-lg font-medium">
                        Made with 💕 by Gift Magic
                    </p>
                </motion.div>
            </div>

            {/* Firework Effect */}
            {/* Firework Effect - Optimized */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={`firework-${i}`}
                    className="absolute w-2 h-2 rounded-full pointer-events-none"
                    style={{
                        left: '50%',
                        top: '50%',
                        background: ['#fbbf24', '#ec4899', '#ef4444', '#fb923c', '#fff'][i % 5]
                    }}
                    animate={{
                        x: (Math.random() - 0.5) * 800,
                        y: (Math.random() - 0.5) * 800,
                        opacity: [1, 0]
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity
                    }}
                />
            ))}

            {/* Corner Decorations */}
            <motion.div
                className="absolute top-10 left-10 text-9xl opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                💕
            </motion.div>
            <motion.div
                className="absolute top-10 right-10 text-9xl opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
                💖
            </motion.div>
            <motion.div
                className="absolute bottom-10 left-10 text-9xl opacity-20"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 15, repeat: Infinity }}
            >
                💗
            </motion.div>
            <motion.div
                className="absolute bottom-10 right-10 text-9xl opacity-20"
                animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                transition={{ duration: 18, repeat: Infinity }}
            >
                💝
            </motion.div>
        </div>
    );
};

export default Page11Ending;
