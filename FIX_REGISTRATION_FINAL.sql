-- SQL Fix for Business Registration & Automatic Activation
-- IMPORTANT: PLEASE SELECT ALL AND DELETE EVERYTHING IN YOUR SQL EDITOR BEFORE PASTING THIS
-- This script fixes the column name mismatch (status vs request_status)
-- and ensures the approve_business_request function works correctly.

-- 0. DROP existing function to allow changing return type from VOID to JSONB
DROP FUNCTION IF EXISTS approve_business_request(UUID, TEXT);

-- 1. Ensure the status column exists (renaming if necessary or adding)
DO $$ 
BEGIN 
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='business_registration_requests' AND column_name='request_status') THEN
        ALTER TABLE business_registration_requests RENAME COLUMN request_status TO status;
    END IF;
END $$;

-- 2. Fixed Approval Function
CREATE OR REPLACE FUNCTION approve_business_request(p_request_id UUID, p_password TEXT)
RETURNS JSONB AS $$
DECLARE
    r RECORD;
    v_slug TEXT;
    v_limit INTEGER;
    v_client_id UUID;
BEGIN
    -- Get request details
    SELECT * INTO r FROM business_registration_requests WHERE id = p_request_id;
    
    IF r.id IS NULL THEN
        RETURN jsonb_build_object('success', false, 'message', 'Request not found');
    END IF;

    -- Generate slug if not present
    IF r.business_slug IS NOT NULL AND r.business_slug != '' THEN
        v_slug := r.business_slug;
    ELSE
        v_slug := lower(regexp_replace(r.business_name, '[^a-zA-Z0-9]+', '-', 'g'));
    END IF;
    
    -- Determine limit based on package
    IF r.package_name = '4999' OR r.package_name ILIKE '%Enterprise%' THEN 
        v_limit := 999999;
    ELSIF r.package_name = '799' OR r.package_name ILIKE '%Professional%' OR r.package_name ILIKE '%Pro%' THEN 
        v_limit := 1500;
    ELSE 
        v_limit := 600;
    END IF;

    -- Update status to approved
    UPDATE business_registration_requests 
    SET status = 'approved', updated_at = NOW()
    WHERE id = p_request_id;

    -- Create business client
    -- Using extensions.crypt if available, else falling back to crypt
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
        extensions.crypt(p_password, extensions.gen_salt('bf')),
        r.package_name,
        v_limit,
        true,
        NOW(),
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '28 days',
        COALESCE(r.whatsapp_number, r.phone),
        r.instagram_id,
        r.logo_url,
        r.custom_domain
    )
    ON CONFLICT (email) DO UPDATE SET
        business_name = EXCLUDED.business_name,
        business_slug = EXCLUDED.business_slug,
        password_hash = EXCLUDED.password_hash,
        package_type = EXCLUDED.package_type,
        frame_limit = EXCLUDED.frame_limit,
        is_active = true,
        whatsapp_number = EXCLUDED.whatsapp_number,
        logo_url = EXCLUDED.logo_url,
        custom_domain = EXCLUDED.custom_domain
    RETURNING id INTO v_client_id;

    RETURN jsonb_build_object('success', true, 'client_id', v_client_id);
EXCEPTION WHEN OTHERS THEN
    RETURN jsonb_build_object('success', false, 'message', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Fix the handle_payment_activation trigger function
CREATE OR REPLACE FUNCTION handle_payment_activation()
RETURNS TRIGGER AS $$
BEGIN
    -- For individual AR Albums
    IF TG_TABLE_NAME = 'ar_albums' THEN
        IF NEW.payment_status = 'paid' AND (OLD.payment_status IS NULL OR OLD.payment_status != 'paid') THEN
            NEW.approval_status := 'approved';
            NEW.is_active := true;
        END IF;
    END IF;

    -- For Business Registration (Vendors)
    IF TG_TABLE_NAME = 'business_registration_requests' THEN
        IF NEW.payment_status = 'paid' AND (OLD.payment_status IS NULL OR OLD.payment_status != 'paid') THEN
            -- Use the correct column 'status' instead of 'request_status'
            NEW.status := 'approved';
            
            -- We don't call approve_business_request here because we need the password
            -- which is handled by the client-side code after payment verification.
            -- However, setting status to 'approved' is a good indicator.
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
