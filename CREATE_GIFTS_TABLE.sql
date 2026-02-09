-- Create gifts table if it doesn't exist and set up RLS policies

-- 1. Create gifts table
CREATE TABLE IF NOT EXISTS public.gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  template_id numeric NOT NULL, -- references templates(id) but keeping it loose for now
  gift_data jsonb DEFAULT '{}'::jsonb,
  gift_uuid uuid DEFAULT gen_random_uuid() NOT NULL, -- Unique ID for sharing
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Add unique constraint on gift_uuid if not exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'gifts_gift_uuid_key') THEN 
        ALTER TABLE public.gifts ADD CONSTRAINT gifts_gift_uuid_key UNIQUE (gift_uuid); 
    END IF; 
END $$;

-- 3. Enable RLS
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;

-- 4. Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can view their own gifts" ON public.gifts;
DROP POLICY IF EXISTS "Users can create their own gifts" ON public.gifts;
DROP POLICY IF EXISTS "Users can update their own gifts" ON public.gifts;
DROP POLICY IF EXISTS "Anyone can view published gifts" ON public.gifts;

-- 5. Create RLS policies

-- Users can view their own gifts
CREATE POLICY "Users can view their own gifts"
ON public.gifts FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can create their own gifts
CREATE POLICY "Users can create their own gifts"
ON public.gifts FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own gifts
CREATE POLICY "Users can update their own gifts"
ON public.gifts FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Anyone can view published gifts (for sharing)
CREATE POLICY "Anyone can view published gifts"
ON public.gifts FOR SELECT
TO anon, authenticated
USING (is_published = true OR auth.uid() = user_id);

-- 6. Create indexes
CREATE INDEX IF NOT EXISTS idx_gifts_user_id ON public.gifts(user_id);
CREATE INDEX IF NOT EXISTS idx_gifts_gift_uuid ON public.gifts(gift_uuid);
CREATE INDEX IF NOT EXISTS idx_gifts_template_id ON public.gifts(template_id);

-- 7. Grant permissions
GRANT ALL ON public.gifts TO authenticated;
GRANT SELECT ON public.gifts TO anon;

SELECT 'Gifts table setup complete!' as status;
