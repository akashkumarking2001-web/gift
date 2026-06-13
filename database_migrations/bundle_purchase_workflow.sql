-- Bundle Purchase & Admin Approval Workflow - Database Migration
-- Run this SQL in your Supabase SQL Editor

-- ============================================================================
-- 1. CREATE BUNDLE TEMPLATES TABLE
-- ============================================================================
-- This table stores bundle configurations (which templates are in each bundle)
CREATE TABLE IF NOT EXISTS bundle_templates (
  id SERIAL PRIMARY KEY,
  bundle_id VARCHAR(50) UNIQUE NOT NULL,
  bundle_name VARCHAR(255) NOT NULL,
  template_ids TEXT[] NOT NULL, -- Array of template slugs/IDs
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_bundle_templates_bundle_id ON bundle_templates(bundle_id);
CREATE INDEX IF NOT EXISTS idx_bundle_templates_is_active ON bundle_templates(is_active);

-- ============================================================================
-- 2. UPDATE PURCHASES TABLE
-- ============================================================================
-- Add bundle-related columns to existing user_purchases table
ALTER TABLE user_purchases 
ADD COLUMN IF NOT EXISTS bundle_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS template_ids TEXT[], -- Templates included in bundle
ADD COLUMN IF NOT EXISTS is_bundle BOOLEAN DEFAULT FALSE;

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_purchases_bundle_id ON user_purchases(bundle_id);
CREATE INDEX IF NOT EXISTS idx_user_purchases_is_bundle ON user_purchases(is_bundle);

-- ============================================================================
-- 3. CREATE USER TEMPLATE ACCESS TABLE
-- ============================================================================
-- This table tracks which templates users have access to (locked/unlocked)
CREATE TABLE IF NOT EXISTS user_template_access (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL, -- Template slug or ID
  purchase_id UUID REFERENCES user_purchases(id) ON DELETE CASCADE,
  is_locked BOOLEAN DEFAULT TRUE,
  unlocked_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, template_id, purchase_id) -- Prevent duplicate entries
);

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_template_access_user_id ON user_template_access(user_id);
CREATE INDEX IF NOT EXISTS idx_user_template_access_template_id ON user_template_access(template_id);
CREATE INDEX IF NOT EXISTS idx_user_template_access_purchase_id ON user_template_access(purchase_id);
CREATE INDEX IF NOT EXISTS idx_user_template_access_is_locked ON user_template_access(is_locked);
CREATE INDEX IF NOT EXISTS idx_user_template_access_user_template ON user_template_access(user_id, template_id);

-- ============================================================================
-- 4. INSERT DEFAULT BUNDLE CONFIGURATIONS
-- ============================================================================
-- Valentine's Bundle
INSERT INTO bundle_templates (bundle_id, bundle_name, template_ids, price, original_price, description, is_active)
VALUES (
  'valentines',
  'Valentine''s Special Bundle',
  ARRAY['romantic-valentines-journey-v2', 'love-question-v1', '5-things-love'],
  199.00,
  2499.00,
  'Get 3 premium Valentine templates at a special price',
  TRUE
)
ON CONFLICT (bundle_id) DO UPDATE SET
  bundle_name = EXCLUDED.bundle_name,
  template_ids = EXCLUDED.template_ids,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  description = EXCLUDED.description,
  updated_at = NOW();

-- All Access Bundle (if you want to add it)
INSERT INTO bundle_templates (bundle_id, bundle_name, template_ids, price, original_price, description, is_active)
VALUES (
  'all-access',
  'All Access Pass',
  ARRAY['*'], -- '*' means all templates
  999.00,
  9999.00,
  'Unlimited access to all current and future templates',
  TRUE
)
ON CONFLICT (bundle_id) DO UPDATE SET
  bundle_name = EXCLUDED.bundle_name,
  template_ids = EXCLUDED.template_ids,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  description = EXCLUDED.description,
  updated_at = NOW();

-- ============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE bundle_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_template_access ENABLE ROW LEVEL SECURITY;

-- Bundle Templates: Public read access (everyone can see available bundles)
DROP POLICY IF EXISTS "Public can view active bundles" ON bundle_templates;
CREATE POLICY "Public can view active bundles"
  ON bundle_templates FOR SELECT
  USING (is_active = TRUE);

-- Bundle Templates: Admin write access
DROP POLICY IF EXISTS "Admins can manage bundles" ON bundle_templates;
CREATE POLICY "Admins can manage bundles"
  ON bundle_templates FOR ALL
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE email IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com')
      OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    )
  );

-- User Template Access: Users can view their own access
DROP POLICY IF EXISTS "Users can view their own template access" ON user_template_access;
CREATE POLICY "Users can view their own template access"
  ON user_template_access FOR SELECT
  USING (auth.uid() = user_id);

-- User Template Access: System can insert (for purchase creation)
DROP POLICY IF EXISTS "System can create template access" ON user_template_access;
CREATE POLICY "System can create template access"
  ON user_template_access FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User Template Access: Admins can update (for unlocking)
DROP POLICY IF EXISTS "Admins can update template access" ON user_template_access;
CREATE POLICY "Admins can update template access"
  ON user_template_access FOR UPDATE
  USING (
    auth.uid() IN (
      SELECT id FROM auth.users 
      WHERE email IN ('admin@giftmagic.com', 'gdchgcxhj@gmail.com', 'akashkumarking2001@gmail.com')
      OR (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    )
  );

-- ============================================================================
-- 6. HELPER FUNCTIONS
-- ============================================================================

-- Function to automatically unlock templates when purchase is approved
CREATE OR REPLACE FUNCTION unlock_purchase_templates()
RETURNS TRIGGER AS $$
BEGIN
  -- Only proceed if status changed to 'approved' and OLD status wasn't approved
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved') THEN
    -- Unlock all templates associated with this purchase
    UPDATE user_template_access
    SET 
      is_locked = FALSE,
      unlocked_at = NOW(),
      updated_at = NOW()
    WHERE 
      purchase_id = NEW.id
      AND user_id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-unlock templates on approval
DROP TRIGGER IF EXISTS trigger_unlock_bundle_templates ON user_purchases;
DROP TRIGGER IF EXISTS trigger_unlock_purchase_templates ON user_purchases;
CREATE TRIGGER trigger_unlock_purchase_templates
  AFTER UPDATE ON user_purchases
  FOR EACH ROW
  EXECUTE FUNCTION unlock_purchase_templates();

-- ============================================================================
-- 7. UTILITY VIEWS (Optional - for easier querying)
-- ============================================================================

-- View to see all user template access with purchase details
CREATE OR REPLACE VIEW user_template_access_detailed AS
SELECT 
  uta.id,
  uta.user_id,
  u.email as user_email,
  uta.template_id,
  uta.is_locked,
  uta.unlocked_at,
  up.template_title,
  up.bundle_id,
  up.is_bundle,
  up.status as purchase_status,
  up.purchased_at,
  up.approved_at,
  uta.created_at
FROM user_template_access uta
LEFT JOIN user_purchases up ON uta.purchase_id = up.id
LEFT JOIN auth.users u ON uta.user_id = u.id;

-- ============================================================================
-- 8. SAMPLE QUERIES (for testing)
-- ============================================================================

-- Get all bundles
-- SELECT * FROM bundle_templates WHERE is_active = TRUE;

-- Get user's template access
-- SELECT * FROM user_template_access WHERE user_id = 'your-user-id';

-- Get user's unlocked templates
-- SELECT template_id FROM user_template_access 
-- WHERE user_id = 'your-user-id' AND is_locked = FALSE;

-- Get bundle details with template count
-- SELECT 
--   bundle_id, 
--   bundle_name, 
--   array_length(template_ids, 1) as template_count,
--   price,
--   original_price
-- FROM bundle_templates 
-- WHERE is_active = TRUE;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- Next steps:
-- 1. Update purchaseService.ts to use these new tables
-- 2. Update AdminDashboard.tsx to show bundle details
-- 3. Update UserDashboard.tsx to show locked/unlocked templates
-- ============================================================================
