create table public.shots (
  id uuid not null primary key default gen_random_uuid(),
  api_key_id uuid not null references public.api_keys(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  config jsonb not null,
  image_key text not null,
  image_url text not null,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);
alter table public.shots enable row level security;
create policy shots_owner_read on public.shots for select using (auth.uid() = user_id);
