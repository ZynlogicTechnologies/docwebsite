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
      color: "text-[#2E7D32]" 
    },
    { 
      title: "Appointments Today", 
      value: "156", 
      change: "+8%", 
      icon: Calendar, 
      color: "text-[#2E7D32]" 
    },
    { 
      title: "Revenue", 
      value: "₹2,45,680", 
      change: "+15%", 
      icon: DollarSign, 
      color: "text-[#2E7D32]" 
    },
    { 
      title: "Active Doctors", 
      value: "89", 
      change: "+3%", 
      icon: Heart, 
      color: "text-[#2E7D32]" 
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
    <div className="min-h-screen bg-[#C8E6C9]">
      {/* Admin Header */}
      <header className="bg-white border-b border-[#C8E6C9]/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2E7D32]">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#424242]">MediCare Admin</h1>
                <p className="text-sm text-[#2E7D32]">Healthcare Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-[#C8E6C9]">
                <Bell className="h-4 w-4 mr-2 text-[#2E7D32]" />
                Notifications
              </Button>
              <Avatar>
                <AvatarFallback className="bg-[#2E7D32] text-white">AD</AvatarFallback>
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
                <Card key={index} className="border-[#C8E6C9]/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#424242]/70">{stat.title}</p>
                        <p className="text-2xl font-bold text-[#424242]">{stat.value}</p>
                        <p className="text-sm text-[#2E7D32]">{stat.change} vs last month</p>
                      </div>
                      <IconComponent className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-[#C8E6C9]/50">
              <TabsTrigger value="overview" className="text-[#424242] data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white">Overview</TabsTrigger>
              <TabsTrigger value="appointments" className="text-[#424242] data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white">Appointments</TabsTrigger>
              <TabsTrigger value="doctors" className="text-[#424242] data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white">Doctors</TabsTrigger>
              <TabsTrigger value="patients" className="text-[#424242] data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white">Patients</TabsTrigger>
              <TabsTrigger value="reports" className="text-[#424242] data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Appointments */}
                <Card className="lg:col-span-2 border-[#C8E6C9]/50">
                  <CardHeader>
                    <CardTitle className="text-[#424242]">Recent Appointments</CardTitle>
                    <CardDescription className="text-[#424242]/70">Latest appointment activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 bg-[#C8E6C9]/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-[#2E7D32] text-white">
                                {appointment.patient.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-[#424242]">{appointment.patient}</p>
                              <p className="text-sm text-[#2E7D32]">{appointment.doctor}</p>
                              <p className="text-xs text-[#424242]/70">{appointment.time}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={appointment.type === "Video" ? "bg-[#2E7D32]/50 text-[#2E7D32]" : "bg-[#1B5E20]/50 text-[#1B5E20]"}>
                              {appointment.type}
                            </Badge>
                            <p className="text-xs text-[#424242]/70 mt-1">{appointment.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-[#C8E6C9]/50">
                  <CardHeader>
                    <CardTitle className="text-[#424242]">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-[#1B5E20] hover:bg-[#2E7D32] text-white">
                      <Users className="h-4 w-4 mr-2 text-white" />
                      Add New Doctor
                    </Button>
                    <Button className="w-full justify-start bg-white border border-[#C8E6C9] text-[#2E7D32] hover:bg-[#C8E6C9]/50">
                      <Calendar className="h-4 w-4 mr-2 text-[#2E7D32]" />
                      Schedule Appointment
                    </Button>
                    <Button className="w-full justify-start bg-white border border-[#C8E6C9] text-[#2E7D32] hover:bg-[#C8E6C9]/50">
                      <FileText className="h-4 w-4 mr-2 text-[#2E7D32]" />
                      Generate Report
                    </Button>
                    <Button className="w-full justify-start bg-white border border-[#C8E6C9] text-[#2E7D32] hover:bg-[#C8E6C9]/50">
                      <Settings className="h-4 w-4 mr-2 text-[#2E7D32]" />
                      System Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="doctors" className="space-y-6">
              <Card className="border-[#C8E6C9]/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-[#424242]">Doctor Management</CardTitle>
                      <CardDescription className="text-[#424242]/70">Manage doctors and their performance</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#424242]/50" />
                        <Input placeholder="Search doctors..." className="pl-10 w-64 border-[#C8E6C9]" />
                      </div>
                      <Button className="bg-[#1B5E20] hover:bg-[#2E7D32] text-white">
                        <Users className="h-4 w-4 mr-2" />
                        Add Doctor
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {doctors.map((doctor) => (
                      <div key={doctor.id} className="flex items-center justify-between p-4 bg-[#C8E6C9]/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-[#2E7D32] text-white">
                              {doctor.name.split(' ')[1]?.[0] || 'D'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-[#424242]">{doctor.name}</h3>
                            <p className="text-sm text-[#2E7D32]">{doctor.speciality}</p>
                            <div className="flex items-center text-sm text-[#424242]/70 mt-1">
                              <Users className="h-3 w-3 mr-1" />
                              {doctor.patients} patients
                              <Star className="h-3 w-3 ml-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {doctor.rating}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-[#424242]">{doctor.revenue}</p>
                          <Badge className={doctor.status === "Active" ? "bg-[#2E7D32]/50 text-[#2E7D32]" : "bg-[#1B5E20]/50 text-[#1B5E20]"}>
                            {doctor.status}
                          </Badge>
                          <div className="flex space-x-2 mt-2">
                            <Button size="sm" variant="outline" className="border-[#C8E6C9] text-[#2E7D32]">Edit</Button>
                            <Button size="sm" variant="outline" className="border-[#C8E6C9] text-[#2E7D32]">View</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <Card className="border-[#C8E6C9]/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-[#424242]">Appointment Management</CardTitle>
                      <CardDescription className="text-[#424242]/70">Track and manage all appointments</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" className="border-[#C8E6C9] text-[#2E7D32]">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" className="border-[#C8E6C9] text-[#2E7D32]">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-[#424242]/70">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-[#2E7D32]" />
                    <p>Appointment management interface would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patients" className="space-y-6">
              <Card className="border-[#C8E6C9]/50">
                <CardHeader>
                  <CardTitle className="text-[#424242]">Patient Management</CardTitle>
                  <CardDescription className="text-[#424242]/70">View and manage patient records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-[#424242]/70">
                    <User className="h-12 w-12 mx-auto mb-4 text-[#2E7D32]" />
                    <p>Patient management interface would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card className="border-[#C8E6C9]/50">
                <CardHeader>
                  <CardTitle className="text-[#424242]">Analytics & Reports</CardTitle>
                  <CardDescription className="text-[#424242]/70">System performance and analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-[#424242]/70">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-[#2E7D32]" />
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