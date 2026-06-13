-- ============================================================
-- MASTER AR CONFIG TABLE
-- Run this in Supabase SQL Editor to enable Master Sync mode
-- ============================================================

-- Create the table (stores exactly 1 row - the global master dataset URL)
CREATE TABLE IF NOT EXISTS public.ar_master_config (
    id INTEGER PRIMARY KEY DEFAULT 1,
    master_mind_file_url TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Enable RLS
ALTER TABLE public.ar_master_config ENABLE ROW LEVEL SECURITY;

-- Public read (scanner needs this without login)
DROP POLICY IF EXISTS "Public master config read" ON public.ar_master_config;
CREATE POLICY "Public master config read"
    ON public.ar_master_config FOR SELECT
    USING (true);

-- Allow authenticated users + service role to upsert
DROP POLICY IF EXISTS "Authenticated upsert master config" ON public.ar_master_config;
CREATE POLICY "Authenticated upsert master config"
    ON public.ar_master_config FOR ALL
    USING (true)
    WITH CHECK (true);

-- Insert the initial empty row (will be populated on first album upload)
INSERT INTO public.ar_master_config (id, master_mind_file_url)
VALUES (1, NULL)
ON CONFLICT (id) DO NOTHING;

-- Confirm all existing tables still allow public read for scanner
-- (Run this if you get RLS errors on ar_targets)
DROP POLICY IF EXISTS "Public targets are viewable by everyone" ON public.ar_targets;
CREATE POLICY "Public targets are viewable by everyone"
    ON public.ar_targets FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Public albums are viewable by everyone" ON public.ar_albums;
CREATE POLICY "Public albums are viewable by everyone"
    ON public.ar_albums FOR SELECT
    USING (true);
