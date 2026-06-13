import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'fs';

// Helper to read .env
function getEnv() {
    const env = {};
    try {
        const content = readFileSync('.env', 'utf-8');
        for (const line of content.split(/\r?\n/)) {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) continue;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx === -1) continue;
            const key = trimmed.slice(0, eqIdx).trim();
            const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
            env[key] = val;
        }
    } catch (e) {
        console.error("Error reading .env:", e.message);
    }
    return env;
}

const env = getEnv();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY; 
const NEW_URL_PREFIX = env.VITE_R2_PUBLIC_URL_AR_ASSETS || "https://assets.giftmagic.beauty";
const NEW_HOST = new URL(NEW_URL_PREFIX).hostname;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase configuration in .env");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrateTable(tableName, columnName) {
    console.log(`\n📦 Migrating ${tableName}.${columnName}...`);
    let totalUpdated = 0;
    let hasMore = true;
    let offset = 0;
    const batchSize = 500;

    while (hasMore) {
        const { data, error } = await supabase
            .from(tableName)
            .select(`id, ${columnName}`)
            .ilike(columnName, '%.r2.dev%')
            .range(offset, offset + batchSize - 1);

        if (error) {
            console.error(`  ❌ Error fetching ${tableName}:`, error);
            break;
        }

        if (!data || data.length === 0) {
            hasMore = false;
            break;
        }

        console.log(`  Found ${data.length} records to inspect in batch [${offset} - ${offset + data.length - 1}]...`);

        for (const record of data) {
            const oldUrl = record[columnName];
            if (!oldUrl) continue;

            try {
                const urlObj = new URL(oldUrl);
                if (urlObj.hostname.endsWith('.r2.dev')) {
                    const newUrl = oldUrl.replace(urlObj.hostname, NEW_HOST);
                    const { error: updErr } = await supabase
                        .from(tableName)
                        .update({ [columnName]: newUrl })
                        .eq('id', record.id);

                    if (updErr) {
                        console.error(`    ❌ Failed to update ${record.id}:`, updErr.message);
                    } else {
                        totalUpdated++;
                    }
                }
            } catch (e) {
                // Not a valid URL, skip
            }
        }

        if (data.length < batchSize) {
            hasMore = false;
        } else {
            offset += batchSize;
        }
    }
    console.log(`  ✅ Finished ${tableName}: ${totalUpdated} records updated.`);
}

async function cleanWorkspaceFiles() {
    const files = ['mind_output.txt']; // Add others if needed
    for (const file of files) {
        try {
            console.log(`\n🧹 Cleaning ${file}...`);
            let content = readFileSync(file, 'utf-8');
            const regex = /pub-[^./]+\.r2\.dev/g;
            if (regex.test(content)) {
                content = content.replace(regex, NEW_HOST);
                writeFileSync(file, content, 'utf-8');
                console.log(`  ✅ ${file} cleaned.`);
            } else {
                 console.log(`  🔍 No matches found in ${file}.`);
            }
        } catch (e) {
            // File might not exist
        }
    }
}

async function runMigration() {
    console.log(`🚀 STARTING MASTER R2 MIGRATION`);
    console.log(`🌍 Target Host: ${NEW_HOST}\n`);

    await migrateTable('ar_albums', 'mind_file_url');
    await migrateTable('ar_group_images', 'file_path');
    await migrateTable('ar_targets', 'video_url');

    await cleanWorkspaceFiles();

    console.log("\n✨ MASTER MIGRATION COMPLETE! All database records and auxiliary files now use the custom domain.");
}

runMigration();
