
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || ''

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkColumns() {
  const { data, error } = await supabase.from('user_profiles').select('*').limit(1);
  if (error) {
    console.error('Error fetching user_profiles:', error)
    return
  }
  if (data && data.length > 0) {
    console.log('Columns in user_profiles:', Object.keys(data[0]))
  } else {
    console.log('No rows in user_profiles to inspect columns.')
  }
}

checkColumns()
