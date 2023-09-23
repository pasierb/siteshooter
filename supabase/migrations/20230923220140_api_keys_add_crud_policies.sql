create policy "owner can insert api_keys"
on public.api_keys
for insert
to authenticated 
with check (auth.uid() = user_id);

create policy "owner can update api_keys"
on public.api_keys
for update
to authenticated 
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
