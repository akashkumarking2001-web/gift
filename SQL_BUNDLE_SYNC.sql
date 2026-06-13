-- Update Bundle Prices & Names according to latest technical requirements
-- 1. Valentine's Day Bundle -> ₹99
-- 2. All Assets Bundle -> ₹399

-- First ensure the All Assets Bundle is correctly named
UPDATE bundle_templates 
SET 
  bundle_name = 'All Assets Bundle',
  price = 399.00,
  updated_at = NOW()
WHERE bundle_id = 'all-access';

-- If it doesn't exist, insert it (though it should exist from previous migration)
INSERT INTO bundle_templates (bundle_id, bundle_name, template_ids, price, original_price, description, is_active)
SELECT 'all-access', 'All Assets Bundle', ARRAY['*'], 399.00, 9999.00, 'Unlimited access to all current and future templates', TRUE
WHERE NOT EXISTS (SELECT 1 FROM bundle_templates WHERE bundle_id = 'all-access');

-- Update Valentine's Day Bundle price
UPDATE bundle_templates 
SET 
  price = 99.00,
  updated_at = NOW()
WHERE bundle_id = 'valentines';

-- Note: Pricing updates for existing user_purchases are not applied retroactively.
-- Future purchases will use these new prices.
