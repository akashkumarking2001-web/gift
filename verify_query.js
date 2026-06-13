import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf-8');
const url = env.split('VITE_SUPABASE_URL=')[1].split('\n')[0].trim().replace(/^"|"$/g, '');
const key = env.split('VITE_SUPABASE_ANON_KEY=')[1].split('\n')[0].trim().replace(/^"|"$/g, '');

const supabase = createClient(url, key);

async function test() {
    const { data, error } = await supabase
        .from("ar_albums")
        .select("*, business_clients (slug, business_name)")
        .order("created_at", { ascending: false });
        
    console.log("Error:", error);
    console.log("Data count:", data ? data.length : 0);
}

test();
