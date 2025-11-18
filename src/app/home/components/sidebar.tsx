"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar as SidebarP,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <SidebarP 
      variant="inset"
      className="bg-black text-white border-r border-white/10"
    >
      <SidebarHeader className="bg-black text-white border-b border-white/10">
        <h2 className="font-semibold text-lg">Trainee Guide</h2>
      </SidebarHeader>

      <SidebarContent className="bg-black text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 mb-4">
            Navegação
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem className="mb-1">
                <SidebarMenuButton asChild>
                  <Link
                    href="/home"
                    className={`block px-2 py-1 rounded ${
                      isActive("/home") ? "bg-white text-black" : "text-white"
                    }`}
                  >
                    Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="mb-1">
                <SidebarMenuButton asChild>
                  <Link
                    href="/home/profile"
                    className={`block px-2 py-1 rounded ${
                      isActive("/home/profile") ? "bg-white text-black" : "text-white"
                    }`}
                  >
                    Perfil
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="mb-1">
                <SidebarMenuButton asChild>
                  <Link
                    href="/home/guide"
                    className={`block px-2 py-1 rounded ${
                      isActive("/home/guide") ? "bg-white text-black" : "text-white"
                    }`}
                  >
                    Guias
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-black text-white border-t border-white/10">
        <p className="text-xs text-gray-400">© 2025 — Pedro</p>
      </SidebarFooter>
    </SidebarP>
  );
}
