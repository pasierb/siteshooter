create table public.api_keys (
  id uuid not null primary key default gen_random_uuid(),
  key text not null unique,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone not null default timezone('utc'::text, now()),
  last_used_at timestamp with time zone
);

alter table public.api_keys enable row level security;
