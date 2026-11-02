import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { auth } from "@/server/auth";

export const apiKeysRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx, input }) => {
    const apiKeys = await auth.api.listApiKeys({
      headers: ctx.headers,
    });
    return apiKeys;
  }),
});
