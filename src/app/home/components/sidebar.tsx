"use client";

import Link from "next/link";
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
          <SidebarGroupLabel className="text-gray-300">
            Navegação
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/home/profile">
                    <p>Perfil</p>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/home/guide">
                    <p>Guias</p>
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
