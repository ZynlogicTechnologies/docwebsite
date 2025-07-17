import { useEffect, useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
import ViewAppointments from "@/components/ViewAppointments";
import ConsultPatients from "@/components/ConsultPatients";
import AccessPatientHistory from "@/components/AccessPatientHistory";
import DoctorDashboardSummary from "@/components/DoctorDashboardSummary";
import ManageUsers from "@/components/ManageUsers";
import DoctorProfile from "@/components/DoctorProfile";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/AuthContext";
import { Calendar, Users, FileText, Heart } from "lucide-react";
import { MenuVertical } from "@/components/ui/VerticalDropdownMenu";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "appointments" | "patients" | "history"
  >("dashboard");

  const navigate = useNavigate();
  const { user } = useAuth();
  const [doctorData, setDoctorData] = useState<any>(null);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/auth");
  };

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const res = await fetch("https://landing.docapp.co.in/api/auth/get-user-data", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data?.userData) setDoctorData(data.userData);
      } catch (error) {
        console.error("Failed to fetch doctor data:", error);
      }
    };

    fetchDoctorData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-[#007E85] flex items-center justify-center text-white font-bold">
                DR
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  Welcome, Dr. {doctorData?.username || "Loading..."}
                </h1>
                <p className="text-xs text-gray-500">{doctorData?.email}</p>
                <p className="text-xs text-gray-500">Role: {doctorData?.role}</p>
                {doctorData?.specialization && (
                  <p className="text-xs text-gray-500">
                    Specialization: {doctorData.specialization}
                  </p>
                )}
              </div>
            </div>

  <MenuVertical
  title="Settings"
  menuItems={[
    { label: "Update Profile", href: "/doctor-profile-update" },
    { label: "Set Availability", href: "/set-Availability" },
    { label: "Preferences", href: "#" },
    { label: "Notifications", href: "#" },
    { label: "Logout", onClick: handleLogout },
  ]}
/>
          </div>

          {/* Tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {[ 
              { key: "dashboard", icon: Heart, label: "Dashboard" },
              { key: "appointments", icon: Calendar, label: "Appts" },
              { key: "patients", icon: Users, label: "Patients" },
              { key: "history", icon: FileText, label: "History" },
            ].map(({ key, icon: Icon, label }) => (
              <Button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center text-xs py-2 px-3 rounded-md transition-colors min-w-[90px] justify-center ${
                  activeTab === key
                    ? "bg-[#007E85] text-white hover:bg-[#006A6F]"
                    : "border border-[#007E85]/20 text-[#007E85] bg-white hover:bg-[#007E85]/10 hover:text-[#006A6F]"
                }`}
              >
                <Icon className="h-4 w-4 mr-1" /> {label}
              </Button>
            ))}
          </div>

          {/* Content */}
          <div className="mb-6">
            {activeTab === "dashboard" && <DoctorDashboardSummary />}
            {activeTab === "appointments" && <ViewAppointments />}
            {activeTab === "patients" && <ConsultPatients />}
            {activeTab === "history" && <AccessPatientHistory />}
          </div>

          {/* Bottom Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ManageUsers />
            <DoctorProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;