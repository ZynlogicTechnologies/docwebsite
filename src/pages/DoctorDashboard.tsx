import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ViewAppointments from "@/components/ViewAppointments";
import ConsultPatients from "@/components/ConsultPatients";
import AccessPatientHistory from "@/components/AccessPatientHistory";
import DoctorDashboardSummary from "@/components/DoctorDashboardSummary";
import ManageUsers from "@/components/ManageUsers";
import DoctorProfile from "@/components/DoctorProfile";
import { Button } from "@/components/ui/button";
import { Calendar, Users, FileText, Heart, Bell, Settings, LogOut, Menu } from "lucide-react";

const SettingsSupport = ({ onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="relative">
      {/* Hamburger Icon for Mobile, Inline with Welcome Text */}
      <div className="sm:hidden flex items-center">
        <Button
          variant="outline"
          className="w-8 h-8 p-0 flex items-center justify-center border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10 hover:text-[#006A6F] rounded-md transition-colors"
          onClick={toggleMenu}
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-10 right-0 w-32 max-w-[calc(100vw-2rem)] bg-white border border-[#007E85]/20 rounded-md shadow-lg z-10">
          <div className="flex flex-col gap-2 p-2">
            <Button
              variant="outline"
              className="w-full text-[10px] px-2 py-1 border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10 hover:text-[#006A6F] rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Bell className="h-3 w-3 mr-1" /> Notifications
            </Button>
            <Button
              variant="outline"
              className="w-full text-[10px] px-2 py-1 border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10 hover:text-[#006A6F] rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="h-3 w-3 mr-1" /> Settings
            </Button>
            <Button
              variant="outline"
              className="w-full text-[10px] px-2 py-1 border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10 hover:text-[#006A6F] rounded-md transition-colors"
              onClick={() => {
                setIsMenuOpen(false);
                onLogout();
              }}
            >
              <LogOut className="h-3 w-3 mr-1" /> Logout
            </Button>
          </div>
        </div>
      )}

      {/* Inline Buttons for Small Screens and Above */}
      <div className="hidden sm:flex flex-row gap-3">
        <Button
          variant="outline"
          className="text-xs px-3 py-1.5 border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10 hover:text-[#006A6F] rounded-md transition-colors"
        >
          <Bell className="h-4 w-4 mr-1" /> Notifications
        </Button>
        <Button
          variant="outline"
          className="text-xs px-3 py-1.5 border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10 hover:text-[#006A6F] rounded-md transition-colors"
        >
          <Settings className="h-4 w-4 mr-1" /> Settings
        </Button>
        <Button
          variant="outline"
          className="text-xs px-3 py-1.5 border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10 hover:text-[#006A6F] rounded-md transition-colors"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-1" /> Logout
        </Button>
      </div>
    </div>
  );
};

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "appointments" | "patients" | "history">("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 w-full">
        <div className="max-w-7xl mx-auto w-full">
          {/* Welcome Section */}
          <div className="mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center space-x-2 sm:space-x-3 w-full">
                <div className="h-10 w-10 sm:h-12 sm:w-12 bg-[#007E85] rounded-full flex items-center justify-center text-white text-base sm:text-lg font-bold">
                  DR
                </div>
                <div className="flex-1 flex items-center space-x-2">
                  <div>
                    <h1 className="text-lg sm:text-xl font-bold text-gray-900">Welcome, Dr. John Doe</h1>
                    <p className="text-[10px] sm:text-xs text-gray-900">Last Login: 03:24 PM IST, Jul 09, 2025</p>
                  </div>
                  <SettingsSupport onLogout={handleLogout} />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-4 sm:mb-6 flex flex-wrap gap-2 w-full">
            <Button
              className={`flex-1 min-w-[70px] sm:min-w-[90px] text-[10px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-3 rounded-md transition-colors ${
                activeTab === "dashboard"
                  ? "bg-[#007E85] text-white hover:bg-[#006A6F]"
                  : "border border-[#007E85]/20 text-[#007E85] bg-white hover:bg-[#007E85]/10 hover:text-[#006A6F]"
              } whitespace-nowrap`}
              onClick={() => setActiveTab("dashboard")}
            >
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Dashboard
            </Button>
            <Button
              className={`flex-1 min-w-[70px] sm:min-w-[90px] text-[10px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-3 rounded-md transition-colors ${
                activeTab === "appointments"
                  ? "bg-[#007E85] text-white hover:bg-[#006A6F]"
                  : "border border-[#007E85]/20 text-[#007E85] bg-white hover:bg-[#007E85]/10 hover:text-[#006A6F]"
              } whitespace-nowrap`}
              onClick={() => setActiveTab("appointments")}
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Appts
            </Button>
            <Button
              className={`flex-1 min-w-[70px] sm:min-w-[90px] text-[10px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-3 rounded-md transition-colors ${
                activeTab === "patients"
                  ? "bg-[#007E85] text-white hover:bg-[#006A6F]"
                  : "border border-[#007E85]/20 text-[#007E85] bg-white hover:bg-[#007E85]/10 hover:text-[#006A6F]"
              } whitespace-nowrap`}
              onClick={() => setActiveTab("patients")}
            >
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Patients
            </Button>
            <Button
              className={`flex-1 min-w-[70px] sm:min-w-[90px] text-[10px] sm:text-xs py-1 sm:py-1.5 px-2 sm:px-3 rounded-md transition-colors ${
                activeTab === "history"
                  ? "bg-[#007E85] text-white hover:bg-[#006A6F]"
                  : "border border-[#007E85]/20 text-[#007E85] bg-white hover:bg-[#007E85]/10 hover:text-[#006A6F]"
              } whitespace-nowrap`}
              onClick={() => setActiveTab("history")}
            >
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> History
            </Button>
          </div>

          {/* Content Area */}
          <div className="mb-4 sm:mb-6 w-full">
            {activeTab === "dashboard" && <DoctorDashboardSummary />}
            {activeTab === "appointments" && <ViewAppointments />}
            {activeTab === "patients" && <ConsultPatients />}
            {activeTab === "history" && <AccessPatientHistory />}
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
            <ManageUsers />
            <DoctorProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;