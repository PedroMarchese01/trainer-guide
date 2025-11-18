
import { SidebarProvider, SidebarTrigger, Sidebar as SidebarP } from "@/components/ui/sidebar";
import Sidebar from "./components/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>

      {/* Trigger no mobile */}
      <div className="bg-[#06030f]">
        <SidebarTrigger className="text-white"/>
      </div>

      <div className="grid w-full h-full bg-[#080611] grid-cols-[auto_1fr]">
        
        {/* Container correto do shadcn */}
        <SidebarP>
          <Sidebar />
        </SidebarP>

        <main className="h-screen w-full">
          {children}
        </main>

      </div>
    </SidebarProvider>
  );
}