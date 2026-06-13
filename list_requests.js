import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sweylelsqyrcchplwtkx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZXlsZWxzcXlyY2NocGx3dGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzgzMTgsImV4cCI6MjA4NjE1NDMxOH0.4P79RVCUcNSgOxXPapyksgn8LIY356g6XsFEmRObXe4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function listRequests() {
  const { data, error } = await supabase
    .from('business_registration_requests')
    .select('*')
    .limit(10);

  if (error) {
    console.error('Error fetching requests:', error);
    // Maybe try different table name?
    return;
  }

  console.log('Recent Requests:', JSON.stringify(data, null, 2));
}

listRequests();
