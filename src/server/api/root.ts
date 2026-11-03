import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { apiKeysRouter } from "./routers/apiKeys";
import { drinkBrandsRouter } from "./routers/drinkBrands";
import { drinkLogsRouter } from "./routers/drinkLogs";
import { drinkTypesRouter } from "./routers/drinkTypes";
import { utilRouter } from "./routers/util";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  util: utilRouter,
  apiKeys: apiKeysRouter,
  drinkBrands: drinkBrandsRouter,
  drinkLogs: drinkLogsRouter,
  drinkTypes: drinkTypesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
