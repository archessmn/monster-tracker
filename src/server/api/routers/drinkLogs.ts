import z from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const drinkLogsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const drinkLogs = await ctx.db.drinkLog.findMany({
      orderBy: {
        datetime: "desc",
      },
      where: {
        user_id: ctx.session.user.id,
      },
    });
    return drinkLogs;
  }),
});
