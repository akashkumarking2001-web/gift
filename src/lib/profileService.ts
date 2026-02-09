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
        const { data: newProfile, error } = await supabase
            .from('user_profiles')
            .insert({
                id: user.id,
                email: user.email || '',
            })
            .select()
            .single();

        if (error) throw error;
        return newProfile;
    },

    // Update user profile
    async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('user_profiles')
            .update({
                ...updates,
                updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)
            .select()
            .single();

        if (error) throw error;
        return data;
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
