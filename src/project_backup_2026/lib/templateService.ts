import { supabase } from './supabase';
import { TEMPLATES, TemplateDefinition } from './templates';

export const TemplateService = {
    async getAll(): Promise<TemplateDefinition[]> {
        const { data: dbTemplates, error } = await supabase
            .from('templates')
            .select('*')
            .order('id');

        if (error) {
            console.error("Error fetching templates:", error);
            return TEMPLATES;
        }

        if (!dbTemplates || dbTemplates.length === 0) {
            return TEMPLATES;
        }

        return dbTemplates.map((t: any) => ({
            ...t,
            // Map back DB fields
            originalPrice: t.original_price,
            mrp: t.mrp,
            offerEndsAt: t.offer_ends_at,
            isActive: t.is_active,
            // pages should be JSONB, so it's already objects/arrays
        }));
    },

    async syncFromLocal() {
        console.log("Syncing templates from local constant to DB...");
        for (const t of TEMPLATES) {
            // Generate random MRP between 600 and 2800
            const mrp = Math.floor(600 + Math.random() * 2200);
            // Set offer to expire in 24 hours
            const offerEndsAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

            const { error } = await supabase.from('templates').upsert({
                id: t.id,
                slug: t.slug,
                title: t.title,
                category: t.category,
                price: t.price,
                original_price: t.originalPrice,
                mrp: mrp,
                offer_ends_at: offerEndsAt,
                icon: t.icon,
                color: t.color,
                tag: t.tag || null,
                pages: t.pages,
                is_active: true
            });
            if (error) console.error("Sync error for " + t.title, error);
        }
    },

    async updateTemplate(id: number, updates: Partial<TemplateDefinition>) {
        console.log("Updating template:", id, updates);

        // Define known mapping of frontend fields to DB columns
        const dbUpdates: any = {};

        if (updates.slug !== undefined) dbUpdates.slug = updates.slug;
        if (updates.title !== undefined) dbUpdates.title = updates.title;
        if (updates.category !== undefined) dbUpdates.category = updates.category;
        if (updates.price !== undefined) dbUpdates.price = updates.price;
        if (updates.originalPrice !== undefined) dbUpdates.original_price = updates.originalPrice;
        if (updates.offerEndsAt !== undefined) dbUpdates.offer_ends_at = updates.offerEndsAt;
        if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
        if (updates.color !== undefined) dbUpdates.color = updates.color;
        if (updates.tag !== undefined) dbUpdates.tag = updates.tag;
        if (updates.pages !== undefined) dbUpdates.pages = updates.pages;
        if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive;

        // Note: thumbnail_url, cover_image_url, etc. might not exist in older schemas.
        // We only update them if they were explicitly provided and we think they exist.
        // For safety, we keep them as is if they match the snake_case name.
        if (updates.thumbnail_url !== undefined) dbUpdates.thumbnail_url = updates.thumbnail_url;
        // cover_image_url, demo_video_url, preview_images are likely extra fields 
        // that might need to be stored in 'pages' or an 'extra_config' column if we had one.
        // For now, let's try sending them and see if it fails (the caller has a catch block).

        const { error } = await supabase
            .from('templates')
            .update(dbUpdates)
            .eq('id', id);

        if (error) {
            console.error("Supabase update error:", error);
            throw error;
        }
    }
};
