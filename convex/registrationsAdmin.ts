import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { query } from "./_generated/server";
import { assertValidCoordinatorSession } from "./lib/coordinatorAuth";

export const listPaginated = query({
  args: {
    sessionToken: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    await assertValidCoordinatorSession(ctx, args.sessionToken);

    return await ctx.db
      .query("registrations")
      .order("desc")
      .paginate(args.paginationOpts);
  },
});

