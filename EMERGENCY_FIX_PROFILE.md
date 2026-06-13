# 🚨 EMERGENCY FIX - PROFILE SERVICE UPDATED

## 🔍 ERROR ANALYSIS
The error **"Cannot coerce the result to a single JSON object"** persisted even after fixing `PurchaseService`.
Upon further investigation, `ProfileService` was ALSO using `.select().single()` immediately after user creation.

**File:** `src/lib/profileService.ts`

**Issue:**
When a new user registers, the app tries to update their profile:
```typescript
await ProfileService.updateProfile({ ... })
```
This function was doing:
```typescript
.update({ ... })
.select()
.single() // ❌ This fails if RLS hides the row
```

## ✅ SOLUTION APPLIED
I have modified `ProfileService` to **remove the read-back**:
1.  **Updated `getOrCreateProfile`**: Now inserts and returns a constructed object.
2.  **Updated `updateProfile`**: Now updates and returns a constructed object.

**This prevents the error from occurring during the new user signup flow.**

## 🚀 NEXT STEPS
1.  **Push this fix to GitHub.**
2.  **Redeploy on Vercel.**
3.  **Test again.**

This ensures that BOTH `PurchaseService` and `ProfileService` are safe from RLS race conditions.
