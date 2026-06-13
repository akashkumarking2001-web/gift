const ACCOUNT = 'd2cf465a94a50074230765512901e860';
const TOKEN = 'cfut_OiqobPfZJRJNchZxxhKGelxqUXbsUYWnhJXARItQ9fc125be';

const cors = [
    {
        allowed_origins: ["*"],
        allowed_methods: ["GET", "HEAD"],
        allowed_headers: ["*"],
        expose_headers: ["ETag", "Content-Length", "Content-Type"],
        max_age_seconds: 86400
    }
];

const buckets = ['ar-assets', 'uploads', 'payment-proofs'];

async function run() {
    console.log('\n🔧 Applying CORS via Cloudflare REST API...\n');
    for (const bucket of buckets) {
        const url = 'https://api.cloudflare.com/client/v4/accounts/' + ACCOUNT + '/r2/buckets/' + bucket + '/cors';
        try {
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cors),
            });
            const data = await res.json();
            if (data.success) {
                console.log('  ✅  ' + bucket + ' — CORS set successfully');
            } else {
                console.error('  ❌  ' + bucket + ' — Failed:', JSON.stringify(data.errors));
            }
        } catch (err) {
            console.error('  ❌  ' + bucket + ' — Error:', err.message);
        }
    }
    console.log('\nDone.\n');
}

run();
