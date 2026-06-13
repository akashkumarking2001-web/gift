-- Drop existing functions before recreation to allow return type changes
DROP FUNCTION IF EXISTS approve_business_request(uuid);
DROP FUNCTION IF EXISTS approve_business_request(uuid, text);

-- Final Fixed Approval Function
CREATE OR REPLACE FUNCTION approve_business_request(p_request_id UUID, p_password TEXT DEFAULT NULL)
RETURNS JSONB AS $$
DECLARE
    r RECORD;
    v_slug TEXT;
    v_limit INTEGER;
    v_password TEXT;
    v_client JSONB;
BEGIN
    -- Get request details
    SELECT * INTO r FROM business_registration_requests WHERE id = p_request_id;
    
    IF r.id IS NULL THEN
        RAISE EXCEPTION 'Request not found';
    END IF;

    -- Use provided password or fall back to the one in the table
    v_password := COALESCE(p_password, r.password_plain);
    
    IF v_password IS NULL THEN
        RAISE EXCEPTION 'No password found for this request';
    END IF;

    -- Generate slug if not present
    IF r.business_slug IS NOT NULL AND r.business_slug != '' THEN
        v_slug := r.business_slug;
    ELSE
        v_slug := lower(regexp_replace(r.business_name, '[^a-zA-Z0-9]+', '-', 'g'));
    END IF;
    
    -- Ensure slug unique (basic check)
    IF EXISTS (SELECT 1 FROM business_clients WHERE business_slug = v_slug) THEN
        v_slug := v_slug || '-' || floor(random() * 1000)::text;
    END IF;

    -- Determine limit based on package
    IF r.package_name ILIKE '%Enterprise%' OR r.package_price >= 4999 THEN v_limit := 999999;
    ELSIF r.package_name ILIKE '%Pro%' OR r.package_price >= 799 THEN v_limit := 1500;
    ELSE v_limit := 600;
    END IF;

    -- Update status
    UPDATE business_registration_requests 
    SET status = 'approved', updated_at = NOW(), payment_status = 'PAID'
    WHERE id = p_request_id;

    -- Upsert business client (prevent duplicate emails)
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
        crypt(v_password, gen_salt('bf')),
        r.package_name,
        v_limit,
        true,
        NOW(),
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '1 year',
        r.whatsapp_number,
        r.instagram_id,
        r.logo_url,
        r.custom_domain
    )
    ON CONFLICT (email) DO UPDATE SET
        is_active = true,
        business_slug = EXCLUDED.business_slug,
        package_type = EXCLUDED.package_type,
        frame_limit = EXCLUDED.frame_limit,
        subscription_start_date = NOW();

    -- Return the details for redirection
    SELECT jsonb_build_object(
        'business_name', r.business_name,
        'business_slug', v_slug,
        'email', r.email,
        'status', 'success'
    ) INTO v_client;

    RETURN v_client;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
