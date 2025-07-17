import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthContext";
import {
  Search, User, Menu, X, Heart, Calendar, FileText, Pill, TestTube, Video, LogOut, Building
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const navItems = [
    { href: "/find-doctors", label: "Find Doctors", icon: User },
    { href: "/video-consultation", label: "Video Consult", icon: Video },
    { href: "/about", label: "About Us", icon: Building },
    { href: "/medicine", label: "Medicine", icon: Pill },
    { href: "/lab-tests", label: "Lab Tests", icon: TestTube },
  ];

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007E85]">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#007E85]">MediCare</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                to={href}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-[#007E85]/10 ${
                  location.pathname === href
                    ? "text-[#007E85] bg-[#007E85]/10"
                    : "text-gray-600 hover:text-[#007E85]"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search doctors, hospitals..."
                className="w-64 pl-10"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isLoggedIn && (
              <>
                <Button variant="outline" size="sm" className="hidden md:flex" asChild>
                  <Link to="/auth">
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
                <Button size="sm" className="hidden md:flex bg-[#007E85] hover:bg-[#006A6F]" asChild>
                  <Link to="/auth">Sign Up</Link>
                </Button>
              </>
            )}

            {isLoggedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full border hover:bg-gray-100">
                    <User className="h-5 w-5 text-[#007E85]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 mt-2 shadow-lg">
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profileUpdate")}>Update Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/health-records")}>Medical Records</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/cart")}>Cart</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#007E85]/20">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search doctors, hospitals..." className="w-full pl-10" />
              </div>

              <nav className="space-y-2">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    to={href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === href
                        ? "text-[#007E85] bg-[#007E85]/10"
                        : "text-gray-600 hover:text-[#007E85] hover:bg-[#007E85]/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-2 pt-4 border-t border-[#007E85]/20">
                {!isLoggedIn ? (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/auth">Login</Link>
                    </Button>
                    <Button size="sm" className="bg-[#007E85] hover:bg-[#006A6F]" asChild>
                      <Link to="/auth">Sign Up</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
                    </Link>
                    <Link to="/profileUpdate" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">Update Profile</Button>
                    </Link>
                    <Link to="/health-records" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">Medical Records</Button>
                    </Link>
                    <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;