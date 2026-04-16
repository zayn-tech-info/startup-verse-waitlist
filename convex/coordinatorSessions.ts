import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { randomTokenBase64Url, sha256Base64Url } from "./lib/coordinatorAuth";

export const createSession = mutation({
  args: { password: v.string() },
  handler: async (ctx, args) => {
    const expected = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } })
      .process?.env?.COORDINATOR_PASSWORD;
    if (!expected) {
      throw new Error(
        "Server misconfigured: COORDINATOR_PASSWORD is not set in Convex env.",
      );
    }
    if (args.password !== expected) throw new Error("Invalid password");

    const sessionToken = randomTokenBase64Url(32);
    const tokenHash = await sha256Base64Url(sessionToken);

    const createdAt = Date.now();
    const expiresAt = createdAt + 12 * 60 * 60 * 1000; // 12 hours

    await ctx.db.insert("coordinatorSessions", {
      tokenHash,
      createdAt,
      expiresAt,
    });

    return { sessionToken, expiresAt };
  },
});

