-- Supabase Security Advisor Fixes
-- Run this in your Supabase SQL Editor to clear all the red Errors

-- 1. Enable RLS on all flagged tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.upgrade_requests ENABLE ROW LEVEL SECURITY;

-- 2. Downgrade Views from Security Definer to Security Invoker 
-- This fixes the "Security Definer View" errors
ALTER VIEW public.public_gifts SET (security_invoker = on);
ALTER VIEW public.user_balances SET (security_invoker = on);

-- 3. Fix "Exposed Auth Users" & "Security Definer View" for unused view
-- This view was joined with auth.users which triggered the severe security linter error, 
-- but it isn't actually used by the frontend so it is safest to just remove it.
DROP VIEW IF EXISTS public.user_template_access_detailed;
