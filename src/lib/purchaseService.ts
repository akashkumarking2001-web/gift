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
    // Bundle-related fields
    bundle_id?: string;
    template_ids?: string[];
    is_bundle?: boolean;
}

export interface BundleTemplate {
    id: number;
    bundle_id: string;
    bundle_name: string;
    template_ids: string[];
    price: number;
    original_price?: number;
    description?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface UserTemplateAccess {
    id: number;
    user_id: string;
    template_id: string;
    purchase_id: string; // UUID
    is_locked: boolean;
    unlocked_at?: string;
    created_at: string;
    updated_at: string;
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

        // 1. Create the purchase record
        const { data: purchaseData, error: purchaseError } = await supabase
            .from('user_purchases')
            .insert({
                user_id: user.id,
                user_email: user.email,
                ...purchase,
                is_bundle: false
            })
            .select()
            .single();

        if (purchaseError) {
            console.error('Purchase creation error:', purchaseError);
            throw new Error(`Failed to create purchase: ${purchaseError.message}`);
        }

        // 2. Create LOCKED template access record
        const { error: accessError } = await supabase
            .from('user_template_access')
            .insert({
                user_id: user.id,
                template_id: purchase.template_id,
                purchase_id: purchaseData.id,
                is_locked: true,
            });

        if (accessError) {
            console.error('Template access creation error:', accessError);
        }

        return purchaseData as UserPurchase;
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

    },

    // ========================================================================
    // BUNDLE-SPECIFIC FUNCTIONS
    // ========================================================================

    // Get bundle configuration by bundle_id
    async getBundleConfiguration(bundleId: string): Promise<BundleTemplate | null> {
        const { data, error } = await supabase
            .from('bundle_templates')
            .select('*')
            .eq('bundle_id', bundleId)
            .eq('is_active', true)
            .maybeSingle();

        if (error) {
            console.error('Error fetching bundle from Supabase:', {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
            });
            throw new Error(`Database error while fetching bundle: ${error.message}`);
        }
        return data;
    },

    // Get all active bundles
    async getAllBundles(): Promise<BundleTemplate[]> {
        const { data, error } = await supabase
            .from('bundle_templates')
            .select('*')
            .order('price', { ascending: true });

        if (error) {
            console.error('Error fetching bundles:', error);
            return [];
        }
        return data || [];
    },

    // Admin: Update or Create a bundle
    async updateBundle(bundle: Partial<BundleTemplate> & { bundle_id: string }): Promise<void> {
        const { error } = await supabase
            .from('bundle_templates')
            .upsert({
                ...bundle,
                updated_at: new Date().toISOString(),
            }, {
                onConflict: 'bundle_id'
            });

        if (error) {
            console.error('Error updating bundle:', error);
            throw error;
        }
    },

    // Admin: Delete a bundle (deactivate it)
    async deleteBundle(bundleId: string): Promise<void> {
        const { error } = await supabase
            .from('bundle_templates')
            .delete()
            .eq('bundle_id', bundleId);

        if (error) {
            console.error('Error deleting bundle:', error);
            throw error;
        }
    },

    // Create a bundle purchase (with locked template access)
    async createBundlePurchase(bundlePurchase: {
        bundle_id: string;
        bundle_name: string;
        amount_paid: number;
        transaction_id: string;
        payment_screenshot_url?: string;
    }): Promise<UserPurchase> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // 1. Get bundle configuration to know which templates are included
        const bundleConfig = await this.getBundleConfiguration(bundlePurchase.bundle_id);
        if (!bundleConfig) {
            throw new Error(`Bundle configuration not found for: ${bundlePurchase.bundle_id}`);
        }

        // 2. Create the purchase record
        const { data: purchaseData, error: purchaseError } = await supabase
            .from('user_purchases')
            .insert({
                user_id: user.id,
                user_email: user.email,
                template_id: bundlePurchase.bundle_id, // Store bundle_id as template_id
                template_title: bundlePurchase.bundle_name,
                amount_paid: bundlePurchase.amount_paid,
                transaction_id: bundlePurchase.transaction_id,
                payment_screenshot_url: bundlePurchase.payment_screenshot_url,
                bundle_id: bundlePurchase.bundle_id,
                template_ids: bundleConfig.template_ids,
                is_bundle: true,
                status: 'pending',
            })
            .select()
            .single();

        if (purchaseError) {
            console.error('Bundle purchase creation error:', purchaseError);
            throw new Error(`Failed to create bundle purchase: ${purchaseError.message}`);
        }

        // 3. Create LOCKED template access records for each template in the bundle
        const templateAccessRecords = bundleConfig.template_ids.map(templateId => ({
            user_id: user.id,
            template_id: templateId,
            purchase_id: purchaseData.id,
            is_locked: true, // Initially locked
        }));

        const { error: accessError } = await supabase
            .from('user_template_access')
            .insert(templateAccessRecords);

        if (accessError) {
            console.error('Template access creation error:', accessError);
            // Note: Purchase was created but access records failed
            // The admin can still manually unlock later
        }

        return purchaseData as UserPurchase;
    },

    // Admin: Unlock all templates in a bundle (called after approval)
    async unlockBundleTemplates(purchaseId: string): Promise<void> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Get the purchase to find the user_id
        const { data: purchase, error: purchaseError } = await supabase
            .from('user_purchases')
            .select('user_id, is_bundle')
            .eq('id', purchaseId)
            .single();

        if (purchaseError || !purchase) {
            throw new Error('Purchase not found');
        }

        if (!purchase.is_bundle) {
            // Not a bundle, no need to unlock multiple templates
            return;
        }

        // Unlock all templates associated with this purchase
        const { error } = await supabase
            .from('user_template_access')
            .update({
                is_locked: false,
                unlocked_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .eq('purchase_id', purchaseId)
            .eq('user_id', purchase.user_id);

        if (error) {
            console.error('Error unlocking templates:', error);
            throw error;
        }
    },

    // Get user's template access status
    async getUserTemplateAccess(templateId: string): Promise<UserTemplateAccess | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from('user_template_access')
            .select('*')
            .eq('user_id', user.id)
            .eq('template_id', templateId)
            .eq('is_locked', false)
            .maybeSingle();

        if (error) {
            console.error('Error fetching template access:', error);
            return null;
        }
        return data;
    },

    // Get all user's locked templates (pending approval)
    async getUserLockedTemplates(): Promise<UserTemplateAccess[]> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('user_template_access')
            .select('*')
            .eq('user_id', user.id)
            .eq('is_locked', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching locked templates:', error);
            return [];
        }
        return data || [];
    },

    // Get all user's unlocked templates
    async getUserUnlockedTemplates(): Promise<UserTemplateAccess[]> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return [];

        const { data, error } = await supabase
            .from('user_template_access')
            .select('*')
            .eq('user_id', user.id)
            .eq('is_locked', false)
            .order('unlocked_at', { ascending: false });

        if (error) {
            console.error('Error fetching unlocked templates:', error);
            return [];
        }
        return data || [];
    },

    // Check if user has access to a template (either purchased individually or via bundle)
    async hasTemplateAccess(templateId: string): Promise<boolean> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return false;

        // Check for unlocked template access
        const { data } = await supabase
            .from('user_template_access')
            .select('id')
            .eq('user_id', user.id)
            .eq('template_id', templateId)
            .eq('is_locked', false)
            .maybeSingle();

        return !!data;
    },
};
