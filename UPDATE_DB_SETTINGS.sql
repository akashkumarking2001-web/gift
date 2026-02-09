-- Create system_settings table
create table if not exists public.system_settings (
  key text primary key,
  value text
);

-- Insert default values if they don't exist
insert into public.system_settings (key, value) values 
('upi_id', 'payments@giftly.upi'),
('qr_code_url', ''),
('instagram_url', 'https://instagram.com/giftly.magic')
on conflict (key) do nothing;

-- Enable RLS
alter table public.system_settings enable row level security;

-- Policies
drop policy if exists "Allow public read system_settings" on public.system_settings;
create policy "Allow public read system_settings"
on public.system_settings for select
using (true);

drop policy if exists "Allow admin update system_settings" on public.system_settings;
create policy "Allow admin update system_settings"
on public.system_settings for update
using (true);

drop policy if exists "Allow admin insert system_settings" on public.system_settings;
create policy "Allow admin insert system_settings"
on public.system_settings for insert
with check (true);
