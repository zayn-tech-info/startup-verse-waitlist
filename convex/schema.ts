import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  registrations: defineTable({
    fullname: v.string(),
    email: v.string(),
    whatsapp: v.string(),
    institution: v.string(),
    role: v.string(),
    building: v.string(),
    source: v.string(),
    hope: v.optional(v.string()),
    createdAt: v.number(),

    // If the caller is authenticated, we store a stable identity fingerprint.
    // If they're not authenticated, this remains undefined.
    authTokenIdentifier: v.optional(v.string()),
  }).index("by_email", ["email"]),

  coordinatorSessions: defineTable({
    tokenHash: v.string(),
    createdAt: v.number(),
    expiresAt: v.number(),
  }).index("by_tokenHash", ["tokenHash"]),
});

