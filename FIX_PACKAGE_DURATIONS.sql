-- SQL Migration: Fix Package Durations and Update Existing Clients
-- This ensures that the 799 package is correctly treated as a 365-day (yearly) plan.

-- 0. DROP old functions first to avoid "cannot change return type" errors
DROP FUNCTION IF EXISTS approve_business_request(UUID, TEXT);
DROP FUNCTION IF EXISTS register_business_client(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER, TEXT, DECIMAL, TEXT);

-- 1. Update register_business_client to use dynamic duration
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
    v_validity INTERVAL;
BEGIN
    -- Set validity based on package
    v_validity := CASE 
        WHEN p_package = '4999' OR p_package = 'enterprise' THEN INTERVAL '100 years'
        WHEN p_package = '799' OR p_package = 'pro' THEN INTERVAL '365 days'
        ELSE INTERVAL '28 days'
    END;

    INSERT INTO business_clients (
        business_name, business_slug, logo_url, email, password_hash, 
        instagram_id, package_type, frame_limit, custom_domain,
        custom_package_price, whatsapp_number, is_active,
        subscription_start_date, activation_date, next_renewal_date
    ) VALUES (
        p_name, p_slug, p_logo_url, p_email, crypt(p_password, gen_salt('bf')), 
        p_instagramID, p_package, p_limit, p_custom_domain,
        p_custom_price, p_whatsapp, true, NOW(), CURRENT_DATE, (CURRENT_DATE + v_validity)::DATE
    ) RETURNING id INTO v_id;

    RETURN v_id::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Update approve_business_request to use dynamic duration
CREATE OR REPLACE FUNCTION approve_business_request(p_request_id UUID, p_password TEXT)
RETURNS VOID AS $$
DECLARE
    r RECORD;
    v_slug TEXT;
    v_limit INTEGER;
    v_validity INTERVAL;
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

    -- Determine validity based on package
    v_validity := CASE 
        WHEN r.package_name = '4999' OR r.package_name = 'enterprise' THEN INTERVAL '100 years'
        WHEN r.package_name = '799' OR r.package_name = 'pro' THEN INTERVAL '365 days'
        ELSE INTERVAL '28 days'
    END;

    -- Update status
    UPDATE business_registration_requests 
    SET request_status = 'approved', updated_at = NOW()
    WHERE id = p_request_id;

    -- Create business client
    INSERT INTO business_clients (
        business_name, business_slug, email, password_hash, 
        package_type, frame_limit, is_active, 
        subscription_start_date, activation_date, next_renewal_date, 
        whatsapp_number
    ) VALUES (
        r.business_name, v_slug, r.email, crypt(p_password, gen_salt('bf')), 
        r.package_name, v_limit, true, NOW(), CURRENT_DATE, (CURRENT_DATE + v_validity)::DATE, 
        r.phone
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Fix existing 799 clients who were incorrectly given 28 days
-- We find clients on the 799/pro package whose renewal date was set 28-30 days after activation
UPDATE business_clients 
SET next_renewal_date = (activation_date::DATE + INTERVAL '365 days')::DATE
WHERE (package_type = '799' OR package_type = 'pro') 
AND next_renewal_date <= (activation_date::DATE + INTERVAL '30 days');

-- 4. Verify the correction
SELECT business_name, package_type, activation_date, next_renewal_date 
FROM business_clients 
WHERE package_type = '799';
