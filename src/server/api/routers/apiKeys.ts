import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { auth } from "@/server/auth";

export const apiKeysRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const apiKeys = await auth.api.listApiKeys({
      headers: ctx.headers,
    });
    return apiKeys;
  }),
});
