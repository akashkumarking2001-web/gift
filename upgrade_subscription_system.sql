-- 1. Add new columns for subscription and usage tracking
ALTER TABLE public.business_clients 
ADD COLUMN IF NOT EXISTS custom_package_price INTEGER DEFAULT NULL,
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS lifetime_frames_count INTEGER DEFAULT 0;

-- 2. Update registration RPC to handle custom price and default to inactive (pending)
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
    p_custom_price INTEGER DEFAULT NULL
) RETURNS TEXT AS $$
DECLARE
    v_id UUID;
BEGIN
    INSERT INTO business_clients (
        business_name, business_slug, logo_url, email, password_hash, 
        instagram_id, package_type, frame_limit, custom_domain, 
        custom_package_price, is_active, subscription_start_date
    ) VALUES (
        p_name, p_slug, p_logo_url, p_email, crypt(p_password, gen_salt('bf')), 
        p_instagramID, p_package, p_limit, p_custom_domain, 
        p_custom_price, false, NOW() -- Default to false (pending)
    ) RETURNING id INTO v_id;

    RETURN v_id::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Update verify RPC to return new fields
CREATE OR REPLACE FUNCTION verify_business_client(
    p_email TEXT,
    p_password TEXT
) RETURNS TABLE (
    id UUID,
    business_name TEXT,
    business_slug TEXT,
    logo_url TEXT,
    email TEXT,
    instagram_id TEXT,
    package_type TEXT,
    frame_limit INTEGER,
    frames_used INTEGER,
    next_renewal_date DATE,
    is_active BOOLEAN,
    show_frames_preview BOOLEAN,
    custom_domain TEXT,
    custom_package_price INTEGER,
    subscription_start_date TIMESTAMP WITH TIME ZONE,
    lifetime_frames_count INTEGER
) AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        b.id, b.business_name, b.business_slug, b.logo_url, b.email, b.instagram_id, 
        b.package_type, b.frame_limit, b.frames_used, b.next_renewal_date, b.is_active, 
        b.show_frames_preview, b.custom_domain, b.custom_package_price, 
        b.subscription_start_date, b.lifetime_frames_count
    FROM business_clients b
    WHERE b.email = p_email AND b.password_hash = crypt(p_password, b.password_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Create Activation/Renewal RPC that starts the 28-day timer
CREATE OR REPLACE FUNCTION renew_business_subscription(p_client_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE business_clients 
    SET subscription_start_date = NOW(),
        is_active = true,
        next_renewal_date = (CURRENT_DATE + 
            CASE 
                WHEN package_type = 'enterprise' OR package_type = '4999' THEN INTERVAL '100 years'
                WHEN package_type = 'pro' OR package_type = '799' THEN INTERVAL '365 days'
                ELSE INTERVAL '28 days' 
            END
        )::DATE
    WHERE id = p_client_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Create Lifetime incrementer
CREATE OR REPLACE FUNCTION increment_lifetime_usage(p_client_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE business_clients 
    SET lifetime_frames_count = lifetime_frames_count + 1
    WHERE id = p_client_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
