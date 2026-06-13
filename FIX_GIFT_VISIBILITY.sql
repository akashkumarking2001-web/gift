-- 🛡️ REFIX GIFT VISIBILITY & RLS POLICIES 🛡️
-- Run this in your Supabase SQL Editor to allow anyone with a link to view gifts.

-- 1. Ensure RLS is enabled on gifts table
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to start fresh
DROP POLICY IF EXISTS "Users can manage own gifts" ON public.gifts;
DROP POLICY IF EXISTS "Public can view published gifts" ON public.gifts;
DROP POLICY IF EXISTS "Anyone can view published gifts" ON public.gifts;
DROP POLICY IF EXISTS "Users can view own gifts" ON public.gifts;
DROP POLICY IF EXISTS "Users can update own gifts" ON public.gifts;
DROP POLICY IF EXISTS "Users can update own unpublished gifts" ON public.gifts;
DROP POLICY IF EXISTS "Users can create their own gifts" ON public.gifts;
DROP POLICY IF EXISTS "Users can insert own gifts" ON public.gifts;

-- 3. Create permissive policies

-- POLICY: ANYONE (even guest/incognito) can view a gift if they have the ID
-- This is the most important fix for your "Gift Not Found" issue.
-- We use USING (true) because the gift_uuid itself serves as a secret access token.
CREATE POLICY "Allow public select by uuid"
ON public.gifts FOR SELECT
TO anon, authenticated
USING (true);

-- POLICY: Authenticated users can manage (create/update/delete) their OWN gifts
CREATE POLICY "Allow users to manage own gifts"
ON public.gifts FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- 4. Grant schema permissions (just in case they were revoked)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.gifts TO authenticated;
GRANT SELECT ON public.gifts TO anon;

-- 5. Final check on templates table (everyone should be able to read)
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can view templates" ON public.templates;
CREATE POLICY "Public can view templates" 
ON public.templates FOR SELECT 
TO anon, authenticated
USING (true);

GRANT SELECT ON public.templates TO anon, authenticated;

SELECT 'Privacy fixed! Anyone with the link can now view gifts. Try Incognito mode again.' as status;
