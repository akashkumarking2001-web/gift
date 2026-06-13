
-- 1. Create Contact Requests table
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT,
    status TEXT DEFAULT 'new', -- new, read, replied, closed
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create User Profiles table (for App User Network)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT,
    email TEXT UNIQUE,
    phone_number TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create AR Tables (if missing)
CREATE TABLE IF NOT EXISTS public.ar_albums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    mind_file_url TEXT,
    user_id UUID,
    client_id UUID,
    username TEXT UNIQUE,
    phone_number TEXT,
    album_type TEXT DEFAULT 'solo',
    approval_status TEXT DEFAULT 'approved',
    is_active BOOLEAN DEFAULT true,
    amount_paid NUMERIC DEFAULT 0,
    payment_status TEXT DEFAULT 'paid',
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ar_targets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id UUID REFERENCES public.ar_albums(id) ON DELETE CASCADE,
    target_index INTEGER NOT NULL,
    video_url TEXT NOT NULL,
    player_type TEXT DEFAULT 'normal', -- normal, video_player
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.ar_group_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    album_id UUID REFERENCES public.ar_albums(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    target_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create Personal Registration Requests table
CREATE TABLE IF NOT EXISTS public.personal_registration_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone_number TEXT,
    business_package TEXT,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected
    payment_status TEXT DEFAULT 'unpaid', -- unpaid, paid
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create AR Master Config table
CREATE TABLE IF NOT EXISTS public.ar_master_config (
    id INTEGER PRIMARY KEY DEFAULT 1,
    master_mind_file_url TEXT,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Initial seed for master config if not exists
INSERT INTO public.ar_master_config (id, master_mind_file_url)
VALUES (1, NULL)
ON CONFLICT (id) DO NOTHING;

-- 6. Enable RLS and Policies
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ar_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ar_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ar_group_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_registration_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ar_master_config ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Public insert contact_requests" ON public.contact_requests;
CREATE POLICY "Public insert contact_requests" ON public.contact_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins all contact_requests" ON public.contact_requests;
CREATE POLICY "Admins all contact_requests" ON public.contact_requests FOR ALL USING (true);

DROP POLICY IF EXISTS "Admins all user_profiles" ON public.user_profiles;
CREATE POLICY "Admins all user_profiles" ON public.user_profiles FOR ALL USING (true);

DROP POLICY IF EXISTS "Public read user_profiles" ON public.user_profiles;
CREATE POLICY "Public read user_profiles" ON public.user_profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins all ar_albums" ON public.ar_albums;
CREATE POLICY "Admins all ar_albums" ON public.ar_albums FOR ALL USING (true);

DROP POLICY IF EXISTS "Public read active ar_albums" ON public.ar_albums;
CREATE POLICY "Public read active ar_albums" ON public.ar_albums FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Admins all ar_targets" ON public.ar_targets;
CREATE POLICY "Admins all ar_targets" ON public.ar_targets FOR ALL USING (true);

DROP POLICY IF EXISTS "Public read ar_targets" ON public.ar_targets;
CREATE POLICY "Public read ar_targets" ON public.ar_targets FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins all ar_group_images" ON public.ar_group_images;
CREATE POLICY "Admins all ar_group_images" ON public.ar_group_images FOR ALL USING (true);

DROP POLICY IF EXISTS "Public read ar_group_images" ON public.ar_group_images;
CREATE POLICY "Public read ar_group_images" ON public.ar_group_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins all personal_requests" ON public.personal_registration_requests;
CREATE POLICY "Admins all personal_requests" ON public.personal_registration_requests FOR ALL USING (true);

DROP POLICY IF EXISTS "Public insert personal_requests" ON public.personal_registration_requests;
CREATE POLICY "Public insert personal_requests" ON public.personal_registration_requests FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins all master_config" ON public.ar_master_config;
CREATE POLICY "Admins all master_config" ON public.ar_master_config FOR ALL USING (true);

DROP POLICY IF EXISTS "Public read master_config" ON public.ar_master_config;
CREATE POLICY "Public read master_config" ON public.ar_master_config FOR SELECT USING (true);
