create function create_api_key()
returns trigger
language plpgsql
security definer
as $create_api_key$
    begin
        insert into public.api_keys (user_id) values (new.id);
        return new;
    end;
$create_api_key$;

create policy "supabase_auth_admin can create api_keys"
on public.api_keys
for insert
to supabase_auth_admin 
with check (true);

create trigger create_initial_user_api_key
after insert on auth.users
for each row
execute function create_api_key();
