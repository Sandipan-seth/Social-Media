"use client";

import { usePathname } from "next/navigation";
import Nav from "./navbar";

export default function NavWrapper() {
  const path = usePathname();

  if (path === "/login" || path === "/signup") return null;

  return <Nav />;
}
