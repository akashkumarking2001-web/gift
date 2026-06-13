-- Table for business registration requests
CREATE TABLE IF NOT EXISTS business_registration_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name TEXT NOT NULL,
    contact_person TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    package_name TEXT NOT NULL,
    package_price DECIMAL(10, 2),
    payment_status TEXT DEFAULT 'pending', -- 'pending', 'completed'
    payment_details TEXT, -- Transaction ID or other info
    request_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE business_registration_requests ENABLE ROW LEVEL SECURITY;

-- Allow public to insert requests
CREATE POLICY "Allow public insert" ON business_registration_requests
    FOR INSERT WITH CHECK (true);

-- Allow admins to view/manage
CREATE POLICY "Allow admin manage" ON business_registration_requests
    FOR ALL USING (true); -- Simplified for now, should be scoped to admin users later

-- Function to approve a request and create a business client
CREATE OR REPLACE FUNCTION approve_business_request(p_request_id UUID, p_password_hash TEXT)
RETURNS VOID AS $$
DECLARE
    r RECORD;
BEGIN
    -- Get request details
    SELECT * INTO r FROM business_registration_requests WHERE id = p_request_id;
    
    IF r.id IS NULL THEN
        RAISE EXCEPTION 'Request not found';
    END IF;

    -- Update status
    UPDATE business_registration_requests 
    SET request_status = 'approved', updated_at = NOW()
    WHERE id = p_request_id;

    -- Create business client (assuming business_clients table structure)
    INSERT INTO business_clients (
        business_name,
        contact_person,
        email,
        password_hash,
        package_name,
        is_active,
        subscription_start_date
    ) VALUES (
        r.business_name,
        r.contact_person,
        r.email,
        p_password_hash,
        r.package_name,
        true,
        NOW()
    );
END;
$$ LANGUAGE plpgsql;
