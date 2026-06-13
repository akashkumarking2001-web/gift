
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://sweylelsqyrcchplwtkx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZXlsZWxzcXlyY2NocGx3dGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzgzMTgsImV4cCI6MjA4NjE1NDMxOH0.4P79RVCUcNSgOxXPapyksgn8LIY356g6XsFEmRObXe4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const identifier = "paalkovvamagic.shop";
    console.log(`Checking identifier: "${identifier}"`);
    
    const { data: b1, error: e1 } = await supabase
        .from('business_clients')
        .select('*')
        .eq('custom_domain', identifier)
        .single();
    
    if (b1) {
        console.log("Found by Exact Domain:", b1.business_name, "Status:", b1.is_active);
    } else {
        console.log("NOT found by exact domain.");
        if (e1) console.log("Error:", e1.message);
    }

    const { data: b2 } = await supabase
        .from('business_clients')
        .select('*')
        .ilike('custom_domain', `%${identifier}%`);

    console.log("Found by Fuzzy Search:", b2?.length || 0);
    b2?.forEach(b => {
        console.log(`- "${b.custom_domain}" (Slug: ${b.business_slug}, Active: ${b.is_active})`);
    });
}

check();
