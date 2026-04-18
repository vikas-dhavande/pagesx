import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import {
  listGoogleDriveFiles,
  uploadGoogleDriveFile,
} from "@/services/google-drive";

async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

function handleDriveFailure(error: unknown) {
  const message =
    error instanceof Error ? error.message : "Google Drive request failed.";

  return NextResponse.json({ error: message }, { status: 400 });
}

export async function GET() {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const files = await listGoogleDriveFiles();
    return NextResponse.json({ files });
  } catch (error) {
    return handleDriveFailure(error);
  }
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json(
      { error: "A file upload is required." },
      { status: 400 }
    );
  }

  try {
    const uploadedFile = await uploadGoogleDriveFile(file);
    return NextResponse.json({ file: uploadedFile }, { status: 201 });
  } catch (error) {
    return handleDriveFailure(error);
  }
}
