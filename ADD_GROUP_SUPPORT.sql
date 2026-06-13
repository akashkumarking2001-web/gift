-- 1. Add album_type column to ar_albums for branching modes
ALTER TABLE ar_albums 
ADD COLUMN IF NOT EXISTS album_type TEXT DEFAULT 'solo' CHECK (album_type IN ('solo', 'group'));

-- 2. Create ar_group_images table for storing raw target images references for Group Album add-more-later triggers
CREATE TABLE IF NOT EXISTS ar_group_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    album_id UUID REFERENCES ar_albums(id) ON DELETE CASCADE,
    file_path TEXT NOT EXISTS,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable RLS for the group images table
ALTER TABLE ar_group_images ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies for group images (same access as albums)
DROP POLICY IF EXISTS "Public Select group images" ON ar_group_images;
CREATE POLICY "Public Select group images" ON ar_group_images 
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin Insert group images" ON ar_group_images;
CREATE POLICY "Admin Insert group images" ON ar_group_images 
FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Update group images" ON ar_group_images;
CREATE POLICY "Admin Update group images" ON ar_group_images 
FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Admin Delete group images" ON ar_group_images;
CREATE POLICY "Admin Delete group images" ON ar_group_images 
FOR DELETE USING (true);

-- 5. Force update Schema Cache inside Supabase after ALTERs (just in case)
-- NOTIFY pgrst, 'reload schema';
