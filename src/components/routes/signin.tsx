import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiService } from "@/service/apiService";
import useAuthStore from "@/store/store";
import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function validateForm() {
    if (!formData.email || !formData.password || !formData.name) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return false;
    }
    return true;
  }
  async function handleSignIn(email: string, password: string, name: string) {
    if (!validateForm()) return;

    const result = await apiService.signup(email, password, name);
    if (result.error) {
      console.error("Signup error:", result.error);
      setError(result.error);
    } else if (result.data) {
      console.log("Signup successful, user data:", result.data.user);
      useAuthStore.getState().setAuth(result.data.user);
      navigate("/", { replace: true });
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <CardDescription>
            Enter your email and Password to SignUp
          </CardDescription>
          <CardAction>
            <NavLink to="/login">
              <Button variant="link">Log In</Button>
            </NavLink>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                </div>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={() =>
              handleSignIn(formData.email, formData.password, formData.name)
            }
          >
            Sign Up
          </Button>
          {/* <Button variant="outline" className="w-full">
          Login with Google
        </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
