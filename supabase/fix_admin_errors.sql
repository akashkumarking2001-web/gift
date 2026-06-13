-- SQL to create missing tables and fix inconsistencies from AdminDashboard console errors

-- 1. Create contact_requests table
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending', -- pending, processed
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for contact_requests
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Policy for Admin (all access)
CREATE POLICY "Admin can do everything on contact_requests" 
ON public.contact_requests FOR ALL TO authenticated 
USING (auth.jwt() ->> 'email' = 'admin@giftmagic.in');

-- Policy for Public (can insert)
CREATE POLICY "Public can insert contact_requests" 
ON public.contact_requests FOR INSERT TO anon 
WITH CHECK (true);

-- 2. Create pending_ar_creations table
CREATE TABLE IF NOT EXISTS public.pending_ar_creations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email TEXT NOT NULL,
    title TEXT,
    status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for pending_ar_creations
ALTER TABLE public.pending_ar_creations ENABLE ROW LEVEL SECURITY;

-- Policy for Admin (all access)
CREATE POLICY "Admin can do everything on pending_ar_creations" 
ON public.pending_ar_creations FOR ALL TO authenticated 
USING (auth.jwt() ->> 'email' = 'admin@giftmagic.in');

-- 3. Fix ar_albums foreign key relationship in queries
-- The code in AdminDashboard.tsx was searching for 'clients' but it should be 'business_clients'
-- If there is a foreign key on ar_albums.client_id, ensure it points to business_clients.id

DO $$ 
BEGIN
    -- Check if ar_albums exists
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'ar_albums') THEN
        -- Check if it has a foreign key to business_clients
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'ar_albums_client_id_fkey'
        ) THEN
            -- Add foreign key if it's missing (assuming client_id column exists)
            ALTER TABLE public.ar_albums 
            ADD CONSTRAINT ar_albums_client_id_fkey 
            FOREIGN KEY (client_id) REFERENCES public.business_clients(id) ON DELETE CASCADE;
        END IF;
    END IF;
END $$;
