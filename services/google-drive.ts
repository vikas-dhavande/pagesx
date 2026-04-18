import "server-only";

import { googleDriveFetch } from "@/lib/google-drive/auth";

const DRIVE_FILE_FIELDS =
  "files(id,name,mimeType,modifiedTime,size,webViewLink,iconLink)";
const DRIVE_UPLOAD_FIELDS =
  "id,name,mimeType,modifiedTime,size,webViewLink,iconLink";

export type GoogleDriveFile = {
  id: string;
  name: string;
  mimeType?: string;
  modifiedTime?: string;
  size?: string;
  webViewLink?: string;
  iconLink?: string;
};

type DriveFileListResponse = {
  files?: GoogleDriveFile[];
};

async function throwDriveError(response: Response) {
  let message = "Google Drive request failed.";

  try {
    const payload = (await response.json()) as {
      error?: { message?: string };
    };

    if (payload.error?.message) {
      message = payload.error.message;
    }
  } catch {
    // Ignore JSON parsing issues and use the fallback message.
  }

  throw new Error(message);
}

export async function listGoogleDriveFiles() {
  const query = new URLSearchParams({
    pageSize: "20",
    fields: DRIVE_FILE_FIELDS,
    orderBy: "modifiedTime desc",
    q: "trashed = false",
    spaces: "drive",
  });

  const response = await googleDriveFetch(
    `https://www.googleapis.com/drive/v3/files?${query.toString()}`
  );

  if (!response.ok) {
    await throwDriveError(response);
  }

  const payload = (await response.json()) as DriveFileListResponse;
  return payload.files ?? [];
}

export async function uploadGoogleDriveFile(file: File) {
  const boundary = `pagesx-${crypto.randomUUID()}`;
  const metadata = JSON.stringify({
    name: file.name,
    mimeType: file.type || "application/octet-stream",
  });

  const multipartBody = new Blob([
    `--${boundary}\r\n`,
    "Content-Type: application/json; charset=UTF-8\r\n\r\n",
    metadata,
    "\r\n",
    `--${boundary}\r\n`,
    `Content-Type: ${file.type || "application/octet-stream"}\r\n\r\n`,
    file,
    "\r\n",
    `--${boundary}--`,
  ]);

  const response = await googleDriveFetch(
    `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=${encodeURIComponent(
      DRIVE_UPLOAD_FIELDS
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": `multipart/related; boundary=${boundary}`,
      },
      body: multipartBody,
    }
  );

  if (!response.ok) {
    await throwDriveError(response);
  }

  return (await response.json()) as GoogleDriveFile;
}
