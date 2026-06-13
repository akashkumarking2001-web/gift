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
    console.log("Testing fresh signup...");
    const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email: 'fresh_admin_123@giftmagic.com',
        password: 'Password@2026'
    });
    console.log("Signup Error:", signupError);
    if (!signupError) {
        console.log("Signup Success! Now testing login...");
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: 'fresh_admin_123@giftmagic.com',
            password: 'Password@2026'
        });
        console.log("Login Error:", loginError);
        if (!loginError) {
            console.log("Login Success!");
        }
    }
}
test();
