/**
 * AI Artistic QR Code Generator
 * Generates QR codes integrated into user-uploaded images
 * Uses Hugging Face API with Stable Diffusion + ControlNet
 */

export interface AIQRCodeOptions {
    prompt?: string;
    strength?: number; // 0-1, how much to blend with original image
    guidanceScale?: number; // 7-15, how closely to follow the prompt
    controlnetConditioningScale?: number; // 0-2, QR code visibility
}

export interface AIQRCodeResult {
    imageUrl: string;
    dataUrl?: string;
    error?: string;
}

export class AIQRCodeService {
    private static readonly HF_API_URL = 'https://api-inference.huggingface.co/models/';
    private static readonly QR_MODEL = 'monster-labs/control_v1p_sd15_qrcode_monster';

    // Alternative: Use a simpler canvas-based approach
    private static readonly USE_CANVAS_FALLBACK = true;

    /**
     * Generate AI artistic QR code using Hugging Face API
     */
    static async generateAIQRCode(
        qrCodeDataUrl: string,
        userImageFile: File,
        giftUrl: string,
        options: AIQRCodeOptions = {}
    ): Promise<AIQRCodeResult> {
        // Check if we should use fallback method
        if (this.USE_CANVAS_FALLBACK) {
            return this.generateCanvasBasedAIQR(qrCodeDataUrl, userImageFile, options);
        }

        // Hugging Face API method (requires API key)
        return this.generateHuggingFaceAIQR(qrCodeDataUrl, userImageFile, options);
    }

    /**
     * Canvas-based AI QR Code (Fallback - No API needed)
     * Blends QR code with user image using canvas manipulation
     */
    private static async generateCanvasBasedAIQR(
        qrCodeDataUrl: string,
        userImageFile: File,
        options: AIQRCodeOptions = {}
    ): Promise<AIQRCodeResult> {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Canvas not supported');

            // Load user image
            const userImage = await this.loadImage(URL.createObjectURL(userImageFile));

            // Load QR code
            const qrImage = await this.loadImage(qrCodeDataUrl);

            // Set canvas size to match user image
            const size = Math.min(userImage.width, userImage.height, 1024);
            canvas.width = size;
            canvas.height = size;

            // Draw user image (scaled and centered)
            const scale = size / Math.max(userImage.width, userImage.height);
            const scaledWidth = userImage.width * scale;
            const scaledHeight = userImage.height * scale;
            const x = (size - scaledWidth) / 2;
            const y = (size - scaledHeight) / 2;

            ctx.drawImage(userImage, x, y, scaledWidth, scaledHeight);

            // Apply artistic filter to user image
            this.applyArtisticFilter(ctx, size, size);

            // Overlay QR code with blend mode
            ctx.globalAlpha = options.strength || 0.7;
            ctx.globalCompositeOperation = 'multiply';
            ctx.drawImage(qrImage, 0, 0, size, size);

            // Add subtle glow effect around QR code
            ctx.globalCompositeOperation = 'screen';
            ctx.globalAlpha = 0.3;
            ctx.filter = 'blur(4px)';
            ctx.drawImage(qrImage, 0, 0, size, size);

            // Reset composite operation
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
            ctx.filter = 'none';

            // Enhance contrast for better scannability
            this.enhanceContrast(ctx, size, size);

            const dataUrl = canvas.toDataURL('image/png', 1.0);

            return {
                imageUrl: dataUrl,
                dataUrl: dataUrl
            };
        } catch (error) {
            console.error('Error generating canvas-based AI QR:', error);
            return {
                imageUrl: '',
                error: 'Failed to generate AI QR code'
            };
        }
    }

    /**
     * Hugging Face API method (requires API key)
     */
    private static async generateHuggingFaceAIQR(
        qrCodeDataUrl: string,
        userImageFile: File,
        options: AIQRCodeOptions = {}
    ): Promise<AIQRCodeResult> {
        const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;

        if (!apiKey) {
            console.warn('Hugging Face API key not found, using fallback method');
            return this.generateCanvasBasedAIQR(qrCodeDataUrl, userImageFile, options);
        }

        try {
            // Convert files to base64
            const qrBase64 = qrCodeDataUrl.split(',')[1];
            const userImageBase64 = await this.fileToBase64(userImageFile);

            const response = await fetch(`${this.HF_API_URL}${this.QR_MODEL}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inputs: {
                        prompt: options.prompt || 'artistic, beautiful, high quality, detailed',
                        image: userImageBase64,
                        qr_code: qrBase64,
                        guidance_scale: options.guidanceScale || 10,
                        controlnet_conditioning_scale: options.controlnetConditioningScale || 1.5
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.statusText}`);
            }

            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);

            return {
                imageUrl,
                dataUrl: await this.blobToDataUrl(blob)
            };
        } catch (error) {
            console.error('Error with Hugging Face API:', error);
            // Fallback to canvas method
            return this.generateCanvasBasedAIQR(qrCodeDataUrl, userImageFile, options);
        }
    }

    /**
     * Apply artistic filter to enhance image
     */
    private static applyArtisticFilter(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ): void {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        // Increase saturation and contrast
        for (let i = 0; i < data.length; i += 4) {
            // Increase contrast
            data[i] = ((data[i] - 128) * 1.2) + 128;     // Red
            data[i + 1] = ((data[i + 1] - 128) * 1.2) + 128; // Green
            data[i + 2] = ((data[i + 2] - 128) * 1.2) + 128; // Blue
        }

        ctx.putImageData(imageData, 0, 0);
    }

    /**
     * Enhance contrast for better QR code scannability
     */
    private static enhanceContrast(
        ctx: CanvasRenderingContext2D,
        width: number,
        height: number
    ): void {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

            // Push towards black or white for better QR contrast
            if (avg < 128) {
                data[i] = Math.max(0, data[i] - 20);
                data[i + 1] = Math.max(0, data[i + 1] - 20);
                data[i + 2] = Math.max(0, data[i + 2] - 20);
            } else {
                data[i] = Math.min(255, data[i] + 20);
                data[i + 1] = Math.min(255, data[i + 1] + 20);
                data[i + 2] = Math.min(255, data[i + 2] + 20);
            }
        }

        ctx.putImageData(imageData, 0, 0);
    }

    /**
     * Load image from URL
     */
    private static loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    /**
     * Convert File to base64
     */
    private static fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                resolve(result.split(',')[1]); // Remove data:image/...;base64, prefix
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    /**
     * Convert Blob to Data URL
     */
    private static blobToDataUrl(blob: Blob): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    /**
     * Validate image file
     */
    static validateImageFile(file: File): { valid: boolean; error?: string } {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

        if (!allowedTypes.includes(file.type)) {
            return {
                valid: false,
                error: 'Please upload a JPEG, PNG, or WebP image'
            };
        }

        if (file.size > maxSize) {
            return {
                valid: false,
                error: 'Image size must be less than 10MB'
            };
        }

        return { valid: true };
    }
}

export default AIQRCodeService;
