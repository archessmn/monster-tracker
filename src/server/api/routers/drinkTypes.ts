import z from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const drinkTypesRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const drinkTypes = await ctx.db.drinkType.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return drinkTypes;
  }),

  listAdmin: adminProcedure.query(async ({ ctx }) => {
    const drinkTypes = await ctx.db.drinkType.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        brand: true,
      },
    });
    return drinkTypes;
  }),

  create: adminProcedure
    .input(
      z.object({
        name: z.string(),
        caffeine_100ml: z.number().min(0),
        total_ml: z.number().min(0),
        brand_id: z.cuid2(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.drinkType.create({
        data: {
          name: input.name,
          caffeine_100ml: input.caffeine_100ml,
          total_ml: input.total_ml,
          brand: { connect: { id: input.brand_id } },
        },
      });

      return {
        ok: true,
      };
    }),

  readAdmin: adminProcedure
    .input(z.object({ type_id: z.cuid2() }))
    .query(async ({ ctx, input }) => {
      const drinkType = await ctx.db.drinkType.findUnique({
        where: {
          id: input.type_id,
        },
        include: {
          barcodes: true,
          brand: true,
        },
      });

      return drinkType;
    }),
});
