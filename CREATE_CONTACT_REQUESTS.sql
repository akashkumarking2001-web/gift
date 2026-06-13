-- Create contact_requests table
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new', -- new, read, replied, closed
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Allow public to insert contact requests
DROP POLICY IF EXISTS "Public can insert contact requests" ON public.contact_requests;
CREATE POLICY "Public can insert contact requests"
ON public.contact_requests FOR INSERT
TO public
WITH CHECK (true);

-- Allow authenticated users (admins) to view and manage contact requests
DROP POLICY IF EXISTS "Admins can view contact requests" ON public.contact_requests;
CREATE POLICY "Admins can view contact requests"
ON public.contact_requests FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Admins can update contact requests" ON public.contact_requests;
CREATE POLICY "Admins can update contact requests"
ON public.contact_requests FOR UPDATE
TO authenticated
USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON public.contact_requests(status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON public.contact_requests(created_at);
