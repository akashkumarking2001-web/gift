-- Recommended additions for Cashfree integration
ALTER TABLE public.user_purchases 
ADD COLUMN IF NOT EXISTS cf_order_id TEXT,
ADD COLUMN IF NOT EXISTS cf_session_id TEXT,
ADD COLUMN IF NOT EXISTS payment_gateway_status TEXT;

-- Index for quick lookup during webhooks
CREATE INDEX IF NOT EXISTS idx_user_purchases_cf_order_id ON public.user_purchases(cf_order_id);
