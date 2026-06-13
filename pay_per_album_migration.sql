-- Update ar_albums for new workflow
ALTER TABLE ar_albums ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'paid'; -- Defaulting to paid for existing ones
ALTER TABLE ar_albums ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'approved'; -- Defaulting to approved for existing ones

-- Change defaults for NEW records
ALTER TABLE ar_albums ALTER COLUMN payment_status SET DEFAULT 'pending';
ALTER TABLE ar_albums ALTER COLUMN approval_status SET DEFAULT 'pending';

-- Add global price to ar_master_config if not exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='ar_master_config' AND column_name='price_per_album') THEN
        ALTER TABLE ar_master_config ADD COLUMN price_per_album DECIMAL(10,2) DEFAULT 99.00;
    END IF;
END $$;

-- Update ar_master_config with a default if table exists and row 1 exists
UPDATE ar_master_config SET price_per_album = 99.00 WHERE id = 1 AND price_per_album IS NULL;
