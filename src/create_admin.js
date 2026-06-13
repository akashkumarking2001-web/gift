import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' }); // or .env based on project

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
    console.log("Attempting to create admin account via API...");
    const { data, error } = await supabase.auth.signUp({
        email: 'admin@giftmagic.com',
        password: 'Admin@2026',
        options: {
            data: {
                full_name: 'Admin User',
                role: 'admin'
            }
        }
    });

    if (error) {
        console.error("SignUp Error:", error.message);
    } else {
        console.log("User created successfully via API:", data.user?.id);
        
        // Let's try to verify if profile creation is needed
        if (data.user) {
             console.log("Make sure to run the SQL UPDATE for elevating metadata role.");
        }
    }
}

run();
