
const { createClient } = require('@supabase/supabase-js');
const s = createClient('https://sweylelsqyrcchplwtkx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZXlsZWxzcXlyY2NocGx3dGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzgzMTgsImV4cCI6MjA4NjE1NDMxOH0.4P79RVCUcNSgOxXPapyksgn8LIY356g6XsFEmRObXe4');

const q = `
-- Drop Version A (10 args, integer price)
DROP FUNCTION IF EXISTS register_business_client(text, text, text, text, text, text, text, integer, text, integer);
-- Drop Version B (11 args, numeric price)
DROP FUNCTION IF EXISTS register_business_client(text, text, text, text, text, text, text, integer, text, numeric, text);
-- Drop any other variants
DROP FUNCTION IF EXISTS register_business_client(text, text, text, text, text, text, text, integer, text, numeric);
DROP FUNCTION IF EXISTS register_business_client(text, text, text, text, text, text, text, integer, text, integer, text);

-- Create the DEFINITIVE version
CREATE OR REPLACE FUNCTION register_business_client(
    p_name text,
    p_slug text,
    p_logo_url text,
    p_email text,
    p_password text,
    p_instagramid text,
    p_package text,
    p_limit integer,
    p_custom_domain text DEFAULT NULL,
    p_custom_price numeric DEFAULT NULL,
    p_whatsapp text DEFAULT NULL
) RETURNS text AS $$
DECLARE
    v_id uuid;
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
        p_instagramid,
        p_package,
        p_limit,
        p_custom_domain,
        p_custom_price,
        p_whatsapp,
        true,
        NOW(),
        CURRENT_DATE,
        CURRENT_DATE + INTERVAL '1 year'
    ) RETURNING id INTO v_id;
    RETURN v_id::text;
END; $$ LANGUAGE plpgsql SECURITY DEFINER;
`;

async function run() {
    console.log("Running SQL update...");
    const { data, error } = await s.rpc('exec_sql', { sql_query: q });
    if (error) {
        console.error("RPC Error:", error);
        console.log("\n--- COPY AND RUN THIS IN SUPABASE SQL EDITOR ---\n");
        console.log(q);
        console.log("\n-----------------------------------------------\n");
    } else {
        console.log("Success:", data);
    }
}

run();
