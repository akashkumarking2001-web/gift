import QRCode from 'qrcode';
import { nanoid } from 'nanoid';

export interface QRCodeOptions {
    size?: number;
    color?: {
        dark?: string;
        light?: string;
    };
    errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
    margin?: number;
}

export interface GeneratedLink {
    uniqueId: string;
    fullUrl: string;
    shortUrl?: string;
}

export class QRCodeService {
    private static readonly BASE_URL = typeof window !== 'undefined'
        ? window.location.origin
        : 'https://your-domain.com';

    /**
     * Generate a unique link ID for a gift
     */
    static generateUniqueId(): string {
        return nanoid(12); // Generates a 12-character unique ID
    }

    /**
     * Generate full URL for a gift
     */
    static generateGiftUrl(uniqueId: string): GeneratedLink {
        const fullUrl = `${this.BASE_URL}/gift/${uniqueId}`;

        return {
            uniqueId,
            fullUrl,
            shortUrl: fullUrl // Can integrate with URL shortener service later
        };
    }

    /**
     * Generate standard QR code as Data URL
     */
    static async generateQRCode(
        url: string,
        options: QRCodeOptions = {}
    ): Promise<string> {
        const defaultOptions: QRCode.QRCodeToDataURLOptions = {
            width: options.size || 512,
            margin: options.margin || 2,
            errorCorrectionLevel: options.errorCorrectionLevel || 'H',
            color: {
                dark: options.color?.dark || '#000000',
                light: options.color?.light || '#FFFFFF'
            }
        };

        try {
            const dataUrl = await QRCode.toDataURL(url, defaultOptions);
            return dataUrl;
        } catch (error) {
            console.error('Error generating QR code:', error);
            throw new Error('Failed to generate QR code');
        }
    }

    /**
     * Generate QR code as Canvas element (for custom styling)
     */
    static async generateQRCodeCanvas(
        url: string,
        canvas: HTMLCanvasElement,
        options: QRCodeOptions = {}
    ): Promise<void> {
        const defaultOptions: QRCode.QRCodeToCanvasOptions = {
            width: options.size || 512,
            margin: options.margin || 2,
            errorCorrectionLevel: options.errorCorrectionLevel || 'H',
            color: {
                dark: options.color?.dark || '#000000',
                light: options.color?.light || '#FFFFFF'
            }
        };

        try {
            await QRCode.toCanvas(canvas, url, defaultOptions);
        } catch (error) {
            console.error('Error generating QR code canvas:', error);
            throw new Error('Failed to generate QR code canvas');
        }
    }

    /**
     * Generate styled QR code with logo/image in center
     */
    static async generateStyledQRCode(
        url: string,
        logoUrl?: string,
        options: QRCodeOptions = {}
    ): Promise<string> {
        const canvas = document.createElement('canvas');
        const size = options.size || 512;
        canvas.width = size;
        canvas.height = size;

        // Generate base QR code
        await this.generateQRCodeCanvas(url, canvas, options);

        // Add logo if provided
        if (logoUrl) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const logo = new Image();
                logo.crossOrigin = 'anonymous';

                await new Promise((resolve, reject) => {
                    logo.onload = resolve;
                    logo.onerror = reject;
                    logo.src = logoUrl;
                });

                // Calculate logo size (20% of QR code)
                const logoSize = size * 0.2;
                const logoX = (size - logoSize) / 2;
                const logoY = (size - logoSize) / 2;

                // Draw white background for logo
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(logoX - 10, logoY - 10, logoSize + 20, logoSize + 20);

                // Draw logo
                ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
            }
        }

        return canvas.toDataURL('image/png');
    }

    /**
     * Download QR code as PNG
     */
    static downloadQRCode(dataUrl: string, filename: string = 'qrcode.png'): void {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Generate QR code with custom colors matching brand
     */
    static async generateBrandedQRCode(
        url: string,
        brandColor: string = '#f04299',
        options: QRCodeOptions = {}
    ): Promise<string> {
        return this.generateQRCode(url, {
            ...options,
            color: {
                dark: brandColor,
                light: '#FFFFFF'
            }
        });
    }

    /**
     * Validate if a string is a valid URL
     */
    static isValidUrl(url: string): boolean {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Generate multiple QR codes for different social platforms
     */
    static async generateSocialQRCodes(giftUrl: string): Promise<{
        whatsapp: string;
        email: string;
        sms: string;
        direct: string;
    }> {
        const message = encodeURIComponent('Check out this special gift I made for you! 💖');

        return {
            whatsapp: await this.generateQRCode(`https://wa.me/?text=${message}%20${encodeURIComponent(giftUrl)}`),
            email: await this.generateQRCode(`mailto:?subject=A Special Gift For You&body=${message}%20${encodeURIComponent(giftUrl)}`),
            sms: await this.generateQRCode(`sms:?body=${message}%20${encodeURIComponent(giftUrl)}`),
            direct: await this.generateQRCode(giftUrl)
        };
    }
}

export default QRCodeService;
