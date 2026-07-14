-- CMS schema for ryannawrocki.com — run once against the Supabase project.
create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null default '',
  password_hash text not null,
  failed_attempts int not null default 0,
  locked_until timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  topic text not null default 'Updates',
  status text not null default 'draft' check (status in ('draft','published')),
  featured boolean not null default false,
  date date not null default current_date,
  author text not null default 'Delegate Ryan Nawrocki',
  excerpt text,
  dek text,
  body_html text not null default '',
  cover_image text,
  cover_alt text,
  cover_position text,
  read_time text,
  key_points jsonb,
  pull_quote text,
  links jsonb,
  sources jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  type text not null default 'community' check (type in ('fundraiser','town-hall','community','volunteer')),
  status text not null default 'draft' check (status in ('draft','published')),
  featured boolean not null default false,
  date text not null,
  time text,
  venue text not null default '',
  address text not null default '',
  summary text not null default '',
  contributions jsonb,
  sponsor_levels jsonb,
  rsvp_url text,
  rsvp_by text,
  contact jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  kind text not null default 'clip' check (kind in ('clip','link')),
  youtube_id text,
  channel text,
  title text not null,
  date date,
  no_embed boolean not null default false,
  start_seconds int,
  href text,
  status text not null default 'published' check (status in ('draft','published')),
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
alter table public.posts enable row level security;
alter table public.events enable row level security;
alter table public.videos enable row level security;

-- Public (anon) may read PUBLISHED content only. No write policies exist:
-- all writes go through the service role, which bypasses RLS.
drop policy if exists "public read published posts" on public.posts;
create policy "public read published posts" on public.posts
  for select using (status = 'published');

drop policy if exists "public read published events" on public.events;
create policy "public read published events" on public.events
  for select using (status = 'published');

drop policy if exists "public read published videos" on public.videos;
create policy "public read published videos" on public.videos
  for select using (status = 'published');

-- admin_users: RLS enabled, zero policies -> invisible to anon entirely.
