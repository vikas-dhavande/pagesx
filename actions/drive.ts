'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { uploadGoogleDriveFile } from "@/services/google-drive";

export async function uploadDriveFile(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/?message=Sign in with Google to continue.");
  }

  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    redirect("/drive?message=Choose a file before uploading.");
  }

  try {
    const driveFile = await uploadGoogleDriveFile(file);

    await supabase.from("files").insert({
      uploader_id: user.id,
      file_id: driveFile.id,
      file_name: driveFile.name,
      file_url:
        driveFile.webViewLink ??
        `https://drive.google.com/file/d/${driveFile.id}/view`,
      file_type: driveFile.mimeType || "application/octet-stream",
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to upload the file to Google Drive.";

    redirect(`/drive?message=${encodeURIComponent(message)}`);
  }

  revalidatePath("/drive");
  redirect("/drive?message=Upload complete.");
}
