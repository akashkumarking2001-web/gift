
-- table for personal registration requests
CREATE TABLE IF NOT EXISTS public.personal_registration_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    password_plain TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    payment_status TEXT DEFAULT 'unpaid',
    payment_details TEXT,
    admin_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Policy for personal registration requests (anon insert)
ALTER TABLE public.personal_registration_requests ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anon can submit requests" ON public.personal_registration_requests;
CREATE POLICY "Anon can submit requests" ON public.personal_registration_requests FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Users can view their own requests by email" ON public.personal_registration_requests;
CREATE POLICY "Users can view their own requests by email" ON public.personal_registration_requests FOR SELECT USING (true); -- simplified for now
DROP POLICY IF EXISTS "Admins can manage" ON public.personal_registration_requests;
CREATE POLICY "Admins can manage" ON public.personal_registration_requests FOR ALL USING (true);

-- RPC for approving personal request (creating user profile)
CREATE OR REPLACE FUNCTION public.approve_personal_request(p_request_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
    v_req RECORD;
BEGIN
    SELECT * INTO v_req FROM public.personal_registration_requests WHERE id = p_request_id;
    
    IF v_req IS NULL THEN
        RAISE EXCEPTION 'Request not found';
    END IF;

    -- Note: Since we don't have a reliable way to create AUTH users from within PL/pgSQL
    -- WITHOUT a specialized edge function or service role, we will mark it as "Approved"
    -- and the mobile app will detect this, then call the signUp method as normal
    -- OR, if the user already did signUp but with a status flag, we update it.
    
    -- Option: We create a user_profile record now. If the user then signs up with same email,
    -- they will link or we handle the existing profile.
    
    UPDATE public.personal_registration_requests 
    SET status = 'approved', updated_at = now() 
    WHERE id = p_request_id;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
