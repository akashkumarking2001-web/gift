import { supabase } from './supabase';

export interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    phone?: string;
    created_at: string;
    updated_at: string;
}

export const ProfileService = {
    // Get or create user profile
    async getOrCreateProfile(): Promise<UserProfile | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        // Try to get existing profile
        const { data: existing } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (existing) return existing;

        // Create new profile
        // Create new profile without read-back to avoid RLS race condition
        const { error } = await supabase
            .from('user_profiles')
            .insert({
                id: user.id,
                email: user.email || '',
            });

        if (error) throw error;

        return {
            id: user.id,
            email: user.email || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        } as UserProfile;
    },

    // Update user profile
    async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Update without read-back to avoid RLS race condition
        const { error } = await supabase
            .from('user_profiles')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', user.id);

        if (error) throw error;

        // Return constructed profile (partial is okay for immediate UI use)
        return {
            id: user.id,
            email: user.email || '',
            ...updates,
            updated_at: new Date().toISOString()
        } as UserProfile;
    },

    // Get user profile
    async getProfile(): Promise<UserProfile | null> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return null;

        const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) return null;
        return data;
    },
};
