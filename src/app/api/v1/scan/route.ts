import { type NextRequest, NextResponse } from "next/server";
import z from "zod";

import { db } from "@/db";
import { auth } from "@/server/auth";

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("Authorization");
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 401 },
    );
  }
  const { valid, key } = await auth.api.verifyApiKey({
    body: { key: apiKey },
  });

  if (!valid) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 401 },
    );
  }

  const user = await db.user.findUniqueOrThrow({
    where: { id: key?.referenceId },
  });

  const parsedBody = z
    .object({
      barcode: z.string(),
      datetime: z.coerce.date(),
      location: z.string().optional(),
    })
    .safeParse(await req.json());

  if (!parsedBody.success) {
    return NextResponse.json(
      { ok: false, message: `Bad request, body: ${parsedBody.error}` },
      { status: 400 },
    );
  }

  let [latitude, longitude]: (number | undefined)[] = [undefined, undefined];

  if (parsedBody.data.location) {
    const parsedLocation = z
      .tuple([
        z.coerce.number().min(-90).max(90),
        z.coerce.number().min(-180).max(180),
      ])
      .safeParse(parsedBody.data.location.split(","));

    if (!parsedLocation.success) {
      return NextResponse.json(
        { ok: false, message: "Bad request, location" },
        { status: 400 },
      );
    }
    [latitude, longitude] = parsedLocation.data;
  }

  console.log({
    barcode: parsedBody.data.barcode,
    datetime: parsedBody.data.datetime,
    latitude: latitude,
    longitude: longitude,
  });

  const logRes = await db.drinkLog.create({
    data: {
      barcode: parsedBody.data.barcode,
      datetime: parsedBody.data.datetime,
      latitude: latitude,
      longitude: longitude,
      user: { connect: { id: user.id } },
    },
  });

  return NextResponse.json({ ok: true, data: logRes }, { status: 200 });
}
