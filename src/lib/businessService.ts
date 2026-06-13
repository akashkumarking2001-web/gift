import { supabase } from "./supabase";

export interface BusinessClient {
    id: string;
    business_name: string;
    business_slug: string;
    logo_url: string;
    email: string;
    instagram_id?: string;
    package_type: '299' | '799' | '4999' | 'pro' | 'enterprise';
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
    client_name?: string; // Loaded using clients table
}

export const BusinessService = {
    // Admin: Register Business
    async registerBusiness(clientData: {
        business_name: string;
        business_slug: string;
        logo_url: string;
        email: string;
        password_hash: string; // passing as password parameter
        instagram_id?: string;
        package_type: string;
        frame_limit: number;
    }) {
        const { data, error } = await supabase.rpc('register_business_client', {
            p_name: clientData.business_name,
            p_slug: clientData.business_slug,
            p_logo_url: clientData.logo_url,
            p_email: clientData.email,
            p_password: clientData.password_hash,
            p_instagramid: clientData.instagram_id || '',
            p_package: clientData.package_type,
            p_limit: clientData.frame_limit,
            p_custom_domain: (clientData as any).custom_domain || null,
            p_custom_price: (clientData as any).custom_package_price || null
        });

        if (error) throw error;
        return data;
    },

    // Admin/Portal: Verify Login
    async verifyLogin(email: string, passwordText: string) {
        const { data, error } = await supabase.rpc('verify_business_client', {
            p_email: email,
            p_password: passwordText
        });

        if (error) throw error;
        if (data && data.length > 0) {
            return data[0]; // Returns single BusinessClient row without password_hash
        }
        return null; // Invalid credentials
    },

    // Get Business by Slug (Public Subdomain Landing)
    async getBusinessBySlug(slug: string) {
        const { data, error } = await supabase
            .from('business_clients')
            .select('id, business_name, business_slug, custom_domain, logo_url, email, instagram_id, whatsapp_number, package_type, frame_limit, frames_used, is_active, show_frames_preview, activation_date, next_renewal_date, custom_package_price, subscription_start_date, lifetime_frames_count')
            .eq('business_slug', slug)
            .maybeSingle();

        if (error) {
            console.error('Error fetching business by slug:', error);
            return null;
        }
        return data as BusinessClient | null;
    },

    // Get Business by Custom Domain (Public Custom Domain Landing)
    async getBusinessByCustomDomain(domain: string) {
        const { data, error } = await supabase
            .from('business_clients')
            .select('id, business_name, business_slug, custom_domain, logo_url, email, instagram_id, whatsapp_number, package_type, frame_limit, frames_used, is_active, show_frames_preview, activation_date, next_renewal_date, custom_package_price, subscription_start_date, lifetime_frames_count')
            .eq('custom_domain', domain)
            .maybeSingle();

        if (error) {
            console.error('Error fetching business by domain:', error);
            return null;
        }
        return data as BusinessClient | null;
    },

    // Get Business by Slug or Custom Domain
    async getBusinessByIdentifier(identifier: string) {
        if (identifier.includes('.') && 
            identifier !== 'localhost' && 
            !['127.0.0.1', '::1'].includes(identifier)) {
            const data = await this.getBusinessByCustomDomain(identifier);
            if (data) return data;
        }
        return await this.getBusinessBySlug(identifier);
    },

    // Admin: Get All Clients
    async getAllClients() {
        const { data, error } = await supabase
            .from('business_clients')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data as BusinessClient[];
    },

    // Admin: Edit Client
    async updateClient(clientId: string, updates: Partial<BusinessClient>) {
        const { error } = await supabase
            .from('business_clients')
            .update(updates)
            .eq('id', clientId);

        if (error) throw error;
    },

    // Admin: Toggle Client Status (Active/Suspended)
    async toggleClientStatus(clientId: string, isActive: boolean) {
        const { error } = await supabase
            .from('business_clients')
            .update({ is_active: isActive })
            .eq('id', clientId);

        if (error) throw error;
    },

    // Admin: Delete Client
    async deleteClient(clientId: string) {
        const { error } = await supabase
            .from('business_clients')
            .delete()
            .eq('id', clientId);

        if (error) throw error;
    },

    // Client: Toggle Photo Frames Layout
    async toggleShowFramesPreview(clientId: string, shown: boolean) {
        const { error } = await supabase
            .from('business_clients')
            .update({ show_frames_preview: shown })
            .eq('id', clientId);

        if (error) throw error;
    },

    // Client: Increment/Sync Frame Usage (called on upload success)
    async incrementFrameUsage(clientId: string) {
        // Sync current count from albums
        const { error: syncError } = await supabase.rpc('sync_frames_count', { p_client_id: clientId });
        if (syncError) throw syncError;
        
        // Also increment lifetime counter which never decreases
        const { error: lifetimeError } = await supabase.rpc('increment_lifetime_usage', { p_client_id: clientId });
        if (lifetimeError) throw lifetimeError;
        
        return true;
    },
    
    // Admin: Renew Subscription (reset 28 days)
    async renewSubscription(clientId: string) {
        const { error } = await supabase.rpc('renew_business_subscription', { p_client_id: clientId });
        if (error) throw error;
        return true;
    },

    // Upgrade Request Logic
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

    // Admin: Get All Upgrade Requests
    async getUpgradeRequests() {
        const { data, error } = await supabase
            .from('upgrade_requests')
            .select('*, business_clients(business_name)')
            .order('created_at', { ascending: false });

        if (error) throw error;
        // Map names back
        return data.map((r: any) => ({
            ...r,
            client_name: r.business_clients?.business_name
        })) as UpgradeRequest[];
    },

    // Admin: Approve Upgrade Request
    async approveUpgradeRequest(requestId: string, clientId: string, newPackage: string, frameLimit: number) {
        // Update request status
        const { error: reqError } = await supabase
            .from('upgrade_requests')
            .update({ status: 'approved' })
            .eq('id', requestId);

        if (reqError) throw reqError;

        let validityDays = 28;
        if (newPackage === '799' || newPackage === 'pro') validityDays = 365;
        else if (newPackage === '4999' || newPackage === 'enterprise') validityDays = 36500; // Lifetime = 100 years

        // Update Client's Package & Reset Limits
        const { error: clientError } = await supabase
            .from('business_clients')
            .update({
                package_type: newPackage,
                frame_limit: frameLimit,
                frames_used: 0,
                activation_date: new Date().toISOString().split('T')[0],
                subscription_start_date: new Date().toISOString(),
                next_renewal_date: new Date(new Date().setDate(new Date().getDate() + validityDays)).toISOString().split('T')[0]
            })
            .eq('id', clientId);

        if (clientError) throw clientError;
    },

    // Admin: Reject Upgrade Request
    async rejectUpgradeRequest(requestId: string) {
        const { error } = await supabase
            .from('upgrade_requests')
            .update({ status: 'rejected' })
            .eq('id', requestId);

        if (error) throw error;
    },

    // Payment Settings Logic
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

    async updatePaymentSettings(upiId: string, qrCodeUrl?: string) {
        // Using upsert with fixed ID
        const updates: any = { id: '00000000-0000-0000-0000-000000000001', upi_id: upiId, updated_at: new Date().toISOString() };
        if (qrCodeUrl) updates.qr_code_url = qrCodeUrl;

        const { error } = await supabase
            .from('payment_settings')
            .upsert(updates);

        if (error) throw error;
    },

    // New Business Registration Requests
    async getRegistrationRequests() {
        const { data, error } = await supabase
            .from('business_registration_requests')
            .select('*')
            .neq('status', 'approved')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    async updateRegistrationRequest(id: string, updates: any) {
        const { error } = await supabase
            .from('business_registration_requests')
            .update(updates)
            .eq('id', id);

        if (error) throw error;
    },

    async approveRegistrationRequest(requestId: string, passwordText: string) {
        const { error } = await supabase.rpc('approve_business_request', {
            p_request_id: requestId,
            p_password: passwordText
        });

        if (error) throw error;
    },

    // Pricing Management
    async getPackages() {
        const { data, error } = await supabase
            .from('business_packages')
            .select('*')
            .eq('is_active', true)
            // Cache-busting for mobile
            .filter('name', 'neq', 'refresh-' + Date.now())
            .order('price', { ascending: true });
        if (error) throw error;
        return data;
    },

    async updatePackage(id: string, updates: any) {
        const { error } = await supabase
            .from('business_packages')
            .update(updates)
            .eq('id', id);
        if (error) throw error;
    }
};
