// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lfndwnpbjectkrtudxjn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxmbmR3bnBiamVjdGtydHVkeGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0MDU5OTcsImV4cCI6MjA1Mzk4MTk5N30.xZ3-PFzn4zjkZPphJGGdKLES7ysNBhAg_5JJzuvz8ug";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);