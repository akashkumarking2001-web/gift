-- Create Supabase Auth users with passwords
-- Minimal version - only essential columns

-- First, delete existing users if they exist
DELETE FROM auth.users WHERE email IN ('admin@giftmagic.com', 'user@giftmagic.com');

-- Insert admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@giftmagic.com',
  crypt('Admin@123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  ''
);

-- Insert regular user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'user@giftmagic.com',
  crypt('User@123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '',
  ''
);

-- Verify users were created
SELECT 
  id,
  email,
  email_confirmed_at,
  created_at
FROM auth.users
WHERE email IN ('admin@giftmagic.com', 'user@giftmagic.com')
ORDER BY email;
