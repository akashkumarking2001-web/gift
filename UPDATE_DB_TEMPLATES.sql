-- Create templates table
create table if not exists public.templates (
  id numeric primary key,
  slug text unique not null,
  title text not null,
  category text not null,
  price numeric not null,
  original_price numeric not null,
  icon text,
  color text,
  tag text,
  pages jsonb, -- Store pages configuration as JSON
  is_active boolean default true,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.templates enable row level security;

-- Policies
drop policy if exists "Allow public read templates" on public.templates;
create policy "Allow public read templates"
on public.templates for select
using (true);

drop policy if exists "Allow admin all on templates" on public.templates;
create policy "Allow admin all on templates"
on public.templates for all
using (true);

-- Insert initial sample data (optional, just one to make debugging easier if sync fails)
insert into public.templates (id, slug, title, category, price, original_price, icon, color, tag, pages, is_active)
values 
(1, 'birthday-countdown', 'Birthday Countdown Celebration', 'Birthday', 149, 299, '🎂', 'from-pink-500 to-rose-600', 'Popular', 
'[
    {"id": "p1", "type": "loading", "title": "Loading Screen", "requiredFields": ["subtext"]},
    {"id": "p2", "type": "countdown", "title": "Countdown", "requiredFields": ["targetDate", "heading"]},
    {"id": "p3", "type": "celebration", "title": "Celebration", "requiredFields": ["mainText"]},
    {"id": "p4", "type": "message", "title": "Message Cards", "requiredFields": ["card1Heading", "card1Body"]},
    {"id": "p5", "type": "photo", "title": "Memory Gallery", "requiredFields": ["photos"], "config": {"maxPhotos": 10}}
]'::jsonb, true)
on conflict (id) do nothing;
