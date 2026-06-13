import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || '',
  process.env.VITE_SUPABASE_ANON_KEY || ''
);

async function inspectMindFile() {
  console.log("Fetching latest album .mind files from DB...");
  const { data: albums, error } = await supabase
    .from('ar_albums')
    .select('id, mind_file_url, title')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching albums:", error);
    return;
  }

  for (const album of albums) {
    console.log(`\n--- Inspecting Album: ${album.title} (${album.id}) ---`);
    if (!album.mind_file_url) {
      console.log("No mind_file_url found!");
      continue;
    }

    console.log(`URL: ${album.mind_file_url}`);
    
    try {
      const response = await fetch(album.mind_file_url);
      if (!response.ok) {
        console.log(`❌ Failed to fetch file: ${response.status} ${response.statusText}`);
        continue;
      }

      const buffer = await response.arrayBuffer();
      console.log(`✅ File Size: ${buffer.byteLength} bytes`);
      
      if (buffer.byteLength < 1000) {
        console.log(`🚨 WARNING: .mind file is EXTREMELY SMALL (${buffer.byteLength} bytes). It might be empty or corrupt!`);
      } else {
        console.log(`👍 Buffer size looks normal for valid AR features.`);
      }
    } catch (err) {
      console.error("Fetch exception:", err);
    }
  }
}

inspectMindFile();
