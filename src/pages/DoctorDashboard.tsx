import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SettingsSupport from "@/components/SettingsSupport";
import ViewAppointments from "@/components/ViewAppointments";
import ConsultPatients from "@/components/ConsultPatients";
import WritePrescription from "@/components/WritePrescription";
import AccessPatientHistory from "@/components/AccessPatientHistory";
import DoctorDashboardSummary from "@/components/DoctorDashboardSummary";
import ManageUsers from "@/components/ManageUsers";
import DoctorProfile from "@/components/DoctorProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, FileText, Heart } from "lucide-react";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "appointments" | "patients" | "history">("dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-[#007E85] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  DR
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#007E85]">Welcome, Dr. John Doe</h1>
                  <p className="text-[#007E85]">Your Doctor Dashboard - Last Login: 12:30 PM IST, Jul 09, 2025</p>
                </div>
              </div>
              <SettingsSupport onLogout={handleLogout} />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6 flex space-x-4">
            <Button
              variant={activeTab === "dashboard" ? "default" : "outline"}
              onClick={() => setActiveTab("dashboard")}
            >
              <Heart className="h-4 w-4 mr-2" /> Dashboard
            </Button>
            <Button
              variant={activeTab === "appointments" ? "default" : "outline"}
              onClick={() => setActiveTab("appointments")}
            >
              <Calendar className="h-4 w-4 mr-2" /> Appointments
            </Button>
            <Button
              variant={activeTab === "patients" ? "default" : "outline"}
              onClick={() => setActiveTab("patients")}
            >
              <Users className="h-4 w-4 mr-2" /> Patients
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "outline"}
              onClick={() => setActiveTab("history")}
            >
              <FileText className="h-4 w-4 mr-2" /> History
            </Button>
          </div>

          {/* Content Area */}
          {activeTab === "dashboard" && (
            <DoctorDashboardSummary />
          )}
          {activeTab === "appointments" && (
            <ViewAppointments />
          )}
          {activeTab === "patients" && (
            <ConsultPatients />
          )}
          {activeTab === "history" && (
            <AccessPatientHistory />
          )}

          {/* Additional Sections */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <ManageUsers />
            <DoctorProfile />
          </div>
        </div>
      </div>

    </div>
  );
};

export default DoctorDashboard;