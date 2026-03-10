import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://ohamyowdsbephratufum.supabase.co';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Y6mUA8FS2c0MCnzfVsv1sw_xCvVS33G';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
