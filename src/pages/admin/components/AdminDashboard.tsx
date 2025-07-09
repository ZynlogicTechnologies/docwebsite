import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Heart, Users, Calendar, DollarSign, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Tabs
import OverviewTab from "./OverviewTab";
import AppointmentsTab from "./AppointmentsTab";
import DoctorsTab from "./DoctorsTab";
import PatientsTab from "./PatientsTab";
import ReportsTab from "./ReportsTab";
import ContentManagementTab from "./ContentManagementTab";
import EmergencyPartnersTab from "./EmergencyPartnersTab";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Patients",
      value: "12,345",
      change: "+12%",
      icon: Users,
      color: "text-[#007E85]",
    },
    {
      title: "Appointments Today",
      value: "156",
      change: "+8%",
      icon: Calendar,
      color: "text-[#007E85]",
    },
    {
      title: "Revenue",
      value: "₹2,45,680",
      change: "+15%",
      icon: DollarSign,
      color: "text-[#007E85]",
    },
    {
      title: "Active Doctors",
      value: "89",
      change: "+3%",
      icon: Heart,
      color: "text-[#007E85]",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-[#007E85]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#007E85]">
              <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">MediCare Admin</h1>
              <p className="text-xs sm:text-sm text-[#007E85]/70">Healthcare Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              size="sm"
              className="border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-4"
            >
              <Bell className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Notifications
            </Button>
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
              <AvatarFallback className="bg-[#007E85] text-white text-xs sm:text-sm">AD</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              className="border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10 text-xs sm:text-sm px-2 sm:px-4"
              onClick={handleLogout}
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-[#007E85]/20">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-[#007E85]/70">{stat.title}</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs sm:text-sm text-[#007E85]">{stat.change} vs last month</p>
                    </div>
                    <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
         <TabsList className="flex flex-wrap gap-2 bg-transparent p-0" style={{ marginBottom: '50px' }}>

            <TabsTrigger
              value="overview"
              className="flex-1 min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm py-1.5 sm:py-2 px-1 sm:px-4 text-[#007E85] data-[state=active]:bg-[#007E85]/10 data-[state=active]:text-[#007E85] rounded-md whitespace-nowrap"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="appointments"
              className="flex-1 min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm py-1.5 sm:py-2 px-1 sm:px-4 text-[#007E85] data-[state=active]:bg-[#007E85]/10 data-[state=active]:text-[#007E85] rounded-md whitespace-nowrap"
            >
              Appointments
            </TabsTrigger>
            <TabsTrigger
              value="doctors"
              className="flex-1 min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm py-1.5 sm:py-2 px-1 sm:px-4 text-[#007E85] data-[state=active]:bg-[#007E85]/10 data-[state=active]:text-[#007E85] rounded-md whitespace-nowrap"
            >
              Doctors
            </TabsTrigger>
            <TabsTrigger
              value="patients"
              className="flex-1 min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm py-1.5 sm:py-2 px-1 sm:px-4 text-[#007E85] data-[state=active]:bg-[#007E85]/10 data-[state=active]:text-[#007E85] rounded-md whitespace-nowrap"
            >
              Patients
            </TabsTrigger>
            <TabsTrigger
              value="reports"
              className="flex-1 min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm py-1.5 sm:py-2 px-1 sm:px-4 text-[#007E85] data-[state=active]:bg-[#007E85]/10 data-[state=active]:text-[#007E85] rounded-md whitespace-nowrap"
            >
              Reports
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="flex-1 min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm py-1.5 sm:py-2 px-1 sm:px-4 text-[#007E85] data-[state=active]:bg-[#007E85]/10 data-[state=active]:text-[#007E85] rounded-md whitespace-nowrap"
            >
              Content
            </TabsTrigger>
            <TabsTrigger
              value="emergency"
              className="flex-1 min-w-[80px] sm:min-w-[100px] text-xs sm:text-sm py-1.5 sm:py-2 px-1 sm:px-4 text-[#007E85] data-[state=active]:bg-[#007E85]/10 data-[state=active]:text-[#007E85] rounded-md whitespace-nowrap"
            >
              Emergency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview"><OverviewTab /></TabsContent>
          <TabsContent value="appointments"><AppointmentsTab /></TabsContent>
          <TabsContent value="doctors"><DoctorsTab /></TabsContent>
          <TabsContent value="patients"><PatientsTab /></TabsContent>
          <TabsContent value="reports"><ReportsTab /></TabsContent>
          <TabsContent value="content"><ContentManagementTab /></TabsContent>
          <TabsContent value="emergency"><EmergencyPartnersTab /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;