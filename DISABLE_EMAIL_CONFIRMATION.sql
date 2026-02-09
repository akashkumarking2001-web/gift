-- Disable email confirmation for instant user registration
-- Run this in Supabase SQL Editor OR update in Dashboard > Authentication > Settings

-- Note: This is typically configured in the Supabase Dashboard, not via SQL
-- Go to: Dashboard > Authentication > Email Auth > Confirm email = OFF

-- However, if you want to allow users to sign up without email confirmation,
-- you can also update the auth.users table to mark them as confirmed immediately.

-- For existing unconfirmed users, you can run:
-- UPDATE auth.users SET email_confirmed_at = NOW() WHERE email_confirmed_at IS NULL;

-- IMPORTANT: For production, you should:
-- 1. Go to Supabase Dashboard
-- 2. Navigate to Authentication > Providers > Email
-- 3. Disable "Confirm email" option
-- 4. This allows instant user registration without email verification

SELECT 'Please disable email confirmation in Supabase Dashboard > Authentication > Providers > Email' as instruction;
