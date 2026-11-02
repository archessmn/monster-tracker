"use client";

import { authClient } from "@/server/auth/client";
import { Stack, Title } from "@mantine/core";

export default function Home() {
  const session = authClient.useSession();

  return (
    <Stack>
      <div style={{ display: "grid", placeItems: "center" }}>
        <Title>Monster Tracker</Title>
      </div>
    </Stack>
  );
}
