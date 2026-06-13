-- 🚨 RUN THIS ENTIRE SCRIPT IN YOUR SUPABASE SQL EDITOR TO RESTORE DATA VIEWING 🚨

-- ==========================================
-- 1. BUSINESS CLIENTS (Fix: "No business clients found")
-- ==========================================
-- Allow PUBLIC to view client details (needed for landing pages)
DROP POLICY IF EXISTS "Public can view client details by slug" ON business_clients;
CREATE POLICY "Public can view client details by slug" 
ON business_clients FOR SELECT 
USING (true);

-- Allow ADMINS to manage all business clients
DROP POLICY IF EXISTS "Admin full access to business_clients" ON business_clients;
CREATE POLICY "Admin full access to business_clients" 
ON business_clients FOR ALL 
USING (
    (auth.jwt() ->> 'email') IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com')
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- ==========================================
-- 2. UPGRADE REQUESTS (Fix: "No purchase requests yet")
-- ==========================================
-- Allow clients to view their own upgrade requests
DROP POLICY IF EXISTS "Client can view own upgrade requests" ON upgrade_requests;
CREATE POLICY "Client can view own upgrade requests" 
ON upgrade_requests FOR SELECT 
USING (auth.uid() = client_id); 

-- Allow clients to submit new upgrade requests
DROP POLICY IF EXISTS "Anyone can submit upgrade requests" ON upgrade_requests;
CREATE POLICY "Anyone can submit upgrade requests" 
ON upgrade_requests FOR INSERT 
WITH CHECK (true); 

-- Allow ADMINS to manage all upgrade requests
DROP POLICY IF EXISTS "Admin full access to upgrade_requests" ON upgrade_requests;
CREATE POLICY "Admin full access to upgrade_requests" 
ON upgrade_requests FOR ALL 
USING (
    (auth.jwt() ->> 'email') IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com')
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- ==========================================
-- 3. PAYMENT SETTINGS
-- ==========================================
-- Allow PUBLIC to view payment settings (for QR codes)
DROP POLICY IF EXISTS "Public can view payment settings" ON payment_settings;
CREATE POLICY "Public can view payment settings" 
ON payment_settings FOR SELECT 
USING (true);

-- Allow ADMINS to manage payment settings
DROP POLICY IF EXISTS "Admin full access to payment_settings" ON payment_settings;
CREATE POLICY "Admin full access to payment_settings" 
ON payment_settings FOR ALL 
USING (
    (auth.jwt() ->> 'email') IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com')
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);

-- ==========================================
-- 4. USER PROFILES (Fix: "No users found")
-- ==========================================
-- Allow users to manage their own profile
DROP POLICY IF EXISTS "Users can manage own profile" ON user_profiles;
CREATE POLICY "Users can manage own profile" 
ON user_profiles FOR ALL 
USING (auth.uid() = id);

-- Allow ADMINS to manage all profiles
DROP POLICY IF EXISTS "Admins can manage all profiles" ON user_profiles;
CREATE POLICY "Admins can manage all profiles" 
ON user_profiles FOR SELECT 
USING (
    (auth.jwt() ->> 'email') IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com')
    OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
);
