import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import z from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const drinkBrandsRouter = createTRPCRouter({
  list: protectedProcedure.query(async ({ ctx }) => {
    const drinkBrands = await ctx.db.drinkBrand.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return drinkBrands;
  }),

  create: adminProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.drinkBrand.create({
          data: {
            name: input.name,
            slug: input.slug,
          },
        });
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code == "P2002"
        ) {
          return {
            ok: false,
            error: "Slug must be unique",
          };
        }
        return { ok: false };
      }

      return {
        ok: true,
      };
    }),

  readAdmin: adminProcedure
    .input(z.object({ brand_id_or_slug: z.string() }))
    .query(async ({ ctx, input }) => {
      let drinkBrand = await ctx.db.drinkBrand.findUnique({
        where: {
          id: input.brand_id_or_slug,
        },
        include: {
          _count: true,
          types: true,
        },
      });

      if (!drinkBrand) {
        drinkBrand = await ctx.db.drinkBrand.findUnique({
          where: {
            slug: input.brand_id_or_slug,
          },
          include: {
            _count: true,
            types: true,
          },
        });
      }

      return drinkBrand;
    }),
});
