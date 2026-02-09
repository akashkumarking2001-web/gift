import { supabase } from './supabase';

export interface UserPurchase {
    id: string;
    user_id: string;
    user_email: string;
    template_id: string;
    template_title: string;
    amount_paid: number;
    transaction_id: string;
    payment_screenshot_url?: string;
    status: 'pending' | 'approved' | 'rejected';
    purchased_at: string;
    approved_at?: string;
    approved_by?: string;
    notes?: string;
}

export const PurchaseService = {
    // Create a new purchase
    async createPurchase(purchase: {
        template_id: string;
        template_title: string;
        amount_paid: number;
        transaction_id: string;
        payment_screenshot_url?: string;
    }): Promise<UserPurchase> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Insert without selecting back to avoid RLS issues with new users
        const { error } = await supabase
            .from('user_purchases')
            .insert({
                user_id: user.id,
                user_email: user.email,
                ...purchase,
            });

        if (error) {
            console.error('Purchase creation error:', error);
            throw new Error(`Failed to create purchase: ${error.message}`);
        }

        // Return a constructed object since insert was successful
        return {
            id: 'pending-verification',
            user_id: user.id,
            user_email: user.email || '',
            ...purchase,
            status: 'pending',
            purchased_at: new Date().toISOString()
        } as UserPurchase;
    },

    // Get all purchases for current user
    async getUserPurchases(): Promise<UserPurchase[]> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('user_purchases')
            .select('*')
            .eq('user_id', user.id)
            .order('purchased_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    // Check if user has purchased a specific template
    async hasPurchased(templateId: string): Promise<boolean> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { data, error } = await supabase
            .from('user_purchases')
            .select('id, status')
            .eq('user_id', user.id)
            .eq('template_id', templateId)
            .eq('status', 'approved')
            .single();

        return !!data && !error;
    },

    // Check if user has pending purchase for a template
    async hasPendingPurchase(templateId: string): Promise<boolean> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        const { data, error } = await supabase
            .from('user_purchases')
            .select('id')
            .eq('user_id', user.id)
            .eq('template_id', templateId)
            .eq('status', 'pending')
            .single();

        return !!data && !error;
    },

    // Admin: Get all purchases
    async getAllPurchases(): Promise<UserPurchase[]> {
        const { data, error } = await supabase
            .from('user_purchases')
            .select('*')
            .order('purchased_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    // Admin: Get pending purchases
    async getPendingPurchases(): Promise<UserPurchase[]> {
        const { data, error } = await supabase
            .from('user_purchases')
            .select('*')
            .eq('status', 'pending')
            .order('purchased_at', { ascending: false });

        if (error) throw error;
        return data || [];
    },

    // Admin: Approve purchase
    async approvePurchase(purchaseId: string): Promise<void> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { error } = await supabase
            .from('user_purchases')
            .update({
                status: 'approved',
                approved_at: new Date().toISOString(),
                approved_by: user.id,
            })
            .eq('id', purchaseId);

        if (error) throw error;
    },

    // Admin: Reject purchase
    async rejectPurchase(purchaseId: string, notes?: string): Promise<void> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { error } = await supabase
            .from('user_purchases')
            .update({
                status: 'rejected',
                approved_at: new Date().toISOString(),
                approved_by: user.id,
                notes,
            })
            .eq('id', purchaseId);

        if (error) throw error;
    },
};
