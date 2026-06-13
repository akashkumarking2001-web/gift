-- Fix for user_purchases table and RLS policies
-- Run this in Supabase SQL Editor

-- 1. Ensure table exists
CREATE TABLE IF NOT EXISTS public.user_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  template_id text NOT NULL,
  template_title text NOT NULL,
  amount_paid numeric NOT NULL,
  transaction_id text NOT NULL,
  payment_screenshot_url text,
  status text NOT NULL DEFAULT 'pending',
  purchased_at timestamptz DEFAULT now(),
  approved_at timestamptz,
  approved_by uuid REFERENCES auth.users(id),
  notes text
);

-- 2. Enable RLS
ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;

-- 3. Drop all existing policies to clear conflicts
DROP POLICY IF EXISTS "Users can view their own purchases" ON public.user_purchases;
DROP POLICY IF EXISTS "Users can create purchases" ON public.user_purchases;
DROP POLICY IF EXISTS "Admins can view all purchases" ON public.user_purchases;
DROP POLICY IF EXISTS "Admins can update purchases" ON public.user_purchases;
DROP POLICY IF EXISTS "Allow all access for authenticated" ON public.user_purchases;

-- 4. Create simple, permissive policies for now to fix the error

-- Allow authenticated users to INSERT their own purchases
CREATE POLICY "Users can create purchases"
ON public.user_purchases FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow authenticated users to SELECT their own purchases
CREATE POLICY "Users can view their own purchases"
ON public.user_purchases FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow admins/all authenticated users to view all (Simplified for debugging)
-- This ensures that if the specific user_id check fails for some reason, they can still likely see it if we are lax
-- But let's stick to the correct one above.

-- Verify:
-- If insert succeeds, select should succeed because user_id matches.

-- Grant Permissions
GRANT ALL ON public.user_purchases TO authenticated;
GRANT ALL ON public.user_purchases TO anon;
GRANT ALL ON public.user_purchases TO service_role;

SELECT 'Fixed user_purchases policies' as status;
