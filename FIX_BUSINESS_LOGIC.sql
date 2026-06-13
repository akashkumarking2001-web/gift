-- SQL Migration: Fix Business Login & Registration Logic
-- This fixes the password hashing mismatch and missing columns in the approval process.

-- 1. DROP old functions
DROP FUNCTION IF EXISTS approve_business_request(UUID, TEXT);
DROP FUNCTION IF EXISTS verify_business_client(TEXT, TEXT);
DROP FUNCTION IF EXISTS register_business_client(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER);
DROP FUNCTION IF EXISTS register_business_client(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT);

-- 2. Improved Registration Function
CREATE OR REPLACE FUNCTION register_business_client(
    p_name TEXT,
    p_slug TEXT,
    p_logo_url TEXT,
    p_email TEXT,
    p_password TEXT,
    p_instagramID TEXT,
    p_package TEXT,
    p_limit INTEGER,
    p_custom_domain TEXT DEFAULT NULL,
    p_custom_price DECIMAL DEFAULT NULL,
    p_whatsapp TEXT DEFAULT NULL
) RETURNS TEXT AS $$
DECLARE
    v_id UUID;
BEGIN
    INSERT INTO business_clients (
        business_name, 
        business_slug, 
        logo_url, 
        email, 
        password_hash, 
        instagram_id, 
        package_type, 
        frame_limit, 
        custom_domain,
        custom_package_price,
        whatsapp_number,
        is_active,
        subscription_start_date,
        activation_date,
        next_renewal_date
    ) VALUES (
        p_name, 
        p_slug, 
        p_logo_url, 
        p_email, 
        crypt(p_password, gen_salt('bf')), 
        p_instagramID, 
        p_package, 
        p_limit, 
        p_custom_domain,
        p_custom_price,
        p_whatsapp,
        true,
        NOW(),
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '28 days'
    ) RETURNING id INTO v_id;

    RETURN v_id::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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

    -- Generate slug if not present
    v_slug := lower(regexp_replace(r.business_name, '[^a-zA-Z0-9]+', '-', 'g'));
    
    -- Determine limit based on package
    IF r.package_name = '4999' THEN v_limit := 999999;
    ELSIF r.package_name = '799' THEN v_limit := 1500;
    ELSE v_limit := 600;
    END IF;

    -- Update status
    UPDATE business_registration_requests 
    SET request_status = 'approved', updated_at = NOW()
    WHERE id = p_request_id;

    -- Create business client with HASHED password
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
        whatsapp_number
    ) VALUES (
        r.business_name,
        v_slug,
        r.email,
        crypt(p_password, gen_salt('bf')), -- ✅ Properly hash the password
        r.package_name,
        v_limit,
        true,
        NOW(),
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '28 days',
        r.phone
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Fixed Verify/Login Function
CREATE OR REPLACE FUNCTION verify_business_client(
    p_email TEXT,
    p_password TEXT
) RETURNS TABLE (
    id UUID,
    business_name TEXT,
    business_slug TEXT,
    custom_domain TEXT,
    logo_url TEXT,
    email TEXT,
    instagram_id TEXT,
    package_type TEXT,
    frame_limit INTEGER,
    frames_used INTEGER,
    next_renewal_date DATE,
    is_active BOOLEAN,
    show_frames_preview BOOLEAN
) AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        b.id, b.business_name, b.business_slug, b.custom_domain, b.logo_url, b.email, b.instagram_id, 
        b.package_type, b.frame_limit, b.frames_used, b.next_renewal_date, b.is_active, b.show_frames_preview
    FROM business_clients b
    WHERE b.email = p_email 
    AND b.is_active = true
    AND b.password_hash = crypt(p_password, b.password_hash); -- ✅ Correctly verify hash
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
