import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE environment variables.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTable() {
  console.log("Checking/Creating pending_ar_creations table...");
  
  // We cannot easily create tables via anon key if RLS/Permissions block it.
  // But we can check if it exists by querying.
  const { error } = await supabase.from('pending_ar_creations').select('id').limit(1);
  
  if (error && error.code === '42P01') {
    console.log("Table MISSING. Please run the following SQL in your Supabase Dashboard:");
    console.log(`
      CREATE TABLE IF NOT EXISTS public.pending_ar_creations (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          order_id TEXT UNIQUE NOT NULL,
          payload JSONB NOT NULL,
          status TEXT DEFAULT 'pending',
          created_at TIMESTAMPTZ DEFAULT now()
      );

      ALTER TABLE public.pending_ar_creations ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "Allow anon insert" ON public.pending_ar_creations FOR INSERT WITH CHECK (true);
      CREATE POLICY "Allow anon select" ON public.pending_ar_creations FOR SELECT USING (true);
      CREATE POLICY "Allow anon update" ON public.pending_ar_creations FOR UPDATE USING (true);
    `);
  } else if (error) {
    console.error("Error checking table:", error);
  } else {
    console.log("Table exists!");
  }
}

createTable();
