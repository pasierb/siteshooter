create policy api_keys_owner_read on public.api_keys for select using (auth.uid() = user_id);