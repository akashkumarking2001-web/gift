-- 3. Fixed Approval Function
CREATE OR REPLACE FUNCTION approve_business_request(p_request_id UUID, p_password TEXT)
RETURNS VOID AS $$
DECLARE
    r RECORD;
    v_slug TEXT;
    v_limit INTEGER;
BEGIN
    -- Get request details
    SELECT * INTO r FROM business_registration_requests WHERE id = p_request_id;
    
    IF r.id IS NULL THEN
        RAISE EXCEPTION 'Request not found';
    END IF;

    -- Generate slug if not present (use the one from the request if available)
    IF r.business_slug IS NOT NULL THEN
        v_slug := r.business_slug;
    ELSE
        v_slug := lower(regexp_replace(r.business_name, '[^a-zA-Z0-9]+', '-', 'g'));
    END IF;
    
    -- Determine limit based on package
    IF r.package_name = '4999' OR r.package_name ILIKE '%Enterprise%' THEN v_limit := 999999;
    ELSIF r.package_name = '799' OR r.package_name ILIKE '%Professional%' THEN v_limit := 1500;
    ELSE v_limit := 600;
    END IF;

    -- Update status (correct column is 'status', not 'request_status')
    UPDATE business_registration_requests 
    SET status = 'approved', updated_at = NOW()
    WHERE id = p_request_id;

    -- Create business client with all available details
    INSERT INTO business_clients (
        business_name,
        business_slug,
        email,
        password_hash,
        package_type,
        frame_limit,
        is_active,
        subscription_start_date,
        activation_date,
        next_renewal_date,
        whatsapp_number,
        instagram_id,
        logo_url,
        custom_domain
    ) VALUES (
        r.business_name,
        v_slug,
        r.email,
        crypt(p_password, gen_salt('bf')), -- Properly hash the password
        r.package_name,
        v_limit,
        true,
        NOW(),
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '28 days',
        r.whatsapp_number, -- correctly mapped from whatsapp_number, not phone
        r.instagram_id,
        r.logo_url,
        r.custom_domain
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
