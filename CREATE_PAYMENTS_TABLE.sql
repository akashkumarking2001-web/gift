-- Create payments table if it doesn't exist
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS public.payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  transaction_id text NOT NULL,
  amount numeric NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  screenshot_url text,
  user_metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read payments" ON public.payments;
DROP POLICY IF EXISTS "Allow public insert payments" ON public.payments;
DROP POLICY IF EXISTS "Allow authenticated read payments" ON public.payments;
DROP POLICY IF EXISTS "Allow authenticated update payments" ON public.payments;

-- Create new policies
CREATE POLICY "Allow public read payments"
ON public.payments FOR SELECT
USING (true);

CREATE POLICY "Allow public insert payments"
ON public.payments FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow authenticated read payments"
ON public.payments FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Allow authenticated update payments"
ON public.payments FOR UPDATE
TO authenticated
USING (true);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_email ON public.payments(user_email);

SELECT 'Payments table created successfully' as status;
