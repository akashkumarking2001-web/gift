-- 🚨 ADMIN ACCESS & PERMISSIONS REPAIR SCRIPT 🚨

-- Enable RLS on all relevant tables
ALTER TABLE user_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- 1. Whitelist the emails for Admin Access
-- This whitelists your current email (akashkumarking2001@gmail.com) and others.

DROP POLICY IF EXISTS "Admins can view all purchases" ON user_purchases;
CREATE POLICY "Admins can view all purchases" 
ON user_purchases FOR ALL 
USING (
    (auth.jwt() ->> 'email') IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com')
    OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

DROP POLICY IF EXISTS "Admins can manage templates" ON templates;
CREATE POLICY "Admins can manage templates" 
ON templates FOR ALL 
USING (
    (auth.jwt() ->> 'email') IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com')
    OR
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- 2. Storage Policies for Admin (Editing template assets)
-- Ensures admins can upload/manage any file in the 'uploads' bucket
DROP POLICY IF EXISTS "Admins can manage storage" ON storage.objects;
CREATE POLICY "Admins can manage storage"
ON storage.objects FOR ALL
USING (
    (auth.jwt() ->> 'email') IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com')
)
WITH CHECK (
    (auth.jwt() ->> 'email') IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com')
);

-- 3. Ensure users can still see templates but not edit them
DROP POLICY IF EXISTS "Public can view templates" ON templates;
CREATE POLICY "Public can view templates" 
ON templates FOR SELECT 
USING (true);

-- 4. Final fix for "Status Reset" issue:
-- The 'approve' function in the code updates the 'user_purchases' table.
-- The policy above ("Admins can view all purchases" FOR ALL) covers SELECT and UPDATE.
-- This script confirms the permissions are active for your email.

-- SUCCESS! Now copy-paste this into your Supabase SQL Editor and RUN.
