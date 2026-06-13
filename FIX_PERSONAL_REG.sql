
-- 1. Create the missing registration requests table
CREATE TABLE IF NOT EXISTS public.personal_registration_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    password_plain TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_status TEXT DEFAULT 'unpaid',
    payment_details TEXT,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable Security & Policies
ALTER TABLE public.personal_registration_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous inserts for registration" ON public.personal_registration_requests;
CREATE POLICY "Allow anonymous inserts for registration" 
ON public.personal_registration_requests 
FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public monitoring by email" ON public.personal_registration_requests;
CREATE POLICY "Allow public monitoring by email" 
ON public.personal_registration_requests 
FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Admin full access" ON public.personal_registration_requests;
CREATE POLICY "Admin full access" 
ON public.personal_registration_requests 
FOR ALL 
TO authenticated 
USING (true);

-- 3. Create Approval RPC
CREATE OR REPLACE FUNCTION public.approve_personal_request(p_request_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_req RECORD;
BEGIN
    -- Move to approved status
    UPDATE public.personal_registration_requests 
    SET status = 'approved', payment_status = 'paid', updated_at = now() 
    WHERE id = p_request_id
    RETURNING * INTO v_req;

    IF v_req.id IS NULL THEN
        RAISE EXCEPTION 'Request not found';
    END IF;

    -- Note: Real account provisioning (supabase.auth) usually happens via the mobile client 
    -- after detecting the 'approved' status, or via an Edge Function.
    -- This function serves as the trigger for synchronization.

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
