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
    console.log("Creating users safely via Official API...");
    let response = await supabase.auth.signUp({
        email: 'admin@giftmagic.com',
        password: 'Admin@2026'
    });
    console.log("Admin Signup:", response.error?.message || "Success");
    
    response = await supabase.auth.signUp({
        email: 'user@giftmagic.com',
        password: 'User@123456'
    });
    console.log("User Signup:", response.error?.message || "Success");
}
test();
