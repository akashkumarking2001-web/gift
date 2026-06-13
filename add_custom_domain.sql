-- SQL Migration: Add Custom Domain Support for Business Clients
-- Run this in your Supabase SQL Editor

-- 1. Add the custom_domain column if it doesn't exist
ALTER TABLE public.business_clients 
ADD COLUMN IF NOT EXISTS custom_domain text UNIQUE;

-- 2. Add an index for faster lookup since we will query by domain on every page load
CREATE INDEX IF NOT EXISTS idx_business_clients_custom_domain 
ON public.business_clients(custom_domain);

-- 3. Ensure RLS allows public to read the custom_domain (needed for ClientPublicPage detection)
-- No changes needed if 'Public can view client details by slug' already uses USING(true)
-- Checking existing policies (from FIX_RLS_BUSINESS_AND_PROFILES.sql)
-- Policy "Public can view client details by slug" ON business_clients USING(true) is perfect.

-- 4. Verification
SELECT id, business_name, business_slug, custom_domain 
FROM public.business_clients 
LIMIT 5;
