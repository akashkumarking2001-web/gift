-- Migration: Add QR Code and Unique Link Support to Gifts Table
-- Date: 2026-02-10
-- Description: Adds fields for unique link generation and QR code storage

-- Add new columns to gifts table
ALTER TABLE gifts 
ADD COLUMN IF NOT EXISTS unique_link_id VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS gift_url TEXT,
ADD COLUMN IF NOT EXISTS qr_code_url TEXT,
ADD COLUMN IF NOT EXISTS ai_qr_code_url TEXT,
ADD COLUMN IF NOT EXISTS ai_qr_source_image TEXT,
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;

-- Create index for faster lookups by unique_link_id
CREATE INDEX IF NOT EXISTS idx_gifts_unique_link ON gifts(unique_link_id);

-- Create index for published gifts
CREATE INDEX IF NOT EXISTS idx_gifts_published ON gifts(is_published) WHERE is_published = true;

-- Create index for user's gifts
CREATE INDEX IF NOT EXISTS idx_gifts_user_published ON gifts(user_id, is_published);

-- Add comment to table
COMMENT ON COLUMN gifts.unique_link_id IS 'Unique identifier for public gift URL (e.g., abc123def456)';
COMMENT ON COLUMN gifts.gift_url IS 'Full public URL for the gift (e.g., https://domain.com/gift/abc123)';
COMMENT ON COLUMN gifts.qr_code_url IS 'URL to stored standard QR code image';
COMMENT ON COLUMN gifts.ai_qr_code_url IS 'URL to stored AI artistic QR code image';
COMMENT ON COLUMN gifts.ai_qr_source_image IS 'URL to user-uploaded image used for AI QR generation';
COMMENT ON COLUMN gifts.is_published IS 'Whether the gift has been published and is publicly accessible';
COMMENT ON COLUMN gifts.published_at IS 'Timestamp when the gift was first published';
COMMENT ON COLUMN gifts.views_count IS 'Number of times the gift has been viewed';

-- Create function to auto-update published_at timestamp
CREATE OR REPLACE FUNCTION update_published_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_published = true AND OLD.is_published = false THEN
    NEW.published_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update published_at
DROP TRIGGER IF EXISTS trigger_update_published_at ON gifts;
CREATE TRIGGER trigger_update_published_at
  BEFORE UPDATE ON gifts
  FOR EACH ROW
  EXECUTE FUNCTION update_published_at();

-- Optional: Add RLS (Row Level Security) policies for public gift viewing
-- Enable RLS on gifts table
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Public can view published gifts" ON gifts;
DROP POLICY IF EXISTS "Users can view own gifts" ON gifts;
DROP POLICY IF EXISTS "Users can update own unpublished gifts" ON gifts;
DROP POLICY IF EXISTS "Users can insert own gifts" ON gifts;
DROP POLICY IF EXISTS "Users can delete own unpublished gifts" ON gifts;

-- Policy: Anyone can view published gifts by unique_link_id
CREATE POLICY "Public can view published gifts"
  ON gifts
  FOR SELECT
  USING (is_published = true);

-- Policy: Users can view their own gifts (published or not)
CREATE POLICY "Users can view own gifts"
  ON gifts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can update their own unpublished gifts
CREATE POLICY "Users can update own unpublished gifts"
  ON gifts
  FOR UPDATE
  USING (auth.uid() = user_id AND is_published = false);

-- Policy: Users can insert their own gifts
CREATE POLICY "Users can insert own gifts"
  ON gifts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own unpublished gifts
CREATE POLICY "Users can delete own unpublished gifts"
  ON gifts
  FOR DELETE
  USING (auth.uid() = user_id AND is_published = false);

-- Create view for public gift access (optional, for cleaner queries)
-- Note: Only includes columns that exist in the gifts table
CREATE OR REPLACE VIEW public_gifts AS
SELECT 
  id,
  unique_link_id,
  gift_url,
  template_id,
  qr_code_url,
  ai_qr_code_url,
  published_at,
  views_count
FROM gifts
WHERE is_published = true;

-- Grant access to the view
GRANT SELECT ON public_gifts TO anon, authenticated;

-- Migration completed successfully!
-- Added columns: unique_link_id, gift_url, qr_code_url, ai_qr_code_url, ai_qr_source_image, is_published, published_at, views_count
-- Created indexes for faster lookups
-- Created RLS policies for secure access
-- Created public_gifts view for public access

