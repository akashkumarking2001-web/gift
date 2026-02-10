-- Additional SQL Functions for Gift Management
-- Date: 2026-02-10

-- Function to increment gift view count
CREATE OR REPLACE FUNCTION increment_gift_views(link_id VARCHAR)
RETURNS void AS $$
BEGIN
  UPDATE gifts
  SET views_count = COALESCE(views_count, 0) + 1
  WHERE unique_link_id = link_id AND is_published = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION increment_gift_views(VARCHAR) TO anon, authenticated;

-- Function to get gift statistics for a user
CREATE OR REPLACE FUNCTION get_user_gift_stats(user_uuid UUID)
RETURNS TABLE (
  total_gifts BIGINT,
  published_gifts BIGINT,
  total_views BIGINT,
  most_viewed_gift_id UUID,
  most_viewed_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_gifts,
    COUNT(*) FILTER (WHERE is_published = true)::BIGINT as published_gifts,
    COALESCE(SUM(views_count), 0)::BIGINT as total_views,
    (SELECT id FROM gifts WHERE user_id = user_uuid ORDER BY views_count DESC LIMIT 1) as most_viewed_gift_id,
    (SELECT COALESCE(MAX(views_count), 0)::BIGINT FROM gifts WHERE user_id = user_uuid) as most_viewed_count
  FROM gifts
  WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_user_gift_stats(UUID) TO authenticated;

-- Additional functions created successfully!
-- Created: increment_gift_views() - Increments view count for a gift
-- Created: get_user_gift_stats() - Returns statistics for user gifts

