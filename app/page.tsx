import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Layers3,
  Rocket,
  Sparkles,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";

const featureCards = [
  {
    title: "A clear first impression",
    description:
      "Strong copy, visual hierarchy, and calls to action that make the landing page feel intentional from the first scroll.",
    icon: Sparkles,
  },
  {
    title: "Built for fast iteration",
    description:
      "Reusable sections and clean component structure so the home page can grow into a full product site without a rewrite.",
    icon: Layers3,
  },
  {
    title: "Ready to launch",
    description:
      "Responsive layout, accessible navigation, and polished styling that work on desktop and mobile from day one.",
    icon: Rocket,
  },
];

const stats = [
  { value: "01", label: "Responsive header and navigation" },
  { value: "02", label: "Focused hero section for your main pitch" },
  { value: "03", label: "Feature blocks to explain your value" },
];

export default function Page() {
  return (
    <div id="top" className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,_rgba(54,125,96,0.22),_transparent_68%)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,_rgba(197,143,76,0.18),_transparent_68%)] blur-3xl" />
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(21,18,13,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(21,18,13,0.06) 1px, transparent 1px)",
            backgroundSize: "min(6vw, 72px) min(6vw, 72px)",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.75), transparent 82%)",
          }}
        />
      </div>

      <SiteHeader />

      <main className="relative z-10">
        <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:pb-28 lg:pt-16">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/70 px-4 py-2 text-sm text-[color:var(--muted)] shadow-[0_10px_25px_rgba(21,18,13,0.06)] backdrop-blur">
              <BadgeCheck className="h-4 w-4 text-[color:var(--accent)]" />
              Home page refresh for the PagesX site
            </div>

            <h1 className="mt-8 max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-[color:var(--foreground)] sm:text-6xl lg:text-7xl">
              Build a homepage that feels sharp, modern, and ready to ship.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--muted)] sm:text-xl">
              This landing page gives your project a stronger entry point with
              a real header, a focused hero, and section blocks that explain
              what your site does without feeling generic.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="#features"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--foreground)] px-6 py-3.5 text-sm font-semibold text-white transition hover:translate-y-[-1px]"
              >
                Explore the home page
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#process"
                className="inline-flex items-center justify-center rounded-full border border-[color:var(--border)] bg-white/65 px-6 py-3.5 text-sm font-semibold text-[color:var(--foreground)] backdrop-blur transition hover:bg-white"
              >
                View structure
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-[2rem] border border-[color:var(--border)] bg-white/68 p-6 shadow-[0_30px_80px_rgba(21,18,13,0.12)] backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-[color:var(--border)] pb-5">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--muted)]">
                    Homepage Preview
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-[color:var(--foreground)]">
                    PagesX landing experience
                  </h2>
                </div>
                <div className="rounded-full border border-[color:var(--border)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--accent)]">
                  Live layout
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
                  The page is structured to help visitors understand your brand,
                  your offering, and the next action within a few seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-[color:var(--muted)]">
                Features
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">
                A clean homepage foundation you can keep building on.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[color:var(--muted)]">
              Instead of a placeholder splash screen, the homepage now has a
              proper story arc: introduction, value, structure, and a clear next
              step.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featureCards.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-[1.75rem] border border-[color:var(--border)] bg-white/72 p-7 shadow-[0_18px_50px_rgba(21,18,13,0.08)] backdrop-blur"
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
          className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28"
        >
          <div className="grid gap-8 rounded-[2rem] border border-[color:var(--border)] bg-[rgba(255,255,255,0.68)] p-8 shadow-[0_30px_80px_rgba(21,18,13,0.1)] backdrop-blur lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-[color:var(--muted)]">
                Process
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[color:var(--foreground)] sm:text-4xl">
                Header first, then the message, then the proof.
              </h2>
            </div>

            <div className="grid gap-4">
              <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/70 px-5 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  Step 01
                </p>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                  A simple header gives the site a recognizable frame and makes
                  navigation feel complete right away.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/70 px-5 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  Step 02
                </p>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                  The hero section states the purpose of the site with stronger
                  copy and action buttons instead of abstract animation alone.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[color:var(--border)] bg-white/70 px-5 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--accent)]">
                  Step 03
                </p>
                <p className="mt-3 text-base leading-7 text-[color:var(--muted)]">
                  Feature sections turn the page into a usable starting point for
                  the rest of your marketing or product content.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-7xl px-6 pb-24 lg:px-10 lg:pb-32"
        >
          <div className="rounded-[2.25rem] bg-[color:var(--foreground)] px-8 py-10 text-white lg:px-10 lg:py-12">
            <p className="text-sm uppercase tracking-[0.28em] text-white/55">
              Contact
            </p>
            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                  Your project now has a homepage with a complete header and a
                  stronger visual structure.
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
                  Use this as the base for adding more sections, linking real
                  pages, or connecting the content to your product and brand.
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
