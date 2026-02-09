# 🚨 CRITICAL FIX REQUIRED: Database Table Missing

The error **"Failed to initialize gift editor"** happens because the `gifts` table is missing in your database.

You MUST run the following SQL script in your Supabase SQL Editor to fix this.

## 🛠️ Step-by-Step Instructions

1.  **Open Supabase Dashboard**
    *   Go to your project dashboard.
    *   Click on the **SQL Editor** (icon on the left sidebar).

2.  **Run the Fix Script**
    *   Click **"New Query"**.
    *   Copy and paste the entire content of the file `CREATE_GIFTS_TABLE.sql` (located in your project root).
    *   Click **Run**.

    *(Or copy the code below if easier)*

```sql
-- Create gifts table if it doesn't exist and set up RLS policies

-- 1. Create gifts table
CREATE TABLE IF NOT EXISTS public.gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id numeric NOT NULL,
  gift_data jsonb DEFAULT '{}'::jsonb,
  gift_uuid uuid DEFAULT gen_random_uuid() NOT NULL,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Add unique constraint on gift_uuid
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'gifts_gift_uuid_key') THEN 
        ALTER TABLE public.gifts ADD CONSTRAINT gifts_gift_uuid_key UNIQUE (gift_uuid); 
    END IF; 
END $$;

-- 3. Enable RLS
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
DROP POLICY IF EXISTS "Users can view their own gifts" ON public.gifts;
CREATE POLICY "Users can view their own gifts" ON public.gifts FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own gifts" ON public.gifts;
CREATE POLICY "Users can create their own gifts" ON public.gifts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own gifts" ON public.gifts;
CREATE POLICY "Users can update their own gifts" ON public.gifts FOR UPDATE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can view published gifts" ON public.gifts;
CREATE POLICY "Anyone can view published gifts" ON public.gifts FOR SELECT TO anon, authenticated USING (is_published = true OR auth.uid() = user_id);

-- 5. Grant permissions
GRANT ALL ON public.gifts TO authenticated;
GRANT SELECT ON public.gifts TO anon;
```

## ✅ Verification
After running this script:
1.  Go back to your Dashboard.
2.  Click **"Customize Now"** on any template.
3.  It should now successfully create the gift and redirect you to the editor!

---

## 🚀 Other Updates Applied

I have also updated your **User Dashboard** with the following requested changes:

1.  **New Sidebar Tabs**:
    *   **Transactions**: View your purchase history.
    *   **Wallet & Credits**: (Placeholder)
    *   **Referrals**: (Placeholder)
    *   **Notifications**: (Placeholder)
    *   **Developer**: (Placeholder with API Key view)
    *   **Settings**: Updated links.

2.  **Gift History**: Renamed to "Gift Projects" and restored functionality.

3.  **Error Logging**: Added detailed error logging to the browser console to help debug any future issues.
