import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "general_user",
  });

  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
    role: "general_user",
  });

  const handleLogin = async () => {
  try {
    if (loginData.role === "admin") {
      // Mock admin login (hardcoded credentials check)
      if (
        loginData.email === "admin@docapp.com" &&
        loginData.password === "admin123"
      ) {
        const mockAdmin = {
          id: 0,
          username: "Admin",
          email: "admin@docapp.com",
          role: "admin",
        };
        if (setUser) setUser(mockAdmin);
        navigate("/admin-dashboard");
      } else {
        throw new Error("Invalid admin credentials");
      }
      return;
    }

    // Real API login for doctor and general_user
    const res = await fetch("https://landing.docapp.co.in/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(loginData),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    if (setUser) {
      setUser({ ...data.user, role: loginData.role.toLowerCase() });
    }

    // Navigate based on role
    if (loginData.role === "doctor") {
      navigate("/doctor-dashboard");
    } else {
      navigate("/dashboard");
    }
  } catch (err: any) {
    alert("Login failed: " + err.message);
  }
};


  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const res = await fetch("https://landing.docapp.co.in/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      alert("Account created! Please login.");
    } catch (err: any) {
      alert("Signup failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}>
                <CardHeader className="text-center pb-4">
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Login to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Role</Label>
                    <select
                      value={loginData.role}
                      onChange={(e) => setLoginData({ ...loginData, role: e.target.value })}
                      className="w-full p-2 border rounded"
                    >
                      <option value="general_user">General User</option>
                      <option value="doctor">Doctor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-[#007E85] text-white">
                    Login
                  </Button>
                </CardContent>
              </form>
            </TabsContent>

            {/* SIGN UP */}
            <TabsContent value="signup">
              <form onSubmit={(e) => {
                e.preventDefault();
                handleSignup();
              }}>
                <CardHeader className="text-center pb-4">
                  <CardTitle>Create Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Label>Full Name</Label>
                  <Input
                    value={signupData.username}
                    onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
                  />
                  <Label>Email</Label>
                  <Input
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  />
                  <Label>Phone</Label>
                  <Input
                    value={signupData.phone_number}
                    onChange={(e) => setSignupData({ ...signupData, phone_number: e.target.value })}
                  />
                  <Label>Role</Label>
                  <select
                    value={signupData.role}
                    onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="general_user">General User</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  />
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  />
                  <Button type="submit" className="w-full bg-[#007E85] text-white">
                    Sign Up
                  </Button>
                </CardContent>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
