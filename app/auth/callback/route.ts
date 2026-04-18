import { NextResponse } from "next/server";

import { storeGoogleDriveTokens } from "@/lib/google-drive/auth";
import { createClient } from "@/lib/supabase/server";

function getRedirectOrigin(request: Request, fallbackOrigin: string) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";

  if (process.env.NODE_ENV !== "development" && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return fallbackOrigin;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  let next = requestUrl.searchParams.get("next") ?? "/";

  if (!next.startsWith("/")) {
    next = "/";
  }

  if (!code) {
    return NextResponse.redirect(
      new URL("/?message=Missing Google auth code.", requestUrl.origin)
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL("/?message=Google sign in failed.", requestUrl.origin)
    );
  }

  await storeGoogleDriveTokens({
    accessToken: data.session?.provider_token,
    refreshToken: data.session?.provider_refresh_token,
  });

  const redirectOrigin = getRedirectOrigin(request, requestUrl.origin);
  return NextResponse.redirect(new URL(next, redirectOrigin));
}
