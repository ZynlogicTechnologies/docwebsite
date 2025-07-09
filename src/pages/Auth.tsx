import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Phone, Mail } from "lucide-react";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // Mock credentials
  const MOCK_CREDENTIALS = [
    {
      email: "premmekiri22@gmail.com",
      password: "prem@2002",
      redirectTo: "/dashboard",
      role: "user",
    },
    {
      email: "admin@gmail.com",
      password: "admin@123",
      redirectTo: "/admin-dashboard",
      role: "admin",
    },
    {
      email: "hospital@gmail.com",
      password: "hospital@123",
      redirectTo: "/hospital-dashboard",
      role: "hospital",
    },
    {
      email: "doctor@gmail.com",
      password: "doctor@123",
      redirectTo: "/doctor-dashboard",
      role: "doctor",
    },
  ];

  const handleLogin = () => {
    const user = MOCK_CREDENTIALS.find(
      (cred) => cred.email === loginData.email && cred.password === loginData.password
    );

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", user.role);
      alert("Login successful!");
      navigate(user.redirectTo);
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#007E85]">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtmGKUkkbFQtXTPCWPiudoEEzT2301MdDuvg&s"
                alt="MediCare Logo"
                className="h-6 w-6"
              />
            </div>
            <span className="text-2xl font-bold text-gray-800">MediCare</span>
          </Link>
          <p className="text-[#007E85] mt-2">Your trusted healthcare companion</p>
        </div>

        <Card className="border-gray-200 shadow-lg">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" className="data-[state=active]:bg-[#007E85] data-[state=active]:text-white">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-[#007E85] data-[state=active]:text-white">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* LOGIN FORM */}
            <TabsContent value="login">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-gray-800">Welcome Back</CardTitle>
                  <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email or Phone</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter email or phone number"
                        className="pl-10"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pr-10"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm">Remember me</Label>
                    </div>
                    <Link to="/forgot-password" className="text-sm text-[#007E85] hover:underline">
                      Forgot Password?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full bg-[#007E85] hover:bg-[#006670] text-white">
                    Login
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <button className="text-[#007E85] hover:underline">Sign up</button>
                    </p>
                  </div>
                </CardContent>
              </form>
            </TabsContent>

            {/* SIGNUP FORM */}
            <TabsContent value="signup">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Account created successfully!");
                  // handleSignup(); // optional: if you add signup logic
                }}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-gray-800">Create Account</CardTitle>
                  <CardDescription>Join MediCare for better healthcare experience</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signupData.name}
                      onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        value={signupData.email}
                        onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="pl-10"
                        value={signupData.phone}
                        onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pr-10"
                        value={signupData.password}
                        onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link to="/terms" className="text-[#007E85] hover:underline">Terms & Conditions</Link> and{" "}
                      <Link to="/privacy" className="text-[#007E85] hover:underline">Privacy Policy</Link>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-[#007E85] hover:bg-[#006670] text-white">
                    Create Account
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      Already have an account?{" "}
                      <button className="text-[#007E85] hover:underline">Login</button>
                    </p>
                  </div>
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
