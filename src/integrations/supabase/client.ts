import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lfndwnpbjectkrtudxjn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbmR3bnBiamVjdGtydHVkeGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwMzY4MDAsImV4cCI6MjAyMjYxMjgwMH0.Rl5Zf6ZYbBQZBKBbHPPBxVGNPEZHlHJHhOAXBQMKZXU";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);