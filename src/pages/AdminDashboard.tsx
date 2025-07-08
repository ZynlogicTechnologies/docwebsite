
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
      color: "text-practo-navy" 
    },
    { 
      title: "Appointments Today", 
      value: "156", 
      change: "+8%", 
      icon: Calendar, 
      color: "text-practo-sky" 
    },
    { 
      title: "Revenue", 
      value: "₹2,45,680", 
      change: "+15%", 
      icon: DollarSign, 
      color: "text-green-600" 
    },
    { 
      title: "Active Doctors", 
      value: "89", 
      change: "+3%", 
      icon: Heart, 
      color: "text-red-500" 
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
      <header className="bg-white border-b border-practo-light">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-practo-navy">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-practo-navy">MediCare Admin</h1>
                <p className="text-sm text-practo-sky">Healthcare Management System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Avatar>
                <AvatarFallback className="bg-practo-navy text-white">AD</AvatarFallback>
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
                <Card key={index} className="border-practo-light">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-practo-navy">{stat.value}</p>
                        <p className="text-sm text-green-600">{stat.change} vs last month</p>
                      </div>
                      <IconComponent className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="doctors">Doctors</TabsTrigger>
              <TabsTrigger value="patients">Patients</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Recent Appointments */}
                <Card className="lg:col-span-2 border-practo-light">
                  <CardHeader>
                    <CardTitle className="text-practo-navy">Recent Appointments</CardTitle>
                    <CardDescription>Latest appointment activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-practo-light text-practo-navy">
                                {appointment.patient.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-practo-navy">{appointment.patient}</p>
                              <p className="text-sm text-practo-sky">{appointment.doctor}</p>
                              <p className="text-xs text-gray-500">{appointment.time}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={appointment.type === "Video" ? "bg-practo-sky" : "bg-practo-navy"}>
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
                <Card className="border-practo-light">
                  <CardHeader>
                    <CardTitle className="text-practo-navy">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-practo-navy hover:bg-practo-sky">
                      <Users className="h-4 w-4 mr-2" />
                      Add New Doctor
                    </Button>
                    <Button className="w-full justify-start bg-white border border-practo-light text-practo-navy hover:bg-practo-light">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Appointment
                    </Button>
                    <Button className="w-full justify-start bg-white border border-practo-light text-practo-navy hover:bg-practo-light">
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button className="w-full justify-start bg-white border border-practo-light text-practo-navy hover:bg-practo-light">
                      <Settings className="h-4 w-4 mr-2" />
                      System Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="doctors" className="space-y-6">
              <Card className="border-practo-light">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-practo-navy">Doctor Management</CardTitle>
                      <CardDescription>Manage doctors and their performance</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input placeholder="Search doctors..." className="pl-10 w-64" />
                      </div>
                      <Button className="bg-practo-navy hover:bg-practo-sky">
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
                            <AvatarFallback className="bg-practo-navy text-white">
                              {doctor.name.split(' ')[1]?.[0] || 'D'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-practo-navy">{doctor.name}</h3>
                            <p className="text-sm text-practo-sky">{doctor.speciality}</p>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Users className="h-3 w-3 mr-1" />
                              {doctor.patients} patients
                              <Star className="h-3 w-3 ml-3 mr-1 fill-yellow-400 text-yellow-400" />
                              {doctor.rating}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-practo-navy">{doctor.revenue}</p>
                          <Badge className={doctor.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                            {doctor.status}
                          </Badge>
                          <div className="flex space-x-2 mt-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="outline">View</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments" className="space-y-6">
              <Card className="border-practo-light">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-practo-navy">Appointment Management</CardTitle>
                      <CardDescription>Track and manage all appointments</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4" />
                    <p>Appointment management interface would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patients" className="space-y-6">
              <Card className="border-practo-light">
                <CardHeader>
                  <CardTitle className="text-practo-navy">Patient Management</CardTitle>
                  <CardDescription>View and manage patient records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <User className="h-12 w-12 mx-auto mb-4" />
                    <p>Patient management interface would be implemented here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card className="border-practo-light">
                <CardHeader>
                  <CardTitle className="text-practo-navy">Analytics & Reports</CardTitle>
                  <CardDescription>System performance and analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-4" />
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
