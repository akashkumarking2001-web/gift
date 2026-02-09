-- 🚨 RUN THIS ENTIRE SCRIPT IN SUPABASE SQL EDITOR TO FIX EVERYTHING 🚨

-- Enable RLS on all relevant tables
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 1. USER PURCHASES (Fix: Admin Visibility)
-- ==========================================

-- Allow users to view their OWN purchases
DROP POLICY IF EXISTS "Users can view own purchases" ON user_purchases;
CREATE POLICY "Users can view own purchases" 
ON user_purchases FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to insert their OWN purchases
DROP POLICY IF EXISTS "Users can create purchases" ON user_purchases;
CREATE POLICY "Users can create purchases" 
ON user_purchases FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow ADMINS to view/update ALL purchases
-- Adding 'gdchgcxhj@gmail.com' explicitly based on your screenshots
DROP POLICY IF EXISTS "Admins can view all purchases" ON user_purchases;
CREATE POLICY "Admins can view all purchases" 
ON user_purchases FOR ALL 
USING (
    (auth.jwt() ->> 'email') IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com')
    OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- ==========================================
-- 2. GIFTS (Fix: Editor "Failed to Update")
-- ==========================================

-- Allow users to CRUD (Create, Read, Update, Delete) their OWN gifts
DROP POLICY IF EXISTS "Users can manage own gifts" ON gifts;
CREATE POLICY "Users can manage own gifts" 
ON gifts FOR ALL 
USING (auth.uid() = user_id);

-- Allow PUBLIC to view published gifts
DROP POLICY IF EXISTS "Public can view published gifts" ON gifts;
CREATE POLICY "Public can view published gifts" 
ON gifts FOR SELECT 
USING (is_published = true);

-- ==========================================
-- 3. TEMPLATES (Fix: Admin "Failed to Update")
-- ==========================================

-- Allow EVERYONE to view templates
DROP POLICY IF EXISTS "Public can view templates" ON templates;
CREATE POLICY "Public can view templates" 
ON templates FOR SELECT 
USING (true);

-- Allow ADMINS to update templates
DROP POLICY IF EXISTS "Admins can manage templates" ON templates;
CREATE POLICY "Admins can manage templates" 
ON templates FOR ALL 
USING (
    (auth.jwt() ->> 'email') IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com')
    OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- ==========================================
-- 4. STORAGE (Fix: Image/Video Uploads)
-- ==========================================

-- Create 'uploads' bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

-- Allow authenticated users to upload to 'uploads' bucket
DROP POLICY IF EXISTS "Authenticated users can upload media" ON storage.objects;
CREATE POLICY "Authenticated users can upload media"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'uploads' AND auth.role() = 'authenticated' );

-- Allow public to view media
DROP POLICY IF EXISTS "Public can view media" ON storage.objects;
CREATE POLICY "Public can view media"
ON storage.objects FOR SELECT
USING ( bucket_id = 'uploads' );

-- FINISHED!
