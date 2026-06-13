-- Migration: Dynamic Pricing, Packages, and Cashfree Integration
-- Run this in Supabase SQL Editor

-- 1. Create app_settings table for global configurations
CREATE TABLE IF NOT EXISTS public.app_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default album creation price
INSERT INTO public.app_settings (key, value, description)
VALUES (
    'album_pricing', 
    '{"price": 149, "currency": "INR", "original_mrp": 499}', 
    'Pricing config for individual magic album creation'
)
ON CONFLICT (key) DO NOTHING;

-- 2. Create business_packages table for dynamic vendor packages
CREATE TABLE IF NOT EXISTS public.business_packages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    price NUMERIC NOT NULL,
    frame_limit INTEGER NOT NULL,
    features TEXT[] DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default packages
INSERT INTO public.business_packages (name, slug, price, frame_limit, features)
VALUES 
('Starter', 'starter', 299, 600, ARRAY['600 Magic Frames', 'Basic AR Engine', 'Standard Support']),
('Professional', 'pro', 799, 1500, ARRAY['1500 Magic Frames', 'Premium AR Engine', 'Priority Support', 'Custom Branding']),
('Enterprise', 'enterprise', 4999, 9999, ARRAY['Unlimited Albums', 'Custom AR Workflow', 'Dedicated Manager', 'API Access'])
ON CONFLICT (slug) DO NOTHING;

-- 3. Create cashfree_settings table (Securely managed on backend or via restricted RLS)
CREATE TABLE IF NOT EXISTS public.cashfree_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    app_id TEXT NOT NULL,
    secret_key TEXT NOT NULL,
    mode TEXT NOT NULL DEFAULT 'sandbox', -- sandbox or production
    is_active BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Update business_clients to remove hardcoded package constraints
ALTER TABLE public.business_clients DROP CONSTRAINT IF EXISTS business_clients_package_type_check;
-- Note: We'll keep package_type as TEXT but it will now link to package slug or be descriptive.

-- 5. Update upgrade_requests to remove hardcoded package constraints
ALTER TABLE public.upgrade_requests DROP CONSTRAINT IF EXISTS upgrade_requests_requested_package_check;

-- 6. Add subscription_start_date and status to business_clients for better tracking
ALTER TABLE public.business_clients 
ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'active',
ADD COLUMN IF NOT EXISTS subscription_plan_id UUID REFERENCES public.business_packages(id);

-- 7. Add RLS Policies
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cashfree_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read app_settings" ON public.app_settings FOR SELECT USING (true);
CREATE POLICY "Public read business_packages" ON public.business_packages FOR SELECT USING (true);
-- Cashfree settings should NOT be public
CREATE POLICY "Admin only cashfree_settings" ON public.cashfree_settings FOR ALL 
USING (auth.jwt() ->> 'email' IN ('admin@giftmagic.com', 'akashkumarking2001@gmail.com'));

-- 9. Create business_registration_requests table
CREATE TABLE IF NOT EXISTS public.business_registration_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    business_name TEXT NOT NULL,
    business_slug TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    package_name TEXT NOT NULL,
    package_price NUMERIC NOT NULL,
    payment_status TEXT DEFAULT 'pending',
    payment_details TEXT,
    cf_order_id TEXT,
    request_status TEXT DEFAULT 'pending' CHECK (request_status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.business_registration_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert registration requests" ON public.business_registration_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin view registration requests" ON public.business_registration_requests FOR SELECT 
USING (auth.jwt() ->> 'email' IN ('admin@giftmagic.com', 'akashkumarking2001@gmail.com'));

-- 10. Update approve_business_request RPC to handle subdomains and all fields
-- 10. Manual Approve Function (Keep as fallback)
CREATE OR REPLACE FUNCTION approve_business_request(p_request_id UUID, p_password TEXT)
RETURNS VOID AS $$
DECLARE
    r RECORD;
BEGIN
    SELECT * INTO r FROM business_registration_requests WHERE id = p_request_id;
    
    IF r.id IS NULL THEN
        RAISE EXCEPTION 'Request not found';
    END IF;

    -- Update request status
    UPDATE business_registration_requests 
    SET request_status = 'approved'
    WHERE id = p_request_id;

    -- Create business client
    INSERT INTO business_clients (
        business_name,
        business_slug,
        email,
        password_hash,
        package_type,
        is_active,
        subscription_start_date,
        next_renewal_date,
        frame_limit
    ) VALUES (
        r.business_name,
        r.business_slug,
        r.email,
        crypt(p_password, gen_salt('bf')),
        r.package_name,
        true,
        NOW(),
        (CURRENT_DATE + 
            CASE 
                WHEN r.package_name = 'enterprise' OR r.package_name = '4999' THEN INTERVAL '100 years'
                WHEN r.package_name = 'pro' OR r.package_name = '799' THEN INTERVAL '365 days'
                ELSE INTERVAL '28 days' 
            END
        )::DATE,
        CASE 
            WHEN r.package_name = 'pro' OR r.package_name = '799' THEN 1500 
            WHEN r.package_name = 'enterprise' OR r.package_name = '4999' THEN 999999 
            ELSE 600 
        END
    );
END;
$$ LANGUAGE plpgsql;

-- 11. AUTOMATED ACTIVATION SYSTEM
-- This function activates services immediately upon payment status changing to 'paid'
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
    -- This requires a default password or a separate way to set it if we bypass manual approval
    -- For now, we'll auto-approve the request. The client creation still needs a password.
    -- We'll rely on the app to call a 'complete_onboarding' RPC after payment.
    IF TG_TABLE_NAME = 'business_registration_requests' THEN
        IF NEW.payment_status = 'paid' AND (OLD.payment_status IS NULL OR OLD.payment_status != 'paid') THEN
            NEW.request_status := 'approved';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_ar_album_payment_activation ON public.ar_albums;
CREATE TRIGGER trigger_ar_album_payment_activation
BEFORE UPDATE ON public.ar_albums
FOR EACH ROW EXECUTE FUNCTION handle_payment_activation();

DROP TRIGGER IF EXISTS trigger_business_request_payment_activation ON public.business_registration_requests;
CREATE TRIGGER trigger_business_request_payment_activation
BEFORE UPDATE ON public.business_registration_requests
FOR EACH ROW EXECUTE FUNCTION handle_payment_activation();

-- 11. Enable real-time for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE app_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE business_packages;
ALTER PUBLICATION supabase_realtime ADD TABLE business_clients;
ALTER PUBLICATION supabase_realtime ADD TABLE business_registration_requests;
