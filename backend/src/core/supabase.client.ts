import { createClient } from '@supabase/supabase-js';
import { Database } from '../common/types/supabase.types';
import { ENV } from '../common/configs/env.config';

// Use ENV from config instead of direct process.env access
const supabaseUrl = ENV.SUPABASE_URL ?? '';
// Use service role key for backend operations to bypass RLS
const supabaseKey = ENV.SUPABASE_SERVICE_KEY ?? ENV.SUPABASE_KEY ?? '';

// Add detailed logging for troubleshooting
console.log('Supabase Configuration:', {
  urlConfigured: !!supabaseUrl,
  keyConfigured: !!supabaseKey,
  url: supabaseUrl ? `${supabaseUrl.substring(0, 10)}...` : 'Not set',
});

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials. Please check your environment variables.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;