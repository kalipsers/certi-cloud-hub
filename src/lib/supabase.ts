
import { createClient } from '@supabase/supabase-js'

// Get these values from your Supabase project settings -> API
const supabaseUrl = "https://YOUR_PROJECT_URL.supabase.co"
const supabaseAnonKey = "YOUR_ANON_KEY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
