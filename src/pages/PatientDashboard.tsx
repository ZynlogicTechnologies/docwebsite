
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar,
  FileText,
  Pill,
  TestTube,
  User,
  Clock,
  MapPin,
  Phone,
  Mail,
  Heart,
  Activity,
  TrendingUp,
  Bell,
  Settings,
  Download,
  Video,
  MessageCircle
} from "lucide-react";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const upcomingAppointments = [
    {
      id: "1",
      doctor: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      date: "Today",
      time: "2:30 PM",
      type: "Video Consultation",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: "2", 
      doctor: "Dr. Michael Brown",
      specialty: "Dermatologist",
      date: "Tomorrow",
      time: "10:00 AM",
      type: "In-person",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const recentRecords = [
    {
      id: "1",
      title: "Blood Test Report",
      type: "Lab Report",
      date: "2 days ago",
      doctor: "Dr. Sarah Wilson"
    },
    {
      id: "2",
      title: "Prescription - Hypertension",
      type: "Prescription",
      date: "1 week ago", 
      doctor: "Dr. Sarah Wilson"
    }
  ];

  const healthMetrics = [
    {
      label: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      status: "Normal",
      color: "text-green-600"
    },
    {
      label: "Heart Rate",
      value: "72",
      unit: "bpm",
      status: "Normal",
      color: "text-green-600"
    },
    {
      label: "Weight",
      value: "68",
      unit: "kg",
      status: "Healthy",
      color: "text-green-600"
    },
    {
      label: "BMI",
      value: "22.4",
      unit: "",
      status: "Normal",
      color: "text-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, John Doe
                </h1>
                <p className="text-gray-600">
                  Here's your health summary for today
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
              <TabsTrigger value="records">Health Records</TabsTrigger>
              <TabsTrigger value="medications">Medications</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">2</div>
                    <div className="text-sm text-gray-600">Upcoming Appointments</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-gray-600">Health Records</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Pill className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-gray-600">Active Medications</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <TestTube className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold">1</div>
                    <div className="text-sm text-gray-600">Pending Lab Tests</div>
                  </CardContent>
                </Card>
              </div>

              {/* Health Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Health Metrics
                  </CardTitle>
                  <CardDescription>Your latest health measurements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {healthMetrics.map((metric, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold">{metric.value} {metric.unit}</div>
                        <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                        <Badge variant="outline" className={metric.color}>
                          {metric.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled consultations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={appointment.avatar} />
                          <AvatarFallback>{appointment.doctor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{appointment.doctor}</div>
                          <div className="text-sm text-gray-600">{appointment.specialty}</div>
                          <div className="text-sm text-gray-500">
                            {appointment.date} at {appointment.time}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{appointment.type}</Badge>
                        <Button size="sm">
                          {appointment.type === "Video Consultation" ? (
                            <Video className="h-4 w-4 mr-1" />
                          ) : (
                            <MapPin className="h-4 w-4 mr-1" />
                          )}
                          Join
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Records */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Health Records</CardTitle>
                  <CardDescription>Your latest medical documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{record.title}</div>
                          <div className="text-sm text-gray-600">
                            {record.type} • {record.date} • {record.doctor}
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>All Appointments</CardTitle>
                  <CardDescription>Manage your past and upcoming appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Appointment management coming soon</h3>
                    <p className="text-gray-600">Full appointment history and management features</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="records">
              <Card>
                <CardHeader>
                  <CardTitle>Health Records</CardTitle>
                  <CardDescription>All your medical documents in one place</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Comprehensive health records</h3>
                    <p className="text-gray-600">Access all your prescriptions, reports, and medical history</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="medications">
              <Card>
                <CardHeader>
                  <CardTitle>Medications</CardTitle>
                  <CardDescription>Track your current and past medications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Pill className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Medication tracking</h3>
                    <p className="text-gray-600">Manage prescriptions, set reminders, and track dosages</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your personal and contact information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">John Doe</h3>
                        <p className="text-gray-600">Patient ID: PAT123456</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Change Photo
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">Email</div>
                            <div className="text-gray-600">john.doe@example.com</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">Phone</div>
                            <div className="text-gray-600">+91 98XXX XXXXX</div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <User className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">Date of Birth</div>
                            <div className="text-gray-600">January 15, 1990</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="h-5 w-5 text-gray-400" />
                          <div>
                            <div className="font-medium">Address</div>
                            <div className="text-gray-600">123 Main St, City, State</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button>Update Profile</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PatientDashboard;
