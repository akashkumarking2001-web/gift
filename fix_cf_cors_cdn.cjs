// Applies CORS to R2 public CDN buckets via Cloudflare REST API (camelCase schema)
// Run: node fix_cf_cors_cdn.cjs

const ACCOUNT = 'd2cf465a94a50074230765512901e860';
const TOKEN = 'cfut_OiqobPfZJRJNchZxxhKGelxqUXbsUYWnhJXARItQ9fc125be';

// Cloudflare REST API uses camelCase (NOT snake_case like S3 API)
const corsRules = [
    {
        allowedOrigins: ["*"],
        allowedMethods: ["GET", "HEAD", "PUT", "POST", "DELETE"],
        allowedHeaders: ["*"],
        exposeHeaders: ["ETag", "Content-Length", "Content-Type", "Content-Range"],
        maxAgeSeconds: 86400
    }
];

const buckets = ['ar-assets', 'uploads', 'payment-proofs'];

async function setCors(bucket) {
    const url = 'https://api.cloudflare.com/client/v4/accounts/' + ACCOUNT + '/r2/buckets/' + bucket + '/cors';
    const res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Authorization': 'Bearer ' + TOKEN,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(corsRules),
    });

    const text = await res.text();
    console.log('  Status:', res.status, '| Body:', text.substring(0, 200));

    try {
        const data = JSON.parse(text);
        if (data.success) {
            console.log('  ✅  ' + bucket + ' — CORS set via Cloudflare CDN API');
        } else {
            console.error('  ❌  ' + bucket + ' — Failed:', JSON.stringify(data.errors));
        }
    } catch(e) {
        console.log('  Raw response for', bucket, ':', text.substring(0, 300));
    }
}

(async () => {
    console.log('\n🔧 Setting CDN CORS via Cloudflare REST API (camelCase)...\n');
    for (const bucket of buckets) {
        console.log('  → ' + bucket);
        await setCors(bucket);
        console.log('');
    }
    console.log('Done.\n');
})();
