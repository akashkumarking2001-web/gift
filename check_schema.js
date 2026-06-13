import fs from 'fs';
import 'dotenv/config';

async function checkSchema() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  
  const res = await fetch(`${url}/rest/v1/business_registration_requests?limit=1`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`
    }
  });
  
  const data = await res.json();
  if (data && data.length > 0) {
      const cols = Object.keys(data[0]).join(', ');
      fs.writeFileSync('schema_utf8.txt', cols, 'utf8');
  }
}

checkSchema().catch(console.error);
