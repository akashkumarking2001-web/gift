import { API_CONFIG } from './config';

export const uploadFileToR2 = async (
    file: any, 
    key: string, 
    bucketType: 'ar-assets' | 'uploads' | 'payment-proofs' = 'ar-assets'
): Promise<string> => {
    console.log(`[R2 Proxy] Starting upload for ${key} to ${bucketType}`);
    
    let body: any;
    let contentType = "application/octet-stream";

    try {
        if (file.uri) {
            console.log('[R2 Proxy] Fetching from URI:', file.uri);
            const response = await fetch(file.uri);
            const arrayBuffer = await response.arrayBuffer();
            body = new Uint8Array(arrayBuffer);
            contentType = response.headers.get('content-type') || contentType;
        } else {
            body = file;
            contentType = file.type || contentType;
        }
    } catch (err: any) {
        console.error('[R2 Proxy] Error preparing body:', err);
        throw new Error(`Failed to prepare file: ${err.message}`);
    }

    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/api/upload-to-r2`, {
            method: 'POST',
            headers: {
                'Content-Type': contentType,
                'x-bucket-type': bucketType,
                'x-key': key,
            },
            body: body,
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Upload failed');
        }

        const data = await response.json();
        console.log(`[R2 Proxy] Upload successful: ${data.url}`);
        return data.url;
    } catch (err: any) {
        console.error('[R2 Proxy] Request failed:', err);
        throw err;
    }
};

export const deleteFileFromR2 = async (
    key: string, 
    bucketType: 'ar-assets' | 'uploads' | 'payment-proofs' = 'ar-assets'
): Promise<void> => {
    // For now, deletion is not proxied, but can be added if needed
    console.warn('[R2 Proxy] Deletion not yet implemented via proxy');
};

