create table public.shot_invocations (
  id uuid not null primary key default gen_random_uuid(),
  shot_id uuid not null references public.shots(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  api_key_id uuid not null references public.api_keys(id) on delete cascade,
  created_at timestamp with time zone not null default timezone('utc'::text, now())
);

ALTER TABLE public.shots DROP COLUMN api_key_id;
