import { supabase } from './supabase';
import QRCodeService from './qrCodeService';

export interface GiftData {
    id?: string;
    user_id?: string;
    template_id: number;
    customization_data: any;
    unique_link_id?: string;
    gift_url?: string;
    qr_code_url?: string;
    ai_qr_code_url?: string;
    ai_qr_source_image?: string;
    is_published?: boolean;
    published_at?: string;
    views_count?: number;
    created_at?: string;
}

export interface PublishGiftResult {
    success: boolean;
    gift?: GiftData;
    uniqueId?: string;
    giftUrl?: string;
    error?: string;
}

export class GiftService {
    /**
     * Create a new gift (unpublished)
     */
    static async createGift(
        userId: string,
        templateId: number,
        customizationData: any
    ): Promise<{ success: boolean; giftId?: string; error?: string }> {
        try {
            const { data, error } = await supabase
                .from('gifts')
                .insert({
                    user_id: userId,
                    template_id: templateId,
                    customization_data: customizationData,
                    is_published: false,
                    created_at: new Date().toISOString()
                })
                .select()
                .single();

            if (error) throw error;

            return {
                success: true,
                giftId: data.id
            };
        } catch (error: any) {
            console.error('Error creating gift:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Publish a gift and generate unique link
     */
    static async publishGift(giftId: string): Promise<PublishGiftResult> {
        try {
            // Generate unique link
            const uniqueId = QRCodeService.generateUniqueId();
            const { fullUrl } = QRCodeService.generateGiftUrl(uniqueId);

            // Update gift with link and publish
            const { data, error } = await supabase
                .from('gifts')
                .update({
                    unique_link_id: uniqueId,
                    gift_url: fullUrl,
                    is_published: true,
                    published_at: new Date().toISOString()
                })
                .eq('id', giftId)
                .select()
                .single();

            if (error) throw error;

            return {
                success: true,
                gift: data,
                uniqueId,
                giftUrl: fullUrl
            };
        } catch (error: any) {
            console.error('Error publishing gift:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get gift by unique link ID (for public viewing)
     */
    static async getGiftByLinkId(uniqueLinkId: string): Promise<GiftData | null> {
        try {
            const { data, error } = await supabase
                .from('gifts')
                .select('*')
                .eq('unique_link_id', uniqueLinkId)
                .eq('is_published', true)
                .single();

            if (error) throw error;

            // Increment view count
            await this.incrementViewCount(uniqueLinkId);

            return data;
        } catch (error) {
            console.error('Error fetching gift:', error);
            return null;
        }
    }

    /**
     * Get user's gifts
     */
    static async getUserGifts(userId: string): Promise<GiftData[]> {
        try {
            const { data, error } = await supabase
                .from('gifts')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;

            return data || [];
        } catch (error) {
            console.error('Error fetching user gifts:', error);
            return [];
        }
    }

    /**
     * Update gift customization (only if unpublished)
     */
    static async updateGift(
        giftId: string,
        customizationData: any
    ): Promise<{ success: boolean; error?: string }> {
        try {
            const { error } = await supabase
                .from('gifts')
                .update({
                    customization_data: customizationData
                })
                .eq('id', giftId)
                .eq('is_published', false); // Only update unpublished gifts

            if (error) throw error;

            return { success: true };
        } catch (error: any) {
            console.error('Error updating gift:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Save QR code URLs to gift
     */
    static async saveQRCodes(
        giftId: string,
        qrCodeUrl?: string,
        aiQrCodeUrl?: string,
        aiQrSourceImage?: string
    ): Promise<{ success: boolean; error?: string }> {
        try {
            const updateData: any = {};
            if (qrCodeUrl) updateData.qr_code_url = qrCodeUrl;
            if (aiQrCodeUrl) updateData.ai_qr_code_url = aiQrCodeUrl;
            if (aiQrSourceImage) updateData.ai_qr_source_image = aiQrSourceImage;

            const { error } = await supabase
                .from('gifts')
                .update(updateData)
                .eq('id', giftId);

            if (error) throw error;

            return { success: true };
        } catch (error: any) {
            console.error('Error saving QR codes:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Increment view count for a gift
     */
    static async incrementViewCount(uniqueLinkId: string): Promise<void> {
        try {
            await supabase.rpc('increment_gift_views', {
                link_id: uniqueLinkId
            });
        } catch (error) {
            console.error('Error incrementing view count:', error);
        }
    }

    /**
     * Delete gift (only if unpublished)
     */
    static async deleteGift(giftId: string): Promise<{ success: boolean; error?: string }> {
        try {
            const { error } = await supabase
                .from('gifts')
                .delete()
                .eq('id', giftId)
                .eq('is_published', false); // Only delete unpublished gifts

            if (error) throw error;

            return { success: true };
        } catch (error: any) {
            console.error('Error deleting gift:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Upload QR code image to storage
     */
    static async uploadQRCodeImage(
        dataUrl: string,
        filename: string
    ): Promise<{ success: boolean; url?: string; error?: string }> {
        try {
            // Convert data URL to blob
            const response = await fetch(dataUrl);
            const blob = await response.blob();

            // Upload to Supabase Storage
            const { data, error } = await supabase.storage
                .from('qr-codes')
                .upload(filename, blob, {
                    contentType: 'image/png',
                    upsert: true
                });

            if (error) throw error;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('qr-codes')
                .getPublicUrl(filename);

            return {
                success: true,
                url: publicUrl
            };
        } catch (error: any) {
            console.error('Error uploading QR code:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Check if unique link ID is available
     */
    static async isLinkIdAvailable(uniqueLinkId: string): Promise<boolean> {
        try {
            const { data, error } = await supabase
                .from('gifts')
                .select('id')
                .eq('unique_link_id', uniqueLinkId)
                .single();

            // If no data found, link ID is available
            return !data;
        } catch (error) {
            // Error likely means no record found, so it's available
            return true;
        }
    }
}

export default GiftService;
