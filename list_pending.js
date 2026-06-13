import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    "https://sweylelsqyrcchplwtkx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZXlsZWxzcXlyY2NocGx3dGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzgzMTgsImV4cCI6MjA4NjE1NDMxOH0.4P79RVCUcNSgOxXPapyksgn8LIY356g6XsFEmRObXe4"
);

async function listPending() {
    const { data, error } = await supabase
        .from('pending_ar_creations')
        .select('*')
        .limit(10);
    
    if (error) {
        console.error("Error fetching data:", error);
    } else {
        console.log("Pending Creations:", JSON.stringify(data, null, 2));
    }
}

listPending();
