import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Share2, RefreshCw, Star, Upload, Download, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';
import V3Background from '../V3Background';
import V3EditableField from '../V3EditableField';
import RealisticHeart from '../RealisticHeart';

interface PageProps {
    data: any;
    onNext: () => void;
    isEditing?: boolean;
    onUpdate?: (field: string, value: any) => void;
}

const Page11Final: React.FC<PageProps> = ({ data, isEditing, onUpdate }) => {
    const [hasExploded, setHasExploded] = useState(false);
    const [showFinalWhisper, setShowFinalWhisper] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareStep, setShareStep] = useState<'menu' | 'qr_setup' | 'poster_result'>('menu');
    const [userPhoto, setUserPhoto] = useState<string | null>(null);
    const [selectedFrame, setSelectedFrame] = useState<'circle' | 'heart' | 'box'>('heart');
    const [posterUrl, setPosterUrl] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const safeUpdate = (field: string, value: any) => {
        if (onUpdate) onUpdate(field, value);
    };

    const handleFinalClick = () => {
        if (hasExploded || isEditing) return;
        setHasExploded(true);

        const duration = 10 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 45, spread: 360, ticks: 100, zIndex: 0, gravity: 0.5, colors: ['#ff4d94', '#ff1a75', '#ff99cc', '#ffffff'] };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 100 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 300);
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

            const width = 1200;
            const height = 1800;
            canvas.width = width;
            canvas.height = height;

            // Premium Background
            const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, height);
            bgGradient.addColorStop(0, '#4a041a');
            bgGradient.addColorStop(0.5, '#2d0b1d');
            bgGradient.addColorStop(1, '#1a050f');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            // QR Code
            const qrDataUrl = await QRCode.toDataURL(window.location.href, {
                width: 400,
                margin: 1,
                color: { dark: '#000000', light: '#ffffff' }
            });
            const qrImg = new Image();
            qrImg.src = qrDataUrl;
            await new Promise((resolve) => { qrImg.onload = resolve; });

            ctx.save();
            ctx.translate(width / 2, height / 2 - 100);
            ctx.shadowColor = 'rgba(255, 77, 148, 0.5)';
            ctx.shadowBlur = 50;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.roundRect(-200, -200, 400, 400, 30);
            ctx.fill();
            ctx.drawImage(qrImg, -180, -180, 360, 360);
            ctx.restore();

            // Text
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.font = 'bold 80px sans-serif';
            ctx.fillText("Our Story Forever", width / 2, height * 0.15);
            ctx.font = 'italic 40px sans-serif';
            ctx.fillText("Scan to experience our journey", width / 2, height * 0.2);

            if (userPhoto) {
                const photoImg = new Image();
                photoImg.src = userPhoto;
                await new Promise((resolve) => { photoImg.onload = resolve; });

                const frameSize = 500;
                const photoY = height * 0.75;

                ctx.save();
                ctx.beginPath();
                if (selectedFrame === 'heart') {
                    const x = width / 2;
                    const y = photoY - frameSize / 2;
                    const s = frameSize;
                    ctx.moveTo(x, y + s * 0.2);
                    ctx.bezierCurveTo(x, y, x - s / 2, y, x - s / 2, y + s * 0.3);
                    ctx.bezierCurveTo(x - s / 2, y + s * 0.65, x, y + s, x, y + s);
                    ctx.bezierCurveTo(x, y + s, x + s / 2, y + s * 0.65, x + s / 2, y + s * 0.3);
                    ctx.bezierCurveTo(x + s / 2, y, x, y, x, y + s * 0.2);
                } else if (selectedFrame === 'circle') {
                    ctx.arc(width / 2, photoY, frameSize / 2, 0, Math.PI * 2);
                } else {
                    ctx.rect(width / 2 - frameSize / 2, photoY - frameSize / 2, frameSize, frameSize);
                }
                ctx.clip();

                const scale = Math.max(frameSize / photoImg.width, frameSize / photoImg.height);
                ctx.drawImage(photoImg, width / 2 - (photoImg.width * scale) / 2, photoY - (photoImg.height * scale) / 2, photoImg.width * scale, photoImg.height * scale);
                ctx.restore();
            }

            setPosterUrl(canvas.toDataURL('image/png'));
            setShareStep('poster_result');
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="min-h-screen v3-theme-pink flex flex-col items-center justify-center p-4 md:p-12 relative overflow-hidden px-4">
            <V3Background />

            <div className="relative z-10 w-full max-w-6xl text-center">
                {(!hasExploded || isEditing) ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="flex flex-col items-center cursor-pointer group"
                        onClick={handleFinalClick}
                    >
                        <div className="mb-12 md:mb-16">
                            <div
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowFinalWhisper(!showFinalWhisper);
                                }}
                                className="inline-flex items-center gap-4 bg-pink-500/10 border border-pink-500/20 px-6 py-2 md:px-8 md:py-3 rounded-full mb-8 md:mb-10 shadow-inner backdrop-blur-sm cursor-help relative"
                            >
                                <V3EditableField
                                    value={data.chapterLabel || "the grand revelation"}
                                    onUpdate={(v) => safeUpdate('chapterLabel', v)}
                                    isEditing={!!isEditing}
                                    label="Chapter"
                                >
                                    <span className="text-pink-600 text-[13px] md:text-[14px] uppercase tracking-[0.4em] font-bold block italic animate-pulse">
                                        {data.chapterLabel || "the grand revelation"}
                                    </span>
                                </V3EditableField>

                                <AnimatePresence>
                                    {showFinalWhisper && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                            className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-pink-100 z-50 pointer-events-none"
                                        >
                                            <p className="text-pink-800 font-romantic italic text-sm text-center">
                                                "Our story is my favorite masterpiece."
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-bold text-[#4a041a] tracking-tighter leading-[0.9] mb-8 md:mb-16 italic">
                                <V3EditableField
                                    value={data.titleLine || "touch my"}
                                    onUpdate={(v) => safeUpdate('titleLine', v)}
                                    isEditing={!!isEditing}
                                >
                                    {data.titleLine || "touch my"}
                                </V3EditableField>
                                <br />
                                <span className="v3-gradient-text block mt-2 md:mt-6">core</span>
                            </h2>
                        </div>

                        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
                            <RealisticHeart size={typeof window !== 'undefined' && window.innerWidth < 768 ? "200px" : "300px"} className="group-hover:scale-105 transition-transform duration-1000" />

                            {[1.2, 1.6].map((s, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ scale: [1, s], opacity: [0.3, 0] }}
                                    transition={{ repeat: Infinity, duration: 3, delay: i * 1.5 }}
                                    className="absolute inset-0 border-2 border-pink-400 rounded-full blur-[2px]"
                                />
                            ))}
                        </div>

                        <div className="mt-16 md:mt-24">
                            <V3EditableField
                                value={data.instruction || "one final beat"}
                                onUpdate={(v) => safeUpdate('instruction', v)}
                                isEditing={!!isEditing}
                            >
                                <p className="text-pink-600/50 text-[12px] md:text-[13px] font-bold italic tracking-[0.5em] group-hover:text-pink-600 transition-all duration-700">
                                    {data.instruction || "one final beat"}
                                </p>
                            </V3EditableField>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.5 }}
                        className="flex flex-col items-center"
                    >
                        <div className="mb-12 md:mb-16 relative w-full px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="relative z-10"
                            >
                                <V3EditableField
                                    value={data.finalTitle || "i love you"}
                                    onUpdate={(v) => safeUpdate('finalTitle', v)}
                                    isEditing={!!isEditing}
                                    label="Title"
                                >
                                    <h1 className="text-6xl md:text-9xl lg:text-[12rem] font-bold text-[#4a041a] tracking-tighter leading-[0.8] mb-8 md:mb-12 v3-gradient-text italic">
                                        {data.finalTitle || "i love you"}
                                    </h1>
                                </V3EditableField>
                            </motion.div>
                        </div>

                        <V3EditableField
                            value={data.finalMessage || "And just like that, the universe makes sense. You are the destination of every journey I've ever taken."}
                            onUpdate={(v) => safeUpdate('finalMessage', v)}
                            isEditing={!!isEditing}
                            type="textarea"
                            label="Msg"
                        >
                            <p className="text-[#4a041a] text-2xl md:text-5xl max-w-5xl mx-auto font-romantic italic mb-12 md:mb-20 leading-tight font-bold tracking-tight drop-shadow-sm">
                                "{data.finalMessage || "And just like that, the universe makes sense. You are the destination of every journey I've ever taken."}"
                            </p>
                        </V3EditableField>

                        <V3EditableField
                            value={data.signature || "Forever Yours"}
                            onUpdate={(v) => safeUpdate('signature', v)}
                            isEditing={!!isEditing}
                            label="Sign"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mb-16 md:mb-32 relative"
                            >
                                <div className="inline-flex flex-col items-center">
                                    <span className="text-pink-600/40 text-[12px] font-bold block mb-4 italic tracking-widest uppercase">authenticated by</span>
                                    <div className="text-[#4a041a] font-handwriting text-6xl md:text-8xl -rotate-3 filter drop-shadow-sm">
                                        {data.signature || "Forever Yours"}
                                    </div>
                                    <div className="w-32 h-1.5 bg-pink-500/10 rounded-full mt-4 blur-sm" />
                                </div>
                            </motion.div>
                        </V3EditableField>

                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.reload()}
                                className="group relative px-10 py-5 md:px-14 md:py-7 v3-glass-card border-white shadow-lg rounded-[2rem] text-[#4a041a] font-bold text-[13px] tracking-widest transition-all flex items-center gap-4"
                            >
                                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-1000 text-pink-500" />
                                <span className="italic uppercase">replay story</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowShareModal(true)}
                                className="relative px-12 py-6 md:px-16 md:py-8 bg-gradient-to-r from-[#ff4d94] to-[#ff1a75] text-white rounded-[2rem] font-bold text-[13px] tracking-widest shadow-xl transition-all flex items-center gap-4 border-2 border-white/20"
                            >
                                <Share2 className="w-5 h-5" />
                                <span className="italic uppercase">share & qr code</span>
                                <div className="absolute inset-0 bg-white/10 translate-x-full hover:translate-x-0 transition-transform duration-500" />
                            </motion.button>
                        </div>

                        {showShareModal && (
                            <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="bg-white rounded-[3rem] p-8 md:p-12 max-w-lg w-full relative shadow-2xl"
                                >
                                    <button
                                        onClick={() => setShowShareModal(false)}
                                        className="absolute top-6 right-6 text-gray-400 hover:text-pink-500 transition-colors"
                                    >
                                        ✕
                                    </button>

                                    <h3 className="text-3xl font-bold text-center mb-8 text-[#4a041a] italic">Share Our Legacy</h3>

                                    {shareStep === 'menu' && (
                                        <div className="grid grid-cols-1 gap-6">
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(window.location.href);
                                                    alert("Link copied!");
                                                }}
                                                className="bg-pink-50/50 p-6 rounded-3xl flex items-center gap-6 hover:bg-pink-100 transition-all border border-pink-100"
                                            >
                                                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">🔗</div>
                                                <div className="text-left font-bold text-[#4a041a] italic">Share Secret Link</div>
                                            </button>
                                            <button
                                                onClick={() => setShareStep('qr_setup')}
                                                className="bg-[#4a041a] p-6 rounded-3xl flex items-center gap-6 hover:opacity-90 transition-all text-white"
                                            >
                                                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-2xl">🖼️</div>
                                                <div className="text-left font-bold italic">Create QR Poster</div>
                                            </button>
                                        </div>
                                    )}

                                    {shareStep === 'qr_setup' && (
                                        <div className="space-y-8">
                                            <div onClick={() => fileInputRef.current?.click()} className="border-4 border-dashed border-pink-100 rounded-[2.5rem] p-10 text-center cursor-pointer hover:bg-pink-50 transition-all relative">
                                                {userPhoto ? (
                                                    <img src={userPhoto} className="h-40 mx-auto rounded-2xl object-cover" />
                                                ) : (
                                                    <div className="text-pink-300">
                                                        <Upload className="w-10 h-10 mx-auto mb-4" />
                                                        <span className="font-bold italic">Upload Memory</span>
                                                    </div>
                                                )}
                                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                                            </div>
                                            <div className="flex justify-center gap-6">
                                                {(['heart', 'circle', 'box'] as const).map(f => (
                                                    <button key={f} onClick={() => setSelectedFrame(f)} className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${selectedFrame === f ? 'border-pink-500 bg-pink-50' : 'border-gray-100'}`}>
                                                        {f === 'heart' ? '❤️' : f === 'circle' ? '⭕' : '⬜'}
                                                    </button>
                                                ))}
                                            </div>
                                            <button onClick={generatePoster} disabled={isGenerating} className="w-full bg-gradient-to-r from-[#ff4d94] to-[#ff1a75] py-5 rounded-2xl text-white font-bold italic tracking-widest shadow-xl flex items-center justify-center gap-3">
                                                {isGenerating ? <Loader2 className="animate-spin" /> : 'GENERATE PORTRAIT'}
                                            </button>
                                        </div>
                                    )}

                                    {shareStep === 'poster_result' && posterUrl && (
                                        <div className="space-y-8 text-center">
                                            <img src={posterUrl} className="w-full rounded-2xl shadow-xl max-h-[400px] object-contain" />
                                            <div className="flex gap-4">
                                                <a href={posterUrl} download="our-love.png" className="flex-1 bg-[#4a041a] text-white py-4 rounded-2xl font-bold italic flex items-center justify-center gap-3 shadow-lg">
                                                    <Download className="w-5 h-5" /> DOWNLOAD
                                                </a>
                                                <button onClick={() => setShareStep('menu')} className="px-8 py-4 bg-gray-100 rounded-2xl font-bold text-gray-400">BACK</button>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        )}

                        <div className="mt-12 md:mt-20 opacity-10">
                            <Star className="w-8 h-8 text-pink-500 animate-spin-slow" />
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Page11Final;
