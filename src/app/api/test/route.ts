import { db } from "@/db";
import { auth } from "@/server/auth";
import { NextApiRequest } from "next";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("Authorization");
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 400 },
    );
  }
  const { valid, error, key } = await auth.api.verifyApiKey({
    body: { key: apiKey },
  });

  if (!valid) {
    return NextResponse.json(
      { ok: false, message: "Unauthorized" },
      { status: 400 },
    );
  }

  const user = await db.user.findUniqueOrThrow({
    where: { id: key?.referenceId },
  });

  console.log(user.name);

  return NextResponse.json({ ok: true }, { status: 200 });
}
