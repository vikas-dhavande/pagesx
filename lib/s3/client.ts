import { S3Client } from "@aws-sdk/client-s3";

const s3AccessKeyId = process.env.S3_ACCESS_KEY_ID;
const s3SecretAccessKey = process.env.S3_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION || "us-east-1"; // Fallback to us-east-1 if not specified

export const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId: s3AccessKeyId!,
    secretAccessKey: s3SecretAccessKey!,
  },
});
