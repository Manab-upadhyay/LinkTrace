import UserDashboard from "./components/routes/Dashboard";
import { LoginPage } from "./components/routes/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ApiKeysPage from "./components/routes/Api-key";
import UsagePage from "./components/routes/Usages";
import UserProfile from "./components/user/userProfile";
import PerLinkAnalysis from "./components/routes/PerLinkAnalysis";
import SetNewPassword from "./components/routes/SetNewPassword";
import ApiDocs from "./components/routes/ApiDocs";
import { InputOTPForm } from "./components/routes/Otp";
import LandingPage from "./components/routes/LandingPage";
import { SignUp } from "./components/routes/Signin";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicOnlyRoute } from "./routes/PublicOnlyRoute";
import { PageLayout } from "./routes/PageLayout";

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
