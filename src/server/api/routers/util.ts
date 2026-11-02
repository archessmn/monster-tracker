import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const utilRouter = createTRPCRouter({
  ping: publicProcedure.query(async () => {
    return { ok: true, msg: "pong" };
  }),
});
