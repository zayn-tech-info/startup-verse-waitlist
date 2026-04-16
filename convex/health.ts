import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    // In Convex, `ctx.auth.getUserIdentity()` is the canonical way to read who is calling.
    const identity = await ctx.auth.getUserIdentity();
    if (identity) return "ok (authenticated)";
    return "ok (unauthenticated)";
  },
});

