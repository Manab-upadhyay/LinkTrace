import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/SideBar";
import { useState, Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";

const ChatBot = lazy(() => import("@/components/ChatBot"));

export function PageLayout() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden relative">
        <AppSidebar />
        <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
          <main className="flex-1 min-h-0 overflow-y-scroll p-4">
            <Outlet />
          </main>
        </div>

        {/* ChatBot Trigger & Component */}
        <div className="fixed bottom-6 right-6 z-[100]">
          <Button
            size="icon"
            className="w-12 h-12 rounded-full shadow-2xl hover:scale-110 transition-transform bg-primary"
            onClick={() => setIsChatOpen(!isChatOpen)}
          >
            {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
          </Button>
        </div>

        {isChatOpen && (
          <Suspense fallback={null}>
            <ChatBot />
          </Suspense>
        )}
      </div>
    </SidebarProvider>
  );
}
