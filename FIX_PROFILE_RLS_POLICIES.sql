-- 🚨 RUN THIS IN SUPABASE SQL EDITOR TO FIX PROFILE SAVING ERRORS 🚨

-- 1. Allow Anyone to Update business_clients (needed for Client Dashboard anonymous saving profile)
DROP POLICY IF EXISTS "Anyone can update business clients" ON business_clients;
CREATE POLICY "Anyone can update business clients" ON business_clients 
FOR UPDATE USING (true);

-- 2. Allow Anyone to INSERT files into 'ar-assets' Storage Bucket (for logos/mind uploads)
DROP POLICY IF EXISTS "Anyone can upload objects to ar-assets" ON storage.objects;
CREATE POLICY "Anyone can upload objects to ar-assets" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'ar-assets');

-- 3. Allow Anyone to VIEW files in 'ar-assets'
DROP POLICY IF EXISTS "Anyone can view objects in ar-assets" ON storage.objects;
CREATE POLICY "Anyone can view objects in ar-assets" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'ar-assets');
