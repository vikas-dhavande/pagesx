import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, FileText, Upload } from "lucide-react";

import { signInWithGoogle } from "@/actions/auth";
import { uploadDriveFile } from "@/actions/drive";
import { SiteHeader } from "@/components/site-header";
import { isGoogleDriveAuthError } from "@/lib/google-drive/auth";
import { createClient } from "@/lib/supabase/server";
import { listGoogleDriveFiles } from "@/services/google-drive";

type DrivePageProps = {
  searchParams: Promise<{ message?: string }>;
};

function formatBytes(size?: string) {
  if (!size) {
    return "Unknown size";
  }

  const parsed = Number(size);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return "Unknown size";
  }

  const units = ["B", "KB", "MB", "GB"];
  let unitIndex = 0;
  let value = parsed;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

export default async function DrivePage({ searchParams }: DrivePageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  let files = [];
  let driveError: string | null = null;

  try {
    files = await listGoogleDriveFiles();
  } catch (error) {
    driveError = isGoogleDriveAuthError(error)
      ? error.message
      : error instanceof Error
        ? error.message
        : "Unable to reach Google Drive.";
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-20 pt-6 lg:px-10 lg:pb-28">
        <section className="rounded-[2rem] border border-[color:var(--border)] bg-white/72 p-8 shadow-[0_24px_70px_rgba(21,18,13,0.09)] backdrop-blur">
          <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
            Drive workspace
          </p>
          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-5xl">
                Google Drive is now the active file service.
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[color:var(--muted)]">
                Signed in as {user.email}. Upload files to Drive or use the
                JSON API at <code>/api/drive/files</code> for the same account.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-[rgba(255,255,255,0.86)]"
            >
              Back home
            </Link>
          </div>

          {params.message ? (
            <div className="mt-6 rounded-2xl border border-[color:var(--border)] bg-[rgba(47,106,83,0.08)] px-4 py-3 text-sm text-[color:var(--foreground)]">
              {params.message}
            </div>
          ) : null}
        </section>

        {driveError ? (
          <section className="rounded-[2rem] border border-[color:var(--border)] bg-white/72 p-8 shadow-[0_20px_60px_rgba(21,18,13,0.08)] backdrop-blur">
            <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
              Connection needed
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
              Reconnect Google Drive to start syncing files.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--muted)]">
              {driveError}
            </p>
            <form action={signInWithGoogle} className="mt-8">
              <button
                type="submit"
                className="rounded-full bg-[color:var(--accent)] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[color:var(--accent-strong)]"
              >
                Connect Google Drive
              </button>
            </form>
          </section>
        ) : (
          <section className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="rounded-[2rem] border border-[color:var(--border)] bg-white/72 p-8 shadow-[0_20px_60px_rgba(21,18,13,0.08)] backdrop-blur">
              <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
                Upload
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                Send a file directly to your Drive.
              </h2>
              <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                The upload form uses the same server-side Google Drive service
                as the API route, so the page and the endpoint stay aligned.
              </p>

              <form action={uploadDriveFile} className="mt-8 space-y-4">
                <label className="block rounded-[1.5rem] border border-dashed border-[color:var(--border)] bg-[rgba(255,255,255,0.84)] px-5 py-6 text-sm text-[color:var(--muted)]">
                  <span className="mb-3 flex items-center gap-2 font-semibold text-[color:var(--foreground)]">
                    <Upload className="h-4 w-4 text-[color:var(--accent)]" />
                    Choose file
                  </span>
                  <input
                    required
                    type="file"
                    name="file"
                    className="block w-full text-sm text-[color:var(--foreground)] file:mr-4 file:rounded-full file:border-0 file:bg-[color:var(--foreground)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[color:var(--foreground)] px-6 py-3.5 text-sm font-semibold text-white transition hover:translate-y-[-1px]"
                >
                  Upload to Google Drive
                </button>
              </form>
            </div>

            <div className="rounded-[2rem] border border-[color:var(--border)] bg-white/72 p-8 shadow-[0_20px_60px_rgba(21,18,13,0.08)] backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-[color:var(--muted)]">
                    Files
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)]">
                    Recently available in this app
                  </h2>
                </div>
                <p className="text-sm text-[color:var(--muted)]">
                  `GET /api/drive/files`
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {files.length === 0 ? (
                  <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-[rgba(255,255,255,0.82)] px-5 py-8 text-center text-[color:var(--muted)]">
                    No files yet. Upload one to verify the integration.
                  </div>
                ) : (
                  files.map((file) => (
                    <article
                      key={file.id}
                      className="flex flex-col gap-4 rounded-[1.5rem] border border-[color:var(--border)] bg-[rgba(255,255,255,0.82)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--accent)]/12 text-[color:var(--accent)]">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[color:var(--foreground)]">
                            {file.name}
                          </h3>
                          <p className="mt-1 text-sm text-[color:var(--muted)]">
                            {file.mimeType || "Unknown type"} ·{" "}
                            {formatBytes(file.size)}
                          </p>
                        </div>
                      </div>

                      <Link
                        href={
                          file.webViewLink ??
                          `https://drive.google.com/file/d/${file.id}/view`
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-white"
                      >
                        Open file
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </article>
                  ))
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
