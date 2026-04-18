import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Layers3,
  Rocket,
  Sparkles,
} from "lucide-react";

import { signInWithGoogle, signOut } from "@/actions/auth";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/supabase/server";

const featureCards = [
  {
    title: "Supabase handles the Google sign-in",
    description:
      "The app keeps Supabase for authentication and session cookies, then layers Google Drive access on top instead of introducing a separate auth stack.",
    icon: Sparkles,
  },
  {
    title: "Google Drive is the active file service",
    description:
      "The new Drive service lists files and uploads files on the server, replacing the old S3 path that the project was no longer using.",
    icon: Layers3,
  },
  {
    title: "There is a real workspace to test it",
    description:
      "A dedicated `/drive` route and `/api/drive/files` endpoint give you a clear place to verify uploads and expand the integration.",
    icon: Rocket,
  },
];

const stats = [
  { value: "01", label: "Supabase Google OAuth entry on the homepage" },
  { value: "02", label: "Drive API upload and file listing flow" },
  { value: "03", label: "Old AWS file path removed from active use" },
];

type HomePageProps = {
  searchParams: Promise<{ message?: string }>;
};

export default async function Page({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div
      id="top"
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(0,0,0,0.05),_transparent_68%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(0,0,0,0.03),_transparent_68%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "min(6vw, 72px) min(6vw, 72px)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent 82%)",
          }}
        />
      </div>

      <SiteHeader />

      <main className="relative z-10">
        <section className="grid gap-14 px-6 pb-20 pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:pb-28 lg:pt-16">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/70 px-4 py-2 text-sm text-[color:var(--muted)] shadow-[0_10px_25px_rgba(0,0,0,0.04)] backdrop-blur">
              <BadgeCheck className="h-4 w-4 text-[color:var(--accent)]" />
              Supabase OAuth with Google Drive is now wired in
            </div>

            <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-6xl lg:text-7xl">
              Keep Supabase for login and switch the file layer to Google Drive.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
              The homepage now starts the Google sign-in flow, the backend stores
              the provider tokens for Drive requests, and the project has a
              working Drive workspace instead of the unused AWS path.
            </p>

            {params.message ? (
              <div className="mt-6 max-w-xl rounded-2xl border border-[color:var(--border)] bg-[rgba(47,106,83,0.08)] px-4 py-3 text-sm text-[color:var(--foreground)]">
                {params.message}
              </div>
            ) : null}

            {user ? (
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/drive"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--foreground)] px-6 py-3.5 text-sm font-semibold text-white transition hover:translate-y-[-1px]"
                >
                  Open Drive workspace
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <form action={signOut}>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-full border border-[color:var(--border)] bg-white/65 px-6 py-3.5 text-sm font-semibold text-[color:var(--foreground)] backdrop-blur transition hover:bg-white sm:w-auto"
                  >
                    Sign out
                  </button>
                </form>
              </div>
            ) : (
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <form action={signInWithGoogle}>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--foreground)] px-6 py-3.5 text-sm font-semibold text-white transition hover:translate-y-[-1px] sm:w-auto"
                  >
                    Connect Google Drive
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
                <Link
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-white/65 px-6 py-3.5 text-sm font-semibold text-[color:var(--foreground)] backdrop-blur transition hover:bg-white"
                >
                  See what changed
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-[2rem] border border-[color:var(--border)] bg-white/68 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-[color:var(--border)] pb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    Integration Preview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                    PagesX + Google Drive
                  </h2>
                </div>
                <div className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  OAuth ready
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {stats.map((item) => (
                  <div
                    key={item.value}
                    className="flex items-start gap-4 rounded-3xl border border-[color:var(--border)] bg-[rgba(255,255,255,0.72)] px-4 py-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[color:var(--foreground)] text-sm font-semibold text-white">
                      {item.value}
                    </div>
                    <p className="pt-1 text-base leading-7 text-[color:var(--muted)]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[1.75rem] bg-[color:var(--foreground)] px-6 py-6 text-white">
                <p className="text-sm uppercase tracking-[0.24em] text-white/60">
                  Why this works
                </p>
                <p className="mt-3 max-w-md text-lg leading-8 text-white/86">
                  The UI and the backend now support the same flow: Google login
                  on the homepage, Drive actions in the workspace, and no active
                  dependency on the old S3 code path.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="px-6 pb-20 lg:px-10 lg:pb-28"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-[color:var(--muted)]">
                Features
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">
                The homepage now introduces the real Google Drive flow.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[color:var(--muted)]">
              Instead of leaving storage tied to unused AWS helpers, the app now
              starts with Supabase Google OAuth and points users toward the
              Drive workspace that actually matches your stack.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featureCards.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-[color:var(--border)] bg-white/72 p-7 shadow-[0_18px_50px_rgba(0,0,0,0.06)] backdrop-blur"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--accent)]/10 text-[color:var(--accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[color:var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[color:var(--muted)]">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="process"
          className="px-6 pb-20 lg:px-10 lg:pb-28"
        >
          <div className="grid gap-8 rounded-[2rem] border border-[color:var(--border)] bg-[rgba(255,255,255,0.68)] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.1)] backdrop-blur lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-[color:var(--muted)]">
                Process
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">
                Sign in with Supabase, then work with Drive.
              </h2>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/70 px-5 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  Step 01
                </p>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                  Supabase starts the Google OAuth flow and keeps the app on the
                  same session model it already used.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/70 px-5 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  Step 02
                </p>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                  The callback stores the Google provider tokens so server-side
                  Drive requests can list files and upload files for the user.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/70 px-5 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  Step 03
                </p>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                  The `/drive` route and the JSON API give you a concrete place
                  to verify the integration and build the next features on top.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="px-6 pb-24 lg:px-10 lg:pb-32"
        >
          <div className="rounded-[2.25rem] bg-[color:var(--foreground)] px-8 py-10 text-white lg:px-10 lg:py-12">
            <p className="text-sm uppercase tracking-[0.28em] text-white/55">
              Contact
            </p>
            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Your project now uses Supabase OAuth plus Google Drive instead
                  of the old AWS storage path.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
                  Use this as the base for adding folder support, richer Drive
                  metadata, or a picker flow if you want access beyond files the
                  app creates and manages.
                </p>
              </div>
              <Link
                href="#top"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[color:var(--foreground)] transition hover:bg-white/90"
              >
                Back to top
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
