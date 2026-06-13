-- Create Permanent Admin Account
-- Run this in Supabase SQL Editor

-- Admin Credentials:
-- Email: admin@giftmagic.com
-- Password: Admin@2026

-- Step 1: Delete existing admin user if exists (to avoid conflicts)
DELETE FROM auth.users WHERE email = 'admin@giftmagic.com';

-- Step 2: Create admin user in auth.users
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@giftmagic.com',
  crypt('Admin@2026', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Admin User","role":"admin"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Step 3: Create identity for the admin user
INSERT INTO auth.identities (
  provider_id,
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT 
  id::text,
  gen_random_uuid(),
  id,
  format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
  'email',
  NOW(),
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'admin@giftmagic.com';

-- Step 4: Create user profile
INSERT INTO public.user_profiles (
  id,
  email,
  full_name,
  created_at,
  updated_at
)
SELECT 
  id,
  email,
  'Admin User',
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'admin@giftmagic.com';

-- Verify the account was created
SELECT 
  'Admin account created successfully!' as status,
  email,
  email_confirmed_at,
  created_at
FROM auth.users
WHERE email = 'admin@giftmagic.com';
