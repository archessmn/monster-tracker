"use client";

import {
  Avatar,
  Card,
  type CardProps,
  Group,
  Skeleton,
  Stack,
  Title,
} from "@mantine/core";
import { MdVerified } from "react-icons/md";

import { authClient } from "@/server/auth/client";

export function UserCard(props: CardProps & { variant?: "big" | "small" }) {
  const session = authClient.useSession();

  const big = !props.variant || props.variant == "big";

  const AVATAR_SIZE = big ? 96 : 32;
  return (
    <Card {...{ ...props, variant: undefined }}>
      <Group>
        {session.data ? (
          <Avatar src={session.data.user.image} size={AVATAR_SIZE} />
        ) : (
          <Skeleton
            height={AVATAR_SIZE}
            width={AVATAR_SIZE}
            radius={AVATAR_SIZE}
          />
        )}
        <Stack gap={0}>
          <Title order={big ? 1 : 5}>{session.data?.user.name}</Title>
          <Group gap={8}>
            <Title
              order={big ? 3 : 6}
              c={"dimmed"}
              style={{ width: "fit-content" }}
            >
              {session.data?.user.email}
            </Title>
            {big && <MdVerified size={24} color="#2a2" />}
          </Group>
        </Stack>
      </Group>
    </Card>
  );
}
