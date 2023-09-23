alter table public.api_keys alter column key set default md5(gen_random_uuid()::text);
CREATE UNIQUE INDEX api_keys_key_unique ON public.api_keys(key);
