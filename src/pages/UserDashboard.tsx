import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  User,
  Calendar,
  FileText,
  ShoppingCart,
  Heart,
  Clock,
  MapPin,
  Star,
  Bell,
  Settings,
  Download,
  Video,
  Pill
} from "lucide-react";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const upcomingAppointments = [
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      speciality: "Cardiologist",
      date: "Today",
      time: "2:30 PM",
      type: "Video Consultation",
      status: "confirmed"
    },
    {
      id: "2", 
      doctor: "Dr. Michael Chen",
      speciality: "General Medicine",
      date: "Tomorrow",
      time: "10:00 AM", 
      type: "In-person",
      status: "pending"
    }
  ];

  const recentOrders = [
    {
      id: "1",
      type: "Medicine",
      items: "Paracetamol, Vitamin D3",
      amount: 299,
      status: "Delivered",
      date: "2 days ago"
    },
    {
      id: "2",
      type: "Lab Test", 
      items: "Complete Blood Count",
      amount: 599,
      status: "Report Ready",
      date: "1 week ago"
    }
  ];

  const healthMetrics = [
    { label: "BMI", value: "22.5", status: "Normal", color: "text-green-600" },
    { label: "Blood Pressure", value: "120/80", status: "Normal", color: "text-green-600" },
    { label: "Heart Rate", value: "72 bpm", status: "Normal", color: "text-green-600" },
    { label: "Weight", value: "70 kg", status: "Stable", color: "text-[#007E85]" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-[#007E85] text-white text-xl">JD</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-[#007E85]">Welcome back, John Doe</h1>
                  <p className="text-[#007E85]">Your health dashboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
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
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border-[#007E85]/20">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 text-[#007E85] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#007E85]">12</div>
                <div className="text-sm text-gray-600">Appointments</div>
              </CardContent>
            </Card>
            <Card className="border-[#007E85]/20">
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-[#007E85] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#007E85]">8</div>
                <div className="text-sm text-gray-600">Health Records</div>
              </CardContent>
            </Card>
            <Card className="border-[#007E85]/20">
              <CardContent className="p-6 text-center">
                <ShoppingCart className="h-8 w-8 text-[#007E85] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#007E85]">5</div>
                <div className="text-sm text-gray-600">Orders</div>
              </CardContent>
            </Card>
            <Card className="border-[#007E85]/20">
              <CardContent className="p-6 text-center">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#007E85]">Good</div>
                <div className="text-sm text-gray-600">Health Score</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Upcoming Appointments */}
              <Card className="border-[#007E85]/20">
                <CardHeader>
                  <CardTitle className="text-[#007E85] flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Upcoming Appointments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-[#007E85]/10 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-[#007E85]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#007E85]">{appointment.doctor}</h3>
                          <p className="text-sm text-[#007E85]">{appointment.speciality}</p>
                          <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            {appointment.date} at {appointment.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={appointment.type === "Video Consultation" ? "bg-[#007E85] hover:bg-[#006A6F]" : "bg-[#007E85]/80 hover:bg-[#006A6F]/80"}>
                          {appointment.type === "Video Consultation" ? <Video className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
                          {appointment.type}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{appointment.status}</p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full bg-[#007E85] hover:bg-[#006A6F]">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book New Appointment
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Orders */}
              <Card className="border-[#007E85]/20">
                <CardHeader>
                  <CardTitle className="text-[#007E85] flex items-center">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 bg-[#007E85]/10 rounded-full flex items-center justify-center">
                          {order.type === "Medicine" ? (
                            <Pill className="h-5 w-5 text-[#007E85]" />
                          ) : (
                            <FileText className="h-5 w-5 text-[#007E85]" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#007E85]">{order.type}</h3>
                          <p className="text-sm text-gray-600">{order.items}</p>
                          <p className="text-xs text-gray-500">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#007E85]">₹{order.amount}</p>
                        <Badge className={order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-[#007E85]/10 text-[#007E85]"}>
                          {order.status}
                        </Badge>
                        {order.status === "Report Ready" && (
                          <Button size="sm" variant="outline" className="mt-1 text-xs">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Health Metrics */}
              <Card className="border-[#007E85]/20">
                <CardHeader>
                  <CardTitle className="text-[#007E85] flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Health Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {healthMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-[#007E85]">{metric.label}</p>
                        <p className="text-lg font-bold">{metric.value}</p>
                      </div>
                      <Badge className={`${metric.color} bg-transparent border`}>
                        {metric.status}
                      </Badge>
                    </div>
                  ))}
                  <Button className="w-full bg-[#007E85] hover:bg-[#006A6F]">
                    View Full Report
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-[#007E85]/20">
                <CardHeader>
                  <CardTitle className="text-[#007E85]">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-white border border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10">
                    <Video className="h-4 w-4 mr-2" />
                    Start Video Consultation
                  </Button>
                  <Button className="w-full justify-start bg-white border border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10">
                    <Pill className="h-4 w-4 mr-2" />
                    Order Medicine
                  </Button>
                  <Button className="w-full justify-start bg-white border border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10">
                    <FileText className="h-4 w-4 mr-2" />
                    Book Lab Test
                  </Button>
                  <Button className="w-full justify-start bg-white border border-[#007E85]/20 text-[#007E85] hover:bg-[#007E85]/10">
                    <Download className="h-4 w-4 mr-2" />
                    Download Reports
                  </Button>
                </CardContent>
              </Card>

              {/* Health Tips */}
              <Card className="border-[#007E85]/20">
                <CardHeader>
                  <CardTitle className="text-[#007E85]">Today's Health Tip</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p className="mb-2">💧 Stay hydrated! Drink at least 8 glasses of water daily.</p>
                    <p>Regular hydration helps maintain optimal body functions and improves overall health.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;