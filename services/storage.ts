import "server-only";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
  endpoint: process.env.SUPABASE_S3_ENDPOINT,
  region: process.env.SUPABASE_S3_REGION,
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SUPABASE_S3_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // Required for Supabase S3
});

export const STORAGE_BUCKETS = {
  RESOURCES: "resources",
  AVATARS: "avatars",
  BUCKET1: "Bucket1",
} as const;

export async function uploadToStorage(
  file: File,
  bucket: string = STORAGE_BUCKETS.RESOURCES
) {
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const fileKey = `${crypto.randomUUID()}-${file.name}`;

  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: fileKey,
    Body: fileBuffer,
    ContentType: file.type,
  });

  await client.send(command);

  return {
    key: fileKey,
    bucket,
    url: `${process.env.SUPABASE_S3_ENDPOINT}/${bucket}/${fileKey}`,
  };
}

export async function getDownloadUrl(
  key: string,
  bucket: string = STORAGE_BUCKETS.RESOURCES,
  expiresIn: number = 3600
) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return await getSignedUrl(client, command, { expiresIn });
}
