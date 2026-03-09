import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/SideBar";

export function PageLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <main className="flex-1 min-h-0 overflow-y-scroll p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
