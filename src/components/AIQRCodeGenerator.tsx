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

            // --- DRAWING THE SCENE (8K HYPER-REALISTIC STYLE) ---

            // 1. Deep Premium Background
            const bgGradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, height);
            bgGradient.addColorStop(0, '#2d0b1d'); // Deep wine
            bgGradient.addColorStop(0.5, '#1a050f'); // Near black
            bgGradient.addColorStop(1, '#050105'); // Absolute depths
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            // 2. Ambient Particles & Glows
            for (let i = 0; i < 40; i++) {
                const x = Math.random() * width;
                const y = Math.random() * height;
                const size = Math.random() * 300 + 100;
                const pGlow = ctx.createRadialGradient(x, y, 0, x, y, size);
                pGlow.addColorStop(0, 'rgba(240, 66, 153, 0.08)');
                pGlow.addColorStop(1, 'rgba(240, 66, 153, 0)');
                ctx.fillStyle = pGlow;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }

            // 3. Top Call to Action Text
            ctx.shadowColor = 'rgba(240, 66, 153, 0.8)';
            ctx.shadowBlur = 40;
            ctx.font = 'black 140px Outfit, sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.fillText("Scan this for a surprise!", width / 2, height * 0.15);

            ctx.shadowBlur = 0;
            ctx.font = 'bold 80px Outfit, sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.fillText("A Special Mystery Awaits You", width / 2, height * 0.185);

            // 4. Central Design: Two QR Codes and Two Teddy Bears
            const qrSize = width * 0.28;
            const centralY = height * 0.4;

            // Shared QR Drawing Logic Helper
            const drawQRCard = (x: number, y: number, rotation: number) => {
                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(rotation);

                // Card Shadow (Premium Soft)
                ctx.shadowColor = 'rgba(0,0,0,0.8)';
                ctx.shadowBlur = 80;
                ctx.shadowOffsetY = 40;

                // Card Border Glow
                ctx.strokeStyle = 'rgba(240, 66, 153, 0.5)';
                ctx.lineWidth = 4;

                // White Card
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.roundRect(-qrSize / 2, -qrSize / 2, qrSize, qrSize, 40);
                ctx.fill();
                ctx.stroke();

                // QR Image
                ctx.shadowBlur = 0;
                ctx.drawImage(qrImg, -qrSize / 2 + 20, -qrSize / 2 + 20, qrSize - 40, qrSize - 40);

                ctx.restore();
            };

            // Left QR
            drawQRCard(width * 0.32, centralY, -0.08);
            // Right QR
            drawQRCard(width * 0.68, centralY, 0.08);

            // 5. Teddy Bears (Flanking)
            // We use high-detail emojis but with cinematic layer effects
            const drawTeddy = (x: number, y: number, scale: number, flip = false) => {
                ctx.save();
                ctx.translate(x, y);
                if (flip) ctx.scale(-1, 1);

                // Ambient Occlusion Shadow
                ctx.shadowColor = 'rgba(0,0,0,0.6)';
                ctx.shadowBlur = 60;
                ctx.shadowOffsetY = 30;

                ctx.font = `${scale}px serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText("🧸", 0, 0);

                // Rim Light Effect (Subtle glow)
                ctx.shadowColor = '#f04299';
                ctx.shadowBlur = 20;
                ctx.globalCompositeOperation = 'source-atop';
                ctx.fillStyle = 'rgba(240, 66, 153, 0.1)';
                ctx.fillText("🧸", 0, 0);

                ctx.restore();
            };

            drawTeddy(width * 0.12, centralY, 450); // Left Bear
            drawTeddy(width * 0.88, centralY, 450, true); // Right Bear

            // 6. User's Photo (Premium Heart Frame at Bottom)
            const photoSize = width * 0.6;
            const photoY = height * 0.72;

            // Heart Shape Mask Function
            const drawHeartPath = (x: number, y: number, size: number) => {
                ctx.beginPath();
                const topCurveHeight = size * 0.3;
                ctx.moveTo(x, y + size * 0.2);
                ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + topCurveHeight);
                ctx.bezierCurveTo(x - size / 2, y + (size + topCurveHeight) / 2, x, y + size, x, y + size);
                ctx.bezierCurveTo(x, y + size, x + size / 2, y + (size + topCurveHeight) / 2, x + size / 2, y + topCurveHeight);
                ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size * 0.2);
                ctx.closePath();
            };

            // Photo Glow
            ctx.save();
            ctx.shadowColor = '#f04299';
            ctx.shadowBlur = 120;
            drawHeartPath(width / 2, photoY - photoSize / 2, photoSize);
            ctx.fillStyle = 'rgba(240, 66, 153, 0.3)';
            ctx.fill();
            ctx.restore();

            // Mask Image
            ctx.save();
            drawHeartPath(width / 2, photoY - photoSize / 2, photoSize);
            ctx.clip();

            const aspect = userImg.width / userImg.height;
            let dW = photoSize;
            let dH = photoSize / aspect;
            if (aspect < 1) {
                dW = photoSize * aspect;
                dH = photoSize;
            }
            ctx.drawImage(userImg, width / 2 - dW / 2, photoY - dH / 2 + 50, dW, dH);
            ctx.restore();

            // Heart Border
            ctx.save();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 15;
            drawHeartPath(width / 2, photoY - photoSize / 2, photoSize);
            ctx.stroke();
            ctx.restore();

            // 7. Footer & Branding
            const footerY = height - 300;
            ctx.font = 'black 60px Outfit, sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.textAlign = 'center';
            ctx.fillText("GIFT MAGIC", width / 2, footerY);

            ctx.font = 'bold 30px Outfit, sans-serif';
            ctx.letterSpacing = '10px';
            ctx.fillText("DIGITAL EXPERIENCE", width / 2, footerY + 60);

            // 8. Cinematic Overlay (Vignette)
            const vignette = ctx.createRadialGradient(width / 2, height / 2, width / 4, width / 2, height / 2, height);
            vignette.addColorStop(0, 'rgba(0,0,0,0)');
            vignette.addColorStop(1, 'rgba(0,0,0,0.7)');
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, width, height);

            // Export Result
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
