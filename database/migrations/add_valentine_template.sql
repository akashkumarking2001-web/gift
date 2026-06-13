-- Insert Valentine's Day Template into Database
-- Template ID: 20
-- Name: Romantic Valentine's Journey
-- Date: 2026-02-10

-- Insert the Valentine's Day template
INSERT INTO templates (
    id,
    slug,
    title,
    category,
    price,
    original_price,
    icon,
    color,
    tag,
    is_active
) VALUES (
    20,
    'romantic-valentines-journey',
    'Romantic Valentine''s Journey',
    'Valentine''s',
    199,
    1999,
    '💖',
    'from-pink-500 via-rose-500 to-red-600',
    'Premium',
    true
)
ON CONFLICT (id) DO UPDATE SET
    slug = EXCLUDED.slug,
    title = EXCLUDED.title,
    category = EXCLUDED.category,
    price = EXCLUDED.price,
    original_price = EXCLUDED.original_price,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    tag = EXCLUDED.tag,
    is_active = EXCLUDED.is_active;

-- Verify the insert
SELECT id, slug, title, category, price, tag 
FROM templates 
WHERE id = 20;

-- ✅ Valentine's Day template added successfully!
-- Template ID: 20
-- Name: Romantic Valentine's Journey
-- Category: Valentine's
-- Price: ₹199 (Original: ₹1999)
-- Tag: Premium

