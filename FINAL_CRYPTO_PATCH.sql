-- Update the RPCs to explicitly use the `extensions` schema for pgcrypto functions
-- This fixes the 'crypt does not exist' error in Supabase

CREATE OR REPLACE FUNCTION approve_business_request(p_request_id UUID, p_password TEXT)
RETURNS VOID AS $$
DECLARE
    r RECORD;
    v_slug TEXT;
    v_limit INTEGER;
BEGIN
    SELECT * INTO r FROM business_registration_requests WHERE id = p_request_id;
    IF r.id IS NULL THEN RAISE EXCEPTION 'Request not found'; END IF;

    IF r.business_slug IS NOT NULL THEN v_slug := r.business_slug;
    ELSE v_slug := lower(regexp_replace(r.business_name, '[^a-zA-Z0-9]+', '-', 'g')); END IF;
    
    IF r.package_name = '4999' OR r.package_name ILIKE '%Enterprise%' THEN v_limit := 999999;
    ELSIF r.package_name = '799' OR r.package_name ILIKE '%Professional%' THEN v_limit := 1500;
    ELSE v_limit := 600; END IF;

    UPDATE business_registration_requests SET status = 'approved', updated_at = NOW() WHERE id = p_request_id;

    INSERT INTO business_clients (
        business_name, business_slug, email, password_hash, package_type, frame_limit, is_active,
        subscription_start_date, activation_date, next_renewal_date, whatsapp_number, instagram_id, logo_url, custom_domain
    ) VALUES (
        r.business_name, v_slug, r.email,
        extensions.crypt(p_password, extensions.gen_salt('bf')), -- ✅ Fixed explicitly with extensions schema
        r.package_name, v_limit, true, NOW(), CURRENT_DATE, CURRENT_DATE + INTERVAL '28 days',
        r.whatsapp_number, r.instagram_id, r.logo_url, r.custom_domain
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


CREATE OR REPLACE FUNCTION verify_business_client(p_email TEXT, p_password TEXT) 
RETURNS TABLE (
    id UUID, business_name TEXT, business_slug TEXT, custom_domain TEXT, logo_url TEXT, email TEXT, 
    instagram_id TEXT, package_type TEXT, frame_limit INTEGER, frames_used INTEGER, 
    next_renewal_date DATE, is_active BOOLEAN, show_frames_preview BOOLEAN
) AS $$
BEGIN
    RETURN QUERY 
    SELECT b.id, b.business_name, b.business_slug, b.custom_domain, b.logo_url, b.email, b.instagram_id, 
        b.package_type, b.frame_limit, b.frames_used, b.next_renewal_date, b.is_active, b.show_frames_preview
    FROM business_clients b
    WHERE b.email = p_email 
    AND b.is_active = true
    AND b.password_hash = extensions.crypt(p_password, b.password_hash); -- ✅ Fixed explicitly with extensions schema
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
