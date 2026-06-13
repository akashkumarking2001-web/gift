// api/r2proxy.js
// Robust proxy to bypass R2/Cloudflare CORS for images and videos
// Handles 206 Partial Content normalization to prevent ERR_FAILED in browser

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type');
    return res.status(200).end();
  }

  const rawUrl = req.query.url;
  if (!rawUrl) return res.status(400).send('Missing url');

  let targetUrl;
  try {
    targetUrl = decodeURIComponent(rawUrl);
    new URL(targetUrl); // Validate URL
  } catch {
    return res.status(400).send('Invalid url');
  }

  // Always set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Content-Type, Accept-Ranges');
  res.setHeader('Cache-Control', 'public, max-age=3600');

  try {
    const isRangeRequest = !!req.headers.range;
    const fetchHeaders = {};
    if (isRangeRequest) fetchHeaders['Range'] = req.headers.range;

    const upstream = await fetch(targetUrl, { headers: fetchHeaders });

    // Forward content headers
    const forwardHeaders = ['content-type', 'content-length', 'content-range', 'accept-ranges', 'etag', 'last-modified'];
    for (const h of forwardHeaders) {
      const v = upstream.headers.get(h);
      if (v) res.setHeader(h, v);
    }

    // KEY FIX: Cloudflare/R2 sometimes returns 206 for non-range requests
    // This causes ERR_FAILED in browser fetch(). Normalize 206→200 for non-range requests.
    const upstreamStatus = upstream.status;
    const responseStatus = (upstreamStatus === 206 && !isRangeRequest) ? 200 : upstreamStatus;

    if (upstreamStatus !== 200 && upstreamStatus !== 206) {
      console.error(`[r2proxy] Upstream error ${upstreamStatus} for: ${targetUrl}`);
      return res.status(upstreamStatus).send(`Upstream error: ${upstreamStatus}`);
    }

    res.status(responseStatus);

    // Buffer the full response body and send at once
    // More reliable than streaming on Vercel serverless
    if (upstream.body) {
      const arrayBuffer = await upstream.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      // Update Content-Length if we normalized 206→200
      if (upstreamStatus === 206 && !isRangeRequest) {
        res.setHeader('Content-Length', buffer.length);
      }
      return res.end(buffer);
    }

    return res.end();

  } catch (err) {
    console.error('[r2proxy] Error:', err.message, '| URL:', targetUrl?.slice(-80));
    if (!res.headersSent) {
      return res.status(500).send('Proxy error: ' + err.message);
    }
  }
}
