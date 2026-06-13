-- Business System Tables Migration
-- Run this in your Supabase SQL Editor

-- 1. Payment Settings Table
CREATE TABLE IF NOT EXISTS payment_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    upi_id TEXT NOT NULL DEFAULT '',
    qr_code_url TEXT DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Payment Settings
ALTER TABLE payment_settings ENABLE ROW LEVEL SECURITY;

-- Insert initial record if not exists
INSERT INTO payment_settings (id, upi_id, qr_code_url)
VALUES ('00000000-0000-0000-0000-000000000001', 'your-upi-id@okicici', '')
ON CONFLICT (id) DO NOTHING;

-- 2. Business Clients Table
CREATE TABLE IF NOT EXISTS business_clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name TEXT NOT NULL,
    business_slug TEXT UNIQUE NOT NULL,
    logo_url TEXT DEFAULT '',
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL, -- Admin sets this, salt/hash securely or use logic
    instagram_id TEXT DEFAULT '',
    package_type TEXT NOT NULL CHECK (package_type IN ('299', '799', '4999')),
    frame_limit INTEGER NOT NULL DEFAULT 600,
    frames_used INTEGER NOT NULL DEFAULT 0,
    activation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    next_renewal_date DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '1 month'),
    is_active BOOLEAN NOT NULL DEFAULT true,
    show_frames_preview BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Business Clients
ALTER TABLE business_clients ENABLE ROW LEVEL SECURITY;

-- 3. Upgrade Requests Table
CREATE TABLE IF NOT EXISTS upgrade_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES business_clients(id) ON DELETE CASCADE,
    current_package TEXT NOT NULL,
    requested_package TEXT NOT NULL CHECK (requested_package IN ('299', '799', '4999')),
    transaction_number TEXT NOT NULL DEFAULT '',
    screenshot_url TEXT DEFAULT '',
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for Upgrade Requests
ALTER TABLE upgrade_requests ENABLE ROW LEVEL SECURITY;

--- RLS POLICIES ---

-- Policies for payment_settings
CREATE POLICY "Public can view payment settings" 
ON payment_settings FOR SELECT 
USING (true);

-- Admin full access to payment_settings
CREATE POLICY "Admin full access to payment_settings" 
ON payment_settings FOR ALL 
USING (auth.jwt() ->> 'email' IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com'));

-- Policies for business_clients
CREATE POLICY "Public can view client details by slug" 
ON business_clients FOR SELECT 
USING (true); -- Public needs to see logo, name, show_frames_preview on landing

-- Admin full access to business_clients
CREATE POLICY "Admin full access to business_clients" 
ON business_clients FOR ALL 
USING (auth.jwt() ->> 'email' IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com'));

-- Policies for upgrade_requests
CREATE POLICY "Client can view own upgrade requests" 
ON upgrade_requests FOR SELECT 
USING (auth.uid() = client_id); -- Wait, client auth requires a strategy if they don't use supabase users!

-- ADMIN full access to upgrade_requests
CREATE POLICY "Admin full access to upgrade_requests" 
ON upgrade_requests FOR ALL 
USING (auth.jwt() ->> 'email' IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com'));


-- RPC procedures for Secure Creation & Login (Bypass manual Node hashing)
CREATE OR REPLACE FUNCTION register_business_client(
    p_name TEXT,
    p_slug TEXT,
    p_logo_url TEXT,
    p_email TEXT,
    p_password TEXT,
    p_instagramID TEXT,
    p_package TEXT,
    p_limit INTEGER
) RETURNS TEXT AS $$
DECLARE
    v_id UUID;
BEGIN
    INSERT INTO business_clients (
        business_name, business_slug, logo_url, email, password_hash, instagram_id, package_type, frame_limit
    ) VALUES (
        p_name, p_slug, p_logo_url, p_email, crypt(p_password, gen_salt('bf')), p_instagramID, p_package, p_limit
    ) RETURNING id INTO v_id;

    RETURN v_id::TEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


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
    show_frames_preview BOOLEAN
) AS $$
BEGIN
    RETURN QUERY 
    SELECT 
        b.id, b.business_name, b.business_slug, b.logo_url, b.email, b.instagram_id, 
        b.package_type, b.frame_limit, b.frames_used, b.next_renewal_date, b.is_active, b.show_frames_preview
    FROM business_clients b
    WHERE b.email = p_email AND b.password_hash = crypt(p_password, b.password_hash);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
