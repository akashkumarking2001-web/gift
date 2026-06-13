import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function check() {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .limit(10);

  if (error) {
    console.error("Error fetching payment:", error);
  } else {
    console.log("Found payments:", data);
  }
}

check();
