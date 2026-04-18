"use server";

import { revalidatePath } from "next/cache";
import { uploadToStorage, STORAGE_BUCKETS } from "@/services/storage";
import { createClient } from "@/lib/supabase/server";

export async function uploadAssetAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    throw new Error("No file uploaded");
  }

  try {
    const result = await uploadToStorage(file, STORAGE_BUCKETS.RESOURCES);

    // Also log in the files table for internal tracking
    await supabase.from("files").insert({
      uploader_id: user.id,
      file_id: result.key,
      file_name: file.name,
      file_url: result.url,
      file_type: file.type || "application/octet-stream",
    });

    revalidatePath("/drive"); // Revalidate if shown there
    return { success: true, result };
  } catch (error) {
    console.error("Storage upload error:", error);
    throw new Error("Failed to upload to storage");
  }
}
