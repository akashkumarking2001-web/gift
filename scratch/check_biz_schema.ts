import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
)

async function checkSchema() {
  console.log('--- business_registration_requests ---')
  const { data: regData } = await supabase.from('business_registration_requests').select('*').limit(1)
  console.log(regData ? Object.keys(regData[0] || {}) : 'No data')

  console.log('\n--- business_clients ---')
  const { data: bizData } = await supabase.from('business_clients').select('*').limit(1)
  console.log(bizData ? Object.keys(bizData[0] || {}) : 'No data')
}

checkSchema()
