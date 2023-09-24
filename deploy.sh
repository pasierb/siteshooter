bash -c 'source .env.prod; fly deploy --build-arg NEXT_PUBLIC_PREVIEW_API_KEY=$NEXT_PUBLIC_PREVIEW_API_KEY --build-arg NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL --build-arg NEXT_PUBLIC_SUPABASE_ANON_API_KEY=$NEXT_PUBLIC_SUPABASE_ANON_API_KEY'