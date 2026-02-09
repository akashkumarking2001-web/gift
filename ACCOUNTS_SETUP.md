# 🔐 Admin & User Account Setup

## Permanent Admin Account

### Credentials:
```
Email:    admin@giftmagic.com
Password: Admin@2026
```

### How to Create:
1. Go to your Supabase Dashboard
2. Click on "SQL Editor"
3. Copy and paste the contents of `CREATE_ADMIN_ACCOUNT.sql`
4. Click "Run"
5. You should see: "Admin account created successfully!"

### Login:
- **Admin Panel**: `http://localhost:8081/admin/login`
- **Admin Dashboard**: `http://localhost:8081/admin`

---

## Test User Account

### Credentials:
```
Email:    user@test.com
Password: User@2026
```

### How to Create:
1. Go to your Supabase Dashboard
2. Click on "SQL Editor"
3. Copy and paste the contents of `CREATE_TEST_USER.sql`
4. Click "Run"
5. You should see: "Test user account created successfully!"

### Login:
- **User Login**: `http://localhost:8081/login`
- **User Dashboard**: `http://localhost:8081/dashboard`

---

## 🚀 Quick Setup (All-in-One)

Run these scripts in order in Supabase SQL Editor:

1. **`COMPLETE_SCHEMA.sql`** - Creates all tables (if not done yet)
2. **`CREATE_ADMIN_ACCOUNT.sql`** - Creates admin account
3. **`CREATE_TEST_USER.sql`** - Creates test user account

---

## 🧪 Testing the Complete Workflow

### Step 1: Login as Test User
1. Go to `http://localhost:8081/login`
2. Login with `user@test.com` / `User@2026`
3. You'll see the Dashboard

### Step 2: Browse Templates
1. Click on "More Templates" section
2. You'll see templates with:
   - MRP (strikethrough price)
   - Discounted price
   - Discount % badge
   - 24-hour countdown timer
   - "Limited Offer" badge

### Step 3: Purchase a Template
1. Click "Buy Now" on any template
2. Fill in checkout details
3. Upload payment screenshot
4. Submit purchase

### Step 4: See Locked Template
1. Go back to Dashboard
2. You'll see the template in "My Templates" section
3. It will show as **LOCKED** with:
   - Lock icon (animated)
   - "Template Locked" message
   - "Available within 2 hours" badge

### Step 5: Login as Admin
1. Open new incognito/private window
2. Go to `http://localhost:8081/admin/login`
3. Login with `admin@giftmagic.com` / `Admin@2026`

### Step 6: Approve Purchase
1. Click "Purchase Approvals" tab (you'll see a badge with count)
2. You'll see the pending purchase
3. Click the green checkmark to **Approve**
4. Status changes to "Approved"

### Step 7: Template Unlocks
1. Go back to user dashboard (refresh if needed)
2. The template is now **UNLOCKED**
3. "Customize Now" button appears
4. User can now use the template!

---

## 🔧 Troubleshooting

### "Email already exists" error:
If you see this error, the account already exists. You can either:
- Use the existing account
- Delete the old account first:
```sql
DELETE FROM auth.users WHERE email = 'admin@giftmagic.com';
```

### Can't login:
1. Make sure email confirmations are disabled in Supabase:
   - Go to Authentication → Settings
   - Disable "Enable email confirmations"
2. Or run this to confirm emails:
```sql
UPDATE auth.users 
SET email_confirmed_at = NOW() 
WHERE email IN ('admin@giftmagic.com', 'user@test.com');
```

### Admin panel shows "Access Denied":
The authentication check is temporarily bypassed. Just go directly to:
`http://localhost:8081/admin`

---

## 📝 Account Summary

| Account Type | Email | Password | Dashboard URL |
|-------------|-------|----------|---------------|
| **Admin** | admin@giftmagic.com | Admin@2026 | /admin |
| **Test User** | user@test.com | User@2026 | /dashboard |

---

## 🎯 What Each Account Can Do

### Admin Account:
- ✅ View all purchases
- ✅ Approve/reject purchases
- ✅ Manage templates
- ✅ View revenue stats
- ✅ Access admin panel

### Test User Account:
- ✅ Browse templates
- ✅ Purchase templates
- ✅ See locked/unlocked templates
- ✅ Customize approved templates
- ✅ View purchase history

---

**All accounts are permanent and will persist in your Supabase database!** 🎉
