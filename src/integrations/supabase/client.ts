import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lfndwnpbjectkrtudxjn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbmR3bnBiamVjdGtydHVkeGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MjE2ODcsImV4cCI6MjA1NDE5NzY4N30.08g-2wLTfN8pacSAAwEErtgXAEL4p6ei_IiO4ZFvb7Q";

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