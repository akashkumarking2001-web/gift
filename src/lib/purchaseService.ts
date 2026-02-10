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

    // Check if user has purchased a specific template or has the relevant bundle
    async hasPurchased(templateId: string, category?: string): Promise<boolean> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        // 1. Check for individual purchase
        const { data: individualData } = await supabase
            .from('user_purchases')
            .select('id, status')
            .eq('user_id', user.id)
            .eq('template_id', templateId)
            .eq('status', 'approved')
            .maybeSingle();

        if (individualData) return true;

        // 2. Check for Valentine's Bundle (if template is in Valentine's category)
        if (category?.toLowerCase().includes('valentine')) {
            const { data: bundleData } = await supabase
                .from('user_purchases')
                .select('id, status')
                .eq('user_id', user.id)
                .eq('template_id', 'valentines')
                .eq('status', 'approved')
                .maybeSingle();

            if (bundleData) {
                // If they have the bundle, check if they've used fewer than 3 credits
                // This is a simplified check - in a real app, you'd track specific template unlocks
                // For now, if they have the bundle, they have access to all Valentine templates
                // (Or we can implement a more complex tracking table)
                return true;
            }
        }

        // 3. Check for All-Access Combo
        const { data: allAccessData } = await supabase
            .from('user_purchases')
            .select('id, status')
            .eq('user_id', user.id)
            .eq('template_id', 'all-access')
            .eq('status', 'approved')
            .maybeSingle();

        if (allAccessData) return true;

        return false;
    },

    // Check if user has a valid bundle (generic)
    async getUserBundles(): Promise<string[]> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data } = await supabase
            .from('user_purchases')
            .select('template_id')
            .eq('user_id', user.id)
            .eq('status', 'approved')
            .in('template_id', ['valentines', 'all-access']);

        return (data || []).map((p: any) => p.template_id);
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
            .maybeSingle();

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
