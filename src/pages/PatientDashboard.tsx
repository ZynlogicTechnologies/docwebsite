import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import {
  Calendar, FileText, Pill, TestTube, Activity,
  Bell, Settings, Download, Video, MapPin,
} from "lucide-react";

dayjs.extend(relativeTime);

interface Appointment {
  id: number;
  doctor_id: number;
  appointment_date: string;
  appointment_start_time: string;
  appointment_end_time: string;
  appointment_type: string;
}

interface UserData {
  username: string;
  email: string;
}

interface RecordItem {
  id: string;
  title: string;
  type: string;
  date: string;
  doctor: string;
}

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const healthMetrics = [
    { label: "Blood Pressure", value: "120/80", unit: "mmHg", status: "Normal", color: "text-green-600" },
    { label: "Heart Rate", value: "72", unit: "bpm", status: "Normal", color: "text-green-600" },
    { label: "Weight", value: "68", unit: "kg", status: "Healthy", color: "text-green-600" },
    { label: "BMI", value: "22.4", unit: "", status: "Normal", color: "text-green-600" },
  ];

  const recentRecords: RecordItem[] = [
    {
      id: "1",
      title: "Blood Test Report",
      type: "Lab Report",
      date: dayjs().subtract(2, "day").fromNow(),
      doctor: "Dr. Sarah Wilson",
    },
    {
      id: "2",
      title: "Prescription - Hypertension",
      type: "Prescription",
      date: dayjs().subtract(7, "day").fromNow(),
      doctor: "Dr. Sarah Wilson",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("https://landing.docapp.co.in/api/auth/get-user-data", {
          method: "GET",
          credentials: "include",
        });
        const userJson = await userRes.json();
        setUserData(userJson.userData);

        const apptRes = await fetch("https://landing.docapp.co.in/api/appointment/list-appointments", {
          method: "GET",
          credentials: "include",
        });
        const apptJson = await apptRes.json();

        const today = dayjs();
        const upcoming = apptJson.appointments.filter((a: Appointment) =>
          dayjs(a.appointment_date).isSame(today, "day") ||
          dayjs(a.appointment_date).isAfter(today, "day")
        );

        setAppointments(upcoming);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {userData?.username || "User"}
                </h1>
                <p className="text-gray-600">Here's your health summary for today</p>
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
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Calendar className="h-8 w-8 text-[#007E85] mx-auto mb-2" />
                    <div className="text-2xl font-bold">{appointments.length}</div>
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

              {/* Metrics */}
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
                    {healthMetrics.map((metric, i) => (
                      <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-lg font-semibold">{metric.value} {metric.unit}</div>
                        <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                        <Badge variant="outline" className={metric.color}>{metric.status}</Badge>
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
                  {appointments.length === 0 ? (
                    <div className="text-gray-500">No upcoming appointments</div>
                  ) : (
                    appointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=Dr${appointment.doctor_id}`} />
                            <AvatarFallback>DR</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Doctor ID: {appointment.doctor_id}</div>
                            <div className="text-sm text-gray-600 capitalize">{appointment.appointment_type}</div>
                            <div className="text-sm text-gray-500">
                              {dayjs(appointment.appointment_date).format("MMM D, YYYY")} at {appointment.appointment_start_time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">
                            {appointment.appointment_type === "offline" ? "In-person" : "Video"}
                          </Badge>
                          <Button size="sm" className="bg-[#007E85] hover:bg-[#006A6F]">
                            {appointment.appointment_type === "offline" ? (
                              <MapPin className="h-4 w-4 mr-1" />
                            ) : (
                              <Video className="h-4 w-4 mr-1" />
                            )}
                            Join
                          </Button>

                          
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
                 <button
          onClick={() => navigate("/userappointments")}
          className="px-4 py-2 bg-[#007E85] items-center"
        >
          View All Appointments
        </button>
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
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PatientDashboard;
