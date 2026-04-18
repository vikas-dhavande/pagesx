import "server-only";

import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "google-drive-access-token";
const REFRESH_TOKEN_COOKIE = "google-drive-refresh-token";
const DEFAULT_ACCESS_TOKEN_TTL = 60 * 55;
const DEFAULT_REFRESH_TOKEN_TTL = 60 * 60 * 24 * 30;

type TokenCookieValues = {
  accessToken?: string | null;
  refreshToken?: string | null;
  accessTokenTtl?: number;
};

type GoogleTokenResponse = {
  access_token?: string;
  expires_in?: number;
  refresh_token?: string;
};

const cookieOptions = {
  httpOnly: true,
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export class GoogleDriveAuthError extends Error {}

function getGoogleOAuthCredentials() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new GoogleDriveAuthError(
      "Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET."
    );
  }

  return { clientId, clientSecret };
}

export async function storeGoogleDriveTokens({
  accessToken,
  refreshToken,
  accessTokenTtl,
}: TokenCookieValues) {
  const cookieStore = await cookies();

  if (accessToken) {
    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
      ...cookieOptions,
      maxAge: accessTokenTtl ?? DEFAULT_ACCESS_TOKEN_TTL,
    });
  }

  if (refreshToken) {
    cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
      ...cookieOptions,
      maxAge: DEFAULT_REFRESH_TOKEN_TTL,
    });
  }
}

export async function clearGoogleDriveTokens() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

async function refreshGoogleDriveAccessToken(refreshToken: string) {
  const { clientId, clientSecret } = getGoogleOAuthCredentials();

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new GoogleDriveAuthError("Unable to refresh the Google Drive token.");
  }

  const payload = (await response.json()) as GoogleTokenResponse;

  if (!payload.access_token) {
    throw new GoogleDriveAuthError(
      "Google did not return a Drive access token."
    );
  }

  await storeGoogleDriveTokens({
    accessToken: payload.access_token,
    refreshToken: payload.refresh_token ?? refreshToken,
    accessTokenTtl: payload.expires_in,
  });

  return payload.access_token;
}

export async function getGoogleDriveAccessToken(forceRefresh = false) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!forceRefresh && accessToken) {
    return accessToken;
  }

  if (!refreshToken) {
    throw new GoogleDriveAuthError("Connect Google Drive to continue.");
  }

  return refreshGoogleDriveAccessToken(refreshToken);
}

export async function googleDriveFetch(input: string, init: RequestInit = {}) {
  const runRequest = async (accessToken: string) => {
    const headers = new Headers(init.headers);
    headers.set("Authorization", `Bearer ${accessToken}`);

    return fetch(input, {
      ...init,
      headers,
      cache: "no-store",
    });
  };

  let response = await runRequest(await getGoogleDriveAccessToken());

  if (response.status !== 401) {
    return response;
  }

  response = await runRequest(await getGoogleDriveAccessToken(true));
  return response;
}

export function isGoogleDriveAuthError(
  error: unknown
): error is GoogleDriveAuthError {
  return error instanceof GoogleDriveAuthError;
}
