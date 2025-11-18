"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "./components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex">
        <aside>
          <Sidebar />
        </aside>

        <div className="flex-1">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
