import { supabase } from "./supabase";

export interface BusinessClient {
    id: string;
    business_name: string;
    business_slug: string;
    logo_url: string;
    email: string;
    instagram_id?: string;
    package_type: '299' | '799' | '4999';
    frame_limit: number;
    frames_used: number;
    activation_date: string;
    next_renewal_date: string;
    is_active: boolean;
    show_frames_preview: boolean;
    whatsapp_number?: string;
    custom_domain?: string;
    custom_package_price?: number;
    subscription_start_date: string;
    lifetime_frames_count: number;
    created_at: string;
}

export interface UpgradeRequest {
    id: string;
    client_id: string;
    current_package: string;
    requested_package: string;
    transaction_number: string;
    screenshot_url?: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
    client_name?: string; 
}

export const BusinessService = {
    // 1. Fetch App Settings (Pricing, etc.)
    async getAppSettings() {
        const { data, error } = await supabase
            .from('app_settings')
            .select('*');
        
        if (error) {
            console.error('Error fetching app settings:', error);
            return {};
        }

        const settings: any = {};
        data.forEach(item => {
            settings[item.key] = item.value;
        });
        return settings;
    },

    // 2. Fetch Dynamic Packages
    async getPackages() {
        const { data, error } = await supabase
            .from('business_packages')
            .select('*')
            .eq('is_active', true)
            .filter('name', 'neq', 'refresh-' + Date.now()) 
            .order('price', { ascending: true });

        if (error) {
            console.error('Error fetching packages:', error);
            return [];
        }
        return data;
    },

    // Portal: Verify Login
    async verifyLogin(email: string, passwordText: string) {
        const { data, error } = await supabase.rpc('verify_business_client', {
            p_email: email,
            p_password: passwordText
        });

        if (error) throw error;
        if (data && data.length > 0) {
            return data[0]; 
        }
        return null; 
    },

    // Get Business by Slug (for Subdomain Logic)
    async getBusinessBySlug(slug: string) {
        const { data, error } = await supabase
            .from('business_clients')
            .select('*')
            .eq('business_slug', slug)
            .maybeSingle();

        if (error) {
            console.error('Error fetching business by slug:', error);
            return null;
        }
        return data;
    },

    // Get Client details by ID
    async getClientById(clientId: string) {
        const { data, error } = await supabase
            .from('business_clients')
            .select('*')
            .eq('id', clientId)
            .maybeSingle();

        if (error) throw error;
        return data;
    },

    // Client: Toggle Photo Frames Layout
    async toggleShowFramesPreview(clientId: string, shown: boolean) {
        const { error } = await supabase
            .from('business_clients')
            .update({ show_frames_preview: shown })
            .eq('id', clientId);

        if (error) throw error;
    },

    // Upgrade Request Logic (Sync with Cashfree later)
    async submitUpgradeRequest(request: {
        client_id: string;
        current_package: string;
        requested_package: string;
        transaction_number: string;
        screenshot_url?: string;
    }) {
        const { error } = await supabase
            .from('upgrade_requests')
            .insert({
                client_id: request.client_id,
                current_package: request.current_package,
                requested_package: request.requested_package,
                transaction_number: request.transaction_number,
                screenshot_url: request.screenshot_url,
                status: 'pending'
            });

        if (error) throw error;
    },

    // Payment Settings Logic (Admin Legacy Flow)
    async getPaymentSettings() {
        const { data, error } = await supabase
            .from('payment_settings')
            .select('*')
            .maybeSingle();

        if (error) {
            console.error('Error fetching payment settings:', error);
            return { upi_id: '', qr_code_url: '' };
        }
        return data || { upi_id: '', qr_code_url: '' };
    },

    // Sync usage
    async syncUsage(clientId: string) {
        const { error: syncError } = await supabase.rpc('sync_frames_count', { p_client_id: clientId });
        if (syncError) throw syncError;
        return true;
    }
};
