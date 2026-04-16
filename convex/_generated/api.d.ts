/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as coordinatorSessions from "../coordinatorSessions.js";
import type * as health from "../health.js";
import type * as lib_coordinatorAuth from "../lib/coordinatorAuth.js";
import type * as registrations from "../registrations.js";
import type * as registrationsAdmin from "../registrationsAdmin.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  coordinatorSessions: typeof coordinatorSessions;
  health: typeof health;
  "lib/coordinatorAuth": typeof lib_coordinatorAuth;
  registrations: typeof registrations;
  registrationsAdmin: typeof registrationsAdmin;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
