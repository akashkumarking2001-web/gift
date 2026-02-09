-- Enable RLS (Row Level Security) on tables if not already enabled
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- 1. POLICIES FOR USER PURCHASES (Admin Visibility Fix)

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

-- Allow ADMINS to view ALL purchases (The Missing Piece!)
-- We assume admin is defined by a specific email or metadata. 
-- For now, we will create a policy that simply allows ALL authenticated users to read for simplicity in debugging 
-- OR strictly check for admin email if you have one.
-- A better approach for the admin panel is to allow specific users.
-- Let's check if the user is 'admin@giftmagic.com' OR has 'app_metadata' -> 'admin'.

DROP POLICY IF EXISTS "Admins can view all purchases" ON user_purchases;
CREATE POLICY "Admins can view all purchases" 
ON user_purchases FOR SELECT 
USING (
    -- Check if user email is the admin email
    (auth.jwt() ->> 'email') = 'admin@giftmagic.com'
    OR
    -- OR check if user metadata has is_admin flag (if you set it)
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- Allow ADMINS to update/approve purchases
DROP POLICY IF EXISTS "Admins can update purchases" ON user_purchases;
CREATE POLICY "Admins can update purchases" 
ON user_purchases FOR UPDATE
USING (
    (auth.jwt() ->> 'email') = 'admin@giftmagic.com'
    OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);


-- 2. POLICIES FOR GIFTS (Editor "Failed to Update" Fix)

-- Allow users to CRUD (Create, Read, Update, Delete) their OWN gifts
DROP POLICY IF EXISTS "Users can manage own gifts" ON gifts;
CREATE POLICY "Users can manage own gifts" 
ON gifts FOR ALL 
USING (auth.uid() = user_id);

-- Allow PUBLIC access to published gifts (for viewing via link)
DROP POLICY IF EXISTS "Public can view published gifts" ON gifts;
CREATE POLICY "Public can view published gifts" 
ON gifts FOR SELECT 
USING (is_published = true);

-- 3. STORAGE POLICIES (For Image/Video Uploads)
-- You need to create a bucket named 'uploads' in your Supabase Dashboard if it doesn't exist.
-- Then run these policies:

-- Allow authenticated users to upload files
-- Note: This SQL might fail if storage schema not accessible, usually done via Dashboard.
-- But we can try enabling public access.

insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do nothing;

create policy "Authenticated users can upload media"
  on storage.objects for insert
  with check ( bucket_id = 'uploads' and auth.role() = 'authenticated' );

create policy "Public can view media"
  on storage.objects for select
  using ( bucket_id = 'uploads' );
