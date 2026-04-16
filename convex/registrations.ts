import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    fullname: v.string(),
    email: v.string(),
    whatsapp: v.string(),
    institution: v.string(),
    role: v.string(),
    building: v.string(),
    source: v.string(),
    hope: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Always check identity if auth is configured; for anonymous users this
    // typically returns null/undefined.
    const identity = await ctx.auth.getUserIdentity();

    const existing = await ctx.db
      .query("registrations")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existing) {
      return {
        ok: true,
        alreadyRegistered: true,
        registrationId: existing._id,
      };
    }

    const registrationId = await ctx.db.insert("registrations", {
      fullname: args.fullname,
      email: args.email,
      whatsapp: args.whatsapp,
      institution: args.institution,
      role: args.role,
      building: args.building,
      source: args.source,
      hope: args.hope,
      createdAt: Date.now(),
      authTokenIdentifier: identity?.tokenIdentifier,
    });

    return {
      ok: true,
      alreadyRegistered: false,
      registrationId,
    };
  },
});

// Helpful for admin/debug: fetch the first registration for an email.
export const getByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db
      .query("registrations")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();
  },
});

