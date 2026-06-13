-- Fix Corrupted Supabase Auth Users
-- Run this entire script in the Supabase SQL Editor

-- 1. Delete corrupted users
DELETE FROM auth.users WHERE email IN ('admin@giftmagic.com', 'user@giftmagic.com');

-- 2. Clean up any orphaned identities just in case
DELETE FROM auth.identities WHERE id IN (
  SELECT id FROM auth.identities WHERE identity_data->>'email' IN ('admin@giftmagic.com', 'user@giftmagic.com')
);

-- ==========================================
-- 3. Perfectly Recreate Admin User
-- ==========================================
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
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Admin User","role":"admin"}'::jsonb,
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Recreate Admin Identity
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

-- Recreate Admin Profile
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
WHERE email = 'admin@giftmagic.com'
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

-- ==========================================
-- 4. Perfectly Recreate Regular User
-- ==========================================
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
  'user@giftmagic.com',
  crypt('User@123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  '{"full_name":"Regular User","role":"user"}'::jsonb,
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Recreate Regular User Identity
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
WHERE email = 'user@giftmagic.com';

-- Recreate Regular User Profile
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
  'Regular User',
  NOW(),
  NOW()
FROM auth.users
WHERE email = 'user@giftmagic.com'
ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

-- Verify
SELECT 'Fixed Users Created successfully!' as status, email, id FROM auth.users WHERE email IN ('admin@giftmagic.com', 'user@giftmagic.com');
