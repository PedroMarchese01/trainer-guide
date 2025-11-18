"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function SidebarWrapper() {
  const pathname = usePathname();

  // Rotas sem sidebar
  const noSidebar = ["/login", "/signup", "/"];

  if (noSidebar.includes(pathname)) {
    return null;
  }

  // Sidebar só aparece em rotas /home
  const isHome = pathname.startsWith("/home");

  if (isHome) {
    return (
      <Sidebar />
    );
  }

  return null;
}