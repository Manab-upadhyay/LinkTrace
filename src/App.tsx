import Dashboard from "./components/routes/dashboard";
import { Login } from "./components/routes/login";
import { SignUp } from "./components/routes/signin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ApiKeysPage from "./components/routes/api-key";
import UsagePage from "./components/routes/usages";
import { AppSidebar } from "./components/layout/SideBar";
import { SidebarProvider } from "./components/ui/sidebar";
import UserProfile from "./components/user/userProfile";
import PerLinkAnalysis from "./components/routes/perLinkAnalysis";
import SetNewPassword from "./components/routes/SetNewPassword";
import { Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem("auth-storage");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
function PageLayout() {
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Area */}
        <Route element={<ProtectedRoute />}>
          <Route element={<PageLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/usage" element={<UsagePage />} />
            <Route path="/api-keys" element={<ApiKeysPage />} />
            <Route
              path="/per-link-analysis/:linkId"
              element={<PerLinkAnalysis />}
            />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Route>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
