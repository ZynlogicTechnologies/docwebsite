import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users,
  Calendar,
  FileText,
  ShoppingCart,
  Heart,
  TrendingUp,
  DollarSign,
  Star,
  Search,
  Filter,
  Download,
  Settings,
  Bell,
  User,
  Activity
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { 
      title: "Total Patients", 
      value: "12,345", 
      change: "+12%", 
      icon: Users, 
      color: "text-[#007E85]" 
    },
    { 
      title: "Appointments Today", 
      value: "156", 
      change: "+8%", 
      icon: Calendar, 
      color: "text-[#007E85]" 
    },
    { 
      title: "Revenue", 
      value: "₹2,45,680", 
      change: "+15%", 
      icon: DollarSign, 
      color: "text-[#007E85]" 
    },
    { 
      title: "Active Doctors", 
      value: "89", 
      change: "+3%", 
      icon: Heart, 
      color: "text-[#007E85]" 
    }
  ];

  const recentAppointments = [
    {
      id: "1",
      patient: "John Doe",
      doctor: "Dr. Sarah Johnson",
      time: "10:30 AM",
      type: "Video",
      status: "Completed"
    },
    {
      id: "2", 
      patient: "Jane Smith",
      doctor: "Dr. Michael Chen",
      time: "11:00 AM",
      type: "In-person",
      status: "In Progress"
    },
    {
      id: "3",
      patient: "Bob Wilson",
      doctor: "Dr. Emily Davis",
      time: "2:30 PM",
      type: "Video",
      status: "Scheduled"
    }
  ];

  const doctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      speciality: "Cardiology",
      patients: 245,
      rating: 4.9,
      status: "Active",
      revenue: "₹45,680"
    },
    {
      id: "2",
      name: "Dr. Michael Chen", 
      speciality: "General Medicine",
      patients: 189,
      rating: 4.8,
      status: "Active",
      revenue: "₹38,920"
    },
    {
      id: "3",
      name: "Dr. Emily Davis",
      speciality: "Pediatrics", 
      patients: 156,
      rating: 4.7,
      status: "Busy",
      revenue: "₹32,450"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
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
        </div>
      </header>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                        <p className="text-sm text-[#007E85]">{stat.change} vs last month</p>
                      </div>
                      <IconComponent className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-gray-100">
              <TabsTrigger value="overview" className="text-gray-700 data-[state=active]:bg-[#007E85] data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="appointments" className="text-gray-700 data-[state=active]:bg-[#007E85] data-[state=active]:text-white">Appointments</TabsTrigger>
              <TabsTrigger value="doctors" className="text-gray-700 data-[state=active]:bg-[#007E85] data-[state=active]:text-white">Doctors</TabsTrigger>
              <TabsTrigger value="patients" className="text-gray-700 data-[state=active]:bg-[#007E85] data-[state=active]:text-white">Patients</TabsTrigger>
              <TabsTrigger value="reports" className="text-gray-700 data-[state=active]:bg-[#007E85] data-[state=active]:text-white">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Appointments */}
                <Card className="lg:col-span-2 border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Recent Appointments</CardTitle>
                    <CardDescription className="text-gray-500">Latest appointment activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-[#007E85] text-white">
                                {appointment.patient.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-800">{appointment.patient}</p>
                              <p className="text-sm text-[#007E85]">{appointment.doctor}</p>
                              <p className="text-xs text-gray-500">{appointment.time}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={appointment.type === "Video" ? "bg-[#007E85]/10 text-[#007E85]" : "bg-[#007E85]/20 text-[#007E85]"}>
                              {appointment.type}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">{appointment.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-gray-200">
                  <CardHeader>
                    <CardTitle className="text-gray-800">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-[#007E85] hover:bg-[#006670] text-white">
                      <Users className="h-4 w-4 mr-2 text-white" />
                      Add New Doctor
                    </Button>
                    <Button className="w-full justify-start bg-white border border-gray-300 text-[#007E85] hover:bg-gray-50">
                      <Calendar className="h-4 w-4 mr-2 text-[#007E85]" />
                      Schedule Appointment
                    </Button>
                    <Button className="w-full justify-start bg-white border border-gray-300 text-[#007E85] hover:bg-gray-50">
                      <FileText className="h-4 w-4 mr-2 text-[#007E85]" />
                      Generate Report
                    </Button>
                    <Button className="w-full justify-start bg-white border border-gray-300 text-[#007E85] hover:bg-gray-50">
                      <Settings className="h-4 w-4 mr-2 text-[#007E85]" />
                      System Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="doctors" className="space-y-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-gray-800">Doctor Management</CardTitle>
                      <CardDescription className="text-gray-500">Manage doctors and their performance</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input placeholder="Search doctors..." className="pl-10 w-64 border-gray-300" />
                      </div>
                      <Button className="bg-[#007E85] hover:bg-[#006670] text-white">
                        <Users className="h-4 w-4 mr-2" />
                        Add Doctor
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {doctors.map((doctor) => (
                      <div key={doctor.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-[#007E85] text-white">
                              {doctor.name.split(' ')[1]?.[0] || 'D'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                            <p className="text-sm text-[#007E85]">{doctor.speciality}</p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Users className="h-3 w-3 mr-1" />
                              {doctor.patients} patients
                              <Star className="h-3 w-3 ml-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {doctor.rating}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800">{doctor.revenue}</p>
                          <Badge className={doctor.status === "Active" ? "bg-[#007E85]/10 text-[#007E85]" : "bg-[#007E85]/20 text-[#007E85]"}>
                            {doctor.status}
                          </Badge>
                          <div className="flex space-x-2 mt-2">
                            <Button size="sm" variant="outline" className="border-gray-300 text-[#007E85]">Edit</Button>
                            <Button size="sm" variant="outline" className="border-gray-300 text-[#007E85]">View</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-gray-800">Appointment Management</CardTitle>
                      <CardDescription className="text-gray-500">Track and manage all appointments</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" className="border-gray-300 text-[#007E85]">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" className="border-gray-300 text-[#007E85]">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-[#007E85]" />
                    <p>Appointment management interface would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patients" className="space-y-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-800">Patient Management</CardTitle>
                  <CardDescription className="text-gray-500">View and manage patient records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <User className="h-12 w-12 mx-auto mb-4 text-[#007E85]" />
                    <p>Patient management interface would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-800">Analytics & Reports</CardTitle>
                  <CardDescription className="text-gray-500">System performance and analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-[#007E85]" />
                    <p>Analytics dashboard would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;