import Link from "next/link";

const navigation = [
  { href: "/#features", label: "Features" },
  { href: "/#process", label: "Process" },
  { href: "/drive", label: "Drive" },
  { href: "/chat", label: "Chat" },
];

export function SiteHeader() {
  return (
    <header className="relative z-20">
      <div className="flex items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-white/70 text-sm font-semibold tracking-[0.24em] text-[color:var(--accent)] shadow-[0_12px_30px_rgba(0,0,0,0.04)] backdrop-blur">
            PX
          </span>
          <div className="space-y-0.5">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--muted)]">
              PagesX
            </p>
            <p className="text-sm text-[color:var(--foreground)]">
              Crafted web experiences
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-[color:var(--muted)] md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[color:var(--foreground)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/drive"
          className="rounded-full bg-[color:var(--accent)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(0,0,0,0.1)] transition hover:bg-[color:var(--accent-strong)]"
        >
          Open Drive
        </Link>
      </div>
    </header>
  );
}
