import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://sweylelsqyrcchplwtkx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZXlsZWxzcXlyY2NocGx3dGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzgzMTgsImV4cCI6MjA4NjE1NDMxOH0.4P79RVCUcNSgOxXPapyksgn8LIY356g6XsFEmRObXe4"
);

async function inspect() {
    const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'ar_albums' });
    if (error) {
        // Fallback to reading an item to inspect keys
        const { data: album } = await supabase.from('ar_albums').select('*').limit(1).single();
        if (album) {
            console.log("Columns:", Object.keys(album));
        } else {
            console.error("Could not fetch album keys");
        }
    } else {
        console.log("Columns:", data);
    }
}

inspect();
