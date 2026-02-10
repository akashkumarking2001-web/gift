# Database Setup Guide

## Overview
This guide covers the database migrations needed for the QR Code and Gift Management features.

---

## 📋 Migrations to Run

### 1. **Add QR Code Support** (Required)
**File**: `database/migrations/add_qr_code_support.sql`

**What it does**:
- Adds columns to `gifts` table for unique links and QR codes
- Creates indexes for faster lookups
- Sets up Row Level Security (RLS) policies
- Creates `public_gifts` view for public access
- Adds trigger to auto-update `published_at` timestamp

**Run this migration**:
```bash
# Using Supabase CLI
supabase db push

# Or manually in Supabase SQL Editor
# Copy and paste the contents of add_qr_code_support.sql
```

### 2. **Add Gift Functions** (Required)
**File**: `database/migrations/add_gift_functions.sql`

**What it does**:
- Creates `increment_gift_views()` function
- Creates `get_user_gift_stats()` function
- Grants necessary permissions

**Run this migration**:
```bash
# Using Supabase CLI
supabase db push

# Or manually in Supabase SQL Editor
# Copy and paste the contents of add_gift_functions.sql
```

---

## 🗄️ Database Schema

### Updated `gifts` Table

```sql
gifts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  template_id INTEGER NOT NULL,
  customization_data JSONB NOT NULL,
  
  -- New columns for QR code feature
  unique_link_id VARCHAR(255) UNIQUE,      -- e.g., "abc123def456"
  gift_url TEXT,                           -- e.g., "https://domain.com/gift/abc123"
  qr_code_url TEXT,                        -- URL to stored standard QR code
  ai_qr_code_url TEXT,                     -- URL to stored AI QR code
  ai_qr_source_image TEXT,                 -- URL to user's uploaded image
  is_published BOOLEAN DEFAULT false,      -- Whether gift is public
  published_at TIMESTAMP,                  -- When gift was published
  views_count INTEGER DEFAULT 0,           -- Number of views
  
  created_at TIMESTAMP DEFAULT NOW()
)
```

### Indexes Created

```sql
-- Fast lookup by unique link ID
CREATE INDEX idx_gifts_unique_link ON gifts(unique_link_id);

-- Fast lookup of published gifts
CREATE INDEX idx_gifts_published ON gifts(is_published) WHERE is_published = true;

-- Fast lookup of user's published gifts
CREATE INDEX idx_gifts_user_published ON gifts(user_id, is_published);
```

---

## 🔒 Row Level Security (RLS) Policies

### Public Access
```sql
-- Anyone can view published gifts
CREATE POLICY "Public can view published gifts"
  ON gifts FOR SELECT
  USING (is_published = true);
```

### User Access
```sql
-- Users can view their own gifts
CREATE POLICY "Users can view own gifts"
  ON gifts FOR SELECT
  USING (auth.uid() = user_id);

-- Users can update their own unpublished gifts
CREATE POLICY "Users can update own unpublished gifts"
  ON gifts FOR UPDATE
  USING (auth.uid() = user_id AND is_published = false);

-- Users can insert their own gifts
CREATE POLICY "Users can insert own gifts"
  ON gifts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own unpublished gifts
CREATE POLICY "Users can delete own unpublished gifts"
  ON gifts FOR DELETE
  USING (auth.uid() = user_id AND is_published = false);
```

---

## 📊 Database Functions

### 1. `increment_gift_views(link_id VARCHAR)`
Increments the view count for a gift.

**Usage**:
```sql
SELECT increment_gift_views('abc123def456');
```

**Called automatically** when someone views a gift via `GiftService.getGiftByLinkId()`.

### 2. `get_user_gift_stats(user_uuid UUID)`
Returns statistics for a user's gifts.

**Usage**:
```sql
SELECT * FROM get_user_gift_stats('user-uuid-here');
```

**Returns**:
- `total_gifts` - Total number of gifts created
- `published_gifts` - Number of published gifts
- `total_views` - Total views across all gifts
- `most_viewed_gift_id` - ID of most viewed gift
- `most_viewed_count` - View count of most viewed gift

---

## 🗂️ Storage Buckets

### Create QR Code Storage Bucket

Run this in Supabase SQL Editor:

```sql
-- Create storage bucket for QR codes
INSERT INTO storage.buckets (id, name, public)
VALUES ('qr-codes', 'qr-codes', true)
ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for qr-codes bucket
CREATE POLICY "Public can view QR codes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'qr-codes');

CREATE POLICY "Authenticated users can upload QR codes"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'qr-codes' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own QR codes"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'qr-codes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own QR codes"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'qr-codes' AND auth.uid()::text = (storage.foldername(name))[1]);
```

---

## 🔧 Using the Database Service

### Import the Service

```typescript
import GiftService from '@/lib/giftService';
```

### Create a Gift

```typescript
const result = await GiftService.createGift(
  userId,
  20, // template_id (Valentine's template)
  {
    greeting: 'Hey Cutiepie',
    // ... other customization data
  }
);

if (result.success) {
  console.log('Gift created:', result.giftId);
}
```

### Publish a Gift

```typescript
const result = await GiftService.publishGift(giftId);

if (result.success) {
  console.log('Gift URL:', result.giftUrl);
  console.log('Unique ID:', result.uniqueId);
  // Show share modal with result.giftUrl
}
```

### Get Gift by Link (Public View)

```typescript
const gift = await GiftService.getGiftByLinkId('abc123def456');

if (gift) {
  // Display the gift
  console.log('Template ID:', gift.template_id);
  console.log('Customization:', gift.customization_data);
  console.log('Views:', gift.views_count);
}
```

### Save QR Codes

```typescript
// Generate QR codes first
const standardQR = await QRCodeService.generateQRCode(giftUrl);
const aiQR = await AIQRCodeService.generateAIQRCode(...);

// Upload to storage
const qrResult = await GiftService.uploadQRCodeImage(
  standardQR,
  `${userId}/${uniqueId}_standard.png`
);

const aiQrResult = await GiftService.uploadQRCodeImage(
  aiQR,
  `${userId}/${uniqueId}_ai.png`
);

// Save URLs to database
await GiftService.saveQRCodes(
  giftId,
  qrResult.url,
  aiQrResult.url,
  sourceImageUrl
);
```

---

## ✅ Verification Checklist

After running migrations, verify:

- [ ] `gifts` table has new columns
- [ ] Indexes are created
- [ ] RLS policies are active
- [ ] `public_gifts` view exists
- [ ] Functions are created
- [ ] `qr-codes` storage bucket exists
- [ ] Storage policies are set

### Verification Queries

```sql
-- Check if columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'gifts' 
AND column_name IN ('unique_link_id', 'gift_url', 'qr_code_url');

-- Check if indexes exist
SELECT indexname 
FROM pg_indexes 
WHERE tablename = 'gifts' 
AND indexname LIKE 'idx_gifts_%';

-- Check if functions exist
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_name IN ('increment_gift_views', 'get_user_gift_stats');

-- Check if view exists
SELECT table_name 
FROM information_schema.views 
WHERE table_name = 'public_gifts';
```

---

## 🐛 Troubleshooting

### Migration Fails
- Ensure you have admin access to the database
- Check if columns already exist
- Run migrations one at a time

### RLS Policies Not Working
- Verify RLS is enabled: `ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;`
- Check policy names don't conflict
- Test with different user roles

### Storage Bucket Issues
- Ensure bucket is created in Supabase dashboard
- Verify bucket is set to public
- Check storage policies are active

---

## 📚 Additional Resources

- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
- [PostgreSQL Functions](https://www.postgresql.org/docs/current/sql-createfunction.html)

---

**Database setup complete!** 🎉

All migrations are ready to run. Execute them in order and verify each step.
