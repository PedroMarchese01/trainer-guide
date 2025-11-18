"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarWrapper from "./components/sidebarWrapper";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <SidebarWrapper />
        <main className="flex-1 p-6 bg-gray-50 dark:bg-neutral-900">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
