import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Download, Sparkles, Wand2, RefreshCw, Smartphone, Music, Check } from 'lucide-react';
import QRCode from 'qrcode';
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
            toast({ title: "Image Required", description: "Please upload an image to create the poster.", variant: "destructive" });
            return;
        }

        setIsGenerating(true);

        try {
            // 1. Generate QR Code (High Res)
            const qrDataUrl = await QRCode.toDataURL(giftUrl, {
                errorCorrectionLevel: 'H',
                margin: 2,
                width: 1000,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });

            // 2. Setup Canvas (High Resolution - 4K-ish)
            const canvas = canvasRef.current;
            if (!canvas) throw new Error("Canvas not found");
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error("Context not found");

            const width = 2160; // 4K vertical width approx or decent poster size
            const height = 3840; // 9:16 aspect ratio

            canvas.width = width;
            canvas.height = height;

            // Load Images
            const userImg = new Image();
            userImg.src = image;
            await new Promise(resolve => userImg.onload = resolve);

            const qrImg = new Image();
            qrImg.src = qrDataUrl;
            await new Promise(resolve => qrImg.onload = resolve);

            // --- DRAWING THE SCENE ---

            // 1. Background (Gradient + Noise)
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#0f0c29');
            gradient.addColorStop(0.5, '#302b63');
            gradient.addColorStop(1, '#24243e');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            // Add simulated noise/texture
            // (Simple random dots for texture)
            ctx.fillStyle = 'rgba(255,255,255,0.03)';
            for (let i = 0; i < 5000; i++) {
                ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
            }

            // 2. 3D Platform/Floor
            // Simple perspective grid at bottom
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, height * 0.7);
            ctx.lineTo(width, height * 0.7);
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            const floorGrad = ctx.createLinearGradient(0, height * 0.7, 0, height);
            floorGrad.addColorStop(0, 'rgba(0,0,0,0.5)');
            floorGrad.addColorStop(1, 'rgba(0,0,0,0.8)');
            ctx.fillStyle = floorGrad;
            ctx.fill();
            ctx.restore();

            // 3. User Image (Bottom Center, "Floating" or "Standing")
            // Make it circular with a glow
            const imgSize = width * 0.5;
            const imgX = (width - imgSize) / 2;
            const imgY = height * 0.55;

            ctx.save();
            // Glow
            ctx.shadowColor = '#d946ef'; // Fuchsia glow
            ctx.shadowBlur = 100;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;

            // Frame
            ctx.beginPath();
            ctx.arc(width / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            // Draw Image (Cover fit)
            const aspect = userImg.width / userImg.height;
            let drawW = imgSize;
            let drawH = imgSize / aspect;
            if (aspect < 1) { // Tall image
                drawW = imgSize * (1 / aspect);
                drawH = imgSize;
            }
            // Center crop
            ctx.drawImage(userImg, width / 2 - drawW / 2, imgY + imgSize / 2 - drawH / 2, drawW, drawH);

            ctx.restore();

            // Border for Image
            ctx.beginPath();
            ctx.arc(width / 2, imgY + imgSize / 2, imgSize / 2, 0, Math.PI * 2);
            ctx.lineWidth = 20;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();


            // 4. Two QR Codes (Left and Right, "3D" Tilted)
            // We simulate 3D tilt by skewing or just perspective transform logic if we implement a helper.
            // For simplicity and robustness, we'll draw them as "floating cards" on the sides.

            const qrCardSize = width * 0.25;
            const qrY = height * 0.35; // Above the user image

            // Left QR
            ctx.save();
            ctx.translate(width * 0.2, qrY);
            ctx.rotate(-0.1); // Slight tilt inward
            // Shadow
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 50;
            ctx.shadowOffsetY = 30;
            // Card background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, qrCardSize, qrCardSize);
            // QR
            ctx.drawImage(qrImg, 10, 10, qrCardSize - 20, qrCardSize - 20);
            ctx.restore();

            // Right QR
            ctx.save();
            ctx.translate(width * 0.8 - qrCardSize, qrY);
            ctx.rotate(0.1); // Slight tilt inward
            // Shadow
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 50;
            ctx.shadowOffsetY = 30;
            // Card background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, qrCardSize, qrCardSize);
            // QR
            ctx.drawImage(qrImg, 10, 10, qrCardSize - 20, qrCardSize - 20);
            ctx.restore();

            // 5. Text Overlay
            ctx.font = 'bold 120px Outfit, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.shadowColor = 'rgba(0,0,0,0.8)';
            ctx.shadowBlur = 20;
            ctx.fillText("Scan to Reveal", width / 2, height * 0.2);

            ctx.font = 'italic 80px Outfit, serif';
            ctx.fillStyle = '#e879f9'; // Pink-ish
            ctx.fillText("A Surprise Awaits", width / 2, height * 0.25);

            // 6. Final Polish
            // Add a subtle vignette
            const vignette = ctx.createRadialGradient(width / 2, height / 2, width / 3, width / 2, height / 2, height);
            vignette.addColorStop(0, 'rgba(0,0,0,0)');
            vignette.addColorStop(1, 'rgba(0,0,0,0.6)');
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, width, height);

            // Export
            const resultUrl = canvas.toDataURL('image/png', 1.0);
            setGeneratedQR(resultUrl);

            toast({ title: "Poster Generated!", description: "High-quality poster created successfully." });

        } catch (error) {
            console.error(error);
            toast({ title: "Generation Failed", description: "Could not generate poster.", variant: "destructive" });
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadQR = () => {
        if (generatedQR) {
            const link = document.createElement('a');
            link.href = generatedQR;
            link.download = 'valentine-poster.png';
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
                                <Sparkles className="w-4 h-4" /> Poster Creator
                            </div>
                            <h2 className="text-2xl font-black text-white mb-2">3D QR Poster</h2>
                            <p className="text-white/50 text-sm">Create a stunning, high-resolution poster with dual suspended QR codes.</p>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-wider">Upload Main Image</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-white/10 rounded-2xl p-6 hover:bg-white/5 transition-colors cursor-pointer text-center group relative overflow-hidden"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                                {image ? (
                                    <div className="relative aspect-square w-full mx-auto rounded-lg overflow-hidden border border-white/20">
                                        <img src={image} className="w-full h-full object-cover" alt="Base" />
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <RefreshCw className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-8 h-8 text-white/30 mx-auto mb-2 group-hover:text-purple-400 transition-colors" />
                                        <span className="text-xs text-white/40 font-medium">Click to Upload Photo</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {image && (
                            <button
                                onClick={generateAIQR}
                                disabled={isGenerating}
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-white uppercase tracking-widest hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-auto"
                            >
                                {isGenerating ? (
                                    <>
                                        <Sparkles className="w-4 h-4 animate-spin" /> Rendering...
                                    </>
                                ) : (
                                    <>
                                        <Wand2 className="w-4 h-4" /> Generate Poster
                                    </>
                                )}
                            </button>
                        )}

                        <div className="mt-auto pt-4 border-t border-white/5">
                            <p className="text-[10px] text-white/30 text-center">Output Quality: 8K Ultra HD Simulation</p>
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

                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <canvas ref={canvasRef} className="hidden" /> {/* Always hidden, we show img result */}

                            {generatedQR ? (
                                <div className="relative w-full max-h-full flex items-center justify-center group">
                                    <img
                                        src={generatedQR}
                                        alt="Generated Poster"
                                        className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl border border-white/5"
                                    />
                                    <div className="absolute inset-x-0 bottom-0 p-6 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent">
                                        <button
                                            onClick={downloadQR}
                                            className="px-8 py-3 bg-white text-black font-bold rounded-xl uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-transform shadow-xl"
                                        >
                                            <Download className="w-4 h-4" /> Download 8K Poster
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center p-8 opacity-50">
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 dashed">
                                        <Sparkles className="w-10 h-10 text-white/20" />
                                    </div>
                                    <h3 className="text-white font-bold text-xl mb-2">Preview Canvas</h3>
                                    <p className="text-white/40 text-sm max-w-[300px] mx-auto">
                                        Upload your photo and click generate to see the hyper-realistic 3D poster result.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default AIQRCodeGenerator;
