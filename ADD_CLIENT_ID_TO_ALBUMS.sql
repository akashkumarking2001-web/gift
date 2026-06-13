-- 🚨 RUN THIS IN SUPABASE SQL EDITOR TO FIX ALBUMS HISTORY 🚨

-- 1. Add client_id column to associate albums with specific client dashboards
ALTER TABLE ar_albums 
ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES business_clients(id) ON DELETE CASCADE;

-- 2. Allow Clients or Anyone to Insert AR albums (needed for Client Dashboard without full Auth session)
DROP POLICY IF EXISTS "Anyone can create AR albums" ON ar_albums;
CREATE POLICY "Anyone can create AR albums" 
ON ar_albums FOR INSERT 
WITH CHECK (true);
