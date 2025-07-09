import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Heart, Users, Calendar, DollarSign } from "lucide-react";
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#007E85]">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">MediCare Admin</h1>
              <p className="text-sm text-[#007E85]">Healthcare Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="border-gray-300">
              <Bell className="h-4 w-4 mr-2 text-[#007E85]" />
              Notifications
            </Button>
            <Avatar>
              <AvatarFallback className="bg-[#007E85] text-white">AD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-gray-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <p className="text-sm text-[#007E85]">{stat.change} vs last month</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-gray-100">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="doctors">Doctors</TabsTrigger>
            <TabsTrigger value="patients">Patients</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="emergency">Emergency Partners</TabsTrigger>
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
