import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { auth } from "@/server/auth";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (
    !session ||
    !session.user ||
    !session.user.role ||
    session.user.role != "admin"
  ) {
    return notFound();
  }

  return children;
}
