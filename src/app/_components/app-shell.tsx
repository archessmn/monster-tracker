"use client";

import { AppShell, Burger, Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { ColorSchemeToggle } from "@/app/_components/color-scheme-toggle";
import { NavbarLink, NavbarProvider } from "@/app/_components/navbar-link";
import { UserCard } from "@/app/_components/user-card";
import { authClient } from "@/server/auth/client";

export function AppLayout(props: { children: ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile, close: closeMobile }] =
    useDisclosure();
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
        <AppShell.Header zIndex={10001}>
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
        <AppShell.Navbar p="md" zIndex={10000}>
          <NavbarProvider onNavigate={closeMobile}>
            <NavbarLink href={"/"} label={"Home"} />
            <NavbarLink href={"/map"} label={"Map"} />
            <NavbarLink href={"/account/logs"} label={"Scan History"} />
            <NavbarLink href={"/account/settings"} label={"Profile"} />
            <NavbarLink href={"/admin"} label={"Admin"} />
          </NavbarProvider>
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
