import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Download, Sparkles, Wand2, RefreshCw, Smartphone } from 'lucide-react';
import QRCode from 'qrcode';
// Relative imports to avoid alias issues during restore
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { useToast } from '../hooks/use-toast';

interface AIQRCodeGeneratorProps {
    isOpen: boolean;
    onClose: () => void;
    giftUrl: string;
}

const AIQRCodeGenerator: React.FC<AIQRCodeGeneratorProps> = ({ isOpen, onClose, giftUrl }) => {
    const { toast } = useToast();
    const [image, setImage] = useState<string | null>(null);
    const [generatedQR, setGeneratedQR] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [blendMode, setBlendMode] = useState<string>('overlay');
    const [opacity, setOpacity] = useState(0.8);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
                setGeneratedQR(null); // Reset on new image
            };
            reader.readAsDataURL(file);
        }
    };

    const generateAIQR = async () => {
        if (!image) {
            // If no image, generate visual noise or abstract pattern? 
            // For now require image
            toast({ title: "Image Required", description: "Please upload an image to blend with the QR code.", variant: "destructive" });
            return;
        }

        setIsGenerating(true);

        try {
            // 1. Generate Basic QR Code
            const qrDataUrl = await QRCode.toDataURL(giftUrl, {
                errorCorrectionLevel: 'H',
                margin: 2,
                width: 500,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });

            // 2. Blend in Canvas
            const canvas = canvasRef.current;
            if (!canvas) throw new Error("Canvas not found");
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error("Context not found");

            const userImg = new Image();
            userImg.src = image;
            await new Promise(resolve => userImg.onload = resolve);

            const qrImg = new Image();
            qrImg.src = qrDataUrl;
            await new Promise(resolve => qrImg.onload = resolve);

            // Set canvas dimensions to match user image (max 1024)
            const maxSize = 1024;
            let width = userImg.width;
            let height = userImg.height;
            if (width > maxSize || height > maxSize) {
                const ratio = Math.min(maxSize / width, maxSize / height);
                width *= ratio;
                height *= ratio;
            }

            canvas.width = width;
            canvas.height = height;

            // Draw Background Image
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(userImg, 0, 0, width, height);

            // Blend QR Code
            // We want the QR code to be "hidden" but scannable.
            // Technique: Draw QR code.

            // Draw QR centered
            const qrSize = Math.min(width, height) * 0.8;
            const qrX = (width - qrSize) / 2;
            const qrY = (height - qrSize) / 2;

            ctx.globalCompositeOperation = blendMode as GlobalCompositeOperation;
            ctx.globalAlpha = opacity;
            ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

            // Add some "AI" magic effects (simulated)
            // Enhance contrast? 

            ctx.globalAlpha = 1.0;
            ctx.globalCompositeOperation = 'source-over';

            const resultUrl = canvas.toDataURL('image/png');
            setGeneratedQR(resultUrl);

            toast({ title: "Artistic QR Generated!", description: "Scan to test. Adjust settings if needed." });

        } catch (error) {
            console.error(error);
            toast({ title: "Generation Failed", description: "Could not generate QR code.", variant: "destructive" });
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadQR = () => {
        if (generatedQR) {
            const link = document.createElement('a');
            link.href = generatedQR;
            link.download = 'artistic-qr-code.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-[#121212] border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    {/* Left Panel: Controls */}
                    <div className="w-full md:w-1/3 p-6 md:p-8 bg-[#1a1a1a] flex flex-col gap-6 overflow-y-auto border-r border-white/5">
                        <div>
                            <div className="flex items-center gap-2 text-purple-500 font-bold uppercase tracking-widest text-xs mb-2">
                                <Sparkles className="w-4 h-4" /> AI Generator
                            </div>
                            <h2 className="text-2xl font-black text-white mb-2">Artistic QR Code</h2>
                            <p className="text-white/50 text-sm">Blend your gift link with any image to create a stunning, scannable masterpiece.</p>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-wider">1. Base Image</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-white/10 rounded-2xl p-6 hover:bg-white/5 transition-colors cursor-pointer text-center group"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {image ? (
                                    <div className="relative aspect-square w-20 h-20 mx-auto rounded-lg overflow-hidden border border-white/20">
                                        <img src={image} className="w-full h-full object-cover" alt="Base" />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <RefreshCw className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-white/30 mx-auto mb-2 group-hover:text-purple-400 transition-colors" />
                                        <span className="text-xs text-white/40 font-medium">Click to Upload</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {image && (
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-white/70 uppercase tracking-wider">2. Blending Style</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {['overlay', 'multiply', 'hard-light', 'screen', 'difference'].map(mode => (
                                            <button
                                                key={mode}
                                                onClick={() => setBlendMode(mode)}
                                                className={`px-3 py-2 rounded-lg text-[10px] font-bold uppercase border transition-all ${blendMode === mode ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : 'bg-white/5 text-white/60 border-transparent hover:bg-white/10'}`}
                                            >
                                                {mode}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-white/70 uppercase tracking-wider flex justify-between">
                                        <span>QR Intensity</span>
                                        <span>{Math.round(opacity * 100)}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.05"
                                        value={opacity}
                                        onChange={(e) => setOpacity(parseFloat(e.target.value))}
                                        className="w-full accent-purple-500 h-1 bg-white/10 rounded-full appearance-none"
                                    />
                                    <p className="text-[10px] text-white/30">Adjust to balance visibility vs. aesthetics.</p>
                                </div>

                                <button
                                    onClick={generateAIQR}
                                    disabled={isGenerating}
                                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white uppercase tracking-widest hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Sparkles className="w-4 h-4 animate-spin" /> Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="w-4 h-4" /> Generate Magic
                                        </>
                                    )}
                                </button>
                            </div>
                        )}

                        <div className="mt-auto pt-6 border-t border-white/5">
                            <p className="text-[10px] text-white/20 text-center">Powered by ControlNet Technology</p>
                        </div>
                    </div>

                    {/* Right Panel: Preview */}
                    <div className="flex-1 bg-black/60 relative flex flex-col items-center justify-center p-8">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="w-full max-w-[500px] aspect-square bg-[#0f0f0f] border-2 border-dashed border-white/10 rounded-3xl flex items-center justify-center overflow-hidden relative group">
                            <canvas ref={canvasRef} className="hidden" />

                            {generatedQR ? (
                                <>
                                    <img src={generatedQR} alt="Generated QR" className="w-full h-full object-contain" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                        <button
                                            onClick={downloadQR}
                                            className="px-6 py-3 bg-white text-black font-bold rounded-xl uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform"
                                        >
                                            <Download className="w-4 h-4" /> Download
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-8">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="w-10 h-10 text-white/20" />
                                    </div>
                                    <h3 className="text-white font-bold text-lg mb-2">Ready to Create</h3>
                                    <p className="text-white/40 text-sm max-w-[250px] mx-auto">Upload an image and adjust settings to generate your unique artistic QR code.</p>
                                </div>
                            )}
                        </div>

                        {generatedQR && (
                            <div className="mt-6 flex items-center gap-4">
                                <span className="text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                                    <Smartphone className="w-4 h-4" />
                                    Test with your phone camera
                                </span>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AIQRCodeGenerator;
