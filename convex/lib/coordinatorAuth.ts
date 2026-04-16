import { QueryCtx, MutationCtx } from "../_generated/server";

function base64UrlEncode(bytes: Uint8Array): string {
  // btoa expects a binary string.
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  const base64 = btoa(binary);
  return base64.replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

export async function sha256Base64Url(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(digest));
}

export function randomTokenBase64Url(byteLength = 32): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

export async function assertValidCoordinatorSession(
  ctx: QueryCtx | MutationCtx,
  sessionToken: string,
): Promise<void> {
  const tokenHash = await sha256Base64Url(sessionToken);
  const session = await ctx.db
    .query("coordinatorSessions")
    .withIndex("by_tokenHash", (q) => q.eq("tokenHash", tokenHash))
    .unique();

  if (!session) throw new Error("Unauthorized");
  if (session.expiresAt <= Date.now()) throw new Error("Session expired");
}

