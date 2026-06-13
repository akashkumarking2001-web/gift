-- 🚨 RUN THIS ENTIRE SCRIPT IN YOUR SUPABASE SQL EDITOR TO FIX COUNTS & DATES 🚨

-- ==========================================
-- 1. Create Atomic Count Recalculation Function
-- ==========================================
CREATE OR REPLACE FUNCTION public.sync_frames_count(p_client_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER;
BEGIN
  -- Count total targets for all albums belonging to this client
  SELECT COUNT(*) INTO v_count
  FROM public.ar_targets t
  JOIN public.ar_albums a ON t.album_id = a.id
  WHERE a.client_id = p_client_id;

  -- Update the business_clients table
  UPDATE public.business_clients
  SET frames_used = v_count
  WHERE id = p_client_id;

  RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- ==========================================
-- 2. Fix NULL Renewal Dates for Existing Clients
-- ==========================================
UPDATE public.business_clients 
SET 
  activation_date = COALESCE(activation_date, CURRENT_DATE),
  next_renewal_date = COALESCE(next_renewal_date, CURRENT_DATE + INTERVAL '1 month')
WHERE next_renewal_date IS NULL OR activation_date IS NULL;

-- ==========================================
-- 3. Run Sync for ALL Clients once to fix past counts
-- ==========================================
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN SELECT id FROM public.business_clients LOOP
    PERFORM public.sync_frames_count(r.id);
  END LOOP;
END $$;

SELECT 'Dashboard calculations fixed successfully' as status;
