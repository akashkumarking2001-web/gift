# IMPLEMENTATION PLAN: Website Fixes & Improvements

## Priority 1: Critical Bugs (Immediate Fix)

### 1.1 Branding & Logo Issues
- [ ] Update all pages to use "Gift Magic" (not "GiftMagic", "Giftly", etc.)
- [ ] Add logo above text on Login page
- [ ] Fix logo visibility in header (add fallback, ensure proper path)
- [ ] Update Admin Dashboard branding

### 1.2 Checkout Flow Critical Bugs
- [ ] Remove pre-filled email on checkout (should be empty for new users)
- [ ] Fix payment submission error
- [ ] Fix template ID not being captured correctly
- [ ] Ensure actual user data is sent to admin panel (not first setup user)

### 1.3 Order Summary Bug
- [ ] Fix template title always showing "Birthday Countdown Celebration"
- [ ] Ensure correct template ID/name is passed through checkout flow
- [ ] Update admin panel to show correct template for each request

## Priority 2: User Registration & Authentication

### 2.1 New User Checkout Flow
- [ ] Create combined registration + checkout page for new users
- [ ] Collect: Name, Email, Mobile, Password, Confirm Password
- [ ] Auto-create user account on purchase
- [ ] Show these details in admin panel

### 2.2 Existing User Flow
- [ ] Skip registration fields if user is logged in
- [ ] Auto-fill name, email, mobile from profile
- [ ] Only ask for transaction details

## Priority 3: Admin Panel Improvements

### 3.1 Purchase History
- [ ] Add "History" tab in admin panel
- [ ] Show all approved/rejected purchases
- [ ] Add filters by status, date, user

## Priority 4: Typography & Design Consistency

### 4.1 Font Standardization
- [ ] Audit all pages for font consistency
- [ ] Remove any all-caps font styles
- [ ] Use consistent font family across site

## Priority 5: Template Customization (Based on Project Details)

### 5.1 Editor Fixes
- [ ] Fix Preview button functionality
- [ ] Fix Mobile/PC view toggle (currently stuck on mobile)
- [ ] Implement page-by-page editor per template specs

### 5.2 Template Structure
- [ ] Review Project Details documentation
- [ ] Implement exact page structure for each template
- [ ] Map fields per template specification

## Files to Modify

1. **Branding:**
   - src/components/landing/Navbar.tsx
   - src/components/landing/Footer.tsx
   - src/pages/Login.tsx
   - src/pages/Dashboard.tsx
   - src/pages/AdminDashboard.tsx
   - src/pages/Checkout.tsx

2. **Checkout Flow:**
   - src/pages/Checkout.tsx
   - src/lib/purchaseService.ts
   - src/lib/profileService.ts (create if needed)

3. **Admin Panel:**
   - src/pages/AdminDashboard.tsx

4. **Editor:**
   - src/pages/Editor.tsx
   - Create new components for template-specific editors

## Implementation Order

1. Fix branding (30 min)
2. Fix checkout template ID bug (20 min)
3. Implement user registration in checkout (1 hour)
4. Add purchase history to admin (30 min)
5. Fix typography issues (20 min)
6. Fix editor preview & view toggle (1 hour)
7. Implement template-specific editors (3-4 hours)
