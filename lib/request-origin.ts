type HeaderSource = {
  get(name: string): string | null;
};

export function getRequestOrigin(headers: HeaderSource) {
  const origin = headers.get("origin");

  if (origin) {
    return origin;
  }

  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  const protocol = headers.get("x-forwarded-proto") ?? "http";

  if (!host) {
    throw new Error("Unable to determine request origin.");
  }

  return `${protocol}://${host}`;
}
