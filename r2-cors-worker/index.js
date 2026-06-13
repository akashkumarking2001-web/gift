// Cloudflare Worker: CORS proxy for R2 r2.dev assets
// Proxies any r2.dev request server-side and adds CORS headers so WebGL video textures work.

export default {
    async fetch(request, env, ctx) {

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, {
                status: 204,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
                    'Access-Control-Allow-Headers': '*',
                    'Access-Control-Max-Age': '86400',
                },
            });
        }

        const url = new URL(request.url);

        // Expect ?url=<encoded-r2-url>  OR  /<r2-path> for direct proxying
        let targetUrl = url.searchParams.get('url');

        if (!targetUrl) {
            // Direct path mode: strip leading slash, reconstruct r2 URL
            const path = url.pathname.slice(1);
            if (!path) {
                return new Response('Missing url param', { status: 400 });
            }
            // path starts with the r2 public host, e.g. pub-xxx.r2.dev/folder/file.mp4
            targetUrl = 'https://' + path;
        }

        // Only allow r2.dev origins for security
        const parsed = new URL(targetUrl);
        if (!parsed.hostname.endsWith('.r2.dev')) {
            return new Response('Forbidden origin', { status: 403 });
        }

        // Forward range headers so video seeking works
        const headers = new Headers();
        const range = request.headers.get('Range');
        if (range) headers.set('Range', range);

        const response = await fetch(targetUrl, {
            method: request.method,
            headers,
            cf: { cacheEverything: true, cacheTtl: 3600 },
        });

        const responseHeaders = new Headers(response.headers);
        responseHeaders.set('Access-Control-Allow-Origin', '*');
        responseHeaders.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
        responseHeaders.set('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Content-Type');

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: responseHeaders,
        });
    },
};
