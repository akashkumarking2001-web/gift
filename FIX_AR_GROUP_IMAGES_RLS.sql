-- 🚨 RUN THIS ENTIRE SCRIPT IN YOUR SUPABASE SQL EDITOR TO FIX AR GROUP IMAGES UPLOAD ERRORS 🚨

-- Allow Anyone to INSERT group images (needs to be permissive for Client Dashboard like ar_targets)
DROP POLICY IF EXISTS "Admin Insert group images" ON public.ar_group_images;
DROP POLICY IF EXISTS "Anyone can create group images" ON public.ar_group_images;
CREATE POLICY "Anyone can create group images" 
ON public.ar_group_images FOR INSERT 
WITH CHECK (true);

-- Allow Anyone to UPDATE group images
DROP POLICY IF EXISTS "Admin Update group images" ON public.ar_group_images;
DROP POLICY IF EXISTS "Anyone can update group images" ON public.ar_group_images;
CREATE POLICY "Anyone can update group images" 
ON public.ar_group_images FOR UPDATE 
USING (true);

-- Allow Anyone to DELETE group images
DROP POLICY IF EXISTS "Admin Delete group images" ON public.ar_group_images;
DROP POLICY IF EXISTS "Anyone can delete group images" ON public.ar_group_images;
CREATE POLICY "Anyone can delete group images" 
ON public.ar_group_images FOR DELETE 
USING (true);

SELECT 'ar_group_images RLS policies updated successfully' as status;
