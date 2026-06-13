import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
// the anon key from the env
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if(!supabaseUrl || !supabaseKey) {
    console.error("Missing supabase URL or Key");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
    const { data, error } = await supabase
        .from('ar_group_images')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error("Error fetching:", error);
    } else {
        console.log("Latest ar_group_images:", JSON.stringify(data, null, 2));
    }
}

inspect();
