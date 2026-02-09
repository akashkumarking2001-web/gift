-- Create Test User Account
-- Run this in Supabase SQL Editor

-- Test User Credentials:
-- Email: user@test.com
-- Password: User@2026

-- Step 1: Delete existing test user if exists (to avoid conflicts)
DELETE FROM auth.users WHERE email = 'user@test.com';

-- Step 2: Create test user in auth.users
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
  'user@test.com',
  crypt('User@2026', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"full_name":"Test User"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Step 3: Create identity for the test user
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
WHERE email = 'user@test.com';

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
  'Test User',
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'user@test.com';

-- Verify the account was created
SELECT 
  'Test user account created successfully!' as status,
  email,
  email_confirmed_at,
  created_at
FROM auth.users
WHERE email = 'user@test.com';
