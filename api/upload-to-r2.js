import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export default async function handler(req, res) {
  // Add CORS headers for the cross-domain iframe requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-bucket-type, x-key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Vercel handles body parsing for 'application/json' automatically, 
  // but for binary data we might need to handle raw chunks if not decoded.
  // However, the mobile app sends binary data.
  // We'll use a helper to get the raw body if it's not already on req.body.
  
  try {
    const bucketType = req.headers['x-bucket-type'] || 'ar-assets';
    const key = req.headers['x-key'];
    const contentType = req.headers['content-type'] || 'application/octet-stream';

    if (!key) {
      return res.status(400).json({ error: 'Missing x-key header' });
    }

    // Initialize S3 Client with environment variables
    const s3Client = new S3Client({
      region: "auto",
      endpoint: process.env.VITE_R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.VITE_R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.VITE_R2_SECRET_ACCESS_KEY,
      },
    });

    let bucketName = 'ar-assets';
    let publicUrlPrefix = 'https://assets.giftmagic.beauty';

    if (bucketType === 'uploads') {
      bucketName = 'uploads';
      publicUrlPrefix = 'https://pub-471818fd146a4dfbb7ece1618d942c47.r2.dev';
    } else if (bucketType === 'payment-proofs') {
      bucketName = 'payment-proofs';
      publicUrlPrefix = 'https://pub-f5aa9fddf1b14429bea3ff5d87ba35eb.r2.dev';
    }

    // Read the body as a buffer
    const body = await new Promise((resolve, reject) => {
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', reject);
    });

    await s3Client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType
    }));

    return res.status(200).json({ url: `${publicUrlPrefix}/${key}` });
  } catch (error) {
    console.error('[API] Upload Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
