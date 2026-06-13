# Database Updates Required 📊

## ✅ What Needs to Be Updated

You need to run **3 SQL scripts** in your Supabase database:

---

## 1️⃣ **QR Code Support** (ALREADY DONE ✅)

**File**: `database/migrations/add_qr_code_support.sql`

**Status**: ✅ **Successfully installed**

**What it added**:
- 8 new columns to `gifts` table
- 3 indexes for performance
- 5 RLS policies for security
- 1 public view
- 1 auto-trigger

---

## 2️⃣ **Gift Functions** (ALREADY DONE ✅)

**File**: `database/migrations/add_gift_functions.sql`

**Status**: ✅ **Successfully installed**

**What it added**:
- `increment_gift_views()` function
- `get_user_gift_stats()` function
- Proper permissions

---

## 3️⃣ **Valentine's Template** (NEW - NEEDS TO BE RUN)

**File**: `database/migrations/add_valentine_template.sql`

**Status**: ⏳ **Needs to be run**

**What it will add**:
- Valentine's Day template to `templates` table
- Template ID: 20
- Name: **"Romantic Valentine's Journey"**
- Category: Valentine's
- Price: ₹199 (Original: ₹1999)
- Tag: Premium

### How to Run:

1. **Open Supabase Dashboard** → SQL Editor
2. **Copy the contents** of `database/migrations/add_valentine_template.sql`
3. **Paste and Execute**
4. **Verify**: You should see the template in your templates table

---

## 📋 Valentine's Template Details

### Template Information
- **ID**: 20
- **Slug**: `romantic-valentines-journey`
- **Name**: **Romantic Valentine's Journey**
- **Category**: Valentine's
- **Price**: ₹199
- **Original Price**: ₹1999
- **Discount**: 90% OFF
- **Icon**: 💖
- **Color**: Pink to Rose to Red gradient
- **Tag**: Premium
- **Status**: Active

### Template Features
- **5 Interactive Pages**:
  1. Greeting (Polaroid card with floating hearts)
  2. Why You? (4 heart-shaped flip cards)
  3. Memories (Photo gallery, 5-10 images)
  4. Question (Interactive shrinking button)
  5. Final Message (Love letter with confetti)

- **Customization Fields**: 17 text fields + 13+ images
- **Animations**: 30+ unique animations
- **Mobile**: Fully responsive

---

## 🗄️ Database Schema Check

Make sure your `templates` table has these columns:

```sql
-- Required columns
id                INTEGER PRIMARY KEY
slug              TEXT UNIQUE
title             TEXT
category          TEXT
price             INTEGER
original_price    INTEGER
icon              TEXT
color             TEXT
tag               TEXT
is_active         BOOLEAN
created_at        TIMESTAMP
updated_at        TIMESTAMP

-- Optional media columns (if you added them)
thumbnail_url     TEXT
cover_image_url   TEXT
demo_video_url    TEXT
preview_images    TEXT[]
```

If any columns are missing, the insert will fail. Let me know and I'll create an ALTER TABLE script.

---

## ✅ Verification Steps

After running the Valentine's template script:

### 1. Check if template exists:
```sql
SELECT id, slug, title, category, price, tag 
FROM templates 
WHERE id = 20;
```

**Expected result**:
```
id: 20
slug: romantic-valentines-journey
title: Romantic Valentine's Journey
category: Valentine's
price: 199
tag: Premium
```

### 2. Check if it's active:
```sql
SELECT id, title, is_active 
FROM templates 
WHERE id = 20;
```

**Expected result**:
```
id: 20
title: Romantic Valentine's Journey
is_active: true
```

### 3. View in your app:
- Start dev server: `npm run dev`
- Navigate to templates gallery
- Look for "Romantic Valentine's Journey" with 💖 icon

---

## 🎯 Summary

### Already Done ✅
- ✅ QR Code Support migration
- ✅ Gift Functions migration
- ✅ Database is ready for QR codes and sharing

### To Do ⏳
- ⏳ Run Valentine's template migration
- ⏳ Verify template appears in database
- ⏳ Test template in your app

---

## 📝 Quick Command

**Run this in Supabase SQL Editor**:

```sql
-- Copy and paste the entire contents of:
-- database/migrations/add_valentine_template.sql
```

---

## 🎉 After Running

Once you run the Valentine's template migration, you'll have:

✅ **20 templates total** (including the new Valentine's template)  
✅ **Full QR code functionality**  
✅ **Complete sharing system**  
✅ **All database functions working**  

---

## ❓ Need Help?

If you encounter any errors:

1. **Column doesn't exist**: Let me know which column, I'll create an ALTER TABLE script
2. **Template already exists**: The script uses `ON CONFLICT DO UPDATE`, so it's safe to re-run
3. **Permission denied**: Make sure you're running as database owner

---

**Created**: February 10, 2026  
**Status**: Ready to run  
**Estimated Time**: < 1 minute
