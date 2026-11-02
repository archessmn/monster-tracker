import { Stack } from "@mantine/core";
import Link from "next/link";

export default function AdminPage() {
  return (
    <Stack>
      <Link href={"/admin/drinks/brands"}>Drink Brands</Link>
      <Link href={"/admin/drinks/types"}>Drink Types</Link>
    </Stack>
  );
}
