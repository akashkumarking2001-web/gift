import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";


const env = fs.readFileSync('.env', 'utf-8');
const getVal = (key) => {
    const match = env.match(new RegExp(`${key}=(.*)`));
    return match ? match[1].trim().replace(/^"|"$/g, '') : '';
};

const endpoint = getVal('VITE_R2_ENDPOINT');
const accessKey = getVal('VITE_R2_ACCESS_KEY_ID');
const secretKey = getVal('VITE_R2_SECRET_ACCESS_KEY');
const bucket = getVal('VITE_R2_BUCKET_AR_ASSETS');

if (!endpoint || !accessKey || !secretKey || !bucket) {
    console.error("❌ Missing required .env variables.");
    process.exit(1);
}

const r2Client = new S3Client({
    region: "auto",
    endpoint: endpoint,
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
    },
    forcePathStyle: true,
});

async function runTest() {
    console.log("Endpoint:", endpoint);
    console.log("Bucket:", bucket);
    
    try {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: "test_logo_upload_script.txt",
            Body: Buffer.from("Test upload from backend node script"),
            ContentType: "text/plain",
        });

        await r2Client.send(command);
        console.log("✅ Success! R2 credentials and endpoint are working perfectly from backend.");
    } catch (e) {
        console.error("❌ R2 Upload Failed:", e);
    }
}

runTest();
