import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://YOUR_URL.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data, error } = await supabase
    .from('business_clients')
    .select('id, business_name, whatsapp_number, logo_url')
    .eq('business_slug', 'ak')
    .single();

  if (error) {
    console.error("Fetch Error:", error);
  } else {
    console.log("Client 'ak' data:", data);
  }
}

check();
