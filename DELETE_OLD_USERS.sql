-- Delete the manually created users (they might be corrupted)
DELETE FROM auth.users WHERE email IN ('admin@giftmagic.com', 'user@giftmagic.com');

-- Also clean up any related auth data
DELETE FROM auth.identities WHERE email IN ('admin@giftmagic.com', 'user@giftmagic.com');

SELECT 'Old users deleted. Now use the /setup page to create accounts properly.' as status;
