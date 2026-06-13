import { S3Client, PutBucketCorsCommand } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";

// Manually parse .env so we don't need dotenv installed
const envContent = readFileSync(".env", "utf-8");
const env = {};
for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    env[key] = val;
}

const r2Client = new S3Client({
    region: "auto",
    endpoint: env.VITE_R2_ENDPOINT,
    credentials: {
        accessKeyId: env.VITE_R2_ACCESS_KEY_ID || "",
        secretAccessKey: env.VITE_R2_SECRET_ACCESS_KEY || "",
    },
    forcePathStyle: true,
});

const corsConfig = {
    CORSRules: [
        {
            AllowedHeaders: ["*"],
            AllowedMethods: ["PUT", "POST", "GET", "HEAD", "DELETE"],
            AllowedOrigins: ["*"],           // Allow all origins (public assets)
            ExposeHeaders: ["ETag", "Content-Length"],
            MaxAgeSeconds: 86400,
        }
    ]
};

const buckets = [
    env.VITE_R2_BUCKET_AR_ASSETS,
    env.VITE_R2_BUCKET_UPLOADS,
    env.VITE_R2_BUCKET_PAYMENT_PROOFS,
].filter(Boolean);

async function setCors() {
    console.log(`\n🔧 Configuring CORS for ${buckets.length} R2 buckets...\n`);
    for (const bucket of buckets) {
        console.log(`  ➜ Setting CORS for bucket: "${bucket}"...`);
        try {
            await r2Client.send(new PutBucketCorsCommand({
                Bucket: bucket,
                CORSConfiguration: corsConfig,
            }));
            console.log(`  ✅ Success: ${bucket}\n`);
        } catch (err) {
            console.error(`  ❌ Failed: ${bucket} — ${err.message}\n`);
        }
    }
    console.log("Done.");
}

setCors();
