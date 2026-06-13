-- Function to automatically approve/activate a business registration request
CREATE OR REPLACE FUNCTION approve_business_request(p_request_id UUID, p_password TEXT DEFAULT NULL)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_req RECORD;
    v_limit INTEGER;
    v_client_id UUID;
    v_pwd TEXT;
BEGIN
    -- 1. Get request details
    SELECT * INTO v_req FROM business_registration_requests WHERE id = p_request_id;
    
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'message', 'Request not found');
    END IF;

    v_pwd := COALESCE(p_password, v_req.password_plain, 'Gift@123');

    -- 2. Determine frame limit based on package
    IF v_req.package_price = 299 THEN v_limit := 600;
    ELSIF v_req.package_price = 799 THEN v_limit := 1500;
    ELSIF v_req.package_price = 4999 THEN v_limit := 999999;
    ELSE v_limit := 600; -- Default
    END IF;

    -- 3. Create or update business_client
    INSERT INTO business_clients (
        business_name,
        business_slug,
        logo_url,
        email,
        password_hash,
        instagram_id,
        whatsapp_number,
        package_type,
        frame_limit,
        is_active,
        activation_date,
        next_renewal_date,
        custom_domain,
        subscription_status
    )
    VALUES (
        v_req.business_name,
        COALESCE(v_req.business_slug, LOWER(regexp_replace(v_req.business_name, '[^a-zA-Z0-9]', '', 'g'))),
        v_req.logo_url,
        v_req.email,
        v_pwd,
        v_req.instagram_id,
        v_req.whatsapp_number,
        v_req.package_price::TEXT,
        v_limit,
        true,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP + INTERVAL '1 year',
        v_req.custom_domain,
        'active'
    )
    ON CONFLICT (email) DO UPDATE SET
        is_active = true,
        frame_limit = v_limit,
        package_type = v_req.package_price::TEXT,
        subscription_status = 'active',
        activation_date = CURRENT_TIMESTAMP,
        password_hash = v_pwd
    RETURNING id INTO v_client_id;

    -- 4. Update request status
    UPDATE business_registration_requests 
    SET status = 'approved', updated_at = CURRENT_TIMESTAMP 
    WHERE id = p_request_id;

    RETURN jsonb_build_object(
        'success', true, 
        'client_id', v_client_id,
        'business_slug', COALESCE(v_req.business_slug, LOWER(regexp_replace(v_req.business_name, '[^a-zA-Z0-9]', '', 'g')))
    );
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'message', SQLERRM);
END;
$$;

-- Function to handle personal activation via Order ID
CREATE OR REPLACE FUNCTION activate_personal_album(_order_id TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    UPDATE ar_albums
    SET approval_status = 'approved',
        payment_status = 'paid',
        is_active = true,
        approved_at = CURRENT_TIMESTAMP
    WHERE cf_order_id = _order_id;
END;
$$;
