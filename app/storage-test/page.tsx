import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { StorageTestClient } from "./storage-test-client";

export default async function StorageTestPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-20">
        <h1 className="text-4xl font-semibold tracking-tight">Storage Test</h1>
        <p className="mt-4 text-[color:var(--muted)]">
          Verify the Supabase Storage S3 connection by uploading a small file.
        </p>
        <StorageTestClient />
      </main>
    </div>
  );
}
