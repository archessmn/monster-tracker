"use client";

import { NavLink } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, type ReactNode, useContext } from "react";

type NavbarContextType = {
  pathname: string;
  onNavigate: () => void;
};

const NavbarContext = createContext<NavbarContextType | null>(null);

export function NavbarProvider(props: {
  onNavigate: () => void;
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <NavbarContext value={{ pathname, onNavigate: props.onNavigate }}>
      {props.children}
    </NavbarContext>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (!context)
    throw new Error("useNavbar must be used within a NavbarProvider");
  return context;
}

export function NavbarLink(props: { label: string; href: string }) {
  const navbarContext = useNavbar();

  return (
    <NavLink
      active={navbarContext.pathname === props.href}
      component={Link}
      href={props.href}
      onClick={navbarContext.onNavigate}
      label={props.label}
    />
  );
}
