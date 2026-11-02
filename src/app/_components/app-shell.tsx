"use client";

import { AppShell, Burger, Button, Group, NavLink, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { authClient } from "@/server/auth/client";

import { ColorSchemeToggle } from "./color-scheme-toggle";
import { UserCard } from "./user-card";

export function AppLayout(props: { children: ReactNode }) {
  const pathname = usePathname();

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const queryClient = useQueryClient();

  const session = authClient.useSession();

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              hiddenFrom="sm"
              onClick={toggleMobile}
              opened={mobileOpened}
              size="sm"
            />
            <Burger
              onClick={toggleDesktop}
              opened={desktopOpened}
              size="sm"
              visibleFrom="sm"
            />
            <Text>{session.data?.session && session.data.user.name}</Text>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <NavLink
            active={pathname === "/"}
            component={Link}
            href={"/"}
            label={"Home"}
          />
          <NavLink
            active={pathname === "/account/settings"}
            component={Link}
            href={"/account/settings"}
            label={"Profile"}
          />
          <NavLink
            active={pathname === "/admin"}
            component={Link}
            href={"/admin"}
            label={"Admin"}
          />
          {!session.data?.session ? (
            <Button
              mt={"auto"}
              onClick={() => authClient.signIn.social({ provider: "github" })}
              style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
            >
              Sign In
            </Button>
          ) : (
            <UserCard
              style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
              mt={"auto"}
              variant="small"
            />
          )}
          <ColorSchemeToggle
            style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          />
        </AppShell.Navbar>
        <AppShell.Main>{props.children}</AppShell.Main>
      </AppShell>
    </QueryClientProvider>
  );
}
