alter table public.shots
    add column
    updated_at timestamp with time zone
    not null
    default timezone('utc'::text, now());
