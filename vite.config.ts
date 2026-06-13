import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { createClient } from "@supabase/supabase-js";

// Initialize S3 Client for local proxy
const r2Client = new S3Client({
  region: "auto",
  endpoint: "https://d2cf465a94a50074230765512901e860.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "98a47e2ed7750fcb64add6d4fcbef030",
    secretAccessKey: "94eb668b19687ec11d7c4eade7b99137d2ea41fa2b46a09083cff35bff05f421",
  },
});

// Initialize Supabase Client for local proxy
const supabase = createClient(
  "https://sweylelsqyrcchplwtkx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3ZXlsZWxzcXlyY2NocGx3dGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1NzgzMTgsImV4cCI6MjA4NjE1NDMxOH0.4P79RVCUcNSgOxXPapyksgn8LIY356g6XsFEmRObXe4"
);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
      {
        name: 'api-proxy',
        enforce: 'pre',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            const urlPath = req.url || '';
            
            // --- Magic Frame SPA Routing Bypass ---
            if (urlPath.startsWith('/magic-frame/')) {
              const urlNoQuery = urlPath.split('?')[0];
              if (!urlNoQuery.includes('.') && !urlNoQuery.endsWith('index.html')) {
                req.url = '/magic-frame/index.html';
              }
            }

            // --- Server Side R2 Upload Proxy ---
            if (urlPath.includes('/api/upload-to-r2') && req.method === 'POST') {
              const chunks: any[] = [];
              req.on('data', chunk => chunks.push(chunk));
              req.on('end', async () => {
                try {
                  const contentType = req.headers['content-type'] || 'application/octet-stream';
                  const bucketType = req.headers['x-bucket-type'] || 'ar-assets';
                  const key = req.headers['x-key'] as string;
                  const body = Buffer.concat(chunks);
                  let bucketName = bucketType === 'uploads' ? 'uploads' : (bucketType === 'payment-proofs' ? 'payment-proofs' : 'ar-assets');
                  let publicUrlPrefix = bucketType === 'uploads' ? 'https://pub-471818fd146a4dfbb7ece1618d942c47.r2.dev' : (bucketType === 'payment-proofs' ? 'https://pub-f5aa9fddf1b14429bea3ff5d87ba35eb.r2.dev' : 'https://assets.giftmagic.beauty');

                  await r2Client.send(new PutObjectCommand({ Bucket: bucketName, Key: key, Body: body, ContentType: contentType }));
                  res.end(JSON.stringify({ url: `${publicUrlPrefix}/${key}` }));
                } catch (err: any) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
              return;
            }

            // --- Cashfree Verification ---
            if (urlPath.includes('/api/verify-cashfree-order')) {
              const url = new URL(urlPath, `http://${req.headers.host || 'localhost'}`);
              const orderId = url.searchParams.get('orderId') || url.searchParams.get('order_id');
              const appId = env.VITE_CASHFREE_APP_ID;
              const secretKey = env.CASHFREE_SECRET_KEY;
              
              if (!orderId) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "orderId is required" }));
                return;
              }

              if (orderId === 'mock_success_123') {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  order_id: 'mock_success_123',
                  order_status: 'PAID',
                  payment_session_id: 'mock_session_123',
                  order_amount: 300,
                  customer_details: {
                    customer_name: 'Mock Customer',
                    customer_email: 'mock@example.com',
                    customer_phone: '9876543210'
                  }
                }));
                return;
              }

              const baseUrl = env.VITE_CASHFREE_MODE === 'production' ? 'https://api.cashfree.com/pg' : 'https://sandbox.cashfree.com/pg';

              try {
                const response = await fetch(`${baseUrl}/orders/${orderId}`, {
                  headers: { 'x-client-id': appId, 'x-client-secret': secretKey, 'x-api-version': '2023-08-01', 'accept': 'application/json' }
                });
                const data = await response.json() as any;

                const cfStatus = data.order_status; // PAID, ACTIVE, EXPIRED, FAILED, CANCELLED

                if (cfStatus) {
                  // Update the status in the DB
                  await supabase.from('business_registration_requests').update({ 
                    payment_status: cfStatus, 
                    updated_at: new Date().toISOString() 
                  }).eq('cf_order_id', orderId);
                }

                if (cfStatus === 'PAID') {
                  const { data: pending } = await supabase.from('pending_ar_creations').select('payload').eq('order_id', orderId).maybeSingle();
                  if (pending?.payload) {
                    const payload = pending.payload;
                    const { data: existing } = await supabase.from('ar_albums').select('id').eq('cf_order_id', orderId).maybeSingle();
                    if (!existing) {
                      const { data: album } = await supabase.from('ar_albums').insert({
                        title: payload.title, phone_number: payload.phone_number, image_url: payload.image_url, video_url: payload.video_url,
                        mind_file_url: payload.mind_file_url, cf_order_id: orderId, amount_paid: payload.amount_paid, payment_status: 'paid',
                        approval_status: 'approved', is_active: true, user_id: payload.user_id
                      }).select().single();
                      if (album) {
                        await supabase.from('ar_targets').insert({ album_id: album.id, image_url: payload.image_url, video_url: payload.video_url, target_index: 0, player_type: 'normal' });
                        await supabase.from('pending_ar_creations').delete().eq('order_id', orderId);
                      }
                    }
                  }
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              } catch (error: any) {
                console.error("Cashfree verification error:", error);
                res.statusCode = 500;
                res.end(JSON.stringify({ message: error.message }));
              }
              return;
            }

            // --- Create Cashfree Order ---
            if (urlPath.includes('api/create-cashfree-order') && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => body += chunk.toString());
              req.on('end', async () => {
                try {
                  const parsed = JSON.parse(body);
                  const mode = env.VITE_CASHFREE_MODE || 'sandbox';
                  const orderId = `order_${Date.now()}`;
                  if (parsed.album_payload) await supabase.from('pending_ar_creations').insert({ order_id: orderId, payload: parsed.album_payload });

                  let returnUrl = parsed.return_url || `${req.headers.origin}/history?order_id={order_id}`;
                  if (returnUrl.startsWith('http://localhost')) {
                    returnUrl = returnUrl.replace('http://', 'https://');
                  }

                  const cfRes = await fetch(mode === 'production' ? 'https://api.cashfree.com/pg/orders' : 'https://sandbox.cashfree.com/pg/orders', {
                    method: 'POST',
                    headers: { 'x-client-id': env.VITE_CASHFREE_APP_ID, 'x-client-secret': env.CASHFREE_SECRET_KEY, 'x-api-version': '2023-08-01', 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      order_amount: Number(parsed.amount), order_currency: 'INR', order_id: orderId,
                      customer_details: { customer_id: String(parsed.customer_id || 'guest').substring(0, 45), customer_email: parsed.customer_email || 'guest@giftmagic.co', customer_phone: parsed.customer_phone || '9999999999' },
                      order_meta: { return_url: returnUrl }
                    })
                  });
                  const data = await cfRes.json();
                  res.writeHead(cfRes.status, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ ...(data as any), order_id: orderId, checkout_base: mode === 'production' ? 'https://payments.cashfree.com' : 'https://sandbox.cashfree.com' }));
                } catch (err: any) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
              return;
            }
            // --- Asset Loading Proxy (CORS Bypass with Range Support) ---
            if (urlPath.includes('/api/r2proxy')) {
              const urlParsed = new URL(urlPath, `http://${req.headers.host || 'localhost'}`);
              const targetUrl = urlParsed.searchParams.get('url');

              if (!targetUrl) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: "url is required" }));
                return;
              }

              try {
                const range = req.headers.range;
                const headers: Record<string, string> = {};
                if (range) {
                  headers.Range = range;
                }

                const response = await fetch(targetUrl, { headers });
                
                // Copy important headers back to the response
                const contentType = response.headers.get('content-type') || 'application/octet-stream';
                const contentRange = response.headers.get('content-range');
                const acceptRanges = response.headers.get('accept-ranges');
                const contentLength = response.headers.get('content-length');

                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Content-Type', contentType);
                if (contentRange) res.setHeader('Content-Range', contentRange);
                if (acceptRanges) res.setHeader('Accept-Ranges', acceptRanges);
                if (contentLength) res.setHeader('Content-Length', contentLength);
                
                // Set status code (e.g. 206 for partial content)
                res.statusCode = response.status;

                // Stream the response body
                if (response.body) {
                  const reader = response.body.getReader();
                  const pump = async () => {
                    const { done, value } = await reader.read();
                    if (done) {
                      res.end();
                      return;
                    }
                    res.write(Buffer.from(value));
                    await pump();
                  };
                  await pump();
                } else {
                  res.end();
                }
              } catch (error: any) {
                console.error("Proxy error:", error);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: error.message }));
              }
              return;
            }

            next();
          });
        }
      }
    ],
    resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  };
});
