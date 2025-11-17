"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Rotas que NÃO devem mostrar sidebar
  const noSidebar = ["/login", "/signup", "/"];

  // Se for login ou signup → NÃO mostra sidebar
  if (noSidebar.includes(pathname)) {
    return <>{children}</>;
  }

  // Sidebar só aparece em rotas que começam com /home
  const isHomeRoute = pathname.startsWith("/home");

  if (isHomeRoute) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    );
  }

  // Qualquer outra rota → sem sidebar
  return <>{children}</>;
}