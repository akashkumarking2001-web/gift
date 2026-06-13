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
    console.log("Testing sign up...");
    const { data, error } = await supabase.auth.signUp({
        email: 'test_signup_admin@giftmagic.com',
        password: 'Password_123'
    });
    console.log("Error:", error);
    if (!error) console.log("Success! user id:", data.user?.id);
}
test();
