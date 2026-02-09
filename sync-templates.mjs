import { createClient } from '@supabase/supabase-js';
import { TEMPLATES } from './src/lib/templates.js';

// You need to set your Supabase credentials here
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncAllTemplates() {
    console.log('🚀 Starting template sync...');
    console.log(`📦 Found ${TEMPLATES.length} templates to sync\n`);

    let successCount = 0;
    let errorCount = 0;

    for (const template of TEMPLATES) {
        try {
            const { error } = await supabase.from('templates').upsert({
                id: template.id,
                slug: template.slug,
                title: template.title,
                category: template.category,
                price: template.price,
                original_price: template.originalPrice,
                icon: template.icon,
                color: template.color,
                tag: template.tag || null,
                pages: template.pages,
                is_active: true
            });

            if (error) {
                console.error(`❌ Error syncing "${template.title}":`, error.message);
                errorCount++;
            } else {
                console.log(`✅ Synced: ${template.title} (₹${template.price})`);
                successCount++;
            }
        } catch (err) {
            console.error(`❌ Exception syncing "${template.title}":`, err);
            errorCount++;
        }
    }

    console.log(`\n📊 Sync Complete!`);
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
}

syncAllTemplates().catch(console.error);
