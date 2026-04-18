import { 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectCommand 
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3/client";

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

export async function uploadFile(file: Buffer | Uint8Array, key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  try {
    const response = await s3Client.send(command);
    return { success: true, key, response };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    throw error;
  }
}

export async function getFileUrl(key: string, expiresIn: number = 3600) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn });
    return url;
  } catch (error) {
    console.error("Error getting signed URL from S3:", error);
    throw error;
  }
}

export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  try {
    await s3Client.send(command);
    return { success: true };
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw error;
  }
}
