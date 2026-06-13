
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL || "",
  process.env.VITE_SUPABASE_ANON_KEY || ""
);

async function check() {
    const identifier = "paalkovvamagic.shop";
    console.log(`Checking identifier: "${identifier}"`);
    
    // Check by custom domain
    const { data: b1, error: e1 } = await supabase
        .from('business_clients')
        .select('*')
        .eq('custom_domain', identifier)
        .single();
    
    if (b1) {
        console.log("Found by Exact Domain:", b1.business_name, "Status:", b1.is_active);
    } else {
        console.log("NOT found by exact domain.");
    }

    // Check by ILIKE (case insensitive + possible spaces)
    const { data: b2 } = await supabase
        .from('business_clients')
        .select('*')
        .ilike('custom_domain', `%${identifier}%`);

    console.log("Found by Fuzzy Search:", b2?.length || 0);
    b2?.forEach((b: any) => {
        console.log(`- "${b.custom_domain}" (Slug: ${b.business_slug}, Active: ${b.is_active})`);
    });
}

check();
