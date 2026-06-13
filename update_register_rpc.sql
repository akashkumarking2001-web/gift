-- SQL Migration: Update Business System RPCs for Custom Domain Support
-- Run this in your Supabase SQL Editor

-- 1. Drop existing functions to re-create with new signature
DROP FUNCTION IF EXISTS register_business_client(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, INTEGER);
DROP FUNCTION IF EXISTS verify_business_client(TEXT, TEXT);

-- 2. New Register function with p_custom_domain
CREATE OR REPLACE FUNCTION register_business_client(
    p_name TEXT,
    p_slug TEXT,
    p_logo_url TEXT,
    p_email TEXT,
    p_password TEXT,
    p_instagramID TEXT,
    p_package TEXT,
    p_limit INTEGER,
    p_custom_domain TEXT DEFAULT NULL
) RETURNS TEXT AS $$
DECLARE
    v_id UUID;
BEGIN
    INSERT INTO business_clients (
        business_name, business_slug, logo_url, email, password_hash, instagram_id, package_type, frame_limit, custom_domain
    ) VALUES (
        p_name, p_slug, p_logo_url, p_email, crypt(p_password, gen_salt('bf')), p_instagramID, p_package, p_limit, p_custom_domain
    ) RETURNING id INTO v_id;

    RETURN v_id::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. New Verify function returning custom_domain
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
    WHERE b.email = p_email AND b.password_hash = crypt(p_password, b.password_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
