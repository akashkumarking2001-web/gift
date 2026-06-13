import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Initialize the S3 Client with Cloudflare R2 Credentials via Vite env
const r2Client = new S3Client({
    region: "auto",
    endpoint: import.meta.env.VITE_R2_ENDPOINT,
    credentials: {
        accessKeyId: import.meta.env.VITE_R2_ACCESS_KEY_ID || "",
        secretAccessKey: import.meta.env.VITE_R2_SECRET_ACCESS_KEY || "",
    },
    forcePathStyle: true, // 🚨 CRITICAL: Cloudflare R2 requires Path-Style addressing
});

/**
 * Uploads a file directly to Cloudflare R2 bucket.
 * @param file The File object from input.
 * @param key The target path/name in the bucket (e.g. 'logos/logo_123.jpg')
 * @returns The fully qualified public URL accessing that file object.
 */
export const uploadFileToR2 = async (
    file: File, 
    key: string, 
    bucketType: 'ar-assets' | 'uploads' | 'payment-proofs' = 'ar-assets'
): Promise<string> => {
    let bucketName = "";
    let publicUrlPrefix = "";

    if (bucketType === 'ar-assets') {
        bucketName = import.meta.env.VITE_R2_BUCKET_AR_ASSETS || "";
        publicUrlPrefix = import.meta.env.VITE_R2_PUBLIC_URL_AR_ASSETS || "";
    } else if (bucketType === 'uploads') {
        bucketName = import.meta.env.VITE_R2_BUCKET_UPLOADS || "";
        publicUrlPrefix = import.meta.env.VITE_R2_PUBLIC_URL_UPLOADS || "";
    } else if (bucketType === 'payment-proofs') {
        bucketName = import.meta.env.VITE_R2_BUCKET_PAYMENT_PROOFS || "";
        publicUrlPrefix = import.meta.env.VITE_R2_PUBLIC_URL_PAYMENT_PROOFS || "";
    }

    if (!bucketName || !publicUrlPrefix) {
        throw new Error(`Missing Cloudflare R2 Configuration for bucket: ${bucketType} in .env file.`);
    }

    // Convert File to Uint8Array to prevent 'readableStream.getReader' issues in browser AWS SDK v3
    const arrayBuffer = await file.arrayBuffer();
    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: new Uint8Array(arrayBuffer),
        ContentType: file.type || "application/octet-stream",
    });

    // Execute upload to S3 client
    await r2Client.send(command);
    
    // Return Public delivery distribution URL
    return `${publicUrlPrefix.replace(/\/$/, '')}/${key}`;
};

/**
 * Deletes a file from Cloudflare R2 bucket.
 * @param key The target path/name in the bucket to delete (e.g. 'logos/logo_123.jpg')
 */
export const deleteFileFromR2 = async (
    key: string, 
    bucketType: 'ar-assets' | 'uploads' | 'payment-proofs' = 'ar-assets'
): Promise<void> => {
    let bucketName = "";

    if (bucketType === 'ar-assets') {
        bucketName = import.meta.env.VITE_R2_BUCKET_AR_ASSETS || "";
    } else if (bucketType === 'uploads') {
        bucketName = import.meta.env.VITE_R2_BUCKET_UPLOADS || "";
    } else if (bucketType === 'payment-proofs') {
        bucketName = import.meta.env.VITE_R2_BUCKET_PAYMENT_PROOFS || "";
    }

    if (!bucketName) throw new Error(`Missing Cloudflare R2 Bucket name for type: ${bucketType}`);

    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
    });

    await r2Client.send(command);
};
