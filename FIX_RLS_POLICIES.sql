-- Fix RLS policies to allow authenticated users to access data
-- Run this in Supabase SQL Editor

-- Allow authenticated users to read payments
DROP POLICY IF EXISTS "Allow authenticated read payments" ON public.payments;
CREATE POLICY "Allow authenticated read payments"
ON public.payments FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to update payments
DROP POLICY IF EXISTS "Allow authenticated update payments" ON public.payments;
CREATE POLICY "Allow authenticated update payments"
ON public.payments FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to read templates
DROP POLICY IF EXISTS "Allow authenticated read templates" ON public.templates;
CREATE POLICY "Allow authenticated read templates"
ON public.templates FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to update templates
DROP POLICY IF EXISTS "Allow authenticated update templates" ON public.templates;
CREATE POLICY "Allow authenticated update templates"
ON public.templates FOR UPDATE
TO authenticated
USING (true);

-- Allow authenticated users to insert templates
DROP POLICY IF EXISTS "Allow authenticated insert templates" ON public.templates;
CREATE POLICY "Allow authenticated insert templates"
ON public.templates FOR INSERT
TO authenticated
WITH CHECK (true);

-- Allow authenticated users to read settings
DROP POLICY IF EXISTS "Allow authenticated read settings" ON public.system_settings;
CREATE POLICY "Allow authenticated read settings"
ON public.system_settings FOR SELECT
TO authenticated
USING (true);

-- Allow authenticated users to update settings
DROP POLICY IF EXISTS "Allow authenticated update settings" ON public.system_settings;
CREATE POLICY "Allow authenticated update settings"
ON public.system_settings FOR UPDATE
TO authenticated
USING (true);

SELECT 'RLS policies updated successfully' as status;
