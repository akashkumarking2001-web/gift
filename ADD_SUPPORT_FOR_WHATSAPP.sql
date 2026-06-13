-- 🚨 RUN THIS IN SUPABASE SQL EDITOR TO ADD WHATSAPP SUPPORT 🚨

-- 1. Add whatsapp_number column to business_clients for clients profile view
ALTER TABLE business_clients 
ADD COLUMN IF NOT EXISTS whatsapp_number TEXT;

-- 2. Add admin_whatsapp column to payment_settings for upgrade redirects
ALTER TABLE payment_settings 
ADD COLUMN IF NOT EXISTS admin_whatsapp TEXT;
