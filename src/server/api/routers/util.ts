import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const utilRouter = createTRPCRouter({
  ping: publicProcedure.query(async ({ ctx, input }) => {
    return { ok: true, msg: "pong" };
  }),
});
