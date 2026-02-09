-- Create admin and user accounts in Supabase Auth
-- Run this in Supabase SQL Editor

-- Note: Supabase Auth users are created via the Auth API, not SQL
-- This script creates entries in a custom users table for reference

-- Create a users table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Allow public read users" ON public.users;
CREATE POLICY "Allow public read users"
ON public.users FOR SELECT
USING (true);

DROP POLICY IF EXISTS "Allow insert users" ON public.users;
CREATE POLICY "Allow insert users"
ON public.users FOR INSERT
WITH CHECK (true);

-- Insert admin and test user
INSERT INTO public.users (email, role)
VALUES 
  ('admin@giftmagic.com', 'admin'),
  ('user@giftmagic.com', 'user')
ON CONFLICT (email) DO NOTHING;

-- Display credentials (these are for reference only)
-- Actual authentication happens via Supabase Auth
SELECT 
  email,
  role,
  'Use Supabase Dashboard to set password' as password_note
FROM public.users
WHERE email IN ('admin@giftmagic.com', 'user@giftmagic.com');
