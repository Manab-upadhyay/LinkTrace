import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  LayoutDashboard,
  BarChart3,
  Key,
  LogOut,
  User,
  ChevronsUpDown,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { apiService } from "@/service/apiService";
import useAuthStore from "@/store/store";

export function AppSidebar() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleLogout = () => {
    // TODO: Call backend logout API here
    apiService
      .logout()
      .then(() => {
        // Clear local storage and any auth state
        localStorage.removeItem("auth-storage");
        // Redirect to login page
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        // Even if logout API fails, clear local storage and redirect
        localStorage.removeItem("auth-storage");
      });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between w-full">
          {/* Left side (Title) */}
          <div className="flex items-center">
            <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">
              LinkTrace
            </span>
          </div>

          {/* Right side (Trigger) */}
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/" end>
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Dashboard
                  </span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/usage">
                  <BarChart3 className="w-4 h-4" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Usage
                  </span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/api-keys">
                  <Key className="w-4 h-4" />
                  <span className="group-data-[collapsible=icon]:hidden">
                    API Keys
                  </span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER - ACCOUNT SECTION */}
      <SidebarFooter className="p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-full justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>MU</AvatarFallback>
                </Avatar>

                <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden max-w-[120px]">
                  <span className="text-sm font-medium truncate">
                    {user?.name}
                  </span>
                  <span className="text-xs text-muted-foreground truncate">
                    {user?.email}
                  </span>
                </div>
              </div>

              <ChevronsUpDown className="h-4 w-4 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" side="right" className="w-56">
            <DropdownMenuLabel>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>MU</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/usage")}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Billing
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
