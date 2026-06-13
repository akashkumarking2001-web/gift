import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sweylelsqyrcchplwtkx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZXlsZWxzcXlyY2NocGx3dGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzgzMTgsImV4cCI6MjA4NjE1NDMxOH0.4P79RVCUcNSgOxXPapyksgn8LIY356g6XsFEmRObXe4';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkRequest() {
  const requestId = '4753f8a0-1160-46e7-914a-61b23ed87be5';
  const { data, error } = await supabase
    .from('business_registration_requests')
    .select('*')
    .eq('id', requestId)
    .single();

  if (error) {
    console.error('Error fetching request:', error);
    return;
  }

  console.log('Request Data:', JSON.stringify(data, null, 2));
}

checkRequest();
