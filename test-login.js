import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8');
let url = '', key = '';
for (const line of env.split('\n')) {
    if (line.startsWith('VITE_SUPABASE_URL=')) url = line.split('=')[1].trim();
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
}

const supabase = createClient(url, key);

async function test() {
    console.log("Testing login...");
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@giftmagic.com',
        password: 'password123' /* or any password, we just want the error */
    });
    console.log("Error:", error);
    console.log("Data:", data);
}
test();
