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
        const dbUpdates: any = { ...updates };
        if (updates.originalPrice !== undefined) {
            dbUpdates.original_price = updates.originalPrice;
            delete dbUpdates.originalPrice;
        }

        const { error } = await supabase
            .from('templates')
            .update(dbUpdates)
            .eq('id', id);

        if (error) throw error;
    }
};
