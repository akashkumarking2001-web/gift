-- 1. Add phone_number column to ar_albums
ALTER TABLE ar_albums 
ADD COLUMN IF NOT EXISTS phone_number TEXT;

-- 2. Index for faster search
CREATE INDEX IF NOT EXISTS idx_ar_albums_phone_number ON ar_albums (phone_number);
