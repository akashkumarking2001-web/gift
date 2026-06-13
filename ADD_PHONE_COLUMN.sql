-- Add phone_number column to ar_albums table (needed for client lookup/search)
ALTER TABLE ar_albums 
ADD COLUMN IF NOT EXISTS phone_number TEXT;
