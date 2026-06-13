/**
 * Sets CORS on Cloudflare R2 public buckets via the Cloudflare API.
 * R2 `r2.dev` public URLs use Cloudflare's CDN CORS config, not the S3-level one.
 *
 * Usage: node set_r2_cors_cf.mjs
 * Requires: CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN in .env
 */

import { readFileSync } from "fs";

// Parse .env
const env = {};
try {
    const envContent = readFileSync(".env", "utf-8");
    for (const line of envContent.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
        env[key] = val;
    }
} catch (e) {
    console.error("Could not read .env file:", e.message);
    process.exit(1);
}

const ACCOUNT_ID = env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN  = env.CLOUDFLARE_API_TOKEN;

if (!ACCOUNT_ID || !API_TOKEN) {
    console.error(`
❌  Missing credentials in .env file.
    Please add the following to your .env file:

    CLOUDFLARE_ACCOUNT_ID=<your account ID>
    CLOUDFLARE_API_TOKEN=<an API token with R2:Edit permission>

    You can find your Account ID on the Cloudflare Dashboard right sidebar.
    Create an API Token at: https://dash.cloudflare.com/profile/api-tokens
    (Use the "Edit Cloudflare Workers" template and add R2:Edit to it)
`);
    process.exit(1);
}

const corsRules = [
    {
        allowed_origins: ["*"],
        allowed_methods: ["GET", "HEAD"],
        allowed_headers: ["*"],
        expose_headers: ["ETag", "Content-Length", "Content-Type"],
        max_age_seconds: 86400,
    }
];

const buckets = [
    env.VITE_R2_BUCKET_AR_ASSETS,
    env.VITE_R2_BUCKET_UPLOADS,
    env.VITE_R2_BUCKET_PAYMENT_PROOFS,
].filter(Boolean);

async function setCors(bucket) {
    const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/r2/buckets/${bucket}/cors`;
    const res = await fetch(url, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(corsRules),
    });

    const data = await res.json();
    if (data.success) {
        console.log(`  ✅  ${bucket} — CORS set successfully`);
    } else {
        console.error(`  ❌  ${bucket} — Failed:`, JSON.stringify(data.errors));
    }
}

console.log(`\n🔧  Applying CORS rules to ${buckets.length} R2 buckets via Cloudflare API...\n`);
for (const bucket of buckets) {
    await setCors(bucket);
}
console.log("\nDone.\n");
