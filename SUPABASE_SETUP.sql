-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create 'payments' table
create table if not exists public.payments (
  id uuid default uuid_generate_v4() primary key,
  user_email text not null,
  transaction_id text not null,
  amount numeric not null,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now(),
  screenshot_url text, -- For storing payment proof URL
  rejection_reason text,
  user_metadata jsonb
);

-- Enable Row Level Security (RLS)
alter table public.payments enable row level security;

-- Create policies for 'payments' table
-- 1. Allow anyone (authenticated or anon) to insert payments (for checkout)
create policy "Allow public insert to payments"
on public.payments for insert
with check (true);

-- 2. Allow users to view their own payments
create policy "Allow users to view own payments"
on public.payments for select
using (auth.jwt() ->> 'email' = user_email);

-- 3. Allow admins to view all payments (adjust using your admin logic, e.g. checking user metadata or a specific email or role)
-- For simplicity, if you are using Supabase Auth roles or metadata:
-- create policy "Allow admins to view all payments"
-- on public.payments for select
-- using (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'email' = 'your_admin_email@example.com');
-- Or just allow authenticated users to view if you manage admin logic in app (less secure).
-- For this setup, we'll allow authenticated users to read all payments IF they are admins.
-- BUT since you implemented AdminDashboard without specific RLS roles in frontend, you might need a broader policy or Service Role Key usage in backend.
-- The prompt implies client-side admin usage.
-- We'll add a policy that allows authenticated users to read all payments for now, assuming admin is the main user.
-- Use with caution!
create policy "Allow authenticated to view all payments"
on public.payments for select
to authenticated
using (true);

-- 4. Allow authenticated users to update payments (for approval/rejection)
create policy "Allow authenticated to update payments"
on public.payments for update
to authenticated
using (true);


-- Create 'user_balances' view (for Profile Balance calculation)
create or replace view public.user_balances as
select
  user_email,
  count(id) as total_transactions,
  sum(case when status = 'approved' then amount else 0 end) as total_spent,
  max(created_at) as last_active
from public.payments
group by user_email;


-- Storage Bucket Setup for 'payment-proofs'
-- Inserts a new bucket configuration into storage.buckets
insert into storage.buckets (id, name, public)
values ('payment-proofs', 'payment-proofs', true)
on conflict (id) do nothing;

-- Storage Policies
-- 1. Allow public uploads to 'payment-proofs' bucket
create policy "Allow public uploads to payment-proofs"
on storage.objects for insert
with check ( bucket_id = 'payment-proofs' );

-- 2. Allow public to view files in 'payment-proofs'
create policy "Allow public view in payment-proofs"
on storage.objects for select
using ( bucket_id = 'payment-proofs' );
