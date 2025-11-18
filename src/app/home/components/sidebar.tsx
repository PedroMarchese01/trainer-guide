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
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <SidebarP
      
      className="bg-black text-white border-r border-white/10 h-full"
    >
      <SidebarHeader className="bg-black text-white border-b grid grid-cols-3">
        <h2 className="font-semibold text-lg col-span-2 mx-auto">Trainee Guide</h2>
        <SidebarTrigger className="text-white ml-auto"/>
      </SidebarHeader>

      <SidebarContent className="bg-black text-white flex flex-col gap-4">

        {/* DASHBOARD */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 mb-2">
            Dashboard
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                  prefetch
                    href="/home"
                    className={`block px-2 py-1 rounded ${
                      isActive("/home")
                        ? "bg-white text-black"
                        : "text-white"
                    }`}
                  >
                    Home
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    prefetch
                    href="/home/profile"
                    className={`block px-2 py-1 rounded ${
                      isActive("/home/profile")
                        ? "bg-white text-black"
                        : "text-white"
                    }`}
                  >
                    Perfil
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    prefetch
                    href="/home/ranking"
                    className={`block px-2 py-1 rounded ${
                      isActive("/home/ranking")
                        ? "bg-white text-black"
                        : "text-white"
                    }`}
                  >
                    Ranking
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* GUIAS E ESTUDOS */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 mb-2">
            Guias e Estudos
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    prefetch
                    href="/home/guide"
                    className={`block px-2 py-1 rounded ${
                      isActive("/home/guide")
                        ? "bg-white text-black"
                        : "text-white"
                    }`}
                  >
                    Guias
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* COMUNIDADE */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 mb-2">
            Comunidade
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    prefetch
                    href="/home/answer"
                    className={`block px-2 py-1 rounded ${
                      isActive("/home/answer")
                        ? "bg-white text-black"
                        : "text-white"
                    }`}
                  >
                    Responder Perguntas
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    prefetch
                    href="/home/ask"
                    className={`block px-2 py-1 rounded ${
                      isActive("/home/ask")
                        ? "bg-white text-black"
                        : "text-white"
                    }`}
                  >
                    Fazer Pergunta
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    prefetch
                    href="/home/questions-admin"
                    className={`block px-2 py-1 rounded ${
                      isActive("/home/questions-admin")
                        ? "bg-white text-black"
                        : "text-white"
                    }`}
                  >
                    Administração de Perguntas
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
