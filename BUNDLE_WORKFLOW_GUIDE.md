# Bundle Purchase & Admin Approval Workflow - Implementation Guide

## Overview
This guide explains the complete bundle purchase workflow implementation, from database setup to admin approval and template unlocking.

---

## 🗄️ Database Setup

### Step 1: Run the Migration Script
Execute the SQL migration script in your Supabase SQL Editor:

**File**: `database_migrations/bundle_purchase_workflow.sql`

This creates:
- ✅ `bundle_templates` table - Stores bundle configurations
- ✅ `user_template_access` table - Tracks locked/unlocked templates
- ✅ Updates to `user_purchases` table - Adds bundle-related columns
- ✅ RLS policies for security
- ✅ Trigger for auto-unlocking templates on approval
- ✅ Helper views for easier querying

### Step 2: Verify Tables Created
```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('bundle_templates', 'user_template_access');

-- Check bundle data
SELECT * FROM bundle_templates WHERE is_active = TRUE;
```

---

## 📦 Bundle Purchase Flow

### User Journey

#### 1. **User Selects Bundle**
- User browses available bundles on the landing page
- Clicks "Get Bundle Now" button
- Redirected to checkout with bundle information

#### 2. **User Completes Purchase**
```typescript
// In Checkout.tsx
import { PurchaseService } from '../lib/purchaseService';

const handleBundlePurchase = async () => {
  try {
    const purchase = await PurchaseService.createBundlePurchase({
      bundle_id: 'valentines',
      bundle_name: "Valentine's Special Bundle",
      amount_paid: 199,
      transaction_id: userTransactionId,
      payment_screenshot_url: uploadedScreenshotUrl,
    });
    
    // Purchase created with status: 'pending'
    // Templates created in user_template_access with is_locked: true
  } catch (error) {
    console.error('Bundle purchase failed:', error);
  }
};
```

#### 3. **User Sees Locked Templates**
After purchase request is sent:
- User dashboard shows all templates from the bundle
- Each template displays a 🔒 lock icon
- Status shows "Pending Admin Approval"
- User cannot customize locked templates

---

### Admin Journey

#### 1. **Admin Sees Bundle Purchase Request**
In Admin Dashboard → Purchase Approvals tab:

```typescript
// Purchase record shows:
{
  template_title: "Valentine's Special Bundle",
  is_bundle: true,
  bundle_id: "valentines",
  template_ids: ["romantic-valentines-journey-v2", "love-question-v1", "5-things-love"],
  status: "pending"
}
```

**Enhanced Admin UI** should display:
- Bundle name with badge "BUNDLE"
- Expandable list showing all included templates
- Template count (e.g., "3 Templates")
- Lock status for each template

#### 2. **Admin Approves Bundle**
```typescript
// In AdminDashboard.tsx
const handleApproveBundlePurchase = async (purchaseId: string) => {
  try {
    // 1. Approve the purchase
    await PurchaseService.approvePurchase(purchaseId);
    
    // 2. Unlock all templates (triggered automatically by database trigger)
    // OR manually call:
    await PurchaseService.unlockBundleTemplates(purchaseId);
    
    toast({ 
      title: "Success", 
      description: "Bundle approved! All templates unlocked for user." 
    });
  } catch (error) {
    console.error('Approval failed:', error);
  }
};
```

#### 3. **Templates Auto-Unlock**
When admin approves:
1. Purchase status changes to `approved`
2. Database trigger fires: `unlock_bundle_templates()`
3. All `user_template_access` records for this purchase update:
   - `is_locked` → `false`
   - `unlocked_at` → current timestamp
4. User can now customize all templates

---

## 🎨 UI/UX Implementation

### User Dashboard Enhancement

```tsx
// UserDashboard.tsx
import { PurchaseService } from '../lib/purchaseService';
import { Lock, Unlock } from 'lucide-react';

const UserDashboard = () => {
  const [lockedTemplates, setLockedTemplates] = useState([]);
  const [unlockedTemplates, setUnlockedTemplates] = useState([]);

  useEffect(() => {
    const fetchTemplateAccess = async () => {
      const locked = await PurchaseService.getUserLockedTemplates();
      const unlocked = await PurchaseService.getUserUnlockedTemplates();
      setLockedTemplates(locked);
      setUnlockedTemplates(unlocked);
    };
    fetchTemplateAccess();
  }, []);

  return (
    <div>
      {/* Locked Templates Section */}
      <section>
        <h3>Pending Approval</h3>
        {lockedTemplates.map(template => (
          <div key={template.id} className="template-card locked">
            <Lock className="lock-icon" />
            <h4>{template.template_id}</h4>
            <span className="status">Awaiting Admin Approval</span>
          </div>
        ))}
      </section>

      {/* Unlocked Templates Section */}
      <section>
        <h3>Ready to Customize</h3>
        {unlockedTemplates.map(template => (
          <div key={template.id} className="template-card unlocked">
            <Unlock className="unlock-icon" />
            <h4>{template.template_id}</h4>
            <button onClick={() => navigate(`/editor/${template.template_id}`)}>
              Customize Now
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};
```

### Admin Dashboard Enhancement

```tsx
// AdminDashboard.tsx - Enhanced Bundle Display
const BundlePurchaseRow = ({ purchase }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr>
        <td>
          <div className="flex items-center gap-2">
            {purchase.template_title}
            {purchase.is_bundle && (
              <span className="badge badge-bundle">BUNDLE</span>
            )}
          </div>
        </td>
        <td>
          {purchase.is_bundle && (
            <button 
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-primary"
            >
              {expanded ? 'Hide' : 'Show'} Templates ({purchase.template_ids?.length || 0})
            </button>
          )}
        </td>
        {/* ... other columns ... */}
      </tr>
      
      {/* Expanded Template List */}
      {expanded && purchase.is_bundle && (
        <tr>
          <td colSpan={8}>
            <div className="template-list">
              <h5>Included Templates:</h5>
              <ul>
                {purchase.template_ids?.map(templateId => (
                  <li key={templateId}>
                    <span className="template-name">{templateId}</span>
                    <span className="status">🔒 Locked</span>
                  </li>
                ))}
              </ul>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
```

---

## 🔧 API Functions Reference

### PurchaseService Functions

#### Bundle Configuration
```typescript
// Get bundle details
const bundle = await PurchaseService.getBundleConfiguration('valentines');
// Returns: BundleTemplate with template_ids, price, etc.

// Get all active bundles
const bundles = await PurchaseService.getAllBundles();
// Returns: BundleTemplate[]
```

#### Bundle Purchase
```typescript
// Create bundle purchase
const purchase = await PurchaseService.createBundlePurchase({
  bundle_id: 'valentines',
  bundle_name: "Valentine's Special Bundle",
  amount_paid: 199,
  transaction_id: 'TXN123456',
  payment_screenshot_url: 'https://...',
});
// Creates purchase + locked template access records
```

#### Template Access
```typescript
// Check if user has access to specific template
const hasAccess = await PurchaseService.hasTemplateAccess('romantic-valentines-journey-v2');
// Returns: boolean

// Get user's locked templates
const locked = await PurchaseService.getUserLockedTemplates();
// Returns: UserTemplateAccess[]

// Get user's unlocked templates
const unlocked = await PurchaseService.getUserUnlockedTemplates();
// Returns: UserTemplateAccess[]
```

#### Admin Functions
```typescript
// Approve purchase (auto-unlocks if bundle)
await PurchaseService.approvePurchase(purchaseId);

// Manually unlock bundle templates
await PurchaseService.unlockBundleTemplates(purchaseId);
```

---

## 🔐 Security & Permissions

### Row Level Security (RLS)

**Bundle Templates**:
- ✅ Public can view active bundles
- ✅ Only admins can create/update/delete bundles

**User Template Access**:
- ✅ Users can only view their own access records
- ✅ System can create access records on purchase
- ✅ Only admins can update (unlock) templates

**Purchases**:
- ✅ Users can create their own purchases
- ✅ Users can view their own purchases
- ✅ Only admins can approve/reject purchases

---

## 🧪 Testing Checklist

### Database Tests
- [ ] Bundle templates table created successfully
- [ ] User template access table created successfully
- [ ] Trigger `unlock_bundle_templates` exists
- [ ] RLS policies are active
- [ ] Sample bundle data inserted

### Purchase Flow Tests
- [ ] User can create bundle purchase
- [ ] Purchase creates locked template access records
- [ ] Purchase shows in admin dashboard with bundle badge
- [ ] Admin can see all templates in bundle
- [ ] Admin can approve bundle purchase
- [ ] Templates auto-unlock on approval
- [ ] User sees unlocked templates in dashboard

### Edge Cases
- [ ] Bundle with invalid template IDs
- [ ] Duplicate purchase attempts
- [ ] Approval of non-bundle purchase
- [ ] Network failure during purchase creation
- [ ] Partial template unlock (some succeed, some fail)

---

## 🐛 Troubleshooting

### Issue: Templates not unlocking after approval
**Check**:
1. Verify trigger exists: `SELECT * FROM pg_trigger WHERE tgname = 'trigger_unlock_bundle_templates';`
2. Check trigger function: `SELECT prosrc FROM pg_proc WHERE proname = 'unlock_bundle_templates';`
3. Manually unlock: `await PurchaseService.unlockBundleTemplates(purchaseId);`

### Issue: Bundle purchase fails
**Check**:
1. Bundle configuration exists: `SELECT * FROM bundle_templates WHERE bundle_id = 'valentines';`
2. User is authenticated: `const { data: { user } } = await supabase.auth.getUser();`
3. Check console for error messages
4. Verify RLS policies allow insert

### Issue: User can't see locked templates
**Check**:
1. Template access records created: `SELECT * FROM user_template_access WHERE user_id = '...';`
2. RLS policy allows user to view own records
3. Dashboard is fetching locked templates correctly

---

## 📊 Database Queries for Monitoring

### Get bundle purchase statistics
```sql
SELECT 
  bundle_id,
  COUNT(*) as total_purchases,
  SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
  SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
  SUM(amount_paid) as total_revenue
FROM user_purchases
WHERE is_bundle = TRUE
GROUP BY bundle_id;
```

### Get user's template access summary
```sql
SELECT 
  u.email,
  COUNT(*) as total_templates,
  SUM(CASE WHEN is_locked = FALSE THEN 1 ELSE 0 END) as unlocked,
  SUM(CASE WHEN is_locked = TRUE THEN 1 ELSE 0 END) as locked
FROM user_template_access uta
JOIN auth.users u ON uta.user_id = u.id
GROUP BY u.email
ORDER BY total_templates DESC;
```

### Get pending bundle approvals
```sql
SELECT 
  up.id,
  up.user_email,
  up.template_title as bundle_name,
  up.template_ids,
  array_length(up.template_ids, 1) as template_count,
  up.amount_paid,
  up.purchased_at
FROM user_purchases up
WHERE up.is_bundle = TRUE 
  AND up.status = 'pending'
ORDER BY up.purchased_at DESC;
```

---

## 🚀 Next Steps

1. **Run Database Migration** ✅
   - Execute `bundle_purchase_workflow.sql` in Supabase

2. **Update Checkout Page**
   - Detect bundle purchases
   - Call `createBundlePurchase()` instead of `createPurchase()`

3. **Update Admin Dashboard**
   - Show bundle badge and template list
   - Implement expandable bundle details
   - Test approval workflow

4. **Update User Dashboard**
   - Display locked templates with lock icon
   - Display unlocked templates with customize button
   - Show approval status

5. **Testing**
   - Test complete flow end-to-end
   - Verify auto-unlock trigger works
   - Test edge cases

---

**Status**: ✅ Database & Service Layer Complete
**Next**: Update UI Components (Admin & User Dashboards)
**Date**: 2026-02-12
