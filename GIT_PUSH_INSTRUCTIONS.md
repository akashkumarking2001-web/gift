# Git Push Instructions

## Step 1: Initialize Git (if not already done)
```bash
cd d:\ethereal-canvas-main\ethereal-canvas-main
git init
```

## Step 2: Add Remote Repository
```bash
git remote add origin https://github.com/akashkumarking2001-web/gift.git
```

## Step 3: Add All Changes
```bash
git add .
```

## Step 4: Commit Changes
```bash
git commit -m "Fix: Critical bugs - submission error, order summary, branding, user registration

- Fixed submission error by removing .select() from purchase creation
- Fixed order summary to show correct template/bundle names
- Fixed template ID bug in admin panel
- Implemented user registration during checkout
- Added purchase history tabs (Pending/Approved/Rejected)
- Updated branding to 'Gift Magic' across all pages
- Fixed empty email field for new users
"
```

## Step 5: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

## If Repository Already Exists:
```bash
cd d:\ethereal-canvas-main\ethereal-canvas-main
git add .
git commit -m "Fix: Critical bugs and improvements"
git push origin main
```

## Quick One-Liner (Run in PowerShell):
```powershell
cd d:\ethereal-canvas-main\ethereal-canvas-main; git add .; git commit -m "Fix: Critical bugs - submission, order summary, branding"; git push origin main
```

---

## Files Changed:
- src/lib/purchaseService.ts
- src/pages/Checkout.tsx
- src/pages/Login.tsx
- src/pages/Dashboard.tsx
- src/pages/AdminDashboard.tsx
- src/components/landing/Navbar.tsx
- Multiple documentation files (.md)
