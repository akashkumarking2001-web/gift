-- Complete Database Schema for Purchase & Approval Workflow
-- Run this in Supabase SQL Editor

-- 1. Create user_purchases table to track all purchases
CREATE TABLE IF NOT EXISTS public.user_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  template_id text NOT NULL,
  template_title text NOT NULL,
  amount_paid numeric NOT NULL,
  transaction_id text NOT NULL,
  payment_screenshot_url text,
  status text NOT NULL DEFAULT 'pending', -- pending, approved, rejected
  purchased_at timestamptz DEFAULT now(),
  approved_at timestamptz,
  approved_by uuid REFERENCES auth.users(id),
  notes text
);

-- 2. Enable RLS on user_purchases
ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies
DROP POLICY IF EXISTS "Users can view their own purchases" ON public.user_purchases;
DROP POLICY IF EXISTS "Users can create purchases" ON public.user_purchases;
DROP POLICY IF EXISTS "Admins can view all purchases" ON public.user_purchases;
DROP POLICY IF EXISTS "Admins can update purchases" ON public.user_purchases;

-- 4. Create RLS policies
-- Users can view their own purchases
CREATE POLICY "Users can view their own purchases"
ON public.user_purchases FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can create purchases
CREATE POLICY "Users can create purchases"
ON public.user_purchases FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Admins can view all purchases (for now, all authenticated users - we'll add role check later)
CREATE POLICY "Admins can view all purchases"
ON public.user_purchases FOR SELECT
TO authenticated
USING (true);

-- Admins can update purchases
CREATE POLICY "Admins can update purchases"
ON public.user_purchases FOR UPDATE
TO authenticated
USING (true);

-- 5. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_purchases_user_id ON public.user_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_status ON public.user_purchases(status);
CREATE INDEX IF NOT EXISTS idx_user_purchases_template_id ON public.user_purchases(template_id);

-- 6. Update templates table to add MRP and offer timer
ALTER TABLE public.templates 
ADD COLUMN IF NOT EXISTS mrp numeric,
ADD COLUMN IF NOT EXISTS offer_ends_at timestamptz;

-- 7. Set random MRP for existing templates (between 600 and 2800)
UPDATE public.templates 
SET mrp = (600 + (RANDOM() * 2200))::numeric(10,2)
WHERE mrp IS NULL;

-- 8. Set offer timer to 24 hours from now for all templates
UPDATE public.templates 
SET offer_ends_at = NOW() + INTERVAL '24 hours'
WHERE offer_ends_at IS NULL;

-- 9. Create user_profiles table for storing user details
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 10. Enable RLS on user_profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 11. Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;

-- 12. Create RLS policies for user_profiles
CREATE POLICY "Users can view own profile"
ON public.user_profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.user_profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON public.user_profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- 13. Verify setup
SELECT 'Database schema created successfully!' as status,
       (SELECT COUNT(*) FROM public.templates) as total_templates,
       (SELECT COUNT(*) FROM public.user_purchases) as total_purchases;
