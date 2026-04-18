"use client";

import { useState } from "react";
import { uploadAssetAction } from "@/actions/storage";

export function StorageTestClient() {
  const [status, setStatus] = useState<string>("");
  const [isPending, setIsPending] = useState(false);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setStatus("Uploading...");

    const formData = new FormData(e.currentTarget);
    try {
      const result = await uploadAssetAction(formData);
      setStatus(`Success! File uploaded to ${result.result.bucket}/${result.result.key}`);
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <form onSubmit={handleUpload} className="mt-10 space-y-6">
        <div className="rounded-2xl border border-[color:var(--border)] bg-white p-8">
          <label className="block text-sm font-medium text-[color:var(--muted)]">
            Select File
          </label>
          <input
            type="file"
            name="file"
            required
            className="mt-4 block w-full text-sm text-[color:var(--foreground)] file:mr-4 file:rounded-full file:border-0 file:bg-[color:var(--foreground)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-[color:var(--foreground)] px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {isPending ? "Processing..." : "Upload to Supabase Storage"}
        </button>
      </form>

      {status && (
        <div className="mt-8 rounded-2xl border border-[color:var(--border)] bg-[rgba(0,0,0,0.03)] px-6 py-4 text-sm font-medium">
          {status}
        </div>
      )}
    </>
  );
}
