import UserDashboard from "./components/routes/Dashboard";
import { LoginPage } from "./components/routes/Login";
import { SidebarProvider } from "./components/ui/sidebar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ApiKeysPage from "./components/routes/Api-key";
import UsagePage from "./components/routes/Usages";
import { AppSidebar } from "./components/layout/SideBar";
import UserProfile from "./components/user/userProfile";
import PerLinkAnalysis from "./components/routes/PerLinkAnalysis";
import SetNewPassword from "./components/routes/SetNewPassword";
import ApiDocs from "./components/routes/ApiDocs";
import { InputOTPForm } from "./components/routes/Otp";
import LandingPage from "./components/routes/LandingPage";
import { Outlet } from "react-router-dom";
import { SignUp } from "./components/routes/Signin";

function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem("auth-storage");

  return isAuthenticated ? <Outlet /> : <Navigate to="/landing" replace />;
}

function PublicOnlyRoute() {
  const isAuthenticated = !!localStorage.getItem("auth-storage");

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
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
            <Route path="/" element={<UserDashboard />} />
            <Route path="/usage" element={<UsagePage />} />
            <Route path="/api-keys" element={<ApiKeysPage />} />
            <Route
              path="/per-link-analysis/:linkId"
              element={<PerLinkAnalysis />}
            />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/api-docs" element={<ApiDocs />} />
          </Route>
        </Route>

        {/* Public-only Routes (redirect to dashboard if authenticated) */}
        <Route element={<PublicOnlyRoute />}>

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Other public routes (accessible to everyone) */}
         <Route path="/landing" element={<LandingPage />} />
        <Route path="/input-otp" element={<InputOTPForm />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
