import { supabase } from "./supabase";

export interface Gift {
    id: string;
    user_id: string;
    template_id: number;
    gift_data: any;
    gift_uuid: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
}

export const GiftService = {
    async createGift(templateId: number) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('gifts')
            .insert({
                user_id: user.id,
                template_id: templateId,
                gift_data: {},
                is_published: false
            })
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    async getGift(id: string) {
        const { data, error } = await supabase
            .from('gifts')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    async getGiftByUuid(uuid: string) {
        const { data, error } = await supabase
            .from('gifts')
            .select('*')
            .eq('gift_uuid', uuid)
            .single();

        if (error) throw error;
        return data;
    },

    async updateGift(id: string, giftData: any) {
        const { error } = await supabase
            .from('gifts')
            .update({
                gift_data: giftData,
                updated_at: new Date().toISOString()
            })
            .eq('id', id);

        if (error) throw error;
    },

    async publishGift(id: string) {
        const { error } = await supabase
            .from('gifts')
            .update({ is_published: true })
            .eq('id', id);

        if (error) throw error;
    },

    async getUserGifts() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("User not authenticated");

        const { data, error } = await supabase
            .from('gifts')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    }
};
