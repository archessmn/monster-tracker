import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import z from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const drinkBarcodesRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({ type_id: z.cuid2().optional() }))
    .query(async ({ ctx, input }) => {
      const drinkTypeBarcodes = await ctx.db.drinkTypeBarcode.findMany({
        orderBy: {
          barcode: "asc",
        },
        where: {
          type_id: input.type_id,
        },
      });
      return drinkTypeBarcodes;
    }),

  listAdmin: adminProcedure.query(async ({ ctx }) => {
    const drinkTypeBarcodes = await ctx.db.drinkTypeBarcode.findMany({
      orderBy: {
        barcode: "asc",
      },
      include: {
        type: true,
      },
    });
    return drinkTypeBarcodes;
  }),

  listMissingLinksAdmin: adminProcedure.query(async ({ ctx }) => {
    const allDrinkTypeBarcodes = await ctx.db.drinkTypeBarcode.findMany({
      orderBy: {
        barcode: "asc",
      },
      select: {
        barcode: true,
      },
    });

    const missingDrinkTypes = await ctx.db.drinkLog.findMany({
      where: {
        barcode: {
          notIn: allDrinkTypeBarcodes.map((v) => v.barcode),
        },
      },
    });

    return missingDrinkTypes;
  }),

  create: adminProcedure
    .input(
      z.object({
        barcode: z.string(),
        type_id: z.cuid2(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.drinkTypeBarcode.create({
          data: {
            barcode: input.barcode,
            type: { connect: { id: input.type_id } },
          },
        });
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code == "P2002"
        ) {
          return {
            ok: false,
            error: "Barcode must be unique",
          };
        }
        return { ok: false };
      }

      return {
        ok: true,
      };
    }),

  readAdmin: adminProcedure
    .input(z.object({ type_id: z.cuid2() }))
    .query(async ({ ctx, input }) => {
      const drinkTypeBarcode = await ctx.db.drinkTypeBarcode.findUnique({
        where: {
          id: input.type_id,
        },
        include: {
          type: true,
        },
      });

      return drinkTypeBarcode;
    }),
});
