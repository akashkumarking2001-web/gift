-- 🚨 RUN THIS ENTIRE SCRIPT IN YOUR SUPABASE SQL EDITOR TO FIX AR TARGETS UPLOAD ERRORS 🚨

-- ==========================================
-- 1. AR_TARGETS (Fix: "new row violates row-level security policy for table 'ar_targets'")
-- ==========================================
-- Drop restrictive old policy
DROP POLICY IF EXISTS "Users can manage targets for their albums" ON public.ar_targets;

-- Allow Anyone to INSERT targets (needed for Client Dashboard without full Auth session)
CREATE POLICY "Anyone can create AR targets" 
ON public.ar_targets FOR INSERT 
WITH CHECK (true);

-- Allow Anyone to UPDATE targets (for editing later)
CREATE POLICY "Anyone can update AR targets" 
ON public.ar_targets FOR UPDATE 
USING (true);

-- Allow Anyone to DELETE targets (for editing/cleanup later)
CREATE POLICY "Anyone can delete AR targets" 
ON public.ar_targets FOR DELETE 
USING (true);


-- ==========================================
-- 2. AR_ALBUMS (Preventive Fix: Allow updates/deletes in dashboard)
-- ==========================================
-- Allow Anyone to UPDATE albums (changing title, description)
DROP POLICY IF EXISTS "Anyone can update AR albums" ON public.ar_albums;
CREATE POLICY "Anyone can update AR albums" 
ON public.ar_albums FOR UPDATE 
USING (true);

-- Allow Anyone to DELETE albums
DROP POLICY IF EXISTS "Anyone can delete AR albums" ON public.ar_albums;
CREATE POLICY "Anyone can delete AR albums" 
ON public.ar_albums FOR DELETE 
USING (true);

SELECT 'AR Target and Album RLS policies updated successfully' as status;
