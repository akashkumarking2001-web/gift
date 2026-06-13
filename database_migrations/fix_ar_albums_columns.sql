-- 1. Ensure phone_number exists for individual user identification
ALTER TABLE ar_albums ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- 2. Add necessary columns to ar_albums for Magic Creator Flow
ALTER TABLE public.ar_albums 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS cf_order_id TEXT,
ADD COLUMN IF NOT EXISTS cf_session_id TEXT,
ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'approved',
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'paid',
ADD COLUMN IF NOT EXISTS amount_paid NUMERIC;

-- 3. Update ar_targets schema for extended tracking data
ALTER TABLE public.ar_targets 
ADD COLUMN IF NOT EXISTS image_url TEXT,
ADD COLUMN IF NOT EXISTS player_type TEXT DEFAULT 'normal';

-- 4. Make mind_file_url NULLABLE because individuals only upload raw image/video
ALTER TABLE public.ar_albums ALTER COLUMN mind_file_url DROP NOT NULL;

-- 5. Set up RLS for public creation (Personal workflow)
DROP POLICY IF EXISTS "Public insert into ar_albums" ON public.ar_albums;
CREATE POLICY "Public insert into ar_albums" ON public.ar_albums FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert into ar_targets" ON public.ar_targets;
CREATE POLICY "Public insert into ar_targets" ON public.ar_targets FOR INSERT WITH CHECK (true);
