import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://sweylelsqyrcchplwtkx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZXlsZWxzcXlyY2NocGx3dGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzgzMTgsImV4cCI6MjA4NjE1NDMxOH0.4P79RVCUcNSgOxXPapyksgn8LIY356g6XsFEmRObXe4"
);

async function inspect() {
    const { data: b } = await supabase.from('business_clients').select('*').limit(1).single();
    if (b) console.log("Business Clients Columns:", Object.keys(b));
    else console.log("No Business Clients, fetching settings table columns...");

    const { data: s } = await supabase.from('payment_settings').select('*').limit(1).single();
    if (s) console.log("Payment Settings Columns:", Object.keys(s));
}

inspect();
