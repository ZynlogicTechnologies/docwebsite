
import { useState, useEffect } from "react";
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

// Define TypeScript interfaces for API responses
interface Appointment {
  id: number;
  user_id: number;
  doctor_id: number;
  appointment_date: string;
  appointment_start_time: string;
  appointment_end_time: string;
  appointment_status: string;
  appointment_type: string;
  checkup_time: string | null;
  prescription: string | null;
  created_at: string;
  createdAt: string;
  updatedAt: string;
  checkupAppointment: any[];
  followUp: any[];
}

interface UserData {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  password_hash: string;
  googleId: string | null;
  role: string;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AppointmentFormatted {
  id: string;
  doctor: string;
  speciality: string;
  date: string;
  time: string;
  type: string;
  status: string;
}

interface HealthMetric {
  label: string;
  value: string;
  status: string;
  color: string;
}

interface Order {
  id: string;
  type: string;
  items: string;
  amount: number;
  status: string;
  date: string;
}

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | string>("overview");
  const [appointments, setAppointments] = useState<AppointmentFormatted[]>([]);
  const [user, setUser] = useState<{ username: string; initials: string }>({ username: "", initials: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fallback data based on provided API responses
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch appointments
        const appointmentResponse = await fetch("https://landing.docapp.co.in/api/appointment/list-appointments", {
          method: "POST", // Changed to POST as you mentioned "in post an the api"
          credentials: "include", // Include cookies for authentication
          headers: {
            "Content-Type": "application/json",
            // Add Bearer token if required, e.g., "Authorization": `Bearer ${token}`
          },
        });

        if (!appointmentResponse.ok) {
          throw new Error(`Appointment API error: ${appointmentResponse.status} ${appointmentResponse.statusText}`);
        }

        const appointmentData: { appointments: Appointment[] } = await appointmentResponse.json();

        // Map API appointments to component format
        const formattedAppointments: AppointmentFormatted[] = appointmentData.appointments.map((appointment) => {
          const date = new Date(appointment.appointment_date);
          const time = new Date(`1970-01-01T${appointment.appointment_start_time}Z`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          });
          return {
            id: appointment.id.toString(),
            doctor: "Dr. Unknown",
            speciality: "Unknown Specialty",
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            time,
            type: appointment.appointment_type === "offline" ? "In-person" : "Video Consultation",
            status: appointment.appointment_status,
          };
        });

        setAppointments(formattedAppointments);

        // Fetch user data
        const userResponse = await fetch("https://landing.docapp.co.in/api/auth/get-user-data", {
          method: "POST", // Changed to POST as you mentioned "in post an the api"
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            // Add Bearer token if required, e.g., "Authorization": `Bearer ${token}`
          },
        });

        if (!userResponse.ok) {
          throw new Error(`User API error: ${userResponse.status} ${userResponse.statusText}`);
        }

        const userData: { message: string; userData: UserData } = await userResponse.json();

        setUser({
          username: userData.userData.username,
          initials: userData.userData.username.slice(0, 2).toUpperCase(),
        });

        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setError(`Failed to load data: ${error.message}. Using fallback data.`);
        setAppointments(fallbackAppointments);
        setUser(fallbackUser);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const recentOrders: Order[] = [
    {
      id: "1",
      type: "Medicine",
      items: "Paracetamol, Vitamin D3",
      amount: 299,
      status: "Delivered",
      date: "2 days ago",
    },
    {
      id: "2",
      type: "Lab Test",
      items: "Complete Blood Count",
      amount: 599,
      status: "Report Ready",
      date: "1 week ago",
    },
  ];

  const healthMetrics: HealthMetric[] = [
    { label: "BMI", value: "22.5", status: "Normal", color: "text-green-600" },
    { label: "Blood Pressure", value: "120/80", status: "Normal", color: "text-green-600" },
    { label: "Heart Rate", value: "72 bpm", status: "Normal", color: "text-green-600" },
    { label: "Weight", value: "70 kg", status: "Stable", color: "text-[#007E85]" },
  ];

  if (loading) {
    return <div className="text-center text-[#007E85] py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-[#007E85] text-white text-xl">{user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold text-[#007E85]">Welcome back, {user.username}</h1>
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
                  {appointments.length === 0 ? (
                    <p className="text-gray-600">No upcoming appointments.</p>
                  ) : (
                    appointments.map((appointment) => (
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
                    ))
                  )}
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
