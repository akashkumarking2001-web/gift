-- 1. Add username column to ar_albums
ALTER TABLE ar_albums 
ADD COLUMN IF NOT EXISTS username TEXT;

-- 2. Add Unique constraint
ALTER TABLE ar_albums
ADD CONSTRAINT ar_albums_username_unique UNIQUE (username);

-- 3. Update existing albums to have a default description or just let them be NULL for now.
-- Postgres allows multiple NULLs in unique constraints, so this is safe.
